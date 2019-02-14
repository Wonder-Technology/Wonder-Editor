

import * as GameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as CurrentTransformGizmosUtils$WonderEditor from "../CurrentTransformGizmosUtils.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";
import * as DataTranslationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/translation/DataTranslationGizmoSceneViewEditorService.js";
import * as OperateTranslationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/translation/OperateTranslationGizmoSceneViewEditorService.js";

function restoreTranslationGizmoColor(editorState, engineState) {
  var engineState$1 = CurrentTransformGizmosUtils$WonderEditor.setColor(GameObjectEngineService$WonderEditor.getAllBasicMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXAxisGizmo(editorState), engineState), engineState), DataTranslationGizmoSceneViewEditorService$WonderEditor.getXAxisColor(/* () */0), engineState);
  var engineState$2 = CurrentTransformGizmosUtils$WonderEditor.setColor(GameObjectEngineService$WonderEditor.getAllBasicMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationYAxisGizmo(editorState), engineState$1), engineState$1), DataTranslationGizmoSceneViewEditorService$WonderEditor.getYAxisColor(/* () */0), engineState$1);
  var engineState$3 = CurrentTransformGizmosUtils$WonderEditor.setColor(GameObjectEngineService$WonderEditor.getAllBasicMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationZAxisGizmo(editorState), engineState$2), engineState$2), DataTranslationGizmoSceneViewEditorService$WonderEditor.getZAxisColor(/* () */0), engineState$2);
  var engineState$4 = CurrentTransformGizmosUtils$WonderEditor.setColor(GameObjectEngineService$WonderEditor.getAllBasicMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXYPlaneGizmo(editorState), engineState$3), engineState$3), DataTranslationGizmoSceneViewEditorService$WonderEditor.getXYPlaneColor(/* () */0), engineState$3);
  var engineState$5 = CurrentTransformGizmosUtils$WonderEditor.setColor(GameObjectEngineService$WonderEditor.getAllBasicMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXZPlaneGizmo(editorState), engineState$4), engineState$4), DataTranslationGizmoSceneViewEditorService$WonderEditor.getXZPlaneColor(/* () */0), engineState$4);
  return CurrentTransformGizmosUtils$WonderEditor.setColor(GameObjectEngineService$WonderEditor.getAllBasicMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationYZPlaneGizmo(editorState), engineState$5), engineState$5), DataTranslationGizmoSceneViewEditorService$WonderEditor.getYZPlaneColor(/* () */0), engineState$5);
}

export {
  restoreTranslationGizmoColor ,
  
}
/* GameObjectEngineService-WonderEditor Not a pure module */
