let sqlite3 = require('sqlite3').verbose();
module.exports = function checker(xp, lvl, atk, def, sp, username) {
    let db = new sqlite3.Database('game.db')
    if (xp >= lvl * 5000) {
        xp = xp - (lvl * 5000);
        lvl += 1;
        atk += Math.floor(Math.random() * 2) + 1;
        def += Math.floor(Math.random() * 2) + 1;
        sp += 10;
        db.run("UPDATE users SET xp = ?, lvl = ?, atk = ?, def = ?, sp = ? WHERE username = ?", [xp, lvl, atk, def, sp, username], (err) => {
            if (err) {
                throw err;
            }
        });
    }
}