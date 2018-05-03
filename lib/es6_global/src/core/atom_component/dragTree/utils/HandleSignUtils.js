'use strict';

import * as Curry         from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";

function handleSign(startSign, targetSign, successFunc, failFunc) {
  switch (startSign) {
    case "file" : 
        var match = +(targetSign === "folder");
        if (match !== 0) {
          return Curry._1(successFunc, "fileToFolder");
        } else {
          return Curry._1(failFunc, /* () */0);
        }
    case "folder" : 
        var match$1 = +(targetSign === "folder");
        if (match$1 !== 0) {
          return Curry._1(successFunc, "folderToFolder");
        } else {
          return Curry._1(failFunc, /* () */0);
        }
    case "scene" : 
        var match$2 = +(targetSign === "scene");
        if (match$2 !== 0) {
          return Curry._1(successFunc, /* () */0);
        } else {
          return Curry._1(failFunc, /* () */0);
        }
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("handleSign", "the startSign:" + (String(startSign) + " not exist"), "", "", "startSign:" + (String(startSign) + "")));
  }
}

export {
  handleSign ,
  
}
/* Log-WonderLog Not a pure module */
