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
    TransformGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    TransformGizmoSceneViewEditorService.unsafeGetTranslationZAxisGizmo(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    TransformGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
      editorState,
    ),
    engineState,
  );

let buildYZPlane = (editorState, engineState) =>
  _buildPlane(
    TransformGizmoSceneViewEditorService.unsafeGetTranslationYAxisGizmo(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    TransformGizmoSceneViewEditorService.unsafeGetTranslationZAxisGizmo(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    TransformGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
      editorState,
    ),
    engineState,
  );

let buildXYPlane = (editorState, engineState) =>
  _buildPlane(
    TransformGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    TransformGizmoSceneViewEditorService.unsafeGetTranslationYAxisGizmo(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    TransformGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
      editorState,
    ),
    engineState,
  );