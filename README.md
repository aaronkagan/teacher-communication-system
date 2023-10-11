# Teacher Communication System

ReadMe!&trade; is an application that facilitates communication between teachers and students as well as between teachers and the person in the school office that reads the daily announcements over the loudspeaker.

## Table of contents

- [Overview](#overview)
  - [The problems this solves](#the-problems-this-solves)
  - [The solution](#the-solution)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The problems this solves

1. Teachers lack a centralized way to assign and keep track of homework assignments
2. School announcement readers lack an efficient way to gather all the announcements from all the teachers in the school

### The solution

1. Have a centralized board where teachers can post homework assignments as well as upload files to be downloaded by the students
2. Make it so that students and teachers can leave comments on the assignments in case of further questions and clarifications
3. Aggregate all of the teacher's daily announcements in one location for easy access by the office announcement reader

CONTINUE FROM HERE

### The challenges

Users should be able to:

- Add their email and submit the form
- See a success message with their email after successfully submitting the form
- See form validation messages if:
  - The field is left empty
  - The email address is not formatted correctly
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it.

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Styled Components](https://styled-components.com/) - For styles

**Note: These are just examples. Delete this note and replace the list above with your own choices**

### What I learned

Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

To see how you can add code snippets, see below:

```html
<h1>Some HTML code I'm proud of</h1>
```

```css
.proud-of-this-css {
  color: papayawhip;
}
```

```js
const proudOfThisFunc = () => {
  console.log('🎉');
};
```

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.

**Note: Delete this note and the content within this section and replace with your own learnings.**

### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**

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
