const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    PermissionFlagsBits,
} = require("discord.js");
const { CommandCooldown, msToMinutes } = require("discord-command-cooldown");
const config = require('./../../config.json')
const { ButtonStyle } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('afk')
        .setDescription('Mensaje AFK.')
        .addUserOption(option =>
            option
                .setName('usuario')
                .setDescription('Pon el usuario el cual esté AFK')
                .setRequired(true)
        ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {

        const embed3 = new Discord.EmbedBuilder()
            .setDescription(`Solo los miembros del staff pueden utilizar este comando! <@${interaction.user.id}>`)
            .setColor(config.colorMain)

        if (!interaction.member.roles.cache.has(config.rolstaff)) return interaction.reply({ embeds: [embed3], ephemeral: true })

        const usuario = interaction.options.getMember('usuario')

        if (usuario === null) return interaction.reply({ content: "Este usuario no está en el discord.", ephemeral: true })

        const button = new Discord.ButtonBuilder()
        .setStyle('Link')
        .setURL(config.discord)
        .setLabel('Ir al Servidor!')
        .setEmoji(`<:8454website:1140055172064755733>`);
        
    
    const row = new Discord.ActionRowBuilder()
        .addComponents(button);
        
        const embedafk = new Discord.EmbedBuilder()
            .addFields(
                { name: "📢 ・ Sistema AFK de Usuarios ", value: `Usted tiene un ticket abierto en **${interaction.guild.name}**, porfavor, reviselo lo antes posible` },
            )
            .setColor(config.colorMain)
            .setFooter({ text: `Sistema AFK de ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })

         const embedfeedbackafk = new Discord.EmbedBuilder()
            .setDescription('📢  ・ El aviso por **AFK** ha sido enviado al usuario correctamente!')
            .setColor(config.colorMain)

        usuario.user.send({ embeds: [embedafk], components: [row] });
		interaction.reply({ embeds: [embedfeedbackafk] })


    },
};
