open EditorType;

open ShapeType;

let _getAxisNormalizedVec =
    (translationAxisGameObject, (editorState, engineState)) =>
  TransformEngineService.getPosition(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      translationAxisGameObject
      |> HierarchyGameObjectEngineService.getChildren(_, engineState)
      |> ArrayService.unsafeGetFirst,
      engineState,
    ),
    engineState,
  )
  |> Wonderjs.Vector3Service.normalize;

let getXAxisNormalizedVec = (editorState, engineState) =>
  _getAxisNormalizedVec(
    TransformGameObjectSceneViewEditorService.unsafeGetTranslationXAxisGameObject(
      editorState,
    ),
    (editorState, engineState),
  );

let getYAxisNormalizedVec = (editorState, engineState) =>
  _getAxisNormalizedVec(
    TransformGameObjectSceneViewEditorService.unsafeGetTranslationYAxisGameObject(
      editorState,
    ),
    (editorState, engineState),
  );

let getZAxisNormalizedVec = (editorState, engineState) =>
  _getAxisNormalizedVec(
    TransformGameObjectSceneViewEditorService.unsafeGetTranslationZAxisGameObject(
      editorState,
    ),
    (editorState, engineState),
  );