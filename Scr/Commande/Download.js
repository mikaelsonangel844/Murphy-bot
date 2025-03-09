const axios = require('axios');

module.exports = {
    ytmp3: async (sock, from, msg, args) => {
        if (!args[0]) return sock.sendMessage(from, { text: "❌ *Utilisation:* !ytmp3 [lien YouTube]" }, { quoted: msg });
        
        try {
            const { data } = await axios.get(`https://api.zahwazein.xyz/downloader/youtube-audio?url=${args[0]}&apikey=TA_CLE_API`);
            sock.sendMessage(from, { audio: { url: data.result.link }, mimetype: 'audio/mp4' }, { quoted: msg });
        } catch (error) {
            sock.sendMessage(from, { text: "❌ Erreur lors du téléchargement." }, { quoted: msg });
        }
    },

    ytmp4: async (sock, from, msg, args) => {
        if (!args[0]) return sock.sendMessage(from, { text: "❌ *Utilisation:* !ytmp4 [lien YouTube]" }, { quoted: msg });

        try {
            const { data } = await axios.get(`https://api.zahwazein.xyz/downloader/youtube-video?url=${args[0]}&apikey=TA_CLE_API`);
            sock.sendMessage(from, { video: { url: data.result.link }, caption: "🎥 Voici ta vidéo YouTube !" }, { quoted: msg });
        } catch (error) {
            sock.sendMessage(from, { text: "❌ Erreur lors du téléchargement." }, { quoted: msg });
        }
    },

    tiktok: async (sock, from, msg, args) => {
        if (!args[0]) return sock.sendMessage(from, { text: "❌ *Utilisation:* !tiktok [lien TikTok]" }, { quoted: msg });

        try {
            const { data } = await axios.get(`https://api.zahwazein.xyz/downloader/tiktok?url=${args[0]}&apikey=TA_CLE_API`);
            sock.sendMessage(from, { video: { url: data.result.video }, caption: "🎵 Voici ta vidéo TikTok !" }, { quoted: msg });
        } catch (error) {
            sock.sendMessage(from, { text: "❌ Erreur lors du téléchargement." }, { quoted: msg });
        }
    }
};
