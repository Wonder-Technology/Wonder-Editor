

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as LogUtils$WonderEditor from "../console/LogUtils.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as MessageUIEditorService$WonderEditor from "../../../service/state/editor/ui/MessageUIEditorService.js";
import * as DebugSettingEditorService$WonderEditor from "../../../service/state/editor/setting/DebugSettingEditorService.js";

function _console(message, editorState, param) {
  var match = DebugSettingEditorService$WonderEditor.isNotShowMessage(editorState);
  if (!match) {
    StateEditorService$WonderEditor.setState(Curry._3(param[0], message, 4000, editorState));
  }
  return Curry._1(param[1], message);
}

function warn(message, editorState) {
  return _console(message, editorState, /* tuple */[
              MessageUIEditorService$WonderEditor.warn,
              LogUtils$WonderEditor.warn
            ]);
}

function log(message, editorState) {
  return _console(message, editorState, /* tuple */[
              MessageUIEditorService$WonderEditor.log,
              LogUtils$WonderEditor.log
            ]);
}

function info(message, editorState) {
  return _console(message, editorState, /* tuple */[
              MessageUIEditorService$WonderEditor.info,
              LogUtils$WonderEditor.info
            ]);
}

function debug(buildMessageFunc, isDebug, editorState) {
  return LogUtils$WonderEditor.debug(buildMessageFunc, isDebug);
}

function error(message, editorState) {
  return _console(message, editorState, /* tuple */[
              MessageUIEditorService$WonderEditor.error,
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
