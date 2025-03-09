const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const fs = require("fs");

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info'); // Stocke les sessions ici

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true, // Affiche le QR Code pour la connexion
    });

    sock.ev.on("creds.update", saveCreds); // Sauvegarde l'authentification
    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === "close") {
            console.log("⚠️ Déconnecté. Reconnexion...");
            connectToWhatsApp(); // Tente de se reconnecter
        } else if (connection === "open") {
            console.log("✅ Connecté à WhatsApp !");
        }
    });

    sock.ev.on("messages.upsert", async (m) => {
        const msg = m.messages[0];

        if (!msg.message) return; // Ignore les messages vides

        const from = msg.key.remoteJid;
        const messageContent = msg.message.conversation || msg.message.extendedTextMessage?.text;

        console.log(`📩 Nouveau message de ${from}: ${messageContent}`);

        // Exemple de réponse automatique
        if (messageContent && messageContent.toLowerCase() === "salut") {
            await sock.sendMessage(from, { text: "👋 Salut, comment puis-je t'aider ?" });
        }
    });
}

connectToWhatsApp();
