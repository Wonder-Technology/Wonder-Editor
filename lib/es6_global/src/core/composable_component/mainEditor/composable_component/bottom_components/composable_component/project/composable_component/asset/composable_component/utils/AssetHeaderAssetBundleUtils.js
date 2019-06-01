

import * as Log$WonderLog from "../../../../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";

function getAssetBundleTypeByExtname(extname) {
  switch (extname) {
    case ".rab" : 
        return /* RAB */0;
    case ".sab" : 
        return /* SAB */1;
    case ".wab" : 
        return /* WAB */2;
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_getAssetBundleTypeByExtname", "unknown extName: " + (String(extname) + ""), "", "", ""));
  }
}

export {
  getAssetBundleTypeByExtname ,
  
}
/* Log-WonderLog Not a pure module */
