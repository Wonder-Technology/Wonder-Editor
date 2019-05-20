let create = () => [||];

let range = (a: int, b: int) => {
  let result = WonderCommonlib.ArrayService.createEmpty();
  for (i in a to b) {
    Js.Array.push(i, result) |> ignore;
  };
  result;
};

let unsafeGetFirst = arr =>
  WonderCommonlib.ArrayService.unsafeGet(arr, 0)
  |> WonderLog.Contract.ensureCheck(
       r =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|first array element exist|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 r |> assertNullableExist
               )
             )
           )
         ),
       StateEditorService.getStateIsDebug(),
     );

let getFirst = arr =>
  WonderCommonlib.ArrayService.unsafeGet(arr, 0) |> Js.toOption;

let unsafeGetLast = arr =>
  arr
  |> Js.Array.length
  |> (len => len - 1)
  |> WonderCommonlib.ArrayService.unsafeGet(arr)
  |> WonderLog.Contract.ensureCheck(
       r =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|last array element exist|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 r |> assertNullableExist
               )
             )
           )
         ),
       StateEditorService.getStateIsDebug(),
     );

let getLast = arr =>
  arr
  |> Js.Array.length
  |> (len => len - 1)
  |> WonderCommonlib.ArrayService.unsafeGet(arr)
  |> Js.toOption;

let removeLast = arr => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|array length should >= 1|j},
                ~actual={j|not|j},
              ),
              () =>
              arr |> Js.Array.length >= 1
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );
  arr |> Js.Array.pop |> OptionService.unsafeGet;
};

let removeFirst = arr => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|array length should >= 1|j},
                ~actual={j|not|j},
              ),
              () =>
              arr |> Js.Array.length >= 1
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  (arr |> Js.Array.shift |> OptionService.unsafeGet, arr);
};

let unsafeGetNth = (index, arr) =>
  WonderCommonlib.ArrayService.unsafeGet(arr, index)
  |> WonderLog.Contract.ensureCheck(
       r =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|array[$index] element exist|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 r |> assertNullableExist
               )
             )
           )
         ),
       StateEditorService.getStateIsDebug(),
     );

let hasItem = arr => arr |> Js.Array.length > 0;

let unshift = (item, arr) => {
  arr |> Js.Array.unshift(item) |> ignore;
  arr;
};

let push = (item, arr) => {
  arr |> Js.Array.push(item) |> ignore;
  arr;
};

let pushMany = (itemArr, arr) =>
  itemArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. arr, item) => arr |> push(item),
       arr,
     );

let hasItemByFunc = (func, arr) => arr |> Js.Array.filter(func) |> hasItem;

let removeDuplicateItems = (buildKeyFunc, arr) => {
  open WonderCommonlib;

  let resultArr = [||];
  let map = MutableHashMapService.createEmpty();

  for (i in 0 to Js.Array.length(arr) - 1) {
    let item = Array.unsafe_get(arr, i);
    let key = buildKeyFunc(. item);

    switch (MutableHashMapService.get(key, map)) {
    | None =>
      Js.Array.push(item, resultArr) |> ignore;
      MutableHashMapService.set(key, item, map) |> ignore;
    | Some(_) => ()
    };
  };

  resultArr;
};

let exclude = (excludeArr, arr) =>
  arr |> Js.Array.filter(value => !(excludeArr |> Js.Array.includes(value)));

let excludeWithFunc = (excludeArr, isNeedExcludeFunc, arr) =>
  arr |> Js.Array.filter(value => !isNeedExcludeFunc(excludeArr, value));

let intersect = (arr1, arr2) =>
  arr1 |> Js.Array.filter(value => arr2 |> Js.Array.includes(value));

let hasIntersect = (arr1, arr2) =>
  intersect(arr1, arr2) |> Js.Array.length > 0;

let hasExclude = (excludeArr, arr) =>
  exclude(excludeArr, arr) |> Js.Array.length > 0;

let fastConcat = (arr1, arr2) =>
  arr2
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. arr1, value2) => arr1 |> push(value2),
       arr1,
     );

let _fastConcatArrays = (firstArr, remainArr) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|length >= 1|j},
                ~actual={j|not|j},
              ),
              () =>
              Js.Array.length(remainArr) >= 0
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  remainArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. arr1, arr) => fastConcat(arr1, arr),
       firstArr,
     );
};

let fastMutableConcatArrays = arrayArrays =>
  _fastConcatArrays(
    unsafeGetFirst(arrayArrays),
    arrayArrays |> Js.Array.sliceFrom(1),
  );

let fastImmutableConcatArrays = arrayArrays =>
  _fastConcatArrays(
    unsafeGetFirst(arrayArrays) |> Js.Array.copy,
    arrayArrays |> Js.Array.sliceFrom(1),
  );

let isEqual = (arr1, arr2) =>
  arr1 |> Js.Array.sortInPlace == (arr2 |> Js.Array.sortInPlace);

let isInclude = (sourceArr, targetArr) =>
  targetArr
  |> Js.Array.filter(value => !(sourceArr |> Js.Array.includes(value)))
  |> Js.Array.length === 0;

let _addFailureFunc = ((msg1, value1), (msg2, value2)) => (
  msg1,
  value1(value2),
);

let _handleFailAndSuceessFunc = ((msg, value1), s) => (msg, value1(s));

let _handleSuceessFuncAndFailFunc = (func, (msg2, value2)) => (
  msg2,
  func(value2),
);

let traverseSameDataResultAndCollectByApply = (traverseFunc, arr) => {
  let applyFunc =
    Result.SameDataResult.apply(
      ~addFailureFunc=_addFailureFunc,
      ~handleFailAndSuceessFunc=_handleFailAndSuceessFunc,
      ~handleSuceessFuncAndFailFunc=_handleSuceessFuncAndFailFunc,
    );
  let returnFunc = Result.SameDataResult.success;

  arr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. resultArr, value) =>
         applyFunc(
           ~switchFunc=returnFunc(push),
           ~result=traverseFunc(value),
         )
         |> applyFunc(~switchFunc=_, ~result=resultArr),
       returnFunc([||]),
     );
};