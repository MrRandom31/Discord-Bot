let sqlite3 = require('sqlite3').verbose();
exports.run = (client, message, args) => {
    let db = new sqlite3.Database('./game.db');
    let classes = { '1': 'Mage', '2': 'Warrior', '3': 'Archer', '4': 'Assassin', '5': 'Healer' };
    let weapons = { '1': 'Basic Staff', '2': 'Rusty Sword', '3': 'Training Bow', '4': 'Rusty daggers', '5': 'Rotten Club' };
    let armors = { '1': 'Old Robes', '2': 'Rusty Iron Armor', '3': 'Old Cloak', '4': 'Old Cloack', '5': 'Coffee Stained Coat' };
    let stats = {
        'Mage': { 'hp': 40, 'atk': 4, 'def': 3, 'sp': 20 }, 'Healer': { 'hp': 40, 'atk': 3, 'def': 3, 'sp': 25 },
        'Archer': { 'hp': 45, 'atk': 3, 'def': 3, 'sp': 15 }, 'Assassin': { 'hp': 42, 'atk': 4, 'def': 3, 'sp': 15 },
        'Warrior': { 'hp': 50, 'atk': 5, 'def': 5, 'sp': 10 }
    }
    let users = db.get("SELECT class FROM users WHERE username = ?", [message.author.username], (err, row) => {
        if (row == undefined) {
            message.channel.send("Welcome adventurer to the discord mmorpg Bot! \nnow, to get started you will need to select a class! \n(Type the number to select your class!) \n1: Mage | 2: Warrior | 3: Archer | 4: Assassin | 5: Healer").catch(console.error);
            message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 15000, errors: ['time'] })
                .then(collected => {
                    if (classes[collected.first().content] != undefined) {
                        let c = classes[collected.first().content];
                        let hp = stats[c]['hp'];
                        let atk = stats[c]['atk'];
                        let def = stats[c]['def'];
                        let sp = stats[c]['sp'];
                        let energy = 30;
                        let lvl = 1;
                        let xp = 0;
                        db.run("INSERT INTO users(username, class, weapon, armor, inv, skills, hp, mh, atk, def, sp, energy, lvl, xp) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?)", [message.author.username, classes[collected.first().content], weapons[collected.first().content], armors[collected.first().content], "", "", hp, hp, atk, def, sp, energy, lvl, xp], (err) => {
                            if (err) {
                                return console.log(err.message);
                            }
                            console.log('Row was added to the table');
                        })
                        message.channel.send(`You have chosen ${classes[collected.first().content]}`);

                    };
                })
        } else {
            message.channel.send("You have already chosen a class");
        }
    });
}