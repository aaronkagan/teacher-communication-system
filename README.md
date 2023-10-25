# Welcome to ReadMe!&trade;

Your premier application for teacher student communication.

# Table of Contents

- [Links](#links)
- [Overview](#overview)
- [Screenshots](#screenshots)
- [Installation Instructions](#installation-instructions)

## Links

[Video demo of ReadMe!](https://vimeo.com/780022696/)

## Overview

Enhancing the teacher-student communication experience has never been easier. ReadMe! introduces a dynamic and versatile platform designed to foster seamless interaction between educators and their students. With a focus on simplicity and efficiency, this project boasts two core components that revolutionize the way teachers and students connect.

**1. Taskboard for Homework Management**

We understand the importance of organized homework assignments. Our taskboard offers teachers an intuitive interface to create and manage homework tasks, ensuring that students have access to clear instructions and due dates. Say goodbye to the confusion of handwritten assignments, as our platform streamlines the process, making it easy for teachers to assign, modify, and track tasks while providing students with a central hub for all their assignments.

**2. Announcements for Effective Communication**

Efficient communication is a cornerstone of a successful educational environment. Our platform enables teachers to create announcements to be broadcasted over the school's loudspeakers, ensuring important messages reach every corner of the campus. The Announcement Reader feature aggregates all teachers' announcements in one convenient location for easy reading and management, ensuring that students and staff stay informed without the hassle of searching through multiple channels.

Our Teacher-Student Communication Project is designed with the needs of both teachers and students in mind, providing a robust and user-friendly platform that simplifies communication, fosters collaboration, and enhances the educational experience. Join us in creating a more connected and productive learning environment.

## Screenshots

Main Feature: Tasks are drag and drop.
![Drag and drop](/screenshots/drag-and-drop.gif)

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
