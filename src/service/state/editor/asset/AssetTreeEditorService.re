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

  WonderLog.Log.print(removedTreeNode) |> ignore;

  let (editorState, removedAssetIdArr) =
    editorState |> AssetUtils.deepRemoveTreeNode(removedTreeNode);

  let ed =
    editorState
    |> AssetRemovedAssetIdArrayEditorService.getRemovedAssetIdArray
    |> Js.Array.concat(removedAssetIdArr)
    |. AssetRemovedAssetIdArrayEditorService.setRemovedAssetIdArray(
         editorState,
       )
    |> AssetTreeRootEditorService.clearAssetTreeRoot
    |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
    |> AssetCurrentNodeDataEditorService.clearCurrentNodeData;

  ed
  |> AssetRemovedAssetIdArrayEditorService.getRemovedAssetIdArray
  |> WonderLog.Log.print;

  ed;
};

let _getChildrenNameArr = (parentId, fileTargetType, editorState) => {
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
                    AssetMaterialNodeMapEditorService.getMaterialBaseName(
                      currentNodeId,
                    ),
                    AssetWDBNodeMapEditorService.getWDBBaseName(
                      currentNodeId,
                    ),
                  ),
                );

           name;
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
    |> _getChildrenNameArr(parentId, fileTargetType)
    |> iterateNameArrBuildNewName(name)
  };