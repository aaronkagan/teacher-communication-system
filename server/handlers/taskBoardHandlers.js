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

    if (result.modifiedCount > 0) {
      return res.status(200).json({ status: 200, message: "The board has been updated" });
    } else {
      return res.status(400).json({ status: 400, error: "An unknown error has occurred" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 500, error: err });
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
