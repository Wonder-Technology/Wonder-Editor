

import * as GameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as CurrentTransformGizmosUtils$WonderEditor from "../CurrentTransformGizmosUtils.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";
import * as DataRotationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/rotation/DataRotationGizmoSceneViewEditorService.js";
import * as OperateRotationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/rotation/OperateRotationGizmoSceneViewEditorService.js";

function restoreRotationGizmoColor(editorState, engineState) {
  var engineState$1 = CurrentTransformGizmosUtils$WonderEditor.setColor(GameObjectEngineService$WonderEditor.getAllBasicMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationXYCircleGizmo(editorState), engineState), engineState), DataRotationGizmoSceneViewEditorService$WonderEditor.getXYCircleColor(/* () */0), engineState);
  var engineState$2 = CurrentTransformGizmosUtils$WonderEditor.setColor(GameObjectEngineService$WonderEditor.getAllBasicMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationXZCircleGizmo(editorState), engineState$1), engineState$1), DataRotationGizmoSceneViewEditorService$WonderEditor.getXZCircleColor(/* () */0), engineState$1);
  return CurrentTransformGizmosUtils$WonderEditor.setColor(GameObjectEngineService$WonderEditor.getAllBasicMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationYZCircleGizmo(editorState), engineState$2), engineState$2), DataRotationGizmoSceneViewEditorService$WonderEditor.getYZCircleColor(/* () */0), engineState$2);
}

export {
  restoreRotationGizmoColor ,
  
}
/* GameObjectEngineService-WonderEditor Not a pure module */
