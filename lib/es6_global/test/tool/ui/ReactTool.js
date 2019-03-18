

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as LogUtils$WonderEditor from "../../../src/core/utils/console/LogUtils.js";
import * as SinonTool$WonderEditor from "../SinonTool.js";

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

function createDispatchFuncStub(sandbox) {
  var stub = Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
  window.dispathFuncStub_wonder_editor = stub;
  return stub;
}

export {
  getUpdateState ,
  isNoUpdate ,
  createDispatchFuncStub ,
  
}
/* Log-WonderLog Not a pure module */
