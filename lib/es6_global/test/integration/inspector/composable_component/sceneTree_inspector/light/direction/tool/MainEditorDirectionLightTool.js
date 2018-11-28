

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as TestTool$WonderEditor from "../../../../../../../tool/TestTool.js";
import * as MainEditorDirectionLight$WonderEditor from "../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/composable_component/direction_light/ui/MainEditorDirectionLight.js";

function getColor(material) {
  return MainEditorDirectionLight$WonderEditor.Method[/* getColor */0](material, /* () */0);
}

function changeColor(light, color) {
  return MainEditorDirectionLight$WonderEditor.Method[/* changeColor */1](light, color);
}

function closeColorPicker(light, color, $staropt$star, $staropt$star$1, _) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : (function () {
        return /* () */0;
      });
  var store = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return Curry._3(MainEditorDirectionLight$WonderEditor.Method[/* closeColorPick */2], /* tuple */[
              store,
              dispatchFunc
            ], light, color);
}

function changeIntensity(light, intensity) {
  return MainEditorDirectionLight$WonderEditor.Method[/* changeIntensity */4](light, intensity);
}

function blurIntensity(light, value, $staropt$star, $staropt$star$1, _) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return MainEditorDirectionLight$WonderEditor.Method[/* blurIntensityEvent */3](/* tuple */[
              store,
              dispatchFunc
            ], light, value);
}

function changeIntensityAndBlur(light, sourceValue, targetValue, $staropt$star, $staropt$star$1, _) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  MainEditorDirectionLight$WonderEditor.Method[/* changeIntensity */4](light, targetValue);
  return blurIntensity(light, sourceValue, store, dispatchFunc, /* () */0);
}

export {
  getColor ,
  changeColor ,
  closeColorPicker ,
  changeIntensity ,
  blurIntensity ,
  changeIntensityAndBlur ,
  
}
/* TestTool-WonderEditor Not a pure module */
