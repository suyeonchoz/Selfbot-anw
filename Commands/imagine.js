const {
  Configuration,
  OpenAIApi
} = require('openai');
const Discord = require('discord.js-selfbot-v13');
const axios = require('axios');
const fs = require('fs');
let config = {};

if (fs.existsSync('config.json')) {
  config = JSON.parse(fs.readFileSync('config.json'));
}
const configuration = new Configuration({
  apiKey: config.Open_AI_API_Key,
});

const openai = new OpenAIApi(configuration);
const {
  Appembed
} = require('kyz');

module.exports = {
  description: 'https://appembed.netlify.app/e?t=&c=%23FF0000&a=VARimagine&d=type%20VARimagine%20(prompt)%20to%20generate%20a%20image%20based%20off%20of%20the%20prompt%20using%20AI.&p=La %20selfbot&i=&ic=',
  run: async (client, message, handler, prefix, xToken, MyID) => {
      if (message.author.bot) return;

      try {
          const command = message.content.slice(prefix.length).trim().split(/ +/);
          const cmd = command[0];
          const prompt = message.content.slice(prefix.length + cmd.length + 1);

          if (cmd.toLowerCase() === 'imagine') {
              message.react(config.successEmoji).catch(err => message.react('<a:Black_Butterfly:1095210519020970046>').catch(e => console.log(e)));
              try {
                  const response = await openai.createImage({
                      prompt: `${prompt}`,
                      n: 1,
                      size: "512x512"
                  });
                  const imageUrl = response.data.data[0].url;
                  const imageResponse = await axios.get(imageUrl, {
                      responseType: 'arraybuffer'
                  });
                  const imageBuffer = Buffer.from(imageResponse.data);
                  fs.writeFileSync('imagined.png', imageBuffer);
                  const attachment = new Discord.MessageAttachment('imagined.png');
                  const sentMessage = await message.reply({
                      files: [attachment]
                  });

                  fs.unlinkSync('imagined.png');
                  const successEmbed = new Appembed()
                      .setAuthor(`Imagined ${prompt}`)
                      .setImage(`${sentMessage.attachments.first().url}`)
                      .setProvider("Sioz Selfbot")
                      .setColor("#00FF00")
                      .build();
                  message.reply(`${config.longstringoftext} ${successEmbed}`)

                  sentMessage.delete()

              } catch (err) {
                  const failEmbed = new Appembed()
                      .setAuthor(`Error!`)
                      .setDescription(`Something went wrong, check your prompt and try again!`)
                      .setProvider("Sioz Selfbot")
                      .setColor("#FF0000")
                      .build();
                  message.reply(`${config.longstringoftext} ${failEmbed}`);
              }
          }
      } catch (error) {
          const failEmbed = new Appembed()
              .setAuthor(`Error!`)
              .setDescription(`Something went wrong, check your prompt and try again!`)
              .setProvider("Sioz Selfbot")
              .setColor("#FF0000")
              .build();
          message.reply(`${config.longstringoftext} ${failEmbed}`);
      }
  }
};