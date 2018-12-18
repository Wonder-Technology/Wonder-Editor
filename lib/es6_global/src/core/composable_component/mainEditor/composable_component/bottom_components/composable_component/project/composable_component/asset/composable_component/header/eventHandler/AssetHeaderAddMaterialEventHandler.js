

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../../ui/store/AppStore.js";
import * as AssetIdUtils$WonderEditor from "../../../utils/AssetIdUtils.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as AssetTreeUtils$WonderEditor from "../../utils/AssetTreeUtils.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/StateEngineService.js";
import * as AddMaterialNodeUtils$WonderEditor from "../../utils/AddMaterialNodeUtils.js";
import * as MainEditorMaterialUtils$WonderEditor from "../../../../../../../../inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/utils/MainEditorMaterialUtils.js";
import * as OperateLightMaterialLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/OperateLightMaterialLogicService.js";
import * as IterateAssetTreeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/IterateAssetTreeAssetEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(param, param$1, param$2) {
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = StateLogicService$WonderEditor.getEditorState(AssetIdUtils$WonderEditor.generateAssetId);
  var editorState = match[0];
  var targetTreeNodeId = AssetTreeUtils$WonderEditor.getTargetTreeNodeId(editorState);
  var materialName = IterateAssetTreeAssetEditorService$WonderEditor.getUniqueTreeNodeName(MainEditorMaterialUtils$WonderEditor.getNewMaterilaName(/* () */0), /* Material */3, targetTreeNodeId, /* tuple */[
        editorState,
        engineState
      ]);
  var match$1 = OperateLightMaterialLogicService$WonderEditor.createLightMaterialAndSetName(materialName, engineState);
  var editorState$1 = AddMaterialNodeUtils$WonderEditor.addMaterialNodeToAssetTree(match$1[0], /* tuple */[
        targetTreeNodeId,
        match[1]
      ], editorState);
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
