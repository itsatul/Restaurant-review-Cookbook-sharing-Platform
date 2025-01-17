import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body {
        width: 100vw;
        height: 100%;
        font-family: 'Roboto', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #4C4C4C;
    }

    #root {
        height: 100%;
        min-height: 100vh;
    }

    main {
        background-color: #F8F8F8
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    input,
    button,
    textarea {
        border: none;
        font-size: inherit;
        font-family: inherit;
        background-color: inherit;
        color: inherit;
        cursor: pointer;
    }

    input:focus {
        outline: none;
    }

    li {
        list-style: none
    }
`;

export default GlobalStyle;
