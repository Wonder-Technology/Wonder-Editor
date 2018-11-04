open Js.Typed_array;

let _writeHeader = (jsonByteLength, bufferAlignedByteLength, dataView) =>
  dataView
  |> DataViewUtils.writeUint32_1(jsonByteLength, 0)
  |> DataViewUtils.writeUint32_1(bufferAlignedByteLength, _, dataView);

let _getEmptyEncodedUint8Data = () => {
  let encoder = TextEncoder.newTextEncoder();
  let emptyUint8DataArr = encoder |> TextEncoder.encodeUint8Array(" ");

  Uint8Array.unsafe_get(emptyUint8DataArr, 0);
};

let _writeJson =
    (
      byteOffset,
      (emptyEncodedUint8Data, jsonAlignedByteLength, jsonUint8Array),
      dataView,
    ) =>
  HeaderExportUtils.writeUint8ArrayToArrayBufferWithEmptyData(
    byteOffset,
    (emptyEncodedUint8Data, jsonAlignedByteLength, jsonUint8Array),
    dataView,
  );

let _writeBuffer =
    (
      headerAndJsonAlignedByteOffset,
      (imageBufferViewArr, wdbBufferViewArr),
      imageUint8ArrayArr,
      wdbArrayBufferArr,
      dataView,
    ) => {
  let dataView =
    imageBufferViewArr
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           dataView,
           {byteOffset, byteLength}: ExportAssetType.bufferView,
           index,
         ) => {
           let imageUint8Array = Array.unsafe_get(imageUint8ArrayArr, index);

           let (_, _, dataView) =
             HeaderExportUtils.writeUint8ArrayToArrayBuffer(
               imageUint8Array,
               headerAndJsonAlignedByteOffset + byteOffset,
               byteLength,
               dataView,
             );

           dataView;
         },
         dataView,
       );

  let dataView =
    wdbBufferViewArr
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           dataView,
           {byteOffset, byteLength}: ExportAssetType.bufferView,
           index,
         ) => {
           let wdbArrayBuffer = Array.unsafe_get(wdbArrayBufferArr, index);

           let (_, _, dataView) =
             HeaderExportUtils.writeArrayBufferToArrayBuffer(
               wdbArrayBuffer,
               headerAndJsonAlignedByteOffset + byteOffset,
               byteLength,
               dataView,
             );

           dataView;
         },
         dataView,
       );

  dataView;
};

let generateASB = (editorState, engineState) => {
  let (
    (imageArr, textureArr, basicMaterialArr, lightMaterialArr, wdbArr),
    (imageBufferViewArr, wdbBufferViewArr),
    (imageUint8ArrayArr, wdbArrayBufferArr),
    bufferTotalAlignedByteLength,
  ) =
    BuildJsonDataUtils.buildJsonData(editorState, engineState);

  let jsonUint8Array =
    BuildJsonDataUtils.buildJsonUint8Array(
      bufferTotalAlignedByteLength,
      (
        Js.Array.concat(wdbBufferViewArr, imageBufferViewArr),
        imageArr,
        textureArr,
        basicMaterialArr,
        lightMaterialArr,
        wdbArr,
      ),
    );

  let jsonByteLength = jsonUint8Array |> Uint8Array.byteLength;

  let jsonAlignedByteLength = jsonByteLength |> BufferUtils.alignedLength;

  let totalByteLength =
    ASBUtils.getHeaderTotalByteLength()
    + jsonAlignedByteLength
    + bufferTotalAlignedByteLength;

  let asb = ArrayBuffer.make(totalByteLength);
  let dataView = DataViewUtils.create(asb);

  let byteOffset =
    _writeHeader(jsonByteLength, bufferTotalAlignedByteLength, dataView);

  let emptyEncodedUint8Data = _getEmptyEncodedUint8Data();

  let (byteOffset, _, dataView) =
    _writeJson(
      byteOffset,
      (emptyEncodedUint8Data, jsonAlignedByteLength, jsonUint8Array),
      dataView,
    );

  let dataView =
    _writeBuffer(
      byteOffset,
      (imageBufferViewArr, wdbBufferViewArr),
      imageUint8ArrayArr,
      wdbArrayBufferArr,
      dataView,
    );

  asb;
};