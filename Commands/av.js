const fs = require('fs');
let config = {};

if (fs.existsSync('config.json')) {
    config = JSON.parse(fs.readFileSync('config.json'));
}

const size = ("256") // I added a "size" modifier to your code, discord uses this to determine the size of the embedded objects, it's usually works with multiples of two,  4, 8, 16, 32, exc

module.exports = {
    description: 'https://appembed.netlify.app/e?description=Type%20VARav%20%40Ronald%20for%20example.%20if%20Ronald%20is%20pinged%20it%20will%20get%20the%20avatar%20of%20Ronald.%20&redirect=&provider=La%20selfbot&author=VARav%20%28user%29&image=&color=%23FF0000',
    run: async (client, message, handler, prefix) => {
        if (message.content.toLowerCase().startsWith(`${prefix}av`)) {
            message.react(config.successEmoji).catch(err => message.react('<a:Black_Butterfly:1095210519020970046>').catch(e => console.log(e)));

            let user = message.mentions.users.first();
            if (!user) {
                const args = message.content.slice(prefix.length).trim().split(/ +/);
                const userId = args[1];

                user = await client.users.fetch(userId).catch(err => {
                    console.error(err);
                    return null;
                });

                if (!user) {
                    message.reply("User not found.");
                    return;
                }
            }

            user.fetch().then(() => {
                thingy = ("`");
                let pfp = `${user.displayAvatarURL ? `${user.displayAvatarURL({ dynamic: true })}?size=${size}` : null}`;

                    message.reply(`${pfp}`)
                 });
         }
     }
 }