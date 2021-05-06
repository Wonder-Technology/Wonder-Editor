'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var TestTool$WonderEditor = require("../../../../../../../tool/TestTool.js");
var MainEditorPointLight$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/composable_component/point_light/ui/MainEditorPointLight.js");
var GameObjectLogicService$WonderEditor = require("../../../../../../../../src/service/stateTuple/logic/GameObjectLogicService.js");
var GameObjectEngineService$WonderEditor = require("../../../../../../../../src/service/state/engine/gameObject/GameObjectEngineService.js");
var PointLightEngineService$WonderEditor = require("../../../../../../../../src/service/state/engine/PointLightEngineService.js");
var MainEditorPointLightUtils$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/composable_component/point_light/utils/MainEditorPointLightUtils.js");

function getColor(material) {
  return MainEditorPointLight$WonderEditor.Method[/* getColor */0](material, /* () */0);
}

function changeColor(light, color) {
  return MainEditorPointLight$WonderEditor.Method[/* changeColor */1](light, color);
}

function closeColorPicker(light, color, $staropt$star, $staropt$star$1, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : (function (param) {
        return /* () */0;
      });
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return Curry._3(MainEditorPointLight$WonderEditor.Method[/* closeColorPick */2], /* tuple */[
              uiState,
              dispatchFunc
            ], light, color);
}

var changeIntensity = MainEditorPointLightUtils$WonderEditor.changeIntensity;

function blurIntensity(light, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return MainEditorPointLightUtils$WonderEditor.blurIntensityEvent(/* tuple */[
              uiState,
              dispatchFunc
            ], light, value);
}

function changeIntensityAndBlur(light, sourceValue, targetValue, param) {
  MainEditorPointLightUtils$WonderEditor.changeIntensity(light, targetValue);
  return blurIntensity(light, sourceValue, undefined, undefined, /* () */0);
}

var changeConstant = MainEditorPointLightUtils$WonderEditor.changeConstant;

function blurConstant(light, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return MainEditorPointLightUtils$WonderEditor.blurConstantEvent(/* tuple */[
              uiState,
              dispatchFunc
            ], light, value);
}

function changeConstantAndBlur(light, sourceValue, targetValue, param) {
  MainEditorPointLightUtils$WonderEditor.changeConstant(light, targetValue);
  return blurConstant(light, sourceValue, undefined, undefined, /* () */0);
}

var changeLinear = MainEditorPointLightUtils$WonderEditor.changeLinear;

function blurLinear(light, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return MainEditorPointLightUtils$WonderEditor.blurLinearEvent(/* tuple */[
              uiState,
              dispatchFunc
            ], light, value);
}

function changeLinearAndBlur(light, sourceValue, targetValue, param) {
  MainEditorPointLightUtils$WonderEditor.changeLinear(light, targetValue);
  return blurLinear(light, sourceValue, undefined, undefined, /* () */0);
}

var changeQuadratic = MainEditorPointLightUtils$WonderEditor.changeQuadratic;

function blurQuadratic(light, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return MainEditorPointLightUtils$WonderEditor.blurQuadraticEvent(/* tuple */[
              uiState,
              dispatchFunc
            ], light, value);
}

function changeQuadraticAndBlur(light, sourceValue, targetValue, param) {
  MainEditorPointLightUtils$WonderEditor.changeQuadratic(light, targetValue);
  return blurQuadratic(light, sourceValue, undefined, undefined, /* () */0);
}

var changeRange = MainEditorPointLightUtils$WonderEditor.changeRange;

function blurRange(light, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return MainEditorPointLightUtils$WonderEditor.blurRangeEvent(/* tuple */[
              uiState,
              dispatchFunc
            ], light, value);
}

function changeRangeAndBlur(light, sourceValue, targetValue, param) {
  MainEditorPointLightUtils$WonderEditor.changeRange(light, targetValue);
  return blurRange(light, sourceValue, undefined, undefined, /* () */0);
}

function createPointLight(editorState, engineState) {
  var match = GameObjectLogicService$WonderEditor.createGameObject(/* tuple */[
        editorState,
        engineState
      ]);
  var match$1 = match[1];
  var obj = match$1[1];
  var match$2 = PointLightEngineService$WonderEditor.create(match$1[0]);
  var engineState$1 = GameObjectEngineService$WonderEditor.setGameObjectName("Point Light", obj, match$2[0]);
  var match$3 = GameObjectLogicService$WonderEditor.addPointLight(obj, match$2[1], /* tuple */[
        match[0],
        engineState$1
      ]);
  return /* tuple */[
          match$3[0],
          match$3[1],
          obj
        ];
}

exports.getColor = getColor;
exports.changeColor = changeColor;
exports.closeColorPicker = closeColorPicker;
exports.changeIntensity = changeIntensity;
exports.blurIntensity = blurIntensity;
exports.changeIntensityAndBlur = changeIntensityAndBlur;
exports.changeConstant = changeConstant;
exports.blurConstant = blurConstant;
exports.changeConstantAndBlur = changeConstantAndBlur;
exports.changeLinear = changeLinear;
exports.blurLinear = blurLinear;
exports.changeLinearAndBlur = changeLinearAndBlur;
exports.changeQuadratic = changeQuadratic;
exports.blurQuadratic = blurQuadratic;
exports.changeQuadraticAndBlur = changeQuadraticAndBlur;
exports.changeRange = changeRange;
exports.blurRange = blurRange;
exports.changeRangeAndBlur = changeRangeAndBlur;
exports.createPointLight = createPointLight;
/* TestTool-WonderEditor Not a pure module */
