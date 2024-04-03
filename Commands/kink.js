const fs = require('fs');
let config = {};
const { Appembed } = require('kyz');

const kinks = [
    { name: 'Abrasion', description: 'A subcategory of BDSM that involves feeling aroused by scratchy or harsh surfaces like sandpaper.' },
    { name: 'Acrotomophilia', description: 'Arousal to amputees—people who have lost or experienced the removal of a body part such as a finger, hand, toe, foot, hand, arm or leg.' },
    { name: 'Actirasty', description: 'Arousal to the sun rays.' },
    { name: 'Agalmatophilia', description: 'Feeling aroused by statues.' },
    { name: 'Anasteemaphilia', description: 'Arousal to a person of extreme stature—giant or dwarf.' },
    { name: 'Apotemnophilia', description: 'Arousal to oneself as an amputee.' },
    { name: 'Autogynephilia', description: 'Males feeling aroused by oneself’s female form—in reality or imagination.' },
    { name: 'Autoplushophilia', description: 'Feeling attracted to oneself when imagining being dressed as a giant cartoon, stuffed animal or plush toy.' },
    { name: 'Chasmophilia', description: 'Arousal to caves, valleys and crevices (narrow cracks in the rock or walls.)' },
    { name: 'Claustrophilia', description: 'Feeling aroused in closed and confined spaces.' },
    { name: 'Climacophilia', description: 'Arousal to falling down stairs.' },
    { name: 'Coprophilia', description: 'Arousal to feces.' },
    { name: 'Cuckolding', description: 'A female partner sleeping with another man to humiliate her male partner while he is aware of the relationship.' },
    { name: 'Electrostimulation', description: 'Using the power of electricity—electric shock—for kink.' },
    { name: 'Ephebophilia', description: 'Feeling aroused by adolescents—between the age of 15-19.' },
    { name: 'Erotic Asphyxiation / Breath Play', description: 'Limiting the supply of oxygen to the brain during sex to intensify orgasm and heighten arousal.' },
    { name: 'Exhibitionism', description: 'Arousal to displaying one’s sexual organs in public.' },
    { name: 'Fetishism', description: 'Arousal to objects that have physically been in contact with the desired person.' },
    { name: 'Formicophilia', description: 'Feeling aroused by insects.' },
    { name: 'Frotteurism', description: 'Feeling aroused by touching a stranger secretly in crowded places.' },
    { name: 'Gerontophilia', description: 'Arousal to the elderly.' },
    { name: 'Hebephilia', description: 'Arousal to the children of pubescent age—11-14 years old.' },
    { name: 'Katoptronophilia', description: 'Feeling aroused by the thought of having sex or actually having sex in front of the mirrors.' },
    { name: 'Knismolagnia', description: 'Arousal caused by being tickled.' },
    { name: 'Lithophilia', description: 'Feeling aroused by stones and gravels.' },
    { name: 'Masochism', description: 'Arousal to experiencing physical and psychological pain.' },
    { name: 'Melissaphilia / Melissophilia', description: 'Arousal to bees and wasps.' },
    { name: 'Nasolingus', description: 'Arousal to sucking on a partner’s nose.' },
    { name: 'Nebulophilia', description: 'Feeling aroused by fog.' },
    { name: 'Necrophilia', description: 'Arousal to corpses.' },
    { name: 'Objectophilia', description: 'Arousal to a particular object, regardless of whether it has been in physical contact with the desired person or not.' },
    { name: 'Partialism', description: 'Feeling sexually aroused by body parts other than the reproductive ones like calves, biceps, etc.' },
    { name: 'Pedophilia', description: 'Arousal to prepubescent children—below 9 years old.' },
    { name: 'Podophilia', description: 'Feeling aroused by feet.' },
    { name: 'Psellismophilia', description: 'Feeling aroused by the act of stuttering.' },
    { name: 'Psychrophilia', description: 'Arousal to being cold and watching others who are cold.' },
    { name: 'Pteronphilia', description: 'Feeling aroused when tickled by feathers.' },
    { name: 'Pubephilia', description: 'Arousal to pubic hair.' },
    { name: 'Pygophilia', description: 'Arousal to buttocks.' },
    { name: 'Quirofilia', description: 'Feeling specifically attracted to fingers, a good manicure, or hands.' },
    { name: 'Sadism', description: 'Arousal by causing physical and psychological pain.' },
    { name: 'Savantophilia', description: 'Sexual arousal and attraction to mentally challenged and deformed.' },
    { name: 'Spectrophilia', description: 'Sexual attraction to ghosts or images in the mirrors.' },
    { name: 'Stygiophilia', description: 'Feeling aroused by the thought of damnation or hellfire.' },
    { name: 'Teleiophilia', description: 'Arousal to reproductive-aged adults.' },
    { name: 'Teratophilia', description: 'Sexual attraction to monsters or deformed people.' },
    { name: 'Titillgnia', description: 'Arousal to tickling others.' },
    { name: 'Transvestic Fetishism', description: 'Arousal to women’s garments touching male’s skin.' },
    { name: 'Trichophilia', description: 'Feeling sexually aroused by human hair—arm hair, chest hair, pubic hair, hair on your head and even animal fur.' },
    { name: 'Urophilia / Golden Shower / Water Sports', description: 'Arousal to urine—urinating on others or being urinated by others.' },
    { name: 'Vorarephilia', description: 'Arousal to eating the body parts of another person.' },
    { name: 'Voyeurism', description: 'Arousal to spying on others for sexual pleasure.' },
    { name: 'Xylophilia', description: 'Arousal to wood.' },
    { name: 'Zoophilia', description: 'Sexual fixation on non-human animals.' },
];

if (fs.existsSync('config.json')) {
    config = JSON.parse(fs.readFileSync('config.json'));
}

module.exports = {
    description: 'https://appembed.netlify.app/e?t=&c=%23FF0000&a=VARkink&d=Type%20VARkink%20%40user%20to%20see%20what%20weird%20kink%20they%20have!&p=Sioz%20selfbot&i=&ic=',
    run: async (client, message, handler, prefix, MyID) => {
        try {
            message.react(config.successEmoji).catch(err => message.react('<a:Black_Butterfly:1095210519020970046>').catch(e => console.log(e)));
            const userMentions = message.mentions.users;
            if (userMentions.size > 0) {
                const randomKink = kinks[Math.floor(Math.random() * kinks.length)];
                userMentions.forEach(user => {
                    const username = user.username;
                    const embed = new Appembed()
                        .setColor("#FF0000")
                        .setAuthor(`${randomKink.name}`)
                        .setDescription(`${username}'s weird kink is ${randomKink.name}\n\n${randomKink.description}`)
                        .setProvider("Sioz selfbot")
                        .build();

                    message.reply(`${config.longstringoftext} ${embed}`);
                });
            }
        } catch (err) {
            return void(0);
        }
    }
}
