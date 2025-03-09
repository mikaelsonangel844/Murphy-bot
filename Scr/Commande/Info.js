const os = require('os');
const { execSync } = require('child_process');

module.exports = {
    botinfo: async (sock, from, msg) => {
        const uptime = os.uptime(); // Temps depuis lequel le bot est actif
        const botName = "Murphy-MD";
        const version = "1.0.0"; // Remplace par la vraie version de ton bot
        const owner = "+242057954499"; // Remplace par ton numéro

        const infoMessage = `
🤖 *${botName}* - Informations
━━━━━━━━━━━━━━━━━━━━
📌 *Version:* ${version}
⏳ *Uptime:* ${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m
👑 *Propriétaire:* ${owner}
🌐 *Hébergé sur:* https://murphy-md.onrender.com
📅 *Date:* ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━
        `;
        
        sock.sendMessage(from, { text: infoMessage }, { quoted: msg });
    },

    ping: async (sock, from, msg) => {
        const start = Date.now();
        await sock.sendMessage(from, { text: "🏓 *Ping en cours...*" }, { quoted: msg });
        const end = Date.now();
        const ping = end - start;
        sock.sendMessage(from, { text: `🏓 *Pong !* Latence: *${ping}ms*` }, { quoted: msg });
    },

    sysinfo: async (sock, from, msg) => {
        const cpuModel = os.cpus()[0].model;
        const ramTotal = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
        const ramFree = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
        const osType = os.type();
        const osVersion = os.release();

        const sysInfoMessage = `
🖥 *Informations Système*
━━━━━━━━━━━━━━━━━━━━
💾 *CPU:* ${cpuModel}
💽 *RAM Totale:* ${ramTotal} GB
🚀 *RAM Libre:* ${ramFree} GB
🖥 *OS:* ${osType} ${osVersion}
━━━━━━━━━━━━━━━━━━━━
        `;

        sock.sendMessage(from, { text: sysInfoMessage }, { quoted: msg });
    }
};
