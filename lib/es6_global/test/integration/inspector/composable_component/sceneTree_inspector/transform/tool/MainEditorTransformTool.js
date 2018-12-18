

import * as TestTool$WonderEditor from "../../../../../../tool/TestTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../tool/GameObjectTool.js";
import * as TransformUtils$WonderEditor from "../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/utils/TransformUtils.js";
import * as MainEditorTransform$WonderEditor from "../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/ui/MainEditorTransform.js";

function changePositionX(transform, value) {
  return MainEditorTransform$WonderEditor.Method[/* changePositionX */4](transform, value);
}

function changePositionXAndBlur(value, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var transform = $staropt$star !== undefined ? $staropt$star : GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
  var store = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : TestTool$WonderEditor.getDispatch(/* () */0);
  var oldPosition = TransformUtils$WonderEditor.getTransformPositionData(transform);
  MainEditorTransform$WonderEditor.Method[/* changePositionX */4](transform, value);
  return MainEditorTransform$WonderEditor.Method[/* blurPositionEvent */0](/* tuple */[
              store,
              dispatchFunc
            ], transform, oldPosition);
}

function changePositionY(transform, value) {
  return MainEditorTransform$WonderEditor.Method[/* changePositionY */5](transform, value);
}

function changePositionYAndBlur(value, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var transform = $staropt$star !== undefined ? $staropt$star : GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
  var store = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : TestTool$WonderEditor.getDispatch(/* () */0);
  var oldPosition = TransformUtils$WonderEditor.getTransformPositionData(transform);
  MainEditorTransform$WonderEditor.Method[/* changePositionY */5](transform, value);
  return MainEditorTransform$WonderEditor.Method[/* blurPositionEvent */0](/* tuple */[
              store,
              dispatchFunc
            ], transform, oldPosition);
}

function changePositionZ(transform, value) {
  return MainEditorTransform$WonderEditor.Method[/* changePositionZ */6](transform, value);
}

function changeRotationX(transform, value) {
  return MainEditorTransform$WonderEditor.Method[/* changeRotationX */12](transform, value);
}

function changeRotationY(transform, value) {
  return MainEditorTransform$WonderEditor.Method[/* changeRotationY */13](transform, value);
}

function changeRotationZ(transform, value) {
  return MainEditorTransform$WonderEditor.Method[/* changeRotationZ */14](transform, value);
}

function changeScaleX(transform, value) {
  return MainEditorTransform$WonderEditor.Method[/* changeScaleX */8](transform, value);
}

function changeScaleY(transform, value) {
  return MainEditorTransform$WonderEditor.Method[/* changeScaleY */9](transform, value);
}

function changeScaleZ(transform, value) {
  return MainEditorTransform$WonderEditor.Method[/* changeScaleZ */10](transform, value);
}

export {
  changePositionX ,
  changePositionXAndBlur ,
  changePositionY ,
  changePositionYAndBlur ,
  changePositionZ ,
  changeRotationX ,
  changeRotationY ,
  changeRotationZ ,
  changeScaleX ,
  changeScaleY ,
  changeScaleZ ,
  
}
/* TestTool-WonderEditor Not a pure module */
