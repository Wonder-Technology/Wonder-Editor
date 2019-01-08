open Js.Typed_array;

let getMaxScaleOnAxis = matTypeArr => {
  let scaleXSq =
    Float32Array.unsafe_get(matTypeArr, 0)
    *. Float32Array.unsafe_get(matTypeArr, 0)
    +. Float32Array.unsafe_get(matTypeArr, 1)
    *. Float32Array.unsafe_get(matTypeArr, 1)
    +. Float32Array.unsafe_get(matTypeArr, 2)
    *. Float32Array.unsafe_get(matTypeArr, 2);

  let scaleYSq =
    Float32Array.unsafe_get(matTypeArr, 4)
    *. Float32Array.unsafe_get(matTypeArr, 4)
    +. Float32Array.unsafe_get(matTypeArr, 5)
    *. Float32Array.unsafe_get(matTypeArr, 5)
    +. Float32Array.unsafe_get(matTypeArr, 6)
    *. Float32Array.unsafe_get(matTypeArr, 6);

  let scaleZSq =
    Float32Array.unsafe_get(matTypeArr, 8)
    *. Float32Array.unsafe_get(matTypeArr, 8)
    +. Float32Array.unsafe_get(matTypeArr, 9)
    *. Float32Array.unsafe_get(matTypeArr, 9)
    +. Float32Array.unsafe_get(matTypeArr, 10)
    *. Float32Array.unsafe_get(matTypeArr, 10);

  Js.Math.maxMany_float([|scaleXSq, scaleYSq, scaleZSq|]) |> Js.Math.sqrt;
};