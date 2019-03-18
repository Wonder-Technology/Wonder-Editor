

import * as GameObjectTool$WonderEditor from "../../../tool/GameObjectTool.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as OperateScaleGizmoSceneViewEditorService$WonderEditor from "../../../../src/service/state/editor/view/sceneView/transform/scale/OperateScaleGizmoSceneViewEditorService.js";
import * as OperateTranslationGizmoSceneViewEditorService$WonderEditor from "../../../../src/service/state/editor/view/sceneView/transform/translation/OperateTranslationGizmoSceneViewEditorService.js";
import * as CoordinateSystemTransformGizmoSceneViewEditorService$WonderEditor from "../../../../src/service/state/editor/view/sceneView/transform/CoordinateSystemTransformGizmoSceneViewEditorService.js";

function getArrowFromAxisGameObject(axisGameObject, engineState) {
  return GameObjectTool$WonderEditor.getChild(axisGameObject, 0, engineState);
}

function getArrowGameObject(_, engineState) {
  var xAxisGameObject = StateLogicService$WonderEditor.getEditorState(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXAxisGizmo);
  return getArrowFromAxisGameObject(xAxisGameObject, engineState);
}

function getLineFromAxisGameObject(axisGameObject, engineState) {
  return GameObjectTool$WonderEditor.getChild(axisGameObject, 1, engineState);
}

function getLineGameObject(_, engineState) {
  var xAxisGameObject = StateLogicService$WonderEditor.getEditorState(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXAxisGizmo);
  return getLineFromAxisGameObject(xAxisGameObject, engineState);
}

function getCubeFromAxisGameObject(axisGameObject, engineState) {
  return GameObjectTool$WonderEditor.getChild(axisGameObject, 0, engineState);
}

function getCubeGameObject(_, engineState) {
  var xAxisGameObject = StateLogicService$WonderEditor.getEditorState(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleXAxisGizmo);
  return getCubeFromAxisGameObject(xAxisGameObject, engineState);
}

function setCoordinateSystem(coordinateSystem) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
          return CoordinateSystemTransformGizmoSceneViewEditorService$WonderEditor.setCoordinateSystem(coordinateSystem, param);
        }));
  return StateLogicService$WonderEditor.getAndRefreshEngineState(/* () */0);
}

export {
  getArrowFromAxisGameObject ,
  getArrowGameObject ,
  getLineFromAxisGameObject ,
  getLineGameObject ,
  getCubeFromAxisGameObject ,
  getCubeGameObject ,
  setCoordinateSystem ,
  
}
/* GameObjectTool-WonderEditor Not a pure module */
