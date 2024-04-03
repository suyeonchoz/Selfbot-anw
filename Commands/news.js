const axios = require('axios');
const fs = require('fs');
let config = {};

if (fs.existsSync('config.json')) {
    config = JSON.parse(fs.readFileSync('config.json'));
}

module.exports = {
    description: 'https://appembed.netlify.app/e?description=Type%20%22VARNews%205%22%20to%20get%205%20recent%20news%20articles%20from%20ABC%20news&provider=Sioz%20selfbot&author=VARNews&image=&color=%23FF0000',
    run: async (client, message, handler, prefix) => {
        try {
            message.react(config.successEmoji).catch(err => message.react('<a:Black_Butterfly:1095210519020970046>').catch(e => console.log(e)));
            const input = message.content.trim().slice(prefix.length + 5).trim();
            const amount = input.length > 0 ? parseInt(input) : 1;
            if (amount < 2) {
                message.reply(`${config.longstringoftext} https://appembed.netlify.app/e?url=https://google.com&provider=Sioz%20selfbot&author=Here%20is%20${amount}%20recent%20article.&color=%23FF0000`)
            } else {
                message.reply(`${config.longstringoftext} https://appembed.netlify.app/e?url=https://google.com&provider=Sioz%20selfbot&author=Here%20is%20${amount}%20recent%20articles.&color=%23FF0000`)
            }
            const response = await axios.get("https://newsapi.org/v2/top-headlines?sources=abc-news&apiKey=c110a5f045ba4b4cbeec19447a71ea7e")
            const articles = response.data.articles;
            let usedArticles = [];
            for (let i = 0; i < amount; i++) {
                let randomArticle = articles[Math.floor(Math.random() * articles.length)];
                while (usedArticles.includes(randomArticle)) {
                    randomArticle = articles[Math.floor(Math.random() * articles.length)];
                }
                usedArticles.push(randomArticle);
                const encodedTitle = randomArticle.title.replace(/ /g, '%20');
                const encodedDescription = randomArticle.description.replace(/ /g, '%20');
                const encodedImageURL = randomArticle.urlToImage.replace(/ /g, '%20');
                message.reply(`
${config.longstringoftext} https://appembed.netlify.app/e?title=${encodedTitle}&description=${encodedTitle}%20%20%20${randomArticle.url}&redirect=${randomArticle.url}&url=https://google.com&provider=Sioz%20selfbot&image=${encodedImageURL}&color=%23FF0000`)
            }
        } catch (error) {
            console.error(error);
            message.reply(`${config.longstringoftext} https://appembed.netlify.app/e?url=https://google.com&provider=Sioz%20selfbot&author=An%20error%20occured.&color=%23FF0000`);
        }
    }
}