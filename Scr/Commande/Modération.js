module.exports = {
    kick: async (sock, from, msg, args) => {
        if (!msg.key.participant.endsWith("@s.whatsapp.net")) return;
        if (!msg.message.extendedTextMessage || !msg.message.extendedTextMessage.contextInfo || !msg.message.extendedTextMessage.contextInfo.mentionedJid) {
            return sock.sendMessage(from, { text: "❌ *Utilisation:* !kick @utilisateur" }, { quoted: msg });
        }

        const mentioned = msg.message.extendedTextMessage.contextInfo.mentionedJid[0];
        await sock.groupParticipantsUpdate(from, [mentioned], "remove");
        sock.sendMessage(from, { text: `✅ *L'utilisateur a été expulsé !*` }, { quoted: msg });
    },

    promote: async (sock, from, msg, args) => {
        if (!msg.key.participant.endsWith("@s.whatsapp.net")) return;
        if (!msg.message.extendedTextMessage || !msg.message.extendedTextMessage.contextInfo || !msg.message.extendedTextMessage.contextInfo.mentionedJid) {
            return sock.sendMessage(from, { text: "❌ *Utilisation:* !promote @utilisateur" }, { quoted: msg });
        }

        const mentioned = msg.message.extendedTextMessage.contextInfo.mentionedJid[0];
        await sock.groupParticipantsUpdate(from, [mentioned], "promote");
        sock.sendMessage(from, { text: `✅ *L'utilisateur est maintenant administrateur !*` }, { quoted: msg });
    },

    demote: async (sock, from, msg, args) => {
        if (!msg.key.participant.endsWith("@s.whatsapp.net")) return;
        if (!msg.message.extendedTextMessage || !msg.message.extendedTextMessage.contextInfo || !msg.message.extendedTextMessage.contextInfo.mentionedJid) {
            return sock.sendMessage(from, { text: "❌ *Utilisation:* !demote @utilisateur" }, { quoted: msg });
        }

        const mentioned = msg.message.extendedTextMessage.contextInfo.mentionedJid[0];
        await sock.groupParticipantsUpdate(from, [mentioned], "demote");
        sock.sendMessage(from, { text: `✅ *L'utilisateur a perdu ses droits d'admin !*` }, { quoted: msg });
    },

    mute: async (sock, from, msg) => {
        await sock.groupSettingUpdate(from, "announcement");
        sock.sendMessage(from, { text: "🔇 *Le groupe est maintenant en mode silencieux !* Seuls les admins peuvent envoyer des messages." }, { quoted: msg });
    },

    unmute: async (sock, from, msg) => {
        await sock.groupSettingUpdate(from, "not_announcement");
        sock.sendMessage(from, { text: "🔊 *Le groupe est maintenant ouvert !* Tout le monde peut envoyer des messages." }, { quoted: msg });
    }
};
