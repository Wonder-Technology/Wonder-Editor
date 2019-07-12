let buildImageUint8ArrayMap = editorState =>
  TextureNodeAssetEditorService.findAllTextureNodes(editorState)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. map, textureNode) => {
         let {textureComponent, imageDataIndex}: NodeAssetType.textureNodeData =
           TextureNodeAssetService.getNodeData(textureNode);

         let {uint8Array, mimeType}: ImageDataType.imageData =
           BasicSourceTextureImageDataMapAssetEditorService.unsafeGetData(
             imageDataIndex,
             editorState,
           );

         uint8Array
         |> OptionService.andThenWithDefault(
              uint8Array =>
                map
                |> WonderCommonlib.ImmutableSparseMapService.set(
                     textureComponent,
                     (mimeType, uint8Array),
                   ),
              map,
            );
       },
       WonderCommonlib.ImmutableSparseMapService.createEmpty(),
     );