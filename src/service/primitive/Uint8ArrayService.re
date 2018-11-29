open Js.Typed_array;

let _judge = (start, end_, uint8Array1, uint8Array2) => {
  let isEqual = ref(true);

  for (i in start to end_) {
    isEqual^ === false ?
      () :
      isEqual :=
        Uint8Array.unsafe_get(uint8Array1, i)
        === Uint8Array.unsafe_get(uint8Array2, i);
  };

  isEqual^;
};

let _judgeUint8ArrayData = (uint8Array1, uint8Array2) => {
  let byteLength = uint8Array1 |> Uint8Array.byteLength;

  byteLength <= 50 ?
    _judge(0, byteLength - 1, uint8Array1, uint8Array2) :
    _judge(0, 10, uint8Array1, uint8Array2)
    && _judge(
         byteLength / 2 - 5,
         byteLength / 2 + 5,
         uint8Array1,
         uint8Array2,
       )
    && _judge(byteLength - 11, byteLength - 1, uint8Array1, uint8Array2);
};

let isUint8ArrayEqual = (uint8Array1, uint8Array2) =>
  switch (uint8Array1, uint8Array2) {
  | (None, None) => true
  | (Some(uint8Array1), Some(uint8Array2)) =>
    uint8Array1
    |> Uint8Array.byteLength === (uint8Array2 |> Uint8Array.byteLength) ?
      _judgeUint8ArrayData(uint8Array1, uint8Array2) : false
  | _ => false
  };