const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sunucu-bilgi')
        .setDescription('Sunucu hakkında bilgi gösterir.'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#ffff00')
            .setTitle('Sunucu Bilgileri')
            .setDescription(`Sunucu Adı: ${interaction.guild.name}\nÜye Sayısı: ${interaction.guild.memberCount}`);

        await interaction.reply({ embeds: [embed] });
    },
};