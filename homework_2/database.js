var sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message);

    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS dog (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            breed text,
            age int
            )`,
            (err) => {
                console.log(err);
            });
    }
});


module.exports = db;