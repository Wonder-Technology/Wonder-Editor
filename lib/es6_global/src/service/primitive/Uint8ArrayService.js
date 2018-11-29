

import * as Js_primitive from "../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";

function _judge(start, end_, uint8Array1, uint8Array2) {
  var isEqual = true;
  for(var i = start; i <= end_; ++i){
    var match = isEqual === false;
    if (!match) {
      isEqual = uint8Array1[i] === uint8Array2[i];
    }
    
  }
  return isEqual;
}

function _judgeUint8ArrayData(uint8Array1, uint8Array2) {
  var byteLength = uint8Array1.byteLength;
  var match = byteLength <= 50;
  if (match) {
    return _judge(0, byteLength - 1 | 0, uint8Array1, uint8Array2);
  } else if (_judge(0, 10, uint8Array1, uint8Array2) && _judge((byteLength / 2 | 0) - 5 | 0, (byteLength / 2 | 0) + 5 | 0, uint8Array1, uint8Array2)) {
    return _judge(byteLength - 11 | 0, byteLength - 1 | 0, uint8Array1, uint8Array2);
  } else {
    return false;
  }
}

function isUint8ArrayEqual(uint8Array1, uint8Array2) {
  if (uint8Array1 !== undefined) {
    if (uint8Array2 !== undefined) {
      var uint8Array2$1 = Js_primitive.valFromOption(uint8Array2);
      var uint8Array1$1 = Js_primitive.valFromOption(uint8Array1);
      var match = uint8Array1$1.byteLength === uint8Array2$1.byteLength;
      if (match) {
        return _judgeUint8ArrayData(uint8Array1$1, uint8Array2$1);
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return uint8Array2 === undefined;
  }
}

export {
  _judge ,
  _judgeUint8ArrayData ,
  isUint8ArrayEqual ,
  
}
/* No side effect */
