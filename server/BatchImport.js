const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const initialData = {
  weekId: "1",
  tasks: {
    // "task-1": { id: "task-1", content: "Take out the garbage" },
    // "task-2": { id: "task-2", content: "Buy food" },
    // "task-3": { id: "task-3", content: "Mow the lawn" },
    // "task-4": { id: "task-4", content: "Wash the car" },
    // "task-5": { id: "task-5", content: "Do homework" }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Sunday",
      // taskIds: ["task-1", "task-2", "task-3", "task-4", "task-5"]
      taskIds: []
    },
    "column-2": {
      id: "column-2",
      title: "Monday",
      taskIds: []
    },
    "column-3": {
      id: "column-3",
      title: "Tuesday",
      taskIds: []
    },
    "column-4": {
      id: "column-4",
      title: "Wednesday",
      taskIds: []
    },
    "column-5": {
      id: "column-5",
      title: "Thursday",
      taskIds: []
    },
    "column-6": {
      id: "column-6",
      title: "Friday",
      taskIds: []
    },
    "column-7": {
      id: "column-7",
      title: "Saturday",
      taskIds: []
    }
  },
  columnOrder: ["column-1", "column-2", "column-3", "column-4", "column-5", "column-6", "column-7"]
};

const addInitialDataToMongo = async () => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    console.log("connected");
    const db = client.db("TaskBoard");
    const result = await db.collection("weeks").insertOne(initialData);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
    console.log("disconnected");
  }
};

addInitialDataToMongo();
