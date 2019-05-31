

import * as Block from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../../../external/DomHelper.js";
import * as ArrayService$WonderEditor from "../../../../../../../../../../../../service/atom/ArrayService.js";
import * as LanguageUtils$WonderEditor from "../../../../../../../../../../../utils/language/LanguageUtils.js";
import * as OptionService$WonderEditor from "../../../../../../../../../../../../service/primitive/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as ScriptEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/script/ScriptEngineService.js";
import * as SelectAssetGroupBar$WonderEditor from "../../../../../../../../../../../atom_component/selectAssetGroup/SelectAssetGroupBar.js";
import * as LanguageEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/LanguageEditorService.js";
import * as MainEditorScriptUtils$WonderEditor from "../../../utils/MainEditorScriptUtils.js";
import * as SelectAssetGroupWidget$WonderEditor from "../../../../../../../../../../../atom_component/selectAssetGroup/SelectAssetGroupWidget.js";
import * as OperateTreeAssetLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/asset/OperateTreeAssetLogicService.js";
import * as MainEditorScriptEventFunctionUtils$WonderEditor from "../utils/MainEditorScriptEventFunctionUtils.js";
import * as ScriptAddScriptEventFunctionEventHandler$WonderEditor from "../eventHandler/ScriptAddScriptEventFunctionEventHandler.js";
import * as ScriptChangeScriptEventFunctionEventHandler$WonderEditor from "../eventHandler/ScriptChangeScriptEventFunctionEventHandler.js";
import * as ScriptRemoveScriptEventFunctionEventHandler$WonderEditor from "../eventHandler/ScriptRemoveScriptEventFunctionEventHandler.js";

function _sendShowScriptEventFunctionGroupForChange(currentScript, scriptEventFunctionNodeId, send, param) {
  return Curry._1(send, /* ShowScriptEventFunctionGroupForChange */Block.__(3, [
                scriptEventFunctionNodeId,
                MainEditorScriptEventFunctionUtils$WonderEditor.getUnUsedScriptEventFunctionNodeIds(currentScript, /* tuple */[
                      param[0],
                      param[1]
                    ])
              ]));
}

var _removeScriptEventFunction = ScriptRemoveScriptEventFunctionEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

function renderScriptAllEventFunctions(param, languageType, param$1) {
  var currentScript = param$1[/* state */1][/* currentScript */0];
  var send = param$1[/* send */3];
  var dispatchFunc = param[1];
  var uiState = param[0];
  StateLogicService$WonderEditor.getStateToGetData((function (param) {
          return MainEditorScriptEventFunctionUtils$WonderEditor.getUnUsedScriptEventFunctionNodeIds(currentScript, param);
        }));
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                  return ScriptEngineService$WonderEditor.getScriptAllEventFunctionEntries(currentScript, param);
                })).map((function (param) {
                var name = param[0];
                var scriptEventFunctionNodeId = OptionService$WonderEditor.unsafeGet(StateLogicService$WonderEditor.getStateToGetData((function (param) {
                            return OperateTreeAssetLogicService$WonderEditor.findNodeIdByName(name, param);
                          })));
                return React.createElement("div", {
                            key: DomHelper$WonderEditor.getRandomKey(/* () */0),
                            className: "wonder-script-function"
                          }, React.createElement("div", {
                                className: "component-header"
                              }, React.createElement("div", {
                                    className: "header-title"
                                  }, DomHelper$WonderEditor.textEl("Script Function")), React.createElement("div", {
                                    className: "header-close"
                                  }, React.createElement("img", {
                                        src: "./public/img/close.png",
                                        onClick: (function (_e) {
                                            return Curry._3(_removeScriptEventFunction, /* tuple */[
                                                        uiState,
                                                        dispatchFunc
                                                      ], /* () */0, /* tuple */[
                                                        currentScript,
                                                        name
                                                      ]);
                                          })
                                      }))), ReasonReact.element(undefined, undefined, SelectAssetGroupBar$WonderEditor.make("Name", LanguageUtils$WonderEditor.getInspectorLanguageDataByType("script-use-scriptEventFunction-describe", languageType), name, (function (send) {
                                      return StateLogicService$WonderEditor.getStateToGetData((function (param) {
                                                    return _sendShowScriptEventFunctionGroupForChange(currentScript, scriptEventFunctionNodeId, send, param);
                                                  }));
                                    }), send, /* array */[])));
              }));
}

function sortScriptEventFunctionNodeIds(scriptEventFunctionNodeIds) {
  return scriptEventFunctionNodeIds.sort();
}

var handleChangeScriptEventFunction = ScriptChangeScriptEventFunctionEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var addScriptEventFunction = ScriptAddScriptEventFunctionEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

function getAllScriptEventFunctions(currentScriptEventFunctionNodeId, unUsedScriptEventFunctionNodeIds) {
  return ArrayService$WonderEditor.fastConcat(/* array */[OptionService$WonderEditor.unsafeGet(currentScriptEventFunctionNodeId)], unUsedScriptEventFunctionNodeIds).sort();
}

var isScriptEventFunction = MainEditorScriptUtils$WonderEditor.isNodeIdEqual;

function getSelectScriptEventFunctionGroupWidgetText(scriptEventFunctionNodeId) {
  return StateLogicService$WonderEditor.getStateToGetData((function (param) {
                return OperateTreeAssetLogicService$WonderEditor.unsafeGetNodeNameById(scriptEventFunctionNodeId, param);
              }));
}

var Method = /* module */[
  /* _sendShowScriptEventFunctionGroupForChange */_sendShowScriptEventFunctionGroupForChange,
  /* _removeScriptEventFunction */_removeScriptEventFunction,
  /* renderScriptAllEventFunctions */renderScriptAllEventFunctions,
  /* sortScriptEventFunctionNodeIds */sortScriptEventFunctionNodeIds,
  /* handleChangeScriptEventFunction */handleChangeScriptEventFunction,
  /* addScriptEventFunction */addScriptEventFunction,
  /* getAllScriptEventFunctions */getAllScriptEventFunctions,
  /* isScriptEventFunction */isScriptEventFunction,
  /* getSelectScriptEventFunctionGroupWidgetText */getSelectScriptEventFunctionGroupWidgetText
];

var component = ReasonReact.reducerComponent("MainEditorScriptEventFunction");

function reducer(action, state) {
  if (typeof action === "number") {
    if (action === 0) {
      return /* Update */Block.__(0, [/* record */[
                  /* currentScript */state[/* currentScript */0],
                  /* isShowScriptEventFunctionGroupForAdd */false,
                  /* isShowScriptEventFunctionGroupForChange */state[/* isShowScriptEventFunctionGroupForChange */2],
                  /* lastScriptEventFunctionNodeIdForAdd */undefined,
                  /* lastScriptEventFunctionNodeIdForChange */state[/* lastScriptEventFunctionNodeIdForChange */4],
                  /* unUsedScriptEventFunctionNodeIds */state[/* unUsedScriptEventFunctionNodeIds */5]
                ]]);
    } else {
      return /* Update */Block.__(0, [/* record */[
                  /* currentScript */state[/* currentScript */0],
                  /* isShowScriptEventFunctionGroupForAdd */state[/* isShowScriptEventFunctionGroupForAdd */1],
                  /* isShowScriptEventFunctionGroupForChange */false,
                  /* lastScriptEventFunctionNodeIdForAdd */state[/* lastScriptEventFunctionNodeIdForAdd */3],
                  /* lastScriptEventFunctionNodeIdForChange */undefined,
                  /* unUsedScriptEventFunctionNodeIds */state[/* unUsedScriptEventFunctionNodeIds */5]
                ]]);
    }
  } else {
    switch (action.tag | 0) {
      case 0 : 
          return /* Update */Block.__(0, [/* record */[
                      /* currentScript */state[/* currentScript */0],
                      /* isShowScriptEventFunctionGroupForAdd */state[/* isShowScriptEventFunctionGroupForAdd */1],
                      /* isShowScriptEventFunctionGroupForChange */state[/* isShowScriptEventFunctionGroupForChange */2],
                      /* lastScriptEventFunctionNodeIdForAdd */action[0],
                      /* lastScriptEventFunctionNodeIdForChange */state[/* lastScriptEventFunctionNodeIdForChange */4],
                      /* unUsedScriptEventFunctionNodeIds */action[1]
                    ]]);
      case 1 : 
          return /* Update */Block.__(0, [/* record */[
                      /* currentScript */state[/* currentScript */0],
                      /* isShowScriptEventFunctionGroupForAdd */state[/* isShowScriptEventFunctionGroupForAdd */1],
                      /* isShowScriptEventFunctionGroupForChange */state[/* isShowScriptEventFunctionGroupForChange */2],
                      /* lastScriptEventFunctionNodeIdForAdd */state[/* lastScriptEventFunctionNodeIdForAdd */3],
                      /* lastScriptEventFunctionNodeIdForChange */action[0],
                      /* unUsedScriptEventFunctionNodeIds */action[1]
                    ]]);
      case 2 : 
          return /* Update */Block.__(0, [/* record */[
                      /* currentScript */state[/* currentScript */0],
                      /* isShowScriptEventFunctionGroupForAdd */true,
                      /* isShowScriptEventFunctionGroupForChange */state[/* isShowScriptEventFunctionGroupForChange */2],
                      /* lastScriptEventFunctionNodeIdForAdd */action[0],
                      /* lastScriptEventFunctionNodeIdForChange */state[/* lastScriptEventFunctionNodeIdForChange */4],
                      /* unUsedScriptEventFunctionNodeIds */action[1]
                    ]]);
      case 3 : 
          return /* Update */Block.__(0, [/* record */[
                      /* currentScript */state[/* currentScript */0],
                      /* isShowScriptEventFunctionGroupForAdd */state[/* isShowScriptEventFunctionGroupForAdd */1],
                      /* isShowScriptEventFunctionGroupForChange */true,
                      /* lastScriptEventFunctionNodeIdForAdd */state[/* lastScriptEventFunctionNodeIdForAdd */3],
                      /* lastScriptEventFunctionNodeIdForChange */action[0],
                      /* unUsedScriptEventFunctionNodeIds */action[1]
                    ]]);
      
    }
  }
}

function render(param, self) {
  var send = self[/* send */3];
  var state = self[/* state */1];
  var dispatchFunc = param[1];
  var uiState = param[0];
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  var match = state[/* isShowScriptEventFunctionGroupForAdd */1];
  var match$1 = state[/* isShowScriptEventFunctionGroupForChange */2];
  return React.createElement("article", {
              key: "MainEditorScriptFunction",
              className: "wonder-inspector-scriptFunction"
            }, React.createElement("div", {
                  className: "inspector-component"
                }, React.createElement("div", {
                      className: "component-title",
                      title: LanguageUtils$WonderEditor.getInspectorLanguageDataByType("mesh-render-describe", languageType)
                    }, DomHelper$WonderEditor.textEl("Script Function Group")), React.createElement("hr", undefined), React.createElement("div", {
                      className: "component-content"
                    }, renderScriptAllEventFunctions(/* tuple */[
                          uiState,
                          dispatchFunc
                        ], languageType, self), React.createElement("button", {
                          className: "addable-btn",
                          onClick: (function (_e) {
                              return Curry._3(addScriptEventFunction, /* tuple */[
                                          uiState,
                                          dispatchFunc
                                        ], /* tuple */[
                                          languageType,
                                          (function (lastScriptEventFunctionNodeIdForAdd, unUsedScriptEventFunctionNodeIds) {
                                              return Curry._1(send, /* ShowScriptEventFunctionGroupForAdd */Block.__(2, [
                                                            lastScriptEventFunctionNodeIdForAdd,
                                                            unUsedScriptEventFunctionNodeIds
                                                          ]));
                                            })
                                        ], state[/* currentScript */0]);
                            })
                        }, DomHelper$WonderEditor.textEl(LanguageUtils$WonderEditor.getInspectorLanguageDataByType("script-add-scriptEventFunction", languageType))))), match ? ReasonReact.element(undefined, undefined, SelectAssetGroupWidget$WonderEditor.make("Add Script Event Function", (function (send) {
                          return Curry._1(send, /* HideScriptEventFunctionGroupForAdd */0);
                        }), send, (function (param) {
                          return getAllScriptEventFunctions(state[/* lastScriptEventFunctionNodeIdForAdd */3], state[/* unUsedScriptEventFunctionNodeIds */5]);
                        }), (function (scriptEventFunctionNodeId) {
                          var currentScriptEventFunctionNodeId = state[/* lastScriptEventFunctionNodeIdForAdd */3];
                          return MainEditorScriptUtils$WonderEditor.isNodeIdEqual(currentScriptEventFunctionNodeId, scriptEventFunctionNodeId);
                        }), (function (scriptEventFunctionNodeId, send) {
                          var currentScriptEventFunctionNodeId = state[/* lastScriptEventFunctionNodeIdForAdd */3];
                          return Curry._3(handleChangeScriptEventFunction, /* tuple */[
                                      uiState,
                                      dispatchFunc
                                    ], (function (targetScriptEventFunctionNodeId, unUsedScriptEventFunctionNodeIds) {
                                        return Curry._1(send, /* ChangeScriptEventFunctionForAdd */Block.__(0, [
                                                      targetScriptEventFunctionNodeId,
                                                      unUsedScriptEventFunctionNodeIds
                                                    ]));
                                      }), /* tuple */[
                                      state[/* currentScript */0],
                                      currentScriptEventFunctionNodeId,
                                      scriptEventFunctionNodeId
                                    ]);
                        }), getSelectScriptEventFunctionGroupWidgetText, /* array */[])) : null, match$1 ? ReasonReact.element(undefined, undefined, SelectAssetGroupWidget$WonderEditor.make("Change Script Event Function", (function (send) {
                          return Curry._1(send, /* HideScriptEventFunctionGroupForChange */1);
                        }), send, (function (param) {
                          return getAllScriptEventFunctions(state[/* lastScriptEventFunctionNodeIdForChange */4], state[/* unUsedScriptEventFunctionNodeIds */5]);
                        }), (function (scriptEventFunctionNodeId) {
                          var currentScriptEventFunctionNodeId = state[/* lastScriptEventFunctionNodeIdForChange */4];
                          return MainEditorScriptUtils$WonderEditor.isNodeIdEqual(currentScriptEventFunctionNodeId, scriptEventFunctionNodeId);
                        }), (function (scriptEventFunctionNodeId, send) {
                          var currentScriptEventFunctionNodeId = state[/* lastScriptEventFunctionNodeIdForChange */4];
                          return Curry._3(handleChangeScriptEventFunction, /* tuple */[
                                      uiState,
                                      dispatchFunc
                                    ], (function (targetScriptEventFunctionNodeId, unUsedScriptEventFunctionNodeIds) {
                                        return Curry._1(send, /* ChangeScriptEventFunctionForChange */Block.__(1, [
                                                      targetScriptEventFunctionNodeId,
                                                      unUsedScriptEventFunctionNodeIds
                                                    ]));
                                      }), /* tuple */[
                                      state[/* currentScript */0],
                                      currentScriptEventFunctionNodeId,
                                      scriptEventFunctionNodeId
                                    ]);
                        }), getSelectScriptEventFunctionGroupWidgetText, /* array */[])) : null);
}

function make(uiState, dispatchFunc, script, _children) {
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
              return render(/* tuple */[
                          uiState,
                          dispatchFunc
                        ], self);
            }),
          /* initialState */(function (param) {
              return /* record */[
                      /* currentScript */script,
                      /* isShowScriptEventFunctionGroupForAdd */false,
                      /* isShowScriptEventFunctionGroupForChange */false,
                      /* lastScriptEventFunctionNodeIdForAdd */undefined,
                      /* lastScriptEventFunctionNodeIdForChange */undefined,
                      /* unUsedScriptEventFunctionNodeIds */ArrayService$WonderCommonlib.createEmpty(/* () */0)
                    ];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */reducer,
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

export {
  Method ,
  component ,
  reducer ,
  render ,
  make ,
  
}
/* component Not a pure module */
