import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    :root {
      --primary-color: #727272;
      --secondary-color: lightGray;
      --disabled-color: lightGray;
      --success-color: lightGreen;
      --cancel-color: lightPink;
      --edit-color: #0000ffab;
      --page-horizontal-padding: 20px;
      --header-height: 50px;
      --max-content-width: 1200px;
      --font-family: sans-serif;
      --heading-font-family: 'ariel', sans-serif;
    }

    /* Box sizing rules */
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    * {
      font-family: sans-serif
    }
    
    
    html, body, div, span,
    h1, h2, h3, h4, h5, h6, p,  img, 
     ol, ul, li, form, label,
    footer, header,
    menu, nav,  section
     {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
        box-sizing: border-box;
    }

    /* Set core root defaults */
    html:focus-within {
    scroll-behavior: smooth;
    }

    /* Set core body defaults */
    body {
     min-height: 100vh;
     text-rendering: optimizeSpeed;
     line-height: 1.5;
    }


    /* A elements that don't have a class get default styles */
    a:not([class]) {
    text-decoration-skip-ink: auto;
    }

    /* Make images easier to work with */
    img,
    picture {
    max-width: 100%;
    display: block;
    }

    /* Inherit fonts for inputs and buttons */
    input,
    button,
    textarea,
    select {
    font: inherit;
    }

    
    button {
      border: 0;
      border-radius: 2px;
      &:hover {
        cursor: pointer;
      }
      &:active {
        transform: scale(0.95);
      }
      &:disabled {
        background-color: var(--disabled-color);
      }
    }
    `;
