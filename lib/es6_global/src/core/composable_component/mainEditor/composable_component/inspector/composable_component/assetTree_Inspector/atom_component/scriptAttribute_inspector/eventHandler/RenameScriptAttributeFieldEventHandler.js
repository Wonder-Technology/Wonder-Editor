

import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ConsoleUtils$WonderEditor from "../../../../../../../../../utils/ui/ConsoleUtils.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as LanguageUtils$WonderEditor from "../../../../../../../../../utils/language/LanguageUtils.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as ScriptEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/script/ScriptEngineService.js";
import * as ScriptAttributeEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/script/ScriptAttributeEngineService.js";
import * as ScriptAttributeInspectorUtils$WonderEditor from "../utils/ScriptAttributeInspectorUtils.js";
import * as ScriptAttributeNodeAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/ScriptAttributeNodeAssetEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var setUndoValueToCopiedEngineStateForPromise = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

function handleSelfLogic(param, param$1, param$2) {
  var newFieldName = param$2[2];
  var oldFieldName = param$2[1];
  var nodeId = param$2[0];
  var sendFunc = param$1[1];
  var match = oldFieldName === newFieldName;
  if (match) {
    return /* () */0;
  } else {
    var match$1 = StateLogicService$WonderEditor.getEditorState((function (param) {
            return ScriptAttributeNodeAssetEditorService$WonderEditor.getNameAndAttribute(nodeId, param);
          }));
    var attribute = match$1[1];
    var attributeName = match$1[0];
    var match$2 = ScriptAttributeEngineService$WonderEditor.hasScriptAttributeField(newFieldName, attribute);
    if (match$2) {
      var partial_arg = LanguageUtils$WonderEditor.getMessageLanguageDataByType("asset-rename-scriptAttribute-field", param$1[0]);
      StateLogicService$WonderEditor.getEditorState((function (param) {
              return ConsoleUtils$WonderEditor.warn(partial_arg, param);
            }));
      return Curry._1(sendFunc, attribute);
    } else {
      var newAttribute = ScriptAttributeEngineService$WonderEditor.renameScriptAttributeField(oldFieldName, newFieldName, attribute);
      StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
              return ScriptAttributeInspectorUtils$WonderEditor.updateScriptAttributeNode(nodeId, attributeName, newAttribute, param);
            }));
      StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
              return ScriptEngineService$WonderEditor.updateAttributeInAllScriptComponents(attributeName, newAttribute, param);
            }));
      return Curry._1(sendFunc, newAttribute);
    }
  }
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* setUndoValueToCopiedEngineStateForPromise */setUndoValueToCopiedEngineStateForPromise,
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
