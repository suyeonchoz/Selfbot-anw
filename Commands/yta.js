const Discord = require('discord.js-selfbot-v13');
const ytdl = require('ytdl-core');
const ytdlOptions = {
    filter: 'audioonly'
};
const fs = require('fs');
let config = {};

if (fs.existsSync('config.json')) {
    config = JSON.parse(fs.readFileSync('config.json'));
}

module.exports = {
    description: 'https://appembed.netlify.app/e?description=Say%20VARyta%20(youtube%20link)%20to%20get%20the%20MP3%20audio%20file%20for%20the%20video%20specified&provider=Sioz%20selfbot&author=VARyta&image=&color=%23FF0000',
    run: async (client, message, handler, prefix, xToken, MyID) => {
        const args = message.content.split(' ');
        if (args.length !== 2) {
            return message.channel.send('Invalid command usage. Please provide a valid YouTube video link.');
        }
        const url = args[1];
        if (!ytdl.validateURL(url)) {
            return message.channel.send('Invalid YouTube video link.');
        }
        try {
            message.react(config.successEmoji).catch(err => message.react('<a:Black_Butterfly:1095210519020970046>').catch(e => console.log(e)));
            const info = await ytdl.getInfo(url);
            const title = info.videoDetails.title;
            const audioStream = ytdl(url, ytdlOptions);
            const attachment = new Discord.MessageAttachment(audioStream, `${title}.mp3`);
            const embed = new Discord.MessageEmbed()
                .setTitle('Audio')
                .setDescription('Audio')
                .setColor('#FF0000');

            await message.reply({
                embeds: [embed],
                files: [attachment]
            });
        } catch (error) {
            console.error(error);
            message.channel.send('An error occurred while processing the YouTube video.');
        }
    }
}