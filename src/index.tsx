import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
  *{
  margin:0;
  padding:0; 
  box-sizing: border-box;
  font-family: 'Roboto Slab', serif;
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <Global />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
);
