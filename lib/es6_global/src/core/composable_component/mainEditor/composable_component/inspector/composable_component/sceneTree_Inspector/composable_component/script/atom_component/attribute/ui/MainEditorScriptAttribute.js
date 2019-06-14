

import * as Block from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Pervasives from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as ReasonReact from "../../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as IntInput$WonderEditor from "../../../../../../../../../../../atom_component/intInput/IntInput.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../../../external/DomHelper.js";
import * as FloatInput$WonderEditor from "../../../../../../../../../../../atom_component/floatInput/FloatInput.js";
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
import * as ScriptAttributeEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/script/ScriptAttributeEngineService.js";
import * as MainEditorScriptAttributeUtils$WonderEditor from "../utils/MainEditorScriptAttributeUtils.js";
import * as ScriptAddScriptAttributeEventHandler$WonderEditor from "../eventHandler/ScriptAddScriptAttributeEventHandler.js";
import * as ScriptChangeScriptAttributeEventHandler$WonderEditor from "../eventHandler/ScriptChangeScriptAttributeEventHandler.js";
import * as ScriptRemoveScriptAttributeEventHandler$WonderEditor from "../eventHandler/ScriptRemoveScriptAttributeEventHandler.js";
import * as ScriptBlurScriptAttributeFieldDefaultValueEventHandler$WonderEditor from "../eventHandler/ScriptBlurScriptAttributeFieldDefaultValueEventHandler.js";

function _sendShowScriptAttributeGroupForChange(currentScript, scriptAttributeNodeId, send, param) {
  return Curry._1(send, /* ShowScriptAttributeGroupForChange */Block.__(3, [
                scriptAttributeNodeId,
                MainEditorScriptAttributeUtils$WonderEditor.getUnUsedScriptAttributeNodeIds(currentScript, /* tuple */[
                      param[0],
                      param[1]
                    ])
              ]));
}

var _removeScriptAttribute = ScriptRemoveScriptAttributeEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

function _changeScriptAttributeFieldDefaultValue(script, param, attribute, defaultValue) {
  var fieldName = param[1];
  var attributeName = param[0];
  return StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                return ScriptEngineService$WonderEditor.setScriptAttributeFieldDefaultValueAndValue(script, attributeName, fieldName, defaultValue, param);
              }));
}

function _isFloatValueEqual(value1, value2) {
  return value1 === value2;
}

function _isIntValueEqual(value1, value2) {
  return value1 === value2;
}

function _blurScriptAttributeFieldDefaultValue(param, isValueEqualFunc, param$1) {
  var defaultValue = param$1[4];
  var fieldName = param$1[2];
  var attributeName = param$1[1];
  var script = param$1[0];
  var match = Curry._2(isValueEqualFunc, defaultValue, StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
              return ScriptEngineService$WonderEditor.unsafeGetScriptAttributeFieldDefaultValue(script, attributeName, fieldName, param);
            })));
  if (match) {
    return /* () */0;
  } else {
    return Curry._3(ScriptBlurScriptAttributeFieldDefaultValueEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1], /* tuple */[
                param[0],
                param[1]
              ], /* () */0, /* tuple */[
                script,
                attributeName,
                fieldName,
                param$1[3],
                defaultValue
              ]);
  }
}

function _renderScriptAttributeFloatFieldDefaultValue(param, languageType, script, param$1) {
  var attribute = param$1[2];
  var fieldName = param$1[1];
  var attributeName = param$1[0];
  var dispatchFunc = param[1];
  var uiState = param[0];
  return ReasonReact.element(undefined, undefined, FloatInput$WonderEditor.make(undefined, (function (value) {
                    return _blurScriptAttributeFieldDefaultValue(/* tuple */[
                                uiState,
                                dispatchFunc
                              ], _isFloatValueEqual, /* tuple */[
                                script,
                                attributeName,
                                fieldName,
                                attribute,
                                value
                              ]);
                  }), Pervasives.string_of_float(ScriptAttributeEngineService$WonderEditor.unsafeGetScriptAttributeFieldDefaultValue(fieldName, attribute)), fieldName, (function (value) {
                    return _changeScriptAttributeFieldDefaultValue(script, /* tuple */[
                                attributeName,
                                fieldName
                              ], attribute, value);
                  }), (function (value) {
                    return _blurScriptAttributeFieldDefaultValue(/* tuple */[
                                uiState,
                                dispatchFunc
                              ], _isFloatValueEqual, /* tuple */[
                                script,
                                attributeName,
                                fieldName,
                                attribute,
                                value
                              ]);
                  }), fieldName, /* array */[]));
}

function _renderScriptAttributeIntFieldDefaultValue(param, languageType, script, param$1) {
  var attribute = param$1[2];
  var fieldName = param$1[1];
  var attributeName = param$1[0];
  var dispatchFunc = param[1];
  var uiState = param[0];
  return ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, IntInput$WonderEditor.make((function (value) {
                    return _blurScriptAttributeFieldDefaultValue(/* tuple */[
                                uiState,
                                dispatchFunc
                              ], _isIntValueEqual, /* tuple */[
                                script,
                                attributeName,
                                fieldName,
                                attribute,
                                value
                              ]);
                  }), String(ScriptAttributeEngineService$WonderEditor.unsafeGetScriptAttributeFieldDefaultValue(fieldName, attribute)), fieldName, (function (value) {
                    return _changeScriptAttributeFieldDefaultValue(script, /* tuple */[
                                attributeName,
                                fieldName
                              ], attribute, value);
                  }), (function (value) {
                    return _blurScriptAttributeFieldDefaultValue(/* tuple */[
                                uiState,
                                dispatchFunc
                              ], _isIntValueEqual, /* tuple */[
                                script,
                                attributeName,
                                fieldName,
                                attribute,
                                value
                              ]);
                  }), fieldName, /* array */[]));
}

function _renderScriptAttributeFieldDefaultValue(param, languageType, script, param$1) {
  var attribute = param$1[3];
  var fieldName = param$1[1];
  var attributeName = param$1[0];
  var dispatchFunc = param[1];
  var uiState = param[0];
  if (param$1[2]) {
    return _renderScriptAttributeFloatFieldDefaultValue(/* tuple */[
                uiState,
                dispatchFunc
              ], languageType, script, /* tuple */[
                attributeName,
                fieldName,
                attribute
              ]);
  } else {
    return _renderScriptAttributeIntFieldDefaultValue(/* tuple */[
                uiState,
                dispatchFunc
              ], languageType, script, /* tuple */[
                attributeName,
                fieldName,
                attribute
              ]);
  }
}

function _renderScriptAttributeFields(param, languageType, script, param$1) {
  var attribute = param$1[1];
  var attributeName = param$1[0];
  var dispatchFunc = param[1];
  var uiState = param[0];
  return ScriptAttributeEngineService$WonderEditor.getScriptAttributeEntries(attribute).map((function (param) {
                var fieldName = param[0];
                var type_ = ScriptAttributeEngineService$WonderEditor.unsafeGetScriptAttributeFieldType(fieldName, attribute);
                return React.createElement("div", {
                            key: DomHelper$WonderEditor.getRandomKey(/* () */0),
                            className: "scriptAttribute-field"
                          }, _renderScriptAttributeFieldDefaultValue(/* tuple */[
                                uiState,
                                dispatchFunc
                              ], languageType, script, /* tuple */[
                                attributeName,
                                fieldName,
                                type_,
                                attribute
                              ]));
              }));
}

function renderScriptAllAttributes(param, languageType, dispatchFunc, param$1) {
  var currentScript = param$1[/* state */1][/* currentScript */0];
  var send = param$1[/* send */3];
  var uiState = param[0];
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                  return ScriptEngineService$WonderEditor.getScriptAllAttributeEntries(currentScript, param);
                })).map((function (param) {
                var name = param[0];
                var scriptAttributeNodeId = OptionService$WonderEditor.unsafeGet(StateLogicService$WonderEditor.getStateToGetData((function (param) {
                            return OperateTreeAssetLogicService$WonderEditor.findNodeIdByName(name, param);
                          })));
                return React.createElement("div", {
                            key: DomHelper$WonderEditor.getRandomKey(/* () */0),
                            className: "wonder-script-attribute"
                          }, React.createElement("div", {
                                className: "component-header"
                              }, React.createElement("div", {
                                    className: "header-title"
                                  }, DomHelper$WonderEditor.textEl("Script Attribute")), React.createElement("div", {
                                    className: "header-close"
                                  }, React.createElement("img", {
                                        src: "./public/img/close.png",
                                        onClick: (function (_e) {
                                            return Curry._3(_removeScriptAttribute, /* tuple */[
                                                        uiState,
                                                        dispatchFunc
                                                      ], /* () */0, /* tuple */[
                                                        currentScript,
                                                        name
                                                      ]);
                                          })
                                      }))), ReasonReact.element(undefined, undefined, SelectAssetGroupBar$WonderEditor.make("Name", LanguageUtils$WonderEditor.getInspectorLanguageDataByType("script-use-scriptAttribute-describe", languageType), name, (function (send) {
                                      return StateLogicService$WonderEditor.getStateToGetData((function (param) {
                                                    return _sendShowScriptAttributeGroupForChange(currentScript, scriptAttributeNodeId, send, param);
                                                  }));
                                    }), send, /* array */[])), React.createElement("div", {
                                className: "scriptAttribute-fields"
                              }, _renderScriptAttributeFields(/* tuple */[
                                    uiState,
                                    dispatchFunc
                                  ], languageType, currentScript, /* tuple */[
                                    name,
                                    param[1]
                                  ])));
              }));
}

function sortScriptAttributeNodeIds(scriptAttributeNodeIds) {
  return scriptAttributeNodeIds.sort();
}

var handleChangeScriptAttribute = ScriptChangeScriptAttributeEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var addScriptAttribute = ScriptAddScriptAttributeEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

function getAllScriptAttributes(currentScriptAttributeNodeId, unUsedScriptAttributeNodeIds) {
  return ArrayService$WonderEditor.fastConcat(/* array */[OptionService$WonderEditor.unsafeGet(currentScriptAttributeNodeId)], unUsedScriptAttributeNodeIds).sort();
}

var isScriptAttribute = MainEditorScriptUtils$WonderEditor.isNodeIdEqual;

function getSelectScriptAttributeGroupWidgetText(scriptAttributeNodeId) {
  return StateLogicService$WonderEditor.getStateToGetData((function (param) {
                return OperateTreeAssetLogicService$WonderEditor.unsafeGetNodeNameById(scriptAttributeNodeId, param);
              }));
}

var Method = /* module */[
  /* _sendShowScriptAttributeGroupForChange */_sendShowScriptAttributeGroupForChange,
  /* _removeScriptAttribute */_removeScriptAttribute,
  /* _changeScriptAttributeFieldDefaultValue */_changeScriptAttributeFieldDefaultValue,
  /* _isFloatValueEqual */_isFloatValueEqual,
  /* _isIntValueEqual */_isIntValueEqual,
  /* _blurScriptAttributeFieldDefaultValue */_blurScriptAttributeFieldDefaultValue,
  /* _renderScriptAttributeFloatFieldDefaultValue */_renderScriptAttributeFloatFieldDefaultValue,
  /* _renderScriptAttributeIntFieldDefaultValue */_renderScriptAttributeIntFieldDefaultValue,
  /* _renderScriptAttributeFieldDefaultValue */_renderScriptAttributeFieldDefaultValue,
  /* _renderScriptAttributeFields */_renderScriptAttributeFields,
  /* renderScriptAllAttributes */renderScriptAllAttributes,
  /* sortScriptAttributeNodeIds */sortScriptAttributeNodeIds,
  /* handleChangeScriptAttribute */handleChangeScriptAttribute,
  /* addScriptAttribute */addScriptAttribute,
  /* getAllScriptAttributes */getAllScriptAttributes,
  /* isScriptAttribute */isScriptAttribute,
  /* getSelectScriptAttributeGroupWidgetText */getSelectScriptAttributeGroupWidgetText
];

var component = ReasonReact.reducerComponent("MainEditorScriptAttribute");

function reducer(action, state) {
  if (typeof action === "number") {
    if (action === 0) {
      return /* Update */Block.__(0, [/* record */[
                  /* currentScript */state[/* currentScript */0],
                  /* isShowScriptAttributeGroupForAdd */false,
                  /* isShowScriptAttributeGroupForChange */state[/* isShowScriptAttributeGroupForChange */2],
                  /* lastScriptAttributeNodeIdForAdd */undefined,
                  /* lastScriptAttributeNodeIdForChange */state[/* lastScriptAttributeNodeIdForChange */4],
                  /* unUsedScriptAttributeNodeIds */state[/* unUsedScriptAttributeNodeIds */5]
                ]]);
    } else {
      return /* Update */Block.__(0, [/* record */[
                  /* currentScript */state[/* currentScript */0],
                  /* isShowScriptAttributeGroupForAdd */state[/* isShowScriptAttributeGroupForAdd */1],
                  /* isShowScriptAttributeGroupForChange */false,
                  /* lastScriptAttributeNodeIdForAdd */state[/* lastScriptAttributeNodeIdForAdd */3],
                  /* lastScriptAttributeNodeIdForChange */undefined,
                  /* unUsedScriptAttributeNodeIds */state[/* unUsedScriptAttributeNodeIds */5]
                ]]);
    }
  } else {
    switch (action.tag | 0) {
      case 0 : 
          return /* Update */Block.__(0, [/* record */[
                      /* currentScript */state[/* currentScript */0],
                      /* isShowScriptAttributeGroupForAdd */state[/* isShowScriptAttributeGroupForAdd */1],
                      /* isShowScriptAttributeGroupForChange */state[/* isShowScriptAttributeGroupForChange */2],
                      /* lastScriptAttributeNodeIdForAdd */action[0],
                      /* lastScriptAttributeNodeIdForChange */state[/* lastScriptAttributeNodeIdForChange */4],
                      /* unUsedScriptAttributeNodeIds */action[1]
                    ]]);
      case 1 : 
          return /* Update */Block.__(0, [/* record */[
                      /* currentScript */state[/* currentScript */0],
                      /* isShowScriptAttributeGroupForAdd */state[/* isShowScriptAttributeGroupForAdd */1],
                      /* isShowScriptAttributeGroupForChange */state[/* isShowScriptAttributeGroupForChange */2],
                      /* lastScriptAttributeNodeIdForAdd */state[/* lastScriptAttributeNodeIdForAdd */3],
                      /* lastScriptAttributeNodeIdForChange */action[0],
                      /* unUsedScriptAttributeNodeIds */action[1]
                    ]]);
      case 2 : 
          return /* Update */Block.__(0, [/* record */[
                      /* currentScript */state[/* currentScript */0],
                      /* isShowScriptAttributeGroupForAdd */true,
                      /* isShowScriptAttributeGroupForChange */state[/* isShowScriptAttributeGroupForChange */2],
                      /* lastScriptAttributeNodeIdForAdd */action[0],
                      /* lastScriptAttributeNodeIdForChange */state[/* lastScriptAttributeNodeIdForChange */4],
                      /* unUsedScriptAttributeNodeIds */action[1]
                    ]]);
      case 3 : 
          return /* Update */Block.__(0, [/* record */[
                      /* currentScript */state[/* currentScript */0],
                      /* isShowScriptAttributeGroupForAdd */state[/* isShowScriptAttributeGroupForAdd */1],
                      /* isShowScriptAttributeGroupForChange */true,
                      /* lastScriptAttributeNodeIdForAdd */state[/* lastScriptAttributeNodeIdForAdd */3],
                      /* lastScriptAttributeNodeIdForChange */action[0],
                      /* unUsedScriptAttributeNodeIds */action[1]
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
  var match = state[/* isShowScriptAttributeGroupForAdd */1];
  var match$1 = state[/* isShowScriptAttributeGroupForChange */2];
  return React.createElement("article", {
              key: "MainEditorScriptAttribute",
              className: "wonder-inspector-scriptAttribute"
            }, React.createElement("div", {
                  className: "inspector-component"
                }, React.createElement("div", {
                      className: "component-title",
                      title: LanguageUtils$WonderEditor.getInspectorLanguageDataByType("mesh-render-describe", languageType)
                    }, DomHelper$WonderEditor.textEl("Script Attribute Group")), React.createElement("hr", undefined), React.createElement("div", {
                      className: "component-content"
                    }, renderScriptAllAttributes(/* tuple */[
                          uiState,
                          dispatchFunc
                        ], languageType, dispatchFunc, self), React.createElement("button", {
                          className: "addable-btn",
                          onClick: (function (_e) {
                              return Curry._3(addScriptAttribute, /* tuple */[
                                          uiState,
                                          dispatchFunc
                                        ], /* tuple */[
                                          languageType,
                                          (function (lastScriptAttributeNodeIdForAdd, unUsedScriptAttributeNodeIds) {
                                              return Curry._1(send, /* ShowScriptAttributeGroupForAdd */Block.__(2, [
                                                            lastScriptAttributeNodeIdForAdd,
                                                            unUsedScriptAttributeNodeIds
                                                          ]));
                                            })
                                        ], state[/* currentScript */0]);
                            })
                        }, DomHelper$WonderEditor.textEl(LanguageUtils$WonderEditor.getInspectorLanguageDataByType("script-add-scriptAttribute", languageType))))), match ? ReasonReact.element(undefined, undefined, SelectAssetGroupWidget$WonderEditor.make("Add Script Attribute", (function (send) {
                          return Curry._1(send, /* HideScriptAttributeGroupForAdd */0);
                        }), send, (function (param) {
                          return getAllScriptAttributes(state[/* lastScriptAttributeNodeIdForAdd */3], state[/* unUsedScriptAttributeNodeIds */5]);
                        }), (function (scriptAttributeNodeId) {
                          var currentScriptAttributeNodeId = state[/* lastScriptAttributeNodeIdForAdd */3];
                          return MainEditorScriptUtils$WonderEditor.isNodeIdEqual(currentScriptAttributeNodeId, scriptAttributeNodeId);
                        }), (function (scriptAttributeNodeId, send) {
                          var currentScriptAttributeNodeId = state[/* lastScriptAttributeNodeIdForAdd */3];
                          return Curry._3(handleChangeScriptAttribute, /* tuple */[
                                      uiState,
                                      dispatchFunc
                                    ], (function (targetScriptAttributeNodeId, unUsedScriptAttributeNodeIds) {
                                        return Curry._1(send, /* ChangeScriptAttributeForAdd */Block.__(0, [
                                                      targetScriptAttributeNodeId,
                                                      unUsedScriptAttributeNodeIds
                                                    ]));
                                      }), /* tuple */[
                                      state[/* currentScript */0],
                                      currentScriptAttributeNodeId,
                                      scriptAttributeNodeId
                                    ]);
                        }), getSelectScriptAttributeGroupWidgetText, /* array */[])) : null, match$1 ? ReasonReact.element(undefined, undefined, SelectAssetGroupWidget$WonderEditor.make("Change Script Attribute", (function (send) {
                          return Curry._1(send, /* HideScriptAttributeGroupForChange */1);
                        }), send, (function (param) {
                          return getAllScriptAttributes(state[/* lastScriptAttributeNodeIdForChange */4], state[/* unUsedScriptAttributeNodeIds */5]);
                        }), (function (scriptAttributeNodeId) {
                          var currentScriptAttributeNodeId = state[/* lastScriptAttributeNodeIdForChange */4];
                          return MainEditorScriptUtils$WonderEditor.isNodeIdEqual(currentScriptAttributeNodeId, scriptAttributeNodeId);
                        }), (function (scriptAttributeNodeId, send) {
                          var currentScriptAttributeNodeId = state[/* lastScriptAttributeNodeIdForChange */4];
                          return Curry._3(handleChangeScriptAttribute, /* tuple */[
                                      uiState,
                                      dispatchFunc
                                    ], (function (targetScriptAttributeNodeId, unUsedScriptAttributeNodeIds) {
                                        return Curry._1(send, /* ChangeScriptAttributeForChange */Block.__(1, [
                                                      targetScriptAttributeNodeId,
                                                      unUsedScriptAttributeNodeIds
                                                    ]));
                                      }), /* tuple */[
                                      state[/* currentScript */0],
                                      currentScriptAttributeNodeId,
                                      scriptAttributeNodeId
                                    ]);
                        }), getSelectScriptAttributeGroupWidgetText, /* array */[])) : null);
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
                      /* isShowScriptAttributeGroupForAdd */false,
                      /* isShowScriptAttributeGroupForChange */false,
                      /* lastScriptAttributeNodeIdForAdd */undefined,
                      /* lastScriptAttributeNodeIdForChange */undefined,
                      /* unUsedScriptAttributeNodeIds */ArrayService$WonderCommonlib.createEmpty(/* () */0)
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
