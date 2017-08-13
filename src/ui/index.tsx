import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore} from "redux";
import {createEpicMiddleware} from "redux-observable";
import {applyMiddleware} from "redux";
import {Provider} from "react-redux";
import App from "./containers/App";
import {rootReducer} from "./reducer/reducer";
import {postsEpic} from "../mainEditor/ui/reducer/reducer";

let epicMiddleware = createEpicMiddleware(postsEpic);
let store = createStore(rootReducer,applyMiddleware(epicMiddleware));

ReactDOM.render(
    <div>
        <Provider store = {store}>
            <App />
        </Provider>
    </div>,
    document.querySelector("#ct")
);
