const { DataTypes } = require('sequelize');
const { database } = require('../settings');

const AntiStatusMentionDB = database.define('antistatusmention', {
    status: {
        type: DataTypes.ENUM('off', 'warn', 'delete', 'remove'),
        defaultValue: 'delete',
        allowNull: false
    },
    action: {
        type: DataTypes.ENUM('warn', 'delete', 'remove'),
        defaultValue: 'warn',
        allowNull: false
    },
    warn_limit: {
        type: DataTypes.INTEGER,
        defaultValue: 2,
        allowNull: false
    }
}, {
    timestamps: true
});

// ===== WARN SYSTEM =====
const warnCounts = new Map();

function getWarnCount(userJid) {
    return warnCounts.get(userJid) || 0;
}

function incrementWarnCount(userJid) {
    const current = getWarnCount(userJid);
    warnCounts.set(userJid, current + 1);
    return current + 1;
}

function resetWarnCount(userJid) {
    warnCounts.delete(userJid);
}

function clearAllWarns() {
    warnCounts.clear();
}

// ===== ANTI SPAM SYSTEM =====
const messageTracker = new Map();

function trackUserMessages(userJid) {
    const now = Date.now();

    if (!messageTracker.has(userJid)) {
        messageTracker.set(userJid, []);
    }

    const timestamps = messageTracker.get(userJid);

    // garder seulement les messages envoyés dans 5 secondes
    const filtered = timestamps.filter(t => now - t < 5000);
    filtered.push(now);

    messageTracker.set(userJid, filtered);

    return filtered.length;
}

function resetUserMessages(userJid) {
    messageTracker.delete(userJid);
}

// ===== DB INIT =====
async function initAntiStatusMentionDB() {
    try {
        await AntiStatusMentionDB.sync({ alter: true });
        console.log('AntiStatusMention table ready');
    } catch (error) {
        console.error('Error initializing AntiStatusMention table:', error);
        throw error;
    }
}

async function getAntiStatusMentionSettings() {
    try {
        const [settings] = await AntiStatusMentionDB.findOrCreate({
            where: {},
            defaults: {}
        });
        return settings;
    } catch (error) {
        console.error('Error getting antistatusmention settings:', error);
        return { 
            status: 'warn', 
            action: 'warn', 
            warn_limit: 2
        };
    }
}

async function updateAntiStatusMentionSettings(updates) {
    try {
        const settings = await getAntiStatusMentionSettings();
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating antistatusmention settings:', error);
        return null;
    }
}

module.exports = {
    initAntiStatusMentionDB,
    getAntiStatusMentionSettings,
    updateAntiStatusMentionSettings,
    getWarnCount,
    incrementWarnCount,
    resetWarnCount,
    clearAllWarns,
    trackUserMessages,
    resetUserMessages,
    AntiStatusMentionDB
};
