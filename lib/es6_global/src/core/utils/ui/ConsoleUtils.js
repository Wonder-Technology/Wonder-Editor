

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Index from "antd/lib/message/index";
import * as DebugSettingEditorService$WonderEditor from "../../../service/state/editor/setting/DebugSettingEditorService.js";

function _console(message, editorState, param) {
  var match = DebugSettingEditorService$WonderEditor.isNotShowMessage(editorState);
  if (!match) {
    Curry._1(param[0], Index.default);
  }
  return Curry._1(param[1], message);
}

function warn(message, editorState) {
  return _console(message, editorState, /* tuple */[
              (function (messageObj) {
                  return messageObj.warn(message, 4);
                }),
              Log$WonderLog.warn
            ]);
}

function log(message, editorState) {
  return _console(message, editorState, /* tuple */[
              (function (messageObj) {
                  return messageObj.log(message, 4);
                }),
              Log$WonderLog.log
            ]);
}

function info(message, editorState) {
  return _console(message, editorState, /* tuple */[
              (function (messageObj) {
                  return messageObj.info(message, 4);
                }),
              Log$WonderLog.info
            ]);
}

function debug(buildMessageFunc, isDebug, editorState) {
  var match = DebugSettingEditorService$WonderEditor.isNotShowMessage(editorState);
  if (!match) {
    var messageObj = Index.default;
    messageObj.info(Curry._1(buildMessageFunc, /* () */0), 4);
  }
  return Log$WonderLog.debug(buildMessageFunc, isDebug);
}

function error(message, editorState) {
  return _console(message, editorState, /* tuple */[
              (function (messageObj) {
                  return messageObj.error(message, 4);
                }),
              Log$WonderLog.error
            ]);
}

var logStack = Log$WonderLog.log;

export {
  _console ,
  warn ,
  log ,
  info ,
  debug ,
  error ,
  logStack ,
  
}
/* Log-WonderLog Not a pure module */
