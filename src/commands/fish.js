const sqlite3 = require('sqlite3').verbose();
exports.run = (client, message, args) => {
    let db = new sqlite3.Database("./game.db");
    let user = db.get("SELECT xp, inv FROM users WHERE username = ?", [message.author.username], (err, row) => {
        if (err) {
            throw err;
        } else {
            if (row != undefined) {
                let num = Math.ceil(Math.random() * 2) + 1;
                let test = row['inv'].search('fish');
                let fish = row['inv'].slice(0, test);
                if (test === -1) {
                    let anum = num;
                    let xp = Math.ceil(Math.random() * 10) * num;
                    let sql = "UPDATE users SET xp = ?, inv = ? WHERE username = ?";
                    message.channel.send(`${message.author.username} caught ${num} fish\nEarned ${xp}xp`);
                    db.run(sql, [xp + row['xp'], [`${anum} fish` + row['inv'].slice(test + 4)], message.author.username], (err) => {
                        if (err) { throw err }
                    })
                }
                else {
                    let anum = parseInt(fish) + num;
                    let xp = Math.ceil(Math.random() * 10) * num;
                    let sql = "UPDATE users SET xp = ?, inv = ? WHERE username = ?";
                    message.channel.send(`${message.author.username} caught ${num} fish\nEarned ${xp}xp`);
                    db.run(sql, [xp + row['xp'], [`${anum} fish` + row['inv'].slice(test + 4)], message.author.username], (err) => {
                        if (err) { throw err }
                    })
                }
            };
        }
    })
}