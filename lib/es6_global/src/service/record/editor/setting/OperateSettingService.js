

import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";

function setSetting(param) {
  var redoUndo = param[/* redoUndo */1];
  var debug = param[/* debug */0];
  return /* record */[
          /* debug */debug !== undefined ? debug : undefined,
          /* redoUndo */redoUndo !== undefined ? redoUndo : undefined
        ];
}

function unsafeGetIsDebug(param) {
  return OptionService$WonderEditor.unsafeGet(param[/* debug */0])[/* isDebug */0];
}

function unsafeGetMaxStackSize(param) {
  return OptionService$WonderEditor.unsafeGet(param[/* redoUndo */1])[/* maxStackSize */0];
}

function isShowMessage(param) {
  return OptionService$WonderEditor.unsafeGet(param[/* debug */0])[/* showMessage */1];
}

function setIsShowMessage(isShowMessage, record) {
  var init = OptionService$WonderEditor.unsafeGet(record[/* debug */0]);
  return /* record */[
          /* debug *//* record */[
            /* isDebug */init[/* isDebug */0],
            /* showMessage */isShowMessage
          ],
          /* redoUndo */record[/* redoUndo */1]
        ];
}

export {
  setSetting ,
  unsafeGetIsDebug ,
  unsafeGetMaxStackSize ,
  isShowMessage ,
  setIsShowMessage ,
  
}
/* OptionService-WonderEditor Not a pure module */
