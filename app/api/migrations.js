const { database_1 } = require("./database");  // Ensure you are importing 'database_1' correctly

const migrate = () => {
  database_1.serialize(() => {
    database_1.run(`
      CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        imageUrl TEXT NOT NULL,
        articleUrl TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL
      );
    `, (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      } else {
        console.log("Articles table created successfully.");
      }
    });
  });
};

migrate();
