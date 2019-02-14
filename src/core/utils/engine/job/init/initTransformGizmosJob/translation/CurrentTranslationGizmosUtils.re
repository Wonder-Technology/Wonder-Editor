open SceneViewType;

/* let isAxisSelected = (gizmoType, editorState) =>
  switch (gizmoType) {
  | XAxis =>
    SelectTranslationGizmoSceneViewEditorService.isTranslationXAxisGizmoSelected(
      editorState,
    )
  | YAxis =>
    SelectTranslationGizmoSceneViewEditorService.isTranslationYAxisGizmoSelected(
      editorState,
    )
  | ZAxis =>
    SelectTranslationGizmoSceneViewEditorService.isTranslationZAxisGizmoSelected(
      editorState,
    )
  };

let isPlaneSelected = (gizmoType, editorState) =>
  switch (gizmoType) {
  | XYPlane =>
    SelectTranslationGizmoSceneViewEditorService.isTranslationXYPlaneGizmoSelected(
      editorState,
    )
  | XZPlane =>
    SelectTranslationGizmoSceneViewEditorService.isTranslationXZPlaneGizmoSelected(
      editorState,
    )
  | YZPlane =>
    SelectTranslationGizmoSceneViewEditorService.isTranslationYZPlaneGizmoSelected(
      editorState,
    )
  }; */

let restoreTranslationGizmoColor = (editorState, engineState) => {
  let engineState =
    CurrentTransformGizmosUtils.setColor(
      GameObjectEngineService.getAllBasicMaterials(
        HierarchyGameObjectEngineService.getAllGameObjects(
          OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo(
            editorState,
          ),
          engineState,
        ),
        engineState,
      ),
      DataTranslationGizmoSceneViewEditorService.getXAxisColor(),
      engineState,
    );

  let engineState =
    CurrentTransformGizmosUtils.setColor(
      GameObjectEngineService.getAllBasicMaterials(
        HierarchyGameObjectEngineService.getAllGameObjects(
          OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYAxisGizmo(
            editorState,
          ),
          engineState,
        ),
        engineState,
      ),
      DataTranslationGizmoSceneViewEditorService.getYAxisColor(),
      engineState,
    );

  let engineState =
    CurrentTransformGizmosUtils.setColor(
      GameObjectEngineService.getAllBasicMaterials(
        HierarchyGameObjectEngineService.getAllGameObjects(
          OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationZAxisGizmo(
            editorState,
          ),
          engineState,
        ),
        engineState,
      ),
      DataTranslationGizmoSceneViewEditorService.getZAxisColor(),
      engineState,
    );

  let engineState =
    CurrentTransformGizmosUtils.setColor(
      GameObjectEngineService.getAllBasicMaterials(
        HierarchyGameObjectEngineService.getAllGameObjects(
          OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXYPlaneGizmo(
            editorState,
          ),
          engineState,
        ),
        engineState,
      ),
      DataTranslationGizmoSceneViewEditorService.getXYPlaneColor(),
      engineState,
    );

  let engineState =
    CurrentTransformGizmosUtils.setColor(
      GameObjectEngineService.getAllBasicMaterials(
        HierarchyGameObjectEngineService.getAllGameObjects(
          OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXZPlaneGizmo(
            editorState,
          ),
          engineState,
        ),
        engineState,
      ),
      DataTranslationGizmoSceneViewEditorService.getXZPlaneColor(),
      engineState,
    );

  let engineState =
    CurrentTransformGizmosUtils.setColor(
      GameObjectEngineService.getAllBasicMaterials(
        HierarchyGameObjectEngineService.getAllGameObjects(
          OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYZPlaneGizmo(
            editorState,
          ),
          engineState,
        ),
        engineState,
      ),
      DataTranslationGizmoSceneViewEditorService.getYZPlaneColor(),
      engineState,
    );

  engineState;
};