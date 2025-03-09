require("dotenv").config(); // Charge les variables d'environnement
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const config = require("./config"); // Charge la config
const fs = require("fs");
const path = require("path");

// 🔹 Vérification et création du dossier "commands" s'il n'existe pas
const commandsPath = "./commands";
if (!fs.existsSync(commandsPath)) {
    console.log("📂 Le dossier 'commands' est manquant. Création en cours...");
    fs.mkdirSync(commandsPath);
}

// 🔹 Chargement des commandes
const commands = new Map();
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.set(command.name, command);
}

console.log("✅ Commandes chargées :", [...commands.keys()]);

// 🔥 Initialisation du bot
async function startBot() {
    try {
        const { state, saveCreds } = await useMultiFileAuthState(config.sessionName);
        const sock = makeWASocket({ auth: state });

        sock.ev.on("creds.update", saveCreds);

        // ✅ Connexion réussie
        sock.ev.on("connection.update", (update) => {
            const { connection, lastDisconnect } = update;
            if (connection === "close") {
                console.log("🔴 Connexion perdue, tentative de reconnexion...");
                if (lastDisconnect?.error) {
                    console.error("Erreur de connexion :", lastDisconnect.error);
                }
                setTimeout(startBot, 5000); // Attendre 5 secondes avant de réessayer
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

    } catch (error) {
        console.error("🚨 Erreur lors du démarrage du bot :", error);
        setTimeout(startBot, 5000); // Attendre 5 secondes avant de réessayer
    }
}

// 🚀 Lancement du bot
startBot().catch(console.error);
