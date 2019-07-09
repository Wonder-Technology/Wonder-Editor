let getCubemapTextureComponent =
    (~nodeId, ~editorState=StateEditorService.getState(), ()) => {
  let {textureComponent}: NodeAssetType.cubemapNodeData =
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState)
    |> CubemapNodeAssetService.getNodeData;

  textureComponent;
};

let getCubemapName =
    (
      ~nodeId,
      ~editorState=StateEditorService.getState(),
      ~engineState=StateEngineService.unsafeGetState(),
      (),
    ) => {
  let {textureComponent}: NodeAssetType.cubemapNodeData =
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState)
    |> CubemapNodeAssetService.getNodeData;

  NodeNameAssetLogicService.getCubemapNodeName(
    ~texture=textureComponent,
    ~engineState,
  );
};