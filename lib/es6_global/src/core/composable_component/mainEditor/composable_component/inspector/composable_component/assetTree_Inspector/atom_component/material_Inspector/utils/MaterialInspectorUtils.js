

import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/StateEngineService.js";
import * as MainEditorMaterialUtils$WonderEditor from "../../../../sceneTree_Inspector/composable_component/renderGroup/material/utils/MainEditorMaterialUtils.js";
import * as InspectorRenderGroupUtils$WonderEditor from "../../../../../utils/InspectorRenderGroupUtils.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/LightMaterialEngineService.js";
import * as MaterialUpdateNodeAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/MaterialUpdateNodeAssetEditorService.js";

function replaceMaterialByMaterialType(param, sourceMaterialType, targetMaterialType) {
  var sourceMaterial = param[1];
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = targetMaterialType ? LightMaterialEngineService$WonderEditor.create(engineState) : BasicMaterialEngineService$WonderEditor.create(engineState);
  var targetMaterial = match[1];
  var engineState$1 = InspectorRenderGroupUtils$WonderEditor.Dispose[/* replaceGameObjectsMaterialsOfTheMaterial */3](/* tuple */[
        /* tuple */[
          sourceMaterial,
          targetMaterial
        ],
        /* tuple */[
          sourceMaterialType,
          targetMaterialType
        ]
      ], match[0]);
  var editorState$1 = MaterialUpdateNodeAssetEditorService$WonderEditor.updateMaterialNodeData(param[0], targetMaterial, targetMaterialType, editorState);
  var engineState$2 = MainEditorMaterialUtils$WonderEditor.setName(targetMaterial, targetMaterialType, MainEditorMaterialUtils$WonderEditor.getName(sourceMaterial, sourceMaterialType, engineState$1), engineState$1);
  StateEditorService$WonderEditor.setState(editorState$1);
  return StateLogicService$WonderEditor.refreshEngineState(engineState$2);
}

export {
  replaceMaterialByMaterialType ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
