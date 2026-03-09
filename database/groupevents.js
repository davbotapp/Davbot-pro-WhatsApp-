const { DataTypes } = require('sequelize');
const { database } = require('../settings');

const GroupEventsDB = database.define('groupevents', {
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // 🔴 Désactivé par défaut
        allowNull: false
    },
    welcomeMessage: {
        type: DataTypes.TEXT,
        defaultValue: "𝗦𝗮𝗹𝘂𝘁 @user 👋\n𝗕𝗶𝗲𝗻𝘃𝗲𝗻𝘂 𝗱𝗮𝗻𝘀 *{group}*.\nTu es membre #{count}.\nTime: *{time}*\nDescription: {desc}",
        allowNull: true
    },
    goodbyeMessage: {
        type: DataTypes.TEXT,
        defaultValue: "𝗕𝘆𝗲 @user 👋\nLeft at: *{time}*\nMembers left: {count}",
        allowNull: true
    },
    showPromotions: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // 🔴 Désactivé aussi
        allowNull: false
    }
}, {
    timestamps: true
});

async function initGroupEventsDB() {
    try {
        await GroupEventsDB.sync({ alter: true });
        console.log('GroupEvents table ready (DISABLED)');
    } catch (error) {
        console.error('Error initializing GroupEvents table:', error);
        throw error;
    }
}

async function getGroupEventsSettings() {
    try {
        let settings = await GroupEventsDB.findOne();

        if (!settings) {
            settings = await GroupEventsDB.create({
                enabled: false,
                showPromotions: false
            });
        }

        return settings;

    } catch (error) {
        console.error('Error getting group events settings:', error);

        return {
            enabled: false,
            welcomeMessage: "",
            goodbyeMessage: "",
            showPromotions: false
        };
    }
}

async function updateGroupEventsSettings(updates) {
    try {
        const settings = await getGroupEventsSettings();
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating group events settings:', error);
        return null;
    }
}

module.exports = {
    initGroupEventsDB,
    getGroupEventsSettings,
    updateGroupEventsSettings,
    GroupEventsDB
};
