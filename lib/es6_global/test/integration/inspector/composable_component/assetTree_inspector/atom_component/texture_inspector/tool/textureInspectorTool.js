

import * as TextureWrapUtils$WonderEditor from "../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/assetTree_Inspector/atom_component/texture_Inspector/utils/TextureWrapUtils.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../src/service/state/editor/StateEditorService.js";
import * as TextureFilterUtils$WonderEditor from "../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/assetTree_Inspector/atom_component/texture_Inspector/utils/TextureFilterUtils.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as TextureNodeMapAssetEditorService$WonderEditor from "../../../../../../../../src/service/state/editor/asset/TextureNodeMapAssetEditorService.js";
import * as CurrentNodeDataAssetEditorService$WonderEditor from "../../../../../../../../src/service/state/editor/asset/CurrentNodeDataAssetEditorService.js";

function getWrapRepeatType(param) {
  return /* Repeat */2;
}

function getWrapMirroredRepeatType(param) {
  return /* Mirrored_repeat */1;
}

function getFilterLinearMipmapLinearType(param) {
  return /* Linear_mipmap_linear */5;
}

function getFilterNearestType(param) {
  return /* Nearest */0;
}

function getFilterNearestMipmapLinearType(param) {
  return /* Nearest_mipmap_linear */4;
}

function getTextureComponentFromCurrentNodeData(param) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  return SparseMapService$WonderCommonlib.unsafeGet(CurrentNodeDataAssetEditorService$WonderEditor.unsafeGetCurrentNodeData(editorState)[/* currentNodeId */0], TextureNodeMapAssetEditorService$WonderEditor.getTextureNodeMap(editorState))[/* textureComponent */0];
}

var changeWrapS = TextureWrapUtils$WonderEditor.changeWrapS;

var changeWrapT = TextureWrapUtils$WonderEditor.changeWrapT;

var changeMagFilter = TextureFilterUtils$WonderEditor.changeMagFilter;

var changeMinFilter = TextureFilterUtils$WonderEditor.changeMinFilter;

var getMagFilterOptions = TextureFilterUtils$WonderEditor.getMagFilterOptions;

var getMinFilterOptions = TextureFilterUtils$WonderEditor.getMinFilterOptions;

export {
  getWrapRepeatType ,
  getWrapMirroredRepeatType ,
  getFilterLinearMipmapLinearType ,
  getFilterNearestType ,
  getFilterNearestMipmapLinearType ,
  getTextureComponentFromCurrentNodeData ,
  changeWrapS ,
  changeWrapT ,
  changeMagFilter ,
  changeMinFilter ,
  getMagFilterOptions ,
  getMinFilterOptions ,
  
}
/* TextureWrapUtils-WonderEditor Not a pure module */
