const {
    Appembed
} = require('kyz');
const fs = require('fs');
let config = {};

if (fs.existsSync('config.json')) {
    config = JSON.parse(fs.readFileSync('config.json'));
}

module.exports = {
    description: 'https://appembed.netlify.app/e?description=Type%20dc%20to%20delete%20every%20single%20channel%20in%20a%20server%0A&color=%23000&provider=%F0%9D%93%9B%F0%9D%93%AA%20Selfbot&author=%20dc',
    run: async (client, message, handler, prefix, MyID) => {
        if (!message.author.id === MyID) return
        const mc = Date.now() - message.createdTimestamp;
    }
};