open EditorType;

let getMap = editorState => editorState.assetRecord.cubemapTextureImageDataMap;

let setMap = (map, editorState) => {
  ...editorState,
  assetRecord: {
    ...editorState.assetRecord,
    cubemapTextureImageDataMap: map,
  },
};

let clearMap = editorState => {
  ...editorState,
  assetRecord: {
    ...editorState.assetRecord,
    cubemapTextureImageDataMap:
      WonderCommonlib.ImmutableSparseMapService.createEmpty(),
  },
};

let getData = (index, editorState) =>
  CubemapTextureImageDataMapAssetService.getData(
    index,
    editorState.assetRecord,
  );

let unsafeGetData = (index, editorState) =>
  CubemapTextureImageDataMapAssetService.unsafeGetData(
    index,
    editorState.assetRecord,
  );

let setData = (index, data, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> CubemapTextureImageDataMapAssetService.setData(index, data),
};

let setPXImageData = (index, data, editorState) => {
  ...editorState,
  assetRecord:
    CubemapTextureImageDataMapAssetService.setPXImageData(
      index,
      data,
      editorState.assetRecord,
    ),
};

let setNXImageData = (index, data, editorState) => {
  ...editorState,
  assetRecord:
    CubemapTextureImageDataMapAssetService.setNXImageData(
      index,
      data,
      editorState.assetRecord,
    ),
};

let setPYImageData = (index, data, editorState) => {
  ...editorState,
  assetRecord:
    CubemapTextureImageDataMapAssetService.setPYImageData(
      index,
      data,
      editorState.assetRecord,
    ),
};

let setNYImageData = (index, data, editorState) => {
  ...editorState,
  assetRecord:
    CubemapTextureImageDataMapAssetService.setNYImageData(
      index,
      data,
      editorState.assetRecord,
    ),
};

let setPZImageData = (index, data, editorState) => {
  ...editorState,
  assetRecord:
    CubemapTextureImageDataMapAssetService.setPZImageData(
      index,
      data,
      editorState.assetRecord,
    ),
};

let setNZImageData = (index, data, editorState) => {
  ...editorState,
  assetRecord:
    CubemapTextureImageDataMapAssetService.setNZImageData(
      index,
      data,
      editorState.assetRecord,
    ),
};

let removeData = (index, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> CubemapTextureImageDataMapAssetService.removeData(index),
};

let addEmptyData = editorState => {
  let (editorState, newImageDataIndex) =
    IndexAssetEditorService.generateCubemapTextureImageDataMapIndex(
      editorState,
    );

  (
    editorState
    |> setData(
         newImageDataIndex,
         {
           pxImageData: None,
           nxImageData: None,
           pyImageData: None,
           nyImageData: None,
           pzImageData: None,
           nzImageData: None,
         },
       ),
    newImageDataIndex,
  );
};

let addDataWithCubemapTextureImageUint8ArrayData =
    (
      (
        pxImageName,
        nxImageName,
        pyImageName,
        nyImageName,
        pzImageName,
        nzImageName,
      ),
      {
        pxImageUint8ArrayData,
        nxImageUint8ArrayData,
        pyImageUint8ArrayData,
        nyImageUint8ArrayData,
        pzImageUint8ArrayData,
        nzImageUint8ArrayData,
      }: ImageDataType.cubemapTextureImageUint8ArrayData,
      editorState,
    ) => {
  let (editorState, newImageDataIndex) =
    IndexAssetEditorService.generateCubemapTextureImageDataMapIndex(
      editorState,
    );

  let (pxMimeType, pxImageUint8Array) = pxImageUint8ArrayData;
  let (nxMimeType, nxImageUint8Array) = nxImageUint8ArrayData;
  let (pyMimeType, pyImageUint8Array) = pyImageUint8ArrayData;
  let (nyMimeType, nyImageUint8Array) = nyImageUint8ArrayData;
  let (pzMimeType, pzImageUint8Array) = pzImageUint8ArrayData;
  let (nzMimeType, nzImageUint8Array) = nzImageUint8ArrayData;

  (
    editorState
    |> setData(
         newImageDataIndex,
         {
           pxImageData:
             CubemapTextureImageDataMapAssetService.buildImageData(
               ~base64=None,
               ~uint8Array=Some(pxImageUint8Array),
               ~name=pxImageName,
               ~mimeType=pxMimeType,
               ~blobObjectURL=None,
               (),
             )
             ->Some,
           nxImageData:
             CubemapTextureImageDataMapAssetService.buildImageData(
               ~base64=None,
               ~uint8Array=Some(nxImageUint8Array),
               ~name=nxImageName,
               ~mimeType=nxMimeType,
               ~blobObjectURL=None,
               (),
             )
             ->Some,
           pyImageData:
             CubemapTextureImageDataMapAssetService.buildImageData(
               ~base64=None,
               ~uint8Array=Some(pyImageUint8Array),
               ~name=pyImageName,
               ~mimeType=pyMimeType,
               ~blobObjectURL=None,
               (),
             )
             ->Some,
           nyImageData:
             CubemapTextureImageDataMapAssetService.buildImageData(
               ~base64=None,
               ~uint8Array=Some(nyImageUint8Array),
               ~name=nyImageName,
               ~mimeType=nyMimeType,
               ~blobObjectURL=None,
               (),
             )
             ->Some,
           pzImageData:
             CubemapTextureImageDataMapAssetService.buildImageData(
               ~base64=None,
               ~uint8Array=Some(pzImageUint8Array),
               ~name=pzImageName,
               ~mimeType=pzMimeType,
               ~blobObjectURL=None,
               (),
             )
             ->Some,
           nzImageData:
             CubemapTextureImageDataMapAssetService.buildImageData(
               ~base64=None,
               ~uint8Array=Some(nzImageUint8Array),
               ~name=nzImageName,
               ~mimeType=nzMimeType,
               ~blobObjectURL=None,
               (),
             )
             ->Some,
         },
       ),
    newImageDataIndex,
  );
};