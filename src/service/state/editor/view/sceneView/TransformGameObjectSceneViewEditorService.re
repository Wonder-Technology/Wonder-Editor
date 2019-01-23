open EditorType;

open SceneViewType;

let _getData = sceneViewRecord =>
  sceneViewRecord.transformGameObjectData |> OptionService.unsafeGet;

let unsafeGetTranslationWholeGameObject = editorState =>
  _getData(editorState.sceneViewRecord).translationWholeGameObject;

let setTranslationWholeGameObject = (gameObject, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGameObjectData:
      Some({
        ..._getData(editorState.sceneViewRecord),
        translationWholeGameObject: gameObject,
      }),
  },
};

let setTranslationXAxisGameObject = (gameObject, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGameObjectData:
      Some({
        ..._getData(editorState.sceneViewRecord),
        translationXAxisGameObject: gameObject,
      }),
  },
};

let setTranslationYAxisGameObject = (gameObject, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGameObjectData:
      Some({
        ..._getData(editorState.sceneViewRecord),
        translationYAxisGameObject: gameObject,
      }),
  },
};

let setTranslationZAxisGameObject = (gameObject, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGameObjectData:
      Some({
        ..._getData(editorState.sceneViewRecord),
        translationZAxisGameObject: gameObject,
      }),
  },
};