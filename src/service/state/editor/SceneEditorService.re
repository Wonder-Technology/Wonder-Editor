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

/* let hasCurrentSceneTreeNode = (editorState) =>
  editorState.sceneRecord |> CurrentSceneTreeNodeSceneService.hasCurrentSceneTreeNode; */

let unsafeGetCurrentSceneTreeNode = (editorState) =>
  editorState.sceneRecord |> CurrentSceneTreeNodeSceneService.unsafeGetCurrentSceneTreeNode;

let getCurrentSceneTreeNode = (editorState) =>
  editorState.sceneRecord |> CurrentSceneTreeNodeSceneService.getCurrentSceneTreeNode;

let setCurrentSceneTreeNode = (gameObject, editorState) => {
  ...editorState,
  sceneRecord:
    editorState.sceneRecord |> CurrentSceneTreeNodeSceneService.setCurrentSceneTreeNode(gameObject)
};

let clearCurrentSceneTreeNode = (editorState) => {
  ...editorState,
  sceneRecord: editorState.sceneRecord |> CurrentSceneTreeNodeSceneService.clearCurrentSceneTreeNode
};