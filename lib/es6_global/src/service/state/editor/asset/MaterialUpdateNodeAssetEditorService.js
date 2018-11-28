

import * as MaterialNodeMapAssetEditorService$WonderEditor from "./MaterialNodeMapAssetEditorService.js";
import * as MaterialNodeIdMapAssetEditorService$WonderEditor from "./MaterialNodeIdMapAssetEditorService.js";

function updateMaterialNodeData(materialNodeId, targetMaterial, targetMaterialType, editorState) {
  var materialNodeResult = MaterialNodeMapAssetEditorService$WonderEditor.unsafeGetResult(materialNodeId, editorState);
  return MaterialNodeIdMapAssetEditorService$WonderEditor.setNodeId(targetMaterial, materialNodeId, MaterialNodeMapAssetEditorService$WonderEditor.setResult(materialNodeId, /* record */[
                  /* parentFolderNodeId */materialNodeResult[/* parentFolderNodeId */0],
                  /* type_ */targetMaterialType,
                  /* materialComponent */targetMaterial
                ], editorState));
}

export {
  updateMaterialNodeData ,
  
}
/* MaterialNodeMapAssetEditorService-WonderEditor Not a pure module */
