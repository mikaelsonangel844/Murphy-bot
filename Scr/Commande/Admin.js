module.exports = {
    admin: async (sock, from, msg, args) => {
        if (!args[0]) {
            return sock.sendMessage(from, { text: "❌ *Utilisation:* !admin [list/promote/demote]" }, { quoted: msg });
        }

        const action = args[0].toLowerCase();
        const isGroup = from.endsWith("@g.us");

        if (!isGroup) {
            return sock.sendMessage(from, { text: "❌ Cette commande est réservée aux groupes." }, { quoted: msg });
        }

        const groupMetadata = await sock.groupMetadata(from);
        const participants = groupMetadata.participants;
        const admins = participants.filter(p => p.admin !== null).map(p => p.id);

        if (action === "list") {
            const adminList = admins.map(admin => `- @${admin.split('@')[0]}`).join("\n");
            sock.sendMessage(from, { text: `👑 *Liste des admins :*\n\n${adminList}`, mentions: admins }, { quoted: msg });
        } else if (["promote", "demote"].includes(action)) {
            if (!msg.message.extendedTextMessage || !msg.message.extendedTextMessage.contextInfo || !msg.message.extendedTextMessage.contextInfo.mentionedJid) {
                return sock.sendMessage(from, { text: `❌ *Utilisation:* !admin ${action} @utilisateur` }, { quoted: msg });
            }

            const mentioned = msg.message.extendedTextMessage.contextInfo.mentionedJid[0];

            if (action === "promote") {
                await sock.groupParticipantsUpdate(from, [mentioned], "promote");
                sock.sendMessage(from, { text: `✅ *L'utilisateur @${mentioned.split('@')[0]} est maintenant admin !*`, mentions: [mentioned] }, { quoted: msg });
            } else if (action === "demote") {
                await sock.groupParticipantsUpdate(from, [mentioned], "demote");
                sock.sendMessage(from, { text: `✅ *L'utilisateur @${mentioned.split('@')[0]} n'est plus admin !*`, mentions: [mentioned] }, { quoted: msg });
            }
        } else {
            sock.sendMessage(from, { text: "❌ Action invalide ! Utilise: list, promote, demote." }, { quoted: msg });
        }
    }
};
