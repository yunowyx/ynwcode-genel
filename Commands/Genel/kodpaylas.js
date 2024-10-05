const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kodpaylas')
        .setDescription('Kod paylaşmak için bir mesaj gönderir.')
        .addStringOption(option => 
            option.setName('kod')
                .setDescription('Paylaşmak istediğiniz kodu yazın')
                .setRequired(true)),
    async execute(interaction) {
        const kod = interaction.options.getString('kod');
        const embed = new EmbedBuilder()
            .setColor('#20b2aa')
            .setTitle('Kod Paylaşımı')
            .setDescription(`Paylaşılan Kod:\n\`\`\`\n${kod}\n\`\`\``);

        await interaction.reply({ embeds: [embed] });
    },
};