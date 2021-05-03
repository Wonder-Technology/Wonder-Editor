

import * as Block from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../external/DomHelper.js";
import * as SortService$WonderEditor from "../../../../../../../../../../service/atom/SortService.js";
import * as StringInput$WonderEditor from "../../../../../../../../../atom_component/stringInput/StringInput.js";
import * as AttributeBox$WonderEditor from "../atom_component/attributeBox/AttributeBox.js";
import * as LanguageUtils$WonderEditor from "../../../../../../../../../utils/language/LanguageUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as LanguageEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/LanguageEditorService.js";
import * as ScriptAttributeEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/script/ScriptAttributeEngineService.js";
import * as ScriptAttributeNodeAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/ScriptAttributeNodeAssetEditorService.js";
import * as RemoveScriptAttributeFieldEventHandler$WonderEditor from "../eventHandler/RemoveScriptAttributeFieldEventHandler.js";
import * as RenameScriptAttributeFieldEventHandler$WonderEditor from "../eventHandler/RenameScriptAttributeFieldEventHandler.js";
import * as UpdateScriptAttributeFieldEventHandler$WonderEditor from "../eventHandler/UpdateScriptAttributeFieldEventHandler.js";
import * as AddScriptAttributeDefaultFieldEventHandler$WonderEditor from "../eventHandler/AddScriptAttributeDefaultFieldEventHandler.js";

var _updateScriptAttributeNodeByRemoveFieldData = RemoveScriptAttributeFieldEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var _updateScriptAttributeNodeByReplaceFieldData = UpdateScriptAttributeFieldEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var addDefaultField = AddScriptAttributeDefaultFieldEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var _renameField = RenameScriptAttributeFieldEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

function _sortAttributeEntries(attributeEntries) {
  return attributeEntries.sort((function (param, param$1) {
                return SortService$WonderEditor.buildSortByNameFunc(param[0], param$1[0]);
              }));
}

function getAttributeAllFieldsDomArr(param, send, param$1, attributeEntries) {
  var nodeId = param$1[1];
  var languageType = param$1[0];
  var dispatchFunc = param[1];
  var uiState = param[0];
  return _sortAttributeEntries(attributeEntries).map((function (param) {
                return ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, AttributeBox$WonderEditor.make(param[0], nodeId, param[1], Curry._2(_renameField, /* tuple */[
                                    uiState,
                                    dispatchFunc
                                  ], /* tuple */[
                                    languageType,
                                    (function (attribute) {
                                        return Curry._1(send, /* UpdateAttributeEntries */[attribute]);
                                      })
                                  ]), Curry._2(_updateScriptAttributeNodeByRemoveFieldData, /* tuple */[
                                    uiState,
                                    dispatchFunc
                                  ], (function (newAttribute) {
                                      return Curry._1(send, /* UpdateAttributeEntries */[newAttribute]);
                                    })), Curry._2(_updateScriptAttributeNodeByReplaceFieldData, /* tuple */[
                                    uiState,
                                    dispatchFunc
                                  ], /* () */0), /* array */[]));
              }));
}

var Method = /* module */[
  /* _updateScriptAttributeNodeByRemoveFieldData */_updateScriptAttributeNodeByRemoveFieldData,
  /* _updateScriptAttributeNodeByReplaceFieldData */_updateScriptAttributeNodeByReplaceFieldData,
  /* addDefaultField */addDefaultField,
  /* _renameField */_renameField,
  /* _sortAttributeEntries */_sortAttributeEntries,
  /* getAttributeAllFieldsDomArr */getAttributeAllFieldsDomArr
];

var component = ReasonReact.reducerComponent("ScriptAttributeInspector");

function reducer(reduxTuple, action, state) {
  return /* Update */Block.__(0, [/* record */[/* attributeEntries */ScriptAttributeEngineService$WonderEditor.getScriptAttributeEntries(action[0])]]);
}

function render(param, nodeId, renameFunc, param$1) {
  var send = param$1[/* send */3];
  var dispatchFunc = param[1];
  var uiState = param[0];
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  var match = StateLogicService$WonderEditor.getEditorState((function (param) {
          return ScriptAttributeNodeAssetEditorService$WonderEditor.getNameAndAttribute(nodeId, param);
        }));
  return React.createElement("article", {
              key: "ScriptAttributeInspector",
              className: "wonder-scriptAttribute-inspector"
            }, React.createElement("h1", undefined, DomHelper$WonderEditor.textEl("Script Attribute")), React.createElement("hr", undefined), ReasonReact.element(undefined, undefined, StringInput$WonderEditor.make(match[0], "Name", LanguageUtils$WonderEditor.getInspectorLanguageDataByType("scriptAttribute-name-describe", languageType), undefined, renameFunc, false, /* array */[])), React.createElement("div", {
                  className: "scriptAttribute-data"
                }, React.createElement("div", {
                      className: "data-fields"
                    }, getAttributeAllFieldsDomArr(/* tuple */[
                          uiState,
                          dispatchFunc
                        ], send, /* tuple */[
                          languageType,
                          nodeId
                        ], param$1[/* state */1][/* attributeEntries */0])), React.createElement("hr", undefined), React.createElement("button", {
                      className: "data-addable-btn",
                      onClick: (function (_e) {
                          return Curry._3(addDefaultField, /* tuple */[
                                      uiState,
                                      dispatchFunc
                                    ], (function (attribute) {
                                        return Curry._1(send, /* UpdateAttributeEntries */[attribute]);
                                      }), nodeId);
                        })
                    }, DomHelper$WonderEditor.textEl(LanguageUtils$WonderEditor.getInspectorLanguageDataByType("add-scriptAttribute-field", languageType)))));
}

function make(uiState, dispatchFunc, currentNodeId, name, attribute, renameFunc, _children) {
  var partial_arg = /* tuple */[
    uiState,
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
              return render(/* tuple */[
                          uiState,
                          dispatchFunc
                        ], currentNodeId, renameFunc, self);
            }),
          /* initialState */(function (param) {
              return /* record */[/* attributeEntries */ScriptAttributeEngineService$WonderEditor.getScriptAttributeEntries(attribute)];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param, param$1) {
              return reducer(partial_arg, param, param$1);
            }),
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
