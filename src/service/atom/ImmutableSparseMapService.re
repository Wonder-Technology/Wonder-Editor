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

let filterValid = (func, map) =>
  map
  |> Js.Array.filter(value =>
       WonderCommonlib.NullService.isInMap(value)
       && func(. value |> WonderCommonlib.SparseMapType.nullableToNotNullable)
     );
/* |> WonderCommonlib.SparseMapType.arrayNullableToArrayNotNullable; */