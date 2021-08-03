const pg = require("pg");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

class Database {
  static async connect(DB_CONFIG) {
    const client = new pg.Client(DB_CONFIG);
    await client.connect();
    return client;
  }

  static async checkIfUserExists(client, email) {
    const queryResult = await client.query(
      "SELECT email FROM users WHERE email=$1",
      [email]
    );
    if (queryResult.rows.length > 0) return true;
    return false;
  }

  static async getUserData(client, email) {
    const queryResult = await client.query(
      "SELECT email,password,user_id FROM users WHERE email=$1",
      [email]
    );
    if (queryResult.rows.length > 0) return queryResult.rows[0];
    return false;
  }

  static async registerUser(client, req, res) {
    const { email, password } = req.body;
    console.log(req.body);
    // check if email and password exist
    if (!email || !password) {
      res.status(400).send({ msg: "Not enough data" });
      return;
    }

    // check if user already exists
    let userExists = await this.checkIfUserExists(client, email);
    if (userExists) {
      res.status(409).send({ msg: "User already exists" });
      return;
    }

    let passwordHash = await bcrypt.hash(password, 5);
    let userId = uuid.v4();
    console.log(passwordHash);
    const userRegisterQuery = await client.query(
      "INSERT INTO users(user_id,email,password) VALUES ($1,$2,$3)",
      [userId, email, passwordHash]
    );
    if (userRegisterQuery.rowCount !== 1) {
      res.status(400).send({ msg: "Could not create user" });
      return;
    }
    let token = jwt.sign({ userId, email }, JWT_SECRET, {
      expiresIn: "7d",
    });
    const user = {
      userId,
      email,
      passwordHash,
      token,
    };
    res.status(200).json(user);
    return;
  }

  static async loginUser(client, req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).send({ msg: "Not enough data" });
      return;
    }

    // check if user exists
    let userExists = await this.checkIfUserExists(client, email);
    if (!userExists) {
      res.status(401).send({ msg: "User with this email does not exist" });
      return;
    }

    let userData = await this.getUserData(client, email);
    let passwordMatch = await bcrypt.compare(password, userData.password);
    if (!passwordMatch) {
      res.status(401).send({ msg: "Incorrect password" });
      return;
    }

    const token = jwt.sign(
      {
        userId: userData.user_id,
        email,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const user = {
      userData: userData.user_id,
      email,
      passwordHash: userData.password,
      token,
    };

    res.status(200).json(user);
  }
}

module.exports.Database = Database;
