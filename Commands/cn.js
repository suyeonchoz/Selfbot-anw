module.exports = {
    description: 'https://appembed.netlify.app/e?description=Typing%20VARcy%20or%20VARcn%20will%20either%20send%20a%20cat%20yes%20gif%20or%20a%20cat%20no%20gif&provider=Sioz%20selfbot&author=VARcy%20or%20VARcn&image=&color=%23FF0000=',
    run: async (client, message, handler, prefix, MyID) => {
        try {
            message.edit(`https://tenor.com/view/cat-no-nonono-noooo-cat-no-gif-25423213`).catch(err => message.reply(`https://tenor.com/view/cat-no-nonono-noooo-cat-no-gif-25423213`));
        } catch (err) {
            return void(0);
        }
    }
}