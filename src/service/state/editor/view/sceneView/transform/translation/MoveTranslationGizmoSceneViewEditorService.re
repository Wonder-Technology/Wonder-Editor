open EditorType;

open ShapeType;

let unsafeAxisGizmoStartPoint = editorState =>
  RecordTranslationGizmoSceneViewEditorService.unsafeGetData(editorState).
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
            editorState,
          ),
        translationGizmoData: {
          ...
            RecordTranslationGizmoSceneViewEditorService.unsafeGetData(
              editorState,
            ),
          axisGameObjectStartPoint: Some(axisGameObjectStartPoint),
        },
      }),
  },
};

let unsafeGetPickStartPoint = editorState =>
  RecordTranslationGizmoSceneViewEditorService.unsafeGetData(editorState).
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
            editorState,
          ),
        translationGizmoData: {
          ...
            RecordTranslationGizmoSceneViewEditorService.unsafeGetData(
              editorState,
            ),
          pickStartPoint: Some(pickStartPoint),
        },
      }),
  },
};