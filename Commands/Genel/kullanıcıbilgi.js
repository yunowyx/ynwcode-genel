const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kullanıcı')
        .setDescription('Belirtilen kullanıcının bilgilerini gösterir.')
        .addUserOption(option => 
            option.setName('hedef')
                .setDescription('Bilgilerini görüntülemek istediğiniz kullanıcı')
                .setRequired(false)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('hedef') || interaction.user; // Kullanıcı seçilmezse komutu yazan kişi seçilir.
        const member = await interaction.guild.members.fetch(user.id);

        // Embed yapısı
        const userEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${user.username} kullanıcısının bilgileri`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .addFields(
                { name: 'Kullanıcı ID', value: `${user.id}`, inline: true },
                { name: 'Kullanıcı adı', value: `${user.username}`, inline: true },
                { name: 'Sunucuya Katılma Tarihi', value: `<t:${parseInt(member.joinedTimestamp / 1000)}:R>`, inline: true },
                { name: 'Hesap Oluşturma Tarihi', value: `<t:${parseInt(user.createdTimestamp / 1000)}:R>`, inline: true },
            )
            .setFooter({ text: `İsteyen: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        // Embed'i gönder
        await interaction.reply({ embeds: [userEmbed] });
    },
};