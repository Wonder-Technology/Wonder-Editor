

import * as ASBUtils$WonderEditor from "../ASBUtils.js";
import * as BufferUtils$WonderEditor from "../BufferUtils.js";
import * as DataViewUtils$WonderEditor from "../DataViewUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as HeaderExportUtils$WonderEditor from "./HeaderExportUtils.js";
import * as BuildJsonDataUtils$WonderEditor from "./BuildJsonDataUtils.js";

function _writeHeader(jsonByteLength, bufferAlignedByteLength, dataView) {
  var __x = DataViewUtils$WonderEditor.writeUint32_1(jsonByteLength, 0, dataView);
  return DataViewUtils$WonderEditor.writeUint32_1(bufferAlignedByteLength, __x, dataView);
}

function _getEmptyEncodedUint8Data() {
  var encoder = new TextEncoder();
  var emptyUint8DataArr = encoder.encode(" ");
  return emptyUint8DataArr[0];
}

function _writeJson(byteOffset, param, dataView) {
  return HeaderExportUtils$WonderEditor.writeUint8ArrayToArrayBufferWithEmptyData(byteOffset, /* tuple */[
              param[0],
              param[1],
              param[2]
            ], dataView);
}

function _writeBuffer(headerAndJsonAlignedByteOffset, param, imageUint8ArrayArr, wdbArrayBufferArr, arrayBuffer) {
  var uint8Array = new Uint8Array(arrayBuffer);
  var uint8Array$1 = ArrayService$WonderCommonlib.reduceOneParami((function (uint8Array, param, index) {
          var imageUint8Array = imageUint8ArrayArr[index];
          return BufferUtils$WonderEditor.mergeUint8Array(uint8Array, imageUint8Array, headerAndJsonAlignedByteOffset + param[/* byteOffset */0] | 0);
        }), uint8Array, param[0]);
  return ArrayService$WonderCommonlib.reduceOneParami((function (uint8Array, param, index) {
                var wdbArrayBuffer = wdbArrayBufferArr[index];
                return BufferUtils$WonderEditor.mergeArrayBuffer(uint8Array, wdbArrayBuffer, headerAndJsonAlignedByteOffset + param[/* byteOffset */0] | 0);
              }), uint8Array$1, param[1]).buffer;
}

function _computeByteLength(bufferTotalAlignedByteLength, jsonUint8Array) {
  var jsonByteLength = jsonUint8Array.byteLength;
  var jsonAlignedByteLength = BufferUtils$WonderEditor.alignedLength(jsonByteLength);
  var totalByteLength = (ASBUtils$WonderEditor.getHeaderTotalByteLength(/* () */0) + jsonAlignedByteLength | 0) + bufferTotalAlignedByteLength | 0;
  return /* tuple */[
          jsonByteLength,
          jsonAlignedByteLength,
          totalByteLength
        ];
}

function generateASB(editorState, engineState) {
  var match = BuildJsonDataUtils$WonderEditor.buildJsonData(editorState, engineState);
  var bufferTotalAlignedByteLength = match[3];
  var match$1 = match[2];
  var match$2 = match[1];
  var wdbBufferViewArr = match$2[1];
  var imageBufferViewArr = match$2[0];
  var match$3 = match[0];
  var jsonUint8Array = BuildJsonDataUtils$WonderEditor.buildJsonUint8Array(bufferTotalAlignedByteLength, /* tuple */[
        imageBufferViewArr.concat(wdbBufferViewArr),
        match$3[0],
        match$3[1],
        match$3[2],
        match$3[3],
        match$3[4]
      ]);
  var match$4 = _computeByteLength(bufferTotalAlignedByteLength, jsonUint8Array);
  var asb = new ArrayBuffer(match$4[2]);
  var dataView = DataViewUtils$WonderEditor.create(asb);
  var byteOffset = _writeHeader(match$4[0], bufferTotalAlignedByteLength, dataView);
  var emptyEncodedUint8Data = _getEmptyEncodedUint8Data(/* () */0);
  var match$5 = _writeJson(byteOffset, /* tuple */[
        emptyEncodedUint8Data,
        match$4[1],
        jsonUint8Array
      ], dataView);
  _writeBuffer(match$5[0], /* tuple */[
        imageBufferViewArr,
        wdbBufferViewArr
      ], match$1[0], match$1[1], match$5[2].buffer);
  return asb;
}

export {
  _writeHeader ,
  _getEmptyEncodedUint8Data ,
  _writeJson ,
  _writeBuffer ,
  _computeByteLength ,
  generateASB ,
  
}
/* BufferUtils-WonderEditor Not a pure module */
