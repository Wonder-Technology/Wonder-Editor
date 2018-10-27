open Js.Typed_array;

let writeUint8ArrayToArrayBuffer =
    (uint8ArrayArr, byteOffset, byteLength, dataView) => {
  let byteOffset = ref(byteOffset);

  /* for (i in byteOffset^ to byteOffset^ + byteLength - 1) { */
  for (i in 0 to byteLength - 1) {
    let value = Uint8Array.unsafe_get(uint8ArrayArr, i);

    byteOffset := DataViewUtils.writeUint8_1(. value, byteOffset^, dataView);
  };

  (byteOffset^, uint8ArrayArr, dataView);
};

let writeUint8ArrayToArrayBufferWithEmptyData =
    (
      byteOffset,
      (emptyUint8Data, uint8ArrayAlignedByteLength, uint8Array),
      dataView,
    ) => {
  let resultByteOffset = byteOffset + uint8ArrayAlignedByteLength;
  let byteOffset = ref(byteOffset);
  let uint8ArrayByteLength = uint8Array |> Uint8Array.length;

  for (i in 0 to uint8ArrayAlignedByteLength - 1) {
    let value =
      if (i >= uint8ArrayByteLength) {
        emptyUint8Data;
      } else {
        Uint8Array.unsafe_get(uint8Array, i);
      };

    byteOffset := DataViewUtils.writeUint8_1(. value, byteOffset^, dataView);
  };

  (resultByteOffset, uint8Array, dataView);
};

let writeArrayBufferToArrayBuffer =
    (arrayBuffer, byteOffset, byteLength, dataView) =>
  writeUint8ArrayToArrayBuffer(
    Uint8Array.fromBuffer(arrayBuffer),
    byteOffset,
    byteLength,
    dataView,
  );