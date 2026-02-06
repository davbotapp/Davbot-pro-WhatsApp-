const { DataTypes } = require('sequelize');
const { database } = require('../settings');

// Table AntiSpam
const AntiSpamDB = database.define('antispam', {
  enabled: {             // Active ou désactive l'antispam
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: true
  },
  timeLimit: {           // Temps minimum entre 2 messages d'un utilisateur (ms)
    type: DataTypes.INTEGER,
    defaultValue: 2000,
    allowNull: true
  },
  warnLimit: {           // Nombre d'avertissements avant action
    type: DataTypes.INTEGER,
    defaultValue: 2,
    allowNull: true
  },
  action: {              // Que faire après la limite
    type: DataTypes.ENUM('warn','delete','remove'),
    defaultValue: 'warn',
    allowNull: true
  }
}, {
  timestamps: true
});

// ⚡ Stocke les infos en mémoire
const userSpam = new Map();

async function initAntiSpamDB() {
  try {
    await AntiSpamDB.sync({ alter: true });
    console.log('AntiSpam table ready');
  } catch (error) {
    console.error('Error initializing AntiSpam table:', error);
    throw error;
  }
}

async function getAntiSpamSettings() {
  try {
    const [settings] = await AntiSpamDB.findOrCreate({ where: {}, defaults: {} });
    return settings;
  } catch (error) {
    console.error('Error getting AntiSpam settings:', error);
    return {
      enabled: false,
      timeLimit: 2000,
      warnLimit: 2,
      action: 'warn'
    };
  }
}

async function updateAntiSpamSettings(updates) {
  try {
    const settings = await getAntiSpamSettings();
    return await settings.update(updates);
  } catch (error) {
    console.error('Error updating AntiSpam settings:', error);
    return null;
  }
}

// Fonction pour vérifier si un message est spam
async function checkSpam(userJid) {
  const settings = await getAntiSpamSettings();
  if (!settings.enabled) return false; // Si désactivé

  const now = Date.now();
  const userData = userSpam.get(userJid) || { lastMsg: 0, warns: 0 };
  const diff = now - userData.lastMsg;

  if (diff < settings.timeLimit) {
    userData.warns += 1;
    userData.lastMsg = now;
    userSpam.set(userJid, userData);

    if (userData.warns >= settings.warnLimit) {
      // Action automatique selon la config
      userData.warns = 0; // reset warns
      userSpam.set(userJid, userData);
      return settings.action; // renvoie 'warn', 'delete' ou 'remove'
    }
    return 'warn'; // avertissement
  } else {
    userData.lastMsg = now;
    userSpam.set(userJid, userData);
    return false; // pas de spam
  }
}

function resetUser(userJid) {
  userSpam.delete(userJid);
}

function clearAll() {
  userSpam.clear();
}

module.exports = {
  initAntiSpamDB,
  getAntiSpamSettings,
  updateAntiSpamSettings,
  checkSpam,
  resetUser,
  clearAll,
  AntiSpamDB
};
