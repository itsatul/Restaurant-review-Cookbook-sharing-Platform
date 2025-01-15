import {createRoot} from "react-dom/client";
import App from "./App.jsx";
import {Provider} from "react-redux";
import store from "./store/index.js"
import GlobalStyle from "./styles/globalStyles.js";
import {StrictMode} from "react";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <GlobalStyle/>
        <Provider store={store}>
            <App/>
        </Provider>
    </StrictMode>
);
