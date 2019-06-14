let getImgSrc = (imageDataIndex, editorState) =>
  editorState
  |> ImageDataMapAssetEditorService.unsafeGetData(imageDataIndex)
  |> (
    ({blobObjectURL, base64}: ImageDataType.imageData) =>
      switch (blobObjectURL, base64) {
      | (Some(blobObjectURL), Some(_))
      | (Some(blobObjectURL), None) => blobObjectURL |> Obj.magic
      | (None, Some(base64)) => base64
      | (None, None) =>
        WonderLog.Log.error(
          WonderLog.Log.buildErrorMessage(
            ~title="getImgSrc",
            ~description={j|blobObjectURL or base64 should exist|j},
            ~reason="",
            ~solution={j||j},
            ~params={j||j},
          ),
        );

        ImageUtils.getNullImageSrc();
      }
  );