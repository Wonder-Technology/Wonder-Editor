

import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as LogUtils$WonderEditor from "../../../src/core/utils/console/LogUtils.js";

function getUpdateState(reducerResult) {
  if (typeof reducerResult === "number") {
    return Log$WonderLog.fatal(LogUtils$WonderEditor.buildFatalMessage("", "", "", ""));
  } else if (reducerResult.tag) {
    return Log$WonderLog.fatal(LogUtils$WonderEditor.buildFatalMessage("", "", "", ""));
  } else {
    return reducerResult[0];
  }
}

function isNoUpdate(reducerResult) {
  if (typeof reducerResult === "number") {
    return true;
  } else {
    return false;
  }
}

export {
  getUpdateState ,
  isNoUpdate ,
  
}
/* Log-WonderLog Not a pure module */
