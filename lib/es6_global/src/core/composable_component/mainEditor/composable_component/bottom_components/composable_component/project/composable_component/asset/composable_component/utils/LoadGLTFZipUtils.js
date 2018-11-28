

import * as Most from "most";
import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_primitive from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Log$WonderLog from "../../../../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Zip$WonderBsJszip from "../../../../../../../../../../../../../../node_modules/wonder-bs-jszip/lib/es6_global/src/zip.js";
import * as MostUtils$Wonderjs from "../../../../../../../../../../../../../../node_modules/wonder.js/lib/es6_global/src/asset/utils/MostUtils.js";
import * as LogUtils$WonderEditor from "../../../../../../../../../../utils/console/LogUtils.js";
import * as ZipObject$WonderBsJszip from "../../../../../../../../../../../../../../node_modules/wonder-bs-jszip/lib/es6_global/src/zipObject.js";
import * as ArrayService$WonderEditor from "../../../../../../../../../../../service/atom/ArrayService.js";
import * as FileNameService$WonderEditor from "../../../../../../../../../../../service/atom/FileNameService.js";
import * as HashMapService$WonderCommonlib from "../../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";

var _convert = function (gltf,outerDataMap,getBaseNameFunc){
        var gltfMimeTypes = {
            'image/png': ['png'],
            'image/jpeg': ['jpg', 'jpeg'],
            'text/plain': ['glsl', 'vert', 'vs', 'frag', 'fs', 'txt'],
            'image/vnd-ms.dds': ['dds']
        };




                var outputBuffers = [];
                var bufferMap = new Map();
                var bufferOffset = 0;









        function isBase64(uri) {
            return uri.length < 5 ? false : uri.substr(0, 5) === "data:";
        }
        function decodeBase64(uri) {
            return fetch(uri).then(function (response) { return response.arrayBuffer(); });
        }
        function dataFromUri(buffer) {
            if (buffer.uri === undefined) {
                return Promise.resolve(undefined);
            } else if (isBase64(buffer.uri)) {
                return decodeBase64(buffer.uri);
            } else {
                /* var filename = buffer.uri.substr(buffer.uri.lastIndexOf('/') + 1); */
                /* return Promise.resolve(fileblobs[filename.toLowerCase()]); */

                var fileName = getBaseNameFunc(buffer.uri);

/* console.log(fileName, outerDataMap); */

                return Promise.resolve(
outerDataMap[fileName]
                );
            }
        }
        function alignedLength(value) {
            var alignValue = 4;
            if (value == 0) {
                return value;
            }
            var multiple = value % alignValue;
            if (multiple === 0) {
                return value;
            }
            return value + (alignValue - multiple);
        }

        function getMimeType(filename) {
            for (var mimeType in gltfMimeTypes) {
                for (var extensionIndex in gltfMimeTypes[mimeType]) {
                    var extension = gltfMimeTypes[mimeType][extensionIndex];
                    if (filename.toLowerCase().endsWith('.' + extension)) {
                        return mimeType;
                    }
                }
            }
            return 'application/octet-stream';
        }








        function processBuffers() {
            var pendingBuffers = gltf.buffers.map(function (buffer, bufferIndex) {
                return dataFromUri(buffer)
                    .then(function (data) {
                        if (data !== undefined) {
                            outputBuffers.push(data);
                        }
                        delete buffer.uri;
                        buffer.byteLength = data.byteLength;
                        bufferMap.set(bufferIndex, bufferOffset);
                        bufferOffset += alignedLength(data.byteLength);
                    });
            });

            return Promise.all(pendingBuffers)
                .then(function () {
                    var bufferIndex = gltf.buffers.length;
                    var images = gltf.images || [];
                    var pendingImages = images.map(function (image) {
                        return dataFromUri(image).then(function (data) {
                            if (data === undefined) {
                                delete image['uri'];
                                return;
                            }
                            var bufferView = {
                                buffer: 0,
                                byteOffset: bufferOffset,
                                byteLength: data.byteLength,
                            };
                            bufferMap.set(bufferIndex, bufferOffset);
                            bufferIndex++;
                            bufferOffset += alignedLength(data.byteLength);
                            var bufferViewIndex = gltf.bufferViews.length;
                            gltf.bufferViews.push(bufferView);
                            outputBuffers.push(data);
                            image['bufferView'] = bufferViewIndex;
                            image['mimeType'] = getMimeType(image.uri);
                            delete image['uri'];
                        });
                    });
                    return Promise.all(pendingImages);
                });
            }


        function fileSave() {
            var Binary = {
                Magic: 0x46546C67
            };

            for (var _i = 0, _a = gltf.bufferViews; _i < _a.length; _i++) {
                var bufferView = _a[_i];
                if (bufferView.byteOffset === undefined) {
                    bufferView.byteOffset = 0;
                }
                else {
                    bufferView.byteOffset = bufferView.byteOffset + bufferMap.get(bufferView.buffer);
                }
                bufferView.buffer = 0;
            }
            var binBufferSize = bufferOffset;
            gltf.buffers = [{
                byteLength: binBufferSize
            }];

            var enc = new TextEncoder();
            var jsonBuffer = enc.encode(JSON.stringify(gltf));
            var jsonAlignedLength = alignedLength(jsonBuffer.length);
            var padding;
            if (jsonAlignedLength !== jsonBuffer.length) {

                padding = jsonAlignedLength - jsonBuffer.length;
            }
            var totalSize = 12 + // file header: magic + version + length
                8 + // json chunk header: json length + type
                jsonAlignedLength +
                8 + // bin chunk header: chunk length + type
                binBufferSize;
            var finalBuffer = new ArrayBuffer(totalSize);
            var dataView = new DataView(finalBuffer);
            var bufIndex = 0;
            dataView.setUint32(bufIndex, Binary.Magic, true);
            bufIndex += 4;
            dataView.setUint32(bufIndex, 2, true);
            bufIndex += 4;
            dataView.setUint32(bufIndex, totalSize, true);
            bufIndex += 4;
            // JSON
            dataView.setUint32(bufIndex, jsonAlignedLength, true);
            bufIndex += 4;
            dataView.setUint32(bufIndex, 0x4E4F534A, true);
            bufIndex += 4;

            for (var j = 0; j < jsonBuffer.length; j++) {
                dataView.setUint8(bufIndex, jsonBuffer[j]);
                bufIndex++;
            }
            if (padding !== undefined) {
                for (var j = 0; j < padding; j++) {
                    dataView.setUint8(bufIndex, 0x20);
                    bufIndex++;
                }
            }

            // BIN
            dataView.setUint32(bufIndex, binBufferSize, true);
            bufIndex += 4;
            dataView.setUint32(bufIndex, 0x004E4942, true);
            bufIndex += 4;
            for (var i = 0; i < outputBuffers.length; i++) {
                var bufoffset = bufIndex + bufferMap.get(i);
                var buf = new Uint8Array(outputBuffers[i]);
                var thisbufindex = bufoffset;
                for (var j = 0; j < buf.byteLength; j++) {
                    dataView.setUint8(thisbufindex, buf[j]);
                    thisbufindex++;
                }
            }

            return finalBuffer;
        }

return processBuffers().then(() => {
    var finalBuffer = fileSave();

                return Promise.resolve(
finalBuffer
                );
})
  };

function convertGLTFToGLB(jsZipBlob, createJsZipFunc) {
  var gltfJson = /* record */[/* contents */undefined];
  var outerDataMap = HashMapService$WonderCommonlib.createEmpty(/* () */0);
  return Most.drain(Most.flatMap((function (zip) {
                      var streamArr = /* array */[];
                      Zip$WonderBsJszip.forEach(zip, (function (relativePath, zipEntry) {
                              var extName = FileNameService$WonderEditor.getExtName(relativePath);
                              if (extName === "") {
                                return /* () */0;
                              } else {
                                var exit = 0;
                                switch (extName) {
                                  case ".gltf" : 
                                      ArrayService$WonderEditor.push(Most.fromPromise(ZipObject$WonderBsJszip.asyncString(zipEntry, undefined, /* () */0).then((function (content) {
                                                      gltfJson[0] = Js_primitive.some(JSON.parse(content));
                                                      return Promise.resolve(/* () */0);
                                                    }))), streamArr);
                                      return /* () */0;
                                  case ".bin" : 
                                  case ".jpeg" : 
                                  case ".jpg" : 
                                  case ".png" : 
                                      exit = 1;
                                      break;
                                  case ".dds" : 
                                  case ".wav" : 
                                      return Log$WonderLog.fatal(LogUtils$WonderEditor.buildFatalMessage("shouldn\'t has unsupport gltf data file", "", "", ""));
                                  default:
                                    return /* () */0;
                                }
                                if (exit === 1) {
                                  ArrayService$WonderEditor.push(Most.fromPromise(ZipObject$WonderBsJszip.asyncUint8(zipEntry, undefined, /* () */0).then((function (content) {
                                                  HashMapService$WonderCommonlib.set(FileNameService$WonderEditor.getBaseName(relativePath), content.buffer, outerDataMap);
                                                  return Promise.resolve(/* () */0);
                                                }))), streamArr);
                                  return /* () */0;
                                }
                                
                              }
                            }));
                      return MostUtils$Wonderjs.concatArray(streamArr);
                    }), Most.fromPromise(Zip$WonderBsJszip.loadAsync(Curry._1(createJsZipFunc, /* () */0), undefined, /* `blob */[
                            -1055310499,
                            jsZipBlob
                          ])))).then((function () {
                var match = gltfJson[0];
                if (match !== undefined) {
                  return _convert(Js_primitive.valFromOption(match), outerDataMap, FileNameService$WonderEditor.getBaseName);
                } else {
                  return Log$WonderLog.fatal(LogUtils$WonderEditor.buildFatalMessage("gltf file should exist", "", "", ""));
                }
              }));
}

export {
  _convert ,
  convertGLTFToGLB ,
  
}
/* most Not a pure module */
