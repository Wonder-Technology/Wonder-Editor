

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as TestTool$WonderEditor from "../../../../../../../tool/TestTool.js";
import * as MainEditorPointLight$WonderEditor from "../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/composable_component/point_light/ui/MainEditorPointLight.js";
import * as GameObjectLogicService$WonderEditor from "../../../../../../../../src/service/stateTuple/logic/GameObjectLogicService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../../src/service/state/engine/GameObjectEngineService.js";
import * as PointLightEngineService$WonderEditor from "../../../../../../../../src/service/state/engine/PointLightEngineService.js";
import * as MainEditorPointLightUtils$WonderEditor from "../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/composable_component/point_light/utils/MainEditorPointLightUtils.js";

function getColor(material) {
  return MainEditorPointLight$WonderEditor.Method[/* getColor */0](material, /* () */0);
}

function changeColor(light, color) {
  return MainEditorPointLight$WonderEditor.Method[/* changeColor */1](light, color);
}

function closeColorPicker(light, color, $staropt$star, $staropt$star$1, _) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : (function () {
        return /* () */0;
      });
  var store = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return Curry._3(MainEditorPointLight$WonderEditor.Method[/* closeColorPick */2], /* tuple */[
              store,
              dispatchFunc
            ], light, color);
}

var changeIntensity = MainEditorPointLightUtils$WonderEditor.changeIntensity;

function blurIntensity(light, value, $staropt$star, $staropt$star$1, _) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return MainEditorPointLightUtils$WonderEditor.blurIntensityEvent(/* tuple */[
              store,
              dispatchFunc
            ], light, value);
}

function changeIntensityAndBlur(light, sourceValue, targetValue, $staropt$star, $staropt$star$1, _) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  MainEditorPointLightUtils$WonderEditor.changeIntensity(light, targetValue);
  return blurIntensity(light, sourceValue, store, dispatchFunc, /* () */0);
}

var changeConstant = MainEditorPointLightUtils$WonderEditor.changeConstant;

function blurConstant(light, value, $staropt$star, $staropt$star$1, _) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return MainEditorPointLightUtils$WonderEditor.blurConstantEvent(/* tuple */[
              store,
              dispatchFunc
            ], light, value);
}

var changeLinear = MainEditorPointLightUtils$WonderEditor.changeLinear;

function blurLinear(light, value, $staropt$star, $staropt$star$1, _) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return MainEditorPointLightUtils$WonderEditor.blurLinearEvent(/* tuple */[
              store,
              dispatchFunc
            ], light, value);
}

var changeQuadratic = MainEditorPointLightUtils$WonderEditor.changeQuadratic;

function blurQuadratic(light, value, $staropt$star, $staropt$star$1, _) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return MainEditorPointLightUtils$WonderEditor.blurQuadraticEvent(/* tuple */[
              store,
              dispatchFunc
            ], light, value);
}

var changeRange = MainEditorPointLightUtils$WonderEditor.changeRange;

function blurRange(light, value, $staropt$star, $staropt$star$1, _) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return MainEditorPointLightUtils$WonderEditor.blurRangeEvent(/* tuple */[
              store,
              dispatchFunc
            ], light, value);
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

export {
  getColor ,
  changeColor ,
  closeColorPicker ,
  changeIntensity ,
  blurIntensity ,
  changeIntensityAndBlur ,
  changeConstant ,
  blurConstant ,
  changeLinear ,
  blurLinear ,
  changeQuadratic ,
  blurQuadratic ,
  changeRange ,
  blurRange ,
  createPointLight ,
  
}
/* TestTool-WonderEditor Not a pure module */
