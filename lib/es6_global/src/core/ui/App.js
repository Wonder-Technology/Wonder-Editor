

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Js_primitive from "../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Header$WonderEditor from "../composable_component/header/ui/Header.js";
import * as AppStore$WonderEditor from "./store/AppStore.js";
import * as Controller$WonderEditor from "../composable_component/controller/ui/Controller.js";
import * as MainEditor$WonderEditor from "../composable_component/mainEditor/ui/MainEditor.js";
import * as Wonder_Console$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Wonder_Console.js";
import * as AppExtensionUtils$WonderEditor from "../utils/extension/AppExtensionUtils.js";
import * as ExtensionParseUtils$WonderEditor from "../../extension/config/utils/extension_component/ExtensionParseUtils.js";

function getStorageParentKey() {
  return "userExtension";
}

function addExtension(text) {
  return AppExtensionUtils$WonderEditor.setExtension("userExtension", text);
}

function showComponent(uiState, dispatchFunc) {
  var value = AppExtensionUtils$WonderEditor.getExtension("userExtension");
  var match = uiState[/* isEditorAndEngineStart */0];
  var match$1 = uiState[/* isEditorAndEngineStart */0];
  return React.createElement("article", {
              key: "app",
              className: "wonder-app-component"
            }, value !== undefined ? ExtensionParseUtils$WonderEditor.extensionPanelComponent("App", value, uiState) : null, match ? ReasonReact.element(undefined, undefined, Header$WonderEditor.make(uiState, dispatchFunc, /* array */[])) : null, match$1 ? ReasonReact.element(undefined, undefined, Controller$WonderEditor.make(uiState, dispatchFunc, /* array */[])) : null, ReasonReact.element(undefined, undefined, MainEditor$WonderEditor.make(uiState, dispatchFunc, /* array */[])));
}

var Method = /* module */[
  /* getStorageParentKey */getStorageParentKey,
  /* addExtension */addExtension,
  /* showComponent */showComponent
];

var component = ReasonReact.statelessComponent("App");

function render(param, _) {
  var uiState = param[0];
  var match = uiState[/* isDidMounted */1];
  if (match) {
    return showComponent(uiState, param[1]);
  } else {
    return React.createElement("article", {
                key: "app",
                className: "app-component"
              });
  }
}

function make(uiState, dispatch, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */(function () {
              Curry._1(Wonder_Console$WonderLog.makeObjInToWindow, /* () */0);
              var value = AppExtensionUtils$WonderEditor.getExtension("userExtension");
              if (value !== undefined) {
                var componentsMap = ExtensionParseUtils$WonderEditor.createComponentMap(value);
                Curry._1(dispatch, [
                      AppStore$WonderEditor.MapAction,
                      /* StoreMap */[Js_primitive.some(componentsMap)]
                    ]);
              }
              return Curry._1(dispatch, AppStore$WonderEditor.IsDidMounted);
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
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  Method ,
  component ,
  render ,
  make ,
  
}
/* component Not a pure module */
