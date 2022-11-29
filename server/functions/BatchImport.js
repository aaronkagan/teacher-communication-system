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
    "task-1": { id: "task-1", title: "Do this", dueDate: "Dec 5, 2022", message: "Take out the garbage" },
    "task-2": { id: "task-2", title: "Do that", dueDate: "Dec 5, 2022", message: "Buy food" },
    "task-3": { id: "task-3", title: "Do the other", dueDate: "Dec 5, 2022", message: "Mow the lawn" },
    "task-4": { id: "task-4", title: "Or the best", dueDate: "Dec 5, 2022", message: "Wash the car" },
    "task-5": { id: "task-5", title: "Thing", dueDate: "Dec 5, 2022", message: "Do homework" }
  },
  columns: {
    sunday: {
      id: "sunday",
      title: "Sunday",
      taskIds: ["task-1", "task-2", "task-3", "task-4", "task-5"]
    },
    monday: {
      id: "monday",
      title: "Monday",
      taskIds: []
    },
    tuesday: {
      id: "tuesday",
      title: "Tuesday",
      taskIds: []
    },
    wednesday: {
      id: "wednesday",
      title: "Wednesday",
      taskIds: []
    },
    thursday: {
      id: "thursday",
      title: "Thursday",
      taskIds: []
    },
    friday: {
      id: "friday",
      title: "Friday",
      taskIds: []
    },
    saturday: {
      id: "saturday",
      title: "Saturday",
      taskIds: []
    }
  },
  columnOrder: ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
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
