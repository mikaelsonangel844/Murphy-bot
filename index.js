const fs = require('fs');
const path = require('path');
const { Client, LocalAuth } = require('whatsapp-web.js');

// Vérification et création du dossier "commands" si nécessaire
const commandsDir = path.join(__dirname, 'commands');
if (!fs.existsSync(commandsDir)) {
    fs.mkdirSync(commandsDir);
    console.log('Dossier "commands" créé.');
}

// Chargement des commandes
const commands = new Map();
fs.readdirSync(commandsDir).forEach(file => {
    if (file.endsWith('.js')) {
        const command = require(path.join(commandsDir, file));
        commands.set(command.name, command);
    }
});

// Initialisation du bot
const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr', qr => {
    console.log('QR Code reçu', qr);
});

client.on('ready', () => {
    console.log('Murphy-MD est en ligne !');
});

client.on('message', async message => {
    const args = message.body.trim().split(/\s+/);
    const commandName = args.shift().toLowerCase();

    if (commands.has(commandName)) {
        try {
            await commands.get(commandName).execute(message, args);
        } catch (error) {
            console.error(`Erreur lors de l'exécution de la commande ${commandName}:`, error);
            message.reply('Une erreur est survenue en exécutant la commande.');
        }
    }
});

client.initialize();
