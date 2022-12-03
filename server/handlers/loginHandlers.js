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
    // If no user found with that username
    if (result === null) return res.status(404).json({ status: 404, error: "Can't find a user with that username" });

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
        return res.status(400).json({ status: 400, error: "Incorrect password" });
      }
    });
  } catch (err) {
    return res.status(500).json({ status: 500, error: "An unknown error has occurred" });
  } finally {
    await client.close();
    console.log("disconnected");
  }
};

module.exports = { login };
