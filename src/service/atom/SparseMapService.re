open WonderCommonlib;

let immutableSet = (key, value, map) =>
  map |> Js.Array.copy |> SparseMapService.set(key, value);

let immutableDeleteVal = (key, map) =>
  map |> Js.Array.copy |> WonderCommonlib.SparseMapService.deleteVal(key);

let isDeleted = item => item |> Obj.magic |> Js.Nullable.test;

let filter = Js.Array.filter;

let find = Js.Array.find;

let map = Js.Array.map;

let includes = Js.Array.includes;

let length = Js.Array.length;

let copy = Js.Array.copy;

let getValidValues = map =>
  map |> Js.Array.filter(value => value |> Obj.magic !== Js.Undefined.empty);

let getValidKeys = map =>
  map
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. arr, value, key) =>
         if (value |> Obj.magic === Js.Undefined.empty) {
           arr;
         } else {
           arr |> Js.Array.push(key) |> ignore;
           arr;
         },
       [||],
     );

let getValidDataArr = map =>
  map
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. arr, value, key) =>
         if (value |> Obj.magic === Js.Undefined.empty) {
           arr;
         } else {
           arr |> Js.Array.push((key, value)) |> ignore;
           arr;
         },
       [||],
     );

let forEachValid = (func, map) =>
  map
  |> WonderCommonlib.ArrayService.forEach((. value) =>
       if (value |> Obj.magic === Js.Undefined.empty) {
         ();
       } else {
         func(. value);
       }
     );

let forEachiValid = (func, map) =>
  map
  |> WonderCommonlib.ArrayService.forEachi((. value, index) =>
       if (value |> Obj.magic === Js.Undefined.empty) {
         ();
       } else {
         func(. value, index);
       }
     );

let reduceValid = (func, initValue, map) =>
  map
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. previousValue, value) =>
         if (value |> Obj.magic === Js.Undefined.empty) {
           previousValue;
         } else {
           func(. previousValue, value);
         },
       initValue,
     );

let reduceiValid = (func, initValue, map) =>
  map
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. previousValue, value, index) =>
         if (value |> Obj.magic === Js.Undefined.empty) {
           previousValue;
         } else {
           func(. previousValue, value, index);
         },
       initValue,
     );

let mergeSparseMaps = mapArr =>
  mapArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. resultMap, map) =>
         map
         |> reduceiValid(
              (. resultMap, value, key) =>
                resultMap |> WonderCommonlib.SparseMapService.set(key, value),
              resultMap,
            ),
       WonderCommonlib.SparseMapService.createEmpty(),
     );