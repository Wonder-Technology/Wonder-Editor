open Js.Typed_array;

let _writeHeader =
    (totalByteLength, sceneWDBByteLength, asbByteLength, dataView) =>
  dataView
  |> DataViewUtils.writeUint32_1(totalByteLength, 0)
  |> DataViewUtils.writeUint32_1(sceneWDBByteLength, _, dataView)
  |> DataViewUtils.writeUint32_1(asbByteLength, _, dataView);

let generateWPK = (sceneWDB, asb) => {
  let headerTotalByteLength = 8;

  let sceneWDBByteLength = sceneWDB |> ArrayBuffer.byteLength;

  let asbByteLength = asb |> ArrayBuffer.byteLength;

  let sceneWDBAlignedByteLength =
    sceneWDBByteLength |> BufferUtils.alignedLength;

  let asbAlignedByteLength = asbByteLength |> BufferUtils.alignedLength;

  let totalByteLength =
    headerTotalByteLength + sceneWDBAlignedByteLength + asbAlignedByteLength;

  let wpk = ArrayBuffer.make(totalByteLength);
  let dataView = DataViewUtils.create(wpk);

  let byteOffset =
    _writeHeader(
      totalByteLength,
      sceneWDBByteLength,
      asbByteLength,
      dataView,
    );

  let (byteOffset, _, dataView) =
    HeaderExportUtils.writeArrayBufferToArrayBuffer(
      sceneWDB,
      byteOffset,
      sceneWDBByteLength,
      dataView,
    );

  let (byteOffset, _, dataView) =
    HeaderExportUtils.writeArrayBufferToArrayBuffer(
      asb,
      byteOffset,
      sceneWDBByteLength,
      dataView,
    );

  wpk;
};