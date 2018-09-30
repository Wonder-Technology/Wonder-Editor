open AssetTreeNodeType;

open AssetNodeType;

let buildAssetTreeNodeByIndex = (index, type_) => {
  id: index,
  type_,
  children: [||],
};

let deepDisposeAssetTreeRoot = editorState => {
  let removedTreeNode =
    editorState
    |> AssetTreeRootEditorService.getAssetTreeRoot
    |> OptionService.unsafeGet;

  let (editorState, removedAssetIdArr) =
    editorState |> AssetUtils.deepRemoveTreeNode(removedTreeNode);

  editorState
  |> AssetRemovedAssetIdArrayEditorService.getRemovedAssetIdArray
  |> Js.Array.concat(removedAssetIdArr)
  |. AssetRemovedAssetIdArrayEditorService.setRemovedAssetIdArray(
       editorState,
     )
  |> AssetTreeRootEditorService.clearAssetTreeRoot
  |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
  |> AssetCurrentNodeDataEditorService.clearCurrentNodeData;
};

let getChildrenNameAndIdArr = (parentId, fileTargetType, editorState) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          test(
            Log.buildAssertMessage(
              ~expect={j|the parent asset node type should be Folder|j},
              ~actual={j|not|j},
            ),
            () =>
            editorState
            |> AssetTreeRootEditorService.getAssetTreeRoot
            |> OptionService.unsafeGet
            |> AssetUtils.getSpecificTreeNodeById(parentId)
            |> OptionService.unsafeGet
            |> (({type_}) => type_ == Folder |> assertTrue)
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  editorState
  |> AssetTreeRootEditorService.getAssetTreeRoot
  |> OptionService.unsafeGet
  |> AssetUtils.getSpecificTreeNodeById(parentId)
  |> OptionService.unsafeGet
  |> (
    ({children}: assetTreeNodeType) =>
      children
      |> Js.Array.filter(({type_ as childType}: assetTreeNodeType) =>
           childType === fileTargetType
         )
      |> Js.Array.map(({id as currentNodeId, type_}: assetTreeNodeType) => {
           let name =
             editorState
             |> AssetNodeUtils.handleSpeficFuncByAssetNodeType(
                  type_,
                  (
                    AssetFolderNodeMapEditorService.getFolderName(
                      currentNodeId,
                    ),
                    AssetJsonNodeMapEditorService.getJsonBaseName(
                      currentNodeId,
                    ),
                    OperateTextureLogicService.getTextureBaseName(
                      currentNodeId,
                    ),
                    OperateMaterialLogicService.getMaterialBaseName(
                      currentNodeId,
                    ),
                    AssetWDBNodeMapEditorService.getWDBBaseName(
                      currentNodeId,
                    ),
                  ),
                );

           (name, id);
         })
  );
};

let rec iterateNameArrBuildNewName = (name, childrenNameArr) =>
  childrenNameArr |> Js.Array.includes(name) ?
    childrenNameArr
    |> iterateNameArrBuildNewName(FileNameService.buildNameSucc(name)) :
    name;

let getUniqueTreeNodeName = (name, fileTargetType, parentId, editorState) =>
  switch (parentId) {
  | None => name
  | Some(parentId) =>
    editorState
    |> getChildrenNameAndIdArr(parentId, fileTargetType)
    |> Js.Array.map(((name, id)) => name)
    |> iterateNameArrBuildNewName(name)
  };

let isTargetTreeNodeHasSameNameChild =
    (targetId as parentId, removedId, editorState) => {
  let {type_}: assetTreeNodeType =
    editorState
    |> AssetTreeRootEditorService.getAssetTreeRoot
    |> OptionService.unsafeGet
    |> AssetUtils.getSpecificTreeNodeById(removedId)
    |> OptionService.unsafeGet;

  let removedNodeName =
    editorState
    |> AssetNodeUtils.handleSpeficFuncByAssetNodeType(
         type_,
         (
           AssetFolderNodeMapEditorService.getFolderName(removedId),
           AssetJsonNodeMapEditorService.getJsonBaseName(removedId),
           OperateTextureLogicService.getTextureBaseName(removedId),
           OperateMaterialLogicService.getMaterialBaseName(removedId),
           AssetWDBNodeMapEditorService.getWDBBaseName(removedId),
         ),
       );

  getChildrenNameAndIdArr(parentId, type_, editorState)
  |> Js.Array.map(((name, id)) => name)
  |> Js.Array.includes(removedNodeName) ?
    {
      ConsoleUtils.warn("the folder is can't has same name !");

      true;
    } :
    false;
};

let rec _isRemovedTreeNodeBeTargetParent = (targetId, removedTreeNode) =>
  AssetUtils.isIdEqual(targetId, removedTreeNode.id) ?
    true :
    removedTreeNode.children
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. result, child) =>
           result ? true : _isRemovedTreeNodeBeTargetParent(targetId, child),
         false,
       );

let _isTargetTreeNodeBeRemovedParent = (targetTreeNode, removedId) =>
  targetTreeNode.children
  |> Js.Array.filter(child => AssetUtils.isIdEqual(child.id, removedId))
  |> Js.Array.length >= 1 ?
    true : false;

let isTreeNodeRelationError =
    (targetId, removedId, (editorState, _engineState)) =>
  AssetUtils.isIdEqual(targetId, removedId) ?
    true :
    _isRemovedTreeNodeBeTargetParent(
      targetId,
      editorState
      |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
      |> AssetUtils.getSpecificTreeNodeById(removedId)
      |> OptionService.unsafeGet,
    ) ?
      true :
      _isTargetTreeNodeBeRemovedParent(
        editorState
        |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
        |> AssetUtils.getSpecificTreeNodeById(targetId)
        |> OptionService.unsafeGet,
        removedId,
      )
      || isTargetTreeNodeHasSameNameChild(targetId, removedId, editorState);