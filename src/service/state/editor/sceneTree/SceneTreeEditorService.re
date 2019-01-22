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

let hasCurrentSceneTreeNode = editorState =>
  editorState.sceneTreeRecord
  |> CurrentSceneTreeNodeSceneTreeService.getCurrentSceneTreeNode
  |> Js.Option.isSome;

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
        |> WonderCommonlib.ImmutableSparseMapService.get(gameObject)
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
      |> WonderCommonlib.ImmutableSparseMapService.set(
           gameObject,
           isShowChildren,
         ),
  },
};

let removeIsShowChildren = (gameObject, {sceneTreeRecord} as editorState) => {
  ...editorState,
  sceneTreeRecord: {
    ...sceneTreeRecord,
    isShowChildrenMap:
      IsShowChildrenSceneTreeService.getIsShowChildrenMap(sceneTreeRecord)
      |> Obj.magic
      |> WonderCommonlib.ImmutableSparseMapService.deleteVal(gameObject)
      |> Obj.magic,
  },
};