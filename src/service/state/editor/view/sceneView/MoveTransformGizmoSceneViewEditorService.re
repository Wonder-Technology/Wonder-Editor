open EditorType;

open ShapeType;

let unsafeAxisGizmoStartPoint = editorState =>
  RecordTransformGizmoSceneViewEditorService.getData(
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
          RecordTransformGizmoSceneViewEditorService.getData(
            editorState.sceneViewRecord,
          ),
        axisGameObjectStartPoint: Some(axisGameObjectStartPoint),
      }),
  },
};

let unsafeGetPickStartPoint = editorState =>
  RecordTransformGizmoSceneViewEditorService.getData(
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
          RecordTransformGizmoSceneViewEditorService.getData(
            editorState.sceneViewRecord,
          ),
        pickStartPoint: Some(pickStartPoint),
      }),
  },
};