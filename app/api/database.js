// /src/app/api/database.ts

// Using require for CommonJS-style imports
let sqlite3 = require("sqlite3").verbose();
let path = require("path");

const dbPath = path.join(process.cwd(), "profile.db");
const database_1 = new sqlite3.Database(
  dbPath,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the profile database.");
  }
);

// Use CommonJS export syntax
module.exports = { database_1 };
