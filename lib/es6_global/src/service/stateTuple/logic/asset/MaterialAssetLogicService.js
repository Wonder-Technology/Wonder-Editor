

import * as BasicMaterialEngineService$WonderEditor from "../../../state/engine/BasicMaterialEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../state/engine/LightMaterialEngineService.js";
import * as MaterialDataAssetEditorService$WonderEditor from "../../../state/editor/asset/MaterialDataAssetEditorService.js";

function isDefaultBasicMaterial(material, defaultMaterialName, engineState) {
  return BasicMaterialEngineService$WonderEditor.getBasicMaterialName(material, engineState) === defaultMaterialName;
}

function isDefaultLightMaterial(material, defaultMaterialName, engineState) {
  return LightMaterialEngineService$WonderEditor.getLightMaterialName(material, engineState) === defaultMaterialName;
}

function isDefaultMaterial(material, type_, param) {
  var engineState = param[1];
  var editorState = param[0];
  if (type_) {
    var __x = MaterialDataAssetEditorService$WonderEditor.unsafeGetDefaultLightMaterial(editorState);
    return isDefaultLightMaterial(material, LightMaterialEngineService$WonderEditor.getLightMaterialName(__x, engineState), engineState);
  } else {
    var __x$1 = MaterialDataAssetEditorService$WonderEditor.unsafeGetDefaultBasicMaterial(editorState);
    return isDefaultBasicMaterial(material, BasicMaterialEngineService$WonderEditor.getBasicMaterialName(__x$1, engineState), engineState);
  }
}

export {
  isDefaultBasicMaterial ,
  isDefaultLightMaterial ,
  isDefaultMaterial ,
  
}
/* BasicMaterialEngineService-WonderEditor Not a pure module */
