open EditorType;

open SceneViewType;

let isTranslationXAxisGizmoSelected = editorState =>
  RecordTransformGizmoSceneViewEditorService.getData(
    editorState.sceneViewRecord,
  ).
    isTranslationXAxisGizmoSelected;

let isTranslationYAxisGizmoSelected = editorState =>
  RecordTransformGizmoSceneViewEditorService.getData(
    editorState.sceneViewRecord,
  ).
    isTranslationYAxisGizmoSelected;

let isTranslationZAxisGizmoSelected = editorState =>
  RecordTransformGizmoSceneViewEditorService.getData(
    editorState.sceneViewRecord,
  ).
    isTranslationZAxisGizmoSelected;

let isSelectAnyTransformGizmo = editorState =>
  isTranslationXAxisGizmoSelected(editorState)
  || isTranslationYAxisGizmoSelected(editorState)
  || isTranslationZAxisGizmoSelected(editorState);

let notSelectAllTransformGizmo = editorState => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.getData(
            editorState.sceneViewRecord,
          ),
        isTranslationXAxisGizmoSelected: false,
        isTranslationYAxisGizmoSelected: false,
        isTranslationZAxisGizmoSelected: false,
      }),
  },
};

let onlySelectTranslationXAxisGizmo = editorState => {
  let editorState = editorState |> notSelectAllTransformGizmo;

  {
    ...editorState,
    sceneViewRecord: {
      ...editorState.sceneViewRecord,
      transformGizmoData:
        Some({
          ...
            RecordTransformGizmoSceneViewEditorService.getData(
              editorState.sceneViewRecord,
            ),
          isTranslationXAxisGizmoSelected: true,
        }),
    },
  };
};

let onlySelectTranslationYAxisGizmo = editorState => {
  let editorState = editorState |> notSelectAllTransformGizmo;

  {
    ...editorState,
    sceneViewRecord: {
      ...editorState.sceneViewRecord,
      transformGizmoData:
        Some({
          ...
            RecordTransformGizmoSceneViewEditorService.getData(
              editorState.sceneViewRecord,
            ),
          isTranslationYAxisGizmoSelected: true,
        }),
    },
  };
};

let onlySelectTranslationZAxisGizmo = editorState => {
  let editorState = editorState |> notSelectAllTransformGizmo;

  {
    ...editorState,
    sceneViewRecord: {
      ...editorState.sceneViewRecord,
      transformGizmoData:
        Some({
          ...
            RecordTransformGizmoSceneViewEditorService.getData(
              editorState.sceneViewRecord,
            ),
          isTranslationZAxisGizmoSelected: true,
        }),
    },
  };
};