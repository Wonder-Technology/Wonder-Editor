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

let onlySelectXZCircleGizmo = editorState => {
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
            isXZCircleGizmoSelected: true,
          },
        }),
    },
  };
};

let onlySelectYZCircleGizmo = editorState => {
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
            isYZCircleGizmoSelected: true,
          },
        }),
    },
  };
};

let isXYCircleGizmoSelected = editorState =>
  RecordRotationGizmoSceneViewEditorService.unsafeGetData(editorState).
    isXYCircleGizmoSelected;

let isXZCircleGizmoSelected = editorState =>
  RecordRotationGizmoSceneViewEditorService.unsafeGetData(editorState).
    isXZCircleGizmoSelected;

let isYZCircleGizmoSelected = editorState =>
  RecordRotationGizmoSceneViewEditorService.unsafeGetData(editorState).
    isYZCircleGizmoSelected;

let isSelectAnyRotationGizmo = editorState =>
  switch (RecordRotationGizmoSceneViewEditorService.getData(editorState)) {
  | None => false
  | Some(_) =>
    isXYCircleGizmoSelected(editorState)
    || isXZCircleGizmoSelected(editorState)
    || isYZCircleGizmoSelected(editorState)
  };