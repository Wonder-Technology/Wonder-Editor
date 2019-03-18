

import * as FloatService$WonderEditor from "../../../src/service/atom/FloatService.js";

function truncateRotation(rotation, $staropt$star, param) {
  var digit = $staropt$star !== undefined ? $staropt$star : 3;
  var x = rotation[0];
  return /* tuple */[
          FloatService$WonderEditor.truncateFloatValue(x, digit),
          FloatService$WonderEditor.truncateFloatValue(x, digit),
          FloatService$WonderEditor.truncateFloatValue(rotation[2], digit),
          FloatService$WonderEditor.truncateFloatValue(rotation[3], digit)
        ];
}

export {
  truncateRotation ,
  
}
/* No side effect */
