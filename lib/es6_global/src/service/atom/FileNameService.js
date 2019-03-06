

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";

function getExtName(fileName) {
  var lastIndex = fileName.lastIndexOf(".");
  var match = lastIndex === -1;
  if (match) {
    return "";
  } else {
    return fileName.substring(lastIndex);
  }
}

function getBaseName (fileName){
var base = new String(fileName).substring(fileName.lastIndexOf('/') + 1);
    if(base.lastIndexOf(".") !== -1)
        base = base.substring(0, base.lastIndexOf("."));
   return base;
  };

function _getPathAndFileName(filePath, regex) {
  var match = regex.exec(filePath);
  if (match !== null) {
    return /* tuple */[
            Caml_array.caml_array_get(match, 1),
            Caml_array.caml_array_get(match, 2)
          ];
  } else {
    return /* tuple */[
            filePath,
            ""
          ];
  }
}

function getFolderPathAndFileName(filePath) {
  return _getPathAndFileName(filePath, (/^(.*[\/])?(\w+\.\w+)$/));
}

function getTextureFolderPathAndName(filePath) {
  return _getPathAndFileName(filePath, (/^(.*[\/])?(\w+)$/));
}

function removePathPostfix(filePath) {
  var match = (/^(.*)[\/]$/).exec(filePath);
  if (match !== null) {
    return Caml_array.caml_array_get(match, 1);
  } else {
    return filePath;
  }
}

function buildFileTotalName(baseName, extName) {
  return baseName + extName;
}

export {
  getExtName ,
  getBaseName ,
  _getPathAndFileName ,
  getFolderPathAndFileName ,
  getTextureFolderPathAndName ,
  removePathPostfix ,
  buildFileTotalName ,
  
}
/* No side effect */
