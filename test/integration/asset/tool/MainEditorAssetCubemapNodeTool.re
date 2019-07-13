let getCubemapTextureComponent =
    (~nodeId, ~editorState=StateEditorService.getState(), ()) => {
  let {textureComponent}: NodeAssetType.cubemapNodeData =
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState)
    |> CubemapNodeAssetService.getNodeData;

  textureComponent;
};

let getImageDataIndex =
    (~nodeId, ~editorState=StateEditorService.getState(), ()) => {
  let {imageDataIndex}: NodeAssetType.cubemapNodeData =
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState)
    |> CubemapNodeAssetService.getNodeData;

  imageDataIndex;
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

let _setOneFaceImageDataToImageDataMap =
    (imageDataIndex, source, base64, setFaceImageDataFunc, editorState) =>
  editorState
  |> setFaceImageDataFunc(
       imageDataIndex,
       LoadAndSetCubemapInspectorFaceSourceEventHandler.CustomEventHandler._buildImageData(
         ImageUtils.getImageName(source),
         base64,
         editorState,
       ),
     );

let setAllSources =
    (
      ~nodeId,
      ~editorState=StateEditorService.getState(),
      ~engineState=StateEngineService.unsafeGetState(),
      (),
    ) => {
  let (engineState, (source1, source2, source3, source4, source5, source6)) =
    CubemapTextureToolEngine.setAllSources(
      ~engineState=StateEngineService.unsafeGetState(),
      ~texture=getCubemapTextureComponent(~nodeId, ~editorState, ()),
      (),
    );

  let (base64_1, base64_2, base64_3, base64_4, base64_5, base64_6) =
    WDBTool.buildCubemapAllFaceSourceBase64();

  let imageDataIndex = getImageDataIndex(~nodeId, ~editorState, ());

  let editorState =
    editorState
    |> _setOneFaceImageDataToImageDataMap(
         imageDataIndex,
         source1,
         base64_1,
         CubemapTextureImageDataMapAssetEditorService.setPXImageData,
       )
    |> _setOneFaceImageDataToImageDataMap(
         imageDataIndex,
         source2,
         base64_2,
         CubemapTextureImageDataMapAssetEditorService.setNXImageData,
       )
    |> _setOneFaceImageDataToImageDataMap(
         imageDataIndex,
         source3,
         base64_3,
         CubemapTextureImageDataMapAssetEditorService.setPYImageData,
       )
    |> _setOneFaceImageDataToImageDataMap(
         imageDataIndex,
         source4,
         base64_4,
         CubemapTextureImageDataMapAssetEditorService.setNYImageData,
       )
    |> _setOneFaceImageDataToImageDataMap(
         imageDataIndex,
         source5,
         base64_5,
         CubemapTextureImageDataMapAssetEditorService.setPZImageData,
       )
    |> _setOneFaceImageDataToImageDataMap(
         imageDataIndex,
         source6,
         base64_6,
         CubemapTextureImageDataMapAssetEditorService.setNZImageData,
       );

  (
    (editorState, engineState),
    (source1, source2, source3, source4, source5, source6),
    (base64_1, base64_2, base64_3, base64_4, base64_5, base64_6),
  );
};

let changeFaceSource =
    (
      ~textureComponent,
      ~faceSource,
      ~faceSourceBase64=Base64Tool.buildFakeBase64_1(),
      ~setSourceFunc=CubemapTextureEngineService.setPXSource,
      ~setFormatFunc=CubemapTextureEngineService.setPXFormat,
      ~setFaceImageDataFunc=CubemapTextureImageDataMapAssetEditorService.setPXImageData,
      ~editorState=StateEditorService.getState(),
      ~engineState=StateEngineService.unsafeGetState(),
      (),
    ) =>
  LoadAndSetCubemapInspectorFaceSourceEventHandler.CustomEventHandler._setFaceSource(
    textureComponent,
    (faceSource, faceSourceBase64),
    (setSourceFunc, setFormatFunc, setFaceImageDataFunc),
    (editorState, engineState),
  )
  |> StateLogicService.setState;