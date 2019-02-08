open SceneViewType;

let isSelected = (gizmoType, editorState) =>
  switch (gizmoType) {
  | XYCircle =>
    SelectRotationGizmoSceneViewEditorService.isXYCircleGizmoSelected(
      editorState,
    )
  | XZCircle =>
    SelectRotationGizmoSceneViewEditorService.isXZCircleGizmoSelected(
      editorState,
    )
  | YZCircle =>
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