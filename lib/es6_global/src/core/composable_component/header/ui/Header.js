

import * as Block from "../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Css$WonderEditor from "../../../external/Css.js";
import * as Color$WonderEditor from "../../../external/Color.js";
import * as Switch$WonderEditor from "../../../atom_component/switch/Switch.js";
import * as ColorType$WonderEditor from "../../../external/type/ColorType.js";
import * as DomHelper$WonderEditor from "../../../external/DomHelper.js";
import * as FileInput$WonderEditor from "../../../atom_component/fileInput/FileInput.js";
import * as ReactColor$WonderEditor from "../../../external/library/ReactColor.js";
import * as HeaderUtils$WonderEditor from "../utils/HeaderUtils.js";
import * as ControllerUtils$WonderEditor from "../../../utils/controller/ControllerUtils.js";
import * as AllHistoryService$WonderEditor from "../../../../service/stateTuple/history/AllHistoryService.js";
import * as AppExtensionUtils$WonderEditor from "../../../utils/extension/AppExtensionUtils.js";
import * as StateLogicService$WonderEditor from "../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../service/state/editor/SceneEditorService.js";
import * as SceneEngineService$WonderEditor from "../../../../service/state/engine/SceneEngineService.js";
import * as StateHistoryService$WonderEditor from "../../../../service/stateTuple/history/StateHistoryService.js";
import * as HeaderAddGameObjectEventHandler$WonderEditor from "./eventHandler/HeaderAddGameObjectEventHandler.js";
import * as HeaderDisposeGameObjectEventHandler$WonderEditor from "./eventHandler/HeaderDisposeGameObjectEventHandler.js";

Css$WonderEditor.importCss("./css/header.css");

function getStorageParentKey() {
  return "userExtension";
}

function addExtension(text) {
  return AppExtensionUtils$WonderEditor.setExtension("userExtension", text);
}

var addBox = HeaderAddGameObjectEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var disposeCurrentSceneTreeNode = HeaderDisposeGameObjectEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

function buildOperateHistoryComponent(store, dispatchFunc) {
  return React.createElement("div", {
              className: "header-item"
            }, React.createElement("div", {
                  className: "component-item"
                }, React.createElement("button", {
                      onClick: (function () {
                          return StateHistoryService$WonderEditor.getAndRefreshStateForHistory((function (param) {
                                        return AllHistoryService$WonderEditor.undoHistoryState(store, dispatchFunc, param);
                                      }));
                        })
                    }, DomHelper$WonderEditor.textEl("undo"))), React.createElement("div", {
                  className: "component-item"
                }, React.createElement("button", {
                      onClick: (function () {
                          return StateHistoryService$WonderEditor.getAndRefreshStateForHistory((function (param) {
                                        return AllHistoryService$WonderEditor.redoHistoryState(store, dispatchFunc, param);
                                      }));
                        })
                    }, DomHelper$WonderEditor.textEl("redo"))));
}

function buildOperateGameObjectComponent(store, dispatchFunc) {
  return React.createElement("div", {
              className: "header-item"
            }, React.createElement("div", {
                  className: "component-item"
                }, React.createElement("button", {
                      onClick: (function () {
                          return Curry._3(addBox, /* tuple */[
                                      store,
                                      dispatchFunc
                                    ], "box", /* () */0);
                        })
                    }, DomHelper$WonderEditor.textEl("add box"))), React.createElement("div", {
                  className: "component-item"
                }, React.createElement("button", {
                      disabled: HeaderUtils$WonderEditor.isGameObjectNotRemoveable(StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.getCurrentSceneTreeNode)),
                      onClick: (function () {
                          return Curry._3(disposeCurrentSceneTreeNode, /* tuple */[
                                      store,
                                      dispatchFunc
                                    ], /* () */0, /* () */0);
                        })
                    }, DomHelper$WonderEditor.textEl("dispose"))));
}

function buildOperateExtensionComponent() {
  return React.createElement("div", {
              className: "header-item"
            }, React.createElement("div", {
                  className: "component-item"
                }, ReasonReact.element(undefined, undefined, FileInput$WonderEditor.make("show Input", (function (value) {
                            return AppExtensionUtils$WonderEditor.setExtension("userExtension", value);
                          }), /* array */[]))));
}

function buildOperateControllerComponent(store, dispatchFunc) {
  return React.createElement("div", {
              className: "header-item"
            }, React.createElement("div", {
                  className: "component-item"
                }, ReasonReact.element(undefined, undefined, Switch$WonderEditor.make("run", (function (param) {
                            return ControllerUtils$WonderEditor.run(store, param);
                          }), "stop", (function (param) {
                            return ControllerUtils$WonderEditor.stop(dispatchFunc, param);
                          }), StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.getIsRun), /* array */[]))));
}

function changeColor(value) {
  var partial_arg = Color$WonderEditor.getEngineColorRgbArr(ColorType$WonderEditor.convertColorObjToColorPickType(value));
  return StateLogicService$WonderEditor.getAndRefreshEditAndRunEngineState((function (param) {
                return SceneEngineService$WonderEditor.setAmbientLightColor(partial_arg, param);
              }));
}

function buildAmbientLightComponent(state, send) {
  var match = state[/* isShowColorPick */0];
  return React.createElement("div", {
              className: "header-item"
            }, React.createElement("div", {
                  className: "component-item"
                }, React.createElement("span", {
                      className: ""
                    }, DomHelper$WonderEditor.textEl("color : ")), React.createElement("span", {
                      className: ""
                    }, DomHelper$WonderEditor.textEl(state[/* colorHex */1])), React.createElement("button", {
                      className: "",
                      onClick: (function () {
                          return Curry._1(send, /* ToggleShowColorPick */0);
                        })
                    }, DomHelper$WonderEditor.textEl("pick color")), match ? React.createElement("div", {
                        className: "color-pick-item"
                      }, ReasonReact.element(undefined, undefined, ReactColor$WonderEditor.Sketch[/* make */0](state[/* colorHex */1], (function (value, _) {
                                  return changeColor(value);
                                }), /* array */[]))) : null));
}

var Method = /* module */[
  /* getStorageParentKey */getStorageParentKey,
  /* addExtension */addExtension,
  /* addBox */addBox,
  /* disposeCurrentSceneTreeNode */disposeCurrentSceneTreeNode,
  /* buildOperateHistoryComponent */buildOperateHistoryComponent,
  /* buildOperateGameObjectComponent */buildOperateGameObjectComponent,
  /* buildOperateExtensionComponent */buildOperateExtensionComponent,
  /* buildOperateControllerComponent */buildOperateControllerComponent,
  /* changeColor */changeColor,
  /* buildAmbientLightComponent */buildAmbientLightComponent
];

var component = ReasonReact.reducerComponent("Header");

function reducer(_, _$1, state) {
  var match = state[/* isShowColorPick */0];
  if (match) {
    return /* Update */Block.__(0, [/* record */[
                /* isShowColorPick */false,
                /* colorHex */Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getAmbientLightColor))
              ]]);
  } else {
    return /* Update */Block.__(0, [/* record */[
                /* isShowColorPick */true,
                /* colorHex */state[/* colorHex */1]
              ]]);
  }
}

function render(store, dispatchFunc, param) {
  return React.createElement("article", {
              key: "header",
              className: "wonder-header-component"
            }, buildOperateHistoryComponent(store, dispatchFunc), buildOperateGameObjectComponent(store, dispatchFunc), buildOperateExtensionComponent(/* () */0), buildOperateControllerComponent(store, dispatchFunc), buildAmbientLightComponent(param[/* state */1], param[/* send */3]));
}

function make(store, dispatchFunc, _) {
  var partial_arg = /* tuple */[
    store,
    dispatchFunc
  ];
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(store, dispatchFunc, self);
            }),
          /* initialState */(function () {
              return /* record */[
                      /* isShowColorPick */false,
                      /* colorHex */Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getAmbientLightColor))
                    ];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param, param$1) {
              return reducer(partial_arg, param, param$1);
            }),
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  Method ,
  component ,
  reducer ,
  render ,
  make ,
  
}
/*  Not a pure module */
