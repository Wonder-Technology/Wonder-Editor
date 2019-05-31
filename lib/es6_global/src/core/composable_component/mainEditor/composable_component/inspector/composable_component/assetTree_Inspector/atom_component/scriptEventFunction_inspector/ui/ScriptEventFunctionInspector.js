

import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_option from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ReasonReact from "../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../external/DomHelper.js";
import * as FileInput$WonderEditor from "../../../../../../../../../atom_component/fileInput/FileInput.js";
import * as StringInput$WonderEditor from "../../../../../../../../../atom_component/stringInput/StringInput.js";
import * as LanguageUtils$WonderEditor from "../../../../../../../../../utils/language/LanguageUtils.js";
import * as SerializeService$WonderEditor from "../../../../../../../../../../service/atom/SerializeService.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as LanguageEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/LanguageEditorService.js";
import * as UpdateScriptEventFunctionDataEventHandler$WonderEditor from "../eventHandler/UpdateScriptEventFunctionDataEventHandler.js";

function _addSplitSymbol(str) {
  return "" + (String(str) + ",");
}

function _buildBodyStr(eventFunctionName, eventFunction, str) {
  if (eventFunction !== undefined) {
    var funcStr = SerializeService$WonderEditor.serializeFunction(Caml_option.valFromOption(eventFunction));
    return "" + (String(str) + (" \n " + (String(eventFunctionName) + (": " + (String(funcStr) + "")))));
  } else {
    return " " + (String(str) + (" \n  " + (String(eventFunctionName) + ": (script, api, engineState) => { \n    return engineState \n  }")));
  }
}

function convertEventFunctionDataToJsObjStr(param) {
  var bodyStr = _buildBodyStr("dispose", param[/* dispose */2], _addSplitSymbol(_buildBodyStr("update", param[/* update */1], _addSplitSymbol(_buildBodyStr("init", param[/* init */0], ""))))).slice(1);
  return "{ " + (String(bodyStr) + " \n}");
}

var updateEventFunctionData = UpdateScriptEventFunctionDataEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var Method = /* module */[
  /* _addSplitSymbol */_addSplitSymbol,
  /* _buildBodyStr */_buildBodyStr,
  /* convertEventFunctionDataToJsObjStr */convertEventFunctionDataToJsObjStr,
  /* updateEventFunctionData */updateEventFunctionData
];

var component = ReasonReact.statelessComponent("ScriptEventFunctionInspector");

function render(param, param$1, renameFunc, param$2) {
  var name = param$1[1];
  var nodeId = param$1[0];
  var dispatchFunc = param[1];
  var uiState = param[0];
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  return React.createElement("article", {
              key: "ScriptEventFunctionInspector",
              className: "wonder-scriptEventFunction-inspector"
            }, React.createElement("h1", undefined, DomHelper$WonderEditor.textEl("Script Event Function")), React.createElement("hr", undefined), ReasonReact.element(undefined, undefined, StringInput$WonderEditor.make(name, "Name", LanguageUtils$WonderEditor.getInspectorLanguageDataByType("scriptEventFunction-name-describe", languageType), undefined, renameFunc, false, /* array */[])), React.createElement("div", {
                  className: "scriptEventFunction-data"
                }, ReasonReact.element(undefined, undefined, FileInput$WonderEditor.make(undefined, (function (value) {
                            return Curry._3(updateEventFunctionData, /* tuple */[
                                        uiState,
                                        dispatchFunc
                                      ], /* () */0, /* tuple */[
                                        nodeId,
                                        name,
                                        value
                                      ]);
                          }), true, convertEventFunctionDataToJsObjStr(param$1[2]), /* array */[]))));
}

function make(uiState, dispatchFunc, currentNodeId, name, eventFunctionData, renameFunc, _children) {
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
                        ], /* tuple */[
                          currentNodeId,
                          name,
                          eventFunctionData
                        ], renameFunc, self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
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
