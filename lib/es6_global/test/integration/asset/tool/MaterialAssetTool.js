

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as MainEditorAssetIdTool$WonderEditor from "./MainEditorAssetIdTool.js";
import * as MaterialInspectorTool$WonderEditor from "../../inspector/composable_component/assetTree_inspector/atom_component/material_inspector/tool/MaterialInspectorTool.js";
import * as MainEditorAssetTreeTool$WonderEditor from "./MainEditorAssetTreeTool.js";
import * as MainEditorAssetMaterialNodeTool$WonderEditor from "./MainEditorAssetMaterialNodeTool.js";
import * as MainEditorAssetHeaderOperateNodeTool$WonderEditor from "./MainEditorAssetHeaderOperateNodeTool.js";

function addOneLightMaterial(param) {
  Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */3][/* buildOneMaterialAssetTree */0], /* () */0);
  var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
  return addedMaterialNodeId;
}

function addOneBasicMaterial(param) {
  Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */3][/* buildOneMaterialAssetTree */0], /* () */0);
  var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
  var materialComponent = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId, undefined, /* () */0);
  MaterialInspectorTool$WonderEditor.changeMaterialType(materialComponent, /* LightMaterial */1, /* BasicMaterial */0, addedMaterialNodeId, undefined, undefined, /* () */0);
  return addedMaterialNodeId;
}

export {
  addOneLightMaterial ,
  addOneBasicMaterial ,
  
}
/* MainEditorAssetIdTool-WonderEditor Not a pure module */
