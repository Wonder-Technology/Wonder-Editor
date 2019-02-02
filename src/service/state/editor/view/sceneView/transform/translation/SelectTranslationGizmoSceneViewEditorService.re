open EditorType;

open SceneViewType;

let isTranslationXAxisGizmoSelected = editorState =>
  RecordTranslationGizmoSceneViewEditorService.unsafeGetData(editorState).
    isTranslationXAxisGizmoSelected;

let isTranslationYAxisGizmoSelected = editorState =>
  RecordTranslationGizmoSceneViewEditorService.unsafeGetData(editorState).
    isTranslationYAxisGizmoSelected;

let isTranslationZAxisGizmoSelected = editorState =>
  RecordTranslationGizmoSceneViewEditorService.unsafeGetData(editorState).
    isTranslationZAxisGizmoSelected;

let isTranslationXYPlaneGizmoSelected = editorState =>
  RecordTranslationGizmoSceneViewEditorService.unsafeGetData(editorState).
    isTranslationXYPlaneGizmoSelected;

let isTranslationXZPlaneGizmoSelected = editorState =>
  RecordTranslationGizmoSceneViewEditorService.unsafeGetData(editorState).
    isTranslationXZPlaneGizmoSelected;

let isTranslationYZPlaneGizmoSelected = editorState =>
  RecordTranslationGizmoSceneViewEditorService.unsafeGetData(editorState).
    isTranslationYZPlaneGizmoSelected;

let isSelectAnyTranslationGizmo = editorState =>
  switch (RecordTranslationGizmoSceneViewEditorService.getData(editorState)) {
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
            editorState,
          ),
        translationGizmoData: {
          ...
            RecordTranslationGizmoSceneViewEditorService.unsafeGetData(
              editorState,
            ),
          isTranslationXAxisGizmoSelected: false,
          isTranslationYAxisGizmoSelected: false,
          isTranslationZAxisGizmoSelected: false,
          isTranslationXYPlaneGizmoSelected: false,
          isTranslationXZPlaneGizmoSelected: false,
          isTranslationYZPlaneGizmoSelected: false,
        },
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
              editorState,
            ),
          translationGizmoData: {
            ...
              RecordTranslationGizmoSceneViewEditorService.unsafeGetData(
                editorState,
              ),
            isTranslationXYPlaneGizmoSelected: true,
          },
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
              editorState,
            ),
          translationGizmoData: {
            ...
              RecordTranslationGizmoSceneViewEditorService.unsafeGetData(
                editorState,
              ),
            isTranslationXZPlaneGizmoSelected: true,
          },
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
              editorState,
            ),
          translationGizmoData: {
            ...
              RecordTranslationGizmoSceneViewEditorService.unsafeGetData(
                editorState,
              ),
            isTranslationYZPlaneGizmoSelected: true,
          },
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
              editorState,
            ),
          translationGizmoData: {
            ...
              RecordTranslationGizmoSceneViewEditorService.unsafeGetData(
                editorState,
              ),
            isTranslationXAxisGizmoSelected: true,
          },
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
              editorState,
            ),
          translationGizmoData: {
            ...
              RecordTranslationGizmoSceneViewEditorService.unsafeGetData(
                editorState,
              ),
            isTranslationYAxisGizmoSelected: true,
          },
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
              editorState,
            ),
          translationGizmoData: {
            ...
              RecordTranslationGizmoSceneViewEditorService.unsafeGetData(
                editorState,
              ),
            isTranslationZAxisGizmoSelected: true,
          },
        }),
    },
  };
};