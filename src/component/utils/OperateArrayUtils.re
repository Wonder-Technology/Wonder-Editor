let getFirst = (arr) =>
  WonderCommonlib.ArraySystem.unsafeGet(arr, 0)
  |> WonderLog.Contract.ensureCheck(
       (r) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|array[0] element exist|j}, ~actual={j|not|j}),
                 () => r |> assertNullableExist
               )
             )
           )
         ),
       EditorStateDataEdit.getStateIsDebug()
     );

let getNth = (index, arr) =>
  WonderCommonlib.ArraySystem.unsafeGet(arr, index)
  |> WonderLog.Contract.ensureCheck(
       (r) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|array[$index] element exist|j},
                   ~actual={j|not|j}
                 ),
                 () => r |> assertNullableExist
               )
             )
           )
         ),
       EditorStateDataEdit.getStateIsDebug()
     );

let hasItem = (arr) => arr |> Js.Array.length > 0 ? true : false;

let push = (item, arr) => {
  arr |> Js.Array.push(item) |> ignore;
  arr
};