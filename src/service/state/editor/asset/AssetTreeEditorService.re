open AssetTreeNodeType;

open AssetNodeType;

let buildAssetTreeNodeByIndex = (index, type_) => {
  nodeId: index,
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

let getChildrenNameAndIdArr =
    (parentNodeId, fileTargetType, (editorState, engineState)) => {
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
            |> AssetUtils.getSpecificTreeNodeById(parentNodeId)
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
  |> AssetUtils.getSpecificTreeNodeById(parentNodeId)
  |> OptionService.unsafeGet
  |> (
    ({children}: assetTreeNodeType) =>
      children
      |> Js.Array.filter(({type_ as childType}: assetTreeNodeType) =>
           childType === fileTargetType
         )
      |> Js.Array.map(({nodeId as currentNodeId, type_}: assetTreeNodeType) => {
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
                    AssetMaterialNodeMapLogicService.getMaterialBaseName(
                      currentNodeId,
                      engineState,
                    ),
                    AssetWDBNodeMapEditorService.getWDBBaseName(
                      currentNodeId,
                    ),
                  ),
                );

           (name, nodeId);
         })
  );
};

let rec iterateNameArrBuildNewName = (name, childrenNameArr) =>
  childrenNameArr |> Js.Array.includes(name) ?
    childrenNameArr
    |> iterateNameArrBuildNewName(FileNameService.buildNameSucc(name)) :
    name;

let getUniqueTreeNodeName =
    (name, fileTargetType, parentNodeId, (editorState, engineState)) =>
  switch (parentNodeId) {
  | None => name
  | Some(parentNodeId) =>
    (editorState, engineState)
    |> getChildrenNameAndIdArr(parentNodeId, fileTargetType)
    |> Js.Array.map(((name, id)) => name)
    |> iterateNameArrBuildNewName(name)
  };