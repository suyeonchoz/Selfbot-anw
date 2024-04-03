module.exports = {
    description: 'https://appembed.netlify.app/e?description=type%20VARflipacoin%20to%20get%20flip%20a%20coin!%2050%2F50%20change%20of%20heads%20or%20tails.&provider=Sioz%20selfbot&author=VARflipacoin&image=&color=%23FF0000',
    run: async (client, message, args, prefix) => {
        const result = Math.random() < 0.5 ? 'https://media.tenor.com/nEu74vu_sT4AAAAC/heads-coinflip.gif' : 'https://media.tenor.com/kK8D7hQXX5wAAAAC/coins-tails.gif';
        message.reply(`${result}`);
    }
};