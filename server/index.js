const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const port = 8000;

const { modifyTaskBoard, getWeeklyTasks } = require("./handlers/taskBoardHandlers");
const { login } = require("./handlers/loginHandlers");
const { getUsers, getUser, addUser, editUser, deleteUser } = require("./handlers/userHandlers");
const { getAnnouncements, getUserAnnouncements, addAnnouncement, markRead, deleteAnnouncement } = require("./handlers/announcementHandlers");

express()
  // This line will allow our server to auto-parse the body, which arrives as as a JSON string, to an object that we can use. (The same as JSON.parse())
  // The upload limit is set to fix errors I was getting with file uploads
  .use(express.json({ limit: "10mb" }))
  .use(express.urlencoded({ extended: true, limit: "10mb" }))

  // Helps with CORS error.
  .use(helmet())

  // Provides console information regarding the incoming HTTP request
  // The 'tiny' argument formats the message to only show some of information
  .use(morgan("tiny"))

  .get("/hello", (req, res) => {
    res.status(200).json({ status: 200, message: "Hello World!" });
  })

  // --------
  // ENDPOINTS
  // --------
  // Task board endpoints
  // Get all the tasks for that week
  .get("/api/tasks", getWeeklyTasks)
  // Create, Update, Delete any of the board tasks
  .patch("/api/tasks", modifyTaskBoard)

  // LOGIN ENDPOINTS
  // Login user based on username in body
  .post("/api/login", login)

  // USER ENDPOINTS
  // Get all users
  .get("/api/users", getUsers)

  // Get user based on userId
  .get("/api/user/:userId", getUser)
  // Add a new user
  .post("/api/user", addUser)
  // Edit a user based on userId in body
  .patch("/api/user", editUser)
  // Delete a user
  .delete("/api/user/:userId", deleteUser)

  // ANNOUNCEMENT ENDPOINTS
  // Get all announcements
  .get("/api/announcements", getAnnouncements)
  // Get single user announcements
  .get("/api/announcements/:userId", getUserAnnouncements)
  // Create a new announcement
  .post("/api/announcement", addAnnouncement)
  // Mark an announcement as read
  .patch("/api/announcement/markRead", markRead)
  // Delete an announcement
  .delete("/api/announcement", deleteAnnouncement)

  //-------------------

  // Must be below all the endpoints
  .listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
