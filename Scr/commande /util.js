const axios = require('axios');

module.exports = {
    sticker: async (sock, from, msg) => {
        if (!msg.message.imageMessage && !msg.message.videoMessage) {
            return sock.sendMessage(from, { text: "❌ *Réponds à une image ou vidéo avec !sticker pour la convertir en sticker.*" }, { quoted: msg });
        }

        const media = await sock.downloadMediaMessage(msg);
        sock.sendMessage(from, { sticker: media }, { quoted: msg });
    },

    text2img: async (sock, from, msg, args) => {
        if (!args[0]) return sock.sendMessage(from, { text: "❌ *Utilisation:* !text2img [texte]" }, { quoted: msg });

        try {
            const response = await axios.get(`https://api.zahwazein.xyz/tools/text-to-image?text=${encodeURIComponent(args.join(" "))}&apikey=TA_CLE_API`);
            sock.sendMessage(from, { image: { url: response.data.result }, caption: "🖼️ Image générée !" }, { quoted: msg });
        } catch (error) {
            sock.sendMessage(from, { text: "❌ Erreur lors de la génération de l'image." }, { quoted: msg });
        }
    },

    calcul: async (sock, from, msg, args) => {
        if (!args[0]) return sock.sendMessage(from, { text: "❌ *Utilisation:* !calcul [expression mathématique]" }, { quoted: msg });

        try {
            const result = eval(args.join(" "));
            sock.sendMessage(from, { text: `🧮 *Résultat:* ${result}` }, { quoted: msg });
        } catch (error) {
            sock.sendMessage(from, { text: "❌ Expression invalide." }, { quoted: msg });
        }
    },

    emoji: async (sock, from, msg, args) => {
        if (!args[0]) return sock.sendMessage(from, { text: "❌ *Utilisation:* !emoji [emoji]" }, { quoted: msg });

        try {
            const response = await axios.get(`https://api.zahwazein.xyz/sticker/emoji-to-sticker?emoji=${encodeURIComponent(args[0])}&apikey=TA_CLE_API`);
            sock.sendMessage(from, { sticker: { url: response.data.result.animated } }, { quoted: msg });
        } catch (error) {
            sock.sendMessage(from, { text: "❌ Erreur lors de la conversion de l'emoji." }, { quoted: msg });
        }
    }
};
