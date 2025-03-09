require("dotenv").config(); // Charge les variables d'environnement
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const config = require("./config"); // Charge la config
const fs = require("fs");
const path = require("path");

// 🔹 Vérification et création du dossier session si nécessaire
const sessionPath = "./session";
if (!fs.existsSync(sessionPath)) {
    fs.mkdirSync(sessionPath, { recursive: true });
}

// 🔹 Chargement des commandes
const commands = new Map();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.set(command.name, command);
}

// 🔥 Initialisation du bot
async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
    const sock = makeWASocket({ auth: state });

    sock.ev.on("creds.update", saveCreds);

    // ✅ Connexion réussie
    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === "close") {
            console.log("🔴 Connexion perdue, reconnexion...");
            startBot();
        } else if (connection === "open") {
            console.log("🟢 Murphy-MD est en ligne !");
        }
    });

    // 🎯 Gestion des messages
    sock.ev.on("messages.upsert", async (msg) => {
        const message = msg.messages[0];
        if (!message.message) return;
        const sender = message.key.remoteJid;
        const text = message.message.conversation || message.message.extendedTextMessage?.text;
        if (!text) return;

        // 📌 Vérification du préfixe
        if (!text.startsWith(config.prefix)) return;
        const args = text.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // 🔍 Recherche et exécution de la commande
        if (commands.has(commandName)) {
            try {
                await commands.get(commandName).execute(sock, message, args);
            } catch (error) {
                console.error(`❌ Erreur lors de l'exécution de la commande ${commandName}:`, error);
            }
        } else {
            sock.sendMessage(sender, { text: "❌ Commande inconnue. Tape `!menu` pour voir la liste des commandes." });
        }
    });
}

// 🚀 Lancement du bot
startBot().catch(console.error);
