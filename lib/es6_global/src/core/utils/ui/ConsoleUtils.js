

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as LogUtils$WonderEditor from "../console/LogUtils.js";
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
              LogUtils$WonderEditor.warn
            ]);
}

function log(message, editorState) {
  return _console(message, editorState, /* tuple */[
              (function (messageObj) {
                  return messageObj.log(message, 4);
                }),
              LogUtils$WonderEditor.log
            ]);
}

function info(message, editorState) {
  return _console(message, editorState, /* tuple */[
              (function (messageObj) {
                  return messageObj.info(message, 4);
                }),
              LogUtils$WonderEditor.info
            ]);
}

function debug(buildMessageFunc, isDebug, editorState) {
  var match = DebugSettingEditorService$WonderEditor.isNotShowMessage(editorState);
  if (!match) {
    var messageObj = Index.default;
    messageObj.info(Curry._1(buildMessageFunc, /* () */0), 4);
  }
  return LogUtils$WonderEditor.debug(buildMessageFunc, isDebug);
}

function error(message, editorState) {
  return _console(message, editorState, /* tuple */[
              (function (messageObj) {
                  return messageObj.error(message, 4);
                }),
              LogUtils$WonderEditor.error
            ]);
}

var logStack = LogUtils$WonderEditor.logStr;

export {
  _console ,
  warn ,
  log ,
  info ,
  debug ,
  error ,
  logStack ,
  
}
/* LogUtils-WonderEditor Not a pure module */
