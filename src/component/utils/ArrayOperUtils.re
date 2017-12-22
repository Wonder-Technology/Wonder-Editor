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