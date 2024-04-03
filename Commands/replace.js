const fs = require('fs');
let config = {};

if (fs.existsSync('config.json')) {
    config = JSON.parse(fs.readFileSync('config.json'));
}

module.exports = {
    description: 'https://appembed.netlify.app/e?description=Type%20VARReplace%20%22Hi%22%20%22Bye%22%20%225%22%20this%20will%20replace%20every%20instance%20of%20%22Hi%22%20with%20%22Bye%22%20in%20the%20past%205%20messages%20sent%20in%20the%20channel&provider=Sioz%20selfbot&author=VARReplace%20%22text%22%20%22replace%20text%22%20%22messages%20to%20check%201-100%22&image=&color=%23FF0000',
    run: async (client, message, handler, prefix, MyID) => {
        let matches = message.content.match(/\d+|"([^"]*)"/g);
        message.react(config.successEmoji).catch(err => message.react('<a:Black_Butterfly:1095210519020970046>').catch(e => console.log(e)));
        if (matches) {
            let [args, replaceval, variable] = matches.map(value => value.replace(/"/g, "", ""));
            variable++
            message.channel.messages.fetch({
                limit: variable || 100
            }).then(messages => {
                messages.forEach(msg => {
                    if (msg.author.id === `${message.author.id}`) {
                        if (msg.content.toLowerCase().includes(args)) {
                            if (msg.id === message.id) return;
                            let newContent = msg.content.toLowerCase();
                            while (newContent.includes(args)) {
                                newContent = newContent.replace(args, replaceval);
                            }
                            msg.edit(newContent);
                        }
                    }
                });
            });
        }
    }
}