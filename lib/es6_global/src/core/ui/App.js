

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Js_primitive from "../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Css$WonderEditor from "../external/Css.js";
import * as Header$WonderEditor from "../composable_component/header/ui/Header.js";
import * as AppStore$WonderEditor from "./store/AppStore.js";
import * as MainEditor$WonderEditor from "../composable_component/mainEditor/ui/MainEditor.js";
import * as AppExtensionUtils$WonderEditor from "../utils/extension/AppExtensionUtils.js";
import * as ExtensionParseUtils$WonderEditor from "../../extension/config/utils/extension_component/ExtensionParseUtils.js";

import '../../../../../src/core/ui/css/app.css';

function getStorageParentKey() {
  return "userExtension";
}

function addExtension(text) {
  return AppExtensionUtils$WonderEditor.setExtension("userExtension", text);
}

function showComponent(store, dispatchFunc) {
  var value = AppExtensionUtils$WonderEditor.getExtension("userExtension");
  var match = store[/* isEditorAndEngineStart */0];
  return React.createElement("article", {
              key: "app",
              className: "wonder-app-component"
            }, value !== undefined ? ExtensionParseUtils$WonderEditor.extensionPanelComponent("App", value, store) : null, match ? ReasonReact.element(undefined, undefined, Header$WonderEditor.make(store, dispatchFunc, /* array */[])) : null, ReasonReact.element(undefined, undefined, MainEditor$WonderEditor.make(store, dispatchFunc, /* array */[])));
}

var Method = /* module */[
  /* getStorageParentKey */getStorageParentKey,
  /* addExtension */addExtension,
  /* showComponent */showComponent
];

var component = ReasonReact.statelessComponent("App");

function render(param, _) {
  var store = param[0];
  var match = store[/* isDidMounted */1];
  if (match) {
    return showComponent(store, param[1]);
  } else {
    return React.createElement("article", {
                key: "app",
                className: "app-component"
              });
  }
}

function make(store, dispatch, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */(function () {
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
                          store,
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
/*  Not a pure module */

