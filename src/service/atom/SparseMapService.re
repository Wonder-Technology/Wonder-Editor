open WonderCommonlib;

let immutableSet = (key, value, map) => map |> Js.Array.copy |> SparseMapService.set(key, value);