open EditorType;

open ShapeType;

let _buildPlane =
    (coneAGameObject, coneBGameObject, wholeGameObject, engineState) =>
  PlaneShapeUtils.setFromCoplanarPoints(
    TransformEngineService.getPosition(
      GameObjectComponentEngineService.unsafeGetTransformComponent(
        coneAGameObject,
        engineState,
      ),
      engineState,
    ),
    TransformEngineService.getPosition(
      GameObjectComponentEngineService.unsafeGetTransformComponent(
        coneBGameObject,
        engineState,
      ),
      engineState,
    ),
    TransformEngineService.getPosition(
      GameObjectComponentEngineService.unsafeGetTransformComponent(
        wholeGameObject,
        engineState,
      ),
      engineState,
    ),
  );

let buildXZPlane = (editorState, engineState) =>
  _buildPlane(
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationZAxisGizmo(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
      editorState,
    ),
    engineState,
  );

let buildYZPlane = (editorState, engineState) =>
  _buildPlane(
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYAxisGizmo(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationZAxisGizmo(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
      editorState,
    ),
    engineState,
  );

let buildXYPlane = (editorState, engineState) =>
  _buildPlane(
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYAxisGizmo(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
      editorState,
    ),
    engineState,
  );