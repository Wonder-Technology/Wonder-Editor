open EditorType;

open ShapeType;

let getAxisGameObjectPos = (editorState, engineState) =>
  TransformEngineService.getPosition(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
      engineState,
    ),
    engineState,
  );

let _getAxisNormalizedVec =
    (translationAxisGameObject, (editorState, engineState)) =>
  Wonderjs.Vector3Service.sub(
    Wonderjs.Vector3Type.Float,
    TransformEngineService.getPosition(
      GameObjectComponentEngineService.unsafeGetTransformComponent(
        translationAxisGameObject
        |> HierarchyGameObjectEngineService.getChildren(_, engineState)
        |> ArrayService.unsafeGetFirst,
        engineState,
      ),
      engineState,
    ),
    getAxisGameObjectPos(editorState, engineState),
  )
  |> Wonderjs.Vector3Service.normalize
  |> Vector3Service.truncate(3);

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