const Discord = require('discord.js');
let get_db = require('../data.js');
exports.run = (client, message, args) => {
    let db = get_db('game.db')
    let user = {};
    let users = db.get('SELECT * FROM users WHERE username = ?', message.author.username, (err, row) => {
        user[row] = row;
        if (row == undefined) {
            message.channel.send("You don't have a character yet\nset one up with mmo start");
            return;
        }
        else {
            const stats = new Discord.MessageEmbed()
                .setColor('FB8B00')
                .setTitle(`Stats for ${message.author.username}`)
                .setDescription('Some description here')
                .addFields(
                    { name: 'lvl', value: `${user['[object Object]']['lvl']}` },
                    { name: 'class :briefcase:', value: `${user['[object Object]']['class']}` },
                    {
                        name: 'hp :heart:', value: `${user['[object Object]']['hp']}/${user['[object Object]']['mh']}`
                    },
                    { name: 'weapon', value: `${user['[object Object]']['weapon']}`, inline: true },
                    { name: 'atk', value: `${user['[object Object]']['atk']}`, inline: true },
                    { name: 'energy', value: `${user['[object Object]']['energy']}` },
                    { name: 'armor', value: `${user['[object Object]']['armor']}`, inline: true },
                    { name: 'def', value: `${user['[object Object]']['def']}`, inline: true },
                    { name: 'skill points', value: `${user['[object Object]']['sp']}` },
                    { name: 'xp', value: `${user['[object Object]']['xp']}` }
                )
                .setFooter('Provided generously by the team working on this bot (https://github.com/MrRandom31/Discord-Bot)');
            message.channel.send(stats);
        }
    }
    )
};
