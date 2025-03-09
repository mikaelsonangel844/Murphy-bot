const fs = require('fs');
const path = require('path');
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");

// 📁 Définition du répertoire des commandes
const commandsDir = path.join(__dirname, 'commands');

// 📌 Vérification et création du dossier de commandes
if (!fs.existsSync(commandsDir)) {
    fs.mkdirSync(commandsDir, { recursive: true });
    console.log('📂 Dossier des commandes créé.');
}

// 📥 Chargement des commandes
const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandsDir, file));
    console.log(`✅ Commande chargée : ${file}`);
}

// 📜 Création d'un fichier logs.txt pour enregistrer les logs
const logStream = fs.createWriteStream(path.join(__dirname, 'logs.txt'), { flags: 'a' });

// 🔄 Redirection de la console vers logs.txt
console.log = (...args) => {
    const message = args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(' ');
    const formattedMessage = `[${new Date().toISOString()}] ${message}\n`;
    logStream.write(formattedMessage);
    process.stdout.write(formattedMessage);
};

console.error = (...args) => {
    const message = args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(' ');
    const formattedMessage = `[${new Date().toISOString()}] [ERROR] ${message}\n`;
    logStream.write(formattedMessage);
    process.stderr.write(formattedMessage);
};

// 📲 Fonction pour connecter le bot à WhatsApp
async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info'); // 📂 Stockage des sessions

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true, // 📸 Affichage du QR Code pour connexion
    });

    sock.ev.on("creds.update", saveCreds); // 🔐 Sauvegarde des identifiants

    sock.ev.on("connection.update", (update) => {
        const { connection } = update;
        if (connection === "close") {
            console.log("⚠️ Déconnecté. Tentative de reconnexion...");
            connectToWhatsApp(); // 🔄 Reconnexion automatique
        } else if (connection === "open") {
            console.log("✅ Connecté à WhatsApp !");
        }
    });

    // 📩 Gestion des messages entrants
    sock.ev.on("messages.upsert", async (m) => {
        const msg = m.messages[0];
        if (!msg.message) return; // Ignorer les messages vides

        const from = msg.key.remoteJid;
        const messageContent = msg.message.conversation || msg.message.extendedTextMessage?.text;

        console.log(`📩 Nouveau message de ${from}: ${messageContent}`);

        // 🤖 Réponse automatique à "salut"
        if (messageContent && messageContent.toLowerCase() === "salut") {
            await sock.sendMessage(from, { text: "👋 Salut, comment puis-je t'aider ?" });
        }
    });
}

// 🚀 Démarrage du bot
connectToWhatsApp();
