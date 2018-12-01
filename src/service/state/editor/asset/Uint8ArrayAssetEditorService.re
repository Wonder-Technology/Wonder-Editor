let buildImageUint8ArrayMap = editorState =>
  editorState
  |> TextureNodeMapAssetEditorService.getValidValues
  |> SparseMapService.reduce(
       (. map, {textureComponent, image}: AssetNodeType.textureResultType) => {
         let {mimeType, uint8Array}: AssetNodeType.imageResultType =
           ImageNodeMapAssetEditorService.unsafeGetResult(image, editorState);

         switch (uint8Array) {
         | Some(uint8Array) =>
           map
           |> WonderCommonlib.SparseMapService.set(
                textureComponent,
                (mimeType, uint8Array),
              )
         | None => map
         };
       },
       WonderCommonlib.SparseMapService.createEmpty(),
     );