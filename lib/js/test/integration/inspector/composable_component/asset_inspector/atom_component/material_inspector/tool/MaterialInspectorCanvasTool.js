'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var OptionService$Wonderjs = require("wonder.js/lib/js/src/service/atom/OptionService.js");
var MaterialInspector$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/material_Inspector/ui/MaterialInspector.js");
var StateEditorService$WonderEditor = require("../../../../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../../../../src/service/state/engine/state/StateEngineService.js");
var InspectorEngineTool$WonderEditor = require("../../../../../../../tool/InspectorEngineTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../../../../../asset/tool/MainEditorAssetIdTool.js");
var MaterialInspectorTool$WonderEditor = require("./MaterialInspectorTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../../../../../asset/tool/MainEditorAssetTreeTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../../../../../asset/tool/MainEditorAssetUploadTool.js");
var LightMaterialEngineService$WonderEditor = require("../../../../../../../../src/service/state/engine/LightMaterialEngineService.js");
var StateInspectorEngineService$WonderEditor = require("../../../../../../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var MainEditorAssetTextureNodeTool$WonderEditor = require("../../../../../../asset/tool/MainEditorAssetTextureNodeTool.js");
var MainEditorAssetMaterialNodeTool$WonderEditor = require("../../../../../../asset/tool/MainEditorAssetMaterialNodeTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../../../../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");
var MainEditorLightMaterialForGameObjectTool$WonderEditor = require("../../../../sceneTree_inspector/renderGroup/material/tool/MainEditorLightMaterialForGameObjectTool.js");

function createNewMaterial(param) {
  MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
  var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
  var materialComponent = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId, undefined, /* () */0);
  return /* tuple */[
          addedMaterialNodeId,
          materialComponent
        ];
}

function judgeClonedAndSourceLightMaterialAttributeIsEqual(getAttributeFunc) {
  var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = createNewMaterial(/* () */0);
  var materialComponent = match[1];
  MaterialInspector$WonderEditor.Method[/* didMount */1](/* LightMaterial */1, materialComponent);
  var materialSphereLightMaterial = InspectorEngineTool$WonderEditor.getMaterialSphereLightMaterial(StateEditorService$WonderEditor.getState(/* () */0), inspectorEngineState);
  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Curry._2(getAttributeFunc, materialSphereLightMaterial, inspectorEngineState)), Curry._2(getAttributeFunc, materialComponent, engineState));
}

function judgeClonedAndSourceBasicMaterialAttributeIsEqual(getAttributeFunc) {
  var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = createNewMaterial(/* () */0);
  var materialComponent = match[1];
  MaterialInspectorTool$WonderEditor.changeMaterialType(materialComponent, /* LightMaterial */1, /* BasicMaterial */0, match[0], undefined, undefined, /* () */0);
  MaterialInspector$WonderEditor.Method[/* didMount */1](/* BasicMaterial */0, materialComponent);
  var materialSphereBasicMaterial = InspectorEngineTool$WonderEditor.getMaterialSphereBasicMaterial(StateEditorService$WonderEditor.getState(/* () */0), inspectorEngineState);
  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Curry._2(getAttributeFunc, materialSphereBasicMaterial, inspectorEngineState)), Curry._2(getAttributeFunc, materialComponent, engineState));
}

function judgeClonedAndSourceTextureAttributeIsEqual(getAttributeFunc) {
  var match = createNewMaterial(/* () */0);
  var materialComponent = match[1];
  return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                var textureComponent = MainEditorAssetTextureNodeTool$WonderEditor.getTextureComponent(uploadedTextureNodeId, editorState);
                MainEditorLightMaterialForGameObjectTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, materialComponent, uploadedTextureNodeId, /* () */0);
                MaterialInspector$WonderEditor.Method[/* didMount */1](/* LightMaterial */1, materialComponent);
                var materialSphereTextureComponent = OptionService$Wonderjs.unsafeGet(LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseMap(InspectorEngineTool$WonderEditor.getMaterialSphereLightMaterial(editorState, inspectorEngineState), inspectorEngineState));
                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Curry._2(getAttributeFunc, materialSphereTextureComponent, inspectorEngineState)), Curry._2(getAttributeFunc, textureComponent, engineState)));
              }));
}

exports.createNewMaterial = createNewMaterial;
exports.judgeClonedAndSourceLightMaterialAttributeIsEqual = judgeClonedAndSourceLightMaterialAttributeIsEqual;
exports.judgeClonedAndSourceBasicMaterialAttributeIsEqual = judgeClonedAndSourceBasicMaterialAttributeIsEqual;
exports.judgeClonedAndSourceTextureAttributeIsEqual = judgeClonedAndSourceTextureAttributeIsEqual;
/* Wonder_jest Not a pure module */
