let setColor = (gizmoAllBasicMaterials, color, engineState) =>
  gizmoAllBasicMaterials
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. engineState, basicMaterial) =>
         BasicMaterialEngineService.setColor(
           color,
           basicMaterial,
           engineState,
         ),
       engineState,
     );

let setCurrentGizmoColor = (gizmoAllBasicMaterials, editorState, engineState) => {
  let currentGizmoColor =
    DataTransformGizmoSceneViewEditorService.getColorForCurrentGizmo();

  setColor(gizmoAllBasicMaterials, currentGizmoColor, engineState);
};