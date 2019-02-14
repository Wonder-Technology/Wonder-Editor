open Wonderjs;

let unsafeGet = OptionService.unsafeGet;

let unsafeGetJsonSerializedValue = OptionService.unsafeGetJsonSerializedValue;

let isJsonSerializedValueNone = OptionService.isJsonSerializedValueNone;

let join = x =>
  switch (x) {
  | None => None
  | Some(x) => x
  };

let andThenWithDefault = (func, default, x) =>
  switch (x) {
  | None => default
  | Some(x) => func(x)
  };

let either = (someFunc, noneFunc, data, x) =>
  switch (x) {
  | None => noneFunc(data)
  | Some(x) => someFunc(data, x)
  };

let eitherWithNoData = (someFunc, noneFunc, x) =>
  switch (x) {
  | None => noneFunc()
  | Some(x) => someFunc(x)
  };

let handleSomeAndIgnore = (func, x) =>
  switch (x) {
  | None => ()
  | Some(x) => func(x) |> ignore
  };