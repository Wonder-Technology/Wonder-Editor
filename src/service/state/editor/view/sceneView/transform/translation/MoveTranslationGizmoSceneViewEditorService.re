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

let unsafeGetDragStartPoint = editorState =>
  RecordTranslationGizmoSceneViewEditorService.unsafeGetData(editorState).
    dragStartPoint
  |> OptionService.unsafeGet;

let setDragStartPoint = (dragStartPoint, editorState) => {
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
          dragStartPoint: Some(dragStartPoint),
        },
      }),
  },
};