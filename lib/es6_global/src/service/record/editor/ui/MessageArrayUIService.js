

import * as Caml_obj from "../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ArrayService$WonderEditor from "../../../atom/ArrayService.js";

function getMessageArray(uiRecord) {
  return uiRecord[/* messageArray */3];
}

function setMessageArray(messageArray, uiRecord) {
  return /* record */[
          /* messageIndex */uiRecord[/* messageIndex */0],
          /* intervalId */uiRecord[/* intervalId */1],
          /* isHasMessage */uiRecord[/* isHasMessage */2],
          /* messageArray */messageArray
        ];
}

function addMessage(message, uiRecord) {
  return /* record */[
          /* messageIndex */uiRecord[/* messageIndex */0],
          /* intervalId */uiRecord[/* intervalId */1],
          /* isHasMessage */uiRecord[/* isHasMessage */2],
          /* messageArray */ArrayService$WonderEditor.push(message, uiRecord[/* messageArray */3])
        ];
}

function removeMessage(message, uiRecord) {
  return /* record */[
          /* messageIndex */uiRecord[/* messageIndex */0],
          /* intervalId */uiRecord[/* intervalId */1],
          /* isHasMessage */uiRecord[/* isHasMessage */2],
          /* messageArray */uiRecord[/* messageArray */3].filter((function (item) {
                  return Caml_obj.caml_notequal(item, message);
                }))
        ];
}

export {
  getMessageArray ,
  setMessageArray ,
  addMessage ,
  removeMessage ,
  
}
/* ArrayService-WonderEditor Not a pure module */
