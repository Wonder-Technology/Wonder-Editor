open Js.Typed_array;

let _getUint8Array = (uint8Array, base64) =>
  switch (uint8Array) {
  | Some(uint8Array) => uint8Array
  | None =>
    switch (base64) {
    | Some(base64) => BufferUtils.convertBase64ToUint8Array(base64)
    | None =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="_buildImageData",
          ~description={j|image->base64 should exist|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      )
    }
  };

let _computeBufferViewDataByteLength = bufferViewArr =>
  switch (bufferViewArr |> ArrayService.getLast) {
  | None => 0
  | Some(({byteOffset, byteLength}: ExportAssetType.bufferView)) =>
    byteOffset + BufferUtils.alignedLength(byteLength)
  };

let _buildImageData = editorState => {
  let (imageIndexMap, imageArr, bufferViewArr, uint8ArrayArr, byteOffset) =
    AssetImageNodeMapEditorService.getImageNodeMap(editorState)
    |> SparseMapService.reduceiValid(
         (.
           (
             imageIndexMap,
             imageArr,
             bufferViewArr,
             uint8ArrayArr,
             byteOffset,
           ),
           {name, mimeType, uint8Array, base64}: AssetNodeType.imageResultType,
           imageNodeId,
         ) => {
           let uint8Array = _getUint8Array(uint8Array, base64);
           let byteLength = uint8Array |> Uint8Array.length;
           let alignedByteLength = BufferUtils.alignedLength(byteLength);

           (
             imageIndexMap
             |> WonderCommonlib.SparseMapService.set(
                  imageNodeId,
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
           WonderCommonlib.SparseMapService.createEmpty(),
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

let rec _getAssetNodePathFromAssets =
        (parentFolderNodeId, namePathArr, (editorState, engineState)) =>
  switch (parentFolderNodeId) {
  | None => namePathArr |> Js.Array.reverseInPlace |> Js.Array.joinWith("/")
  | Some(parentFolderNodeId) =>
    _getAssetNodePathFromAssets(
      AssetNodeUtils.getAssetNodeParentId(
        Folder,
        parentFolderNodeId,
        editorState,
      ),
      namePathArr
      |> Js.Array.copy
      |> ArrayService.push(
           AssetNodeUtils.getAssetNodeTotalName(
             Folder,
             parentFolderNodeId,
             (editorState, engineState),
           ),
         ),
      (editorState, engineState),
    )
  };

let _buildTextureData = (imageIndexMap, (editorState, engineState)) =>
  AssetTextureNodeMapEditorService.getTextureNodeMap(editorState)
  |> SparseMapService.reduceiValid(
       (.
         (textureIndexMap, textureArr),
         {textureComponent, image, parentFolderNodeId}: AssetNodeType.textureResultType,
         textureNodeId,
       ) => (
         textureIndexMap
         |> WonderCommonlib.SparseMapService.set(
              /* textureNodeId, */
              textureComponent,
              textureArr |> Js.Array.length,
            ),
         textureArr
         |> ArrayService.push(
              {
                path:
                  _getAssetNodePathFromAssets(
                    parentFolderNodeId,
                    [||],
                    (editorState, engineState),
                  ),
                name:
                  AssetNodeUtils.getAssetNodeTotalName(
                    Texture,
                    textureNodeId,
                    (editorState, engineState),
                  ),
                source:
                  imageIndexMap
                  |> WonderCommonlib.SparseMapService.unsafeGet(image),
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
              }: ExportAssetType.texture,
            ),
       ),
       (WonderCommonlib.SparseMapService.createEmpty(), [||]),
     );

let _getTextureIndexFromMap = (textureComponent, textureIndexMap) =>
  switch (textureComponent) {
  | None => None
  | Some(textureComponent) =>
    textureIndexMap
    |> WonderCommonlib.SparseMapService.unsafeGet(textureComponent)
    |. Some
  };

let _buildMaterialData = (textureIndexMap, (editorState, engineState)) =>
  AssetMaterialNodeMapEditorService.getMaterialNodeMap(editorState)
  |> SparseMapService.reduceiValid(
       (.
         (basicMaterialArr, lightMaterialArr),
         {materialComponent, type_, parentFolderNodeId}: AssetNodeType.materialResultType,
         materialNodeId,
       ) => {
         let name =
           AssetNodeUtils.getAssetNodeTotalName(
             Material,
             materialNodeId,
             (editorState, engineState),
           );

         switch (type_) {
         | BasicMaterial => (
             basicMaterialArr
             |> ArrayService.push(
                  {
                    name,
                    path:
                      _getAssetNodePathFromAssets(
                        parentFolderNodeId,
                        [||],
                        (editorState, engineState),
                      ),
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
                    path:
                      _getAssetNodePathFromAssets(
                        parentFolderNodeId,
                        [||],
                        (editorState, engineState),
                      ),
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

let _buildWDBData = (imageAlignedByteLength, (editorState, engineState)) => {
  let (wdbArr, arrayBufferArr, bufferViewArr, byteOffset) =
    AssetWDBNodeMapEditorService.getWDBNodeMap(editorState)
    |> SparseMapService.reduceValid(
         (.
           (wdbArr, arrayBufferArr, bufferViewArr, byteOffset),
           {name, parentFolderNodeId, wdbArrayBuffer}: AssetNodeType.wdbResultType,
         ) => {
           let byteLength = wdbArrayBuffer |> ArrayBuffer.byteLength;
           let alignedByteLength = BufferUtils.alignedLength(byteLength);

           (
             wdbArr
             |> ArrayService.push(
                  {
                    name,
                    path:
                      _getAssetNodePathFromAssets(
                        parentFolderNodeId,
                        [||],
                        (editorState, engineState),
                      ),
                    bufferView: bufferViewArr |> Js.Array.length,
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
         ([||], [||], [||], imageAlignedByteLength),
       );

  (
    wdbArr,
    arrayBufferArr,
    bufferViewArr,
    bufferViewArr |> Js.Array.length === 0 ?
      imageAlignedByteLength : _computeBufferViewDataByteLength(bufferViewArr),
  );
};

let _buildJsonData = (editorState, engineState) => {
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
    wdbArr,
    wdbArrayBufferArr,
    wdbBufferViewArr,
    bufferTotalAlignedByteLength,
  ) =
    _buildWDBData(imageAlignedByteLength, (editorState, engineState));

  (
    (imageArr, textureArr, basicMaterialArr, lightMaterialArr, wdbArr),
    (imageBufferViewArr, wdbBufferViewArr),
    (imageUint8ArrayArr, wdbArrayBufferArr),
    (imageAlignedByteLength, bufferTotalAlignedByteLength),
  );
};

let _buildJsonUint8Array =
    (
      bufferAlignedByteLength,
      (
        bufferViewArr,
        imageArr,
        textureArr,
        basicMaterialArr,
        lightMaterialArr,
        wdbArr,
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
           wdbs: wdbArr,
           /* buffer: {
                byteLength: bufferAlignedByteLength,
              }, */
           bufferViews: bufferViewArr,
         }: ExportAssetType.assets
       )
       |> Obj.magic
       |> Js.Json.stringify,
     );
};

let _writeHeader = (jsonByteLength, bufferAlignedByteLength, dataView) =>
  dataView
  |> DataViewUtils.writeUint32_1(jsonByteLength, 0)
  |> DataViewUtils.writeUint32_1(bufferAlignedByteLength, _, dataView);

let _getEmptyEncodedUint8Data = () => {
  let encoder = TextEncoder.newTextEncoder();
  let emptyUint8DataArr = encoder |> TextEncoder.encodeUint8Array(" ");

  Uint8Array.unsafe_get(emptyUint8DataArr, 0);
};

let _writeJson =
    (
      byteOffset,
      (emptyEncodedUint8Data, jsonAlignedByteLength, jsonUint8Array),
      dataView,
    ) =>
  HeaderExportUtils.writeUint8ArrayToArrayBufferWithEmptyData(
    byteOffset,
    (emptyEncodedUint8Data, jsonAlignedByteLength, jsonUint8Array),
    dataView,
  );

let _writeBuffer =
    (
      (headerAndJsonAlignedByteOffset, imageAlignedByteLength),
      (imageBufferViewArr, wdbBufferViewArr),
      imageUint8ArrayArr,
      wdbArrayBufferArr,
      dataView,
    ) => {
  let dataView =
    imageBufferViewArr
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           dataView,
           {byteOffset, byteLength}: ExportAssetType.bufferView,
           index,
         ) => {
           let imageUint8Array = Array.unsafe_get(imageUint8ArrayArr, index);

           let (_, _, dataView) =
             HeaderExportUtils.writeUint8ArrayToArrayBuffer(
               imageUint8Array,
               headerAndJsonAlignedByteOffset + byteOffset,
               byteLength,
               dataView,
             );

           dataView;
         },
         dataView,
       );

  let dataView =
    wdbBufferViewArr
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           dataView,
           {byteOffset, byteLength}: ExportAssetType.bufferView,
           index,
         ) => {
           let wdbArrayBuffer = Array.unsafe_get(wdbArrayBufferArr, index);

           let (_, _, dataView) =
             HeaderExportUtils.writeArrayBufferToArrayBuffer(
               wdbArrayBuffer,
               imageAlignedByteLength + byteOffset,
               byteLength,
               dataView,
             );

           dataView;
         },
         dataView,
       );

  dataView;
};

let generateASB = (editorState, engineState) => {
  let (
    (imageArr, textureArr, basicMaterialArr, lightMaterialArr, wdbArr),
    (imageBufferViewArr, wdbBufferViewArr),
    (imageUint8ArrayArr, wdbArrayBufferArr),
    (imageAlignedByteLength, bufferTotalAlignedByteLength),
  ) =
    _buildJsonData(editorState, engineState);

  let jsonUint8Array =
    _buildJsonUint8Array(
      bufferTotalAlignedByteLength,
      (
        Js.Array.concat(imageBufferViewArr, wdbBufferViewArr),
        imageArr,
        textureArr,
        basicMaterialArr,
        lightMaterialArr,
        wdbArr,
      ),
    );

  let jsonByteLength = jsonUint8Array |> Uint8Array.byteLength;

  let jsonAlignedByteLength = jsonByteLength |> BufferUtils.alignedLength;

  let totalByteLength =
    ASBUtils.getHeaderTotalByteLength()
    + jsonAlignedByteLength
    + bufferTotalAlignedByteLength;

  let asb = ArrayBuffer.make(totalByteLength);
  let dataView = DataViewUtils.create(asb);

  let byteOffset =
    _writeHeader(jsonByteLength, bufferTotalAlignedByteLength, dataView);

  let emptyEncodedUint8Data = _getEmptyEncodedUint8Data();

  let (byteOffset, _, dataView) =
    _writeJson(
      byteOffset,
      (emptyEncodedUint8Data, jsonAlignedByteLength, jsonUint8Array),
      dataView,
    );

  let dataView =
    _writeBuffer(
      (byteOffset, imageAlignedByteLength),
      (imageBufferViewArr, wdbBufferViewArr),
      imageUint8ArrayArr,
      wdbArrayBufferArr,
      dataView,
    );

  asb;
};