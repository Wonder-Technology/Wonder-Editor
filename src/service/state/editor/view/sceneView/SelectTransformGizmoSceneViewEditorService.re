open EditorType;

open SceneViewType;

let isTranslationXAxisGizmoSelected = editorState =>
  RecordTransformGizmoSceneViewEditorService.unsafeGetData(
    editorState.sceneViewRecord,
  ).
    isTranslationXAxisGizmoSelected;

let isTranslationYAxisGizmoSelected = editorState =>
  RecordTransformGizmoSceneViewEditorService.unsafeGetData(
    editorState.sceneViewRecord,
  ).
    isTranslationYAxisGizmoSelected;

let isTranslationZAxisGizmoSelected = editorState =>
  RecordTransformGizmoSceneViewEditorService.unsafeGetData(
    editorState.sceneViewRecord,
  ).
    isTranslationZAxisGizmoSelected;

let isTranslationXYPlaneGizmoSelected = editorState =>
  RecordTransformGizmoSceneViewEditorService.unsafeGetData(
    editorState.sceneViewRecord,
  ).
    isTranslationXYPlaneGizmoSelected;

let isTranslationXZPlaneGizmoSelected = editorState =>
  RecordTransformGizmoSceneViewEditorService.unsafeGetData(
    editorState.sceneViewRecord,
  ).
    isTranslationXZPlaneGizmoSelected;

let isTranslationYZPlaneGizmoSelected = editorState =>
  RecordTransformGizmoSceneViewEditorService.unsafeGetData(
    editorState.sceneViewRecord,
  ).
    isTranslationYZPlaneGizmoSelected;

let isSelectAnyTransformGizmo = editorState =>
  switch (
    RecordTransformGizmoSceneViewEditorService.getData(
      editorState.sceneViewRecord,
    )
  ) {
  | None => false
  | Some(_) =>
    isTranslationXAxisGizmoSelected(editorState)
    || isTranslationYAxisGizmoSelected(editorState)
    || isTranslationZAxisGizmoSelected(editorState)
    || isTranslationXYPlaneGizmoSelected(editorState)
    || isTranslationXZPlaneGizmoSelected(editorState)
    || isTranslationYZPlaneGizmoSelected(editorState)
  };

let markNotSelectAnyTranslationGizmo = editorState => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.unsafeGetData(
            editorState.sceneViewRecord,
          ),
        isTranslationXAxisGizmoSelected: false,
        isTranslationYAxisGizmoSelected: false,
        isTranslationZAxisGizmoSelected: false,
        isTranslationXYPlaneGizmoSelected: false,
        isTranslationXZPlaneGizmoSelected: false,
        isTranslationYZPlaneGizmoSelected: false,
      }),
  },
};

let onlySelectTranslationXYPlaneGizmo = editorState => {
  let editorState = editorState |> markNotSelectAnyTranslationGizmo;

  {
    ...editorState,
    sceneViewRecord: {
      ...editorState.sceneViewRecord,
      transformGizmoData:
        Some({
          ...
            RecordTransformGizmoSceneViewEditorService.unsafeGetData(
              editorState.sceneViewRecord,
            ),
          isTranslationXYPlaneGizmoSelected: true,
        }),
    },
  };
};

let onlySelectTranslationXZPlaneGizmo = editorState => {
  let editorState = editorState |> markNotSelectAnyTranslationGizmo;

  {
    ...editorState,
    sceneViewRecord: {
      ...editorState.sceneViewRecord,
      transformGizmoData:
        Some({
          ...
            RecordTransformGizmoSceneViewEditorService.unsafeGetData(
              editorState.sceneViewRecord,
            ),
          isTranslationXZPlaneGizmoSelected: true,
        }),
    },
  };
};

let onlySelectTranslationYZPlaneGizmo = editorState => {
  let editorState = editorState |> markNotSelectAnyTranslationGizmo;

  {
    ...editorState,
    sceneViewRecord: {
      ...editorState.sceneViewRecord,
      transformGizmoData:
        Some({
          ...
            RecordTransformGizmoSceneViewEditorService.unsafeGetData(
              editorState.sceneViewRecord,
            ),
          isTranslationYZPlaneGizmoSelected: true,
        }),
    },
  };
};

let onlySelectTranslationXAxisGizmo = editorState => {
  let editorState = editorState |> markNotSelectAnyTranslationGizmo;

  {
    ...editorState,
    sceneViewRecord: {
      ...editorState.sceneViewRecord,
      transformGizmoData:
        Some({
          ...
            RecordTransformGizmoSceneViewEditorService.unsafeGetData(
              editorState.sceneViewRecord,
            ),
          isTranslationXAxisGizmoSelected: true,
        }),
    },
  };
};

let onlySelectTranslationYAxisGizmo = editorState => {
  let editorState = editorState |> markNotSelectAnyTranslationGizmo;

  {
    ...editorState,
    sceneViewRecord: {
      ...editorState.sceneViewRecord,
      transformGizmoData:
        Some({
          ...
            RecordTransformGizmoSceneViewEditorService.unsafeGetData(
              editorState.sceneViewRecord,
            ),
          isTranslationYAxisGizmoSelected: true,
        }),
    },
  };
};

let onlySelectTranslationZAxisGizmo = editorState => {
  let editorState = editorState |> markNotSelectAnyTranslationGizmo;

  {
    ...editorState,
    sceneViewRecord: {
      ...editorState.sceneViewRecord,
      transformGizmoData:
        Some({
          ...
            RecordTransformGizmoSceneViewEditorService.unsafeGetData(
              editorState.sceneViewRecord,
            ),
          isTranslationZAxisGizmoSelected: true,
        }),
    },
  };
};