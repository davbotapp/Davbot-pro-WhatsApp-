const { DataTypes } = require('sequelize');
const { database } = require('../settings');

const GroupEventsDB = database.define('groupevents', {
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // ✅ Toujours activé
        allowNull: false
    },

    welcomeMessage: {
        type: DataTypes.TEXT,
        defaultValue:
`👋 𝗕𝗜𝗘𝗡𝗩𝗘𝗡𝗨𝗘 @user

Bienvenue dans *{group}* 🎉

Nous sommes très heureux de t'accueillir parmi nous.

👥 Tu es le membre numéro *{count}*

⏰ Heure : *{time}*

📌 Description du groupe :
{desc}

⚠️ Merci de lire et respecter les règles du groupe.

🚀 Powered by Davbot`,
        allowNull: true
    },

    goodbyeMessage: {
        type: DataTypes.TEXT,
        defaultValue:
`👤 @user

Merci d'avoir été avec nous dans *{group}*.

⏰ Heure du départ : *{time}*

👥 Membres restants : *{count}*

Au revoir 👋
Merci de ne plus revenir parmi nous.`,
        allowNull: true
    },

    showPromotions: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // ✅ Promotions activées
        allowNull: false
    }

}, {
    timestamps: true
});

async function initGroupEventsDB() {
    try {

        await GroupEventsDB.sync({ alter: true });

        console.log('✅ GroupEvents table ready (ALWAYS ENABLED)');

    } catch (error) {

        console.error('❌ Error initializing GroupEvents table:', error);

        throw error;

    }
}

async function getGroupEventsSettings() {

    try {

        let settings = await GroupEventsDB.findOne();

        if (!settings) {

            settings = await GroupEventsDB.create({
                enabled: true,
                showPromotions: true
            });

        }

        return settings;

    } catch (error) {

        console.error('❌ Error getting group events settings:', error);

        return {
            enabled: true,
            welcomeMessage: "",
            goodbyeMessage: "",
            showPromotions: true
        };

    }
}

async function updateGroupEventsSettings(updates) {

    try {

        const settings = await getGroupEventsSettings();

        return await settings.update(updates);

    } catch (error) {

        console.error('❌ Error updating group events settings:', error);

        return null;

    }
}

module.exports = {

    initGroupEventsDB,
    getGroupEventsSettings,
    updateGroupEventsSettings,
    GroupEventsDB

};
