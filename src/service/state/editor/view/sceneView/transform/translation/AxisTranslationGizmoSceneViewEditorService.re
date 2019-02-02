open EditorType;

open ShapeType;

let getAxisGizmoPos = (editorState, engineState) =>
  TransformEngineService.getPosition(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
      engineState,
    ),
    engineState,
  );

let _getAxisNormalizedVec =
    (translationAxisGizmo, (editorState, engineState)) =>
  Wonderjs.Vector3Service.sub(
    Wonderjs.Vector3Type.Float,
    TransformEngineService.getPosition(
      GameObjectComponentEngineService.unsafeGetTransformComponent(
        translationAxisGizmo
        |> HierarchyGameObjectEngineService.getChildren(_, engineState)
        |> ArrayService.unsafeGetFirst,
        engineState,
      ),
      engineState,
    ),
    getAxisGizmoPos(editorState, engineState),
  )
  |> Wonderjs.Vector3Service.normalize
  |> Vector3Service.truncate(3);

let getXAxisNormalizedVec = (editorState, engineState) =>
  _getAxisNormalizedVec(
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo(
      editorState,
    ),
    (editorState, engineState),
  );

let getYAxisNormalizedVec = (editorState, engineState) =>
  _getAxisNormalizedVec(
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYAxisGizmo(
      editorState,
    ),
    (editorState, engineState),
  );

let getZAxisNormalizedVec = (editorState, engineState) =>
  _getAxisNormalizedVec(
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationZAxisGizmo(
      editorState,
    ),
    (editorState, engineState),
  );