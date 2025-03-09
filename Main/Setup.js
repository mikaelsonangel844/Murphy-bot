const fs = require('fs');
const path = require('path');

const authDir = path.join(__dirname, 'auth_info');
const credsFile = path.join(authDir, 'creds.json');

// Vérifier si le dossier existe, sinon le créer
if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
    console.log('📂 Dossier auth_info créé.');
}

// Vérifier si le fichier creds.json existe, sinon le créer
if (!fs.existsSync(credsFile)) {
    fs.writeFileSync(credsFile, '{}');
    console.log('✅ Fichier creds.json créé.');
} else {
    console.log('⚠️ Le fichier creds.json existe déjà.');
}
