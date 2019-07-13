module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  type return = unit;

  let handleSelfLogic = ((uiState, dispatchFunc), (), ()) => {
    let engineState = StateEngineService.unsafeGetState();
    let (editorState, newNodeId) =
      IdAssetEditorService.generateNodeId |> StateLogicService.getEditorState;
    let targetTreeNode =
      editorState
      |> OperateTreeAssetEditorService.unsafeGetSelectedFolderNodeInAssetTree;

    let cubemapName =
      engineState
      |> OperateTreeAssetLogicService.getUniqueNodeName(
           OperateCubemapLogicService.getNewCubemapName(),
           targetTreeNode,
         );

    let (engineState, newCubemap) =
      CubemapTextureEngineService.create(engineState);

    let engineState =
      engineState
      |> CubemapTextureEngineService.setCubemapTextureName(
           cubemapName,
           newCubemap,
         )
      |> CubemapTextureEngineService.initTexture(newCubemap);

    let (editorState, imageDataIndex) =
      CubemapTextureImageDataMapAssetEditorService.addEmptyData(editorState);

    let editorState =
      CubemapNodeAssetEditorService.addCubemapNodeToAssetTree(
        targetTreeNode,
        CubemapNodeAssetService.buildNode(
          ~nodeId=newNodeId,
          ~textureComponent=newCubemap,
          ~imageDataIndex,
        ),
        editorState,
      );

    editorState |> StateEditorService.setState |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Project|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);