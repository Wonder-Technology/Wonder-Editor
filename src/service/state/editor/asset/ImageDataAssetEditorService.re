let getArrayBuffer = (node, editorState) =>
  BasicSourceTextureImageDataMapAssetEditorService.unsafeGetData(
    TextureNodeAssetService.getImageDataIndex(node),
    editorState,
  )
  |> ImageDataAssetService.getArrayBuffer;