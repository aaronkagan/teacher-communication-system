// LOGIN HANDLERS

const bcrypt = require("bcrypt");

// Setup for connecting to mongoDb
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Login
const login = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const username = req.body.username;
  const password = req.body.password;

  try {
    await client.connect();
    console.log("connected");
    const db = client.db("TaskBoard");
    const result = await db.collection("users").findOne({ username });
    const hash = result.password;

    bcrypt.compare(password, hash, function (err, passwordMatch) {
      if (passwordMatch) {
        const response = {
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          username: result.username,
          role: result.role,
          userId: result.userId
        };
        return res.status(200).json({ data: response, message: "Login successful" });
      } else {
        return res.status(400).json({ status: 400, error: "Incorrect Login Information" });
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  } finally {
    await client.close();
    console.log("disconnected");
  }
};

module.exports = { login };
