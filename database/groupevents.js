const { DataTypes } = require('sequelize');
const { database } = require('../settings');

const GroupEventsDB = database.define('groupevents', {
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true
    },
    welcomeMessage: {
        type: DataTypes.TEXT,
        defaultValue: "𝗦𝗮𝗹𝘂𝘁 @user 👋\n𝗕𝗶𝗲𝗻𝘃𝗲𝗻𝘂 𝗱𝗮𝗻𝘀 *{group}*.\n𝘁𝘂 𝗲𝘀 𝗺𝗲𝗺𝗯𝗿𝗲 #{count}.\nTime: *{time}*\nDescription: {desc}",
        allowNull: true
    },
    goodbyeMessage: {
        type: DataTypes.TEXT,
        defaultValue: "𝗕𝘆𝗲  @user 𝗻𝗲 𝗿𝗲𝘃𝗶𝗲𝗻𝘀 𝗽𝗹𝘂𝘀😔\nLeft at: *{time}*\nMembers left: {count}",
        allowNull: true
    },
    showPromotions: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true
    }
}, {
    timestamps: true
});

async function initGroupEventsDB() {
    try {
        await GroupEventsDB.sync({ alter: true });
        console.log('GroupEvents table ready');
    } catch (error) {
        console.error('Error initializing GroupEvents table:', error);
        throw error;
    }
}

async function getGroupEventsSettings() {
    try {
        const settings = await GroupEventsDB.findOne();
        if (!settings) {
            return await GroupEventsDB.create({});
        }
        return settings;
    } catch (error) {
        console.error('Error getting group events settings:', error);
        return { 
            enabled: true,
            welcomeMessage: "𝗕𝗶𝗲𝗻𝘃𝗲𝗻𝘂 @user 𝗱𝗮 𝗹𝗲 𝗴𝗿𝗼𝘂𝗽𝗲: {group}!",
            goodbyeMessage: "𝗘𝗻 𝗳𝗶𝗻 𝗰𝗲𝘁𝘁𝗲 𝗶𝗺𝗯𝗲𝗰𝗶𝗹𝗲 𝗲𝘀𝘁 𝗽𝗮𝗿𝘁𝗶𝗲 @user! ",
            showPromotions: true
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
