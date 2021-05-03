

import * as HashMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";

function buildFormEvent(value) {
  return {
          target: {
            value: value,
            checked: value
          }
        };
}

function buildWDBFileEvent(fileName, arrayBuffer) {
  return {
          target: {
            files: {
              "0": {
                name: fileName + ".wdb",
                file: arrayBuffer
              }
            }
          },
          preventDefault: (function () {
              return /* () */0;
            })
        };
}

function buildPackageFileEvent(fileName, wpk) {
  return {
          target: {
            files: {
              "0": {
                name: fileName + ".wpk",
                file: wpk
              }
            }
          },
          preventDefault: (function () {
              return /* () */0;
            })
        };
}

function buildGLBFileEvent(fileName, arrayBuffer) {
  return {
          target: {
            files: {
              "0": {
                name: fileName + ".glb",
                file: arrayBuffer
              }
            }
          },
          preventDefault: (function () {
              return /* () */0;
            })
        };
}

function buildGLTFZipFileEvent(fileName) {
  return {
          target: {
            files: {
              "0": {
                name: fileName + ".zip",
                file: -1
              }
            }
          },
          preventDefault: (function () {
              return /* () */0;
            })
        };
}

function buildOneTextureFileEvent($staropt$star, $staropt$star$1, _) {
  var imgName = $staropt$star !== undefined ? $staropt$star : "loadImg.png";
  var imgSrc = $staropt$star$1 !== undefined ? $staropt$star$1 : "newImgBase64";
  return {
          target: {
            files: {
              "0": {
                name: imgName,
                file: imgSrc
              }
            }
          },
          preventDefault: (function () {
              return /* () */0;
            })
        };
}

function buildFileEvent($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, _) {
  var imgName = $staropt$star !== undefined ? $staropt$star : "loadImg.png";
  var imgSrc = $staropt$star$1 !== undefined ? $staropt$star$1 : "newImgBase64";
  var jsonName = $staropt$star$2 !== undefined ? $staropt$star$2 : "loadJson";
  var jsonResult = $staropt$star$3 !== undefined ? $staropt$star$3 : "loadJson string result";
  return {
          target: {
            files: {
              "0": {
                name: imgName,
                file: imgSrc
              },
              "1": {
                name: jsonName + ".json",
                file: jsonResult
              }
            }
          },
          preventDefault: (function () {
              return /* () */0;
            })
        };
}

var buildDragEventWithDataMap = function (dataMap){
  return {
stopPropagation: () => undefined,
preventDefault: () => undefined,
dataTransfer: {
  effectAllowed: "move",
  dropEffect: "move",
  setDragImage: (image, value1, value2) => undefined,
  setData: (key, value) => {
    dataMap[key] = value;
  },
  getData: (key) => {
    return dataMap[key]
  }
}
  }
  };

function buildDragEvent() {
  return buildDragEventWithDataMap(HashMapService$WonderCommonlib.createEmpty(/* () */0));
}

export {
  buildFormEvent ,
  buildWDBFileEvent ,
  buildPackageFileEvent ,
  buildGLBFileEvent ,
  buildGLTFZipFileEvent ,
  buildOneTextureFileEvent ,
  buildFileEvent ,
  buildDragEventWithDataMap ,
  buildDragEvent ,
  
}
/* HashMapService-WonderCommonlib Not a pure module */
