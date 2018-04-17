'use strict';

import * as Curry                            from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                            from "react";
import * as ReasonReact                      from "../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Css$WonderEditor                 from "../external/Css.js";
import * as Header$WonderEditor              from "../composable_component/header/Header.js";
import * as AppStore$WonderEditor            from "./store/AppStore.js";
import * as MainEditor$WonderEditor          from "../composable_component/mainEditor/ui/MainEditor.js";
import * as AppExtensionUtils$WonderEditor   from "../utils/AppExtensionUtils.js";
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

function render(store, dispatch, _) {
  var match = store[/* isDidMounted */1];
  if (match !== 0) {
    var value = AppExtensionUtils$WonderEditor.getExtension("userExtension");
    var match$1 = store[/* isEditorAndEngineStart */0];
    return React.createElement("article", {
                key: "app",
                className: "wonder-app-component"
              }, value ? ExtensionParseUtils$WonderEditor.extensionPanelComponent("App", value[0], store) : null, match$1 !== 0 ? ReasonReact.element(/* None */0, /* None */0, Header$WonderEditor.make(store, dispatch, /* array */[])) : null, ReasonReact.element(/* None */0, /* None */0, MainEditor$WonderEditor.make(store, dispatch, /* array */[])));
  } else {
    return React.createElement("article", {
                key: "app",
                className: "app-component"
              });
  }
}

function make(store, dispatch, _) {
  var newrecord = component.slice();
  newrecord[/* didMount */4] = (function () {
      var value = AppExtensionUtils$WonderEditor.getExtension("userExtension");
      if (value) {
        var componentsMap = ExtensionParseUtils$WonderEditor.createComponentMap(value[0]);
        Curry._1(dispatch, [
              AppStore$WonderEditor.MapAction,
              /* StoreMap */[/* Some */[componentsMap]]
            ]);
      }
      Curry._1(dispatch, AppStore$WonderEditor.IsDidMounted);
      return /* NoUpdate */0;
    });
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, self);
    });
  return newrecord;
}

export {
  Method    ,
  component ,
  render    ,
  make      ,
  
}
/*  Not a pure module */
