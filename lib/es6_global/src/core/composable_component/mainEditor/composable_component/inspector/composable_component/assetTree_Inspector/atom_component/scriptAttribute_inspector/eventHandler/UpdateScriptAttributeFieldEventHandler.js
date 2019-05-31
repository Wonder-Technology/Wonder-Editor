

import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Console$WonderEditor from "../../../../../../../../../external/Console.js";
import * as LogUtils$WonderEditor from "../../../../../../../../../utils/console/LogUtils.js";
import * as ConsoleUtils$WonderEditor from "../../../../../../../../../utils/ui/ConsoleUtils.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as ScriptEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/script/ScriptEngineService.js";
import * as ScriptAttributeTypeService$WonderEditor from "../../../../../../../../../../service/primitive/ScriptAttributeTypeService.js";
import * as ScriptAttributeEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/script/ScriptAttributeEngineService.js";
import * as ScriptAttributeInspectorUtils$WonderEditor from "../utils/ScriptAttributeInspectorUtils.js";
import * as ScriptAttributeNodeAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/ScriptAttributeNodeAssetEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var setUndoValueToCopiedEngineStateForPromise = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

function _isOnlyFieldDefaultValueChange(oldAttributeField, newAttributeFieldJsObj) {
  var newType = ScriptAttributeTypeService$WonderEditor.getTypeFromJsObj(newAttributeFieldJsObj);
  var newDefaultValue = newAttributeFieldJsObj.defaultValue;
  if (ScriptAttributeTypeService$WonderEditor.convertFieldTypeToJsObjStr(oldAttributeField[/* type_ */0]) === newType) {
    return oldAttributeField[/* defaultValue */1] !== newDefaultValue;
  } else {
    return false;
  }
}

function handleSelfLogic(param, param$1, param$2) {
  var newAttributeFieldJsObj = param$2[2];
  var fieldName = param$2[1];
  var nodeId = param$2[0];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = Curry._2(Console$WonderEditor.tryCatch, (function (param) {
          var match = StateLogicService$WonderEditor.getEditorState((function (param) {
                  return ScriptAttributeNodeAssetEditorService$WonderEditor.getNameAndAttribute(nodeId, param);
                }));
          var attribute = match[1];
          var attributeName = match[0];
          var isOnlyFieldDefaultValueChange = _isOnlyFieldDefaultValueChange(ScriptAttributeEngineService$WonderEditor.unsafeGetScriptAttributeField(fieldName, attribute), newAttributeFieldJsObj);
          var newAttribute = ScriptAttributeEngineService$WonderEditor.replaceScriptAttributeField(fieldName, newAttributeFieldJsObj, attribute);
          var editorState$1 = ScriptAttributeInspectorUtils$WonderEditor.updateScriptAttributeNode(nodeId, attributeName, newAttribute, editorState);
          if (isOnlyFieldDefaultValueChange) {
            return /* tuple */[
                    editorState$1,
                    engineState
                  ];
          } else {
            var engineState$1 = ScriptEngineService$WonderEditor.updateAttributeInAllScriptComponents(attributeName, newAttribute, engineState);
            return /* tuple */[
                    editorState$1,
                    engineState$1
                  ];
          }
        }), (function (e) {
          var message = e.message;
          var partial_arg = LogUtils$WonderEditor.buildErrorMessage("" + (String(message) + ""), "", "", "");
          StateLogicService$WonderEditor.getEditorState((function (param) {
                  return ConsoleUtils$WonderEditor.error(partial_arg, param);
                }));
          return /* tuple */[
                  editorState,
                  engineState
                ];
        }));
  return StateLogicService$WonderEditor.setState(/* tuple */[
              match[0],
              match[1]
            ]);
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* setUndoValueToCopiedEngineStateForPromise */setUndoValueToCopiedEngineStateForPromise,
  /* _isOnlyFieldDefaultValueChange */_isOnlyFieldDefaultValueChange,
  /* handleSelfLogic */handleSelfLogic
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      handleSelfLogic,
      setUndoValueToCopiedEngineState,
      setUndoValueToCopiedEngineStateForPromise
    ]);

export {
  CustomEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
