let buildImageUint8ArrayMap = editorState =>
  OperateTreeAssetEditorService.findAllTextureNodes(editorState)
  |> OptionService.andThenWithDefault(
       textureNodes =>
         textureNodes
         |> List.fold_left(
              (map, textureNode) => {
                let {textureComponent, imageDataIndex}: NodeAssetType.textureNodeData =
                  TextureNodeAssetService.getNodeData(textureNode);

                let {uint8Array, mimeType}: ImageDataType.imageData =
                  ImageDataMapAssetEditorService.unsafeGetData(
                    imageDataIndex,
                    editorState,
                  );

                uint8Array
                |> OptionService.andThenWithDefault(
                     uint8Array =>
                       map
                       |> WonderCommonlib.SparseMapService.set(
                            textureComponent,
                            (mimeType, uint8Array),
                          ),
                     map,
                   );
              },
              WonderCommonlib.SparseMapService.createEmpty(),
            ),
       WonderCommonlib.SparseMapService.createEmpty(),
     );