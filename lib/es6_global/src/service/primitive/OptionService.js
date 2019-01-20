

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_primitive from "../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as OptionService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/OptionService.js";

function join(x) {
  if (x !== undefined) {
    return Js_primitive.valFromOption(x);
  }
  
}

function andThenWithDefault(func, $$default, x) {
  if (x !== undefined) {
    return Curry._1(func, Js_primitive.valFromOption(x));
  } else {
    return $$default;
  }
}

function either(someFunc, noneFunc, data, x) {
  if (x !== undefined) {
    return Curry._2(someFunc, data, Js_primitive.valFromOption(x));
  } else {
    return Curry._1(noneFunc, data);
  }
}

function eitherWithNoData(someFunc, noneFunc, x) {
  if (x !== undefined) {
    return Curry._1(someFunc, Js_primitive.valFromOption(x));
  } else {
    return Curry._1(noneFunc, /* () */0);
  }
}

function handleSomeAndIgnore(func, x) {
  if (x !== undefined) {
    Curry._1(func, Js_primitive.valFromOption(x));
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
