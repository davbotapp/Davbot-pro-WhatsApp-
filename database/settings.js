
const { DataTypes } = require('sequelize');
const { database } = require('../settings'); 

const SettingsDB = database.define('settings', {
    prefix: {
        type: DataTypes.STRING,
        defaultValue: "+",
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        defaultValue: "𝗜𝗿 𝗗𝗮𝘃𝗶𝗱 𝗠𝗽𝗼𝗻𝗴𝗼",
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        defaultValue: "https://i.ibb.co/yF8z02Z3/mysterious-hacker-figure-sitting-dark-260nw-2675788995.webp",
        allowNull: false
    },
    gurl: {
        type: DataTypes.STRING,
        defaultValue: "https://davbot-bet.vercel.app",
        allowNull: false
    },
    timezone: {
        type: DataTypes.STRING,
        defaultValue: "Africa/Nairobi",
        allowNull: false
    },
    botname: {
        type: DataTypes.STRING,
        defaultValue: "𝗗𝗮𝘃𝗯𝗼𝘁 𝗔𝗽𝗽",
        allowNull: false
    },
    packname: {
        type: DataTypes.STRING,
        defaultValue: "𝗗𝗮𝘃",
        allowNull: false
    },
    mode: {
        type: DataTypes.STRING,
        defaultValue: "public",
        allowNull: false
    
    
    },
    sessionName: {
        type: DataTypes.STRING,
        defaultValue: "𝗗𝗮𝘃",
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'bot_settings'
});

async function initSettingsDB() {
    try {
        await SettingsDB.sync({ alter: true });
        console.log('Settings table ready');
    } catch (error) {
        console.error('Error initializing Settings table:', error);
        throw error;
    }
}

async function getSettings() {
    try {
        let settings = await SettingsDB.findOne();
        if (!settings) {
            settings = await SettingsDB.create({});
        }
        return settings;
    } catch (error) {
        console.error('Error getting settings:', error);
        // Fallback to default settings
        return {
            prefix: "+",
            author: "𝗜𝗿 𝗗𝗮𝘃𝗶𝗱 𝗠𝗽𝗼𝗻𝗴𝗼",
            url: "https://i.ibb.co/yF8z02Z3/mysterious-hacker-figure-sitting-dark-260nw-2675788995.webp",
            gurl: "https://davbot-bet.vercel.app",
            timezone: "Africa/Nairobi",
            botname: "𝗗𝗮𝘃𝗯𝗼𝘁 𝗔𝗽𝗽",
            packname: "𝗗𝗮𝘃",
            mode: "public",
           
            sessionName: "𝗗𝗮𝘃"
        };
    }
}

async function updateSettings(updates) {
    try {
        const settings = await getSettings();
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating settings:', error);
        return null;
    }
}

async function getSetting(key) {
    try {
        const settings = await getSettings();
        return settings[key];
    } catch (error) {
        console.error(`Error getting setting ${key}:`, error);
        return null;
    }
}

module.exports = {
    initSettingsDB,
    getSettings,
    updateSettings,
    getSetting,
    SettingsDB
};
