open Js.Typed_array;

let alignedLength = (value: int) : int =>
  switch (value) {
  | 0 => value
  | value =>
    let alignValue = 4;
    switch (value mod alignValue) {
    | 0 => value
    | multiple => value + (alignValue - multiple)
    };
  };

let convertBase64ToUint8Array = [%raw
  dataURI => {|
    var BASE64_MARKER = ';base64,';

    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for(var i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
    |}
];

let convertUint8ArrayToBase64 = [%raw
  (uint8Array, mimeType) => {|
var imageStr = btoa(
          uint8Array
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        return "data:" + mimeType + ";base64," + imageStr;
  |}
];

let copyUint8ArrayToArrayBuffer =
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