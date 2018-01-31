'use strict';

import * as Curry                            from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                            from "react";
import * as ReasonReact                      from "../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Log$WonderLog                    from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Css$WonderEditor                 from "../../../external/Css.js";
import * as AppStore$WonderEditor            from "../../store/AppStore.js";
import * as DomHelper$WonderEditor           from "../../../external/DomHelper.js";
import * as FileInput$WonderEditor           from "../fileInput/FileInput.js";
import * as AppExtensionView$WonderEditor    from "../../../logic/view/AppExtensionView.js";
import * as StateHistoryView$WonderEditor    from "../../../logic/view/StateHistoryView.js";
import * as MainEditorSceneView$WonderEditor from "../../../component/mainEditor/logic/view/MainEditorSceneView.js";
import * as MainEditorStateView$WonderEditor from "../../../component/mainEditor/logic/view/MainEditorStateView.js";
import * as SceneGraphDataUtils$WonderEditor from "../../../utils/SceneGraphDataUtils.js";

Css$WonderEditor.importCss("./css/header.css");

function getStorageParentKey() {
  return "userExtension";
}

function addExtension(text) {
  return AppExtensionView$WonderEditor.setExtension("userExtension", text);
}

function addBox(dispatch) {
  MainEditorStateView$WonderEditor.finishState(MainEditorSceneView$WonderEditor.addBoxGameObject(MainEditorStateView$WonderEditor.prepareState(/* () */0)));
  return Curry._1(dispatch, [
              AppStore$WonderEditor.SceneTreeAction,
              /* SetSceneGraph */[/* Some */[SceneGraphDataUtils$WonderEditor.getSceneGraphFromEngine(/* () */0)]]
            ]);
}

function disposeCurrentGameObject(dispatch) {
  var match = MainEditorSceneView$WonderEditor.getCurrentGameObject(MainEditorStateView$WonderEditor.prepareState(/* () */0));
  if (match) {
    MainEditorStateView$WonderEditor.finishState(MainEditorSceneView$WonderEditor.clearCurrentGameObject(MainEditorSceneView$WonderEditor.disposeCurrentGameObject(match[0], MainEditorStateView$WonderEditor.prepareState(/* () */0))));
  } else {
    Log$WonderLog.error(Log$WonderLog.buildErrorMessage("disposeCurrentGameObject", "current gameObject is None", "", "should set current gameObject", ""));
  }
  return Curry._1(dispatch, [
              AppStore$WonderEditor.SceneTreeAction,
              /* SetSceneGraph */[/* Some */[SceneGraphDataUtils$WonderEditor.getSceneGraphFromEngine(/* () */0)]]
            ]);
}

var Method = /* module */[
  /* getStorageParentKey */getStorageParentKey,
  /* addExtension */addExtension,
  /* addBox */addBox,
  /* disposeCurrentGameObject */disposeCurrentGameObject
];

var component = ReasonReact.statelessComponent("Header");

function render(store, dispatch, _) {
  return React.createElement("article", {
              key: "header",
              className: "header-component"
            }, React.createElement("div", {
                  className: "component-item"
                }, React.createElement("button", {
                      onClick: (function () {
                          return StateHistoryView$WonderEditor.undoHistoryState(store, dispatch);
                        })
                    }, DomHelper$WonderEditor.textEl("undo"))), React.createElement("div", {
                  className: "component-item"
                }, React.createElement("button", {
                      onClick: (function () {
                          return StateHistoryView$WonderEditor.redoHistoryState(store, dispatch);
                        })
                    }, DomHelper$WonderEditor.textEl("redo"))), React.createElement("div", {
                  className: "component-item"
                }, React.createElement("button", {
                      onClick: (function () {
                          return addBox(dispatch);
                        })
                    }, DomHelper$WonderEditor.textEl("add box"))), React.createElement("div", {
                  className: "component-item"
                }, React.createElement("button", {
                      onClick: (function () {
                          return disposeCurrentGameObject(dispatch);
                        })
                    }, DomHelper$WonderEditor.textEl("dispose"))), React.createElement("div", {
                  className: "component-item"
                }, ReasonReact.element(/* None */0, /* None */0, FileInput$WonderEditor.make(/* Some */["show Input"], /* Some */[(function (value) {
                              return AppExtensionView$WonderEditor.setExtension("userExtension", value);
                            })], /* array */[]))));
}

function make(store, dispatch, _) {
  var newrecord = component.slice();
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
