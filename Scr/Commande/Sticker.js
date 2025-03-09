const { writeFileSync } = require('fs');
const { exec } = require('child_process');
const path = require('path');

module.exports = {
    sticker: async (sock, from, msg) => {
        const isImage = msg.message.imageMessage;
        const isVideo = msg.message.videoMessage;
        
        if (!isImage && !isVideo) {
            return sock.sendMessage(from, { text: "❌ *Envoie une image ou une vidéo avec la commande !sticker*." }, { quoted: msg });
        }

        const media = await sock.downloadMediaMessage(msg);
        const fileType = isImage ? "image" : "video";
        const inputPath = path.join(__dirname, '..', 'media', `sticker_input.${fileType === "image" ? "jpg" : "mp4"}`);
        const outputPath = path.join(__dirname, '..', 'media', 'sticker.webp');

        writeFileSync(inputPath, media);

        const ffmpegCommand = fileType === "image"
            ? `ffmpeg -i ${inputPath} -vf "scale=512:512:flags=lanczos" ${outputPath}`
            : `ffmpeg -i ${inputPath} -vf "scale=512:512:flags=lanczos,setpts=0.5*PTS" -r 20 ${outputPath}`;

        exec(ffmpegCommand, async (err) => {
            if (err) {
                return sock.sendMessage(from, { text: "❌ Erreur lors de la création du sticker !" }, { quoted: msg });
            }

            const stickerBuffer = require('fs').readFileSync(outputPath);
            await sock.sendMessage(from, { sticker: stickerBuffer }, { quoted: msg });
        });
    }
};
