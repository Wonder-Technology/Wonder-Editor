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
      }),
  },
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