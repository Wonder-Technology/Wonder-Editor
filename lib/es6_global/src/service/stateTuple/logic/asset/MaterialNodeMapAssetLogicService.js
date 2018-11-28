

import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as MainEditorMaterialUtils$WonderEditor from "../../../../core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/utils/MainEditorMaterialUtils.js";

function getMaterialBaseName(nodeId, engineState, materialNodeMap) {
  var match = SparseMapService$WonderCommonlib.unsafeGet(nodeId, materialNodeMap);
  return MainEditorMaterialUtils$WonderEditor.getName(match[/* materialComponent */2], match[/* type_ */1], engineState);
}

function setMaterialBaseName(nodeId, name, materialNodeMap, engineState) {
  var match = SparseMapService$WonderCommonlib.unsafeGet(nodeId, materialNodeMap);
  return MainEditorMaterialUtils$WonderEditor.setName(match[/* materialComponent */2], match[/* type_ */1], name, engineState);
}

export {
  getMaterialBaseName ,
  setMaterialBaseName ,
  
}
/* MainEditorMaterialUtils-WonderEditor Not a pure module */
