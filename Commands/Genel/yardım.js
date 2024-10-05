const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yardım')
        .setDescription('Botun kullanılabilir komutlarını gösterir.'),
    
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Yardım Menüsü')
            .setDescription('Aşağıdaki komutları kullanabilirsiniz:')
            .addFields(
                { name: '/avatar', value: 'Kullanıcının avatarını gösterir.' },
                { name: '/ticketkur', value: 'Destek talebi oluşturmak için bir ticket açar.' },
                { name: '/istatistik', value: 'Botun istatistiklerini gösterir.' },
                { name: '/sunucu-bilgi', value: 'Sunucu hakkında bilgi verir.' },
                { name: '/kullanıcı-bilgi', value: 'Kullanıcı hakkında bilgi verir.' },
                { name: '/kodpaylas', value: 'Kod paylaşımı yapar.' },
            )
            .setTimestamp()
            .setFooter({ text: 'Yardım için başka bir şey sorabilirsiniz!' });

        await interaction.reply({ embeds: [embed] });
    },
};