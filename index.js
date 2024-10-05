const { 
    Client, 
    GatewayIntentBits, 
    Partials, 
    Collection, 
    EmbedBuilder, 
    ButtonBuilder, 
    Events, 
    ActionRowBuilder, 
    ButtonStyle, 
    ChannelType, 
    PermissionsBitField 
} = require('discord.js');

const { Guilds, GuildMembers, GuildMessages, MessageContent, GuildMessageReactions, GuildModeration } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel, DirectMessages } = Partials;

const { loadEvents } = require('./Handlers/eventHandler');
const { loadCommands } = require('./Handlers/commandHandler');

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages, 'GuildVoiceStates', MessageContent, GuildMessageReactions, GuildModeration],
    partials: [User, Message, GuildMember, ThreadMember, Channel, DirectMessages],
    allowedMentions: {
        repliedUser: false,
    },
});

client.on("ready", (client) => {
    console.log("Now Online: " + client.user.tag);
});

client.on('guildCreate', guild => {
    const defaultChannel = guild.systemChannel;
    if (defaultChannel) {
        const embed = new EmbedBuilder()
            .setColor('#e01444')
            .setTitle('Merhaba!')
            .setDescription("Beni sunucuna eklediğin için teşekkürler!\n'/' ön ekini kullanarak ile komutları çağırabilirsin.\n\nHerhangi bir kanala '/help' yazarak beni kullanmaya başlayabilirsin :)");
        defaultChannel.send({ embeds: [embed] });
    }
});

// Ticket oluşturma ve kapatma etkileşimlerini işleme
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'create_ticket') {
        const guild = interaction.guild;
        const member = interaction.member;

        // Ticket kategorisi oluştur veya mevcut kategoriyi kullan
        let category = guild.channels.cache.find(c => c.name === "Tickets" && c.type === ChannelType.GuildCategory);
        if (!category) {
            category = await guild.channels.create({
                name: 'Tickets',
                type: ChannelType.GuildCategory,
            });
        }

        // Ticket kanalı oluştur
        const channel = await guild.channels.create({
            name: `ticket-${member.user.username}`,
            type: ChannelType.GuildText,
            parent: category,
            permissionOverwrites: [
                {
                    id: guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id: member.id,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                },
            ],
        });

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Destek Talebi')
            .setDescription(`${member} tarafından oluşturuldu. Lütfen sorununuzu açıklayın.`);

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('close_ticket')
                    .setLabel('Ticketı Kapat')
                    .setStyle(ButtonStyle.Danger),
            );

        await channel.send({ embeds: [embed], components: [row] });
        await interaction.reply({ content: `Ticket oluşturuldu: ${channel}`, ephemeral: true });
    }

    if (interaction.customId === 'close_ticket') {
        const channel = interaction.channel;
        await channel.delete();
    }
});

client.commands = new Collection();
client.config = require('./config.json');

module.exports = client;

client.login(client.config.token).then(() => {
    loadEvents(client);
    loadCommands(client);
});
