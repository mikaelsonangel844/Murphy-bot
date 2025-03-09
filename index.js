const fs = require('fs');
const path = require('path');
const https = require('https');
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");

// 📥 URL du fichier session stocké sur GitHub
const SESSION_URL = 'https://raw.githubusercontent.com/mikaelsonangel844/Murphy-md-session/main/auth_info/creds.json';
const SESSION_DIR = path.join(__dirname, 'auth_info');
const SESSION_FILE = path.join(SESSION_DIR, 'creds.json');

// 📂 Téléchargement automatique de la session
async function downloadSession() {
    return new Promise((resolve, reject) => {
        console.log("📥 Téléchargement de la session...");
        https.get(SESSION_URL, (response) => {
            if (response.statusCode !== 200) {
                console.log("⚠️ Impossible de récupérer la session. Démarrage avec un nouveau QR Code.");
                return resolve(); // On continue sans session
            }

            if (!fs.existsSync(SESSION_DIR)) fs.mkdirSync(SESSION_DIR, { recursive: true });

            const file = fs.createWriteStream(SESSION_FILE);
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log("✅ Session téléchargée !");
                resolve();
            });
        }).on('error', (err) => reject(err));
    });
}

// 🚀 Connexion à WhatsApp
async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState(SESSION_DIR); // 📂 Stockage des sessions

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true, // 📸 Affichage du QR Code pour connexion
    });

    sock.ev.on("creds.update", async () => {
        console.log("🔄 Mise à jour de la session...");
        await saveCreds();

        fs.writeFileSync(SESSION_FILE, JSON.stringify(state, null, 2));
        require('child_process').exec(`
            cd auth_info &&
            git add creds.json &&
            git commit -m "Mise à jour de la session" &&
            git push origin main
        `, (error, stdout, stderr) => {
            if (error) console.error(`❌ Erreur d'upload : ${error.message}`);
            if (stderr) console.error(`⚠️ ${stderr}`);
            console.log(`✅ Session mise à jour sur GitHub !`);
        });
    });

    sock.ev.on("connection.update", (update) => {
        const { connection } = update;
        if (connection === "close") {
            console.log("⚠️ Déconnecté. Tentative de reconnexion...");
            connectToWhatsApp();
        } else if (connection === "open") {
            console.log("✅ Connecté à WhatsApp !");
        }
    });

    sock.ev.on("messages.upsert", async (m) => {
        const msg = m.messages[0];
        if (!msg.message) return;

        const from = msg.key.remoteJid;
        const messageContent = msg.message.conversation || msg.message.extendedTextMessage?.text;

        console.log(`📩 Nouveau message de ${from}: ${messageContent}`);

        if (messageContent && messageContent.toLowerCase() === "salut") {
            await sock.sendMessage(from, { text: "👋 Salut, comment puis-je t'aider ?" });
        }
    });
}

// 🔄 Démarrage du bot après récupération de la session
async function startBot() {
    try {
        await downloadSession();
    } catch (err) {
        console.error(err);
        console.log("⚠️ Démarrage sans session. Il faudra scanner le QR Code.");
    }
    connectToWhatsApp();
}

startBot();
