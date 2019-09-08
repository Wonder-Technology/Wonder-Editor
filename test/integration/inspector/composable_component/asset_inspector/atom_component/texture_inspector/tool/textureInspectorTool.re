open NodeAssetType;

let getWrapClampType = () =>
  Wonderjs.TextureType.Clamp_to_edge |> TextureTypeUtils.convertWrapToInt;

let getWrapRepeatType = () =>
  Wonderjs.TextureType.Repeat |> TextureTypeUtils.convertWrapToInt;

let getWrapMirroredRepeatType = () =>
  Wonderjs.TextureType.Mirrored_repeat |> TextureTypeUtils.convertWrapToInt;

let getFilterLinearMipmapLinearType = () =>
  Wonderjs.TextureType.Linear_mipmap_linear
  |> TextureTypeUtils.convertFilterToInt;

let getFilterNearestType = () =>
  Wonderjs.TextureType.Nearest |> TextureTypeUtils.convertFilterToInt;

let getFilterNearestMipmapLinearType = () =>
  Wonderjs.TextureType.Nearest_mipmap_linear
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

let changeType = (~nodeId, ~type_, ~dispatchFunc=TestTool.getDispatch(), ()) =>
  TextureInspector.Method.changeTextureType(
    dispatchFunc,
    nodeId,
    type_ |> NodeAssetType.convertTextureTypeToInt,
  );

module IMGUICustomImageType = {
  let setCustomImageId =
      (
        ~nodeId,
        ~textureContentIndex=IMGUICustomImageTypeTextureNodeAssetEditorService.unsafeGetTextureContentIndex(
                               nodeId,
                             )
                             |> StateLogicService.getEditorState,
        ~customImageId,
        ~editorState=StateEditorService.getState(),
        ~engineState=StateEngineService.unsafeGetState(),
        (),
      ) =>
    TextureInspector.Method._setCustomImageId(
      nodeId,
      textureContentIndex,
      customImageId,
      (editorState, engineState),
    );
};