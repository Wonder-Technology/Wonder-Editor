open EditorType;

open ShapeType;

let unsafeAxisGizmoStartPoint = editorState =>
  RecordTransformGizmoSceneViewEditorService.unsafeGetData(
    editorState.sceneViewRecord,
  ).
    axisGameObjectStartPoint
  |> OptionService.unsafeGet;

let setAxisGizmoStartPoint = (axisGameObjectStartPoint, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.unsafeGetData(
            editorState.sceneViewRecord,
          ),
        axisGameObjectStartPoint: Some(axisGameObjectStartPoint),
      }),
  },
};

let unsafeGetPickStartPoint = editorState =>
  RecordTransformGizmoSceneViewEditorService.unsafeGetData(
    editorState.sceneViewRecord,
  ).
    pickStartPoint
  |> OptionService.unsafeGet;

let setPickStartPoint = (pickStartPoint, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.unsafeGetData(
            editorState.sceneViewRecord,
          ),
        pickStartPoint: Some(pickStartPoint),
      }),
  },
};