const sqlite3 = require('sqlite3').verbose();
exports.run = (client, message, args) => {
    let db = new sqlite3.Database("./game.db");
    let user = db.get("SELECT inv FROM users WHERE username = ?", [message.author.username], (err, row) => {
        if (err) {
            throw err
        }
        else {
            if (row != undefined) {
                message.channel.send(`Inventory: ${row['inv']}`);
            }
            else {
                message.channel.send("You probably haven't setup a character yet\nCreate one with mmo start");
            }
        }
    })

}