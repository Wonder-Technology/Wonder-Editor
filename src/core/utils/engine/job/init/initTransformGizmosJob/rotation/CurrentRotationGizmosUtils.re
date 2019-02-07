let isSelected = (gizmoName, editorState) =>
  switch (gizmoName) {
  | "xy" =>
    SelectRotationGizmoSceneViewEditorService.isXYCircleGizmoSelected(
      editorState,
    )
  | "xz" =>
    SelectRotationGizmoSceneViewEditorService.isXZCircleGizmoSelected(
      editorState,
    )
  | "yz" =>
    SelectRotationGizmoSceneViewEditorService.isYZCircleGizmoSelected(
      editorState,
    )
  };

let restoreRotationGizmoColor = (editorState, engineState) => {
  let engineState =
    CurrentTransformGizmosUtils.setColor(
      GameObjectEngineService.getAllBasicMaterials(
        HierarchyGameObjectEngineService.getAllGameObjects(
          OperateRotationGizmoSceneViewEditorService.unsafeGetRotationXYCircleGizmo(
            editorState,
          ),
          engineState,
        ),
        engineState,
      ),
      DataRotationGizmoSceneViewEditorService.getXYCircleColor(),
      engineState,
    );

  let engineState =
    CurrentTransformGizmosUtils.setColor(
      GameObjectEngineService.getAllBasicMaterials(
        HierarchyGameObjectEngineService.getAllGameObjects(
          OperateRotationGizmoSceneViewEditorService.unsafeGetRotationXZCircleGizmo(
            editorState,
          ),
          engineState,
        ),
        engineState,
      ),
      DataRotationGizmoSceneViewEditorService.getXZCircleColor(),
      engineState,
    );

  let engineState =
    CurrentTransformGizmosUtils.setColor(
      GameObjectEngineService.getAllBasicMaterials(
        HierarchyGameObjectEngineService.getAllGameObjects(
          OperateRotationGizmoSceneViewEditorService.unsafeGetRotationYZCircleGizmo(
            editorState,
          ),
          engineState,
        ),
        engineState,
      ),
      DataRotationGizmoSceneViewEditorService.getYZCircleColor(),
      engineState,
    );

  engineState;
};