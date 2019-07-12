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

let _addImageData =
    (
      (uint8Array, name, mimeType),
      (
        /* imageIndexMap, */
        imageArr,
        bufferViewArr,
        uint8ArrayArr,
        byteOffset,
      ),
    ) => {
  /* let uint8Array = _getUint8Array(uint8Array, base64, editorState); */
  let byteLength = uint8Array |> Uint8Array.length;
  let alignedByteLength = BufferUtils.alignedLength(byteLength);

  (
    /* imageIndexMap
       |> WonderCommonlib.ImmutableSparseMapService.set(
            imageA imageA Jss
            imageArr |> Js.Array.length,
          ), */
    imageArr
    |> ArrayService.push(
         {name, mimeType, bufferView: bufferViewArr |> Js.Array.length}: ExportAssetType.image,
       ),
    bufferViewArr
    |> ArrayService.push(
         {byteOffset, byteLength}: ExportAssetType.bufferView,
       ),
    uint8ArrayArr |> ArrayService.push(uint8Array),
    byteOffset + alignedByteLength,
  );
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

let _addFaceSourceImageData =
    (
      textureComponent,
      (editorState, engineState),
      unsafeGetFaceSourceFunc,
      (imageArr, bufferViewArr, uint8ArrayArr, byteOffset),
    ) => {
  let faceSource = unsafeGetFaceSourceFunc(textureComponent, engineState);

  let faceSourceName = ImageUtils.getImageName(faceSource);

  (
    imageArr |> Js.Array.length,
    _addImageData(
      (
        BufferUtils.getImageBase64(faceSource)
        |> BufferUtils.convertBase64ToUint8Array,
        faceSourceName,
        ImageUtils.getImageMimeType(
          FileNameService.getExtName(faceSourceName),
          editorState,
        ),
      ),
      (imageArr, bufferViewArr, uint8ArrayArr, byteOffset),
    ),
  );
};

/* TODO perf: use cubemap image data map for get source */
let _buildCubemapData =
    (
      (
        imageArr,
        imageBufferViewArr,
        imageUint8ArrayArr,
        imageAlignedByteLength,
      ),
      (editorState, engineState),
    ) => {
  let (
    cubemapArr,
    (imageArr, imageBufferViewArr, imageUint8ArrayArr, imageByteOffset),
  ) =
    CubemapNodeAssetEditorService.findAllCubemapNodes(editorState)
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (
             cubemapArr,
             (
               imageArr,
               imageBufferViewArr,
               imageUint8ArrayArr,
               imageByteOffset,
             ),
           ),
           node,
         ) => {
           let {textureComponent}: NodeAssetType.cubemapNodeData =
             CubemapNodeAssetService.getNodeData(node);

           let (
             pxSource,
             (
               imageArr,
               imageBufferViewArr,
               imageUint8ArrayArr,
               imageByteOffset,
             ),
           ) =
             _addFaceSourceImageData(
               textureComponent,
               (editorState, engineState),
               CubemapTextureEngineService.unsafeGetPXSource,
               (
                 imageArr,
                 imageBufferViewArr,
                 imageUint8ArrayArr,
                 imageByteOffset,
               ),
             );

           let (
             nxSource,
             (
               imageArr,
               imageBufferViewArr,
               imageUint8ArrayArr,
               imageByteOffset,
             ),
           ) =
             _addFaceSourceImageData(
               textureComponent,
               (editorState, engineState),
               CubemapTextureEngineService.unsafeGetNXSource,
               (
                 imageArr,
                 imageBufferViewArr,
                 imageUint8ArrayArr,
                 imageByteOffset,
               ),
             );

           let (
             pySource,
             (
               imageArr,
               imageBufferViewArr,
               imageUint8ArrayArr,
               imageByteOffset,
             ),
           ) =
             _addFaceSourceImageData(
               textureComponent,
               (editorState, engineState),
               CubemapTextureEngineService.unsafeGetPYSource,
               (
                 imageArr,
                 imageBufferViewArr,
                 imageUint8ArrayArr,
                 imageByteOffset,
               ),
             );

           let (
             nySource,
             (
               imageArr,
               imageBufferViewArr,
               imageUint8ArrayArr,
               imageByteOffset,
             ),
           ) =
             _addFaceSourceImageData(
               textureComponent,
               (editorState, engineState),
               CubemapTextureEngineService.unsafeGetNYSource,
               (
                 imageArr,
                 imageBufferViewArr,
                 imageUint8ArrayArr,
                 imageByteOffset,
               ),
             );

           let (
             pzSource,
             (
               imageArr,
               imageBufferViewArr,
               imageUint8ArrayArr,
               imageByteOffset,
             ),
           ) =
             _addFaceSourceImageData(
               textureComponent,
               (editorState, engineState),
               CubemapTextureEngineService.unsafeGetPZSource,
               (
                 imageArr,
                 imageBufferViewArr,
                 imageUint8ArrayArr,
                 imageByteOffset,
               ),
             );

           let (
             nzSource,
             (
               imageArr,
               imageBufferViewArr,
               imageUint8ArrayArr,
               imageByteOffset,
             ),
           ) =
             _addFaceSourceImageData(
               textureComponent,
               (editorState, engineState),
               CubemapTextureEngineService.unsafeGetNZSource,
               (
                 imageArr,
                 imageBufferViewArr,
                 imageUint8ArrayArr,
                 imageByteOffset,
               ),
             );

           (
             cubemapArr
             |> ArrayService.push(
                  {
                    path:
                      PathTreeAssetLogicService.getNodePath(
                        node,
                        (editorState, engineState),
                      ),
                    name:
                      NodeNameAssetLogicService.getNodeName(
                        node,
                        engineState,
                      ),
                    pxSource,
                    nxSource,
                    pySource,
                    nySource,
                    pzSource,
                    nzSource,
                    wrapS:
                      CubemapTextureEngineService.getWrapS(
                        textureComponent,
                        engineState,
                      )
                      |> TextureTypeUtils.convertWrapToInt,
                    wrapT:
                      CubemapTextureEngineService.getWrapT(
                        textureComponent,
                        engineState,
                      )
                      |> TextureTypeUtils.convertWrapToInt,
                    minFilter:
                      CubemapTextureEngineService.getMinFilter(
                        textureComponent,
                        engineState,
                      )
                      |> TextureTypeUtils.convertFilterToInt,
                    magFilter:
                      CubemapTextureEngineService.getMagFilter(
                        textureComponent,
                        engineState,
                      )
                      |> TextureTypeUtils.convertFilterToInt,
                    pxFormat:
                      CubemapTextureEngineService.getPXFormat(
                        textureComponent,
                        engineState,
                      )
                      |> TextureTypeUtils.convertFormatToInt,
                    nxFormat:
                      CubemapTextureEngineService.getNXFormat(
                        textureComponent,
                        engineState,
                      )
                      |> TextureTypeUtils.convertFormatToInt,
                    pyFormat:
                      CubemapTextureEngineService.getPYFormat(
                        textureComponent,
                        engineState,
                      )
                      |> TextureTypeUtils.convertFormatToInt,
                    nyFormat:
                      CubemapTextureEngineService.getNYFormat(
                        textureComponent,
                        engineState,
                      )
                      |> TextureTypeUtils.convertFormatToInt,
                    pzFormat:
                      CubemapTextureEngineService.getPZFormat(
                        textureComponent,
                        engineState,
                      )
                      |> TextureTypeUtils.convertFormatToInt,
                    nzFormat:
                      CubemapTextureEngineService.getNZFormat(
                        textureComponent,
                        engineState,
                      )
                      |> TextureTypeUtils.convertFormatToInt,
                    pxType:
                      CubemapTextureEngineService.getPXType(
                        textureComponent,
                        engineState,
                      ),
                    nxType:
                      CubemapTextureEngineService.getNXType(
                        textureComponent,
                        engineState,
                      ),
                    pyType:
                      CubemapTextureEngineService.getPYType(
                        textureComponent,
                        engineState,
                      ),
                    nyType:
                      CubemapTextureEngineService.getNYType(
                        textureComponent,
                        engineState,
                      ),
                    pzType:
                      CubemapTextureEngineService.getPZType(
                        textureComponent,
                        engineState,
                      ),
                    nzType:
                      CubemapTextureEngineService.getNZType(
                        textureComponent,
                        engineState,
                      ),
                    flipY:
                      CubemapTextureEngineService.getFlipY(
                        textureComponent,
                        engineState,
                      ),
                  }: ExportAssetType.cubemap,
                ),
             (
               imageArr,
               imageBufferViewArr,
               imageUint8ArrayArr,
               imageByteOffset,
             ),
           );
         },
         (
           [||],
           (
             imageArr,
             imageBufferViewArr,
             imageUint8ArrayArr,
             imageAlignedByteLength,
           ),
         ),
       );

  (
    cubemapArr,
    (
      imageArr,
      imageBufferViewArr,
      imageUint8ArrayArr,
      _computeBufferViewDataByteLength(imageBufferViewArr),
    ),
  );
};

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

let _buildMaterialData =
    (imageIndexMap, textureIndexMap, (editorState, engineState)) =>
  MaterialNodeAssetEditorService.findAllMaterialNodes(editorState)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. (basicMaterialArr, lightMaterialArr), node) => {
         let name = NodeNameAssetLogicService.getNodeName(node, engineState);
         let path =
           PathTreeAssetLogicService.getNodePath(
             node,
             (editorState, engineState),
           );

         let {materialComponent, type_, snapshotImageDataIndex}: NodeAssetType.materialNodeData =
           MaterialNodeAssetService.getNodeData(node);

         let snapshot =
           imageIndexMap
           |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(
                snapshotImageDataIndex,
              );

         switch (type_) {
         | BasicMaterial => (
             basicMaterialArr
             |> ArrayService.push(
                  {
                    name,
                    path,
                    snapshot,
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
                    snapshot,
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
      (imageIndexMap, imageUint8ArrayMap),
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
           let {name, wdbGameObject, imageDataIndex}: NodeAssetType.wdbNodeData =
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
                    snapshot:
                      imageIndexMap
                      |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(
                           imageDataIndex,
                         ),
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
                  Wonderjs.BuildSingleRABJsonDataSystem.convertEventFunctionDataToStr(
                    eventFunctionData,
                  ),
              }: ExportAssetType.scriptEventFunction,
            );
       },
       [||],
     );

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
         {
           name,
           path,
           attributeStr:
             Wonderjs.BuildSingleRABJsonDataSystem.convertAttributeToStr(
               attribute,
             ),
         }: ExportAssetType.scriptAttribute
       );
     });

let _buildAssetBundleData =
    (
      bufferTotalAlignedByteLength,
      (imageBufferViewArr, wdbBufferViewArr),
      (editorState, engineState),
    ) => {
  let startBufferViewIndex =
    (imageBufferViewArr |> Js.Array.length)
    + (wdbBufferViewArr |> Js.Array.length);

  let (assetBundleArr, arrayBufferArr, bufferViewArr, byteOffset) =
    AssetBundleNodeAssetEditorService.findAllAssetBundleNodes(editorState)
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (assetBundleArr, arrayBufferArr, bufferViewArr, byteOffset),
           node,
         ) => {
           let path =
             PathTreeAssetLogicService.getNodePath(
               node,
               (editorState, engineState),
             );

           let {type_, assetBundle, name}: NodeAssetType.assetBundleNodeData =
             AssetBundleNodeAssetService.getNodeData(node);

           let byteLength = assetBundle |> ArrayBuffer.byteLength;
           let alignedByteLength = BufferUtils.alignedLength(byteLength);

           (
             assetBundleArr
             |> ArrayService.push(
                  {
                    name,
                    path,
                    type_: type_ |> NodeAssetType.convertAssetBundleTypeToInt,
                    assetBundleBufferView:
                      startBufferViewIndex + (bufferViewArr |> Js.Array.length),
                  }: ExportAssetType.assetBundle,
                ),
             arrayBufferArr |> ArrayService.push(assetBundle),
             bufferViewArr
             |> ArrayService.push(
                  {byteOffset, byteLength}: ExportAssetType.bufferView,
                ),
             byteOffset + alignedByteLength,
           );
         },
         ([||], [||], [||], bufferTotalAlignedByteLength),
       );

  (
    assetBundleArr,
    arrayBufferArr,
    bufferViewArr,
    bufferViewArr |> Js.Array.length === 0 ?
      bufferTotalAlignedByteLength :
      _computeBufferViewDataByteLength(bufferViewArr),
  );
};

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

  let (
    cubemapArr,
    (
      imageArr,
      imageBufferViewArr,
      imageUint8ArrayArr,
      imageAlignedByteLength,
    ),
  ) =
    _buildCubemapData(
      (
        imageArr,
        imageBufferViewArr,
        imageUint8ArrayArr,
        imageAlignedByteLength,
      ),
      (editorState, engineState),
    );

  let (basicMaterialArr, lightMaterialArr) =
    _buildMaterialData(
      imageIndexMap,
      textureIndexMap,
      (editorState, engineState),
    );

  let (
    engineState,
    wdbArr,
    wdbArrayBufferArr,
    wdbBufferViewArr,
    bufferTotalAlignedByteLength,
  ) =
    _buildWDBData(
      (imageIndexMap, imageUint8ArrayMap),
      imageAlignedByteLength,
      imageBufferViewArr,
      (editorState, engineState),
    );

  let scriptEventFunctionArr =
    _buildScriptEventFunctionData((editorState, engineState));

  let scriptAttributeArr =
    _buildScriptAttributeData((editorState, engineState));

  let (
    assetBundleArr,
    assetBundleArrayBufferArr,
    assetBundleBufferViewArr,
    bufferTotalAlignedByteLength,
  ) =
    _buildAssetBundleData(
      bufferTotalAlignedByteLength,
      (imageBufferViewArr, wdbBufferViewArr),
      (editorState, engineState),
    );

  (
    engineState,
    (
      imageArr,
      textureArr,
      cubemapArr,
      basicMaterialArr,
      lightMaterialArr,
      wdbArr,
      scriptEventFunctionArr,
      scriptAttributeArr,
      assetBundleArr,
    ),
    (imageBufferViewArr, wdbBufferViewArr, assetBundleBufferViewArr),
    (imageUint8ArrayArr, wdbArrayBufferArr, assetBundleArrayBufferArr),
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
        cubemapArr,
        basicMaterialArr,
        lightMaterialArr,
        wdbArr,
        scriptEventFunctionArr,
        scriptAttributeArr,
        assetBundleArr,
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
           cubemaps: cubemapArr,
           basicMaterials: basicMaterialArr,
           lightMaterials: lightMaterialArr,
           scriptEventFunctions: scriptEventFunctionArr,
           scriptAttributes: scriptAttributeArr,
           wdbs: wdbArr,
           assetBundles: assetBundleArr,
           bufferViews: bufferViewArr,
         }: ExportAssetType.assets
       )
       |> Obj.magic
       |> Js.Json.stringify,
     );
};