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
      ((store, dispatchFunc), (), (targetNodeId, sourceNodeId)) => {
    let editorState = StateEditorService.getState();

    TreeAssetEditorService.isIdEqual(targetNodeId, sourceNodeId) ?
      dispatchFunc(AppStore.UpdateAction(Update([|Project|]))) |> ignore :
      {
        let editorState =
          editorState
          |> AssetTreeUtils.setSpecificAssetTreeNodeIsShowChildrenFromEditorState(
               targetNodeId,
               true,
             );

        let {type_}: AssetTreeNodeType.assetTreeNodeType =
          editorState
          |> TreeRootAssetEditorService.getAssetTreeRoot
          |> OptionService.unsafeGet
          |> TreeAssetEditorService.getSpecificTreeNodeById(sourceNodeId)
          |> OptionService.unsafeGet;

        let (newAssetTreeRoot, removedTreeNode) =
          editorState
          |> TreeRootAssetEditorService.unsafeGetAssetTreeRoot
          |> RemoveAssetTreeNodeAssetLogicService.removeSpecificTreeNode(
               sourceNodeId,
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
              sourceNodeId,
              targetNodeId |. Some,
              editorState,
            ),
            _setTextureNodeParent(
              sourceNodeId,
              targetNodeId |. Some,
              editorState,
            ),
            _setMaterialNodeParent(
              sourceNodeId,
              targetNodeId |. Some,
              editorState,
            ),
            _setWDBNodeParent(
              sourceNodeId,
              targetNodeId |. Some,
              editorState,
            ),
          ),
          editorState,
        );

        dispatchFunc(AppStore.UpdateAction(Update([|Project|]))) |> ignore;
      };
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);