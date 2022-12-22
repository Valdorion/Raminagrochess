const { EmbedBuilder } = require("discord.js");
const logger = require('../../utils/modules/logger');

module.exports = {
    name: 'ping',
    description: 'Information sur la latence de l\'API et du BOT.',
    async runSlash(client, interaction) {
        // Envoie un message temporaire pour évaluer la latence du bot
        interaction.reply('pong')
    }
}
