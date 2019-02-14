open Js.Typed_array;

open Js.Promise;

let _buildLoadImageStream = (arrayBuffer, mimeType, errorMsg) => {
  let blob = Blob.newBlobFromArrayBuffer(arrayBuffer, mimeType);

  LoadImageUtils.loadBlobImage(blob |> Blob.createObjectURL, errorMsg)
  |> WonderBsMost.Most.tap(image => Blob.revokeObjectURL(blob));
};

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

         streamArr
         |> ArrayService.push(
              _buildLoadImageStream(
                arrayBuffer,
                mimeType,
                {j|load image error. imageIndex: $imageIndex|j},
              )
              |> WonderBsMost.Most.map(image => {
                   ImageUtils.setImageName(image, name);

                   image;
                 })
              |> WonderBsMost.Most.map(image =>
                   (
                     image,
                     Uint8Array.fromBuffer(arrayBuffer),
                     imageIndex,
                     name,
                     mimeType,
                   )
                 ),
            );
       },
       [||],
     )
  |> WonderBsMost.Most.mergeArray
  |> WonderBsMost.Most.reduce(
       (
         (imageMap, imageDataIndexMap, editorState),
         (image, uint8Array, imageIndex, name, mimeType),
       ) => {
         let (editorState, imageDataIndex) =
           IndexAssetEditorService.generateImageDataMapIndex(editorState);

         (
           imageMap |> WonderCommonlib.ImmutableSparseMapService.set(imageIndex, image),
           imageDataIndexMap
           |> WonderCommonlib.ImmutableSparseMapService.set(imageIndex, imageDataIndex),
           editorState
           |> ImageDataMapAssetEditorService.setData(
                imageDataIndex,
                ImageDataMapAssetService.buildData(
                  ~base64=None,
                  ~uint8Array=Some(uint8Array),
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
                |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(source)
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
                    |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(source),
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
                   ~imageNodeId=
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
           |> WonderCommonlib.ImmutableSparseMapService.set(textureIndex, texture),
           (editorState, engineState),
         );
       },
       (
         WonderCommonlib.ImmutableSparseMapService.createEmpty(),
         (editorState, engineState),
       ),
     );

let _buildMaterialEditorData =
    (material, path, type_, (editorState, engineState)) => {
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
       ),
     );
};

let _buildBasicMaterialData = (basicMaterials, (editorState, engineState)) =>
  basicMaterials
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (.
         (basicMaterialMap, (editorState, engineState)),
         {name, path, color}: ExportAssetType.basicMaterial,
         materialIndex,
       ) => {
         let (engineState, material) =
           BasicMaterialEngineService.create(engineState);

         let engineState =
           engineState
           |> BasicMaterialEngineService.setBasicMaterialName(material, name)
           |> BasicMaterialEngineService.setColor(color, material);

         let editorState =
           _buildMaterialEditorData(
             material,
             path,
             MaterialDataAssetType.BasicMaterial,
             (editorState, engineState),
           );

         (
           basicMaterialMap
           |> WonderCommonlib.ImmutableSparseMapService.set(materialIndex, material),
           (editorState, engineState),
         );
       },
       (
         WonderCommonlib.ImmutableSparseMapService.createEmpty(),
         (editorState, engineState),
       ),
     );

let _buildLightMaterialData =
    (lightMaterials, textureMap, (editorState, engineState)) =>
  lightMaterials
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (.
         (lightMaterialMap, (editorState, engineState)),
         {name, diffuseColor, diffuseMap, shininess, path}: ExportAssetType.lightMaterial,
         materialIndex,
       ) => {
         let (engineState, material) =
           LightMaterialEngineService.create(engineState);

         let engineState =
           engineState
           |> LightMaterialEngineService.setLightMaterialName(material, name)
           |> LightMaterialEngineService.setLightMaterialDiffuseColor(
                diffuseColor,
                material,
              )
           |> LightMaterialEngineService.setLightMaterialShininess(
                shininess,
                material,
              );

         let engineState =
           OptionService.isJsonSerializedValueNone(diffuseMap) ?
             engineState :
             {
               let diffuseMap =
                 diffuseMap |> OptionService.unsafeGetJsonSerializedValue;

               engineState
               |> LightMaterialEngineService.setLightMaterialDiffuseMap(
                    textureMap
                    |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(diffuseMap),
                    material,
                  );
             };

         let editorState =
           _buildMaterialEditorData(
             material,
             path,
             MaterialDataAssetType.LightMaterial,
             (editorState, engineState),
           );

         (
           lightMaterialMap
           |> WonderCommonlib.ImmutableSparseMapService.set(materialIndex, material),
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
      textureMap,
      (editorState, engineState),
    ) => {
  let (basicMaterialMap, (editorState, engineState)) =
    _buildBasicMaterialData(basicMaterials, (editorState, engineState));
  let (lightMaterialMap, (editorState, engineState)) =
    _buildLightMaterialData(
      lightMaterials,
      textureMap,
      (editorState, engineState),
    );

  (basicMaterialMap, lightMaterialMap, (editorState, engineState));
};

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
       ({name, bufferView, path}: ExportAssetType.wdb) => {
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
         (name, arrayBuffer),
         (assetNodeId, parentFolderNode),
         (editorState, engineState),
       )
       |> then_(
            (
              (
                (allGameObjects, _wdbImageUint8ArrayDataMap),
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
                          ~expect={j|wdbImageUint8ArrayDataMap be empty|j},
                          ~actual={j|not|j},
                        ),
                        () =>
                        _wdbImageUint8ArrayDataMap
                        |> WonderCommonlib.ImmutableSparseMapService.length == 0
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