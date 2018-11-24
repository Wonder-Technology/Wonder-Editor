open Js.Typed_array;

let _buildHeaderArrayBuffer = (sceneWDBByteLength, asbByteLength) =>
  Uint32Array.make([|
    Copyright.getWPKVersion(Copyright.getVersion()),
    sceneWDBByteLength,
    asbByteLength,
  |])
  |> Uint32Array.buffer;

let generateWPK = (sceneWDB, asb) => {
  let sceneWDBByteLength = sceneWDB |> ArrayBuffer.byteLength;

  let asbByteLength = asb |> ArrayBuffer.byteLength;

  let sceneWDBAlignedByteLength =
    sceneWDBByteLength |> BufferUtils.alignedLength;

  let asbAlignedByteLength = asbByteLength |> BufferUtils.alignedLength;

  let headerArrayBuffer =
    _buildHeaderArrayBuffer(sceneWDBByteLength, asbByteLength);

  let headerTotalByteLength = headerArrayBuffer |> ArrayBuffer.byteLength;

  let totalByteLength =
    headerTotalByteLength + sceneWDBAlignedByteLength + asbAlignedByteLength;

  let wpkUint8Array = Uint8Array.fromLength(totalByteLength);

  let wpkUint8Array =
    BufferUtils.mergeArrayBuffer(wpkUint8Array, headerArrayBuffer, 0);
  let wpkUint8Array =
    BufferUtils.mergeArrayBuffer(
      wpkUint8Array,
      sceneWDB,
      headerTotalByteLength,
    );
  let wpkUint8Array =
    BufferUtils.mergeArrayBuffer(
      wpkUint8Array,
      asb,
      headerTotalByteLength + sceneWDBAlignedByteLength,
    );

  wpkUint8Array |> Uint8Array.buffer;
};