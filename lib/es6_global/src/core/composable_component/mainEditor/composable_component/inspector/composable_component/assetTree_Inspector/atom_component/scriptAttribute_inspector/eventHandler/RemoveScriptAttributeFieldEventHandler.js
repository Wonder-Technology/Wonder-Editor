

import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as ScriptEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/script/ScriptEngineService.js";
import * as ScriptAttributeEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/script/ScriptAttributeEngineService.js";
import * as ScriptAttributeInspectorUtils$WonderEditor from "../utils/ScriptAttributeInspectorUtils.js";
import * as ScriptAttributeNodeAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/ScriptAttributeNodeAssetEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var setUndoValueToCopiedEngineStateForPromise = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

function handleSelfLogic(param, sendFunc, param$1) {
  var nodeId = param$1[0];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = ScriptAttributeNodeAssetEditorService$WonderEditor.getNameAndAttribute(nodeId, editorState);
  var attributeName = match[0];
  var newAttribute = ScriptAttributeEngineService$WonderEditor.removeScriptAttributeField(param$1[1], match[1]);
  var editorState$1 = ScriptAttributeInspectorUtils$WonderEditor.updateScriptAttributeNode(nodeId, attributeName, newAttribute, editorState);
  var engineState$1 = ScriptEngineService$WonderEditor.updateAttributeInAllScriptComponents(attributeName, newAttribute, engineState);
  Curry._1(sendFunc, newAttribute);
  return StateLogicService$WonderEditor.setState(/* tuple */[
              editorState$1,
              engineState$1
            ]);
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
