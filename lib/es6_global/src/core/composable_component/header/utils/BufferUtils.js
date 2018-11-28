

import * as BufferUtils$Wonderjs from "../../../../../../../node_modules/wonder.js/lib/es6_global/src/asset/utils/BufferUtils.js";

function alignedLength(value) {
  if (value !== 0) {
    var multiple = value % 4;
    if (multiple !== 0) {
      return value + (4 - multiple | 0) | 0;
    } else {
      return value;
    }
  } else {
    return value;
  }
}

var convertBase64ToUint8Array = function (dataURI){
    var BASE64_MARKER = ';base64,';

    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for(var i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
    };

function mergeArrayBuffer(sourceUint8Array, targetArrayBuffer, offset) {
  return BufferUtils$Wonderjs.mergeUint8Array(sourceUint8Array, new Uint8Array(targetArrayBuffer), offset);
}

var mergeUint8Array = BufferUtils$Wonderjs.mergeUint8Array;

export {
  alignedLength ,
  convertBase64ToUint8Array ,
  mergeUint8Array ,
  mergeArrayBuffer ,
  
}
/* BufferUtils-Wonderjs Not a pure module */
