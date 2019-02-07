let isAxisSelected = (gizmoName, editorState) =>
  switch (gizmoName) {
  | "x" =>
    SelectTranslationGizmoSceneViewEditorService.isTranslationXAxisGizmoSelected(
      editorState,
    )
  | "y" =>
    SelectTranslationGizmoSceneViewEditorService.isTranslationYAxisGizmoSelected(
      editorState,
    )
  | "z" =>
    SelectTranslationGizmoSceneViewEditorService.isTranslationZAxisGizmoSelected(
      editorState,
    )
  };

let isPlaneSelected = (gizmoName, editorState) =>
  switch (gizmoName) {
  | "xy" =>
    SelectTranslationGizmoSceneViewEditorService.isTranslationXYPlaneGizmoSelected(
      editorState,
    )
  | "xz" =>
    SelectTranslationGizmoSceneViewEditorService.isTranslationXZPlaneGizmoSelected(
      editorState,
    )
  | "yz" =>
    SelectTranslationGizmoSceneViewEditorService.isTranslationYZPlaneGizmoSelected(
      editorState,
    )
  };

let restoreTranslationGizmoColor =
    (editorState, engineState) => {
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

    engineState
};