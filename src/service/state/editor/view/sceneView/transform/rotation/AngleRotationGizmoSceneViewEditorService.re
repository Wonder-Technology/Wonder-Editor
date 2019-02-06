open EditorType;

open SceneViewType;

let computeAngleOnCircle = (event, engineState, editorState) => {
  let cameraGameObject =
    SceneViewEditorService.unsafeGetEditCamera(editorState);

  let ray =
    RayUtils.createPerspectiveCameraRayFromEvent(
      event,
      cameraGameObject,
      (editorState, engineState),
    );
  ();
  /* TODO finish!!! */
};

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