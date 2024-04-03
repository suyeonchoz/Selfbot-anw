const fs = require('fs');
let config = {};

if (fs.existsSync('config.json')) {
    config = JSON.parse(fs.readFileSync('config.json'));
}

module.exports = {
    description: 'https://appembed.netlify.app/e?t=&c=%23FF0000&a=VARserverinfo&d=Send%20VARserverinfo%20in%20a%20discord%20server%20to%20recieve%20info%20on%20the%20discord%20server!&p=Sioz Selfbots%20selfbot&i=&ic=',
    run: async (client, message, handler, prefix) => {
        if (message.content.toLowerCase().startsWith(`${prefix}serverinfo`)) {
            message.react(config.successEmoji).catch(err => message.react('<a:Black_Butterfly:1095210519020970046>').catch(e => console.log(e)));

            const guild = message.guild;
            await guild.members.fetch({
                user: guild.ownerId
            });

            const guildOwner = guild.members.cache.get(guild.ownerId);

            const guildCreatedAt = guild.createdAt;
            const memberCount = guild.memberCount;
            const guildRegion = guild.region;
            const guildVerificationLevel = guild.verificationLevel;
            const guildRoles = guild.roles.cache.size;
            const guildChannels = guild.channels.cache.size;

            const guildEmojis = guild.emojis.cache.map(emoji => emoji.toString()).join(" ");
            const guildFeatures = guild.features.join(", ");
            const guildBoostLevel = guild.premiumTier;
            const guildBoostCount = guild.premiumSubscriptionCount;

            const guildBanner = guild.bannerURL({
                dynamic: true
            }) || 'No banner';
            const guildIcon = guild.iconURL({
                dynamic: true
            }) || 'No icon';

            message.reply(`
        ⏁ Server Info
        >>> _ _
        **Name:** ${guild.name}
        **ID:** ${guild.id}
        **Owner:** ${guildOwner ? guildOwner.user.tag + ' (' + guildOwner.id + ')' : 'Unknown'}
  
        **Created:** ${guildCreatedAt}
        **Member Count:** ${memberCount}
        **Region:** ${guildRegion}
        **Verification Level:** ${guildVerificationLevel}
        **Roles:** ${guildRoles}
        **Channels:** ${guildChannels}
  
        **Emojis:** ${guildEmojis}
        **Features:** ${guildFeatures}
        **Boost Level:** ${guildBoostLevel}
        **Boost Count:** ${guildBoostCount}
  
        **Banner:** ${guildBanner}
        **Icon:** ${guildIcon}
      `);
        }
    }
};