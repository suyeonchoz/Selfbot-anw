const fs = require('fs');
let config = {};

if (fs.existsSync('config.json')) {
    config = JSON.parse(fs.readFileSync('config.json'));
}

const replies = [
    "Yes.",
    "No.",
    "Certainly.",
    "Absolutely not.",
    "Definitely.",
    "Not a chance.",
    "Likely.",
    "Unlikely."
];


module.exports = {
    description: 'https://appembed.netlify.app/e?description=Text%20%20VAR8ball%20Am%20I%20gay%3F%20To%20ask%20the%208ball%20a%20question!&provider=La%20selfbot&author=VAR8ball&image=&color=%23FF0000',
    run: async (client, message, handler, prefix) => {
        ballreply = (`${replies[Math.floor(Math.random() * replies.length)]}`).replace(/ /g, "%20");
        msgtitle = (`${message.content.slice(prefix.length + 6)}`).replace(/ /g, "%20");
        message.reply(`${config.longstringoftext}  https://appembed.netlify.app/e?description=${ballreply}&author=${msgtitle}&color=%23FF0000`);
    }
}