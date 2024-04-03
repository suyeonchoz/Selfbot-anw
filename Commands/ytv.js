const Discord = require('discord.js-selfbot-v13');
const ytdl = require('ytdl-core');
const ytdlOptions = {
    filter: 'videoandaudio'
};
const fs = require('fs');
let config = {};

if (fs.existsSync('config.json')) {
    config = JSON.parse(fs.readFileSync('config.json'));
}

module.exports = {
    description: 'https://appembed.netlify.app/e?description=Say%20VARytv%20(youtube%20link)%20to%20get%20the%20MP4%20video%2Faudio%20file%20for%20the%20video%20specified&provider=Sioz Selfbot%20selfbot&author=VARytv&image=&color=%23FF0000',
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
            const videoStream = ytdl(url, ytdlOptions);
            const videoAttachment = new Discord.MessageAttachment(videoStream, `${title}.mp4`);
            const embed = new Discord.MessageEmbed()
                .setTitle('Video and Audio')
                .setDescription('Video and Audio')
                .setColor('#FF0000');

            await message.reply({
                embeds: [embed],
                files: [videoAttachment]
            });
        } catch (error) {
            console.error(error);
            message.channel.send('An error occurred while processing the YouTube video.');
        }
    }
}