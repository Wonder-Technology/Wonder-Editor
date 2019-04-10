open Js.Typed_array;

/* let _buildEmptyUint8Array = () => Uint8Array.make([||]); */

let _getUint8Array = (uint8Array, base64, editorState) =>
  /* switch (uint8Array) {
     | Some(uint8Array) => uint8Array
     | None =>
       switch (base64) {
       | Some(base64) => BufferUtils.convertBase64ToUint8Array(base64)
       | None =>
         ConsoleUtils.error(
           LogUtils.buildErrorMessage(
             ~description={j|image->base64 should exist|j},
             ~reason="",
             ~solution={j||j},
             ~params={j||j},
           ),
           editorState,
         );

         _buildEmptyUint8Array();
       }
     }; */
  uint8Array |> OptionService.unsafeGet;

let _computeBufferViewDataByteLength = bufferViewArr =>
  switch (bufferViewArr |> ArrayService.getLast) {
  | None => 0
  | Some(({byteOffset, byteLength}: ExportAssetType.bufferView)) =>
    byteOffset + BufferUtils.alignedLength(byteLength)
  };

let _buildImageData = editorState => {
  let (imageIndexMap, imageArr, bufferViewArr, uint8ArrayArr, byteOffset) =
    ImageDataMapAssetEditorService.getMap(editorState)
    |> WonderCommonlib.ImmutableSparseMapService.reduceiValid(
         (.
           (
             imageIndexMap,
             imageArr,
             bufferViewArr,
             uint8ArrayArr,
             byteOffset,
           ),
           {name, mimeType, uint8Array, base64}: ImageDataType.imageData,
           imageDataIndex,
         ) => {
           let uint8Array = _getUint8Array(uint8Array, base64, editorState);
           let byteLength = uint8Array |> Uint8Array.length;
           let alignedByteLength = BufferUtils.alignedLength(byteLength);

           (
             imageIndexMap
             |> WonderCommonlib.ImmutableSparseMapService.set(
                  imageDataIndex,
                  imageArr |> Js.Array.length,
                ),
             imageArr
             |> ArrayService.push(
                  {
                    name,
                    mimeType,
                    bufferView: bufferViewArr |> Js.Array.length,
                  }: ExportAssetType.image,
                ),
             bufferViewArr
             |> ArrayService.push(
                  {byteOffset, byteLength}: ExportAssetType.bufferView,
                ),
             uint8ArrayArr |> ArrayService.push(uint8Array),
             byteOffset + alignedByteLength,
           );
         },
         (
           WonderCommonlib.ImmutableSparseMapService.createEmpty(),
           [||],
           [||],
           [||],
           0,
         ),
       );

  (
    imageIndexMap,
    imageArr,
    bufferViewArr,
    uint8ArrayArr,
    _computeBufferViewDataByteLength(bufferViewArr),
  );
};

let _buildTextureData = (imageIndexMap, (editorState, engineState)) =>
  TextureNodeAssetEditorService.findAllTextureNodes(editorState)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. (textureIndexMap, textureArr), node) => {
         let {textureComponent, imageDataIndex}: NodeAssetType.textureNodeData =
           TextureNodeAssetService.getNodeData(node);

         (
           textureIndexMap
           |> WonderCommonlib.ImmutableSparseMapService.set(
                textureComponent,
                textureArr |> Js.Array.length,
              ),
           textureArr
           |> ArrayService.push(
                {
                  path:
                    PathTreeAssetLogicService.getNodePath(
                      node,
                      (editorState, engineState),
                    ),
                  name:
                    NodeNameAssetLogicService.getNodeName(node, engineState),
                  source:
                    imageIndexMap
                    |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(
                         imageDataIndex,
                       ),
                  wrapS:
                    BasicSourceTextureEngineService.getWrapS(
                      textureComponent,
                      engineState,
                    )
                    |> TextureTypeUtils.convertWrapToInt,
                  wrapT:
                    BasicSourceTextureEngineService.getWrapT(
                      textureComponent,
                      engineState,
                    )
                    |> TextureTypeUtils.convertWrapToInt,
                  minFilter:
                    BasicSourceTextureEngineService.getMinFilter(
                      textureComponent,
                      engineState,
                    )
                    |> TextureTypeUtils.convertFilterToInt,
                  magFilter:
                    BasicSourceTextureEngineService.getMagFilter(
                      textureComponent,
                      engineState,
                    )
                    |> TextureTypeUtils.convertFilterToInt,
                  format:
                    BasicSourceTextureEngineService.getFormat(
                      textureComponent,
                      engineState,
                    )
                    |> TextureTypeUtils.convertFormatToInt,
                  type_:
                    BasicSourceTextureEngineService.getType(
                      textureComponent,
                      engineState,
                    ),
                  flipY:
                    BasicSourceTextureEngineService.getFlipY(
                      textureComponent,
                      engineState,
                    ),
                }: ExportAssetType.texture,
              ),
         );
       },
       (WonderCommonlib.ImmutableSparseMapService.createEmpty(), [||]),
     );

let _getTextureIndexFromMap = (textureComponent, textureIndexMap) =>
  switch (textureComponent) {
  | None => None
  | Some(textureComponent) =>
    (
      textureIndexMap
      |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(textureComponent)
    )
    ->Some
  };

let _buildMaterialData = (textureIndexMap, (editorState, engineState)) =>
  MaterialNodeAssetEditorService.findAllMaterialNodes(editorState)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. (basicMaterialArr, lightMaterialArr), node) => {
         let name = NodeNameAssetLogicService.getNodeName(node, engineState);
         let path =
           PathTreeAssetLogicService.getNodePath(
             node,
             (editorState, engineState),
           );

         let {materialComponent, type_}: NodeAssetType.materialNodeData =
           MaterialNodeAssetService.getNodeData(node);

         switch (type_) {
         | BasicMaterial => (
             basicMaterialArr
             |> ArrayService.push(
                  {
                    name,
                    path,
                    color:
                      BasicMaterialEngineService.getColor(
                        materialComponent,
                        engineState,
                      ),
                  }: ExportAssetType.basicMaterial,
                ),
             lightMaterialArr,
           )
         | LightMaterial => (
             basicMaterialArr,
             lightMaterialArr
             |> ArrayService.push(
                  {
                    name,
                    path,
                    diffuseColor:
                      LightMaterialEngineService.getLightMaterialDiffuseColor(
                        materialComponent,
                        engineState,
                      ),
                    diffuseMap:
                      _getTextureIndexFromMap(
                        LightMaterialEngineService.getLightMaterialDiffuseMap(
                          materialComponent,
                          engineState,
                        ),
                        textureIndexMap,
                      ),
                    shininess:
                      LightMaterialEngineService.getLightMaterialShininess(
                        materialComponent,
                        engineState,
                      ),
                  }: ExportAssetType.lightMaterial,
                ),
           )
         };
       },
       ([||], [||]),
     );

let _buildWDBData =
    (
      imageUint8ArrayMap,
      imageAlignedByteLength,
      imageBufferViewArr,
      (editorState, engineState),
    ) => {
  let imageBufferViewIndex = imageBufferViewArr |> Js.Array.length;

  let (engineState, wdbArr, arrayBufferArr, bufferViewArr, byteOffset) =
    WDBNodeAssetEditorService.findAllWDBNodes(editorState)
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (engineState, wdbArr, arrayBufferArr, bufferViewArr, byteOffset),
           node,
         ) => {
           let {name, wdbGameObject}: NodeAssetType.wdbNodeData =
             WDBNodeAssetService.getNodeData(node);

           let (engineState, wdbArrayBuffer) =
             HeaderExportAssetWDBUtils.generate(
               wdbGameObject,
               imageUint8ArrayMap,
               engineState,
             );
           let byteLength = wdbArrayBuffer |> ArrayBuffer.byteLength;
           let alignedByteLength = BufferUtils.alignedLength(byteLength);

           (
             engineState,
             wdbArr
             |> ArrayService.push(
                  {
                    name,
                    path:
                      PathTreeAssetLogicService.getNodePath(
                        node,
                        (editorState, engineState),
                      ),
                    bufferView:
                      imageBufferViewIndex + (bufferViewArr |> Js.Array.length),
                  }: ExportAssetType.wdb,
                ),
             arrayBufferArr |> ArrayService.push(wdbArrayBuffer),
             bufferViewArr
             |> ArrayService.push(
                  {byteOffset, byteLength}: ExportAssetType.bufferView,
                ),
             byteOffset + alignedByteLength,
           );
         },
         (engineState, [||], [||], [||], imageAlignedByteLength),
       );

  (
    engineState,
    wdbArr,
    arrayBufferArr,
    bufferViewArr,
    bufferViewArr |> Js.Array.length === 0 ?
      imageAlignedByteLength : _computeBufferViewDataByteLength(bufferViewArr),
  );
};

let _convertEventFunctionToStr = eventFunction =>
  SerializeService.serializeFunction(eventFunction);

let _convertEventFunctionDataToStr =
    ({init, update, dispose}: Wonderjs.StateDataMainType.eventFunctionData) =>
  (
    {
      init:
        init
        |> Js.Option.andThen((. init) => _convertEventFunctionToStr(init)),
      update:
        update
        |> Js.Option.andThen((. update) =>
             _convertEventFunctionToStr(update)
           ),
      dispose:
        dispose
        |> Js.Option.andThen((. dispose) =>
             _convertEventFunctionToStr(dispose)
           ),
    }: Wonderjs.StateDataMainType.eventFunctionData
  )
  |> Obj.magic
  |> Js.Json.stringify;

let _buildScriptEventFunctionData = ((editorState, engineState)) =>
  ScriptEventFunctionNodeAssetEditorService.findAllScriptEventFunctionNodes(
    editorState,
  )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. scriptEventFunctionArr, node) => {
         let name = NodeNameAssetLogicService.getNodeName(node, engineState);
         let path =
           PathTreeAssetLogicService.getNodePath(
             node,
             (editorState, engineState),
           );

         let {eventFunctionData, name}: NodeAssetType.scriptEventFunctionNodeData =
           ScriptEventFunctionNodeAssetService.getNodeData(node);

         scriptEventFunctionArr
         |> ArrayService.push(
              {
                name,
                path,
                eventFunctionDataStr:
                  _convertEventFunctionDataToStr(eventFunctionData),
              }: ExportAssetType.scriptEventFunction,
            );
       },
       [||],
     );

let _convertAttributeToStr = attribute =>
  attribute |> Obj.magic |> Js.Json.stringify;

let _buildScriptAttributeData = ((editorState, engineState)) =>
  ScriptAttributeNodeAssetEditorService.findAllScriptAttributeNodes(
    editorState,
  )
  |> Js.Array.map(node => {
       let path =
         PathTreeAssetLogicService.getNodePath(
           node,
           (editorState, engineState),
         );

       let {attribute, name}: NodeAssetType.scriptAttributeNodeData =
         ScriptAttributeNodeAssetService.getNodeData(node);

       (
         {name, path, attributeStr: _convertAttributeToStr(attribute)}: ExportAssetType.scriptAttribute
       );
     });

let buildJsonData = (imageUint8ArrayMap, (editorState, engineState)) => {
  let (
    imageIndexMap,
    imageArr,
    imageBufferViewArr,
    imageUint8ArrayArr,
    imageAlignedByteLength,
  ) =
    _buildImageData(editorState);

  let (textureIndexMap, textureArr) =
    _buildTextureData(imageIndexMap, (editorState, engineState));
  let (basicMaterialArr, lightMaterialArr) =
    _buildMaterialData(textureIndexMap, (editorState, engineState));
  let (
    engineState,
    wdbArr,
    wdbArrayBufferArr,
    wdbBufferViewArr,
    bufferTotalAlignedByteLength,
  ) =
    _buildWDBData(
      imageUint8ArrayMap,
      imageAlignedByteLength,
      imageBufferViewArr,
      (editorState, engineState),
    );

  let scriptEventFunctionArr =
    _buildScriptEventFunctionData((editorState, engineState));

  let scriptAttributeArr =
    _buildScriptAttributeData((editorState, engineState));

  (
    engineState,
    (
      imageArr,
      textureArr,
      basicMaterialArr,
      lightMaterialArr,
      wdbArr,
      scriptEventFunctionArr,
      scriptAttributeArr,
    ),
    (imageBufferViewArr, wdbBufferViewArr),
    (imageUint8ArrayArr, wdbArrayBufferArr),
    bufferTotalAlignedByteLength,
  );
};

let buildJsonUint8Array =
    (
      bufferAlignedByteLength,
      (
        bufferViewArr,
        imageArr,
        textureArr,
        basicMaterialArr,
        lightMaterialArr,
        wdbArr,
        scriptEventFunctionArr,
        scriptAttributeArr,
      ),
    ) => {
  let encoder = TextEncoder.newTextEncoder();

  encoder
  |> TextEncoder.encodeUint8Array(
       (
         {
           copyright: {
             version: Copyright.getVersion(),
             author: Copyright.getAuthor(),
           },
           images: imageArr,
           textures: textureArr,
           basicMaterials: basicMaterialArr,
           lightMaterials: lightMaterialArr,
           scriptEventFunctions: scriptEventFunctionArr,
           scriptAttributes: scriptAttributeArr,
           wdbs: wdbArr,
           bufferViews: bufferViewArr,
         }: ExportAssetType.assets
       )
       |> Obj.magic
       |> Js.Json.stringify,
     );
};