open EditorType;

let getIsRun = (editorState) => editorState.sceneRecord |> IsRunSceneService.getIsRun;

let setIsRun = (isRun, editorState) => {
  ...editorState,
  sceneRecord: editorState.sceneRecord |> IsRunSceneService.setIsRun(isRun)
};

let unsafeGetScene = (editorState) => editorState.sceneRecord |> RootSceneService.unsafeGetScene;

let setScene = (scene, editorState) => {
  ...editorState,
  sceneRecord: editorState.sceneRecord |> RootSceneService.setScene(scene)
};

let unsafeGetDiffMap = (editorState) =>
  editorState.sceneRecord |> DiffMapSceneService.unsafeGetDiffMap;

let setDiffMap = (diffMap, editorState) => {
  ...editorState,
  sceneRecord: editorState.sceneRecord |> DiffMapSceneService.setDiffMap(diffMap)
};

/* let hasCurrentGameObject = (editorState) =>
  editorState.sceneRecord |> CurrentGameObjectSceneService.hasCurrentGameObject; */

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