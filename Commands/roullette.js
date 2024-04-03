const fs = require('fs');
const {
    createCanvas,
    loadImage
} = require('canvas');
const Discord = require('discord.js-selfbot-v13');
const {
    Appembed
} = require('kyz');

let config = {};

if (fs.existsSync('config.json')) {
    config = JSON.parse(fs.readFileSync('config.json'));
}

module.exports = {
    description: 'https://appembed.netlify.app/e?description=Type%20VARroullette%20%40user1%20%40user2%20%40user3%20to%20randomly%20pick%20a%20loser%20from%20any%20of%20the%20mentioned%20participents.&color=%23FF0000&provider=TonyskalYT%27s%20selfbot&author=VARroullette',
    run: async (client, message, handler, prefix) => {
        const mentionedUsers = message.mentions.users;

        if (mentionedUsers.size < 2) {
            return message.channel.send('Please mention at least two users');
        }

        const channeltospamin = ("1070571788158898187")
        const userIds = mentionedUsers.map(user => user.id);
        const canvas = createCanvas(400, 200);
        const ctx = canvas.getContext('2d');

        const lostIndex = Math.floor(Math.random() * userIds.length);
        const lostUserId = userIds[lostIndex];
        const lostUser = await client.users.fetch(lostUserId);
        const lostAvatar = await loadImage(lostUser.displayAvatarURL({
            format: 'png',
            size: 128
        }));

        const lostImage = await loadImage('https://cdn.discordapp.com/attachments/1160761272405602435/1190173637450399794/roullette-dead.png');
        ctx.drawImage(lostImage, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(lostAvatar, 150, 50, 100, 100);

        const lostAttachment = new Discord.MessageAttachment(canvas.toBuffer(), 'lost.png');
        const tempChannel = client.channels.cache.get(channeltospamin);

        if (!tempChannel) {
            return message.channel.send('Could not find the specified channel');
        }

        const tempMessage = await tempChannel.send({
            files: [lostAttachment],
            spoiler: true
        });
        const lostURL = tempMessage.attachments.first().url;

        let displayMessage = await message.channel.send('Spinning barrel...');

        const safeImage = await loadImage('https://cdn.discordapp.com/attachments/1160761272405602435/1190173665363496990/roullette-safe.png');
        const safeUserIds = userIds.filter(id => id !== lostUserId);

        for (const userId of safeUserIds) {
            const user = await client.users.fetch(userId);
            const avatar = await loadImage(user.displayAvatarURL({
                format: 'png',
                size: 128
            }));

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(safeImage, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(avatar, 150, 50, 100, 100);

            const safeAttachment = new Discord.MessageAttachment(canvas.toBuffer(), 'safe.png');
            const safeTempMessage = await tempChannel.send({
                files: [safeAttachment],
                spoiler: true
            });
            const safeURL = safeTempMessage.attachments.first().url;

            const appEmbedSafe = new Appembed()
                .setAuthor(`${user.tag} is safe!`)
                .setDescription(`${user.tag} is safe for this round.`)
                .setColor("#00FF00")
                .setProvider("Sioz selfbot")
                .setImage(safeURL)
                .build();

            await displayMessage.edit(`${config.longstringoftext} ${appEmbedSafe}`);

            await new Promise(resolve => setTimeout(resolve, 3000));
            await safeTempMessage.delete();
        }

        const appEmbedLost = new Appembed()
            .setAuthor(`${lostUser.tag} lost!`)
            .setDescription(`${lostUser.tag} lost this round.`)
            .setColor("#FF0000")
            .setProvider("Sioz selfbot")
            .setImage(lostURL)
            .build();

        await displayMessage.edit(`${config.longstringoftext} ${appEmbedLost}`);

        await tempMessage.delete();
    }
};