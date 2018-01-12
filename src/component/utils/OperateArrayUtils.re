open Contract;

let getFirst = (arr) =>
  WonderCommonlib.ArraySystem.unsafeGet(arr, 0)
  |> ensureCheck((r) => test({j|array[0] element should exist|j}, () => r |> assertNullableExist));

let getNth = (index, arr) =>
  WonderCommonlib.ArraySystem.unsafeGet(arr, index)
  |> ensureCheck(
       (r) => test({j|array[$index] element should exist|j}, () => r |> assertNullableExist)
     );

let hasItem = (arr) => arr |> Js.Array.length > 0 ? true : false;

let push = (item, arr) => {
  arr |> Js.Array.push(item) |> ignore;
  arr
};