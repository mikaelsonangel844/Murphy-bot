const path = require('path');

const commandsDir = path.join(__dirname, 'commands');

// Vérifier si le dossier commands existe, sinon le créer
if (!fs.existsSync(commandsDir)) {
    fs.mkdirSync(commandsDir);
}

const commands = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));

commands.forEach(file => {
    const command = require(`./commands/${file}`);
    console.log(`Commande chargée: ${command.name}`);
});

console.log("Murphy-MD démarré avec succès !");
