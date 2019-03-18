

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_option from "../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as TestTool$WonderEditor from "../../../../../../../tool/TestTool.js";
import * as BaseEventTool$WonderEditor from "../../../../../../../tool/ui/BaseEventTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../../tool/GameObjectTool.js";
import * as AssetWidgetService$WonderEditor from "../../../../../../../../src/service/record/editor/widget/AssetWidgetService.js";
import * as MainEditorMaterial$WonderEditor from "../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/ui/MainEditorMaterial.js";
import * as MainEditorLightMaterial$WonderEditor from "../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/composable_component/light_material/ui/MainEditorLightMaterial.js";

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
  return MainEditorLightMaterial$WonderEditor.Method[/* changeShininess */6](material, value);
}

function blurShininess($staropt$star, $staropt$star$1, $staropt$star$2, value, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : (function (param) {
        return /* () */0;
      });
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var material = $staropt$star$2 !== undefined ? $staropt$star$2 : GameObjectTool$WonderEditor.getCurrentSceneTreeNodeMaterial(/* () */0);
  return MainEditorLightMaterial$WonderEditor.Method[/* blurShininessEvent */5](/* tuple */[
              uiState,
              dispatchFunc
            ], material, value);
}

function getColor(material) {
  return MainEditorLightMaterial$WonderEditor.Method[/* getColor */0](material, /* () */0);
}

function changeColor(material, color) {
  return MainEditorLightMaterial$WonderEditor.Method[/* changeColor */1](material, color);
}

function closeColorPicker(material, color, $staropt$star, $staropt$star$1, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : (function (param) {
        return /* () */0;
      });
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return Curry._3(MainEditorLightMaterial$WonderEditor.Method[/* closeColorPick */2], /* tuple */[
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
  return Curry._3(MainEditorLightMaterial$WonderEditor.Method[/* onDrop */3], /* tuple */[
              uiState,
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
