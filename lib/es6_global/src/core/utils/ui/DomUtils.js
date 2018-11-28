

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";

function isSpecificDomChildrenHasTargetDom(targetDom, domArray) {
  var isIncludeTarget = /* record */[/* contents */false];
  var _iterateArrayDom = function (targetDom, domArray, isIncludeTarget) {
    var domLen = domArray.length;
    var match = domArray.length === 0;
    if (match) {
      return isIncludeTarget;
    } else {
      for(var x = 0 ,x_finish = domLen - 1 | 0; x <= x_finish; ++x){
        var match$1 = targetDom === Caml_array.caml_array_get(domArray, x);
        if (match$1) {
          isIncludeTarget[0] = true;
        } else {
          var children = Caml_array.caml_array_get(domArray, x).children;
          _iterateArrayDom(targetDom, children, isIncludeTarget);
        }
      }
      return isIncludeTarget;
    }
  };
  return _iterateArrayDom(targetDom, domArray, isIncludeTarget)[0];
}

export {
  isSpecificDomChildrenHasTargetDom ,
  
}
/* No side effect */
