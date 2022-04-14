import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import {PersistGate} from "redux-persist/integration/react";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import {AuthProvider} from "./Context";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);

serviceWorker.register();

