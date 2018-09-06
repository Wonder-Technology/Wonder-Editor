open CurrentNodeDataType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (int, int);

  let _setFolderNodeParent = (folderId, parentId, editorState, folderNodeMap) =>
    folderNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(folderId)
    |> AssetFolderNodeMapEditorService.setFolderNodeResultParent(parentId)
    |> AssetFolderNodeMapEditorService.setResult(folderId, _, editorState)
    |> StateEditorService.setState
    |> ignore;

  let _setJsonNodeParent = (jsonId, parentId, editorState, jsonNodeMap) =>
    jsonNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(jsonId)
    |> AssetJsonNodeMapEditorService.setJsonNodeResultParent(parentId)
    |> AssetJsonNodeMapEditorService.setResult(jsonId, _, editorState)
    |> StateEditorService.setState
    |> ignore;

  let _setTextureNodeParent =
      (textureIndex, parentId, editorState, textureNodeMap) =>
    textureNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(textureIndex)
    |> AssetTextureNodeMapEditorService.setTextureNodeResultParent(parentId)
    |> AssetTextureNodeMapEditorService.setResult(
         textureIndex,
         _,
         editorState,
       )
    |> StateEditorService.setState
    |> ignore;

  let _setMaterialNodeParent =
      (nodeId, parentId, editorState, materialNodeMap) =>
    materialNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
    |> AssetMaterialNodeMapEditorService.setMaterialNodeResultParent(
         parentId,
       )
    |> AssetMaterialNodeMapEditorService.setResult(nodeId, _, editorState)
    |> StateEditorService.setState
    |> ignore;

  let _setWDBNodeParent = (nodeId, parentId, editorState, wdbNodeMap) =>
    wdbNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
    |> AssetWDBNodeMapEditorService.setWDBNodeResultParent(parentId)
    |> AssetWDBNodeMapEditorService.setResult(nodeId, _, editorState)
    |> StateEditorService.setState
    |> ignore;

  let handleSelfLogic = ((store, dispatchFunc), (), (targetId, removedId)) => {
    let editorState = StateEditorService.getState();

    AssetUtils.isIdEqual(targetId, removedId) ?
      dispatchFunc(AppStore.UpdateAction(Update([|BottomComponent|])))
      |> ignore :
      {
        let {type_}: AssetTreeNodeType.assetTreeNodeType =
          editorState
          |> AssetTreeRootEditorService.getAssetTreeRoot
          |> OptionService.unsafeGet
          |> AssetUtils.getSpecificTreeNodeById(removedId)
          |> OptionService.unsafeGet;

        let (newAssetTreeRoot, removedTreeNode) =
          editorState
          |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
          |> AssetUtils.removeSpecificTreeNode(removedId);

        let editorState =
          newAssetTreeRoot
          |> AssetUtils.insertSourceTreeNodeToTargetTreeNodeChildren(
               targetId,
               removedTreeNode,
             )
          |. AssetTreeRootEditorService.setAssetTreeRoot(editorState);

        AssetNodeUtils.handleSpeficFuncByAssetNodeType(
          type_,
          (
            _setFolderNodeParent(removedId, targetId |. Some, editorState),
            _setJsonNodeParent(removedId, targetId |. Some, editorState),
            _setTextureNodeParent(removedId, targetId |. Some, editorState),
            _setMaterialNodeParent(removedId, targetId |. Some, editorState),
            _setWDBNodeParent(removedId, targetId |. Some, editorState),
          ),
          editorState
        );

        dispatchFunc(AppStore.UpdateAction(Update([|BottomComponent|])))
        |> ignore;
      };
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);