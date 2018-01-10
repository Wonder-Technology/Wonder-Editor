open Contract;

/* TODO rename to unsafeGetXxx when use unsafeGet inside */
let getFirst = (arr) => {
  requireCheck(
    () =>
      test(
        {j|array[0] element should exist|j},
        () => WonderCommonlib.ArraySystem.get(0, arr) |> assertExist
      )
  );
  WonderCommonlib.ArraySystem.unsafeGet(arr, 0)
  /* TODO use ensureCheck instead of requireCheck when use unsafeGet */
};

let getNth = (index, arr) => {
  WonderCommonlib.ArraySystem.unsafeGet(arr, index)|>
  ensureCheck(
    (r) =>
      test(
        {j|array[$index] element should exist|j},
        () => WonderCommonlib.ArraySystem.get(index, arr) |> assertExist
      )
  );
};

/* let getLast = (arr) => {
  requireCheck(
    () =>
      test(
        {j|array:array length should >= 1|j},
        () => Contract.Operators.(arr |> Js.Array.length >= 1)
      )
  );
  let length = arr |> Js.Array.length;
  WonderCommonlib.ArraySystem.unsafeGet(arr, length - 1)
}; */

let push = (item, arr) => {
  arr |> Js.Array.push(item)|>ignore;
  arr
}