const {
    Appembed
} = require('kyz');
const fs = require('fs');
let config = {};

if (fs.existsSync('config.json')) {
    config = JSON.parse(fs.readFileSync('config.json'));
}

module.exports = {
    description: 'https://appembed.netlify.app/e?description=Type%20VARqroullette%20%40user1%20%40user2%20%40user3%20to%20randomly%20pick%20a%20loser%20from%20the%20mentioned%20users!%20This%20one%20is%20instant%20however%2C%20alot%20less%20fun%20for%20party%20games%20as%20it%20doesn%27t%20build%20up%20any%20intensity&color=%23FF0000&provider=La%27s%20selfbot&author=VARqroullette',
    run: async (client, message, handler, prefix) => {
        const mentionedUsers = message.mentions.users;

        if (mentionedUsers.size < 2) {
            return message.channel.send('Please mention at least two users');
        }

        const usernames = mentionedUsers.map(user => user.username);
        const randomIndex = Math.floor(Math.random() * usernames.length);
        const selectedUser = usernames[randomIndex];

        const safePlayers = usernames.filter(user => user !== selectedUser).map(user => `${user} is safe ✅`).join('\n');

        const embed = new Appembed()
            .setAuthor('Results!')
            .setDescription(`${selectedUser} has lost! ❌\n\n${safePlayers}`)
            .setColor("#FF0000")
            .setProvider("Sioz selfbot")
            .build();

        message.channel.send(`${config.longstringoftext} ${embed}`);
    }
};