open EditorType;

open SceneViewType;

let unsafeGetTranslationWholeGameObject = editorState =>
  RecordTransformGameObjectSceneViewEditorService.getData(
    editorState.sceneViewRecord,
  ).
    translationWholeGameObject;

let setTranslationWholeGameObject = (gameObject, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGameObjectData:
      Some({
        ...
          RecordTransformGameObjectSceneViewEditorService.getData(
            editorState.sceneViewRecord,
          ),
        translationWholeGameObject: gameObject,
      }),
  },
};

let unsafeGetTranslationXAxisGameObject = editorState =>
  RecordTransformGameObjectSceneViewEditorService.getData(
    editorState.sceneViewRecord,
  ).
    translationXAxisGameObject;

let setTranslationXAxisGameObject = (gameObject, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGameObjectData:
      Some({
        ...
          RecordTransformGameObjectSceneViewEditorService.getData(
            editorState.sceneViewRecord,
          ),
        translationXAxisGameObject: gameObject,
      }),
  },
};

let unsafeGetTranslationYAxisGameObject = editorState =>
  RecordTransformGameObjectSceneViewEditorService.getData(
    editorState.sceneViewRecord,
  ).
    translationYAxisGameObject;

let setTranslationYAxisGameObject = (gameObject, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGameObjectData:
      Some({
        ...
          RecordTransformGameObjectSceneViewEditorService.getData(
            editorState.sceneViewRecord,
          ),
        translationYAxisGameObject: gameObject,
      }),
  },
};

let unsafeGetTranslationZAxisGameObject = editorState =>
  RecordTransformGameObjectSceneViewEditorService.getData(
    editorState.sceneViewRecord,
  ).
    translationZAxisGameObject;

let setTranslationZAxisGameObject = (gameObject, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGameObjectData:
      Some({
        ...
          RecordTransformGameObjectSceneViewEditorService.getData(
            editorState.sceneViewRecord,
          ),
        translationZAxisGameObject: gameObject,
      }),
  },
};