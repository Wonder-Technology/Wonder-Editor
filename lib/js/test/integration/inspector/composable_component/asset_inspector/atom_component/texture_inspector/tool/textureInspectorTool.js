'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var TestTool$WonderEditor = require("../../../../../../../tool/TestTool.js");
var OptionService$WonderEditor = require("../../../../../../../../src/service/primitive/OptionService.js");
var TextureInspector$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/texture_Inspector/ui/TextureInspector.js");
var StateLogicService$WonderEditor = require("../../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var StateEditorService$WonderEditor = require("../../../../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../../../../src/service/state/engine/state/StateEngineService.js");
var TextureFilterUtils$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/texture_Inspector/utils/TextureFilterUtils.js");
var TextureNodeAssetService$WonderEditor = require("../../../../../../../../src/service/record/editor/asset/TextureNodeAssetService.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");
var InspectorChangeTextureWrapSEventHandler$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/texture_Inspector/eventHandler/InspectorChangeTextureWrapSEventHandler.js");
var InspectorChangeTextureWrapTEventHandler$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/texture_Inspector/eventHandler/InspectorChangeTextureWrapTEventHandler.js");
var InspectorChangeTextureMagFilterEventHandler$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/texture_Inspector/eventHandler/InspectorChangeTextureMagFilterEventHandler.js");
var InspectorChangeTextureMinFilterEventHandler$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/texture_Inspector/eventHandler/InspectorChangeTextureMinFilterEventHandler.js");
var IMGUICustomImageTypeTextureNodeAssetEditorService$WonderEditor = require("../../../../../../../../src/service/state/editor/asset/textureNode/IMGUICustomImageTypeTextureNodeAssetEditorService.js");

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
  return TextureNodeAssetService$WonderEditor.getNodeData(OptionService$WonderEditor.unsafeGet(OperateTreeAssetEditorService$WonderEditor.getCurrentNode(editorState)))[/* textureComponent */2];
}

function changeWrapS(textureComponent, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(InspectorChangeTextureWrapSEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithTwoHandleFunc */3], /* tuple */[
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
  return Curry._3(InspectorChangeTextureWrapTEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithTwoHandleFunc */3], /* tuple */[
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
  return Curry._3(InspectorChangeTextureMagFilterEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithTwoHandleFunc */3], /* tuple */[
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
  return Curry._3(InspectorChangeTextureMinFilterEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithTwoHandleFunc */3], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* tuple */[
              textureComponent,
              value
            ]);
}

function changeType(nodeId, type_, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(TextureInspector$WonderEditor.Method[/* changeTextureType */7], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* tuple */[
              nodeId,
              type_
            ]);
}

function setCustomImageId(nodeId, $staropt$star, customImageId, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, param) {
  var textureContentIndex = $staropt$star !== undefined ? $staropt$star : StateLogicService$WonderEditor.getEditorState((function (param) {
            return IMGUICustomImageTypeTextureNodeAssetEditorService$WonderEditor.unsafeGetTextureContentIndex(nodeId, param);
          }));
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : TestTool$WonderEditor.getDispatch(/* () */0);
  if ($staropt$star$3 === undefined) {
    StateEditorService$WonderEditor.getState(/* () */0);
  }
  if ($staropt$star$4 === undefined) {
    StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  }
  return Curry._3(TextureInspector$WonderEditor.Method[/* _setCustomImageId */9], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* tuple */[
              nodeId,
              textureContentIndex,
              customImageId
            ]);
}

var IMGUICustomImageType = /* module */[/* setCustomImageId */setCustomImageId];

var getMagFilterOptions = TextureFilterUtils$WonderEditor.getMagFilterOptions;

var getMinFilterOptions = TextureFilterUtils$WonderEditor.getMinFilterOptions;

exports.getWrapClampType = getWrapClampType;
exports.getWrapRepeatType = getWrapRepeatType;
exports.getWrapMirroredRepeatType = getWrapMirroredRepeatType;
exports.getFilterLinearMipmapLinearType = getFilterLinearMipmapLinearType;
exports.getFilterNearestType = getFilterNearestType;
exports.getFilterNearestMipmapLinearType = getFilterNearestMipmapLinearType;
exports.getTextureComponentFromCurrentNodeData = getTextureComponentFromCurrentNodeData;
exports.changeWrapS = changeWrapS;
exports.changeWrapT = changeWrapT;
exports.changeMagFilter = changeMagFilter;
exports.changeMinFilter = changeMinFilter;
exports.getMagFilterOptions = getMagFilterOptions;
exports.getMinFilterOptions = getMinFilterOptions;
exports.changeType = changeType;
exports.IMGUICustomImageType = IMGUICustomImageType;
/* TestTool-WonderEditor Not a pure module */
