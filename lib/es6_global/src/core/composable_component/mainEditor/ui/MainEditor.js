

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_obj from "../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact from "../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as AppStore$WonderEditor from "../../../ui/store/AppStore.js";
import * as DomHelper$WonderEditor from "../../../external/DomHelper.js";
import * as MainUtils$WonderEditor from "../../../utils/engine/MainUtils.js";
import * as SceneTreeUtils$WonderEditor from "../composable_component/sceneTree/utils/SceneTreeUtils.js";
import * as StateLogicService$WonderEditor from "../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetTreeNodeUtils$WonderEditor from "../composable_component/bottom_components/asset/utils/AssetTreeNodeUtils.js";
import * as MainEditorInspector$WonderEditor from "../composable_component/inspector/ui/MainEditorInspector.js";
import * as MainEditorSceneTree$WonderEditor from "../composable_component/sceneTree/ui/MainEditorSceneTree.js";
import * as ScreenEngineService$WonderEditor from "../../../../service/state/engine/ScreenEngineService.js";
import * as DirectorEngineService$WonderEditor from "../../../../service/state/engine/DirectorEngineService.js";
import * as ManageIMGUIEngineService$WonderEditor from "../../../../service/state/engine/ManageIMGUIEngineService.js";
import * as AssetTreeRootEditorService$WonderEditor from "../../../../service/state/editor/asset/AssetTreeRootEditorService.js";
import * as DeviceManagerEngineService$WonderEditor from "../../../../service/state/engine/DeviceManagerEngineService.js";
import * as MainEditorBottomComponents$WonderEditor from "../composable_component/bottom_components/ui/MainEditorBottomComponents.js";
import * as GameObjectAllComponentParseUtils$WonderEditor from "../../../config/utils/GameObjectAllComponentParseUtils.js";

function _getCanvasParentSize(parent) {
  return /* tuple */[
          parent.offsetWidth,
          parent.offsetHeight
        ];
}

function _setViewportAndRefresh(param, engineState) {
  return DeviceManagerEngineService$WonderEditor.setViewport(/* tuple */[
              0,
              0,
              param[0],
              param[1]
            ], engineState);
}

function _setViewportAndSendUniformProjectionMatDataAndRefresh(param, engineState) {
  var canvasHeight = param[1];
  var canvasWidth = param[0];
  return ManageIMGUIEngineService$WonderEditor.sendUniformProjectionMatData(DeviceManagerEngineService$WonderEditor.unsafeGetGl(engineState), /* tuple */[
              canvasWidth,
              canvasHeight
            ], DeviceManagerEngineService$WonderEditor.setViewport(/* tuple */[
                  0,
                  0,
                  canvasWidth,
                  canvasHeight
                ], engineState));
}

function resizeCanvasAndViewPort() {
  var match = _getCanvasParentSize(document.getElementById("editCanvasParent"));
  var height = match[1];
  var width = match[0];
  ScreenEngineService$WonderEditor.setScreenSize(/* tuple */[
        width,
        height,
        width,
        height
      ], document.getElementById("editCanvas"));
  ScreenEngineService$WonderEditor.setScreenSize(/* tuple */[
        width,
        height,
        width,
        height
      ], document.getElementById("runCanvas"));
  StateLogicService$WonderEditor.setEditEngineState(DirectorEngineService$WonderEditor.loopBody(0, _setViewportAndSendUniformProjectionMatDataAndRefresh(/* tuple */[
                width,
                height
              ], StateLogicService$WonderEditor.getEditEngineState(/* () */0))));
  return StateLogicService$WonderEditor.setRunEngineState(DirectorEngineService$WonderEditor.loopBody(0, _setViewportAndRefresh(/* tuple */[
                      width,
                      height
                    ], StateLogicService$WonderEditor.getRunEngineState(/* () */0))));
}

var Method = /* module */[
  /* _getCanvasParentSize */_getCanvasParentSize,
  /* _setViewportAndRefresh */_setViewportAndRefresh,
  /* _setViewportAndSendUniformProjectionMatDataAndRefresh */_setViewportAndSendUniformProjectionMatDataAndRefresh,
  /* resizeCanvasAndViewPort */resizeCanvasAndViewPort
];

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditor");

function _buildNotStartElement() {
  return React.createElement("article", {
              key: "mainEditor",
              className: "wonder-mainEditor-component"
            }, React.createElement("div", {
                  key: "leftComponent",
                  className: "left-component"
                }, React.createElement("div", {
                      className: "top-widget"
                    }, React.createElement("div", {
                          key: "webglParent",
                          className: "webgl-parent",
                          id: "editCanvasParent"
                        }, React.createElement("canvas", {
                              key: "editWebgl",
                              id: "editCanvas"
                            })), React.createElement("div", {
                          key: "webglRun",
                          className: "webgl-parent"
                        }, React.createElement("canvas", {
                              key: "runWebgl",
                              id: "runCanvas"
                            }))), React.createElement("div", {
                      className: "bottom-widget"
                    })), React.createElement("div", {
                  key: "rightComponent",
                  className: "right-component"
                }));
}

function _buildStartedElement(store, dispatchFunc, _, _$1) {
  return React.createElement("article", {
              key: "mainEditor",
              className: "wonder-mainEditor-component"
            }, React.createElement("div", {
                  key: "leftComponent",
                  className: "left-component"
                }, React.createElement("div", {
                      className: "top-widget"
                    }, React.createElement("div", {
                          className: "inline-component sceneTree-parent"
                        }, ReasonReact.element(undefined, undefined, MainEditorSceneTree$WonderEditor.make(store, dispatchFunc, /* array */[]))), React.createElement("div", {
                          key: "webglParent",
                          className: "webgl-parent",
                          id: "editCanvasParent"
                        }, React.createElement("canvas", {
                              key: "editWebgl",
                              id: "editCanvas"
                            })), React.createElement("div", {
                          key: "webglRun",
                          className: "webgl-parent"
                        }, React.createElement("canvas", {
                              key: "runWebgl",
                              id: "runCanvas"
                            }))), React.createElement("div", {
                      className: "bottom-widget"
                    }, ReasonReact.element(undefined, undefined, MainEditorBottomComponents$WonderEditor.make(store, dispatchFunc, /* array */[])))), React.createElement("div", {
                  key: "rightComponent",
                  className: "right-component"
                }, React.createElement("div", {
                      className: "inline-component inspector-parent"
                    }, ReasonReact.element(undefined, undefined, MainEditorInspector$WonderEditor.make(store, dispatchFunc, GameObjectAllComponentParseUtils$WonderEditor.getGameObjectAllComponentConfig(/* () */0), /* array */[])))));
}

function render(store, dispatchFunc, param) {
  var match = store[/* isEditorAndEngineStart */0];
  if (match) {
    return _buildStartedElement(store, dispatchFunc, param[/* state */1], param[/* send */3]);
  } else {
    return _buildNotStartElement(/* () */0);
  }
}

function make(store, dispatchFunc, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */(function () {
              MainUtils$WonderEditor.start(/* () */0).then((function () {
                      StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
                              var match = AssetTreeNodeUtils$WonderEditor.initRootAssetTree(editorState);
                              return AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(match[0], match[1]);
                            }));
                      Curry._1(dispatchFunc, [
                            AppStore$WonderEditor.SceneTreeAction,
                            /* SetSceneGraph */[StateLogicService$WonderEditor.getStateToGetData(SceneTreeUtils$WonderEditor.getSceneGraphDataFromEngine)]
                          ]);
                      return Promise.resolve(Curry._1(dispatchFunc, AppStore$WonderEditor.StartEngineAction));
                    }));
              return DomHelper$WonderEditor.onresize(resizeCanvasAndViewPort);
            }),
          /* didUpdate */(function (param) {
              var match = store[/* isEditorAndEngineStart */0] && Caml_obj.caml_notequal(param[/* oldSelf */0][/* retainedProps */2], param[/* newSelf */1][/* retainedProps */2]);
              if (match) {
                return resizeCanvasAndViewPort(/* () */0);
              } else {
                return /* () */0;
              }
            }),
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(store, dispatchFunc, self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps : record */[/* isEngineStart */store[/* isEditorAndEngineStart */0]],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  Method ,
  component ,
  _buildNotStartElement ,
  _buildStartedElement ,
  render ,
  make ,
  
}
/* component Not a pure module */
