let sqlite3 = require('sqlite3').verbose();
module.exports = function get_db(db) {
    return new sqlite3.Database(db);
}