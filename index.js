const fs = require("fs");
if (!fs.existsSync('./commands')) {
    fs.mkdirSync('./commands');
}
const path = require('path');
const { Client } = require('discord.js-selfbot-v13');
const Discord = require('discord.js-selfbot-v13');
const { Appembed } = require('kyz');
const Sequelize = require('sequelize');
const keep_alive = require('./keep_alive.js')

let config = {};

if (fs.existsSync('config.json')) {
    config = JSON.parse(fs.readFileSync('config.json'));
}

const client = new Client({
	checkUpdate: false
});
const authorizedUsers = new Map();

client.commands = new Discord.Collection();
const commands = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));
for (file of commands) {
  const commandName = file.split(".")[0]
  const command = require(`./Commands/${commandName}`)
  client.commands.set(commandName, command)
}

MyID = ("null");

client.on('ready', async () => {
    const userPrefix = await Prefix.findOne({
      where: { userId: client.user.id },
    });
    const prefix = userPrefix ? userPrefix.prefix : "";
    MyID = client.user.id;
    authorizedUsers.set(MyID, true);
    console.log(`%cWelcome to Sioz Selfbot's selfbot script!
    
Name:`, 'color: green; font-weight: bold');
  console.log(`%c${client.user.username}`, 'color: red; font-weight: bold');
  console.log(`%cID:`, 'color: green; font-weight: bold');
  console.log(`%c${MyID}
  `, 'color: red; font-weight: bold');
  
  console.log(`%cTo set your prefix say "SetPrefix (some one letter prefix here)" and to get your prefix say "What's my prefix?"
  
To access a list of your installed commands and how to use them say ${prefix}cmds!`, 'color: green; font-weight: bold');

if (!userPrefix) {
  console.log(`Set a prefix by typing in any discord channel: "SetPrefix !" for example.`)
}
  })
  
const sequelize = new Sequelize("database", "username", "password", {
    host: "localhost",
    dialect: "sqlite",
    storage: "path/to/database.sqlite",
    logging: false
  });
  
  const Prefix = sequelize.define("prefix", {
    userId: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    prefix: {
      type: Sequelize.STRING,
    },
  });
  
  client.on("messageCreate", async message => {
    if (!authorizedUsers.has(message.author.id)) return;
    const userPrefix = await Prefix.findOne({
      where: { userId: client.user.id },
    });
    const prefix = userPrefix ? userPrefix.prefix : "";
    if (message.content.toLowerCase().startsWith(prefix)) {
      const handler = message.content.slice(prefix.length).trim().split(/ +/g);
      const commandName = handler.shift().toLowerCase();
      const command = client.commands.get(commandName);
      if (!command) return;
      command.run(client, message, handler, prefix, config.token, client.user.id, "Discord", "Util", "AutoDelete", "thingy", "xToken");
    } else {
      return void(0);
    }
  });

  sequelize.sync();
  
  client.on("messageCreate", async (message) => {
    if (message.content.toLowerCase().startsWith("setprefix ")) {
      if (message.author.id === MyID) {
        const prefix = message.content.split(" ")[1];
        if (prefix.length !== 1) {
          const setPrefixError1 = new Appembed()
          .setAuthor(`Error!`)
          .setDescription(`Prefix must be ONE character long!`)
          .setProvider("Sioz Selfbot")
          .setColor("#FF0000")
          .build();

          return message.reply(`${config.longstringoftext} ${setPrefixError1}`);
        }
        if (prefix.match(/[a-zA-Z]/)) {
          const setPrefixError2 = new Appembed()
          .setAuthor(`Error!`)
          .setDescription(`Your prefix cannot be a letter!s`)
          .setProvider("Sioz Selfbot")
          .setColor("#FF0000")
          .build();

          return message.reply(`${config.longstringoftext} ${setPrefixError2}`);
        }
        defaultPrefix = prefix;
        const userPrefix = await Prefix.findOrCreate({
          where: { userId: message.author.id },
          defaults: { prefix: prefix },
        });
        await userPrefix[0].update({ prefix });
        const setPrefixSuccess = new Appembed()
        .setAuthor(`Success!`)
        .setDescription(`Your prefix has been set to ${prefix}`)
        .setProvider("Sioz Selfbot")
        .setColor("#00FF00")
        .build();

        message.reply(`${config.longstringoftext} ${setPrefixSuccess}`);
      } else {
        const userPrefix = await Prefix.findOne({
          where: { userId: message.author.id },
        });
        const prefix = userPrefix ? userPrefix.prefix : defaultPrefix;
      }
    }
  });
  
  client.on("messageCreate", async (message) => {
    const userId = message.author.id;
    if (userId === MyID) {
      if (message.content.toLowerCase().startsWith("what's my prefix?")) {
        const userPrefix = await Prefix.findOne({
          where: { userId: message.author.id },
        });

        if (!userPrefix) {
          const whatsMyPrefixEmbedFail = new Appembed()
          .setAuthor(`Error!`)
          .setDescription(`Prefix not found!\n\nSet a prefix by saying "SetPrefix !" for example, your prefix can be any 1 special character.`)
          .setProvider("Sioz Selfbot")
          .setColor("#FF0000")
          .build();

          message.reply(`${config.longstringoftext} ${whatsMyPrefixEmbedFail}`)
        } else {
        const whatsMyPrefixEmbedSuccess = new Appembed()
        .setAuthor(`Your prefix is:`)
        .setDescription(`${userPrefix.prefix}\n\nIf you want to change your prefix, type "SetPrefix !" for example, your prefix can be any 1 special character.`)
        .setProvider("Sioz Selfbot")
        .setColor("#00FF00")
        .build();
        message.reply(`${config.longstringoftext} ${whatsMyPrefixEmbedSuccess}`)
      }
      }
    }
  });

  client.on("messageCreate", async message => {
    if (message.author.id !== MyID) return
    const userPrefix = await Prefix.findOne({
      where: { userId: MyID },
    });
    const prefix = userPrefix ? userPrefix.prefix : "";
  
    if (message.content.startsWith(`${prefix}aa`)) {
      if (message.author.id !== client.user.id) return;
      const user = message.mentions.users.first();
      if (user === undefined) {
        message.reply("Please mention a user to authorize");
        return
      }
      
      authorizedUsers.set(user.id, true);
      message.reply(`<@${user.id}> has been authorized.`);
    }
  
    if (message.content.startsWith(`${prefix}ra`)) {
      if (message.author.id !== client.user.id) return;
      const user = message.mentions.users.first();
      if (user === undefined) {
        message.reply("Please mention a user to reomove authorization");
        return
      }
      const removed = authorizedUsers.delete(user.id);
      
      if (removed) {
        message.reply(`<@${user.id}> has been removed from authorized users.`);
      } else {
        message.reply(`<@${user.id}> is not an authorized user.`);
      }
    }
  });

  const LC = () => {
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
  
    const commands = [];
  
    for (const file of commandFiles) {
      const command = require(`./commands/${file}`);
      commands.push(command);
    }
  
    return commands;
  };
  
  const GLA = () => {
    const commands = LC();
    const linksArray = commands.map(command => command.description);
  
    return linksArray;
  };

  const cmds = GLA();
  
  const reactions = ['⬅️', '➡️'];
  
  client.on('messageCreate', async (message) => {
    try {
    if (!message.author.id === MyID) return;
    const userPrefix = await Prefix.findOne({
      where: { userId: MyID },
    });
    const prefix = userPrefix ? userPrefix.prefix : "";
    if (message.content.toLowerCase().startsWith(`${prefix}cmds`)) {
      if (message.author.id !== MyID) return;
      const total = cmds.length;
      let i = 0;
      let sentMsg;
      const sendCmdMessage = async () => {
        try {
        const userPrefix = await Prefix.findOne({
          where: { userId: MyID },
        });
        const uPrefix = userPrefix ? userPrefix.prefix : "";
        message.channel.send(`${config.longstringoftext} https://appembed.netlify.app/e?description=Total%20downloaded%20commands%3A%20${total}&color=%23FF0000&author=Made%20by%20Sioz Selfbot%20since%20Febuary%202023.
  ${cmds[i].replace(/VAR/g, uPrefix)}`).then(msg => {
          sentMsg = msg;
          for (const reaction of reactions) {
            sentMsg.react(reaction);
          }
          const filter = (reaction, user) => {
            return reactions.includes(reaction.emoji.name) && user.id !== client.user.id;
          };
          const collector = sentMsg.createReactionCollector(filter, { time: 60000 });
          collector.on('messageReactionRemove', async (reaction, user) => {
            if (user.id === client.user.id) return;
            reaction.users.remove(user.id);
            if (reaction.emoji.name === '⬅️') {
              i = (i - 1 + cmds.length) % cmds.length;
            } else if (reaction.emoji.name === '➡️') {
              i = (i + 1) % cmds.length;
            }
            const userPrefix = await Prefix.findOne({
              where: { userId: MyID },
            });
            const uPrefix = userPrefix ? userPrefix.prefix : "";
            sentMsg.edit(`${config.longstringoftext} https://appembed.netlify.app/e?description=Total%20Public%20commands%3A%20${total}&color=%23FF0000&author=Made%20by%20Sioz Selfbot%20since%20Febuary%202023.
  ${cmds[i].replace(/VAR/g, uPrefix)}`).then(() => {
              if (reaction.count > 1) {
                sentMsg.react(reaction.emoji);
              }
            });
          });
          collector.on('end', () => {
            try {
            sentMsg.reactions.removeAll().catch(error => console.error('Failed to remove reactions: ', error));
            } catch (err) {
              console.error(err)
            }
          });
        });
        } catch (err) {
          return console.error(err)
        }
      }
      sendCmdMessage();
  
      client.on('messageReactionRemove', async (reaction, user) => {
        if (!reactions.includes(reaction.emoji.name) || !sentMsg || reaction.message.id !== sentMsg.id && user.id === MyID) {
          return;
        }
        if (reaction.emoji.name === '⬅️') {
          i = (i - 1 + cmds.length) % cmds.length;
        } else if (reaction.emoji.name === '➡️') {
          i = (i + 1) % cmds.length;
        }
        const userPrefix = await Prefix.findOne({
          where: { userId: MyID },
        });
        const uPrefix = userPrefix ? userPrefix.prefix : "";
      sentMsg.edit(`${config.longstringoftext} https://appembed.netlify.app/e?description=Total%20Public%20commands%3A%20${total}&color=%23FF0000&author=Made%20by%20Sioz Selfbot%20since%20Febuary%202023.
  ${cmds[i].replace(/VAR/g, uPrefix)}`).then(() => {
          sentMsg.react(reaction.emoji);
        });
      });
  
      client.on('messageReactionAdd', async (reaction, user) => {
        if (!reactions.includes(reaction.emoji.name) || !sentMsg || reaction.message.id !== sentMsg.id && user.id === MyID) {
          return;
        }
        if (user.id === MyID) return;
        if (reaction.emoji.name === '⬅️') {
          i = (i - 1 + cmds.length) % cmds.length;
        } else if (reaction.emoji.name === '➡️') {
          i = (i + 1) % cmds.length;
        }
        const userPrefix = await Prefix.findOne({
          where: { userId: MyID },
        });
        const uPrefix = userPrefix ? userPrefix.prefix : "";
      sentMsg.edit(`${config.longstringoftext} https://appembed.netlify.app/e?description=Total%20Public%20commands%3A%20${total}&color=%23FF0000&author=Made%20by%20Sioz Selfbot%20since%20Febuary%202023.
  ${cmds[i].replace(/VAR/g, uPrefix)}`).then(() => {
          sentMsg.react(reaction.emoji);
        });
      });
    }
  } catch (err) {
    void(0)
  }
  });

  client.on('messageCreate', message => {
    if (message.author.id ===  '885368385595125791') { 
    if(message.content == "Sioz")
     message.channel.send("Yes?");
    } else if (message.content == "start streaming lari") {
      message.channel.send("setstreaming");
    }
  });

// Ban command below

client.on('messageCreate', async (message) => {
  if (!message.guild) return; // Ignore messages outside of 
  if (message.content.startsWith('Ban')) {
    if (message.author.id !== '694166467058466820') {
      return; // Ignore if the author is not the specified user
    }

    if (!message.member.permissions.has('BAN_MEMBERS')) {
      return message.reply('You do not have permission to use this command.');
    }

    const user = message.mentions.users.first();
    if (!user) return message.reply('Please mention a user to ban.');

    const member = message.guild.members.cache.get(user.id);

    try {
      await member.ban();
      message.channel.send(`${user.tag} has been banned.`);
    } catch (error) {
      console.error('Failed to ban user:', error);
      message.channel.send('An error occurred while trying to ban the user.');
    }
  }
});

// Unban command below

client.on('messageCreate', async (message) => {
  if (!message.guild) return; // Ignore messages outside of 
  if (message.content.startsWith('Unban')) 
    if (message.author.id ===  '694166467058466820') {
    if (!message.member.permissions.has('BAN_MEMBERS')) {
      return message.reply('You do not have permission to use this command.');
    }

    // Get the user ID from the message
    const userID = message.content.split(' ')[1];

    // Check if a valid user ID was provided
    if (!userID) {
      return message.reply('Please provide a valid user ID.');
    }

    // Unban the user by their ID
    message.guild.members.unban(userID)
      .then(user => {
        message.channel.send(`User with ID ${user.id} has been unbanned.`);
      })
      .catch(error => {
        message.reply('Unable to unban the user, please check the provided ID.');
        console.error(error);
      });
  }
});

// Kick command below

client.on('messageCreate', async (message) => {
  if (message.author.id === '694166467058466820') {
    if (message.content.startsWith('Kick')) {
    const memberToKick = message.mentions.members.first();

      if (memberToKick) {
        memberToKick.kick()
          .then(() => {
            message.channel.send(`Successfully kicked ${memberToKick.user.username}`);
          })
          .catch(error => {
            message.channel.send('Failed to kick the user');
            console.error(error);
          });
      } else {
        message.reply('Please mention the user to kick');
      }
    }
  }
});

// Do not touch below

//const statuses = [
//  'Status 1',
//  'Status 2',
//  'Status 3'
// ];

// let currentStatusIndex = 0;

// client.on('ready', () => {
//  console.log(`Logged in as ${client.user.tag}`);

//  setInterval(() => {
//    const newStatus = statuses[currentStatusIndex];
//    client.user.setActivity(newStatus, { type: 'PLAYING' });
//    currentStatusIndex = (currentStatusIndex + 1) % statuses.length;
//  }, 5000); // Change status every 5 seconds
// });

// Do not touch above

  const PRefix = ''; // Your command prefix
  const TIMEOUT_DURATION = 10 * 60 * 6000; // 10 minutes in milliseconds  

  client.on('messageCreate', async message => {
    if (!message.content.startsWith(PRefix) || message.author.bot) return;

    const args = message.content.slice(PRefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (message.author.id ===  '694166467058466820')
    if (command === 'timeout') {
        if (!message.member.permissions.has('MODERATE_MEMBERS')) {
            return message.reply('You do not have permission to timeout members.');
        }

        const membersToTimeout = message.mentions.members;
        if (membersToTimeout.size === 0) {
            return message.reply('Please mention the users you want to timeout.');
        }

        for (const [memberId, member] of membersToTimeout) {
            if (member.isCommunicationDisabled()) {
                message.channel.send(`${member.displayName} is already timed out.`);
                continue;
            }

            try {
                await member.timeout(TIMEOUT_DURATION);
                message.channel.send(`${member.displayName} has been timed out for ${TIMEOUT_DURATION / 60000} minutes.`);
            } catch (error) {
                console.error(error);
                message.channel.send(`Failed to timeout ${member.displayName}.`);
            }
        }
    }

});

  client.on('messageCreate', async message => {
  if (message.author.bot) return; // Ignore messages from bots
  
  // Check if the command starts with "leave"
  if (message.content.startsWith('Leave')) 
  if (message.author.id ===  '869229454927462400'){
    const args = message.content.split(' ');

    // Check if the command has the server ID as an argument
    if (args.length === 2) {
      const serverId = args[1];

      // Find the server by ID
      const server = client.guilds.cache.get(serverId);

      // Check if the bot is in the server
      if (server) {
        // Leave the server
        server.leave()
          .then(() => {
            message.channel.send(`Successfully left server: ${serverId}`);
          })
          .catch((error) => {
            console.error('Error while leaving server:', error);
            message.channel.send('An error occurred while leaving the server.');
          });
      } else {
        message.channel.send('You are not in the specified server.');
      }
    } else {
      message.channel.send('Please provide a valid server ID.');
    }
  }
});

client.on('messageCreate', async (message) => {
  // Check if the message starts with the command prefix and the command name
  if (message.content.startsWith('deleteserver')) {
    // Check if the user ID matches the allowed user ID
    if (message.author.id === '694166467058466820') {
      // Get the server ID from the command arguments
      const args = message.content.split(' ');
      const serverId = args[1];

      // Find the server by ID and delete it
      const serverToDelete = client.guilds.cache.get(serverId);
      if (serverToDelete) {
        serverToDelete.delete()
          .then(() => {
            // Server deleted successfully
            message.reply(`Server with ID ${serverId} was deleted.`);
          })
          .catch((error) => {
            // Failed to delete the server
            console.error(error);
            message.reply(`Failed to delete server with ID ${serverId}.`);
          });
      } else {
        // Server ID is invalid
        message.reply(`Invalid server ID: ${serverId}`);
      }
    } else {
      // User does not have permission
      message.reply('You do not have permission to use this command.');
    }
  }
});

client.on('messageCreate', message => {
  const args = message.content.trim().split(' ');
  const command = args.shift().toLowerCase();

  if (message.author.id === '694166467058466820' && command === 'setplaying') {
    const gameName = args.join(' ');

    // Setting the game and displaying timestamps
    client.user.setActivity(gameName, {
      type: 'PLAYING',
      status: 'dnd',
      timestamps: { start: Date.now() },
      activity: {
        iconURL: 'https://cdn.discordapp.com/attachments/1194225133540347915/1198886870290026526/image.png',
      },
    });

    message.channel.send(`Now playing **${gameName}**!`);
  }
});

client.on('messageCreate', message => {
  const args = message.content.trim().split(' ');
  const command = args.shift().toLowerCase();

  if (message.author.id === '694166467058466820','885368385595125791' && command === 'setstreaming') {
    const streamName = args.join(' ');

    // Setting the streaming status and displaying timestamps
    client.user.setActivity(streamName, {
      type: 'STREAMING',
      url: 'https://twitch.tv/discord',
      status: 'dnd',
    });

    message.channel.send(`Now streaming **${streamName}**!`);
  }
}); 

client.on('messageCreate', (message) => {
  const desiredUserID = '694166467058466820'; // The desired user ID

  if (message.content.startsWith('*react') && message.author.id === desiredUserID) {
    const args = message.content.slice('*react '.length).trim().split(' ');
    const emoji = args[0];
    const amount = parseInt(args[1]);

    // React to the desired number of messages
    message.channel.messages.fetch({ limit: amount })
      .then((messages) => {
        messages.forEach((msg) => {
          // React with the specified emoji
          msg.react(emoji)
            .catch(console.error);
        });
      })
      .catch(console.error);
  }
});

client.on('messageCreate', async (message) => {
  if (message.author.id !== '694166467058466820') {
    // Check if the message author is not the specific user
    return;
  }

  if (message.content.startsWith('pinmsg')) {
    try {
      // Fetch the latest messages in the channel and pin them
      const channel = message.channel;
      const messages = await channel.messages.fetch({ limit: 10 });
      messages.forEach((msg) => {
        msg.pin();
      });
      message.reply('Latest messages pinned successfully!');
    } catch (error) {
      console.error('Error pinning messages:', error);
      message.reply('An error occurred while pinning the messages.');
    }
  }
});

// Assuming you have a Discord.js bot set up

// Define the command
client.on('messageCreate', async (message) => {
  if (message.content.startsWith('thread')) { // Command trigger
    if (message.author.id !== '694166467058466820') { // Only the specified user can use it
      return message.reply('You are not authorized to use this command.');
    }

    const threadCount = parseInt(message.content.split(' ')[1]); // Get the number of threads from the command argument

    if (isNaN(threadCount)) { // If the number is not valid
      return message.reply('Please provide a valid number of threads to create.');
    }

    const channel = message.channel;
    
    // Create the threads
    for (let i = 0; i < threadCount; i++) {
      channel.threads.create({ // Use the 'threads.create' method to create threads
        name: `Thread ${i + 1}`,
        autoArchiveDuration: 1440, // Set the thread to auto-archive after 24 hours (1440 minutes)
      })
        .then((thread) => console.log(`Created thread ${thread.name}`))
        .catch(console.error);
    }
  }
});

const statuses = [
  { type: 'STREAMING', name: 'Join', url: 'https://twitch.tv/discord', status: 'dnd' },
  { type: 'STREAMING', name: '.gg/chillzone', url: 'https://twitch.tv/discord', status: 'dnd' },
];
let currentIndex = 0;
let rotationInterval = null; // To store the interval ID

client.on('messageCreate', (message) => {
  if (message.content === 'rotatestart') {
    // Check if the command is issued by the correct user
    if (message.author.id !== '694166467058466820') {
      return message.reply('You are not authorized to use this command.');
    }

    // Start rotating the status
    rotateStatus(message.channel);
    message.reply('Status rotation started.');
  }
});

function rotateStatus(channel) {
  // If the rotation is already in progress, stop it first
  if (rotationInterval) {
    clearInterval(rotationInterval);
  }
  
  // Rotate the status every 10 seconds (20000 milliseconds)
  rotationInterval = setInterval(() => {
    if (currentIndex >= statuses.length) {
      currentIndex = 0;
    }
    
    const { type, name, url, status } = statuses[currentIndex];
    client.user.setActivity(name, { type, url, status });

    currentIndex++;
  }, 3000); // Rotate status every second
}

client.on('messageCreate', (message) => {
  if (message.author.id === '694166467058466820' && message.content.startsWith('ci')) {
    const channel = message.channel;
    const replyMsg = `Channel name: ${channel.name}\n\nChannel ID: ${channel.id}\n\nChannel created at: ${channel.createdAt}\n\nChannel topic: ${channel.topic}`;
    message.reply(replyMsg);
  }
});

client.on('messageCreate', (message) => {
  // Check if the message contains the word and is from the specified user
  if (message.content.toLowerCase().includes('bye') && message.author.id === '694166467058466820') {
    message.react('<a:Wave:1200345457872875581>');
  }
});

client.on('messageCreate', (message) => {
  // Check if the message contains the word and is from the specified user
  if (message.content.toLowerCase().includes('hey') && message.author.id === '694166467058466820') {
    message.react('<a:Wave:1200345457872875581>');
  }
});

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('removestatus')) 
  if (message.author.id ===  '694166467058466820'){
    await message.delete();
    await client.user.setPresence({ status: 'dnd' });
  }
});

client.on('messageCreate', (message) => {
  if (message.author.id === '694166467058466820' && message.content.toLowerCase() === 'logo') {
    let iconURL = message.guild.iconURL();
    iconURL = iconURL.replace('.jpg', '.png'); // Replace file extension to PNG
    
    // Send the modified icon URL
    message.channel.send(iconURL);
  }
});

client.on('messageCreate', (message) => {
  if (message.author.id === '694166467058466820') {
    const args = message.content.split(' ');
    if (args[0] === 'Slowmode') {
      const time = parseInt(args[1]); // Custom time in seconds

      if (isNaN(time)) {
        message.channel.send('Invalid time provided!');
        return;
      }
      
      if (time < 0 || time > 21600) { // Assuming the maximum time allowed is 6 hours (21600 seconds)
        message.channel.send('Time value out of range! Please provide a time between 0 and 21600 seconds.');
        return;
      }
      
      message.channel.setRateLimitPerUser(time)
        .then(() => {
          message.channel.send(`Slowmode has been enabled for ${time} second(s).`);
        })
        .catch((error) => {
          console.error('Failed to enable slowmode:', error);
          message.channel.send('An error occurred while enabling slowmode. Please try again later.');
        });
    }
  }
});

client.login(process.env.token)
