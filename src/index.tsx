import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";
import $api from "./api";
import AuthService from "./services/AuthService";
import { fetchRefreshSuccess } from "./store/auth/userSlice";

const Global = createGlobalStyle`
  *{
  margin:0;
  padding:0; 
  box-sizing: border-box;
  font-family: 'Roboto Slab', serif;
  }
`;

const store = setupStore();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);



root.render(
  <Provider store={store}>
    <Global />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
