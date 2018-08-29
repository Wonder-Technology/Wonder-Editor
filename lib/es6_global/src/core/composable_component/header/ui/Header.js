

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Color$WonderEditor from "../../../external/Color.js";
import * as Switch$WonderEditor from "../../../atom_component/switch/Switch.js";
import * as ColorType$WonderEditor from "../../../external/type/ColorType.js";
import * as DomHelper$WonderEditor from "../../../external/DomHelper.js";
import * as FileInput$WonderEditor from "../../../atom_component/fileInput/FileInput.js";
import * as HeaderUtils$WonderEditor from "../utils/HeaderUtils.js";
import * as ControllerUtils$WonderEditor from "../../../utils/controller/ControllerUtils.js";
import * as GameObjectUtils$WonderEditor from "../../../utils/engine/GameObjectUtils.js";
import * as AllHistoryService$WonderEditor from "../../../../service/stateTuple/history/AllHistoryService.js";
import * as AppExtensionUtils$WonderEditor from "../../../utils/extension/AppExtensionUtils.js";
import * as StateLogicService$WonderEditor from "../../../../service/stateTuple/logic/StateLogicService.js";
import * as PickColorComponent$WonderEditor from "../../mainEditor/composable_component/inspector/atom_component/PickColorComponent/ui/PickColorComponent.js";
import * as SceneEditorService$WonderEditor from "../../../../service/state/editor/scene/SceneEditorService.js";
import * as SceneEngineService$WonderEditor from "../../../../service/state/engine/SceneEngineService.js";
import * as StateHistoryService$WonderEditor from "../../../../service/stateTuple/history/StateHistoryService.js";
import * as HeaderAddGameObjectEventHandler$WonderEditor from "../eventHandler/HeaderAddGameObjectEventHandler.js";
import * as HeaderDisposeGameObjectEventHandler$WonderEditor from "../eventHandler/HeaderDisposeGameObjectEventHandler.js";
import * as AmbientLightCloseColorPickEventHandler$WonderEditor from "../eventHandler/AmbientLightCloseColorPickEventHandler.js";

function getStorageParentKey() {
  return "userExtension";
}

function addExtension(text) {
  return AppExtensionUtils$WonderEditor.setExtension("userExtension", text);
}

var addGameObjectByType = HeaderAddGameObjectEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

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
                          return Curry._3(addGameObjectByType, /* tuple */[
                                      store,
                                      dispatchFunc
                                    ], /* Box */0, /* () */0);
                        })
                    }, DomHelper$WonderEditor.textEl("add box"))), React.createElement("div", {
                  className: "component-item"
                }, React.createElement("button", {
                      disabled: GameObjectUtils$WonderEditor.isGameObjectNotRemoveable(StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.getCurrentSceneTreeNode)),
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
  return StateLogicService$WonderEditor.getAndRefreshEditAndRunEngineStateWithFunc((function (param) {
                return SceneEngineService$WonderEditor.setAmbientLightColor(partial_arg, param);
              }));
}

function getColor() {
  return Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getAmbientLightColor));
}

var closeColorPick = AmbientLightCloseColorPickEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1];

function buildAmbientLightComponent(store, dispatchFunc) {
  return React.createElement("div", {
              className: "header-item"
            }, React.createElement("div", {
                  className: "component-item"
                }, ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, PickColorComponent$WonderEditor.make("ambient color : ", getColor, changeColor, Curry._2(closeColorPick, /* tuple */[
                              store,
                              dispatchFunc
                            ], /* () */0), /* array */[]))));
}

function buildEmptyGameObject(store, dispatchFunc) {
  return React.createElement("div", {
              className: "header-item"
            }, React.createElement("div", {
                  className: "component-item"
                }, React.createElement("button", {
                      onClick: (function () {
                          return Curry._3(addGameObjectByType, /* tuple */[
                                      store,
                                      dispatchFunc
                                    ], /* EmptyGameObject */1, /* () */0);
                        })
                    }, DomHelper$WonderEditor.textEl("add empty gameObject"))));
}

function buildUploadWDB(_, dispatchFunc) {
  return React.createElement("div", {
              className: "header-item"
            }, React.createElement("div", {
                  className: "component-item"
                }, React.createElement("input", {
                      className: "file-upload",
                      multiple: false,
                      type: "file",
                      onChange: (function (e) {
                          return HeaderUtils$WonderEditor.loadSceneWDB(dispatchFunc, e);
                        })
                    })));
}

var Method = /* module */[
  /* getStorageParentKey */getStorageParentKey,
  /* addExtension */addExtension,
  /* addGameObjectByType */addGameObjectByType,
  /* disposeCurrentSceneTreeNode */disposeCurrentSceneTreeNode,
  /* buildOperateHistoryComponent */buildOperateHistoryComponent,
  /* buildOperateGameObjectComponent */buildOperateGameObjectComponent,
  /* buildOperateExtensionComponent */buildOperateExtensionComponent,
  /* buildOperateControllerComponent */buildOperateControllerComponent,
  /* changeColor */changeColor,
  /* getColor */getColor,
  /* closeColorPick */closeColorPick,
  /* buildAmbientLightComponent */buildAmbientLightComponent,
  /* buildEmptyGameObject */buildEmptyGameObject,
  /* buildUploadWDB */buildUploadWDB
];

var component = ReasonReact.statelessComponent("Header");

function render(store, dispatchFunc, _) {
  return React.createElement("article", {
              key: "header",
              className: "wonder-header-component"
            }, buildOperateHistoryComponent(store, dispatchFunc), buildOperateGameObjectComponent(store, dispatchFunc), buildOperateExtensionComponent(/* () */0), buildOperateControllerComponent(store, dispatchFunc), buildAmbientLightComponent(store, dispatchFunc), buildEmptyGameObject(store, dispatchFunc), buildUploadWDB(store, dispatchFunc));
}

function make(store, dispatchFunc, _) {
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
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  Method ,
  component ,
  render ,
  make ,
  
}
/* component Not a pure module */
