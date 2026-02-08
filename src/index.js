import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from "./styles/GlobalStyle";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
      <GlobalStyle />
      <App />
  </BrowserRouter>
);