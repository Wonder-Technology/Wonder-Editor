'use strict';

import * as Curry                             from "../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                             from "react";
import * as ReasonReact                       from "../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Css$WonderEditor                  from "../external/Css.js";
import * as AppStore$WonderEditor             from "./store/AppStore.js";
import * as DomHelper$WonderEditor            from "../external/DomHelper.js";
import * as FileInput$WonderEditor            from "./component/fileInput/FileInput.js";
import * as MainEditor$WonderEditor           from "../component/mainEditor/ui/MainEditor.js";
import * as AppExtensionView$WonderEditor     from "../logic/view/AppExtensionView.js";
import * as StateHistoryView$WonderEditor     from "../logic/view/StateHistoryView.js";
import * as ExtensionParseSystem$WonderEditor from "./extension/data/extension_component/ExtensionParseSystem.js";

Css$WonderEditor.importCss("./css/app.css");

function getStorageParentKey() {
  return "userExtension";
}

function addExtension(text) {
  return AppExtensionView$WonderEditor.setExtension("userExtension", text);
}

var Method = /* module */[
  /* getStorageParentKey */getStorageParentKey,
  /* addExtension */addExtension
];

var component = ReasonReact.statelessComponent("App");

function render(store, dispatch, _) {
  var match = store[/* isDidMounted */1];
  if (match !== 0) {
    var value = AppExtensionView$WonderEditor.getExtension("userExtension");
    return React.createElement("article", {
                key: "app",
                className: "wonder-app-component"
              }, value ? ExtensionParseSystem$WonderEditor.extensionPanelComponent("App", value[0], store) : null, ReasonReact.element(/* None */0, /* None */0, FileInput$WonderEditor.make(/* Some */["show Input"], /* Some */[(function (value) {
                            return AppExtensionView$WonderEditor.setExtension("userExtension", value);
                          })], /* array */[])), React.createElement("button", {
                    onClick: (function () {
                        return StateHistoryView$WonderEditor.undoHistoryState(store, dispatch);
                      })
                  }, DomHelper$WonderEditor.textEl("undo")), React.createElement("button", {
                    onClick: (function () {
                        return StateHistoryView$WonderEditor.redoHistoryState(store, dispatch);
                      })
                  }, DomHelper$WonderEditor.textEl("redo")), ReasonReact.element(/* None */0, /* None */0, MainEditor$WonderEditor.make(store, dispatch, /* array */[])));
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
      var value = AppExtensionView$WonderEditor.getExtension("userExtension");
      if (value) {
        var componentsMap = ExtensionParseSystem$WonderEditor.createComponentMap(value[0]);
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
