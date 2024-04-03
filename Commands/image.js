const axios = require('axios');
const fs = require('fs');
let config = {};

if (fs.existsSync('config.json')) {
    config = JSON.parse(fs.readFileSync('config.json'));
}

module.exports = {
    description: 'https://appembed.netlify.app/e?t=&c=%23FF0000&a=VARimge&d=Type%20%22VARimage%20(prompt)%22%20to%20fetch%20a%20image%20of%20what%20you%20asked%20for.&p=Sioz%20selfbot&i=&ic=',
    run: async (client, message, handler, prefix) => {
        const search = message.content.trim().slice(prefix.length + 5).trim();
        const URL = `https://api.unsplash.com/search/photos?query=${search}&client_id=YAAa_dkvBC2QcEUx3lykdNkIIYAIiD654Df-5OPu0NA`;

        try {
            const response = await axios.get(URL);
            if (!response.data.results) {
                message.reply(`${config.longstringoftext} https://appembed.netlify.app/e?description=No%20results%20found&provider=Sioz%20selfbot&author=Error!&color=%23FF0000`);
                return;
            }
            const results = response.data.results;
            const randomIndex = Math.floor(Math.random() * results.length);
            const result = results[randomIndex];
            const encodedsearch = search.replace(/ /g, '%2520');
            message.reply(`${config.longstringoftext} https://appembed.netlify.app/e?provider=Sioz%20selfbot&author=Here%20is%20your%20${encodedsearch}%20picture!&image=${result.urls.full}&color=%23FF0000`);
        } catch (error) {
            console.error(error);
            message.reply(`${config.longstringoftext} https://appembed.netlify.app/e?description=Something%20happened%20when%20search%20for%20an%20image.&provider=Sioz%20selfbot&author=Error!&color=%23FF0000`);
        }
    }
};