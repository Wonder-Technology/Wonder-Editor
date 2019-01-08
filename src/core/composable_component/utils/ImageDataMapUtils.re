let getImgSrc = (imageDataIndex, editorState) =>
  editorState
  |> ImageDataMapAssetEditorService.unsafeGetData(imageDataIndex)
  |> (
    ({blobObjectURL, base64}: ImageDataType.imageData) =>
      switch (blobObjectURL, base64) {
      | (Some(blobObjectURL), Some(_))
      | (Some(blobObjectURL), None) =>
        blobObjectURL |> Obj.magic |> Result.SameDataResult.success
      | (None, Some(base64)) => base64 |> Result.SameDataResult.success
      | (None, None) =>
        (
          "texture->source should has base64 or blobObjectURL data, but acutally not has",
          ImageUtils.getNullImageSrc(),
        )
        |> Result.SameDataResult.fail
      }
  );