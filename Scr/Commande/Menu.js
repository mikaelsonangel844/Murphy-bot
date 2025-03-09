const fs = require('fs');
const menuText = `
┏━🔥『 *Murphy-MD* 』🔥━┓
┃ 🤖 *Bot WhatsApp Multi-Fonctions*
┃ 🚀 *Version:* 1.0.0
┃ 🕒 *Uptime:* Actif
┗━━━━━━━━━━━━━━┛

📌 *Commandes Disponibles:*

🔹 *👑 Admin*  
  ├ 🚷 !ban [@user] - Bannir un membre  
  ├ 🔄 !unban [@user] - Débannir un membre  
  ├ 🚫 !mute [@user] - Mute un membre  
  ├ ✅ !unmute [@user] - Démute un membre  
  ├ 📌 !pin [message] - Épingler un message  
  ├ 🚪 !kick [@user] - Expulser un membre  
  ├ 👥 !promote [@user] - Promouvoir en admin  
  ├ 💨 !demote [@user] - Rétrograder un admin  
  ├ 🔄 !reset - Réinitialiser le groupe  
  ├ 🚪 !leave - Quitter le groupe  
  ├ ⛔ !antilink on/off - Activer/Désactiver anti-lien  
  ├ 🤖 !antibot on/off - Activer/Désactiver anti-bot  
  ├ ⚠️ !warn [@user] - Avertir un membre  
  ├ 🛑 !unwarn [@user] - Retirer un avertissement  

🎉 *😂 Fun*  
  ├ 🃏 !meme - Envoyer un meme aléatoire  
  ├ 🎭 !joke - Raconter une blague  
  ├ 🎵 !song [titre] - Télécharger une musique  
  ├ 🎲 !dice - Lancer un dé  
  ├ 🐱 !cat - Image de chat aléatoire  
  ├ 🐶 !dog - Image de chien aléatoire  
  ├ 💖 !ship [@user1] [@user2] - Test d’amour  
  ├ 🥊 !fight [@user] - Combattre quelqu’un  
  ├ 🤣 !troll [@user] - Faire une blague à un membre  

📦 *🎬 Téléchargements*  
  ├ 🎥 !ytmp3 [url] - Télécharger audio YouTube  
  ├ 🎬 !ytmp4 [url] - Télécharger vidéo YouTube  
  ├ 📸 !igdl [url] - Télécharger une photo/vidéo Instagram  
  ├ 🎵 !spotify [titre] - Télécharger une musique Spotify  
  ├ 🎞️ !tiktok [url] - Télécharger une vidéo TikTok  
  ├ 🎧 !soundcloud [url] - Télécharger un son SoundCloud  
  ├ 🔍 !play [titre] - Jouer une musique depuis YouTube  

ℹ️ *📊 Infos*  
  ├ 🏷️ !profile - Voir ton profil  
  ├ 📊 !stats - Voir les stats du bot  
  ├ 🕹️ !ping - Vérifier la latence  
  ├ 📅 !date - Afficher la date du jour  
  ├ 🌍 !weather [ville] - Météo actuelle  
  ├ 🔢 !qr [texte] - Générer un QR Code  

📌 *🤖 IA & Assistance*  
  ├ 🧠 !ai [message] - Poser une question à l’IA  
  ├ 📝 !write [texte] - Générer une écriture stylée  
  ├ 🎤 !tts [lang] [texte] - Convertir un texte en audio  

🔰 *🔧 Utilitaires*  
  ├ 📸 !screenshot [url] - Prendre une capture d’écran  
  ├ 🌍 !translate [lang] [text] - Traduire un texte  
  ├ 🔎 !search [texte] - Recherche Google  
  ├ 🏆 !top5 - Voir le classement  
  ├ 🎨 !sticker - Créer un sticker  
  ├ 🖼️ !toimg [sticker] - Convertir un sticker en image  

⚠️ *🛡️ Sécurité*  
  ├ 🔐 !lock - Verrouiller le groupe  
  ├ 🔓 !unlock - Déverrouiller le groupe  
  ├ ⛔ !antinsfw on/off - Activer/Désactiver anti-NSFW  
  ├ 🕵️ !whois [numéro] - Trouver des infos sur un numéro  

📜 *📜 Divers*  
  ├ 🏠 !groupinfo - Infos sur le groupe  
  ├ 🚀 !speedtest - Tester la connexion  
  ├ ❓ !help - Voir l’aide complète  
  ├ 🛑 !report [bug] - Signaler un problème  

💡 *Murphy-MD, ton assistant intelligent !*
`;

const menuImage = './assets/menu.jpg'; // Chemin de l'image du menu

module.exports = {
  menuText,
  menuImage
};
