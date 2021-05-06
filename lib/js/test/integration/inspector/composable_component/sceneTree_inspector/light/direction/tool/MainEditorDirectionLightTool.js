'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var TestTool$WonderEditor = require("../../../../../../../tool/TestTool.js");
var MainEditorDirectionLight$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/composable_component/direction_light/ui/MainEditorDirectionLight.js");

function getColor(material) {
  return MainEditorDirectionLight$WonderEditor.Method[/* getColor */0](material, /* () */0);
}

function changeColor(light, color) {
  return MainEditorDirectionLight$WonderEditor.Method[/* changeColor */1](light, color);
}

function closeColorPicker(light, color, $staropt$star, $staropt$star$1, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : (function (param) {
        return /* () */0;
      });
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return Curry._3(MainEditorDirectionLight$WonderEditor.Method[/* closeColorPick */2], /* tuple */[
              uiState,
              dispatchFunc
            ], light, color);
}

function changeIntensity(light, intensity) {
  return MainEditorDirectionLight$WonderEditor.Method[/* changeIntensity */4](light, intensity);
}

function blurIntensity(light, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return MainEditorDirectionLight$WonderEditor.Method[/* blurIntensityEvent */3](/* tuple */[
              uiState,
              dispatchFunc
            ], light, value);
}

function changeIntensityAndBlur(light, sourceValue, targetValue, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  MainEditorDirectionLight$WonderEditor.Method[/* changeIntensity */4](light, targetValue);
  return blurIntensity(light, sourceValue, uiState, dispatchFunc, /* () */0);
}

exports.getColor = getColor;
exports.changeColor = changeColor;
exports.closeColorPicker = closeColorPicker;
exports.changeIntensity = changeIntensity;
exports.blurIntensity = blurIntensity;
exports.changeIntensityAndBlur = changeIntensityAndBlur;
/* TestTool-WonderEditor Not a pure module */
