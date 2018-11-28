

import * as DataViewUtils$WonderEditor from "../DataViewUtils.js";

function writeUint8ArrayToArrayBufferWithEmptyData(byteOffset, param, dataView) {
  var uint8Array = param[2];
  var uint8ArrayAlignedByteLength = param[1];
  var emptyUint8Data = param[0];
  var resultByteOffset = byteOffset + uint8ArrayAlignedByteLength | 0;
  var byteOffset$1 = byteOffset;
  var uint8ArrayByteLength = uint8Array.length;
  for(var i = 0 ,i_finish = uint8ArrayAlignedByteLength - 1 | 0; i <= i_finish; ++i){
    var value = i >= uint8ArrayByteLength ? emptyUint8Data : uint8Array[i];
    byteOffset$1 = DataViewUtils$WonderEditor.writeUint8_1(value, byteOffset$1, dataView);
  }
  return /* tuple */[
          resultByteOffset,
          uint8Array,
          dataView
        ];
}

var download = function (content,filename,mimeType){
   var blob = null;

  var eleLink = document.createElement('a');
  eleLink.download = filename;
  eleLink.style.display = 'none';

  if (!!!mimeType || mimeType.length === 0) {
      blob = new Blob([content]);
  }
  else {
      blob = new Blob([content], { type: mimeType });
  }

  eleLink.href = URL.createObjectURL(blob);

  document.body.appendChild(eleLink);
  eleLink.click();

  document.body.removeChild(eleLink);

  };

export {
  writeUint8ArrayToArrayBufferWithEmptyData ,
  download ,
  
}
/* No side effect */
