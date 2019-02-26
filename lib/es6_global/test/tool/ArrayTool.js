

import * as FloatService$WonderEditor from "../../src/service/atom/FloatService.js";

function truncate(digit, array) {
  return array.map((function (value) {
                return FloatService$WonderEditor.truncateFloatValue(value, digit);
              }));
}

export {
  truncate ,
  
}
/* No side effect */
