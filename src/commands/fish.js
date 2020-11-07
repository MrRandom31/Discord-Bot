let get_db = require("../data.js");
exports.run = (client, message, args) => {
    let db = get_db('game.db');
    let user = db.get("SELECT * FROM users WHERE username = ?", [message.author.username], (err, row) => {
        if (err) {
            throw err;
        } else {
            if (row != undefined) {
                let num = Math.ceil(Math.random() * 5) + 1;
                let test = row['inv'].search('fish');
                let fish = row['inv'].slice(0, test);
                if (test === -1) {
                    let anum = num;
                    let xp = Math.ceil(Math.random() * 25) * num;
                    let sql = "UPDATE users SET xp = ?, inv = ? WHERE username = ?";
                    message.channel.send(`${message.author} caught ${num} fish\nEarned ${xp}xp`);
                    db.run(sql, [xp + row['xp'], [`${anum} fish` + row['inv'].slice(test + 4)], message.author.username], (err) => {
                        if (err) { throw err }
                    })
                }
                else {
                    let anum = parseInt(fish) + num;
                    let xp = Math.ceil(Math.random() * 25) * num;
                    let sql = "UPDATE users SET xp = ?, inv = ? WHERE username = ?";
                    message.channel.send(`${message.author} caught ${num} fish\nEarned ${xp}xp`);
                    db.run(sql, [xp + row['xp'], [`${anum} fish` + row['inv'].slice(test + 4)], message.author.username], (err) => {
                        if (err) { throw err }
                    })
                }
            };
        }
    })
}