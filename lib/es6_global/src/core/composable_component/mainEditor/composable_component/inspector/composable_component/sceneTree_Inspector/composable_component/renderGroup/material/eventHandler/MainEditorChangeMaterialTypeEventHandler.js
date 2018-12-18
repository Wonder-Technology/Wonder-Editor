

import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/scene/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/StateEngineService.js";
import * as MainEditorMaterialUtils$WonderEditor from "../utils/MainEditorMaterialUtils.js";
import * as InspectorRenderGroupUtils$WonderEditor from "../../../../../../utils/InspectorRenderGroupUtils.js";
import * as MaterialNodeIdMapAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/MaterialNodeIdMapAssetEditorService.js";
import * as MaterialUpdateNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/MaterialUpdateNodeAssetEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function _updateMaterialNodeData(sourceMaterial, targetMaterial, targetMaterialType, editorState) {
  var match = MaterialNodeIdMapAssetEditorService$WonderEditor.getNodeId(sourceMaterial, editorState);
  if (match !== undefined) {
    return MaterialUpdateNodeAssetEditorService$WonderEditor.updateMaterialNodeData(match, targetMaterial, targetMaterialType, editorState);
  } else {
    return editorState;
  }
}

function _replaceSourceMaterialWithItsAllGameObjects(gameObjects, materialData, engineState) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, gameObject) {
                return InspectorRenderGroupUtils$WonderEditor.Remove[/* replaceMaterialByMaterialData */2](gameObject, materialData, engineState);
              }), engineState, gameObjects);
}

function handleSelfLogic(param, param$1, param$2) {
  var targetMaterialType = param$2[1];
  var sourceMaterialType = param$2[0];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var gameObject = SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState);
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
  var engineState$3 = MainEditorMaterialUtils$WonderEditor.setName(targetMaterial, targetMaterialType, MainEditorMaterialUtils$WonderEditor.getName(sourceMaterial, sourceMaterialType, engineState$2), engineState$2);
  StateLogicService$WonderEditor.refreshEngineState(engineState$3);
  StateEditorService$WonderEditor.setState(_updateMaterialNodeData(sourceMaterial, targetMaterial, targetMaterialType, editorState));
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
