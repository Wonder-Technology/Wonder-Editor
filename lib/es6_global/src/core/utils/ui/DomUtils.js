

import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function _iterateArrayDom(targetDom, domArray, isIncludeTarget) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (isIncludeTarget, dom) {
                var match = isIncludeTarget || targetDom === dom === true;
                if (match) {
                  return true;
                } else {
                  var children = dom.children;
                  return _iterateArrayDom(targetDom, children, isIncludeTarget);
                }
              }), isIncludeTarget, domArray);
}

function isSpecificDomChildrenHasTargetDom(targetDom, domArray) {
  return _iterateArrayDom(targetDom, domArray, false);
}

export {
  _iterateArrayDom ,
  isSpecificDomChildrenHasTargetDom ,
  
}
/* No side effect */
