open Contract;

let getFirst = (arr) => {
  requireCheck(
    () =>
      test(
        {j|arrary:first element should exist|j},
        () => WonderCommonlib.ArraySystem.get(0, arr) |> assertExist
      )
  );
  WonderCommonlib.ArraySystem.unsafeGet(arr, 0)
};

/* let getLast = (arr) => {
  requireCheck(
    () =>
      test(
        {j|arrary:array length should >= 1|j},
        () => Contract.Operators.(arr |> Js.Array.length >= 1)
      )
  );
  let length = arr |> Js.Array.length;
  WonderCommonlib.ArraySystem.unsafeGet(arr, length - 1)
}; */