open CurrentNodeDataType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (int, int);
  type return = unit;

  let _setNodeParent =
      (
        nodeId,
        parentFolderNodeId,
        editorState,
        nodeMap,
        (setNodeResultParentFunc, setResultFunc),
      ) =>
    nodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
    |> setNodeResultParentFunc(parentFolderNodeId)
    |> setResultFunc(nodeId, _, editorState)
    |> StateEditorService.setState
    |> ignore;

  let _setFolderNodeParent =
      (folderId, parentFolderNodeId, editorState, folderNodeMap) =>
    _setNodeParent(
      folderId,
      parentFolderNodeId,
      editorState,
      folderNodeMap,
      (
        FolderNodeMapAssetEditorService.setFolderNodeResultParent,
        FolderNodeMapAssetEditorService.setResult,
      ),
    );

  let _setTextureNodeParent =
      (nodeId, parentFolderNodeId, editorState, textureNodeMap) =>
    _setNodeParent(
      nodeId,
      parentFolderNodeId,
      editorState,
      textureNodeMap,
      (
        TextureNodeMapAssetEditorService.setTextureNodeResultParent,
        TextureNodeMapAssetEditorService.setResult,
      ),
    );

  let _setMaterialNodeParent =
      (nodeId, parentFolderNodeId, editorState, materialNodeMap) =>
    _setNodeParent(
      nodeId,
      parentFolderNodeId,
      editorState,
      materialNodeMap,
      (
        MaterialNodeMapAssetEditorService.setMaterialNodeResultParent,
        MaterialNodeMapAssetEditorService.setResult,
      ),
    );

  let _setWDBNodeParent =
      (nodeId, parentFolderNodeId, editorState, wdbNodeMap) =>
    _setNodeParent(
      nodeId,
      parentFolderNodeId,
      editorState,
      wdbNodeMap,
      (
        WDBNodeMapAssetEditorService.setWDBNodeResultParent,
        WDBNodeMapAssetEditorService.setResult,
      ),
    );

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
          TreeAssetEditorService.getAssetNodeFromRoot(
            sourceNodeId,
            editorState,
          );

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