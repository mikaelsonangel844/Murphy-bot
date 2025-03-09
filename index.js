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

// Démarrage du bot (ajoute ton code ici)
console.log('Bot démarré avec succès.');
