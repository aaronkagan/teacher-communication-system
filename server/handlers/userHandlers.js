// USER HANDLERS

// Setup for connecting to mongoDb
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Get all users
const getUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    console.log("connected");
    const db = client.db("TaskBoard");
    const result = await db.collection("users").find().toArray();
    const data = result.map((user) => {
      return {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.userName,
        email: user.email,
        role: user.role
      };
    });

    return res.status(200).json({ status: 200, data: data });
  } catch (err) {
    return res.status(500).json({ status: 500, error: err });
  } finally {
    await client.close();
    console.log("disconnected");
  }
};

// Get a single user based on userId
const getUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userId = req.params.userId;

  try {
    await client.connect();
    console.log("connected");
    const db = client.db("TaskBoard");
    const result = await db.collection("users").findOne({ userId: userId });
    const payload = {
      userId: result.userId,
      firstName: result.firstName,
      lastName: result.lastName,
      username: result.userName,
      email: result.email,
      role: result.role
    };
    return res.status(200).json({ status: 200, data: payload });
  } catch (err) {
    return res.status(500).json({ status: 500, error: err });
  } finally {
    await client.close();
    console.log("disconnected");
  }
};

// Add new user

const addUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const payload = { ...req.body, password: generateHashedPassword(req.body.password) };

  try {
    await client.connect();
    console.log("connected");
    const db = client.db("TaskBoard");
    const result = await db.collection("users").insertOne(payload);
    res.json({ message: "User has been added", data: result });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
    console.log("disconnected");
  }
};

// Edit a user

const editUser = async (req, res) => {
  const { firstName, lastName, email, role, userId, password } = req.body;

  const client = new MongoClient(MONGO_URI, options);

  const payload = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: generateHashedPassword(password),
    role: role
  };

  try {
    await client.connect();
    console.log("connected");
    const db = client.db("TaskBoard");
    const result = await db.collection("users").updateOne({ userId: userId }, { $set: payload });

    return res.status(200).json({ status: 200, message: "User updated" });
  } catch (err) {
    return res.status(500).json({ status: 500, error: err });
  } finally {
    await client.close();
    console.log("disconnected");
  }
};

// Delete a user based on userId
const deleteUser = async (req, res) => {
  userId = req.params.userId;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    console.log("connected");
    const db = client.db("TaskBoard");
    const result = await db.collection("users").deleteOne({ userId: userId });
    return res.status(200).json({ status: 200, message: "User has been deleted" });
  } catch (err) {
    return res.status(500).json({ status: 500, error: err });
  } finally {
    await client.close();
    console.log("disconnected");
  }
};

module.exports = { getUsers, getUser, addUser, editUser, deleteUser };
