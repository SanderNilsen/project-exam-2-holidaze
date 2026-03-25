import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
      }

  .app {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
  }
`;

export default GlobalStyle;