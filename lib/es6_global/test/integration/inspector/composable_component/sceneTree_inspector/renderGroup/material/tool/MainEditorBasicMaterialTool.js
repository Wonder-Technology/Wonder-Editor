

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as TestTool$WonderEditor from "../../../../../../../tool/TestTool.js";
import * as MainEditorMaterial$WonderEditor from "../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/ui/MainEditorMaterial.js";
import * as MainEditorBasicMaterial$WonderEditor from "../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/composable_component/basic_material/ui/MainEditorBasicMaterial.js";

function changeMaterialTypeToBeBasicMaterial($staropt$star, $staropt$star$1, param) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorMaterial$WonderEditor.Method[/* changeMaterialType */0], /* tuple */[
              store,
              dispatchFunc
            ], /* () */0, /* tuple */[
              /* LightMaterial */1,
              /* BasicMaterial */0
            ]);
}

function getColor(material) {
  return MainEditorBasicMaterial$WonderEditor.Method[/* getColor */0](material, /* () */0);
}

function changeColor(material, color) {
  return MainEditorBasicMaterial$WonderEditor.Method[/* changeColor */1](material, color);
}

function closeColorPicker(material, color, $staropt$star, $staropt$star$1, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : (function (param) {
        return /* () */0;
      });
  var store = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return Curry._3(MainEditorBasicMaterial$WonderEditor.Method[/* closeColorPick */2], /* tuple */[
              store,
              dispatchFunc
            ], material, color);
}

export {
  changeMaterialTypeToBeBasicMaterial ,
  getColor ,
  changeColor ,
  closeColorPicker ,
  
}
/* TestTool-WonderEditor Not a pure module */
