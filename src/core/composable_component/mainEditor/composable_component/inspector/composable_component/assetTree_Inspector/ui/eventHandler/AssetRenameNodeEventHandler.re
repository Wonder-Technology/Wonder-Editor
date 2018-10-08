open AppStore;

open AssetNodeType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = (int, AssetNodeType.assetNodeType);
  type dataTuple = string;

  let _renameFolderNode =
      (nodeId, name, (editorState, engineState), folderNodeMap) => (
    folderNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
    |> AssetFolderNodeMapEditorService.renameFolderNodeResult(name)
    |> AssetFolderNodeMapEditorService.setResult(nodeId, _, editorState),
    engineState,
  );

  let _renameJsonNode =
      (nodeId, name, (editorState, engineState), jsonNodeMap) => (
    jsonNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
    |> AssetJsonNodeMapEditorService.renameJsonNodeResult(name)
    |> AssetJsonNodeMapEditorService.setResult(nodeId, _, editorState),
    engineState,
  );

  let _renameTextureNode =
      (nodeId, name, (editorState, engineState), textureNodeMap) => {
    let {textureIndex} =
      textureNodeMap |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

    (
      editorState,
      engineState
      |> BasicSourceTextureEngineService.setBasicSourceTextureName(
           name,
           textureIndex,
         ),
    );
  };

  let _renameMaterialNode =
      (nodeId, name, (editorState, engineState), materialNodeMap) => (
    editorState,
    engineState
    |> AssetMaterialNodeMapLogicService.setMaterialBaseName(
         nodeId,
         name,
         materialNodeMap,
       ),
  );

  let _renameWDBNode = (nodeId, name, (editorState, engineState), wdbNodeMap) => (
    wdbNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
    |> AssetWDBNodeMapEditorService.renameWDBNodeResult(name)
    |> AssetWDBNodeMapEditorService.setResult(nodeId, _, editorState),
    engineState,
  );

  let handleSelfLogic = ((store, dispatchFunc), (nodeId, nodeType), value) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();
    let stateTuple = (editorState, engineState);

    let (editorState, engineState) =
      AssetNodeUtils.handleSpeficFuncByAssetNodeType(
        nodeType,
        (
          _renameFolderNode(nodeId, value, stateTuple),
          _renameJsonNode(nodeId, value, stateTuple),
          _renameTextureNode(nodeId, value, stateTuple),
          _renameMaterialNode(nodeId, value, stateTuple),
          _renameWDBNode(nodeId, value, stateTuple),
        ),
        editorState,
      );

    StateEditorService.setState(editorState) |> ignore;
    StateEngineService.setState(engineState) |> ignore;

    dispatchFunc(
      AppStore.UpdateAction(Update([|UpdateStore.BottomComponent|])),
    )
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);