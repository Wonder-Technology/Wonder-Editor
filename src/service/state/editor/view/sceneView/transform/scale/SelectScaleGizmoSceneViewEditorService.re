open EditorType;

open SceneViewType;

let isScaleXAxisGizmoSelected = editorState =>
  RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState).
    isScaleXAxisGizmoSelected;

let isScaleYAxisGizmoSelected = editorState =>
  RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState).
    isScaleYAxisGizmoSelected;

let isScaleZAxisGizmoSelected = editorState =>
  RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState).
    isScaleZAxisGizmoSelected;

let isScaleCenterBoxGizmoSelected = editorState =>
  RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState).
    isScaleCenterBoxGizmoSelected;

let isSelectAnyScaleGizmo = editorState =>
  switch (RecordScaleGizmoSceneViewEditorService.getData(editorState)) {
  | None => false
  | Some(_) =>
    isScaleXAxisGizmoSelected(editorState)
    || isScaleYAxisGizmoSelected(editorState)
    || isScaleZAxisGizmoSelected(editorState)
    || isScaleCenterBoxGizmoSelected(editorState)
  };

let markNotSelectAnyScaleGizmo = editorState => {
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
            RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState),
          isScaleXAxisGizmoSelected: false,
          isScaleYAxisGizmoSelected: false,
          isScaleZAxisGizmoSelected: false,
          isScaleCenterBoxGizmoSelected: false,
        },
      }),
  },
};

let onlySelectScaleXAxisGizmo = editorState => {
  let editorState = editorState |> markNotSelectAnyScaleGizmo;

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
          scaleGizmoData: {
            ...
              RecordScaleGizmoSceneViewEditorService.unsafeGetData(
                editorState,
              ),
            isScaleXAxisGizmoSelected: true,
          },
        }),
    },
  };
};

let onlySelectScaleYAxisGizmo = editorState => {
  let editorState = editorState |> markNotSelectAnyScaleGizmo;
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
          scaleGizmoData: {
            ...
              RecordScaleGizmoSceneViewEditorService.unsafeGetData(
                editorState,
              ),
            isScaleYAxisGizmoSelected: true,
          },
        }),
    },
  };
};

let onlySelectScaleZAxisGizmo = editorState => {
  let editorState = editorState |> markNotSelectAnyScaleGizmo;

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
          scaleGizmoData: {
            ...
              RecordScaleGizmoSceneViewEditorService.unsafeGetData(
                editorState,
              ),
            isScaleZAxisGizmoSelected: true,
          },
        }),
    },
  };
};

let onlySelectScaleCenterBoxGizmo = editorState => {
  let editorState = editorState |> markNotSelectAnyScaleGizmo;

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
          scaleGizmoData: {
            ...
              RecordScaleGizmoSceneViewEditorService.unsafeGetData(
                editorState,
              ),
            isScaleCenterBoxGizmoSelected: true,
          },
        }),
    },
  };
};