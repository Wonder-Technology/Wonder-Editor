

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Css$WonderEditor from "../external/Css.js";
import * as Header$WonderEditor from "../composable_component/header/ui/Header.js";
import * as AppStore$WonderEditor from "./store/AppStore.js";
import * as DomHelper$WonderEditor from "../external/DomHelper.js";
import * as MainEditor$WonderEditor from "../composable_component/mainEditor/ui/MainEditor.js";
import * as AppExtensionUtils$WonderEditor from "../utils/AppExtensionUtils.js";
import * as ExtensionParseUtils$WonderEditor from "../../extension/config/utils/extension_component/ExtensionParseUtils.js";

Css$WonderEditor.importCss("./css/app.css");

function getStorageParentKey() {
  return "userExtension";
}

function addExtension(text) {
  return AppExtensionUtils$WonderEditor.setExtension("userExtension", text);
}

var Method = /* module */[
  /* getStorageParentKey */getStorageParentKey,
  /* addExtension */addExtension
];

var component = ReasonReact.statelessComponent("App");

function render(store, dispatchFunc, _) {
  var match = store[/* isDidMounted */1];
  if (match) {
    var value = AppExtensionUtils$WonderEditor.getExtension("userExtension");
    var match$1 = store[/* isEditorAndEngineStart */0];
    return React.createElement("article", {
                key: "app",
                className: "wonder-app-component"
              }, value ? ExtensionParseUtils$WonderEditor.extensionPanelComponent("App", value[0], store) : null, match$1 ? ReasonReact.element(/* None */0, /* None */0, Header$WonderEditor.make(store, dispatchFunc, /* array */[])) : null, ReasonReact.element(/* None */0, /* None */0, MainEditor$WonderEditor.make(store, dispatchFunc, /* array */[])), React.createElement("div", {
                    className: ""
                  }, DomHelper$WonderEditor.textEl("fck this")));
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
              if (value) {
                var componentsMap = ExtensionParseUtils$WonderEditor.createComponentMap(value[0]);
                Curry._1(dispatch, [
                      AppStore$WonderEditor.MapAction,
                      /* StoreMap */[/* Some */[componentsMap]]
                    ]);
              }
              return Curry._1(dispatch, AppStore$WonderEditor.IsDidMounted);
            }),
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(store, dispatch, self);
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
