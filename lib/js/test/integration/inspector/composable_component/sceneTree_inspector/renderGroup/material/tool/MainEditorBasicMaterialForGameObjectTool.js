'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var TestTool$WonderEditor = require("../../../../../../../tool/TestTool.js");
var MainEditorMaterial$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/ui/MainEditorMaterial.js");
var InspectorMaterialUtils$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/utils/InspectorMaterialUtils.js");
var MainEditorBasicMaterialForGameObject$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/composable_component/basic_material/ui/MainEditorBasicMaterialForGameObject.js");

function changeMaterialTypeToBeBasicMaterial($staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorMaterial$WonderEditor.Method[/* changeMaterialType */0], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* tuple */[
              /* LightMaterial */1,
              /* BasicMaterial */0
            ]);
}

function getColor(material) {
  return InspectorMaterialUtils$WonderEditor.getBasicMaterialColor(material, /* () */0);
}

function changeColor(material, color) {
  return MainEditorBasicMaterialForGameObject$WonderEditor.Method[/* changeColor */0](material, color);
}

function closeColorPicker(material, color, $staropt$star, $staropt$star$1, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : (function (param) {
        return /* () */0;
      });
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return Curry._3(MainEditorBasicMaterialForGameObject$WonderEditor.Method[/* closeColorPick */1], /* tuple */[
              uiState,
              dispatchFunc
            ], material, color);
}

exports.changeMaterialTypeToBeBasicMaterial = changeMaterialTypeToBeBasicMaterial;
exports.getColor = getColor;
exports.changeColor = changeColor;
exports.closeColorPicker = closeColorPicker;
/* TestTool-WonderEditor Not a pure module */
