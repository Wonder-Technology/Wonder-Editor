

import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as InspectorRenderGroupUtils$WonderEditor from "../../../../../utils/InspectorRenderGroupUtils.js";
import * as NodeNameAssetLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/asset/NodeNameAssetLogicService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/LightMaterialEngineService.js";
import * as OperateMaterialLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/material/OperateMaterialLogicService.js";
import * as MaterialNodeAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/MaterialNodeAssetEditorService.js";

function replaceMaterialByMaterialType(param, sourceMaterialType, targetMaterialType) {
  var sourceMaterial = param[1];
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = targetMaterialType ? LightMaterialEngineService$WonderEditor.create(engineState) : BasicMaterialEngineService$WonderEditor.create(engineState);
  var targetMaterial = match[1];
  var engineState$1 = InspectorRenderGroupUtils$WonderEditor.Dispose[/* disposeMaterialOrReplaceGameObjectsMaterialsOfTheMaterial */4](/* tuple */[
        /* tuple */[
          sourceMaterial,
          targetMaterial
        ],
        /* tuple */[
          sourceMaterialType,
          targetMaterialType
        ]
      ], match[0]);
  var editorState$1 = MaterialNodeAssetEditorService$WonderEditor.updateMaterialNodeData(param[0], targetMaterial, targetMaterialType, editorState);
  var engineState$2 = OperateMaterialLogicService$WonderEditor.setName(targetMaterial, targetMaterialType, NodeNameAssetLogicService$WonderEditor.getMaterialNodeName(sourceMaterial, sourceMaterialType, engineState$1), engineState$1);
  StateEditorService$WonderEditor.setState(editorState$1);
  return StateLogicService$WonderEditor.refreshEngineState(engineState$2);
}

export {
  replaceMaterialByMaterialType ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
