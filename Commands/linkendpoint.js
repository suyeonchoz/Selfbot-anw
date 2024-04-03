const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
let config = {};

if (fs.existsSync('config.json')) {
    config = JSON.parse(fs.readFileSync('config.json'));
}

const thingy = ('`');

module.exports = {
    description: 'https://appembed.netlify.app/e?description=Type%20VARlinkendpoint%20%22https%3A%2F%2Fgrabify.link%2F888888%22%20for%20example%20to%20get%20the%20link%20endpoint%20of%20a%20potentially%20dangerious%20link!%20(basically%20gets%20rid%20of%20the%20IP%20grabber%20shit)&provider=Sioz%20selfbot&author=VARlinkendpoint%20%22%20%22&image=&color=%23FF0000',
    run: async (client, message, handler, prefix, MyID) => {
        if (message.content.toLowerCase().startsWith(`${prefix}linkendpoint`)) {
            const matches = message.content.match(/https?:\/\/[^"]+/);
            if (matches) {
                const link = matches[0];
                if (link) {
                    try {
                        const msgRef = await message.channel.send(`${thingy}${thingy}${thingy}diff
-loading proxies...${thingy}${thingy}${thingy}`);
                        await new Promise(resolve => setTimeout(resolve, 1500));
                        msgRef.edit(`${thingy}${thingy}${thingy}diff
-Fetching URL...${thingy}${thingy}${thingy}`);
                        await new Promise(resolve => setTimeout(resolve, 1500));
                        msgRef.edit(`${thingy}${thingy}${thingy}diff
-Sending HTTP request Via Axios, Cheerio, ScraperAPI...${thingy}${thingy}${thingy}`);
                        const response = await axios.get(`http://api.scraperapi.com?api_key=${config.SCRAPERAPI_API_KEY}&url=${link}`);
                        msgRef.edit(`${thingy}${thingy}${thingy}diff
+Recieved Request!${thingy}${thingy}${thingy}`);
                        await new Promise(resolve => setTimeout(resolve, 1500));
                        const $ = cheerio.load(response.data);
                        const finalUrl = $("meta[property='og:url']").attr("content") || $("meta[property='twitter:url']").attr("content") || $("meta[property='twitter:url']").attr("content");
                        message.reply(`${config.longstringoftext} https://appembed.netlify.app/e?description=The%20endpoint%20is%20${finalUrl}&url=https://google.com&provider=Sioz%20selfbot&author=Holy%20shit%20that%20took%20forever...&color=%23FF0000`).then(e => {
                            msgRef.delete();
                        });
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    } catch (err) {
                        console.log(err);
                        message.reply(`${config.longstringoftext} https://appembed.netlify.app/e?description=Please%20include%20a%20valid%20link%20within%20quotes.&url=https://google.com&provider=Sioz%20selfbot&author=Error!&color=%23FF0000`);
                    }
                } else {
                    message.reply(`${config.longstringoftext} https://appembed.netlify.app/e?description=Please%20include%20a%20valid%20link%20within%20quotes.&url=https://google.com&provider=Sioz%20selfbot&author=Error!&color=%23FF0000`);
                }
            }
        }
    }
}