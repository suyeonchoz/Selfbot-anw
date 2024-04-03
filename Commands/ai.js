const {
  Configuration,
  OpenAIApi
} = require('openai');
const fs = require('fs');
let config = {};

if (fs.existsSync('config.json')) {
  config = JSON.parse(fs.readFileSync('config.json'));
}

const configuration = new Configuration({
  apiKey: process.env.Open_AI_API_Key,
});

const openai = new OpenAIApi(configuration);

module.exports = {
  description: 'https://appembed.netlify.app/e?description=Send%20VARai%20(message)%20to%20get%20an%20AI%20response!%20For%20example%2C%20VARai%20how%20to%20backflip%3F&provider=La%20selfbot&author=VARai&image=&color=%23FF0000',
  run: async (client, message, handler, prefix, xToken, MyID) => {
      if (message.author.bot) return;

      try {
          const command = message.content.slice(prefix.length).trim().split(/ +/);
          const cmd = command[0];
          const prompt = message.content.slice(prefix.length + cmd.length + 1);

          if (cmd.toLowerCase() === 'ai') {
              const systemMessage = {
                  role: 'system',
                  content: `Message context:
  Server Name: ${message.guild ? message.guild.name : 'N/A'}
  Server ID: ${message.guild ? message.guild.id : 'N/A'}
  Channel Name: ${message.channel ? message.channel.name : 'N/A'}
  Channel ID: ${message.channel ? message.channel.id : 'N/A'}
  User Name: ${message.author ? message.author.username : 'N/A'}
  User ID: ${message.author ? message.author.id : 'N/A'}
  
  This is the message you have been prompted to respond to as a AI chat assistant, directly reply to what the user: ${message.author ? message.author.username : 'N/A'} has asked you.`
              };

              const result = await openai
                  .createChatCompletion({
                      model: 'gpt-3.5-turbo',
                      messages: [
                          systemMessage,
                          {
                              role: 'user',
                              content: prompt
                          }
                      ],
                      max_tokens: 856, // Make this higher if you want higher responses and shit y'know?
                  })
                  .catch((error) => {
                      console.log(`OPENAI ERR: ${error}`);
                  });
              if (message.author.id === MyID) {
                  message.edit(`> ${message.content}\n\n:robot::\n${result.data.choices[0].message.content}`);
              } else {
                  message.reply(`> <@${message.author.id}>: ${message.content}\n\n:robot::\n${result.data.choices[0].message.content}`);
              }
          }
      } catch (error) {
          console.log(`ERR: ${error}`);
      }
  }
};