

import * as Vector3Service$Wonderjs from "../../../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Vector3Service.js";
import * as Vector3Service$WonderEditor from "../../../../../../service/primitive/Vector3Service.js";
import * as SceneViewEditorService$WonderEditor from "../../../../../../service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as TransformEngineService$WonderEditor from "../../../../../../service/state/engine/TransformEngineService.js";
import * as InitTransformGizmosUtils$WonderEditor from "./InitTransformGizmosUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";

function findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane(param, param$1, param$2) {
  var engineState = param$2[1];
  var editorState = param$2[0];
  var plane2 = param$1[1];
  var plane1 = param[1];
  var cameraGameObject = SceneViewEditorService$WonderEditor.unsafeGetEditCamera(editorState);
  var currentSceneTreeNodeToCameraVec = Vector3Service$Wonderjs.sub(/* Float */0, InitTransformGizmosUtils$WonderEditor.getCurrentSceneTreeNodePosition(editorState, engineState), TransformEngineService$WonderEditor.getPosition(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(cameraGameObject, engineState), engineState));
  var match = Vector3Service$WonderEditor.length(Vector3Service$WonderEditor.projectOnPlane(plane1[/* normal */0], currentSceneTreeNodeToCameraVec)) < Vector3Service$WonderEditor.length(Vector3Service$WonderEditor.projectOnPlane(plane2[/* normal */0], currentSceneTreeNodeToCameraVec));
  if (match) {
    return plane1;
  } else {
    return plane2;
  }
}

export {
  findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane ,
  
}
/* Vector3Service-WonderEditor Not a pure module */
