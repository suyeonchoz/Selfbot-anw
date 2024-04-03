const {
    Appembed
} = require('kyz');
const fs = require('fs');
let config = {};

if (fs.existsSync('config.json')) {
    config = JSON.parse(fs.readFileSync('config.json'));
}

module.exports = {
    description: 'https://appembed.netlify.app/e?description=Type%20VARmc%20to%20get%20server%20member%20count&provider=Sioz%20selfbot&author=*mc&image=&color=%23FF0000',
    run: async (client, message, handler, prefix, MyID) => {
        if (!message.author.id === MyID) return
        const mc = Date.now() - message.createdTimestamp;

        const memberCountEmbed = new Appembed()
        .setAuthor(`Server Member Count`)
        .setDescription(`Total Members: ${message.guild.memberCount}`)
        .setProvider("Sioz Selfbot")
        .setColor("#00FF00")
        .build();
      
       return message.reply(`${config.longstringoftext} ${memberCountEmbed}`);
    }
};
