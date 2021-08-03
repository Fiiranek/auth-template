const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const Database = require("./db/Database").Database;
const auth = require("./middleware/auth");
const cors = require("cors");
const config = require("./config/config");

async function main() {
  const client = await Database.connect(config.DB_CONFIG);
  app.use(express.json());
  app.use(cors());
  app.post("/register", async (req, res) => {
    await Database.registerUser(client, req, res);
  });
  app.post("/login", async (req, res) => {
    await Database.loginUser(client, req, res);
  });

  app.post("/start", auth, (req, res) => {
    res.status(200).send("HI!");
  });
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
}

main();
