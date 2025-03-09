const express = require("express");
const makeWASocket = require("@whiskeysockets/baileys").default;
const { useMultiFileAuthState } = require("@whiskeysockets/baileys");
const QRCode = require("qrcode");
const Pino = require("pino");

const app = express();
const PORT = process.env.PORT || 3000;

let sessionId = null;

// Fonction pour générer une session
async function startSession() {
    const { state, saveCreds } = await useMultiFileAuthState("session");

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        logger: Pino({ level: "silent" }),
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            QRCode.toDataURL(qr, (err, url) => {
                if (!err) sessionId = url;
            });
        }

        if (connection === "open") {
            console.log("✅ Connexion établie !");
        } else if (connection === "close") {
            console.log("❌ Déconnecté, tentative de reconnexion...");
            startSession();
        }
    });

    return sock;
}

// Route pour récupérer la session ID sous forme de QR Code
app.get("/", (req, res) => {
    if (sessionId) {
        res.send(`<img src="${sessionId}" alt="QR Code pour Murphy-MD" />`);
    } else {
        res.send("Aucun QR Code disponible pour le moment, réessayez plus tard.");
    }
});

// Lancer le serveur Express
app.listen(PORT, () => {
    console.log(`Murphy-MD Session Server lancé sur le port ${PORT}`);
    startSession();
});
