

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as LogUtils$WonderEditor from "../console/LogUtils.js";

function _console(message, editorState, param) {
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
