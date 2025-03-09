const config = {
    // 📌 Informations principales
    botName: "Murphy-MD",
    ownerName: "Murphy FF",
    ownerNumber: "+242057954499",

    // ⚙️ Paramètres généraux
    prefix: "!", // Préfixe du bot
    sessionName: "murphy-md-session",
    language: "fr", // Langue du bot (fr/en/...)

    // 🌐 Liens & Médias
    logoUrl: "https://TON-LIEN-DU-LOGO.jpg", // Mets ici l’URL du logo
    botDescription: "🤖 Murphy-MD | Bot WhatsApp puissant et intelligent.",
    welcomeMessage: "👋 Bienvenue sur *Murphy-MD*! Tape `!menu` pour voir les commandes.",

    // 🚀 Système de permissions & rôles
    roles: {
        superAdmins: ["+242057954499"], // Super Admins
        admins: [], // Ajoute d’autres admins ici
        users: [], // Liste des utilisateurs normaux (facultatif)
    },

    // 🎭 Commandes réservées aux admins
    adminCommands: ["kick", "promote", "demote", "mute", "unmute", "ban", "warn"],

    // ⚠️ Sécurité & Modération
    security: {
        autoBan: true, // Ban automatique après plusieurs avertissements
        antiSpam: true, // Bloque les messages répétés
        antiLink: true, // Supprime les liens interdits
        maxWarnings: 3, // Nombre d’avertissements avant ban
    },

    // 🛠 Paramètres avancés
    advanced: {
        autoRestart: true, // Redémarrage automatique en cas de crash
        debugMode: false, // Mode debug
    },

    // 📂 Gestion des fichiers et logs
    paths: {
        logs: "./logs/murphy-md.log",
        media: "./media",
        temp: "./temp",
    },

    // 📡 Système de réponse automatique
    autoReply: {
        enable: true,
        messages: {
            hi: "👋 Salut ! Comment puis-je t'aider ?",
            bye: "👋 À bientôt !",
            thanks: "😊 Avec plaisir !",
        },
    },

    // 💰 Système d'économie (facultatif)
    economy: {
        enable: true,
        startingBalance: 500,
        dailyBonus: 100,
    },
};

module.exports = config;
