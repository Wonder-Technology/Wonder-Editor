open NodeAssetType;

let getWrapClampType = () =>
  Wonderjs.SourceTextureType.Clamp_to_edge |> TextureTypeUtils.convertWrapToInt;

let getWrapRepeatType = () =>
  Wonderjs.SourceTextureType.Repeat |> TextureTypeUtils.convertWrapToInt;

let getWrapMirroredRepeatType = () =>
  Wonderjs.SourceTextureType.Mirrored_repeat
  |> TextureTypeUtils.convertWrapToInt;

let getFilterLinearMipmapLinearType = () =>
  Wonderjs.SourceTextureType.Linear_mipmap_linear
  |> TextureTypeUtils.convertFilterToInt;

let getFilterNearestType = () =>
  Wonderjs.SourceTextureType.Nearest |> TextureTypeUtils.convertFilterToInt;

let getFilterNearestMipmapLinearType = () =>
  Wonderjs.SourceTextureType.Nearest_mipmap_linear
  |> TextureTypeUtils.convertFilterToInt;

let getTextureComponentFromCurrentNodeData = () => {
  let editorState = StateEditorService.getState();

  let {textureComponent}: NodeAssetType.textureNodeData =
    OperateTreeAssetEditorService.getCurrentNode(editorState)
    |> OptionService.unsafeGet
    |> TextureNodeAssetService.getNodeData;

  textureComponent;
};

let changeWrapS =
    (
      ~textureComponent,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  InspectorChangeTextureWrapSEventHandler.MakeEventHandler.pushUndoStackWithTwoHandleFunc(
    (uiState, dispatchFunc),
    (),
    (textureComponent, value),
  );

let changeWrapT =
    (
      ~textureComponent,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  InspectorChangeTextureWrapTEventHandler.MakeEventHandler.pushUndoStackWithTwoHandleFunc(
    (uiState, dispatchFunc),
    (),
    (textureComponent, value),
  );

let changeMagFilter =
    (
      ~textureComponent,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  InspectorChangeTextureMagFilterEventHandler.MakeEventHandler.pushUndoStackWithTwoHandleFunc(
    (uiState, dispatchFunc),
    (),
    (textureComponent, value),
  );

let changeMinFilter =
    (
      ~textureComponent,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  InspectorChangeTextureMinFilterEventHandler.MakeEventHandler.pushUndoStackWithTwoHandleFunc(
    (uiState, dispatchFunc),
    (),
    (textureComponent, value),
  );

let getMagFilterOptions = TextureFilterUtils.getMagFilterOptions;

let getMinFilterOptions = TextureFilterUtils.getMinFilterOptions;