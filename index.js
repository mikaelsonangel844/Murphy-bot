const fs = require('fs');
const path = require('path');

// Définition du répertoire des commandes
const commandsDir = path.join(__dirname, 'commands');

// Vérification de l'existence du répertoire des commandes
if (!fs.existsSync(commandsDir)) {
    fs.mkdirSync(commandsDir, { recursive: true });
    console.log('Dossier des commandes créé.');
}

// Exemple d'importation et d'exécution d'une commande
const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandsDir, file));
    console.log(`Commande chargée : ${file}`);
}

// Création d'un flux d'écriture vers logs.txt
const logStream = fs.createWriteStream(path.join(__dirname, 'logs.txt'), { flags: 'a' });

// Redirection de la console vers logs.txt
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

console.log = (...args) => {
    const message = args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(' ');
    logStream.write(`[${new Date().toISOString()}] ${message}\n`);
    originalConsoleLog(`[${new Date().toISOString()}] ${message}`);
};

console.error = (...args) => {
    const message = args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(' ');
    logStream.write(`[${new Date().toISOString()}] [ERROR] ${message}\n`);
    originalConsoleError(`[${new Date().toISOString()}] [ERROR] ${message}`);
};
