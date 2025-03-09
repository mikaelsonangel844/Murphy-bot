const fs = require('fs');
const path = require('path');

module.exports = {
    logo: async (sock, from, msg) => {
        const logoPath = path.join(__dirname, '..', 'media', 'murphy-md-logo.jpg'); // Chemin du logo

        if (!fs.existsSync(logoPath)) {
            return sock.sendMessage(from, { text: "❌ Logo non trouvé !" }, { quoted: msg });
        }

        const imageBuffer = fs.readFileSync(logoPath);
        sock.sendMessage(from, { image: imageBuffer, caption: "🔥 *Voici le logo officiel de Murphy-MD !*" }, { quoted: msg });
    }
};
