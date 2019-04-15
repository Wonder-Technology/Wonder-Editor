let getImgSrc = (imageDataIndex, defaultImgPath, editorState) =>
  editorState
  |> ImageDataMapAssetEditorService.unsafeGetData(imageDataIndex)
  |> (
    ({blobObjectURL, base64}: ImageDataType.imageData) =>
      switch (blobObjectURL, base64) {
      | (Some(blobObjectURL), Some(_))
      | (Some(blobObjectURL), None) => blobObjectURL |> Obj.magic
      | (None, Some(base64)) => base64
      | (None, None) => defaultImgPath
      }
  );