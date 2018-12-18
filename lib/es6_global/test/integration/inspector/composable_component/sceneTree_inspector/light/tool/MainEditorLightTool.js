

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as TestTool$WonderEditor from "../../../../../../tool/TestTool.js";
import * as MainEditorLight$WonderEditor from "../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/ui/MainEditorLight.js";

function changeLightType(sourceLightType, targetLightType, $staropt$star, $staropt$star$1, param) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorLight$WonderEditor.Method[/* changeLight */0], /* tuple */[
              store,
              dispatchFunc
            ], /* () */0, /* tuple */[
              sourceLightType,
              targetLightType
            ]);
}

function setLightTypeToBeDirectionLight(param) {
  return changeLightType(/* PointLight */1, /* DirectionLight */0, undefined, undefined, /* () */0);
}

function setLightTypeToBePointLight(param) {
  return changeLightType(/* DirectionLight */0, /* PointLight */1, undefined, undefined, /* () */0);
}

export {
  changeLightType ,
  setLightTypeToBeDirectionLight ,
  setLightTypeToBePointLight ,
  
}
/* TestTool-WonderEditor Not a pure module */
