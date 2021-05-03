

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Timeout$WonderEditor from "../../../../core/external/Timeout.js";
import * as DomHelper$WonderEditor from "../../../../core/external/DomHelper.js";
import * as ArrayService$WonderEditor from "../../../atom/ArrayService.js";
import * as MessageService$WonderEditor from "../../../primitive/MessageService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as IdUIEditorService$WonderEditor from "./IdUIEditorService.js";
import * as StateEditorService$WonderEditor from "../StateEditorService.js";
import * as IntervalIdUIEditorService$WonderEditor from "./IntervalIdUIEditorService.js";
import * as IsHasMessageUIEditorService$WonderEditor from "./IsHasMessageUIEditorService.js";
import * as MessageArrayUIEditorService$WonderEditor from "./MessageArrayUIEditorService.js";

function removeMessage(message, editorState) {
  var editorState$1 = MessageArrayUIEditorService$WonderEditor.removeMessage(message, editorState);
  DomHelper$WonderEditor.removeChild(document.getElementById("appMessage"), document.getElementById(MessageService$WonderEditor.getMessageId(message[/* id */0])));
  return editorState$1;
}

function endShowMessage(editorState) {
  var editorState$1 = IsHasMessageUIEditorService$WonderEditor.setIsHasMessage(false, editorState);
  Curry._1(Timeout$WonderEditor.$$clearInterval, IntervalIdUIEditorService$WonderEditor.getIntervalId(editorState$1));
  return editorState$1;
}

function startShowMessage(editorState) {
  var intervalId = Curry._2(Timeout$WonderEditor.$$setInterval, (function (param) {
          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
          var messageArray = MessageArrayUIEditorService$WonderEditor.getMessageArray(editorState);
          var match = ArrayService$WonderEditor.hasItem(messageArray);
          return StateEditorService$WonderEditor.setState(match ? ArrayService$WonderCommonlib.reduceOneParam((function (editorState, message) {
                              if (message[/* isActive */4]) {
                                return editorState;
                              } else {
                                return removeMessage(message, editorState);
                              }
                            }), editorState, messageArray) : endShowMessage(editorState));
        }), 1000);
  return IntervalIdUIEditorService$WonderEditor.setIntervalId(intervalId, editorState);
}

function addMessage(message, editorState) {
  var editorState$1 = MessageArrayUIEditorService$WonderEditor.addMessage(message, editorState);
  MessageService$WonderEditor.showMessageWithinTime(MessageService$WonderEditor.addMessageIntoSpecificDom(message));
  var match = IsHasMessageUIEditorService$WonderEditor.getIsHasMessage(editorState$1);
  if (match) {
    return editorState$1;
  } else {
    return startShowMessage(IsHasMessageUIEditorService$WonderEditor.setIsHasMessage(true, editorState$1));
  }
}

function _buildMessageWithMessageType(info, time, type_, editorState) {
  var match = IdUIEditorService$WonderEditor.generateNodeId(editorState);
  return addMessage(MessageService$WonderEditor.buildMessage(match[1], type_, info, time), match[0]);
}

function log(info, time, editorState) {
  return _buildMessageWithMessageType(info, time, /* Log */0, editorState);
}

function warn(info, time, editorState) {
  return _buildMessageWithMessageType(info, time, /* Warn */3, editorState);
}

function error(info, time, editorState) {
  return _buildMessageWithMessageType(info, time, /* Error */2, editorState);
}

function info(info$1, time, editorState) {
  return _buildMessageWithMessageType(info$1, time, /* Info */1, editorState);
}

export {
  removeMessage ,
  endShowMessage ,
  startShowMessage ,
  addMessage ,
  _buildMessageWithMessageType ,
  log ,
  warn ,
  error ,
  info ,
  
}
/* Timeout-WonderEditor Not a pure module */
