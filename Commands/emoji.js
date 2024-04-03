const fs = require('fs');
let config = {};

if (fs.existsSync('config.json')) {
    config = JSON.parse(fs.readFileSync('config.json'));
}

module.exports = {
    description: 'https://appembed.netlify.app/e?description=type%20VARemoji%20(your%20emoji)%20to%20get%20the%20emoji%20link&provider=Sioz%20selfbot&author=VAR%20emoji&image=&color=%23FF0000',
    run: async (client, message, handler, prefix) => {
        if (message.content.startsWith(`${prefix}emoji`)) {
            let emoji = message.content.match(/<a?:[\w]+:([0-9]+)/)
            if (emoji) {
                let selectedEmoji = client.emojis.cache.get(emoji[1]);
                if (selectedEmoji) {
                    message.reply(`${config.longstringoftext} https://appembed.netlify.app/e?provider=Sioz%20selfbot&author=Here%22s%20the%20nitro%20emoji%20link%3A&description=${selectedEmoji.url}%3Fsize%3D48&color=%23FF0000`);
                } else {
                    message.reply(`${config.longstringoftext} https://appembed.netlify.app/e?provider=Sioz%20selfbot&author=Provide%20a%20valid%20Nitro%20emoji%20or%20include%20a%20Nitro%20emoji%20in%20the%20command.&color=%23FF0000`);
                }
            } else {
                message.reply(`${config.longstringoftext} https://appembed.netlify.app/e?provider=Sioz%20selfbot&author=Provide%20a%20valid%20Nitro%20emoji%20or%20include%20a%20Nitro%20emoji%20in%20the%20command.&color=%23FF0000`);
            }
        }
    }
}