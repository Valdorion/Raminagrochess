const {ApplicationCommandOptionType, ChannelType, PermissionFlagsBits} = require('discord.js');
const logger = require('../../utils/modules/logger');

module.exports = {
    name: 'add_chess_party',
    description: 'Créer une partie d\'échec',
    options: [{
        type: ApplicationCommandOptionType.String,
        name: 'nom',
        description: 'Le nom de la partie',
        required: true,
    },{
        type: ApplicationCommandOptionType.User,
        name: 'adversaire',
        description: 'Compte de l\'adversaire',
        required: true
    }],
    async runSlash(client, interaction) {
        // Récupération des données saisies
        const inputNom = interaction.options.getString('nom');
        const inputIntervenant = await interaction.member.guild.members.fetch(interaction.options.getUser('adversaire').id);

        //définission des permission d'everyone
        let permission = [{ id: process.envVar.discord.everyoneRole, deny: [PermissionFlagsBits.ViewChannel] }];
        await interaction.channel.permissionOverwrites.edit(inputIntervenant, { ViewChannel: true }, {reason: `${interaction.user.id} ajoute ${inputIntervenant.user.id} au salon temporaire #${interaction.channel.name}`})

        // Création du channel temporaire
        interaction.guild.channels.create({ 
            name: inputNom,
            type: ChannelType.GuildText,
            reason: `Channel créé avec la commande /add_chess_party par ${interaction.user.username}#${interaction.user.discriminator}`,
            permissionOverwrites: permission,
        }).then(channel => {
            // Envoie un message dans le channel nouvellement créé
            channel.send(`Bienvenue dans la partie d'échec ${inputNom} créé par ${interaction.user}!`);
            logger.success(`Le channel ${channel.name} a été créé avec succès !`, interaction.member.id, JSON.stringify(interaction, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value), false);
            // Envoie un message dans le channel de la commande
            interaction.reply(`Le channel ${channel} a été créé avec succès !`);
        });
    }
}