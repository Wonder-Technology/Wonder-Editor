

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_primitive from "../../../../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as TestTool$WonderEditor from "../../../../../../../tool/TestTool.js";
import * as BaseEventTool$WonderEditor from "../../../../../../../tool/ui/BaseEventTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../../tool/GameObjectTool.js";
import * as AssetWidgetService$WonderEditor from "../../../../../../../../src/service/record/editor/widget/AssetWidgetService.js";
import * as MainEditorMaterial$WonderEditor from "../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/ui/MainEditorMaterial.js";
import * as MainEditorLightMaterial$WonderEditor from "../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/composable_component/light_material/ui/MainEditorLightMaterial.js";

function changeMaterialTypeToBeLightMaterial($staropt$star, $staropt$star$1, _) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorMaterial$WonderEditor.Method[/* changeMaterialType */0], /* tuple */[
              store,
              dispatchFunc
            ], /* () */0, /* tuple */[
              /* BasicMaterial */0,
              /* LightMaterial */1
            ]);
}

function changeShininess($staropt$star, value, _) {
  var material = $staropt$star !== undefined ? $staropt$star : GameObjectTool$WonderEditor.getCurrentGameObjectMaterial(/* () */0);
  return MainEditorLightMaterial$WonderEditor.Method[/* changeShininess */6](material, value);
}

function blurShininess($staropt$star, $staropt$star$1, $staropt$star$2, value, _) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : (function () {
        return /* () */0;
      });
  var store = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var material = $staropt$star$2 !== undefined ? $staropt$star$2 : GameObjectTool$WonderEditor.getCurrentGameObjectMaterial(/* () */0);
  return MainEditorLightMaterial$WonderEditor.Method[/* blurShininessEvent */5](/* tuple */[
              store,
              dispatchFunc
            ], material, value);
}

function getColor(material) {
  return MainEditorLightMaterial$WonderEditor.Method[/* getColor */0](material, /* () */0);
}

function changeColor(material, color) {
  return MainEditorLightMaterial$WonderEditor.Method[/* changeColor */1](material, color);
}

function closeColorPicker(material, color, $staropt$star, $staropt$star$1, _) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : (function () {
        return /* () */0;
      });
  var store = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return Curry._3(MainEditorLightMaterial$WonderEditor.Method[/* closeColorPick */2], /* tuple */[
              store,
              dispatchFunc
            ], material, color);
}

function dragAssetTextureToMap($staropt$star, $staropt$star$1, $staropt$star$2, _, $staropt$star$3, $staropt$star$4, $staropt$star$5, textureNodeId, _$1) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : (function () {
        return /* () */0;
      });
  var store = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  if ($staropt$star$2 === undefined) {
    AssetWidgetService$WonderEditor.getWidget(/* () */0);
  }
  if ($staropt$star$3 !== undefined) {
    Js_primitive.valFromOption($staropt$star$3);
  } else {
    document.createElement("img");
  }
  if ($staropt$star$4 !== undefined) {
    Js_primitive.valFromOption($staropt$star$4);
  } else {
    BaseEventTool$WonderEditor.buildDragEvent();
  }
  var material = $staropt$star$5 !== undefined ? $staropt$star$5 : GameObjectTool$WonderEditor.getCurrentGameObjectMaterial(/* () */0);
  return Curry._3(MainEditorLightMaterial$WonderEditor.Method[/* onDrop */3], /* tuple */[
              store,
              dispatchFunc
            ], material, textureNodeId);
}

var Drag = /* module */[/* dragAssetTextureToMap */dragAssetTextureToMap];

export {
  changeMaterialTypeToBeLightMaterial ,
  changeShininess ,
  blurShininess ,
  getColor ,
  changeColor ,
  closeColorPicker ,
  Drag ,
  
}
/* TestTool-WonderEditor Not a pure module */
