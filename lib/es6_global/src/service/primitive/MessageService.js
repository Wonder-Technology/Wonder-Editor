

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_obj from "../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Timeout$WonderEditor from "../../core/external/Timeout.js";
import * as DomHelper$WonderEditor from "../../core/external/DomHelper.js";
import * as StateEditorService$WonderEditor from "../state/editor/StateEditorService.js";
import * as MessageArrayUIEditorService$WonderEditor from "../state/editor/ui/MessageArrayUIEditorService.js";

function getMessageId(id) {
  return "message-" + String(id);
}

function getMessageClassName(param) {
  return "message-item";
}

function getMessageIcon(type_) {
  switch (type_) {
    case 0 : 
        return "./public/img/log.png";
    case 1 : 
        return "./public/img/info.png";
    case 2 : 
        return "./public/img/error.png";
    case 3 : 
        return "./public/img/warn.png";
    
  }
}

function buildMessage(id, type_, info, time) {
  return /* record */[
          /* id */id,
          /* type_ */type_,
          /* info */info,
          /* time */time,
          /* isActive */true
        ];
}

function addMessageIntoSpecificDom(message) {
  var div = document.createElement("div");
  var info = message[/* info */2];
  var imgSrc = getMessageIcon(message[/* type_ */1]);
  DomHelper$WonderEditor.innerHtml(div, " <img src=" + (String(imgSrc) + (" />\n    <span>" + (String(info) + "</span>"))));
  DomHelper$WonderEditor.setAttribute(div, "id", "message-" + String(message[/* id */0]));
  DomHelper$WonderEditor.setAttribute(div, "class", "message-item");
  DomHelper$WonderEditor.appendChild(document.getElementById("appMessage"), div);
  return message;
}

function showMessageWithinTime(message) {
  return Curry._2(Timeout$WonderEditor.$$setTimeout, (function (param) {
                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                return StateEditorService$WonderEditor.setState(MessageArrayUIEditorService$WonderEditor.setMessageArray(MessageArrayUIEditorService$WonderEditor.getMessageArray(editorState).map((function (item) {
                                      var match = Caml_obj.caml_equal(item, message);
                                      if (match) {
                                        return /* record */[
                                                /* id */message[/* id */0],
                                                /* type_ */message[/* type_ */1],
                                                /* info */message[/* info */2],
                                                /* time */message[/* time */3],
                                                /* isActive */false
                                              ];
                                      } else {
                                        return item;
                                      }
                                    })), editorState));
              }), message[/* time */3]);
}

export {
  getMessageId ,
  getMessageClassName ,
  getMessageIcon ,
  buildMessage ,
  addMessageIntoSpecificDom ,
  showMessageWithinTime ,
  
}
/* Timeout-WonderEditor Not a pure module */
