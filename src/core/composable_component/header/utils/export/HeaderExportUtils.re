open Js.Typed_array;

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

let download = [%bs.raw
  (content, filename, mimeType) => {|
   var blob = null;

  var eleLink = document.createElement('a');
  eleLink.download = filename;
  eleLink.style.display = 'none';

  if (!!!mimeType || mimeType.length === 0) {
      blob = new Blob([content]);
  }
  else {
      blob = new Blob([content], { type: mimeType });
  }

  eleLink.href = URL.createObjectURL(blob);

  document.body.appendChild(eleLink);
  eleLink.click();

  document.body.removeChild(eleLink);

  |}
];