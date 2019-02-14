

import * as Vector3Service$Wonderjs from "../../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Vector3Service.js";
import * as Vector3Service$WonderEditor from "../../../../../service/primitive/Vector3Service.js";
import * as TransformGameObjectEngineService$WonderEditor from "../../../../../service/state/engine/gameObject/TransformGameObjectEngineService.js";
import * as OperateRotationGizmoSceneViewEditorService$WonderEditor from "../../../../../service/state/editor/view/sceneView/transform/rotation/OperateRotationGizmoSceneViewEditorService.js";

function computeScaleComponentBasedOnDistanceToCamera(cameraPos, currentSceneTreeNodePos) {
  var distance = Vector3Service$WonderEditor.length(Vector3Service$Wonderjs.sub(/* Float */0, cameraPos, currentSceneTreeNodePos));
  if (distance !== 0) {
    return distance * 0.03;
  } else {
    return 1;
  }
}

function getScaleFactor(editorState, engineState) {
  return TransformGameObjectEngineService$WonderEditor.getLocalScale(OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationWholeGizmo(editorState), engineState)[0];
}

export {
  computeScaleComponentBasedOnDistanceToCamera ,
  getScaleFactor ,
  
}
/* Vector3Service-WonderEditor Not a pure module */
