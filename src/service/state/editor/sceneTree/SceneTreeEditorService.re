open EditorType;

let unsafeGetCurrentSceneTreeNode = editorState =>
  editorState.sceneTreeRecord
  |> CurrentSceneTreeNodeSceneTreeService.unsafeGetCurrentSceneTreeNode;

let getCurrentSceneTreeNode = editorState =>
  editorState.sceneTreeRecord
  |> CurrentSceneTreeNodeSceneTreeService.getCurrentSceneTreeNode;

let setCurrentSceneTreeNode = (gameObject, editorState) => {
  ...editorState,
  sceneTreeRecord:
    editorState.sceneTreeRecord
    |> CurrentSceneTreeNodeSceneTreeService.setCurrentSceneTreeNode(
         gameObject,
       ),
};

let clearCurrentSceneTreeNode = editorState => {
  ...editorState,
  sceneTreeRecord:
    editorState.sceneTreeRecord
    |> CurrentSceneTreeNodeSceneTreeService.clearCurrentSceneTreeNode,
};

let getIsShowChildrenMap = ({sceneTreeRecord}) =>
  IsShowChildrenSceneTreeService.getIsShowChildrenMap(sceneTreeRecord);

let getDefaultIsShowChildren = () => false;

let getIsShowChildern = (gameObject, sceneGameObject, {sceneTreeRecord}) =>
  gameObject === sceneGameObject ?
    true :
    (
      switch (
        IsShowChildrenSceneTreeService.getIsShowChildrenMap(sceneTreeRecord)
        |> WonderCommonlib.SparseMapService.get(gameObject)
      ) {
      | None => getDefaultIsShowChildren()
      | Some(isShowChildren) => isShowChildren
      }
    );

let setIsShowChildren =
    (gameObject, isShowChildren, {sceneTreeRecord} as editorState) => {
  ...editorState,
  sceneTreeRecord: {
    ...sceneTreeRecord,
    isShowChildrenMap:
      IsShowChildrenSceneTreeService.getIsShowChildrenMap(sceneTreeRecord)
      |> WonderCommonlib.SparseMapService.set(gameObject, isShowChildren),
  },
};