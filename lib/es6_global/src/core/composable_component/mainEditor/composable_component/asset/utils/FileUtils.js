'use strict';

import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";

function convertFileJsObjectToFileInfoRecord(fileObject) {
  return /* record */[
          /* name */fileObject.name,
          /* type_ */fileObject.type,
          /* file */fileObject
        ];
}

function readFileByType(reader, fileInfo) {
  var match = fileInfo[/* type_ */1];
  switch (match) {
    case "application/json" : 
        reader.readAsText(fileInfo[/* file */2]);
        return /* () */0;
    case "image/jpeg" : 
    case "image/png" : 
        reader.readAsDataURL(fileInfo[/* file */2]);
        return /* () */0;
    default:
      return Log$WonderLog.error(Log$WonderLog.buildErrorMessage("readFileByType", "the specific type:" + (String(fileInfo) + " is not find"), "", "", "fileInfo:" + (String(fileInfo) + "")));
  }
}

export {
  convertFileJsObjectToFileInfoRecord ,
  readFileByType                      ,
  
}
/* Log-WonderLog Not a pure module */
