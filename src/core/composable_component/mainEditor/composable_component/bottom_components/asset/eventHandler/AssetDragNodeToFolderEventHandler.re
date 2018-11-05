open CurrentNodeDataType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (int, int);

  let _setFolderNodeParent =
      (folderId, parentFolderNodeId, editorState, folderNodeMap) =>
    folderNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(folderId)
    |> FolderNodeMapAssetEditorService.setFolderNodeResultParent(
         parentFolderNodeId,
       )
    |> FolderNodeMapAssetEditorService.setResult(folderId, _, editorState)
    |> StateEditorService.setState
    |> ignore;

  let _setTextureNodeParent =
      (textureComponent, parentFolderNodeId, editorState, textureNodeMap) =>
    textureNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(textureComponent)
    |> TextureNodeMapAssetEditorService.setTextureNodeResultParent(
         parentFolderNodeId,
       )
    |> TextureNodeMapAssetEditorService.setResult(
         textureComponent,
         _,
         editorState,
       )
    |> StateEditorService.setState
    |> ignore;

  let _setMaterialNodeParent =
      (nodeId, parentFolderNodeId, editorState, materialNodeMap) =>
    materialNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
    |> MaterialNodeMapAssetEditorService.setMaterialNodeResultParent(
         parentFolderNodeId,
       )
    |> MaterialNodeMapAssetEditorService.setResult(nodeId, _, editorState)
    |> StateEditorService.setState
    |> ignore;

  let _setWDBNodeParent =
      (nodeId, parentFolderNodeId, editorState, wdbNodeMap) =>
    wdbNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
    |> WDBNodeMapAssetEditorService.setWDBNodeResultParent(
         parentFolderNodeId,
       )
    |> WDBNodeMapAssetEditorService.setResult(nodeId, _, editorState)
    |> StateEditorService.setState
    |> ignore;

  let handleSelfLogic =
      ((store, dispatchFunc), (), (targetNodeId, removedNodeId)) => {
    let editorState = StateEditorService.getState();

    TreeAssetEditorService.isIdEqual(targetNodeId, removedNodeId) ?
      dispatchFunc(AppStore.UpdateAction(Update([|BottomComponent|])))
      |> ignore :
      {
        let {type_}: AssetTreeNodeType.assetTreeNodeType =
          editorState
          |> TreeRootAssetEditorService.getAssetTreeRoot
          |> OptionService.unsafeGet
          |> TreeAssetEditorService.getSpecificTreeNodeById(removedNodeId)
          |> OptionService.unsafeGet;

        let (newAssetTreeRoot, removedTreeNode) =
          editorState
          |> TreeRootAssetEditorService.unsafeGetAssetTreeRoot
          |> RemoveNodeAssetTreeAssetEditorService.removeSpecificTreeNode(
               removedNodeId,
             );

        let editorState =
          newAssetTreeRoot
          |> AssetTreeUtils.insertSourceTreeNodeToTargetTreeNodeChildren(
               targetNodeId,
               removedTreeNode,
             )
          |. TreeRootAssetEditorService.setAssetTreeRoot(editorState);

        AssetNodeUtils.handleSpeficFuncByAssetNodeType(
          type_,
          (
            _setFolderNodeParent(
              removedNodeId,
              targetNodeId |. Some,
              editorState,
            ),
            _setTextureNodeParent(
              removedNodeId,
              targetNodeId |. Some,
              editorState,
            ),
            _setMaterialNodeParent(
              removedNodeId,
              targetNodeId |. Some,
              editorState,
            ),
            _setWDBNodeParent(
              removedNodeId,
              targetNodeId |. Some,
              editorState,
            ),
          ),
          editorState,
        );

        dispatchFunc(AppStore.UpdateAction(Update([|BottomComponent|])))
        |> ignore;
      };
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);