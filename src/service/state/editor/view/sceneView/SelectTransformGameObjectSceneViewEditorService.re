open EditorType;

open SceneViewType;

let isTranslationXAxisGameObjectSelected = editorState =>
  RecordTransformGameObjectSceneViewEditorService.getData(
    editorState.sceneViewRecord,
  ).
    isTranslationXAxisGameObjectSelected;

let isTranslationYAxisGameObjectSelected = editorState =>
  RecordTransformGameObjectSceneViewEditorService.getData(
    editorState.sceneViewRecord,
  ).
    isTranslationYAxisGameObjectSelected;

let isTranslationZAxisGameObjectSelected = editorState =>
  RecordTransformGameObjectSceneViewEditorService.getData(
    editorState.sceneViewRecord,
  ).
    isTranslationZAxisGameObjectSelected;

let isSelectAnyTransformGameObject = editorState =>
  isTranslationXAxisGameObjectSelected(editorState)
  || isTranslationYAxisGameObjectSelected(editorState)
  || isTranslationZAxisGameObjectSelected(editorState);

let notSelectAllTransformGameObject = editorState => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGameObjectData:
      Some({
        ...
          RecordTransformGameObjectSceneViewEditorService.getData(
            editorState.sceneViewRecord,
          ),
        isTranslationXAxisGameObjectSelected: false,
        isTranslationYAxisGameObjectSelected: false,
        isTranslationZAxisGameObjectSelected: false,
      }),
  },
};

let onlySelectTranslationXAxisGameObject = editorState => {
  let editorState = editorState |> notSelectAllTransformGameObject;

  {
    ...editorState,
    sceneViewRecord: {
      ...editorState.sceneViewRecord,
      transformGameObjectData:
        Some({
          ...
            RecordTransformGameObjectSceneViewEditorService.getData(
              editorState.sceneViewRecord,
            ),
          isTranslationXAxisGameObjectSelected: true,
        }),
    },
  };
};

let onlySelectTranslationYAxisGameObject = editorState => {
  let editorState = editorState |> notSelectAllTransformGameObject;

  {
    ...editorState,
    sceneViewRecord: {
      ...editorState.sceneViewRecord,
      transformGameObjectData:
        Some({
          ...
            RecordTransformGameObjectSceneViewEditorService.getData(
              editorState.sceneViewRecord,
            ),
          isTranslationYAxisGameObjectSelected: true,
        }),
    },
  };
};

let onlySelectTranslationZAxisGameObject = editorState => {
  let editorState = editorState |> notSelectAllTransformGameObject;

  {
    ...editorState,
    sceneViewRecord: {
      ...editorState.sceneViewRecord,
      transformGameObjectData:
        Some({
          ...
            RecordTransformGameObjectSceneViewEditorService.getData(
              editorState.sceneViewRecord,
            ),
          isTranslationZAxisGameObjectSelected: true,
        }),
    },
  };
};