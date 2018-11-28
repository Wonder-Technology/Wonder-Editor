

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_obj from "../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact from "../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as AppStore$WonderEditor from "../../../ui/store/AppStore.js";
import * as DomHelper$WonderEditor from "../../../external/DomHelper.js";
import * as MainUtils$WonderEditor from "../../../utils/engine/MainUtils.js";
import * as SceneUtils$WonderEditor from "../../../utils/engine/SceneUtils.js";
import * as SceneTreeUtils$WonderEditor from "../composable_component/sceneTree/utils/SceneTreeUtils.js";
import * as StateLogicService$WonderEditor from "../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetTreeNodeUtils$WonderEditor from "../composable_component/bottom_components/asset/utils/AssetTreeNodeUtils.js";
import * as EventEditorService$WonderEditor from "../../../../service/state/editor/event/EventEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../service/state/engine/StateEngineService.js";
import * as MainEditorInspector$WonderEditor from "../composable_component/inspector/ui/MainEditorInspector.js";
import * as MainEditorSceneTree$WonderEditor from "../composable_component/sceneTree/ui/MainEditorSceneTree.js";
import * as ScreenEngineService$WonderEditor from "../../../../service/state/engine/ScreenEngineService.js";
import * as DirectorEngineService$WonderEditor from "../../../../service/state/engine/DirectorEngineService.js";
import * as GameViewEditorService$WonderEditor from "../../../../service/state/editor/gameView/GameViewEditorService.js";
import * as SceneViewEditorService$WonderEditor from "../../../../service/state/editor/sceneView/SceneViewEditorService.js";
import * as ManageEventEngineService$WonderEditor from "../../../../service/state/engine/event/ManageEventEngineService.js";
import * as MainEditorSceneTreeHeader$WonderEditor from "../composable_component/sceneTree/atom_component/header/MainEditorSceneTreeHeader.js";
import * as AssetTreeRootEditorService$WonderEditor from "../../../../service/state/editor/asset/AssetTreeRootEditorService.js";
import * as DeviceManagerEngineService$WonderEditor from "../../../../service/state/engine/DeviceManagerEngineService.js";
import * as MainEditorBottomComponents$WonderEditor from "../composable_component/bottom_components/ui/MainEditorBottomComponents.js";
import * as GameObjectAllComponentParseUtils$WonderEditor from "../../../config/utils/GameObjectAllComponentParseUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../service/state/engine/GameObjectComponentEngineService.js";
import * as PerspectiveCameraProjectionEngineService$WonderEditor from "../../../../service/state/engine/camera/PerspectiveCameraProjectionEngineService.js";

function _getCanvasParentSize(parent) {
  return /* tuple */[
          parent.offsetWidth,
          parent.offsetHeight
        ];
}

var _setAllAspectsWhoseAspectBasedOnCanvasSize = GameObjectComponentEngineService$WonderEditor.getAllPerspectiveCameraProjectionComponents;

function _updateViewRect(canvasWidth, canvasHeight) {
  return StateEditorService$WonderEditor.setState(GameViewEditorService$WonderEditor.updateViewRect(canvasWidth / 2 | 0, 0, canvasWidth / 2 | 0, canvasHeight, SceneViewEditorService$WonderEditor.updateViewRect(0, 0, canvasWidth / 2 | 0, canvasHeight, StateEditorService$WonderEditor.getState(/* () */0))));
}

function resizeCanvasAndViewPort() {
  var match = _getCanvasParentSize(document.getElementById("canvasParent"));
  var height = match[1];
  var width = match[0];
  ScreenEngineService$WonderEditor.setScreenSize(/* tuple */[
        width,
        height,
        width,
        height
      ], document.getElementById("canvas"));
  _updateViewRect(width, height);
  StateEngineService$WonderEditor.setState(DirectorEngineService$WonderEditor.loopBody(0, DeviceManagerEngineService$WonderEditor.setViewport(/* tuple */[
                0,
                0,
                width,
                height
              ], PerspectiveCameraProjectionEngineService$WonderEditor.markAllPerspectiveCameraProjectionsDirty(StateEngineService$WonderEditor.unsafeGetState(/* () */0)))));
  return /* () */0;
}

function buildStartedRunWebglComponent() {
  var match = SceneUtils$WonderEditor.isSceneHaveNoActiveCamera(/* () */0);
  if (match) {
    var match$1 = GameViewEditorService$WonderEditor.getViewRect(StateEditorService$WonderEditor.getState(/* () */0));
    if (match$1 !== undefined) {
      return React.createElement("div", {
                  className: "gameViewNoCamera"
                }, React.createElement("span", {
                      className: "gameViewNoCamera-text"
                    }, DomHelper$WonderEditor.textEl("No Camera !")));
    } else {
      return null;
    }
  } else {
    return null;
  }
}

function bindRefreshInspectorEvent(dispatchFunc) {
  StateEngineService$WonderEditor.setState(ManageEventEngineService$WonderEditor.onCustomGlobalEvent(EventEditorService$WonderEditor.getRefreshInspectorEventName(/* () */0), (function ($$event, engineState) {
              Curry._1(dispatchFunc, [
                    AppStore$WonderEditor.UpdateAction,
                    /* Update */[/* array */[/* Inspector */2]]
                  ]);
              return /* tuple */[
                      engineState,
                      $$event
                    ];
            }), StateEngineService$WonderEditor.unsafeGetState(/* () */0), undefined, /* () */0));
  return /* () */0;
}

var Method = /* module */[
  /* _getCanvasParentSize */_getCanvasParentSize,
  /* _setAllAspectsWhoseAspectBasedOnCanvasSize */_setAllAspectsWhoseAspectBasedOnCanvasSize,
  /* _updateViewRect */_updateViewRect,
  /* resizeCanvasAndViewPort */resizeCanvasAndViewPort,
  /* buildStartedRunWebglComponent */buildStartedRunWebglComponent,
  /* bindRefreshInspectorEvent */bindRefreshInspectorEvent
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
                          id: "canvasParent"
                        }, React.createElement("canvas", {
                              key: "webgl",
                              id: "canvas"
                            }))), React.createElement("div", {
                      className: "bottom-widget"
                    })), React.createElement("div", {
                  key: "rightComponent",
                  className: "right-component"
                }));
}

function _buildStartedElement(store, dispatchFunc) {
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
                        }, ReasonReact.element(undefined, undefined, MainEditorSceneTreeHeader$WonderEditor.make(store, dispatchFunc, /* array */[])), ReasonReact.element(undefined, undefined, MainEditorSceneTree$WonderEditor.make(store, dispatchFunc, /* array */[]))), React.createElement("div", {
                          key: "webglParent",
                          className: "webgl-parent",
                          id: "canvasParent"
                        }, buildStartedRunWebglComponent(/* () */0), React.createElement("canvas", {
                              key: "webgl",
                              id: "canvas"
                            }))), React.createElement("div", {
                      className: "bottom-widget"
                    }, ReasonReact.element(undefined, undefined, MainEditorBottomComponents$WonderEditor.make(store, dispatchFunc, /* array */[])))), React.createElement("div", {
                  key: "rightComponent",
                  className: "right-component"
                }, React.createElement("div", {
                      className: "inline-component inspector-parent"
                    }, ReasonReact.element(undefined, undefined, MainEditorInspector$WonderEditor.make(store, dispatchFunc, GameObjectAllComponentParseUtils$WonderEditor.getGameObjectAllComponentConfig(/* () */0), /* array */[])))));
}

function render(store, dispatchFunc, _) {
  var match = store[/* isEditorAndEngineStart */0];
  if (match) {
    return _buildStartedElement(store, dispatchFunc);
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
              bindRefreshInspectorEvent(dispatchFunc);
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
