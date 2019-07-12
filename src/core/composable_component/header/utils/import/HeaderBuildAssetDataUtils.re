open Js.Typed_array;

open Js.Promise;

let _buildLoadImageStream = (blob, blobObjectURL, mimeType, errorMsg) =>
  LoadImageUtils.loadBlobImage(blobObjectURL, errorMsg)
  |> WonderBsMost.Most.tap(image => Blob.revokeObjectURL(blob));

let _getArrayBuffer =
    (buffer, bufferView, bufferViews: array(ExportAssetType.bufferView)) => {
  let {byteOffset, byteLength}: ExportAssetType.bufferView =
    Array.unsafe_get(bufferViews, bufferView);

  buffer
  |> Js.Typed_array.ArrayBuffer.slice(
       ~start=byteOffset,
       ~end_=byteOffset + byteLength,
     );
};

let buildImageData =
    ({images, bufferViews}: ExportAssetType.assets, buffer, editorState) =>
  images
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (.
         streamArr,
         {name, bufferView, mimeType}: ExportAssetType.image,
         imageIndex,
       ) => {
         let arrayBuffer = _getArrayBuffer(buffer, bufferView, bufferViews);
         let blob = Blob.newBlobFromArrayBuffer(arrayBuffer, mimeType);
         let blobObjectURL = blob |> Blob.createObjectURL;

         streamArr
         |> ArrayService.push(
              _buildLoadImageStream(
                blob,
                blobObjectURL,
                mimeType,
                {j|load image error. imageIndex: $imageIndex|j},
              )
              |> WonderBsMost.Most.map(image => {
                   ImageUtils.setImageName(image, name);

                   image;
                 })
              |> WonderBsMost.Most.map(image =>
                   (image, blobObjectURL, imageIndex, name, mimeType)
                 ),
            );
       },
       [||],
     )
  |> WonderBsMost.Most.mergeArray
  |> WonderBsMost.Most.reduce(
       (
         (imageMap, imageDataIndexMap, editorState),
         (image, blobObjectURL, imageIndex, name, mimeType),
       ) => {
         let (editorState, imageDataIndex) =
           IndexAssetEditorService.generateImageDataMapIndex(editorState);

         (
           imageMap
           |> WonderCommonlib.ImmutableSparseMapService.set(imageIndex, image),
           imageDataIndexMap
           |> WonderCommonlib.ImmutableSparseMapService.set(
                imageIndex,
                imageDataIndex,
              ),
           editorState
           |> ImageDataMapAssetEditorService.setData(
                imageDataIndex,
                ImageDataMapAssetService.buildData(
                  ~base64=None,
                  ~uint8Array=None,
                  ~blobObjectURL=Some(blobObjectURL),
                  ~name,
                  ~mimeType,
                  (),
                ),
              ),
         );
       },
       (
         WonderCommonlib.ImmutableSparseMapService.createEmpty(),
         WonderCommonlib.ImmutableSparseMapService.createEmpty(),
         editorState,
       ),
     );

let buildTextureData =
    (
      {textures}: ExportAssetType.assets,
      (imageMap, imageDataIndexMap),
      (editorState, engineState),
    ) =>
  textures
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (.
         (textureMap, (editorState, engineState)),
         {
           path,
           source,
           name,
           magFilter,
           minFilter,
           wrapS,
           wrapT,
           format,
           type_,
           flipY,
         }: ExportAssetType.texture,
         textureIndex,
       ) => {
         let (engineState, texture) =
           BasicSourceTextureEngineService.create(engineState);

         let engineState =
           engineState
           |> BasicSourceTextureEngineService.setWrapS(
                wrapS |> TextureTypeUtils.convertIntToWrap,
                texture,
              )
           |> BasicSourceTextureEngineService.setWrapT(
                wrapT |> TextureTypeUtils.convertIntToWrap,
                texture,
              )
           |> BasicSourceTextureEngineService.setMagFilter(
                magFilter |> TextureTypeUtils.convertIntToFilter,
                texture,
              )
           |> BasicSourceTextureEngineService.setMinFilter(
                minFilter |> TextureTypeUtils.convertIntToFilter,
                texture,
              )
           |> BasicSourceTextureEngineService.setFormat(
                format |> TextureTypeUtils.convertIntToFormat,
                texture,
              )
           |> BasicSourceTextureEngineService.setType(type_, texture)
           |> BasicSourceTextureEngineService.setFlipY(flipY, texture)
           |> BasicSourceTextureEngineService.setBasicSourceTextureName(
                name,
                texture,
              )
           |> BasicSourceTextureEngineService.setSource(
                imageMap
                |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(
                     source,
                   )
                |> ImageType.convertDomToImageElement,
                texture,
              );

         let (editorState, assetNodeId) =
           IdAssetEditorService.generateNodeId(editorState);

         let (editorState, parentFolderNode) =
           OperateTreeAssetLogicService.addFolderNodesToTreeByPath(
             path,
             (editorState, engineState),
           );

         let editorState =
           editorState
           |> TextureNodeAssetEditorService.addTextureNodeToAssetTree(
                parentFolderNode,
                TextureNodeAssetService.buildNode(
                  ~nodeId=assetNodeId,
                  ~textureComponent=texture,
                  ~imageDataIndex=
                    imageDataIndexMap
                    |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(
                         source,
                       ),
                ),
              );

         /* OperateTreeAssetLogicService.addFolderNodesToTreeByPath(
              path,
              (editorState, engineState),
            )
            |> TextureNodeAssetEditorService.setNodeData(
                 assetNodeId,
                 TextureNodeAssetService.buildNodeData(
                   ~textureComponent=texture,
                   ~imageDataIndex=
                     imageDataIndexMap
                     |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(source),
                 ),
               ); */
         /* editorState
            |> TextureNodeMapAssetEditorService.setResult(
                 assetNodeId,
                 TextureNodeMapAssetEditorService.buildTextureNodeResult(
                   ~textureComponent=texture,
                   ~parentFolderNodeId,
                   ~image=
                     imageDataIndexMap
                     |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(source),
                   (),
                 ),
               ) */
         /* |> AssetTreeUtils.createNodeAndAddToTargetNodeChildren(
              parentFolderNodeId |> OptionService.unsafeGet,
              assetNodeId,
              NodeAssetType.Texture,
            ); */

         (
           textureMap
           |> WonderCommonlib.ImmutableSparseMapService.set(
                textureIndex,
                texture,
              ),
           (editorState, engineState),
         );
       },
       (
         WonderCommonlib.ImmutableSparseMapService.createEmpty(),
         (editorState, engineState),
       ),
     );

let buildCubemapData =
    (
      {cubemaps}: ExportAssetType.assets,
      imageMap,
      (editorState, engineState),
    ) =>
  cubemaps
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (.
         (editorState, engineState),
         {
           path,
           pxSource,
           nxSource,
           pySource,
           nySource,
           pzSource,
           nzSource,
           name,
           magFilter,
           minFilter,
           wrapS,
           wrapT,
           flipY,
           pxFormat,
           nxFormat,
           pyFormat,
           nyFormat,
           pzFormat,
           nzFormat,
           pxType,
           nxType,
           pyType,
           nyType,
           pzType,
           nzType,
         }: ExportAssetType.cubemap,
         cubemapIndex,
       ) => {
         let (engineState, cubemap) =
           CubemapTextureEngineService.create(engineState);

         let engineState =
           engineState
           |> CubemapTextureEngineService.setWrapS(
                wrapS |> TextureTypeUtils.convertIntToWrap,
                cubemap,
              )
           |> CubemapTextureEngineService.setWrapT(
                wrapT |> TextureTypeUtils.convertIntToWrap,
                cubemap,
              )
           |> CubemapTextureEngineService.setMagFilter(
                magFilter |> TextureTypeUtils.convertIntToFilter,
                cubemap,
              )
           |> CubemapTextureEngineService.setMinFilter(
                minFilter |> TextureTypeUtils.convertIntToFilter,
                cubemap,
              )
           |> CubemapTextureEngineService.setPXFormat(
                pxFormat |> TextureTypeUtils.convertIntToFormat,
                cubemap,
              )
           |> CubemapTextureEngineService.setNXFormat(
                nxFormat |> TextureTypeUtils.convertIntToFormat,
                cubemap,
              )
           |> CubemapTextureEngineService.setPYFormat(
                pyFormat |> TextureTypeUtils.convertIntToFormat,
                cubemap,
              )
           |> CubemapTextureEngineService.setNYFormat(
                nyFormat |> TextureTypeUtils.convertIntToFormat,
                cubemap,
              )
           |> CubemapTextureEngineService.setPZFormat(
                pzFormat |> TextureTypeUtils.convertIntToFormat,
                cubemap,
              )
           |> CubemapTextureEngineService.setNZFormat(
                nzFormat |> TextureTypeUtils.convertIntToFormat,
                cubemap,
              )
           |> CubemapTextureEngineService.setPXType(pxType, cubemap)
           |> CubemapTextureEngineService.setNXType(nxType, cubemap)
           |> CubemapTextureEngineService.setPYType(pyType, cubemap)
           |> CubemapTextureEngineService.setNYType(nyType, cubemap)
           |> CubemapTextureEngineService.setPZType(pzType, cubemap)
           |> CubemapTextureEngineService.setNZType(nzType, cubemap)
           |> CubemapTextureEngineService.setFlipY(flipY, cubemap)
           |> CubemapTextureEngineService.setCubemapTextureName(
                name,
                cubemap,
              )
           |> CubemapTextureEngineService.setPXSource(
                imageMap
                |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(
                     pxSource,
                   )
                |> ImageType.convertDomToImageElement,
                cubemap,
              )
           |> CubemapTextureEngineService.setNXSource(
                imageMap
                |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(
                     nxSource,
                   )
                |> ImageType.convertDomToImageElement,
                cubemap,
              )
           |> CubemapTextureEngineService.setPYSource(
                imageMap
                |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(
                     pySource,
                   )
                |> ImageType.convertDomToImageElement,
                cubemap,
              )
           |> CubemapTextureEngineService.setNYSource(
                imageMap
                |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(
                     nySource,
                   )
                |> ImageType.convertDomToImageElement,
                cubemap,
              )
           |> CubemapTextureEngineService.setPZSource(
                imageMap
                |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(
                     pzSource,
                   )
                |> ImageType.convertDomToImageElement,
                cubemap,
              )
           |> CubemapTextureEngineService.setNZSource(
                imageMap
                |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(
                     nzSource,
                   )
                |> ImageType.convertDomToImageElement,
                cubemap,
              );

         let (editorState, assetNodeId) =
           IdAssetEditorService.generateNodeId(editorState);

         let (editorState, parentFolderNode) =
           OperateTreeAssetLogicService.addFolderNodesToTreeByPath(
             path,
             (editorState, engineState),
           );

         let editorState =
           editorState
           |> CubemapNodeAssetEditorService.addCubemapNodeToAssetTree(
                parentFolderNode,
                CubemapNodeAssetService.buildNode(
                  ~nodeId=assetNodeId,
                  ~textureComponent=cubemap,
                ),
              );

         (editorState, engineState);
       },
       (editorState, engineState),
     );

let _addMaterialToAssetTree =
    (
      (material, path, type_),
      (snapshot, imageDataIndexMap),
      (editorState, engineState),
    ) => {
  let (editorState, assetNodeId) =
    IdAssetEditorService.generateNodeId(editorState);

  let (editorState, parentFolderNode) =
    OperateTreeAssetLogicService.addFolderNodesToTreeByPath(
      path,
      (editorState, engineState),
    );

  editorState
  |> MaterialNodeAssetEditorService.addMaterialNodeToAssetTree(
       parentFolderNode,
       MaterialNodeAssetService.buildNode(
         ~nodeId=assetNodeId,
         ~type_,
         ~materialComponent=material,
         ~snapshotImageDataIndex=
           imageDataIndexMap
           |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(snapshot),
       ),
     );
};

let _buildBasicMaterialData =
    (basicMaterials, imageDataIndexMap, (editorState, engineState)) =>
  basicMaterials
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (.
         (basicMaterialMap, (editorState, engineState)),
         {name, path, snapshot, color}: ExportAssetType.basicMaterial,
         materialIndex,
       ) => {
         let (engineState, material) =
           BasicMaterialEngineService.create(engineState);

         let engineState =
           engineState
           |> BasicMaterialEngineService.setBasicMaterialName(name, material)
           |> BasicMaterialEngineService.setColor(color, material);

         let editorState =
           _addMaterialToAssetTree(
             (material, path, MaterialDataAssetType.BasicMaterial),
             (snapshot, imageDataIndexMap),
             (editorState, engineState),
           );

         (
           basicMaterialMap
           |> WonderCommonlib.ImmutableSparseMapService.set(
                materialIndex,
                material,
              ),
           (editorState, engineState),
         );
       },
       (
         WonderCommonlib.ImmutableSparseMapService.createEmpty(),
         (editorState, engineState),
       ),
     );

let _setLightMaterialNotMapData =
    (material, (name, diffuseColor, shininess), engineState) =>
  engineState
  |> LightMaterialEngineService.setLightMaterialName(name, material)
  |> LightMaterialEngineService.setLightMaterialDiffuseColor(
       diffuseColor,
       material,
     )
  |> LightMaterialEngineService.setLightMaterialShininess(shininess, material);

let _setLightMaterialMapData = (material, textureMap, diffuseMap, engineState) =>
  OptionService.isJsonSerializedValueNone(diffuseMap) ?
    engineState :
    {
      let diffuseMap = diffuseMap |> OptionService.unsafeGetJsonSerializedValue;

      engineState
      |> LightMaterialEngineService.setLightMaterialDiffuseMap(
           textureMap
           |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(diffuseMap),
           material,
         );
    };

let _buildLightMaterialData =
    (
      lightMaterials,
      (imageDataIndexMap, textureMap),
      (editorState, engineState),
    ) =>
  lightMaterials
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (.
         (lightMaterialMap, (editorState, engineState)),
         {name, diffuseColor, diffuseMap, shininess, snapshot, path}: ExportAssetType.lightMaterial,
         materialIndex,
       ) => {
         let (engineState, material) =
           LightMaterialEngineService.create(engineState);

         let engineState =
           _setLightMaterialNotMapData(
             material,
             (name, diffuseColor, shininess),
             engineState,
           );

         let engineState =
           _setLightMaterialMapData(
             material,
             textureMap,
             diffuseMap,
             engineState,
           );

         let editorState =
           _addMaterialToAssetTree(
             (material, path, MaterialDataAssetType.LightMaterial),
             (snapshot, imageDataIndexMap),
             (editorState, engineState),
           );

         (
           lightMaterialMap
           |> WonderCommonlib.ImmutableSparseMapService.set(
                materialIndex,
                material,
              ),
           (editorState, engineState),
         );
       },
       (
         WonderCommonlib.ImmutableSparseMapService.createEmpty(),
         (editorState, engineState),
       ),
     );

let buildMaterialData =
    (
      {basicMaterials, lightMaterials}: ExportAssetType.assets,
      (imageDataIndexMap, textureMap),
      (editorState, engineState),
    ) => {
  let (basicMaterialMap, (editorState, engineState)) =
    _buildBasicMaterialData(
      basicMaterials,
      imageDataIndexMap,
      (editorState, engineState),
    );
  let (lightMaterialMap, (editorState, engineState)) =
    _buildLightMaterialData(
      lightMaterials,
      (imageDataIndexMap, textureMap),
      (editorState, engineState),
    );

  (
    imageDataIndexMap,
    (basicMaterialMap, lightMaterialMap),
    (editorState, engineState),
  );
};

let _addScriptEventFunctionToAssetTree =
    (path, (eventFunctionData, name), engineState, editorState) => {
  let (editorState, assetNodeId) =
    IdAssetEditorService.generateNodeId(editorState);

  let (editorState, parentFolderNode) =
    OperateTreeAssetLogicService.addFolderNodesToTreeByPath(
      path,
      (editorState, engineState),
    );

  editorState
  |> ScriptEventFunctionNodeAssetEditorService.addScriptEventFunctionNodeToAssetTree(
       parentFolderNode,
       ScriptEventFunctionNodeAssetService.buildNode(
         ~nodeId=assetNodeId,
         ~name,
         ~eventFunctionData,
       ),
     );
};

let buildScriptEventFunctionData =
    (
      {scriptEventFunctions}: ExportAssetType.assets,
      engineState,
      editorState,
    ) =>
  scriptEventFunctions
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (.
         (scriptEventFunctionEntriesMap, editorState),
         {name, path, eventFunctionDataStr}: ExportAssetType.scriptEventFunction,
         scriptEventFunctionIndex,
       ) => {
         let eventFunctionData =
           Wonderjs.AssembleABSystem.RAB.convertEventFunctionDataStrToRecord(
             eventFunctionDataStr,
           );

         let editorState =
           _addScriptEventFunctionToAssetTree(
             path,
             (eventFunctionData, name),
             engineState,
             editorState,
           );

         (
           scriptEventFunctionEntriesMap
           |> WonderCommonlib.ImmutableSparseMapService.set(
                scriptEventFunctionIndex,
                (name, eventFunctionData),
              ),
           editorState,
         );
       },
       (WonderCommonlib.ImmutableSparseMapService.createEmpty(), editorState),
     );

let _addScriptAttributeToAssetTree =
    (path, (attribute, name), engineState, editorState) => {
  let (editorState, assetNodeId) =
    IdAssetEditorService.generateNodeId(editorState);

  let (editorState, parentFolderNode) =
    OperateTreeAssetLogicService.addFolderNodesToTreeByPath(
      path,
      (editorState, engineState),
    );

  editorState
  |> ScriptAttributeNodeAssetEditorService.addScriptAttributeNodeToAssetTree(
       parentFolderNode,
       ScriptAttributeNodeAssetService.buildNode(
         ~nodeId=assetNodeId,
         ~name,
         ~attribute,
       ),
     );
};

let buildScriptAttributeData =
    ({scriptAttributes}: ExportAssetType.assets, engineState, editorState) =>
  scriptAttributes
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (.
         (scriptAttributeEntriesMap, editorState),
         {name, path, attributeStr}: ExportAssetType.scriptAttribute,
         scriptAttributeIndex,
       ) => {
         let attribute =
           Wonderjs.AssembleABSystem.RAB.convertAttributeStrToRecord(
             attributeStr,
           );

         let editorState =
           _addScriptAttributeToAssetTree(
             path,
             (attribute, name),
             engineState,
             editorState,
           );

         (
           scriptAttributeEntriesMap
           |> WonderCommonlib.ImmutableSparseMapService.set(
                scriptAttributeIndex,
                (name, attribute),
              ),
           editorState,
         );
       },
       (WonderCommonlib.ImmutableSparseMapService.createEmpty(), editorState),
     );

let _addAssetBundleToAssetTree =
    ((name, path, type_, assetBundle), engineState, editorState) => {
  let (editorState, assetNodeId) =
    IdAssetEditorService.generateNodeId(editorState);

  let (editorState, parentFolderNode) =
    OperateTreeAssetLogicService.addFolderNodesToTreeByPath(
      path,
      (editorState, engineState),
    );

  editorState
  |> AssetBundleNodeAssetEditorService.addAssetBundleNodeToAssetTree(
       parentFolderNode,
       AssetBundleNodeAssetService.buildNode(
         ~nodeId=assetNodeId,
         ~name,
         ~type_,
         ~assetBundle,
       ),
     );
};

let buildAssetBundleData =
    (
      {assetBundles, bufferViews}: ExportAssetType.assets,
      buffer,
      engineState,
      editorState,
    ) =>
  assetBundles
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (.
         editorState,
         {name, path, type_, assetBundleBufferView}: ExportAssetType.assetBundle,
       ) => {
         let assetBundle =
           _getArrayBuffer(buffer, assetBundleBufferView, bufferViews);

         _addAssetBundleToAssetTree(
           (
             name,
             path,
             type_ |> NodeAssetType.convertIntToAssetBundleType,
             assetBundle,
           ),
           engineState,
           editorState,
         );
       },
       editorState,
     );

/* let addExtractedMateriialAssetDataToMaterialData =
     (extractedMaterialAssetDataArr, (basicMaterialMap, lightMaterialMap)) =>
   extractedMaterialAssetDataArr
   |> WonderCommonlib.ArrayService.reduceOneParam(
        (.
          (basicMaterialMap, lightMaterialMap),
          ((material, materialType), _),
        ) =>
          switch (materialType) {
          | MaterialDataAssetType.BasicMaterial => (
              basicMaterialMap |> WonderCommonlib.ImmutableSparseMapService.push(material),
              lightMaterialMap,
            )
          | MaterialDataAssetType.LightMaterial => (
              basicMaterialMap,
              lightMaterialMap |> WonderCommonlib.ImmutableSparseMapService.push(material),
            )
          },
        (basicMaterialMap, lightMaterialMap),
      ); */

let _mergeImageUint8ArrayDataMap =
    (totalImageUint8ArrayDataMap, targetImageUint8ArrayDataMap) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect=
                  {j|different wdb->imageUint8ArrayDataMap->key(texture) are different|j},
                ~actual={j|not|j},
              ),
              () =>
              targetImageUint8ArrayDataMap
              |> WonderCommonlib.ImmutableSparseMapService.getValidKeys
              |> Js.Array.filter(texture =>
                   totalImageUint8ArrayDataMap
                   |> WonderCommonlib.ImmutableSparseMapService.has(texture)
                 )
              |> Js.Array.length == 0
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  WonderCommonlib.ImmutableSparseMapService.mergeSparseMaps([|
    totalImageUint8ArrayDataMap,
    targetImageUint8ArrayDataMap,
  |]);
};

let buildWDBData =
    (
      imageDataIndexMap,
      {wdbs, bufferViews}: ExportAssetType.assets,
      buffer,
      (editorState, engineState),
    ) => {
  editorState |> StateEditorService.setState |> ignore;
  engineState |> StateEngineService.setState |> ignore;
  let allGameObjectsArrRef = ref([||]);
  /* let totalImageUint8ArrayDataMapRef =
     ref(WonderCommonlib.ImmutableSparseMapService.createEmpty()); */

  wdbs
  |> WonderBsMost.Most.from
  |> WonderBsMost.Most.concatMap(
       ({name, bufferView, path, snapshot}: ExportAssetType.wdb) => {
       let editorState = StateEditorService.getState();
       let engineState = StateEngineService.unsafeGetState();

       let arrayBuffer = _getArrayBuffer(buffer, bufferView, bufferViews);

       let (editorState, assetNodeId) =
         IdAssetEditorService.generateNodeId(editorState);

       let (editorState, parentFolderNode) =
         OperateTreeAssetLogicService.addFolderNodesToTreeByPath(
           path,
           (editorState, engineState),
         );
       HeaderImportASBWDBUtils.importWDB(
         (imageDataIndexMap, snapshot, name, arrayBuffer),
         (assetNodeId, parentFolderNode),
         (editorState, engineState),
       )
       |> then_(
            (
              (
                (
                  allGameObjects,
                  skyboxCubemapOpt,
                  wdbBasicSourceTextureImageUint8ArrayDataMap,
                  wdbCubemapTextureImageUint8ArrayDataMap,
                ),
                (editorState, engineState),
              ),
            ) => {
            WonderLog.Contract.requireCheck(
              () =>
                WonderLog.(
                  Contract.(
                    Operators.(
                      test(
                        Log.buildAssertMessage(
                          ~expect=
                            {j|wdbBasicSourceTextureImageUint8ArrayDataMap, wdbCubemapTextureImageUint8ArrayDataMap be empty|j},
                          ~actual={j|not|j},
                        ),
                        () => {
                          wdbBasicSourceTextureImageUint8ArrayDataMap
                          |> WonderCommonlib.ImmutableSparseMapService.length
                          == 0;

                          wdbCubemapTextureImageUint8ArrayDataMap
                          |> WonderCommonlib.ImmutableSparseMapService.length
                          == 0;
                        },
                      )
                    )
                  )
                ),
              StateEditorService.getStateIsDebug(),
            );

            editorState |> StateEditorService.setState |> ignore;
            engineState |> StateEngineService.setState |> ignore;

            allGameObjectsArrRef :=
              allGameObjectsArrRef^ |> Js.Array.concat(allGameObjects);

            /* totalImageUint8ArrayDataMapRef :=
               _mergeImageUint8ArrayDataMap(
                 totalImageUint8ArrayDataMapRef^,
                 imageUint8ArrayDataMap,
               ); */

            () |> resolve;
          })
       |> WonderBsMost.Most.fromPromise;
     })
  |> WonderBsMost.Most.drain
  |> then_(_ => {
       let editorState = StateEditorService.getState();
       let engineState = StateEngineService.unsafeGetState();

       (allGameObjectsArrRef^, (editorState, engineState)) |> resolve;
     });
};