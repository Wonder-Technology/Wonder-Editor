

import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as ScriptEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/script/ScriptEngineService.js";
import * as OperateTreeAssetLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/asset/OperateTreeAssetLogicService.js";
import * as ScriptAttributeEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/script/ScriptAttributeEngineService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as ScriptAttributeInspectorUtils$WonderEditor from "../utils/ScriptAttributeInspectorUtils.js";
import * as ScriptAttributeNodeAssetService$WonderEditor from "../../../../../../../../../../service/record/editor/asset/ScriptAttributeNodeAssetService.js";
import * as ScriptAttributeNodeNameAssetService$WonderEditor from "../../../../../../../../../../service/record/editor/asset/ScriptAttributeNodeNameAssetService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var setUndoValueToCopiedEngineStateForPromise = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

function _getAttributeNodeData(nodeId, editorState) {
  return ScriptAttributeNodeAssetService$WonderEditor.getNodeData(StateLogicService$WonderEditor.getEditorState((function (param) {
                    return OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, param);
                  })));
}

function _getDefaultFieldType(param) {
  return "float";
}

function _getDefaultFieldDefaultValue(param) {
  return 0;
}

function handleSelfLogic(param, sendFunc, nodeId) {
  var match = StateLogicService$WonderEditor.getEditorState((function (param) {
          return ScriptAttributeNodeAssetService$WonderEditor.getNodeData(StateLogicService$WonderEditor.getEditorState((function (param) {
                            return OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, param);
                          })));
        }));
  var attributeName = match[/* name */0];
  var attribute = match[/* attribute */1];
  var attribute$1 = ScriptAttributeEngineService$WonderEditor.addScriptAttributeFieldJsObj(OperateTreeAssetLogicService$WonderEditor.getUniqueScriptAttributeFieldName(ScriptAttributeNodeNameAssetService$WonderEditor.getNewFieldName(/* () */0), attribute), {
        type: "float",
        defaultValue: 0
      }, attribute);
  StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
          return ScriptAttributeInspectorUtils$WonderEditor.updateScriptAttributeNode(nodeId, attributeName, attribute$1, param);
        }));
  StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
          return ScriptEngineService$WonderEditor.updateAttributeInAllScriptComponents(attributeName, attribute$1, param);
        }));
  return Curry._1(sendFunc, attribute$1);
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* setUndoValueToCopiedEngineStateForPromise */setUndoValueToCopiedEngineStateForPromise,
  /* _getAttributeNodeData */_getAttributeNodeData,
  /* _getDefaultFieldType */_getDefaultFieldType,
  /* _getDefaultFieldDefaultValue */_getDefaultFieldDefaultValue,
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
