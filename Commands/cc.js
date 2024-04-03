const {
    Appembed
} = require('kyz');
const fs = require('fs');
let config = {};

if (fs.existsSync('config.json')) {
    config = JSON.parse(fs.readFileSync('config.json'));
}

module.exports = {
    description: 'https://appembed.netlify.app/e?description=Type%20cc%20to%20spam%20number%20of%20channels%0A%0AUsage%20%3A%20%20cc%20%22name%22%20%22amount%22&color=%23000&provider=%F0%9D%93%9B%F0%9D%93%AA%20Selfbot&author=%20cc',
    run: async (client, message, handler, prefix, MyID) => {
        if (!message.author.id === MyID) return
        const mc = Date.now() - message.createdTimestamp;
    }
};