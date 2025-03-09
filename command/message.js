const baileys = require('@whiskeysockets/baileys');

// Fonction pour écouter les messages
async function handleMessages(sock) {
    sock.ev.on('messages.upsert', async (m) => {
        const message = m.messages[0];
        if (!message.message) return;

        const sender = message.key.remoteJid;
        const text = message.message.conversation || message.message.extendedTextMessage?.text;

        console.log(`📩 Message reçu de ${sender}: ${text}`);

        // Répondre au message
        await sock.sendMessage(sender, { text: `Tu as dit : ${text}` });
    });
}

module.exports = handleMessages;
