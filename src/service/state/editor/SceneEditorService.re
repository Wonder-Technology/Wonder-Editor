open EditorType;

let unsafeGetEditScene = (editorState) =>
  editorState.sceneRecord |> RootSceneService.unsafeGetEditScene;

let setEditScene = (scene, editorState) => {
  ...editorState,
  sceneRecord: editorState.sceneRecord |> RootSceneService.setEditScene(scene)
};

let unsafeGetRunScene = (editorState) =>
  editorState.sceneRecord |> RootSceneService.unsafeGetRunScene;

let setRunScene = (scene, editorState) => {
  ...editorState,
  sceneRecord: editorState.sceneRecord |> RootSceneService.setRunScene(scene)
};

let hasCurrentGameObject = (editorState) =>
  editorState.sceneRecord |> CurrentGameObjectSceneService.hasCurrentGameObject;

let unsafeGetCurrentGameObject = (editorState) =>
  editorState.sceneRecord |> CurrentGameObjectSceneService.unsafeGetCurrentGameObject;

let getCurrentGameObject = (editorState) =>
  editorState.sceneRecord |> CurrentGameObjectSceneService.getCurrentGameObject;

let setCurrentGameObject = (gameObject, editorState) => {
  ...editorState,
  sceneRecord:
    editorState.sceneRecord |> CurrentGameObjectSceneService.setCurrentGameObject(gameObject)
};

let clearCurrentGameObject = (editorState) => {
  ...editorState,
  sceneRecord: editorState.sceneRecord |> CurrentGameObjectSceneService.clearCurrentGameObject
};