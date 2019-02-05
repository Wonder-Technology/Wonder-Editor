open EditorType;

open SceneViewType;

let unsafeGetRotationWholeGizmo = editorState =>
  RecordRotationGizmoSceneViewEditorService.unsafeGetData(editorState).
    rotationWholeGizmo;

let setRotationWholeGizmo = (gameObject, editorState) => {
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
          rotationWholeGizmo: gameObject,
        },
      }),
  },
};

let unsafeGetRotationXYCircleGizmo = editorState =>
  RecordRotationGizmoSceneViewEditorService.unsafeGetData(editorState).
    rotationXYCircle;

let setRotationXYCircleGizmo = (gameObject, editorState) => {
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
          rotationXYCircle: gameObject,
        },
      }),
  },
};

let unsafeGetRotationXZCircleGizmo = editorState =>
  RecordRotationGizmoSceneViewEditorService.unsafeGetData(editorState).
    rotationXZCircle;

let setRotationXZCircleGizmo = (gameObject, editorState) => {
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
          rotationXZCircle: gameObject,
        },
      }),
  },
};

let unsafeGetRotationYZCircleGizmo = editorState =>
  RecordRotationGizmoSceneViewEditorService.unsafeGetData(editorState).
    rotationYZCircle;

let setRotationYZCircleGizmo = (gameObject, editorState) => {
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
          rotationYZCircle: gameObject,
        },
      }),
  },
};