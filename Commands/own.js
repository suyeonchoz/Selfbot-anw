const {
    Appembed
} = require('kyz');
const fs = require('fs');
let config = {};

if (fs.existsSync('config.json')) {
    config = JSON.parse(fs.readFileSync('config.json'));
}

module.exports = {
    description: `https://appembed.netlify.app/e?description=Type%20*own%20to%20get%20the%20owner%20of%20selfbot&color=%23000&provider=%F0%9D%93%9B%F0%9D%93%AA%20Selfbot&author=Own`,
    run: async (client, message, handler, prefix, MyID) => {
        if (!message.author.id === MyID) return
        const mc = Date.now() - message.createdTimestamp;

        const ownerembed = new Appembed()
        .setAuthor(`Own`)
        .setDescription(`Lariyahx`)
        .setProvider("Sioz Selfbot")
        .setColor("#000")
        .setImage(`https://cdn.discordapp.com/attachments/1194537430720725123/1194552542823194664/IMG_3921.jpg?ex=65b9ff3f&is=65a78a3f&hm=b06f94d9210ff3aedbf46ba4c4e56eaae5534bc1f2eab860b0dc760b3f108dfd&`)
        .build();
      
       return message.reply(`${config.longstringoftext} ${ownerembed}`);
    }
};
