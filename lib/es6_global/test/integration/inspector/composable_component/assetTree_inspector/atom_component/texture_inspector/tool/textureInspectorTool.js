

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as TestTool$WonderEditor from "../../../../../../../tool/TestTool.js";
import * as OptionService$WonderEditor from "../../../../../../../../src/service/primitive/OptionService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../src/service/state/editor/StateEditorService.js";
import * as TextureFilterUtils$WonderEditor from "../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/assetTree_Inspector/atom_component/texture_Inspector/utils/TextureFilterUtils.js";
import * as TextureNodeAssetService$WonderEditor from "../../../../../../../../src/service/record/editor/asset/TextureNodeAssetService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as InspectorChangeTextureWrapSEventHandler$WonderEditor from "../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/assetTree_Inspector/atom_component/texture_Inspector/eventHandler/InspectorChangeTextureWrapSEventHandler.js";
import * as InspectorChangeTextureWrapTEventHandler$WonderEditor from "../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/assetTree_Inspector/atom_component/texture_Inspector/eventHandler/InspectorChangeTextureWrapTEventHandler.js";
import * as InspectorChangeTextureMagFilterEventHandler$WonderEditor from "../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/assetTree_Inspector/atom_component/texture_Inspector/eventHandler/InspectorChangeTextureMagFilterEventHandler.js";
import * as InspectorChangeTextureMinFilterEventHandler$WonderEditor from "../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/assetTree_Inspector/atom_component/texture_Inspector/eventHandler/InspectorChangeTextureMinFilterEventHandler.js";

function getWrapClampType(param) {
  return /* Clamp_to_edge */0;
}

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
  return TextureNodeAssetService$WonderEditor.getNodeData(OptionService$WonderEditor.unsafeGet(OperateTreeAssetEditorService$WonderEditor.getCurrentNode(editorState)))[/* textureComponent */0];
}

function changeWrapS(textureComponent, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(InspectorChangeTextureWrapSEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithTwoHandleFunc */2], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* tuple */[
              textureComponent,
              value
            ]);
}

function changeWrapT(textureComponent, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(InspectorChangeTextureWrapTEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithTwoHandleFunc */2], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* tuple */[
              textureComponent,
              value
            ]);
}

function changeMagFilter(textureComponent, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(InspectorChangeTextureMagFilterEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithTwoHandleFunc */2], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* tuple */[
              textureComponent,
              value
            ]);
}

function changeMinFilter(textureComponent, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(InspectorChangeTextureMinFilterEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithTwoHandleFunc */2], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* tuple */[
              textureComponent,
              value
            ]);
}

var getMagFilterOptions = TextureFilterUtils$WonderEditor.getMagFilterOptions;

var getMinFilterOptions = TextureFilterUtils$WonderEditor.getMinFilterOptions;

export {
  getWrapClampType ,
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
/* TestTool-WonderEditor Not a pure module */
