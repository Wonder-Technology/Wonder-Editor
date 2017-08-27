import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore} from "redux";
import {createEpicMiddleware} from "redux-observable";
import {applyMiddleware} from "redux";
import {Provider} from "react-redux";
import App from "./ui/containers/App";
import {rootReducer} from "./ui/reducer/reducer";
import {rootEpics} from "./ui/epic/epic";

let epicMiddleware = createEpicMiddleware(rootEpics);
let store = createStore(rootReducer,applyMiddleware(epicMiddleware));

ReactDOM.render(
    <div>
        <Provider store = {store}>
            <App />
        </Provider>
    </div>,
    document.querySelector("#ct")
);
