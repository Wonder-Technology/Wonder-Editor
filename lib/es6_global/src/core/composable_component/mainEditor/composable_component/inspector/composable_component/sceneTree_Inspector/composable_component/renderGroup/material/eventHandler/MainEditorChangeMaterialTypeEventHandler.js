

import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as NodeAssetService$WonderEditor from "../../../../../../../../../../../service/record/editor/asset/NodeAssetService.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/StateEngineService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as MainEditorMaterialUtils$WonderEditor from "../utils/MainEditorMaterialUtils.js";
import * as InspectorRenderGroupUtils$WonderEditor from "../../../../../../utils/InspectorRenderGroupUtils.js";
import * as NodeNameAssetLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/asset/NodeNameAssetLogicService.js";
import * as OperateMaterialLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/material/OperateMaterialLogicService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as MaterialNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/MaterialNodeAssetEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function _updateMaterialNodeData(sourceMaterial, sourceMaterialType, targetMaterial, targetMaterialType, editorState) {
  var match = OperateTreeAssetEditorService$WonderEditor.findMaterialNode(sourceMaterial, sourceMaterialType, editorState);
  if (match !== undefined) {
    return MaterialNodeAssetEditorService$WonderEditor.updateMaterialNodeData(NodeAssetService$WonderEditor.getNodeId(match), targetMaterial, targetMaterialType, editorState);
  } else {
    return editorState;
  }
}

function _replaceSourceMaterialWithItsAllGameObjects(gameObjects, materialData, engineState) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, gameObject) {
                return InspectorRenderGroupUtils$WonderEditor.Remove[/* replaceMaterialByMaterialData */2](gameObject, materialData, engineState);
              }), engineState, gameObjects);
}

function handleSelfLogic(param, _, param$1) {
  var targetMaterialType = param$1[1];
  var sourceMaterialType = param$1[0];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var gameObject = SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState);
  var sourceMaterial = MainEditorMaterialUtils$WonderEditor.getMaterialComponentByType(gameObject, sourceMaterialType, engineState);
  var match = MainEditorMaterialUtils$WonderEditor.createMaterialByType(targetMaterialType, engineState);
  var targetMaterial = match[1];
  var engineState$1 = match[0];
  var gameObjects = MainEditorMaterialUtils$WonderEditor.unsafeGetGameObjectsByType(sourceMaterial, sourceMaterialType, engineState$1).slice();
  var engineState$2 = _replaceSourceMaterialWithItsAllGameObjects(gameObjects, /* tuple */[
        /* tuple */[
          sourceMaterial,
          targetMaterial
        ],
        /* tuple */[
          sourceMaterialType,
          targetMaterialType
        ]
      ], engineState$1);
  var engineState$3 = OperateMaterialLogicService$WonderEditor.setName(targetMaterial, targetMaterialType, NodeNameAssetLogicService$WonderEditor.getMaterialNodeName(sourceMaterial, sourceMaterialType, engineState$2), engineState$2);
  StateLogicService$WonderEditor.refreshEngineState(engineState$3);
  StateEditorService$WonderEditor.setState(_updateMaterialNodeData(sourceMaterial, sourceMaterialType, targetMaterial, targetMaterialType, editorState));
  Curry._1(param[1], [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* Inspector */2]]
      ]);
  return /* () */0;
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* _updateMaterialNodeData */_updateMaterialNodeData,
  /* _replaceSourceMaterialWithItsAllGameObjects */_replaceSourceMaterialWithItsAllGameObjects,
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
