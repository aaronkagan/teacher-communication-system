<base target="_blank">

# Welcome to ReadMe!

Your premier application for teacher student communication.

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
