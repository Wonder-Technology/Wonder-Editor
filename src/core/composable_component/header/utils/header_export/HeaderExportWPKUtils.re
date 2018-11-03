open Js.Typed_array;

let _getHeaderTotalByteLength = () => 12;

let _writeHeader = (sceneWDBByteLength, asbByteLength, dataView) =>
  dataView
  |> DataViewUtils.writeUint32_1(
       Copyright.getWPKVersion(Copyright.getVersion()),
       0,
     )
  |> DataViewUtils.writeUint32_1(sceneWDBByteLength, _, dataView)
  |> DataViewUtils.writeUint32_1(asbByteLength, _, dataView);

let generateWPK = (sceneWDB, asb) => {
  let headerTotalByteLength = _getHeaderTotalByteLength();

  let sceneWDBByteLength = sceneWDB |> ArrayBuffer.byteLength;

  let asbByteLength = asb |> ArrayBuffer.byteLength;

  let sceneWDBAlignedByteLength =
    sceneWDBByteLength |> BufferUtils.alignedLength;

  let asbAlignedByteLength = asbByteLength |> BufferUtils.alignedLength;

  let totalByteLength =
    headerTotalByteLength + sceneWDBAlignedByteLength + asbAlignedByteLength;

  let wpk = ArrayBuffer.make(totalByteLength);
  let dataView = DataViewUtils.create(wpk);

  let byteOffset = _writeHeader(sceneWDBByteLength, asbByteLength, dataView);

  let (_, _, dataView) =
    HeaderExportUtils.writeArrayBufferToArrayBuffer(
      sceneWDB,
      headerTotalByteLength,
      sceneWDBByteLength,
      dataView,
    );

  let (_, _, dataView) =
    HeaderExportUtils.writeArrayBufferToArrayBuffer(
      asb,
      headerTotalByteLength + sceneWDBAlignedByteLength,
      asbByteLength,
      dataView,
    );

  wpk;
};