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

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    console.log(error.response.status);
    if (error.response.status === 401 && originalRequest && !error.config._isRetry) {
      try {
        const response = await AuthService.refresh();
        store.dispatch(fetchRefreshSuccess(response.data));
        error.config._isRetry = true
        $api.request(originalRequest);
        
      } catch (e) {
        console.log(e)
      }
    }
    throw error;
  }
);

root.render(
  <Provider store={store}>
    <Global />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
