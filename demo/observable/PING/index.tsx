import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore} from "redux";
import {createEpicMiddleware} from "redux-observable";
import {pingEpic, pingReducer} from "./reducers/reducer";
import {applyMiddleware} from "redux";
import {Provider} from "react-redux";
import App from "./containers/App";

const epicMiddleware = createEpicMiddleware(pingEpic);
//noinspection TypeScriptValidateTypes
let store = createStore(pingReducer,applyMiddleware(epicMiddleware));
ReactDOM.render(
    <div>
        <Provider store = {store}>
            <App />
        </Provider>
    </div>,
    document.querySelector("#ct")
);
