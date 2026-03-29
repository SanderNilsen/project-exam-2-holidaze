import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #1d4ed8;
    --primary-hover: #1e40af;
    --accent: #0ea5e9;

    --background: #ffffff;
    --background-light: #f8fafc;

    --text: #1e293b;
    --text-muted: #64748b;
    --text-placeholder: #94a3b8;

    --border: #e2e8f0;
  }

  html,
  body,
  #root {
    margin: 0;
    height: 100%;
  }

  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, "Helvetica Neue", Arial, sans-serif;
    background: var(--background-light);
    color: var(--text);
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  a {
    color: inherit;
  }

  img {
    display: block;
    max-width: 100%;
  }

  .app {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
  }
`;

export default GlobalStyle;