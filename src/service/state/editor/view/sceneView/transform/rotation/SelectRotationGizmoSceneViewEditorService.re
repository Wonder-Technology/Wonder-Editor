open EditorType;

open SceneViewType;

let markNotSelectAnyRotationGizmo = editorState => {
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
          isXZCircleGizmoSelected: false,
          isXYCircleGizmoSelected: false,
          isYZCircleGizmoSelected: false,
        },
      }),
  },
};

let onlySelectXYCircleGizmo = editorState => {
  let editorState = editorState |> markNotSelectAnyRotationGizmo;

  {
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
            isXYCircleGizmoSelected: true,
          },
        }),
    },
  };
};