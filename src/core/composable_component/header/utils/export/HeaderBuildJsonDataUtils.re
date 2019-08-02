open Js.Typed_array;

module CubemapTextureImageIndexMap = {
  type cubemapTextureImageIndexMap =
    WonderCommonlib.ImmutableSparseMapService.t(int);

  let create = () => WonderCommonlib.ImmutableSparseMapService.createEmpty();

  let setFaceSourceImageIndex = (imageDataIndex, imageIndex, map) =>
    map
    |> WonderCommonlib.ImmutableSparseMapService.set(
         imageDataIndex,
         imageIndex,
       );

  let unsafeGetFaceSourceImageIndex = (imageDataIndex, map) =>
    map |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(imageDataIndex);
};

let _getUint8Array = uint8Array => uint8Array |> OptionService.unsafeGet;

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
        /* basicSourceTextureImageIndexMap, */
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

let _addImageDataForCubemap =
    (
      (uint8Array, name, mimeType),
      (
        /* basicSourceTextureImageIndexMap, */
        /* imageArr, */
        bufferViewArr,
        uint8ArrayArr,
        byteOffset,
      ),
    ) => {
  let byteLength = uint8Array |> Uint8Array.length;
  let alignedByteLength = BufferUtils.alignedLength(byteLength);

  (
    /* imageArr
       |> ArrayService.push(
            {name, mimeType, bufferView: bufferViewArr |> Js.Array.length}: ExportAssetType.image,
          ), */
    {name, mimeType, bufferView: bufferViewArr |> Js.Array.length}: ExportAssetType.image,
    bufferViewArr
    |> ArrayService.push(
         {byteOffset, byteLength}: ExportAssetType.bufferView,
       ),
    uint8ArrayArr |> ArrayService.push(uint8Array),
    byteOffset + alignedByteLength,
  );
};

let _addFaceImageData =
    (faceSourceImageDataOpt, (bufferViewArr, uint8ArrayArr, byteOffset)) =>
  switch (faceSourceImageDataOpt) {
  | None => (None, bufferViewArr, uint8ArrayArr, byteOffset)
  | Some(faceSourceImageData) =>
    let {name, mimeType, uint8Array, base64}: ImageDataType.imageData = faceSourceImageData;

    let uint8Array = _getUint8Array(uint8Array);

    /* let imageIndex = imageArr |> Js.Array.length; */

    let (faceImageData, bufferViewArr, uint8ArrayArr, byteOffset) =
      _addImageDataForCubemap(
        (uint8Array, name, mimeType),
        (bufferViewArr, uint8ArrayArr, byteOffset),
      );

    (faceImageData->Some, bufferViewArr, uint8ArrayArr, byteOffset);
  };

let _buildImageData = editorState => {
  let (
    basicSourceTextureImageIndexMap,
    basicSourceTextureImageArr,
    bufferViewArr,
    uint8ArrayArr,
    byteOffset,
  ) =
    BasicSourceTextureImageDataMapAssetEditorService.getMap(editorState)
    |> WonderCommonlib.ImmutableSparseMapService.reduceiValid(
         (.
           (
             basicSourceTextureImageIndexMap,
             imageArr,
             bufferViewArr,
             uint8ArrayArr,
             byteOffset,
           ),
           {name, mimeType, uint8Array, base64}: ImageDataType.imageData,
           imageDataIndex,
         ) => {
           let uint8Array = _getUint8Array(uint8Array);

           let basicSourceTextureImageIndexMap =
             basicSourceTextureImageIndexMap
             |> WonderCommonlib.ImmutableSparseMapService.set(
                  imageDataIndex,
                  imageArr |> Js.Array.length,
                );

           let (imageArr, bufferViewArr, uint8ArrayArr, byteOffset) =
             _addImageData(
               (uint8Array, name, mimeType),
               (imageArr, bufferViewArr, uint8ArrayArr, byteOffset),
             );

           (
             basicSourceTextureImageIndexMap,
             imageArr,
             bufferViewArr,
             uint8ArrayArr,
             byteOffset,
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

  let (
    cubemapTextureImageIndexMap,
    cubemapTextureImageArr,
    bufferViewArr,
    uint8ArrayArr,
    byteOffset,
  ) =
    CubemapTextureImageDataMapAssetEditorService.getMap(editorState)
    |> WonderCommonlib.ImmutableSparseMapService.reduceiValid(
         (.
           (
             cubemapTextureImageIndexMap,
             imageArr: array(ExportAssetType.cubemapTextureImage),
             bufferViewArr,
             uint8ArrayArr,
             byteOffset,
           ),
           {
             pxImageData,
             nxImageData,
             pyImageData,
             nyImageData,
             pzImageData,
             nzImageData,
           }: ImageDataType.cubemapTextureImageData,
           imageDataIndex,
         ) => {
           let (pxImageDataOpt, bufferViewArr, uint8ArrayArr, byteOffset) =
             _addFaceImageData(
               pxImageData,
               (bufferViewArr, uint8ArrayArr, byteOffset),
             );

           let (nxImageDataOpt, bufferViewArr, uint8ArrayArr, byteOffset) =
             _addFaceImageData(
               nxImageData,
               (bufferViewArr, uint8ArrayArr, byteOffset),
             );

           let (pyImageDataOpt, bufferViewArr, uint8ArrayArr, byteOffset) =
             _addFaceImageData(
               pyImageData,
               (bufferViewArr, uint8ArrayArr, byteOffset),
             );

           let (nyImageDataOpt, bufferViewArr, uint8ArrayArr, byteOffset) =
             _addFaceImageData(
               nyImageData,
               (bufferViewArr, uint8ArrayArr, byteOffset),
             );

           let (pzImageDataOpt, bufferViewArr, uint8ArrayArr, byteOffset) =
             _addFaceImageData(
               pzImageData,
               (bufferViewArr, uint8ArrayArr, byteOffset),
             );

           let (nzImageDataOpt, bufferViewArr, uint8ArrayArr, byteOffset) =
             _addFaceImageData(
               nzImageData,
               (bufferViewArr, uint8ArrayArr, byteOffset),
             );

           let imageIndex = imageArr |> Js.Array.length;

           let imageArr =
             imageArr
             |> ArrayService.push(
                  {
                    pxImage: pxImageDataOpt,
                    nxImage: nxImageDataOpt,
                    pyImage: pyImageDataOpt,
                    nyImage: nyImageDataOpt,
                    pzImage: pzImageDataOpt,
                    nzImage: nzImageDataOpt,
                  }: ExportAssetType.cubemapTextureImage,
                );

           let cubemapTextureImageIndexMap =
             CubemapTextureImageIndexMap.setFaceSourceImageIndex(
               imageDataIndex,
               imageIndex,
               cubemapTextureImageIndexMap,
             );

           (
             cubemapTextureImageIndexMap,
             imageArr,
             bufferViewArr,
             uint8ArrayArr,
             byteOffset,
           );
         },
         (
           CubemapTextureImageIndexMap.create(),
           [||],
           bufferViewArr,
           uint8ArrayArr,
           byteOffset,
         ),
       );

  (
    (basicSourceTextureImageIndexMap, cubemapTextureImageIndexMap),
    (basicSourceTextureImageArr, cubemapTextureImageArr),
    bufferViewArr,
    uint8ArrayArr,
    _computeBufferViewDataByteLength(bufferViewArr),
  );
};

let _buildTextureData =
    (basicSourceTextureImageIndexMap, (editorState, engineState)) =>
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
                    basicSourceTextureImageIndexMap
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

let _buildCubemapData =
    (cubemapTextureImageIndexMap, (editorState, engineState)) =>
  CubemapNodeAssetEditorService.findAllCubemapNodes(editorState)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. cubemapArr, node) => {
         let {textureComponent, imageDataIndex}: NodeAssetType.cubemapNodeData =
           CubemapNodeAssetService.getNodeData(node);

         cubemapArr
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
                  cubemapTextureImageIndexMap
                  |> CubemapTextureImageIndexMap.unsafeGetFaceSourceImageIndex(
                       imageDataIndex,
                     ),
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
            );
       },
       [||],
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

let _buildMaterialData =
    (
      basicSourceTextureImageIndexMap,
      textureIndexMap,
      (editorState, engineState),
    ) =>
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
           basicSourceTextureImageIndexMap
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
      (basicSourceTextureImageIndexMap, imageUint8ArrayMap),
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
                      basicSourceTextureImageIndexMap
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
    (basicSourceTextureImageIndexMap, cubemapTextureImageIndexMap),
    (basicSourceTextureImageArr, cubemapTextureImageArr),
    imageBufferViewArr,
    imageUint8ArrayArr,
    imageAlignedByteLength,
  ) =
    _buildImageData(editorState);

  let (textureIndexMap, textureArr) =
    _buildTextureData(
      basicSourceTextureImageIndexMap,
      (editorState, engineState),
    );

  let cubemapArr =
    _buildCubemapData(
      cubemapTextureImageIndexMap,
      (editorState, engineState),
    );

  let (basicMaterialArr, lightMaterialArr) =
    _buildMaterialData(
      basicSourceTextureImageIndexMap,
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
      (basicSourceTextureImageIndexMap, imageUint8ArrayMap),
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
      basicSourceTextureImageArr,
      cubemapTextureImageArr,
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
        basicSourceTextureImageArr,
        cubemapTextureImageArr,
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
           basicSourceTextureImages: basicSourceTextureImageArr,
           cubemapTextureImages: cubemapTextureImageArr,
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