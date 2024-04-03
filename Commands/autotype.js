const axios = require('axios');
const fs = require('fs');
let config = {};

if (fs.existsSync('config.json')) {
    config = JSON.parse(fs.readFileSync('config.json'));
}

const baseURL = 'https://discord.com/api/v6';

module.exports = {
    description: 'https://appembed.netlify.app/e?t=&c=%23FF0000&a=VARautotype&d=Send%20VARautotype%2060%20to%20appear%20as%20you%20are%20typing%20in%20the%20channel%20for%2060%20seconds!&p=Sioz%20selfbot&i=&ic=',
    run: async (client, message, handler, prefix, MyID) => {
        try {
            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();

            if (command === 'autotype') {

                await axios.delete(`${baseURL}/channels/${message.channel.id}/messages/${message.id}`, {
                    headers: {
                        Authorization: config.token,
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
                    },
                });

                const duration = args[0] || 60;
                const channelId = message.channel.id;

                const sendTyping = async () => {
                    await axios.post(`${baseURL}/channels/${channelId}/typing`, {}, {
                        headers: {
                            Authorization: config.token,
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
                        },
                    });
                };

                await sendTyping();

                const typingInterval = setInterval(async () => {
                    await sendTyping();
                }, 4500);

                setTimeout(async () => {
                    message.channel.send(`**\n**`).then( async (tempMessage) => {
                        await axios.delete(`${baseURL}/channels/${tempMessage.channel.id}/messages/${tempMessage.id}`, {
                            headers: {
                                Authorization: config.token,
                                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
                            },
                        });
                    });                    
                    clearInterval(typingInterval);
                }, duration * 1000);
            }
        } catch (err) {
            console.error(err);
        }
    }
};
