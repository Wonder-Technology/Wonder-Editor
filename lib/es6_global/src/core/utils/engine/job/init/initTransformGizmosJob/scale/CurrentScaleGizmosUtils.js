

import * as GameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as CurrentTransformGizmosUtils$WonderEditor from "../CurrentTransformGizmosUtils.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";
import * as DataScaleGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/scale/DataScaleGizmoSceneViewEditorService.js";
import * as OperateScaleGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/scale/OperateScaleGizmoSceneViewEditorService.js";

function restoreScaleGizmoColor(editorState, engineState) {
  var engineState$1 = CurrentTransformGizmosUtils$WonderEditor.setColor(GameObjectEngineService$WonderEditor.getAllBasicMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleXAxisGizmo(editorState), engineState), engineState), DataScaleGizmoSceneViewEditorService$WonderEditor.getXAxisColor(/* () */0), engineState);
  var engineState$2 = CurrentTransformGizmosUtils$WonderEditor.setColor(GameObjectEngineService$WonderEditor.getAllBasicMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleYAxisGizmo(editorState), engineState$1), engineState$1), DataScaleGizmoSceneViewEditorService$WonderEditor.getYAxisColor(/* () */0), engineState$1);
  var engineState$3 = CurrentTransformGizmosUtils$WonderEditor.setColor(GameObjectEngineService$WonderEditor.getAllBasicMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleZAxisGizmo(editorState), engineState$2), engineState$2), DataScaleGizmoSceneViewEditorService$WonderEditor.getZAxisColor(/* () */0), engineState$2);
  return CurrentTransformGizmosUtils$WonderEditor.setColor(GameObjectEngineService$WonderEditor.getAllBasicMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleCenterBoxGizmo(editorState), engineState$3), engineState$3), DataScaleGizmoSceneViewEditorService$WonderEditor.getCenterBoxColor(/* () */0), engineState$3);
}

export {
  restoreScaleGizmoColor ,
  
}
/* GameObjectEngineService-WonderEditor Not a pure module */
