open SceneViewType;

let restoreScaleGizmoColor = (editorState, engineState) => {
  let engineState =
    CurrentTransformGizmosUtils.setColor(
      GameObjectEngineService.getAllBasicMaterials(
        HierarchyGameObjectEngineService.getAllGameObjects(
          OperateScaleGizmoSceneViewEditorService.unsafeGetScaleXAxisGizmo(
            editorState,
          ),
          engineState,
        ),
        engineState,
      ),
      DataScaleGizmoSceneViewEditorService.getXAxisColor(),
      engineState,
    );

  let engineState =
    CurrentTransformGizmosUtils.setColor(
      GameObjectEngineService.getAllBasicMaterials(
        HierarchyGameObjectEngineService.getAllGameObjects(
          OperateScaleGizmoSceneViewEditorService.unsafeGetScaleYAxisGizmo(
            editorState,
          ),
          engineState,
        ),
        engineState,
      ),
      DataScaleGizmoSceneViewEditorService.getYAxisColor(),
      engineState,
    );

  let engineState =
    CurrentTransformGizmosUtils.setColor(
      GameObjectEngineService.getAllBasicMaterials(
        HierarchyGameObjectEngineService.getAllGameObjects(
          OperateScaleGizmoSceneViewEditorService.unsafeGetScaleZAxisGizmo(
            editorState,
          ),
          engineState,
        ),
        engineState,
      ),
      DataScaleGizmoSceneViewEditorService.getZAxisColor(),
      engineState,
    );

  let engineState =
    CurrentTransformGizmosUtils.setColor(
      GameObjectEngineService.getAllBasicMaterials(
        HierarchyGameObjectEngineService.getAllGameObjects(
          OperateScaleGizmoSceneViewEditorService.unsafeGetScaleCenterBoxGizmo(
            editorState,
          ),
          engineState,
        ),
        engineState,
      ),
      DataScaleGizmoSceneViewEditorService.getCenterBoxColor(),
      engineState,
    );

  engineState;
};