open Js.Typed_array;

let isUint8ArrayEqual = (uint8Array1, uint8Array2) =>
  switch (uint8Array1, uint8Array2) {
  | (None, None) => true
  | (Some(uint8Array1), Some(uint8Array2)) =>
    uint8Array1
    |> Uint8Array.byteLength === (uint8Array2 |> Uint8Array.byteLength) ?
      {
        let byteLength = uint8Array1 |> Uint8Array.byteLength;
        let isEqual = ref(false);

        for (i in 0 to byteLength - 1) {
          isEqual^ === false ?
            () :
            isEqual :=
              Uint8Array.unsafe_get(uint8Array1, i)
              === Uint8Array.unsafe_get(uint8Array2, i);
        };

        isEqual^;
      } :
      false
  };