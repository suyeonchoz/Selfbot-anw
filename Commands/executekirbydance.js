module.exports = {
    description: 'https://appembed.netlify.app/e?description=Type%20VARExecuteKirbyDance%205%20for%20example%20to%20loop%20the%20kirby%20dance%205%20times!&provider=La%20selfbot&author=VARExecuteKirbyDance%20val&color=%23FF0000',
    run: async (client, message, handler, prefix, MyID) => {
        let args = message.content.slice(18).trim().split(/ +/g);
        if (message.content.toLowerCase().startsWith(`${prefix}executekirbydance`)) {
            try {
                const msgRef = await message.edit("(>'-')>");
                let n = args[0] || 1;
                Loop();
                async function Loop() {
                    for (let a = 0; a < n; a++) {
                        await new Promise(wait => setTimeout(wait, 1000));
                        msgRef.edit("<('-')>");
                        await new Promise(wait => setTimeout(wait, 1000));
                        msgRef.edit("<('-'<)");
                        await new Promise(wait => setTimeout(wait, 1000));
                        msgRef.edit("<('-')>");
                        await new Promise(wait => setTimeout(wait, 1000));
                        msgRef.edit("^('-')^");
                        await new Promise(wait => setTimeout(wait, 1000));
                        msgRef.edit("v('-')v");
                        await new Promise(wait => setTimeout(wait, 1000));
                        msgRef.edit("<('-')>");
                        await new Promise(wait => setTimeout(wait, 1000));
                    }
                }
            } catch (err) {
                return void(0)
            }
        }
    }
}