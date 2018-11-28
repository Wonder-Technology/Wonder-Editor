

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_obj from "../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Js_option from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as ReasonReact from "../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Canvas$WonderEditor from "../../../atom_component/canvas/Canvas.js";
import * as AppStore$WonderEditor from "../../../ui/store/AppStore.js";
import * as DomHelper$WonderEditor from "../../../external/DomHelper.js";
import * as MainUtils$WonderEditor from "../../../utils/engine/MainUtils.js";
import * as AssetUtils$WonderEditor from "../composable_component/bottom_components/composable_component/project/composable_component/asset/utils/AssetUtils.js";
import * as SceneUtils$WonderEditor from "../../../utils/engine/SceneUtils.js";
import * as AssetTreeUtils$WonderEditor from "../composable_component/bottom_components/composable_component/project/composable_component/asset/composable_component/utils/AssetTreeUtils.js";
import * as SceneGraphUtils$WonderEditor from "../composable_component/left_components/composable_component/sceneTree/utils/SceneGraphUtils.js";
import * as StateLogicService$WonderEditor from "../../../../service/stateTuple/logic/StateLogicService.js";
import * as EventEditorService$WonderEditor from "../../../../service/state/editor/event/EventEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../service/state/engine/StateEngineService.js";
import * as MainEditorInspector$WonderEditor from "../composable_component/inspector/ui/MainEditorInspector.js";
import * as ScreenEngineService$WonderEditor from "../../../../service/state/engine/ScreenEngineService.js";
import * as DirectorEngineService$WonderEditor from "../../../../service/state/engine/DirectorEngineService.js";
import * as GameViewEditorService$WonderEditor from "../../../../service/state/editor/view/gameView/GameViewEditorService.js";
import * as SceneViewEditorService$WonderEditor from "../../../../service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as MainEditorLeftComponents$WonderEditor from "../composable_component/left_components/ui/MainEditorLeftComponents.js";
import * as ManageEventEngineService$WonderEditor from "../../../../service/state/engine/event/ManageEventEngineService.js";
import * as DeviceManagerEngineService$WonderEditor from "../../../../service/state/engine/DeviceManagerEngineService.js";
import * as MainEditorBottomComponents$WonderEditor from "../composable_component/bottom_components/ui/MainEditorBottomComponents.js";
import * as TreeRootAssetEditorService$WonderEditor from "../../../../service/state/editor/asset/TreeRootAssetEditorService.js";
import * as MainEditorDragWDBEventHandler$WonderEditor from "../eventHandler/MainEditorDragWDBEventHandler.js";
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
  var match$1 = Js_option.isSome(DeviceManagerEngineService$WonderEditor.getGl(StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  if (match$1) {
    _updateViewRect(width, height);
    StateEngineService$WonderEditor.setState(DirectorEngineService$WonderEditor.loopBody(0, DeviceManagerEngineService$WonderEditor.setViewport(/* tuple */[
                  0,
                  0,
                  width,
                  height
                ], PerspectiveCameraProjectionEngineService$WonderEditor.markAllPerspectiveCameraProjectionsDirty(StateEngineService$WonderEditor.unsafeGetState(/* () */0)))));
    return /* () */0;
  } else {
    return /* () */0;
  }
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

var dragWDB = MainEditorDragWDBEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var Method = /* module */[
  /* _getCanvasParentSize */_getCanvasParentSize,
  /* _setAllAspectsWhoseAspectBasedOnCanvasSize */_setAllAspectsWhoseAspectBasedOnCanvasSize,
  /* _updateViewRect */_updateViewRect,
  /* resizeCanvasAndViewPort */resizeCanvasAndViewPort,
  /* buildStartedRunWebglComponent */buildStartedRunWebglComponent,
  /* bindRefreshInspectorEvent */bindRefreshInspectorEvent,
  /* dragWDB */dragWDB
];

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditor");

function _buildNotStartElement(store, dispatchFunc) {
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
                        }, ReasonReact.element("webgl", undefined, Canvas$WonderEditor.make("canvas", Curry._2(dragWDB, /* tuple */[
                                      store,
                                      dispatchFunc
                                    ], /* () */0), AssetUtils$WonderEditor.isWDBAssetFile, /* array */[])))), React.createElement("div", {
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
                    }, ReasonReact.element(undefined, undefined, MainEditorLeftComponents$WonderEditor.make(store, dispatchFunc, /* array */[])), React.createElement("div", {
                          key: "webglParent",
                          className: "webgl-parent",
                          id: "canvasParent"
                        }, buildStartedRunWebglComponent(/* () */0), ReasonReact.element("webgl", undefined, Canvas$WonderEditor.make("canvas", Curry._2(dragWDB, /* tuple */[
                                      store,
                                      dispatchFunc
                                    ], /* () */0), AssetUtils$WonderEditor.isWDBAssetFile, /* array */[])))), React.createElement("div", {
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
    return _buildNotStartElement(store, dispatchFunc);
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
                              var match = AssetTreeUtils$WonderEditor.initRootAssetTree(editorState, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                              return TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(match[0], match[1]);
                            }));
                      Curry._1(dispatchFunc, [
                            AppStore$WonderEditor.SceneTreeAction,
                            /* SetSceneGraph */[StateLogicService$WonderEditor.getStateToGetData(SceneGraphUtils$WonderEditor.getSceneGraphDataFromEngine)]
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
