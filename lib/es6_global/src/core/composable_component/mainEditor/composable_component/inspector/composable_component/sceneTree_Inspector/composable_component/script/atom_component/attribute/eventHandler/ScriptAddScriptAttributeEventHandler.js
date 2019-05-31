

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ArrayService$WonderEditor from "../../../../../../../../../../../../service/atom/ArrayService.js";
import * as ConsoleUtils$WonderEditor from "../../../../../../../../../../../utils/ui/ConsoleUtils.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as LanguageUtils$WonderEditor from "../../../../../../../../../../../utils/language/LanguageUtils.js";
import * as NodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/NodeAssetService.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as ScriptEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/script/ScriptEngineService.js";
import * as MainEditorScriptAttributeUtils$WonderEditor from "../utils/MainEditorScriptAttributeUtils.js";
import * as ScriptAttributeNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/ScriptAttributeNodeAssetEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var setUndoValueToCopiedEngineStateForPromise = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

function handleSelfLogic(param, param$1, script) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var unUsedScriptAttributeNodes = MainEditorScriptAttributeUtils$WonderEditor.getUnUsedScriptAttributeNodes(script, /* tuple */[
        editorState,
        engineState
      ]);
  var match = unUsedScriptAttributeNodes.length > 0;
  if (match) {
    var unUsedScriptAttributeNodeIds = unUsedScriptAttributeNodes.map(NodeAssetService$WonderEditor.getNodeId);
    var match$1 = ArrayService$WonderEditor.removeFirst(unUsedScriptAttributeNodeIds);
    var lastScriptAttributeNodeIdForAdd = match$1[0];
    var match$2 = ScriptAttributeNodeAssetEditorService$WonderEditor.getNameAndAttribute(lastScriptAttributeNodeIdForAdd, editorState);
    var engineState$1 = ScriptEngineService$WonderEditor.addScriptAttribute(script, match$2[0], match$2[1], engineState);
    StateEngineService$WonderEditor.setState(engineState$1);
    StateEditorService$WonderEditor.setState(editorState);
    return Curry._2(param$1[1], lastScriptAttributeNodeIdForAdd, match$1[1]);
  } else {
    var partial_arg = LanguageUtils$WonderEditor.getMessageLanguageDataByType("need-add-scriptAttribute", param$1[0]);
    StateLogicService$WonderEditor.getEditorState((function (param) {
            return ConsoleUtils$WonderEditor.warn(partial_arg, param);
          }));
    return /* () */0;
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
