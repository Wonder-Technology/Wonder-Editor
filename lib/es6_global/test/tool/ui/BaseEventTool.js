


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
          preventDefault: (function (param) {
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
          preventDefault: (function (param) {
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
          preventDefault: (function (param) {
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
          preventDefault: (function (param) {
              return /* () */0;
            })
        };
}

function buildOneTextureFileEvent($staropt$star, $staropt$star$1, param) {
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
          preventDefault: (function (param) {
              return /* () */0;
            })
        };
}

function buildFileEvent($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
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
          preventDefault: (function (param) {
              return /* () */0;
            })
        };
}

function buildDragEvent (){
  var dataMap = {};

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

export {
  buildFormEvent ,
  buildWDBFileEvent ,
  buildPackageFileEvent ,
  buildGLBFileEvent ,
  buildGLTFZipFileEvent ,
  buildOneTextureFileEvent ,
  buildFileEvent ,
  buildDragEvent ,
  
}
/* No side effect */
