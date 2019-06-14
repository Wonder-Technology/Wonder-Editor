

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_obj from "../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact from "../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Canvas$WonderEditor from "../../../atom_component/canvas/Canvas.js";
import * as AppStore$WonderEditor from "../../../ui/store/AppStore.js";
import * as Progress$WonderEditor from "../../../atom_component/progress/Progress.js";
import * as DomHelper$WonderEditor from "../../../external/DomHelper.js";
import * as MainUtils$WonderEditor from "../../../utils/engine/MainUtils.js";
import * as CanvasType$WonderEditor from "../../../external/type/CanvasType.js";
import * as SceneUtils$WonderEditor from "../../../utils/engine/SceneUtils.js";
import * as EventHelper$WonderEditor from "../../../external/EventHelper.js";
import * as ResizeUtils$WonderEditor from "../../../utils/ui/ResizeUtils.js";
import * as StateLogicService$WonderEditor from "../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../service/state/editor/StateEditorService.js";
import * as MainEditorInspector$WonderEditor from "../composable_component/inspector/ui/MainEditorInspector.js";
import * as InspectorCanvasUtils$WonderEditor from "../composable_component/inspector/composable_component/assetTree_Inspector/utils/InspectorCanvasUtils.js";
import * as GameViewEditorService$WonderEditor from "../../../../service/state/editor/view/gameView/GameViewEditorService.js";
import * as TreeAssetEditorService$WonderEditor from "../../../../service/state/editor/asset/TreeAssetEditorService.js";
import * as MainEditorLeftComponents$WonderEditor from "../composable_component/left_components/ui/MainEditorLeftComponents.js";
import * as WDBNodeAssetEditorService$WonderEditor from "../../../../service/state/editor/asset/WDBNodeAssetEditorService.js";
import * as MainEditorBottomComponents$WonderEditor from "../composable_component/bottom_components/ui/MainEditorBottomComponents.js";
import * as MainEditorDragWDBEventHandler$WonderEditor from "../eventHandler/MainEditorDragWDBEventHandler.js";
import * as GameObjectAllComponentParseUtils$WonderEditor from "../../../config/utils/GameObjectAllComponentParseUtils.js";
import * as ImgContextImgCanvasEditorService$WonderEditor from "../../../../service/state/editor/imgCanvas/ImgContextImgCanvasEditorService.js";

function buildNoCameraElement(param) {
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

function execFuncOnlyOnceInDidUpdate(param, func) {
  var match = Caml_obj.caml_notequal(param[/* oldSelf */0][/* retainedProps */2], param[/* newSelf */1][/* retainedProps */2]);
  if (match) {
    return Curry._1(func, /* () */0);
  } else {
    return /* () */0;
  }
}

function didUpdate(oldNewSelf) {
  return execFuncOnlyOnceInDidUpdate(oldNewSelf, (function (param) {
                ResizeUtils$WonderEditor.resizeMainCanvasScreen(/* () */0);
                ResizeUtils$WonderEditor.resizeInspectorCanvasScreen(/* () */0);
                return InspectorCanvasUtils$WonderEditor.hideInspectorCanvas(/* () */0);
              }));
}

var dragWDB = MainEditorDragWDBEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

function buildElementBeforeInitEngine(uiState, dispatchFunc) {
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
                          id: "mainCanvasParent"
                        }, ReasonReact.element("webgl", undefined, Canvas$WonderEditor.make("main-canvas", Curry._2(dragWDB, /* tuple */[
                                      uiState,
                                      dispatchFunc
                                    ], /* () */0), WDBNodeAssetEditorService$WonderEditor.isWDBAssetFile, /* array */[])))), React.createElement("div", {
                      className: "bottom-widget"
                    })), React.createElement("div", {
                  key: "rightComponent",
                  className: "right-component"
                }, React.createElement("div", {
                      className: "inline-component inspector-parent"
                    }, React.createElement("div", {
                          key: "inspectorCanvasParent",
                          className: "inspector-parent",
                          id: "inspectorCanvasParent"
                        }, React.createElement("canvas", {
                              key: "inspectorCanvas",
                              id: "inspector-canvas"
                            })))), React.createElement("canvas", {
                  key: "imgCanvas",
                  id: "img-canvas",
                  height: "50",
                  width: "50"
                }));
}

function buildElementAfterInitEngine(uiState, dispatchFunc) {
  return React.createElement("article", {
              key: "mainEditor",
              className: "wonder-mainEditor-component"
            }, React.createElement("div", {
                  key: "leftComponent",
                  className: "left-component"
                }, React.createElement("div", {
                      className: "top-widget"
                    }, ReasonReact.element(undefined, undefined, MainEditorLeftComponents$WonderEditor.make(uiState, dispatchFunc, /* array */[])), React.createElement("div", {
                          key: "webglParent",
                          className: "webgl-parent",
                          id: "mainCanvasParent"
                        }, buildNoCameraElement(/* () */0), ReasonReact.element("webgl", undefined, Canvas$WonderEditor.make("main-canvas", Curry._2(dragWDB, /* tuple */[
                                      uiState,
                                      dispatchFunc
                                    ], /* () */0), WDBNodeAssetEditorService$WonderEditor.isWDBAssetFile, /* array */[])))), React.createElement("div", {
                      className: "bottom-widget"
                    }, ReasonReact.element(undefined, undefined, MainEditorBottomComponents$WonderEditor.make(uiState, dispatchFunc, /* array */[])))), React.createElement("div", {
                  key: "rightComponent",
                  className: "right-component"
                }, React.createElement("div", {
                      className: "inline-component inspector-parent"
                    }, React.createElement("div", {
                          key: "inspectorCanvasParent",
                          className: "inspector-canvas-parent",
                          id: "inspectorCanvasParent"
                        }, React.createElement("canvas", {
                              key: "inspectorCanvas",
                              id: "inspector-canvas"
                            })), ReasonReact.element(undefined, undefined, MainEditorInspector$WonderEditor.make(uiState, dispatchFunc, GameObjectAllComponentParseUtils$WonderEditor.getGameObjectAllComponentConfig(/* () */0), /* array */[])))), React.createElement("canvas", {
                  key: "imgCanvas",
                  id: "img-canvas",
                  height: "50",
                  width: "50"
                }), ReasonReact.element(undefined, undefined, Progress$WonderEditor.make(/* array */[])));
}

function onResize(domElement) {
  var match = DomHelper$WonderEditor.isDomVisible(domElement);
  if (match) {
    ResizeUtils$WonderEditor.resizeInspectorCanvasScreen(/* () */0);
  }
  return ResizeUtils$WonderEditor.resizeMainCanvasScreen(/* () */0);
}

var Method = /* module */[
  /* buildNoCameraElement */buildNoCameraElement,
  /* execFuncOnlyOnceInDidUpdate */execFuncOnlyOnceInDidUpdate,
  /* didUpdate */didUpdate,
  /* dragWDB */dragWDB,
  /* buildElementBeforeInitEngine */buildElementBeforeInitEngine,
  /* buildElementAfterInitEngine */buildElementAfterInitEngine,
  /* onResize */onResize
];

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditor");

function render(uiState, dispatchFunc, param) {
  var match = param[/* retainedProps */2][/* isInitEngine */0];
  if (match) {
    return buildElementAfterInitEngine(uiState, dispatchFunc);
  } else {
    return buildElementBeforeInitEngine(uiState, dispatchFunc);
  }
}

function make(uiState, dispatchFunc, _children) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */(function (_self) {
              MainUtils$WonderEditor.initEngine(/* () */0).then((function (param) {
                      StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
                              return ImgContextImgCanvasEditorService$WonderEditor.setImgContext(CanvasType$WonderEditor.getCanvasContext(document.getElementById("img-canvas")), TreeAssetEditorService$WonderEditor.createTree(editorState));
                            }));
                      return Promise.resolve(Curry._1(dispatchFunc, AppStore$WonderEditor.InitEngineAction));
                    }));
              return EventHelper$WonderEditor.onresize((function (param) {
                            return onResize(document.getElementById("inspectorCanvasParent"));
                          }));
            }),
          /* didUpdate */didUpdate,
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(uiState, dispatchFunc, self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps : record */[/* isInitEngine */uiState[/* isInitEngine */0]],
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
