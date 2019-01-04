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

let getIsShowChildrenMap = ({sceneRecord}) =>
  IsShowChildrenSceneService.getIsShowChildrenMap(sceneRecord);

let _getSceneTreeNodeIsShowChildren = () => true;

let getIsShowChildern = (gameObject, sceneGameObject, {sceneRecord}) =>
  gameObject === sceneGameObject ?
    _getSceneTreeNodeIsShowChildren() :
    (
      switch (
        IsShowChildrenSceneService.getIsShowChildrenMap(sceneRecord)
        |> WonderCommonlib.SparseMapService.get(gameObject)
      ) {
      | None => false
      | Some(isShowChildren) => isShowChildren
      }
    );

let setIsShowChildren =
    (gameObject, isShowChildren, {sceneRecord} as editorState) => {
  ...editorState,
  sceneRecord: {
    ...sceneRecord,
    isShowChildrenMap:
      IsShowChildrenSceneService.getIsShowChildrenMap(sceneRecord)
      |> WonderCommonlib.SparseMapService.set(gameObject, isShowChildren),
  },
};