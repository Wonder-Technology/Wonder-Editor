

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ReasonReact from "../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Header$WonderEditor from "../composable_component/header/ui/Header.js";
import * as AppStore$WonderEditor from "./store/AppStore.js";
import * as Controller$WonderEditor from "../composable_component/controller/ui/Controller.js";
import * as MainEditor$WonderEditor from "../composable_component/mainEditor/ui/MainEditor.js";
import * as Wonder_Console$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Wonder_Console.js";
import * as ServiceWorker$WonderEditor from "../external/ServiceWorker.js";
import * as AppExtensionUtils$WonderEditor from "../utils/extension/AppExtensionUtils.js";
import * as ExtensionParseUtils$WonderEditor from "../../extension/config/utils/extension_component/ExtensionParseUtils.js";

function getStorageParentKey(param) {
  return "userExtension";
}

function addExtension(text) {
  return AppExtensionUtils$WonderEditor.setExtension("userExtension", text);
}

function showComponent(uiState, dispatchFunc, param) {
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

function render(param, self) {
  var uiState = param[0];
  var match = uiState[/* isDidMounted */1];
  if (match) {
    return showComponent(uiState, param[1], self);
  } else {
    return React.createElement("article", {
                key: "app",
                className: "app-component"
              });
  }
}

function make(uiState, dispatch, _children) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */(function (_self) {
              ServiceWorker$WonderEditor.registerServiceWorker(/* () */0);
              Wonder_Console$WonderLog.makeObjInToWindow(/* () */0);
              var value = AppExtensionUtils$WonderEditor.getExtension("userExtension");
              if (value !== undefined) {
                var componentsMap = ExtensionParseUtils$WonderEditor.createComponentMap(value);
                Curry._1(dispatch, [
                      AppStore$WonderEditor.MapAction,
                      /* StoreMap */[Caml_option.some(componentsMap)]
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
