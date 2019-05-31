

import * as React from "react";
import * as ReasonReact from "../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Header$WonderEditor from "../composable_component/header/ui/Header.js";
import * as AppShell$WonderEditor from "../atom_component/appShell/AppShell.js";
import * as Controller$WonderEditor from "../composable_component/controller/ui/Controller.js";
import * as MainEditor$WonderEditor from "../composable_component/mainEditor/ui/MainEditor.js";
import * as Wonder_Console$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Wonder_Console.js";
import * as ServiceWorker$WonderEditor from "../external/ServiceWorker.js";

function showComponent(uiState, dispatchFunc, param) {
  var match = uiState[/* isInitEngine */0];
  return React.createElement("article", {
              key: "app",
              className: "wonder-app-component"
            }, React.createElement("div", {
                  className: "wonder-app-message",
                  id: "appMessage"
                }), match ? React.createElement(React.Fragment, undefined, ReasonReact.element(undefined, undefined, Header$WonderEditor.make(uiState, dispatchFunc, /* array */[])), ReasonReact.element(undefined, undefined, Controller$WonderEditor.make(uiState, dispatchFunc, /* array */[]))) : ReasonReact.element(undefined, undefined, AppShell$WonderEditor.make(/* array */[])), ReasonReact.element(undefined, undefined, MainEditor$WonderEditor.make(uiState, dispatchFunc, /* array */[])));
}

var Method = /* module */[/* showComponent */showComponent];

var component = ReasonReact.statelessComponent("App");

function render(param, self) {
  return showComponent(param[0], param[1], self);
}

function make(uiState, dispatch, _children) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */(function (_self) {
              ServiceWorker$WonderEditor.registerServiceWorker(/* () */0);
              return Wonder_Console$WonderLog.makeObjInToWindow(/* () */0);
            }),
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(/* tuple */[
                          uiState,
                          dispatch
                        ], self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

export {
  Method ,
  component ,
  render ,
  make ,
  
}
/* component Not a pure module */
