'use strict';

import * as React                                from "react";
import * as ReasonReact                          from "../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Log$WonderLog                        from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Css$WonderEditor                     from "../../../external/Css.js";
import * as AppStore$WonderEditor                from "../../store/AppStore.js";
import * as DomHelper$WonderEditor               from "../../../external/DomHelper.js";
import * as FileInput$WonderEditor               from "../fileInput/FileInput.js";
import * as AppExtensionView$WonderEditor        from "../../../logic/view/AppExtensionView.js";
import * as StateHistoryView$WonderEditor        from "../../../logic/view/StateHistoryView.js";
import * as OperateStateUtils$WonderEditor       from "../../../utils/OperateStateUtils.js";
import * as DispatchActionUtils$WonderEditor     from "../../../redux/utils/DispatchActionUtils.js";
import * as MainEditorSceneView$WonderEditor     from "../../../component/mainEditor/logic/view/MainEditorSceneView.js";
import * as SceneGraphDataUtils$WonderEditor     from "../../../utils/SceneGraphDataUtils.js";
import * as MainEditorSceneTreeView$WonderEditor from "../../../component/mainEditor/component/sceneTree/logic/view/MainEditorSceneTreeView.js";

Css$WonderEditor.importCss("./css/header.css");

function getStorageParentKey() {
  return "userExtension";
}

function addExtension(text) {
  return AppExtensionView$WonderEditor.setExtension("userExtension", text);
}

function addBox(store, dispatch, stateTuple) {
  var match = MainEditorSceneView$WonderEditor.addBoxGameObject(stateTuple);
  var newGameObject = match[0];
  return DispatchActionUtils$WonderEditor.dispatchAction(dispatch, (function (stateTuple) {
                return [
                        AppStore$WonderEditor.SceneTreeAction,
                        /* SetSceneGraph */[/* Some */[MainEditorSceneTreeView$WonderEditor.buildSceneGraphDataWithNewGameObject(newGameObject, SceneGraphDataUtils$WonderEditor.unsafeGetSceneGraphDataFromStore(store), stateTuple)]]
                      ];
              }), match[1]);
}

function disposeCurrentGameObject(_, dispatch, stateTuple) {
  var match = MainEditorSceneView$WonderEditor.getCurrentGameObject(stateTuple);
  return DispatchActionUtils$WonderEditor.dispatchAction(dispatch, (function (stateTuple) {
                return [
                        AppStore$WonderEditor.SceneTreeAction,
                        /* SetSceneGraph */[/* Some */[MainEditorSceneTreeView$WonderEditor.getSceneGraphDataFromEngine(stateTuple)]]
                      ];
              }), match ? MainEditorSceneView$WonderEditor.clearCurrentGameObject(MainEditorSceneView$WonderEditor.disposeCurrentGameObject(match[0], stateTuple)) : (Log$WonderLog.error(Log$WonderLog.buildErrorMessage("disposeCurrentGameObject", "current gameObject should exist, but actual is None", "", "set current gameObject", "")), stateTuple));
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
                          return OperateStateUtils$WonderEditor.getAndSetState((function (param) {
                                        return StateHistoryView$WonderEditor.undoHistoryState(store, dispatch, param);
                                      }));
                        })
                    }, DomHelper$WonderEditor.textEl("undo"))), React.createElement("div", {
                  className: "component-item"
                }, React.createElement("button", {
                      onClick: (function () {
                          return OperateStateUtils$WonderEditor.getAndSetState((function (param) {
                                        return StateHistoryView$WonderEditor.redoHistoryState(store, dispatch, param);
                                      }));
                        })
                    }, DomHelper$WonderEditor.textEl("redo"))), React.createElement("div", {
                  className: "component-item"
                }, React.createElement("button", {
                      onClick: (function () {
                          return OperateStateUtils$WonderEditor.getAndSetState((function (param) {
                                        return addBox(store, dispatch, param);
                                      }));
                        })
                    }, DomHelper$WonderEditor.textEl("add box"))), React.createElement("div", {
                  className: "component-item"
                }, React.createElement("button", {
                      onClick: (function () {
                          return OperateStateUtils$WonderEditor.getAndSetState((function (param) {
                                        return disposeCurrentGameObject(store, dispatch, param);
                                      }));
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
