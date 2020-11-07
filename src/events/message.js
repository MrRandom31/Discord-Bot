let get_db = require("../data.js");
module.exports = (client, message) => {
    if (message.author.bot) return;
    // Gets the data
    let db = get_db('game.db');
    db.get("SELECT * FROM users WHERE username = ?", message.author.username, (err, row) => {
        if (err) {
            throw err

        }
        // Ensures user exists
        if (row != undefined) {
            if (row['xp'] >= row['lvl'] * 5000) {
                message.channel.send(`${message.author}You've leveled up! Press 1 to increase attack, 2 to increase defense and 3 to increase hp`);
                message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 15000, errors: ['time'] })
                    .then(collected => {
                        let xp = row['xp']
                        let lvl = row['lvl'];
                        let sp = row['sp'];
                        let atk = row['atk'];
                        let def = row['def'];
                        let hp = row['hp'];
                        let username = row['username'];
                        let mh = row['mh']
                        let x = collected.first().content;
                        switch (x) {
                            case "1":
                                lvl += 1;
                                sp += 10;
                                atk += 2;
                                xp -= (row['lvl'] * 5000);
                                message.channel.send("Your attack has increased");
                                break;
                            case "2":
                                lvl += 1;
                                sp += 10;
                                def += 2;
                                xp -= (row['lvl'] * 5000);
                                message.channel.send("Your defense has increased");
                                break;
                            case "3":
                                lvl += 1;
                                sp += 10;
                                hp += 2;
                                mh += 2;
                                xp -= (row['lvl'] * 5000);
                                message.channel.send("Your hp has increased");
                                break;
                            default:
                                message.channel.send("You've entered a value that isn't 1, 2 or 3. Please enter one of these values to level up");
                                return

                        }
                        db.run("UPDATE users SET mh = ?, hp = ?, xp = ?, lvl = ?, atk = ?, def = ?, sp = ? WHERE username = ?", [mh, hp, xp, lvl, atk, def, sp, username], (err) => {
                            if (err) {
                                throw err;
                            }
                        })


                    })
            }
        }
    });
    if (message.content.toLowerCase().indexOf(client.config.prefix) !== 0) return;

    // Our standard argument/command name definition.
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Grab the command data from the client.commands map
    const cmd = client.commands.get(command);



    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;

    // Run the command
    cmd.run(client, message, args);

};
