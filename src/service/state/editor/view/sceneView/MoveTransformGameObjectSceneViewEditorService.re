open EditorType;

open ShapeType;

let unsafeAxisGameObjectStartPoint = editorState =>
  RecordTransformGameObjectSceneViewEditorService.getData(
    editorState.sceneViewRecord,
  ).
    axisGameObjectStartPoint
  |> OptionService.unsafeGet;

let setAxisGameObjectStartPoint = (axisGameObjectStartPoint, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGameObjectData:
      Some({
        ...
          RecordTransformGameObjectSceneViewEditorService.getData(
            editorState.sceneViewRecord,
          ),
        axisGameObjectStartPoint: Some(axisGameObjectStartPoint),
      }),
  },
};

let unsafeGetPickStartPoint = editorState =>
  RecordTransformGameObjectSceneViewEditorService.getData(
    editorState.sceneViewRecord,
  ).
    pickStartPoint
  |> OptionService.unsafeGet;

let setPickStartPoint = (pickStartPoint, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGameObjectData:
      Some({
        ...
          RecordTransformGameObjectSceneViewEditorService.getData(
            editorState.sceneViewRecord,
          ),
        pickStartPoint: Some(pickStartPoint),
      }),
  },
};