'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../../../../../../tool/TestTool.js");
var OptionService$WonderEditor = require("../../../../../../../../../src/service/primitive/OptionService.js");
var GameObjectTool$WonderEditor = require("../../../../../../../../tool/GameObjectTool.js");
var StateEditorService$WonderEditor = require("../../../../../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../../../../../src/service/state/engine/state/StateEngineService.js");
var InspectorCanvasTool$WonderEditor = require("../../../../tool/InspectorCanvasTool.js");
var InspectorEngineTool$WonderEditor = require("../../../../../../../../tool/InspectorEngineTool.js");
var TextureNodeAssetService$WonderEditor = require("../../../../../../../../../src/service/record/editor/asset/TextureNodeAssetService.js");
var MaterialNodeAssetService$WonderEditor = require("../../../../../../../../../src/service/record/editor/asset/MaterialNodeAssetService.js");
var MaterialInspectorCanvasTool$WonderEditor = require("../../tool/MaterialInspectorCanvasTool.js");
var StateInspectorEngineService$WonderEditor = require("../../../../../../../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var MaterialInspectorEngineUtils$WonderEditor = require("../../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/material_Inspector/utils/MaterialInspectorEngineUtils.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");
var MainEditorLightMaterialForAsset$WonderEditor = require("../../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/material_Inspector/atom_component/light_material/MainEditorLightMaterialForAsset.js");
var MaterialDragTextureEventHandlerUtils$WonderEditor = require("../../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/composable_component/utils/MaterialDragTextureEventHandlerUtils.js");
var LightMaterialDragTextureForAssetEventHandler$WonderEditor = require("../../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/material_Inspector/atom_component/light_material/eventHandler/LightMaterialDragTextureForAssetEventHandler.js");
var LightMaterialRemoveTextureForAssetEventHandler$WonderEditor = require("../../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/material_Inspector/atom_component/light_material/eventHandler/LightMaterialRemoveTextureForAssetEventHandler.js");
var BasicSourceTextureImageDataMapAssetEditorService$WonderEditor = require("../../../../../../../../../src/service/state/editor/asset/imageDataMap/BasicSourceTextureImageDataMapAssetEditorService.js");

function prepareMaterialSphere(inspectorEngineState) {
  var match = MaterialInspectorCanvasTool$WonderEditor.createNewMaterial(/* () */0);
  var newMaterialComponent = match[1];
  var match$1 = MaterialInspectorEngineUtils$WonderEditor.createMaterialSphereIntoInspectorCanvas(/* LightMaterial */1, newMaterialComponent, StateEditorService$WonderEditor.getState(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0), inspectorEngineState);
  var inspectorEngineState$1 = match$1[1][0];
  StateEditorService$WonderEditor.setState(match$1[0]);
  var materialSphereLightMaterial = InspectorEngineTool$WonderEditor.getMaterialSphereLightMaterial(StateEditorService$WonderEditor.getState(/* () */0), inspectorEngineState$1);
  return /* tuple */[
          inspectorEngineState$1,
          materialSphereLightMaterial,
          newMaterialComponent,
          match[0]
        ];
}

function prepareInspectorMaterialSphereAndImgCanvas(sandbox, $staropt$star, $staropt$star$1, param) {
  var inspectorCanvasWidth = $staropt$star !== undefined ? $staropt$star : 300;
  var inspectorCanvasHeight = $staropt$star$1 !== undefined ? $staropt$star$1 : 300;
  var match = InspectorCanvasTool$WonderEditor.prepareInspectorAndImgCanvas(sandbox, inspectorCanvasWidth, inspectorCanvasHeight, /* () */0);
  var match$1 = match[1];
  var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match$2 = prepareMaterialSphere(inspectorEngineState);
  StateInspectorEngineService$WonderEditor.setState(match$2[0]);
  return /* tuple */[
          match$2[3],
          match$2[2],
          match[0],
          /* tuple */[
            match$1[0],
            match$1[1]
          ]
        ];
}

function changeShininess($staropt$star, value, param) {
  var material = $staropt$star !== undefined ? $staropt$star : GameObjectTool$WonderEditor.getCurrentSceneTreeNodeMaterial(/* () */0);
  return MainEditorLightMaterialForAsset$WonderEditor.Method[/* changeShininess */1](material, value);
}

function changeColor(material, color) {
  return MainEditorLightMaterialForAsset$WonderEditor.Method[/* changeColor */0](material, color);
}

function closeColorPicker(material, currentNodeId, color, $staropt$star, $staropt$star$1, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : (function (param) {
        return /* () */0;
      });
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return Curry._3(MainEditorLightMaterialForAsset$WonderEditor.Method[/* closeColorPick */2], /* tuple */[
              uiState,
              dispatchFunc
            ], /* tuple */[
              material,
              currentNodeId
            ], color);
}

function blurShininess($staropt$star, $staropt$star$1, $staropt$star$2, currentNodeId, value, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : (function (param) {
        return /* () */0;
      });
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var material = $staropt$star$2 !== undefined ? $staropt$star$2 : GameObjectTool$WonderEditor.getCurrentSceneTreeNodeMaterial(/* () */0);
  return MainEditorLightMaterialForAsset$WonderEditor.Method[/* blurShininessEvent */3](/* tuple */[
              uiState,
              dispatchFunc
            ], /* tuple */[
              material,
              currentNodeId
            ], value);
}

function dragAssetTextureToMap(currentNodeId, textureNodeId, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var material = $staropt$star$2 !== undefined ? $staropt$star$2 : GameObjectTool$WonderEditor.getCurrentSceneTreeNodeMaterial(/* () */0);
  return Curry._3(MainEditorLightMaterialForAsset$WonderEditor.Method[/* dragToSetLightMaterialTexture */4], /* tuple */[
              uiState,
              dispatchFunc
            ], /* tuple */[
              material,
              currentNodeId
            ], TextureNodeAssetService$WonderEditor.buildNode(textureNodeId, undefined, /* BasicSource */0, -1, -1));
}

function dragAssetTextureToMapNotCreateImgCanvasSnapshot(textureNodeId, material, $staropt$star, $staropt$star$1, param) {
  var dispatchFunc = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : TestTool$WonderEditor.getDispatch(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return MaterialDragTextureEventHandlerUtils$WonderEditor.handleSelfLogic(/* tuple */[
              uiState,
              dispatchFunc
            ], material, textureNodeId, LightMaterialDragTextureForAssetEventHandler$WonderEditor.CustomEventHandler[/* _handleSetMap */2]);
}

function removeTexture(currentNodeId, material, $staropt$star, $staropt$star$1, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return Curry._3(LightMaterialRemoveTextureForAssetEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
              uiState,
              dispatchFunc
            ], currentNodeId, material);
}

function judgeImgCanvasSnapshotIsStoreInImageDataMap(addedMaterialNodeId, imgCanvasFakeBase64Str) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = MaterialNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(addedMaterialNodeId, editorState));
  var param = BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.unsafeGetData(match[/* snapshotImageDataIndex */2], editorState);
  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(param[/* base64 */0])), imgCanvasFakeBase64Str);
}

exports.prepareMaterialSphere = prepareMaterialSphere;
exports.prepareInspectorMaterialSphereAndImgCanvas = prepareInspectorMaterialSphereAndImgCanvas;
exports.changeShininess = changeShininess;
exports.changeColor = changeColor;
exports.closeColorPicker = closeColorPicker;
exports.blurShininess = blurShininess;
exports.dragAssetTextureToMap = dragAssetTextureToMap;
exports.dragAssetTextureToMapNotCreateImgCanvasSnapshot = dragAssetTextureToMapNotCreateImgCanvasSnapshot;
exports.removeTexture = removeTexture;
exports.judgeImgCanvasSnapshotIsStoreInImageDataMap = judgeImgCanvasSnapshotIsStoreInImageDataMap;
/* Wonder_jest Not a pure module */
