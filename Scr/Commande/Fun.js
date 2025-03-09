module.exports = {
    meme: async (sock, from, msg) => {
        const memeUrl = "https://api.memegen.link/images/buzz/murphy-md_is/cool.png";
        sock.sendMessage(from, { image: { url: memeUrl }, caption: "🔥 Voici un meme pour toi !" }, { quoted: msg });
    },

    joke: async (sock, from, msg) => {
        const joke = "Pourquoi le bot n’a pas traversé la route ? Parce qu’il a détecté un anti-bot ! 😂";
        sock.sendMessage(from, { text: joke }, { quoted: msg });
    },

    ship: async (sock, from, msg, args) => {
        if (args.length < 2) {
            return sock.sendMessage(from, { text: "❌ Utilisation : !ship @user1 @user2" }, { quoted: msg });
        }
        const score = Math.floor(Math.random() * 100);
        sock.sendMessage(from, { text: `💖 Compatibilité entre ${args[0]} et ${args[1]} : *${score}%*` }, { quoted: msg });
    }
};
