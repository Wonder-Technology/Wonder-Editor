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

let setCurrentGizmoColor =
    (gizmoAllBasicMaterials, isSelectFunc, editorState, engineState) =>
  isSelectFunc(editorState) ?
    {
      let currentGizmoColor =
        DataTransformGizmoSceneViewEditorService.getColorForCurrentGizmo();

      setColor(gizmoAllBasicMaterials, currentGizmoColor, engineState);
    } :
    engineState;