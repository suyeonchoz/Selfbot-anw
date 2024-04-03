const axios = require('axios');
const moment = require('moment');
const fs = require('fs');
let config = {};

if (fs.existsSync('config.json')) {
    config = JSON.parse(fs.readFileSync('config.json'));
}

module.exports = {
    description: 'https://appembed.netlify.app/e?description=type%20VARmeme%205%20to%20get%205%20memes!%20You%20can%20also%20say%20VARmeme%20to%20only%20get%20one%20meme.&provider=Sioz%20selfbot&author=VARmeme&image=&color=%23FF0000',
    run: async (client, message, handler, prefix) => {
        try {
            message.react(config.successEmoji).catch(err => message.react('<a:Black_Butterfly:1095210519020970046>').catch(e => console.log(e)));
            const input = message.content.trim().slice(prefix.length + 5).trim();
            const amount = input.length > 0 ? parseInt(input) : 1;
            if (amount < 2) {
                message.reply(`${config.longstringoftext} https://appembed.netlify.app/e?url=https://google.com&provider=Sioz%20selfbot&author=Here%20is%20your%20meme!&color=%23FF0000`)
            } else {
                message.reply(`${config.longstringoftext} https://appembed.netlify.app/e?url=https://google.com&provider=Sioz%20selfbot&author=Here%20are%20your%20memes!&color=%23FF0000`)
            }
            const response = await axios.get(`https://www.reddit.com/r/memes/new.json?t=month&limit=100`);
            const posts = response.data.data.children;
            const filteredPosts = posts.filter(post => moment(post.data.created_utc * 1000).isAfter(moment().subtract(1, 'month')));
            for (let i = 0; i < amount; i++) {
                const randomPost = filteredPosts[Math.floor(Math.random() * filteredPosts.length)];
                message.reply(randomPost.data.url);
            }
        } catch (error) {
            console.error(error);
            message.reply('An error occurred while fetching the meme, no memes for you loser!');
        }
    }
}