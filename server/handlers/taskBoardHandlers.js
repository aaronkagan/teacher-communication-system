// TASK BOARD HANDLERS

// Setup for connecting to mongoDb
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Add, remove, or update any of the task cards
const modifyTaskBoard = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    console.log("connected");
    const db = client.db("TaskBoard");
    const result = await db.collection("weeks").updateOne({ weekId: "1" }, { $set: req.body });
    res.json({ message: "Server has received the message", data: result });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
    console.log("disconnected");
  }
};

// Get all the tasks for specified week
// TODO : convert this to only find tasks for the current week (to be implemented as soon as the ability to add more weeks is added)
const getWeeklyTasks = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    console.log("connected");
    const db = client.db("TaskBoard");
    const result = await db.collection("weeks").findOne();
    delete result._id;
    res.json({ message: "Here is your data", data: result });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
    console.log("disconnected");
  }
};

module.exports = { modifyTaskBoard, getWeeklyTasks };
