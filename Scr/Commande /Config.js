require("dotenv").config(); // Charge les variables d'environnement

const config = {
    botName: process.env.BOT_NAME,
    ownerName: process.env.OWNER_NAME,
    ownerNumber: process.env.OWNER_NUMBER,

    prefix: process.env.PREFIX,
    sessionName: process.env.SESSION_NAME,
    language: process.env.LANGUAGE,

    logoUrl: process.env.LOGO_URL,
    botDescription: process.env.BOT_DESCRIPTION,
    welcomeMessage: process.env.WELCOME_MESSAGE,

    security: {
        autoBan: process.env.AUTO_BAN === "true",
        antiSpam: process.env.ANTI_SPAM === "true",
        antiLink: process.env.ANTI_LINK === "true",
        maxWarnings: parseInt(process.env.MAX_WARNINGS),
    },

    advanced: {
        autoRestart: process.env.AUTO_RESTART === "true",
        debugMode: process.env.DEBUG_MODE === "true",
    },
};

module.exports = config;
