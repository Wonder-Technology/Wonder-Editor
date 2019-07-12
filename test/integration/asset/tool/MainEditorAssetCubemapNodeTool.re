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
    ) =>
  NodeNameAssetLogicService.getCubemapNodeName(
    ~texture=getCubemapTextureComponent(~nodeId, ~editorState, ()),
    ~engineState,
  );

let setAllSources =
    (
      ~nodeId,
      ~editorState=StateEditorService.getState(),
      ~engineState=StateEngineService.unsafeGetState(),
      (),
    ) =>
  CubemapTextureToolEngine.setAllSources(
    ~engineState=StateEngineService.unsafeGetState(),
    ~texture=getCubemapTextureComponent(~nodeId, ~editorState, ()),
    (),
  );