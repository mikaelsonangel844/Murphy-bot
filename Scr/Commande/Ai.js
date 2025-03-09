const axios = require("axios");

module.exports = {
    ai: async (sock, from, msg, args) => {
        if (!args.length) {
            return sock.sendMessage(from, { text: "❌ *Utilisation:* !ai [question]" }, { quoted: msg });
        }

        const question = args.join(" ");

        try {
            const response = await axios.post("https://api.openai.com/v1/chat/completions", {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: question }],
                max_tokens: 100
            }, {
                headers: {
                    "Authorization": `Bearer VOTRE_CLE_API_OPENAI`,
                    "Content-Type": "application/json"
                }
            });

            const reply = response.data.choices[0].message.content;
            sock.sendMessage(from, { text: `🤖 *IA:* ${reply}` }, { quoted: msg });
        } catch (error) {
            console.error("Erreur AI:", error);
            sock.sendMessage(from, { text: "❌ Erreur lors de la génération de la réponse." }, { quoted: msg });
        }
    }
};
