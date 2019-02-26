

import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as TypeUtils$WonderEditor from "../TypeUtils.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";

function _isEmpty(msg) {
  return msg.length === 0;
}

function _isNotEmpty(msg) {
  return msg.length > 0;
}

function _buildMessage(description, reason, solution, params) {
  var message = "";
  var match = description.length > 0 && reason.length === 0 && solution.length === 0 && params.length === 0;
  if (match) {
    return message + description;
  } else {
    var match$1 = description.length > 0;
    var message$1 = match$1 ? message + ("description\n    " + (String(description) + "")) : message;
    var match$2 = reason.length > 0;
    var message$2 = match$2 ? message$1 + ("\n    reason\n    " + (String(reason) + "")) : message$1;
    var match$3 = solution.length > 0;
    var message$3 = match$3 ? message$2 + ("\n    solution\n    " + (String(solution) + "")) : message$2;
    var match$4 = params.length > 0;
    if (match$4) {
      return message$3 + ("\n    params\n    " + (String(params) + ""));
    } else {
      return message$3;
    }
  }
}

var buildFatalMessage = _buildMessage;

var buildErrorMessage = _buildMessage;

function buildDebugMessage(description, params, _) {
  var message = "";
  var match = description.length > 0 && params.length === 0;
  if (match) {
    return message + description;
  } else {
    var match$1 = description.length > 0;
    var message$1 = match$1 ? message + ("description\n    " + (String(description) + "")) : message;
    var match$2 = params.length > 0;
    if (match$2) {
      return message$1 + ("\n    params\n    " + (String(params) + ""));
    } else {
      return message$1;
    }
  }
}

function _stringify(msg) {
  return JSON.stringify(msg);
}

function print(msg) {
  Log$WonderLog.print(JSON.stringify(msg));
  return msg;
}

var printJson = Log$WonderLog.printJson;

function info(msg) {
  return Log$WonderLog.info(JSON.stringify(msg));
}

function warn(msg) {
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("msg be string", "not"), (function () {
                        return Contract$WonderLog.assertTrue(TypeUtils$WonderEditor.isString(msg));
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return Log$WonderLog.warn(msg);
}

var logStr = Log$WonderLog.log;

function log(msg) {
  return Log$WonderLog.log(JSON.stringify(msg));
}

function logVar(msg) {
  return Log$WonderLog.logVar(JSON.stringify(msg));
}

var logJson = Log$WonderLog.logJson;

var debug = Log$WonderLog.debug;

var error = Log$WonderLog.error;

var fatal = Log$WonderLog.fatal;

export {
  _isEmpty ,
  _isNotEmpty ,
  _buildMessage ,
  buildFatalMessage ,
  buildErrorMessage ,
  buildDebugMessage ,
  _stringify ,
  print ,
  printJson ,
  info ,
  warn ,
  logStr ,
  log ,
  logVar ,
  logJson ,
  debug ,
  error ,
  fatal ,
  
}
/* Log-WonderLog Not a pure module */
