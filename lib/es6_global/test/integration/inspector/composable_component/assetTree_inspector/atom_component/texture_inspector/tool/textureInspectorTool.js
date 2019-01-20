

import * as OptionService$WonderEditor from "../../../../../../../../src/service/primitive/OptionService.js";
import * as TextureWrapUtils$WonderEditor from "../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/assetTree_Inspector/atom_component/texture_Inspector/utils/TextureWrapUtils.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../src/service/state/editor/StateEditorService.js";
import * as TextureFilterUtils$WonderEditor from "../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/assetTree_Inspector/atom_component/texture_Inspector/utils/TextureFilterUtils.js";
import * as TextureNodeAssetService$WonderEditor from "../../../../../../../../src/service/record/editor/asset/TextureNodeAssetService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js";

function getWrapRepeatType() {
  return /* Repeat */2;
}

function getWrapMirroredRepeatType() {
  return /* Mirrored_repeat */1;
}

function getFilterLinearMipmapLinearType() {
  return /* Linear_mipmap_linear */5;
}

function getFilterNearestType() {
  return /* Nearest */0;
}

function getFilterNearestMipmapLinearType() {
  return /* Nearest_mipmap_linear */4;
}

function getTextureComponentFromCurrentNodeData() {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  return TextureNodeAssetService$WonderEditor.getNodeData(OptionService$WonderEditor.unsafeGet(OperateTreeAssetEditorService$WonderEditor.getCurrentNode(editorState)))[/* textureComponent */0];
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
/* OptionService-WonderEditor Not a pure module */
