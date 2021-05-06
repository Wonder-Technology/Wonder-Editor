'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var TestTool$WonderEditor = require("../../../../../../../tool/TestTool.js");
var BaseEventTool$WonderEditor = require("../../../../../../../tool/ui/BaseEventTool.js");
var GameObjectTool$WonderEditor = require("../../../../../../../tool/GameObjectTool.js");
var AssetWidgetService$WonderEditor = require("../../../../../../../../src/service/record/editor/widget/AssetWidgetService.js");
var MainEditorMaterial$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/ui/MainEditorMaterial.js");
var InspectorMaterialUtils$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/utils/InspectorMaterialUtils.js");
var TextureNodeAssetService$WonderEditor = require("../../../../../../../../src/service/record/editor/asset/TextureNodeAssetService.js");
var MainEditorLightMaterialForGameObject$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/composable_component/light_material/ui/MainEditorLightMaterialForGameObject.js");

function changeMaterialTypeToBeLightMaterial($staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorMaterial$WonderEditor.Method[/* changeMaterialType */0], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* tuple */[
              /* BasicMaterial */0,
              /* LightMaterial */1
            ]);
}

function changeShininess($staropt$star, value, param) {
  var material = $staropt$star !== undefined ? $staropt$star : GameObjectTool$WonderEditor.getCurrentSceneTreeNodeMaterial(/* () */0);
  return MainEditorLightMaterialForGameObject$WonderEditor.Method[/* changeShininess */1](material, value);
}

function blurShininess($staropt$star, $staropt$star$1, $staropt$star$2, value, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : (function (param) {
        return /* () */0;
      });
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var material = $staropt$star$2 !== undefined ? $staropt$star$2 : GameObjectTool$WonderEditor.getCurrentSceneTreeNodeMaterial(/* () */0);
  return MainEditorLightMaterialForGameObject$WonderEditor.Method[/* blurShininessEvent */3](/* tuple */[
              uiState,
              dispatchFunc
            ], material, value);
}

function getColor(material) {
  return InspectorMaterialUtils$WonderEditor.getLightMaterialColor(material, /* () */0);
}

function changeColor(material, color) {
  return MainEditorLightMaterialForGameObject$WonderEditor.Method[/* changeColor */0](material, color);
}

function closeColorPicker(material, color, $staropt$star, $staropt$star$1, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : (function (param) {
        return /* () */0;
      });
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return Curry._3(MainEditorLightMaterialForGameObject$WonderEditor.Method[/* closeColorPick */2], /* tuple */[
              uiState,
              dispatchFunc
            ], material, color);
}

function dragAssetTextureToMap($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, textureNodeId, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : (function (param) {
        return /* () */0;
      });
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  if ($staropt$star$2 === undefined) {
    AssetWidgetService$WonderEditor.getWidget(/* () */0);
  }
  if ($staropt$star$4 !== undefined) {
    Caml_option.valFromOption($staropt$star$4);
  } else {
    document.createElement("img");
  }
  if ($staropt$star$5 !== undefined) {
    Caml_option.valFromOption($staropt$star$5);
  } else {
    BaseEventTool$WonderEditor.buildDragEvent();
  }
  var material = $staropt$star$6 !== undefined ? $staropt$star$6 : GameObjectTool$WonderEditor.getCurrentSceneTreeNodeMaterial(/* () */0);
  return Curry._3(MainEditorLightMaterialForGameObject$WonderEditor.Method[/* dragToSetLightMaterialTexture */4], /* tuple */[
              uiState,
              dispatchFunc
            ], material, TextureNodeAssetService$WonderEditor.buildNode(textureNodeId, undefined, /* BasicSource */0, -1, -1));
}

var Drag = /* module */[/* dragAssetTextureToMap */dragAssetTextureToMap];

exports.changeMaterialTypeToBeLightMaterial = changeMaterialTypeToBeLightMaterial;
exports.changeShininess = changeShininess;
exports.blurShininess = blurShininess;
exports.getColor = getColor;
exports.changeColor = changeColor;
exports.closeColorPicker = closeColorPicker;
exports.Drag = Drag;
/* TestTool-WonderEditor Not a pure module */
