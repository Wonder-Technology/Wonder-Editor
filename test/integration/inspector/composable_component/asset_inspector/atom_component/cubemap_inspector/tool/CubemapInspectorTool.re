let loadAndSetFaceSource =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~imgName="loadImg.png",
      ~imgSrc=ImportPackageTool.buildBase64_1(),
      ~cubemapTexture,
      ~setSourceFunc=CubemapTextureEngineService.setPXSource,
      ~setFormatFunc=CubemapTextureEngineService.setPXFormat,
      ~setFaceImageDataFunc=CubemapTextureImageDataMapAssetEditorService.setPXImageData,
      (),
    ) =>
  LoadAndSetCubemapInspectorFaceSourceEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
    (uiState, dispatchFunc),
    (cubemapTexture, setSourceFunc, setFormatFunc, setFaceImageDataFunc),
    BaseEventTool.buildFaceSourceFileEvent(~imgName, ~imgSrc, ()),
  )
  |> WonderBsMost.Most.drain;

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

let changeWrapS =
    (
      ~cubemapTexture,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  InspectorChangeCubemapWrapSEventHandler.MakeEventHandler.pushUndoStackWithTwoHandleFunc(
    (uiState, dispatchFunc),
    (),
    (cubemapTexture, value),
  );

let changeWrapT =
    (
      ~cubemapTexture,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  InspectorChangeCubemapWrapTEventHandler.MakeEventHandler.pushUndoStackWithTwoHandleFunc(
    (uiState, dispatchFunc),
    (),
    (cubemapTexture, value),
  );

let changeMagFilter =
    (
      ~cubemapTexture,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  InspectorChangeCubemapMagFilterEventHandler.MakeEventHandler.pushUndoStackWithTwoHandleFunc(
    (uiState, dispatchFunc),
    (),
    (cubemapTexture, value),
  );

let changeMinFilter =
    (
      ~cubemapTexture,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  InspectorChangeCubemapMinFilterEventHandler.MakeEventHandler.pushUndoStackWithTwoHandleFunc(
    (uiState, dispatchFunc),
    (),
    (cubemapTexture, value),
  );