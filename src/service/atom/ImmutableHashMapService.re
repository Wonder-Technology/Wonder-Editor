let fromArray = arr =>
  arr
  |> Js.Dict.fromArray
  |> WonderCommonlib.HashMapType.dictNotNullableToDictNullable;