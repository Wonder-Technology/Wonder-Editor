open EditorType;

open SceneViewType;

let unsafeGetDragStartPoint = editorState =>
  RecordRotationGizmoSceneViewEditorService.unsafeGetData(editorState).
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
        rotationGizmoData: {
          ...
            RecordRotationGizmoSceneViewEditorService.unsafeGetData(
              editorState,
            ),
          dragStartPoint: Some(dragStartPoint),
        },
      }),
  },
};

let getLastTotalAngle = editorState =>
  RecordRotationGizmoSceneViewEditorService.unsafeGetData(editorState).
    lastTotalAngle;

let setLastTotalAngle = (lastTotalAngle, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.unsafeGetData(
            editorState,
          ),
        rotationGizmoData: {
          ...
            RecordRotationGizmoSceneViewEditorService.unsafeGetData(
              editorState,
            ),
          lastTotalAngle,
        },
      }),
  },
};