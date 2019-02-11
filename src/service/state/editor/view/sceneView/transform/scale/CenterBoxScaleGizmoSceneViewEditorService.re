open EditorType;

open SceneViewType;

let unsafeGetDragStartMouseLocation = editorState =>
  RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState).
    dragStartMouseLocation
  |> OptionService.unsafeGet;

let setDragStartMouseLocation = (dragStartMouseLocation, editorState) => {
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
            RecordScaleGizmoSceneViewEditorService.unsafeGetData(
              editorState,
            ),
          dragStartMouseLocation: Some(dragStartMouseLocation),
        },
      }),
  },
};