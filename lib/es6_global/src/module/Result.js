

import * as Block from "../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../node_modules/bs-platform/lib/es6/curry.js";

function success(result) {
  return /* Success */Block.__(0, [result]);
}

function fail(result) {
  return /* Fail */Block.__(1, [result]);
}

function either(successFunc, failureFunc, twoTrackInput) {
  if (twoTrackInput.tag) {
    return Curry._1(failureFunc, twoTrackInput[0]);
  } else {
    return Curry._1(successFunc, twoTrackInput[0]);
  }
}

function bind(switchFunc, twoTrackInput) {
  return either(switchFunc, fail, twoTrackInput);
}

function map(oneTrackFunc, twoTrackInput) {
  return either((function (result) {
                return /* Success */Block.__(0, [Curry._1(oneTrackFunc, result)]);
              }), fail, twoTrackInput);
}

function apply(switchFunc, result, addFailureFunc, handleFailAndSuceessFunc, handleSuceessFuncAndFailFunc) {
  if (switchFunc.tag) {
    var f1 = switchFunc[0];
    if (result.tag) {
      return /* Fail */Block.__(1, [Curry._2(addFailureFunc, f1, result[0])]);
    } else {
      return /* Fail */Block.__(1, [Curry._2(handleFailAndSuceessFunc, f1, result[0])]);
    }
  } else {
    var func = switchFunc[0];
    if (result.tag) {
      return /* Fail */Block.__(1, [Curry._2(handleSuceessFuncAndFailFunc, func, result[0])]);
    } else {
      return /* Success */Block.__(0, [Curry._1(func, result[0])]);
    }
  }
}

var Result = /* module */[
  /* success */success,
  /* fail */fail,
  /* either */either,
  /* bind */bind,
  /* map */map,
  /* apply */apply
];

function MakeSameDataResult(Item) {
  var success = Item[/* success */0];
  var fail = Item[/* fail */1];
  var apply = Item[/* apply */3];
  var getData = function (result) {
    if (result.tag) {
      return result[0][1];
    } else {
      return result[0];
    }
  };
  var either = function (handleDataFunc, twoTrackInput) {
    return Curry._3(Item[/* either */2], handleDataFunc, (function (param) {
                  return Curry._1(fail, /* tuple */[
                              param[0],
                              getData(Curry._1(handleDataFunc, param[1]))
                            ]);
                }), twoTrackInput);
  };
  var handleError = function (successFunc, failFunc, result) {
    if (result.tag) {
      var match = result[0];
      return Curry._2(failFunc, match[0], match[1]);
    } else {
      return Curry._1(successFunc, result[0]);
    }
  };
  return /* module */[
          /* success */success,
          /* fail */fail,
          /* apply */apply,
          /* getData */getData,
          /* either */either,
          /* handleError */handleError
        ];
}

function getData(result) {
  if (result.tag) {
    return result[0][1];
  } else {
    return result[0];
  }
}

function either$1(handleDataFunc, twoTrackInput) {
  return either(handleDataFunc, (function (param) {
                return /* Fail */Block.__(1, [/* tuple */[
                            param[0],
                            getData(Curry._1(handleDataFunc, param[1]))
                          ]]);
              }), twoTrackInput);
}

function handleError(successFunc, failFunc, result) {
  if (result.tag) {
    var match = result[0];
    return Curry._2(failFunc, match[0], match[1]);
  } else {
    return Curry._1(successFunc, result[0]);
  }
}

var SameDataResult = /* module */[
  /* success */success,
  /* fail */fail,
  /* apply */apply,
  /* getData */getData,
  /* either */either$1,
  /* handleError */handleError
];

function MakeRelationResult(Item) {
  var success = function (param) {
    return Curry._1(Item[/* success */0], /* () */0);
  };
  var fail = Item[/* fail */1];
  var isSuccess = function (result) {
    if (result.tag) {
      return false;
    } else {
      return true;
    }
  };
  var handleError = function (handleFailFunc, result) {
    if (result.tag) {
      return Curry._1(handleFailFunc, result[0]);
    } else {
      return /* () */0;
    }
  };
  return /* module */[
          /* success */success,
          /* fail */fail,
          /* isSuccess */isSuccess,
          /* handleError */handleError
        ];
}

function success$1(param) {
  return /* Success */Block.__(0, [/* () */0]);
}

function isSuccess(result) {
  if (result.tag) {
    return false;
  } else {
    return true;
  }
}

function handleError$1(handleFailFunc, result) {
  if (result.tag) {
    return Curry._1(handleFailFunc, result[0]);
  } else {
    return /* () */0;
  }
}

var RelationResult = /* module */[
  /* success */success$1,
  /* fail */fail,
  /* isSuccess */isSuccess,
  /* handleError */handleError$1
];

export {
  Result ,
  MakeSameDataResult ,
  SameDataResult ,
  MakeRelationResult ,
  RelationResult ,
  
}
/* No side effect */
