

import * as ArrayService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as DataTransformGizmoSceneViewEditorService$WonderEditor from "../../../../../../service/state/editor/view/sceneView/transform/DataTransformGizmoSceneViewEditorService.js";

function setColor(gizmoAllBasicMaterials, color, engineState) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, basicMaterial) {
                return BasicMaterialEngineService$WonderEditor.setColor(color, basicMaterial, engineState);
              }), engineState, gizmoAllBasicMaterials);
}

function setCurrentGizmoColor(gizmoAllBasicMaterials, editorState, engineState) {
  var currentGizmoColor = DataTransformGizmoSceneViewEditorService$WonderEditor.getColorForCurrentGizmo(/* () */0);
  return setColor(gizmoAllBasicMaterials, currentGizmoColor, engineState);
}

export {
  setColor ,
  setCurrentGizmoColor ,
  
}
/* BasicMaterialEngineService-WonderEditor Not a pure module */
