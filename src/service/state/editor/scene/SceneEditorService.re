open EditorType;

let unsafeGetCurrentSceneTreeNode = editorState =>
  editorState.sceneRecord
  |> CurrentSceneTreeNodeSceneService.unsafeGetCurrentSceneTreeNode;

let getCurrentSceneTreeNode = editorState =>
  editorState.sceneRecord
  |> CurrentSceneTreeNodeSceneService.getCurrentSceneTreeNode;

let setCurrentSceneTreeNode = (gameObject, editorState) => {
  ...editorState,
  sceneRecord:
    editorState.sceneRecord
    |> CurrentSceneTreeNodeSceneService.setCurrentSceneTreeNode(gameObject),
};

let clearCurrentSceneTreeNode = editorState => {
  ...editorState,
  sceneRecord:
    editorState.sceneRecord
    |> CurrentSceneTreeNodeSceneService.clearCurrentSceneTreeNode,
};