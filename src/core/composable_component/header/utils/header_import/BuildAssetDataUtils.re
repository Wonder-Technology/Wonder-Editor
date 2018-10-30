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
                   /* TODO test */
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
  /* |> WonderBsMost.Most.from */
  |> WonderBsMost.Most.mergeArray
  |> WonderBsMost.Most.reduce(
       (
         (imageMap, imageNodeIdMap, editorState),
         (image, uint8Array, imageIndex, name, mimeType),
       ) => {
         let (editorState, assetNodeId) =
           AssetIdUtils.generateAssetId(editorState);

         (
           imageMap |> WonderCommonlib.SparseMapService.set(imageIndex, image),
           imageNodeIdMap
           |> WonderCommonlib.SparseMapService.set(imageIndex, assetNodeId),
           editorState
           |> AssetImageNodeMapEditorService.setResult(
                assetNodeId,
                AssetImageNodeMapEditorService.buildImageNodeResult(
                  None,
                  Some(uint8Array),
                  name,
                  mimeType,
                ),
              ),
         );
       },
       (
         WonderCommonlib.SparseMapService.createEmpty(),
         WonderCommonlib.SparseMapService.createEmpty(),
         editorState,
       ),
     );

let buildTextureData =
    (
      {textures}: ExportAssetType.assets,
      (imageMap, imageNodeIdMap),
      (editorState, engineState),
    ) =>
  textures
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (.
         (textureMap, (editorState, engineState)),
         {path, source, name, magFilter, minFilter, wrapS, wrapT}: ExportAssetType.texture,
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
           |> BasicSourceTextureEngineService.setBasicSourceTextureName(
                name,
                texture,
              )
           |> BasicSourceTextureEngineService.setSource(
                imageMap
                |> WonderCommonlib.SparseMapService.unsafeGet(source)
                |> ImageType.convertDomToImageElement,
                texture,
              );

         let (editorState, assetNodeId) =
           AssetIdUtils.generateAssetId(editorState);

         let (parentFolderNodeId, editorState) =
           HeaderImportFolderUtils.buildFolder(
             path,
             (editorState, engineState),
           );

         let editorState =
           editorState
           |> AssetTextureNodeMapEditorService.setResult(
                assetNodeId,
                AssetTextureNodeMapEditorService.buildTextureNodeResult(
                  texture,
                  parentFolderNodeId,
                  imageNodeIdMap
                  |> WonderCommonlib.SparseMapService.unsafeGet(source),
                ),
              )
           |> AssetTreeNodeUtils.createNodeAndAddToTargetNodeChildren(
                parentFolderNodeId |> OptionService.unsafeGet,
                assetNodeId,
                AssetNodeType.Texture,
              );

         (
           textureMap
           |> WonderCommonlib.SparseMapService.set(textureIndex, texture),
           (editorState, engineState),
         );
       },
       (
         WonderCommonlib.SparseMapService.createEmpty(),
         (editorState, engineState),
       ),
     );

let _buildMaterialEditorData =
    (material, path, type_, (editorState, engineState)) => {
  let (editorState, assetNodeId) = AssetIdUtils.generateAssetId(editorState);

  let (parentFolderNodeId, editorState) =
    HeaderImportFolderUtils.buildFolder(path, (editorState, engineState));

  editorState
  |> AssetMaterialNodeMapEditorService.setResult(
       assetNodeId,
       AssetMaterialNodeMapEditorService.buildMaterialNodeResult(
         parentFolderNodeId,
         type_,
         material,
       ),
     )
  |> AssetTreeNodeUtils.createNodeAndAddToTargetNodeChildren(
       parentFolderNodeId |> OptionService.unsafeGet,
       assetNodeId,
       AssetNodeType.Material,
     );
};

let buildMaterialData =
    (
      {basicMaterials, lightMaterials}: ExportAssetType.assets,
      textureMap,
      (editorState, engineState),
    ) => {
  let (basicMaterialMap, (editorState, engineState)) =
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
             |> BasicMaterialEngineService.setBasicMaterialName(
                  material,
                  name,
                )
             |> BasicMaterialEngineService.setColor(color, material);

           let editorState =
             _buildMaterialEditorData(
               material,
               path,
               AssetMaterialDataType.BasicMaterial,
               (editorState, engineState),
             );

           (
             basicMaterialMap
             |> WonderCommonlib.SparseMapService.set(materialIndex, material),
             (editorState, engineState),
           );
         },
         (
           WonderCommonlib.SparseMapService.createEmpty(),
           (editorState, engineState),
         ),
       );

  let (lightMaterialMap, (editorState, engineState)) =
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
             |> LightMaterialEngineService.setLightMaterialName(
                  material,
                  name,
                )
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
                      |> WonderCommonlib.SparseMapService.unsafeGet(
                           diffuseMap,
                         ),
                      material,
                    );
               };

           let editorState =
             _buildMaterialEditorData(
               material,
               path,
               AssetMaterialDataType.LightMaterial,
               (editorState, engineState),
             );

           (
             lightMaterialMap
             |> WonderCommonlib.SparseMapService.set(materialIndex, material),
             (editorState, engineState),
           );
         },
         (
           WonderCommonlib.SparseMapService.createEmpty(),
           (editorState, engineState),
         ),
       );

  (basicMaterialMap, lightMaterialMap, (editorState, engineState));
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

  wdbs
  |> WonderBsMost.Most.from
  |> WonderBsMost.Most.concatMap(
       ({name, bufferView, path}: ExportAssetType.wdb) => {
       let editorState = StateEditorService.getState();
       let engineState = StateEngineService.unsafeGetState();

       let arrayBuffer = _getArrayBuffer(buffer, bufferView, bufferViews);

       let (editorState, assetNodeId) =
         AssetIdUtils.generateAssetId(editorState);

       let (parentFolderNodeId, editorState) =
         HeaderImportFolderUtils.buildFolder(
           path,
           (editorState, engineState),
         );

       AssetWDBUtils.importAssetWDB(
         (name, arrayBuffer),
         (assetNodeId, parentFolderNodeId |> OptionService.unsafeGet),
         (editorState, engineState),
       )
       |> then_(((allGameObjects, (editorState, engineState))) => {
            editorState |> StateEditorService.setState |> ignore;
            engineState |> StateEngineService.setState |> ignore;

            allGameObjectsArrRef :=
              allGameObjectsArrRef^ |> Js.Array.concat(allGameObjects);

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