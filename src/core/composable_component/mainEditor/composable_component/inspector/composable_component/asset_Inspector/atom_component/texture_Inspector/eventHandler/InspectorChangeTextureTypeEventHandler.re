module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (NodeAssetType.nodeId, int);
  type return = unit;

  let _updateEngineData = (node, editorState, engineState) =>
    engineState
    |> IMGUIAssetLogicService.removeSettedAssets(
         (
           TextureNodeAssetService.getType(node),
           TextureNodeAssetService.getTextureContentIndex(node),
           TextureNodeAssetService.getTextureComponent(node),
         ),
         editorState,
         StateLogicService.renderEngineStateAndReturnEngineState,
       );

  let _removeOldTextureContent = (nodeId, editorState) =>
    TextureContentTextureNodeAssetEditorService.removeTextureContent(
      IMGUICustomImageTypeTextureNodeAssetEditorService.getTextureContentIndex(
        nodeId,
        editorState,
      ),
      editorState,
    );

  let _updateEditorData = (nodeId, newType, editorState) =>
    switch (newType) {
    | NodeAssetType.BasicSource =>
      let nodeData =
        TextureNodeAssetEditorService.unsafeGetNodeData(nodeId, editorState);

      editorState
      |> _removeOldTextureContent(nodeId)
      |> TextureNodeAssetEditorService.setNodeData(
           nodeId,
           {...nodeData, type_: newType, textureContentIndex: None},
         );
    | NodeAssetType.IMGUICustomImage =>
      let (editorState, newTextureContentIndex) =
        IndexAssetEditorService.generateIMGUICustomImageTextureContentIndex(
          editorState,
        );

      let nodeData =
        TextureNodeAssetEditorService.unsafeGetNodeData(nodeId, editorState);

      editorState
      |> _removeOldTextureContent(nodeId)
      |> TextureNodeAssetEditorService.setNodeData(
           nodeId,
           {
             ...nodeData,
             type_: newType,
             textureContentIndex: Some(newTextureContentIndex),
           },
         )
      |> IMGUICustomImageTextureContentMapAssetEditorService.setContent(
           newTextureContentIndex,
           IMGUICustomImageTextureContentMapAssetEditorService.generateEmptyContent(),
         );
    };

  let handleSelfLogic = ((uiState, dispatchFunc), (), (nodeId, value)) => {
    let editorState = StateEditorService.getState();

    let node =
      OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState);

    _updateEngineData(node, editorState)
    |> StateLogicService.getAndSetEngineState;

    editorState
    |> _updateEditorData(
         nodeId,
         value |> NodeAssetType.convertIntToTextureType,
       )
    |> StateEditorService.setState
    |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);