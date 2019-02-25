

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as IdAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/IdAssetEditorService.js";
import * as MaterialNodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/MaterialNodeAssetService.js";
import * as OperateMaterialLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/material/OperateMaterialLogicService.js";
import * as OperateTreeAssetLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/asset/OperateTreeAssetLogicService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as MaterialNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/MaterialNodeAssetEditorService.js";
import * as OperateLightMaterialLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/material/OperateLightMaterialLogicService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(param, _, _$1) {
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = StateLogicService$WonderEditor.getEditorState(IdAssetEditorService$WonderEditor.generateNodeId);
  var editorState = match[0];
  var targetTreeNode = OperateTreeAssetEditorService$WonderEditor.unsafeGetSelectedFolderNodeInAssetTree(editorState);
  var materialName = OperateTreeAssetLogicService$WonderEditor.getUniqueNodeName(OperateMaterialLogicService$WonderEditor.getNewMaterilaName(/* () */0), targetTreeNode, engineState);
  var match$1 = OperateLightMaterialLogicService$WonderEditor.createLightMaterialAndSetName(materialName, engineState);
  var editorState$1 = MaterialNodeAssetEditorService$WonderEditor.addMaterialNodeToAssetTree(targetTreeNode, MaterialNodeAssetService$WonderEditor.buildNode(match[1], /* LightMaterial */1, match$1[0]), editorState);
  OperateTreeAssetEditorService$WonderEditor.unsafeGetSelectedFolderNodeInAssetTree(editorState$1);
  StateEditorService$WonderEditor.setState(editorState$1);
  Curry._1(param[1], [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* Project */4]]
      ]);
  return /* () */0;
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* handleSelfLogic */handleSelfLogic
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      handleSelfLogic,
      setUndoValueToCopiedEngineState
    ]);

export {
  CustomEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
