const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('davet')
        .setDescription('Botu sunucunuza davet etmek için linki gösterir.'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Bot Davet Linki')
            .setDescription('Botu sunucunuza davet etmek için [buraya tıklayın](https://discord.com/oauth2/authorize?client_id=1292183822506528778&permissions=8&integration_type=0&scope=bot).');
        
        await interaction.reply({ embeds: [embed] });
    },
};