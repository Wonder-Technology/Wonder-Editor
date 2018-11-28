

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Index from "antd/lib/message/index";
import * as DebugSettingEditorService$WonderEditor from "../../../service/state/editor/setting/DebugSettingEditorService.js";

function warn(message, editorState) {
  var match = DebugSettingEditorService$WonderEditor.isNotShowMessage(editorState);
  if (!match) {
    var messageObj = Index.default;
    messageObj.warn(message, 4);
  }
  return Log$WonderLog.warn(message);
}

function log(message, editorState) {
  var match = DebugSettingEditorService$WonderEditor.isNotShowMessage(editorState);
  if (!match) {
    var messageObj = Index.default;
    messageObj.log(message, 4);
  }
  return Log$WonderLog.log(message);
}

function info(message, editorState) {
  var match = DebugSettingEditorService$WonderEditor.isNotShowMessage(editorState);
  if (!match) {
    var messageObj = Index.default;
    messageObj.info(message, 4);
  }
  return Log$WonderLog.info(message);
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
  var match = DebugSettingEditorService$WonderEditor.isNotShowMessage(editorState);
  if (!match) {
    var messageObj = Index.default;
    messageObj.error(message, 4);
  }
  return Log$WonderLog.error(message);
}

var logStack = Log$WonderLog.log;

export {
  warn ,
  log ,
  info ,
  debug ,
  error ,
  logStack ,
  
}
/* Log-WonderLog Not a pure module */
