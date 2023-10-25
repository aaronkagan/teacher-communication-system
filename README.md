# Welcome to ReadMe!&trade;

Your premier application for teacher student communication.

## Screenshots

Home Screen.
![Home screen](/screenshots/home-screen.png)

Login Screen.
![Login screen](/screenshots/login-screen.png)

Project Features.
![Project features](/screenshots/admin-dash.png)

Teacher Taskboard.
![Teacher taskboard](/screenshots/teacher-taskboard.png)

Teacher can add new task with optional file upload.
![Teacher add new task](/screenshots/teacher-add-new-task.png)

Teacher can leave comments.
![Teacher comments](/screenshots/teacher-task-with-comments.png)

Student sees tasks and can leave comments.
![Student task](/screenshots/student-task-with-comments.png)

Teacher can create announcements.
![Teacher create announcement](/screenshots/teacher-create-announcement.png)
![Teacher announcements](/screenshots/teacher-annoucements.png)

Announcement Reader sees all the teachers' announcements aggregated.
![Reader announcement](/screenshots/reader-announcements.png)

Reader can mark announcements as read.
![Marked as read](/screenshots/reader-mark-read.png)

Teacher sees announcements as read and can delete the announcements.
![Teacher read announcements](/screenshots/teacher-announcement-marked-read.png)

Admin can manage users. Create, edit delete.
![Admin user management](/screenshots/admin-manage-users.png)

[Video demo of ReadMe!](https://vimeo.com/780022696/)

# Installation instructions

## MongoDB setup

- Setup a connection to your own MongoDB instance.
- Create a DB called 'TaskBoard'.
- Import the collections below to get started with some user accounts (mandatory for initial login), default tasks (optional), and announcements (optional).
- At the very least the admin account will need to be imported from the users-initial-setup.json in order to be able to login and create user accounts.

[Initial MongoDB Collections](https://drive.google.com/drive/folders/1NFZPyfMk2B-ei-yXQ1pGFGzNlqxnBh_-?usp=sharing)

The passwords included in the setup files are encrypted. Use the password "admin" for all accounts.
You can change the passwords later from the admin panel.

---

### Client

In one terminal

- cd client
- yarn install
- yarn start

---

### Server

In a separate terminal

- cd server
- yarn install

To start server with nodemon

- yarn dev

To start server without nodemon

- yarn start

nodemon allows for easier testing by automatically restarting
the server any time a change is made to the server files.

---
