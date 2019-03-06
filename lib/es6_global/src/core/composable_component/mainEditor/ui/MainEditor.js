

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_obj from "../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact from "../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Canvas$WonderEditor from "../../../atom_component/canvas/Canvas.js";
import * as AppStore$WonderEditor from "../../../ui/store/AppStore.js";
import * as DomHelper$WonderEditor from "../../../external/DomHelper.js";
import * as MainUtils$WonderEditor from "../../../utils/engine/MainUtils.js";
import * as SceneUtils$WonderEditor from "../../../utils/engine/SceneUtils.js";
import * as EventHelper$WonderEditor from "../../../external/EventHelper.js";
import * as ResizeUtils$WonderEditor from "../../../utils/ui/ResizeUtils.js";
import * as StateLogicService$WonderEditor from "../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../service/state/editor/StateEditorService.js";
import * as MainEditorInspector$WonderEditor from "../composable_component/inspector/ui/MainEditorInspector.js";
import * as GameViewEditorService$WonderEditor from "../../../../service/state/editor/view/gameView/GameViewEditorService.js";
import * as TreeAssetEditorService$WonderEditor from "../../../../service/state/editor/asset/TreeAssetEditorService.js";
import * as MainEditorLeftComponents$WonderEditor from "../composable_component/left_components/ui/MainEditorLeftComponents.js";
import * as WDBNodeAssetEditorService$WonderEditor from "../../../../service/state/editor/asset/WDBNodeAssetEditorService.js";
import * as MainEditorBottomComponents$WonderEditor from "../composable_component/bottom_components/ui/MainEditorBottomComponents.js";
import * as MainEditorDragWDBEventHandler$WonderEditor from "../eventHandler/MainEditorDragWDBEventHandler.js";
import * as GameObjectAllComponentParseUtils$WonderEditor from "../../../config/utils/GameObjectAllComponentParseUtils.js";

function resizeCanvasAndViewPort(param) {
  return ResizeUtils$WonderEditor.resizeScreen(/* () */0);
}

function buildStartedRunWebglComponent(param) {
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

var dragWDB = MainEditorDragWDBEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var Method = /* module */[
  /* resizeCanvasAndViewPort */resizeCanvasAndViewPort,
  /* buildStartedRunWebglComponent */buildStartedRunWebglComponent,
  /* dragWDB */dragWDB
];

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditor");

function _buildNotStartElement(uiState, dispatchFunc) {
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
                                      uiState,
                                      dispatchFunc
                                    ], /* () */0), WDBNodeAssetEditorService$WonderEditor.isWDBAssetFile, /* array */[])))), React.createElement("div", {
                      className: "bottom-widget"
                    })), React.createElement("div", {
                  key: "rightComponent",
                  className: "right-component"
                }));
}

function _buildStartedElement(uiState, dispatchFunc) {
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
                          id: "canvasParent"
                        }, buildStartedRunWebglComponent(/* () */0), ReasonReact.element("webgl", undefined, Canvas$WonderEditor.make("canvas", Curry._2(dragWDB, /* tuple */[
                                      uiState,
                                      dispatchFunc
                                    ], /* () */0), WDBNodeAssetEditorService$WonderEditor.isWDBAssetFile, /* array */[])))), React.createElement("div", {
                      className: "bottom-widget"
                    }, ReasonReact.element(undefined, undefined, MainEditorBottomComponents$WonderEditor.make(uiState, dispatchFunc, /* array */[])))), React.createElement("div", {
                  key: "rightComponent",
                  className: "right-component"
                }, React.createElement("div", {
                      className: "inline-component inspector-parent"
                    }, ReasonReact.element(undefined, undefined, MainEditorInspector$WonderEditor.make(uiState, dispatchFunc, GameObjectAllComponentParseUtils$WonderEditor.getGameObjectAllComponentConfig(/* () */0), /* array */[])))));
}

function render(uiState, dispatchFunc, _self) {
  var match = uiState[/* isEditorAndEngineStart */0];
  if (match) {
    return _buildStartedElement(uiState, dispatchFunc);
  } else {
    return _buildNotStartElement(uiState, dispatchFunc);
  }
}

function make(uiState, dispatchFunc, _children) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */(function (_self) {
              MainUtils$WonderEditor.start(/* () */0).then((function (param) {
                      StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
                              return StateEditorService$WonderEditor.setState(TreeAssetEditorService$WonderEditor.createTree(editorState));
                            }));
                      return Promise.resolve(Curry._1(dispatchFunc, AppStore$WonderEditor.StartEngineAction));
                    }));
              return EventHelper$WonderEditor.onresize(resizeCanvasAndViewPort);
            }),
          /* didUpdate */(function (param) {
              var match = uiState[/* isEditorAndEngineStart */0] && Caml_obj.caml_notequal(param[/* oldSelf */0][/* retainedProps */2], param[/* newSelf */1][/* retainedProps */2]);
              if (match) {
                return ResizeUtils$WonderEditor.resizeScreen(/* () */0);
              } else {
                return /* () */0;
              }
            }),
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(uiState, dispatchFunc, self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps : record */[/* isEngineStart */uiState[/* isEditorAndEngineStart */0]],
          /* reducer */component[/* reducer */12],
          /* jsElementWrapped */component[/* jsElementWrapped */13]
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
