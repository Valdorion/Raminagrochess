const { ActivityType } = require("discord.js");
const logger = require("../../utils/modules/logger");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        // Log la disponibilité du bot
        logger.info(`${client.user.username} est en ligne !`, 'root', 'Lancement d\'Epsius fini');
        // Déconnexion des serveur non valide
        client.guilds.cache.forEach(guild => {
            if (guild.id !== process.envVar.discord.guild){
                logger.debug(`Déconnexion du serveur : ${guild.name}`, client.user.id, JSON.stringify(guild, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value))
                guild.leave()
            }
            
        })
        // Définition du serveur dans lequel les commandes sont ajoutées
        const devGuild = await client.guilds.cache.get(process.envVar.discord.guild);
        // Ajout des commandes au serveur
        devGuild.commands.set(client.commands.map(cmd => cmd));
        // Définie l'activité du bot
        client.user.setActivity('🚧 Maintenance 🚧', { type: ActivityType.Watching });
    }
}