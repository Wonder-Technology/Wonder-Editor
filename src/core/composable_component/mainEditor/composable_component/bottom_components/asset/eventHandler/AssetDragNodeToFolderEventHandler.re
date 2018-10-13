open CurrentNodeDataType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (int, int);

  let _setFolderNodeParent = (folderId, parentNodeId, editorState, folderNodeMap) =>
    folderNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(folderId)
    |> AssetFolderNodeMapEditorService.setFolderNodeResultParent(parentNodeId)
    |> AssetFolderNodeMapEditorService.setResult(folderId, _, editorState)
    |> StateEditorService.setState
    |> ignore;

  let _setJsonNodeParent = (jsonId, parentNodeId, editorState, jsonNodeMap) =>
    jsonNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(jsonId)
    |> AssetJsonNodeMapEditorService.setJsonNodeResultParent(parentNodeId)
    |> AssetJsonNodeMapEditorService.setResult(jsonId, _, editorState)
    |> StateEditorService.setState
    |> ignore;

  let _setTextureNodeParent =
      (textureComponent, parentNodeId, editorState, textureNodeMap) =>
    textureNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(textureComponent)
    |> AssetTextureNodeMapEditorService.setTextureNodeResultParent(parentNodeId)
    |> AssetTextureNodeMapEditorService.setResult(
         textureComponent,
         _,
         editorState,
       )
    |> StateEditorService.setState
    |> ignore;

  let _setMaterialNodeParent =
      (nodeId, parentNodeId, editorState, materialNodeMap) =>
    materialNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
    |> AssetMaterialNodeMapEditorService.setMaterialNodeResultParent(
         parentNodeId,
       )
    |> AssetMaterialNodeMapEditorService.setResult(nodeId, _, editorState)
    |> StateEditorService.setState
    |> ignore;

  let _setWDBNodeParent = (nodeId, parentNodeId, editorState, wdbNodeMap) =>
    wdbNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
    |> AssetWDBNodeMapEditorService.setWDBNodeResultParent(parentNodeId)
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