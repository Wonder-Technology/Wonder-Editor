

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as OptionService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/OptionService.js";

function join(x) {
  if (x !== undefined) {
    return Caml_option.valFromOption(x);
  }
  
}

function andThenWithDefault(func, $$default, x) {
  if (x !== undefined) {
    return Curry._1(func, Caml_option.valFromOption(x));
  } else {
    return $$default;
  }
}

function either(someFunc, noneFunc, data, x) {
  if (x !== undefined) {
    return Curry._2(someFunc, data, Caml_option.valFromOption(x));
  } else {
    return Curry._1(noneFunc, data);
  }
}

function eitherWithNoData(someFunc, noneFunc, x) {
  if (x !== undefined) {
    return Curry._1(someFunc, Caml_option.valFromOption(x));
  } else {
    return Curry._1(noneFunc, /* () */0);
  }
}

function handleSomeAndIgnore(func, x) {
  if (x !== undefined) {
    Curry._1(func, Caml_option.valFromOption(x));
    return /* () */0;
  } else {
    return /* () */0;
  }
}

var unsafeGet = OptionService$Wonderjs.unsafeGet;

var unsafeGetJsonSerializedValue = OptionService$Wonderjs.unsafeGetJsonSerializedValue;

var isJsonSerializedValueNone = OptionService$Wonderjs.isJsonSerializedValueNone;

export {
  unsafeGet ,
  unsafeGetJsonSerializedValue ,
  isJsonSerializedValueNone ,
  join ,
  andThenWithDefault ,
  either ,
  eitherWithNoData ,
  handleSomeAndIgnore ,
  
}
/* OptionService-Wonderjs Not a pure module */
