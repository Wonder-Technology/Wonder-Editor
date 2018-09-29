open AppStore;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = (int, AssetNodeType.assetNodeType);
  type dataTuple = string;

  let _renameFolderNode = (folderId, name, editorState, folderNodeMap) =>
    folderNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(folderId)
    |> AssetFolderNodeMapEditorService.renameFolderNodeResult(name)
    |> AssetFolderNodeMapEditorService.setResult(folderId, _, editorState)
    |> StateEditorService.setState
    |> ignore;

  let _renameJsonNode = (jsonId, name, editorState, jsonNodeMap) =>
    jsonNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(jsonId)
    |> AssetJsonNodeMapEditorService.renameJsonNodeResult(name)
    |> AssetJsonNodeMapEditorService.setResult(jsonId, _, editorState)
    |> StateEditorService.setState
    |> ignore;

  let _renameTextureNode = (textureIndex, name, _textureNodeMap) =>
    OperateTextureLogicService.renameTextureToEngine(textureIndex, name);

  let _renameWDBNode = (nodeId, name, editorState, wdbNodeMap) =>
    wdbNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
    |> AssetWDBNodeMapEditorService.renameWDBNodeResult(name)
    |> AssetWDBNodeMapEditorService.setResult(nodeId, _, editorState)
    |> StateEditorService.setState
    |> ignore;

  let handleSelfLogic = ((store, dispatchFunc), (nodeId, nodeType), value) => {
    let editorState = StateEditorService.getState();

    AssetNodeUtils.handleSpeficFuncByAssetNodeType(
      nodeType,
      (
        _renameFolderNode(nodeId, value, editorState),
        _renameJsonNode(nodeId, value, editorState),
        _renameTextureNode(nodeId, value),
        OperateMaterialLogicService.renameMaterialToEngine(nodeId, value),
        _renameWDBNode(nodeId, value, editorState),
      ),
      editorState,
    );

    dispatchFunc(
      AppStore.UpdateAction(Update([|UpdateStore.BottomComponent|])),
    )
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);