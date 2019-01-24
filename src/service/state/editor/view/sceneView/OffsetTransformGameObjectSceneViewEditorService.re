open EditorType;

open ShapeType;

let unsafeGetIntersectPointWithPlaneOffsetForXAxis = editorState =>
  RecordTransformGameObjectSceneViewEditorService.getData(
    editorState.sceneViewRecord,
  ).
    intersectPointWithPlaneOffsetForXAxis
  |> OptionService.unsafeGet;

let setIntersectPointWithPlaneOffsetForXAxis = (offset, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGameObjectData:
      Some({
        ...
          RecordTransformGameObjectSceneViewEditorService.getData(
            editorState.sceneViewRecord,
          ),
        intersectPointWithPlaneOffsetForXAxis: Some(offset),
      }),
  },
};

let unsafeGetIntersectPointWithPlaneOffsetForYAxis = editorState =>
  RecordTransformGameObjectSceneViewEditorService.getData(
    editorState.sceneViewRecord,
  ).
    intersectPointWithPlaneOffsetForYAxis
  |> OptionService.unsafeGet;

let setIntersectPointWithPlaneOffsetForYAxis = (offset, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGameObjectData:
      Some({
        ...
          RecordTransformGameObjectSceneViewEditorService.getData(
            editorState.sceneViewRecord,
          ),
        intersectPointWithPlaneOffsetForYAxis: Some(offset),
      }),
  },
};

let unsafeGetIntersectPointWithPlaneOffsetForZAxis = editorState =>
  RecordTransformGameObjectSceneViewEditorService.getData(
    editorState.sceneViewRecord,
  ).
    intersectPointWithPlaneOffsetForZAxis
  |> OptionService.unsafeGet;

let setIntersectPointWithPlaneOffsetForZAxis = (offset, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGameObjectData:
      Some({
        ...
          RecordTransformGameObjectSceneViewEditorService.getData(
            editorState.sceneViewRecord,
          ),
        intersectPointWithPlaneOffsetForZAxis: Some(offset),
      }),
  },
};