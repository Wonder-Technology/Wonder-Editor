

import * as Copyright$WonderEditor from "../../../../../Copyright.js";
import * as BufferUtils$WonderEditor from "../BufferUtils.js";

function _buildHeaderArrayBuffer(sceneWDBByteLength, asbByteLength) {
  return new Uint32Array(/* array */[
              Copyright$WonderEditor.getWPKVersion(Copyright$WonderEditor.getVersion(/* () */0)),
              sceneWDBByteLength,
              asbByteLength
            ]).buffer;
}

function generateWPK(sceneWDB, asb) {
  var sceneWDBByteLength = sceneWDB.byteLength;
  var asbByteLength = asb.byteLength;
  var sceneWDBAlignedByteLength = BufferUtils$WonderEditor.alignedLength(sceneWDBByteLength);
  var asbAlignedByteLength = BufferUtils$WonderEditor.alignedLength(asbByteLength);
  var headerArrayBuffer = _buildHeaderArrayBuffer(sceneWDBByteLength, asbByteLength);
  var headerTotalByteLength = headerArrayBuffer.byteLength;
  var totalByteLength = (headerTotalByteLength + sceneWDBAlignedByteLength | 0) + asbAlignedByteLength | 0;
  var wpkUint8Array = new Uint8Array(totalByteLength);
  var wpkUint8Array$1 = BufferUtils$WonderEditor.mergeArrayBuffer(wpkUint8Array, headerArrayBuffer, 0);
  var wpkUint8Array$2 = BufferUtils$WonderEditor.mergeArrayBuffer(wpkUint8Array$1, sceneWDB, headerTotalByteLength);
  return BufferUtils$WonderEditor.mergeArrayBuffer(wpkUint8Array$2, asb, headerTotalByteLength + sceneWDBAlignedByteLength | 0).buffer;
}

export {
  _buildHeaderArrayBuffer ,
  generateWPK ,
  
}
/* BufferUtils-WonderEditor Not a pure module */
