open Js.Typed_array;

let writeUint8ArrayToArrayBuffer =
    (uint8ArrayArr, byteOffset, byteLength, dataView) => {
  let byteOffset = ref(byteOffset);

  for (i in byteOffset^ to byteOffset^ + byteLength - 1) {
    let value = Uint8Array.unsafe_get(uint8ArrayArr, i);

    byteOffset := DataViewUtils.writeUint8_1(. value, byteOffset^, dataView);
  };

  (byteOffset^, uint8ArrayArr, dataView);
};

let writeArrayBufferToArrayBuffer =
    (wdbArrayBuffer, byteOffset, byteLength, dataView) =>
  writeUint8ArrayToArrayBuffer(
    Uint8Array.fromBuffer(wdbArrayBuffer),
    byteOffset,
    byteLength,
    dataView,
  );