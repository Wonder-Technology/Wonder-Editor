let getValidDataArr = map =>
  map
  |> WonderCommonlib.ImmutableSparseMapService.reduceiValid(
       (. arr, value, key) => {
         arr |> Js.Array.push((key, value)) |> ignore;
         arr;
       },
       [||],
     );

let find = (func, map) =>
  Js.Array.find(
    func,
    map |> WonderCommonlib.SparseMapType.arrayNullableToArrayNotNullable,
  );