module.exports = {
    description: 'https://appembed.netlify.app/e?description=ype%20VARExecuteGayAlert%205%20for%20example%20to%20loop%20gay%20alert%205%20times!&provider=Sioz%20selfbot&author=VARExecuteGayAlert%20val&color=%23FF0000',
    run: async (client, message, handler, prefix, MyID) => {
        let args = message.content.slice(16).trim().split(/ +/g);
        try {
            const msgRef = await message.edit("GAY ALERT!");
            let n = args[0] || 1;
            Loop();
            async function Loop() {
                for (let a = 0; a < n; a++) {
                    await new Promise(wait => setTimeout(wait, 1500));
                    msgRef.edit("GAY DETECTED IN DISCORD PROCESS ");
                    await new Promise(wait => setTimeout(wait, 1500));
                    msgRef.edit("GAY DETECTED ON COMMUNIST GROUNDS");
                    await new Promise(wait => setTimeout(wait, 1500));
                    msgRef.edit("INITIATING NUCLEAR LAUNCH CODES");
                    await new Promise(wait => setTimeout(wait, 1500));
                    msgRef.edit("5");
                    await new Promise(wait => setTimeout(wait, 1000));
                    msgRef.edit("4");
                    await new Promise(wait => setTimeout(wait, 1000));
                    msgRef.edit("3");
                    await new Promise(wait => setTimeout(wait, 1000));
                    msgRef.edit("2");
                    await new Promise(wait => setTimeout(wait, 1000));
                    msgRef.edit("1");
                    await new Promise(wait => setTimeout(wait, 1000));
                    msgRef.edit("THREAT DESTROYED.");
                    await new Promise(wait => setTimeout(wait, 2000));
                    msgRef.edit("https://tenor.com/view/huge-explosion-boom-explosive-gif-16819858")
                    await new Promise(wait => setTimeout(wait, 10));
                    await new Promise(wait => setTimeout(wait, 2500));
                }
            }
        } catch (err) {
            return void(0)
        }
    }
}