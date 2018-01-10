open Contract;

let unSafeGetFirst = (arr) =>
  WonderCommonlib.ArraySystem.unsafeGet(arr, 0)
  |> ensureCheck(
       (r) =>
         test(
           {j|array[0] element should exist|j},
           () => WonderCommonlib.ArraySystem.get(0, arr) |> assertExist
         )
     );

let unSafeGetNth = (index, arr) =>
  WonderCommonlib.ArraySystem.unsafeGet(arr, index)
  |> ensureCheck(
       (r) =>
         test(
           {j|array[$index] element should exist|j},
           () => WonderCommonlib.ArraySystem.get(index, arr) |> assertExist
         )
     );

let push = (item, arr) => {
  arr |> Js.Array.push(item) |> ignore;
  arr
};