// ANNOUNCEMENT HANDLERS

// Setup for connecting to mongoDb
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Get all announcements
const getAnnouncements = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    console.log("connected");
    const db = client.db("TaskBoard");
    const result = await db.collection("announcements").find().toArray();

    const data = result.map((announcement) => {
      return {
        announcementId: announcement.userId,
        createdById: announcement.createdById,
        createdByName: announcement.createdByName,
        message: announcement.message
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

// Get announcements from specific user
const getUserAnnouncements = async (req, res) => {};

// Create a new announcement
const addAnnouncement = async (req, res) => {};

module.exports = { getAnnouncements, getUserAnnouncements, addAnnouncement };
