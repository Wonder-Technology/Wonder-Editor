let getFirst = (arr) =>
  switch (arr |> Array.length) {
  | 0 => ExcepetionHandleSystem.throwMessage({j|getFirst:the $arr is empty|j})
  | _ => WonderCommonlib.ArraySystem.unsafeGet(arr, 0)
  };