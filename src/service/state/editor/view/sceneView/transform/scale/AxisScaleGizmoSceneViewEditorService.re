open EditorType;

open ShapeType;

let getAxisGizmoPos = (editorState, engineState) =>
  TransformEngineService.getPosition(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      OperateScaleGizmoSceneViewEditorService.unsafeGetScaleWholeGizmo(
        editorState,
      ),
      engineState,
    ),
    engineState,
  );

let _getAxisNormalizedVec = (scaleAxisGizmo, (editorState, engineState)) =>
  Wonderjs.Vector3Service.sub(
    Wonderjs.Vector3Type.Float,
    TransformEngineService.getPosition(
      GameObjectComponentEngineService.unsafeGetTransformComponent(
        scaleAxisGizmo
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
    OperateScaleGizmoSceneViewEditorService.unsafeGetScaleXAxisGizmo(
      editorState,
    ),
    (editorState, engineState),
  );

let getYAxisNormalizedVec = (editorState, engineState) =>
  _getAxisNormalizedVec(
    OperateScaleGizmoSceneViewEditorService.unsafeGetScaleYAxisGizmo(
      editorState,
    ),
    (editorState, engineState),
  );

let getZAxisNormalizedVec = (editorState, engineState) =>
  _getAxisNormalizedVec(
    OperateScaleGizmoSceneViewEditorService.unsafeGetScaleZAxisGizmo(
      editorState,
    ),
    (editorState, engineState),
  );

let unsafeDragStartPointInLocalCoordinateSystem = editorState =>
  RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState).
    dragStartPointInLocalCoordinateSystem
  |> OptionService.unsafeGet;

let setDragStartPointInLocalCoordinateSystem =
    (dragStartPointInLocalCoordinateSystem, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.unsafeGetData(
            editorState,
          ),
        scaleGizmoData: {
          ...
            RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState),
          dragStartPointInLocalCoordinateSystem:
            Some(dragStartPointInLocalCoordinateSystem),
        },
      }),
  },
};