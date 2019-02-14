

import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";
import * as HandleMouseEventMainService$Wonderjs from "../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/event/handle/HandleMouseEventMainService.js";

function _getMouseButton(param) {
  return OptionService$WonderEditor.unsafeGet(param[/* userData */4])[/* button */3];
}

function isLeftMouseButton($$event) {
  var match = _getMouseButton($$event);
  return match === 1;
}

function isRightMouseButton($$event) {
  var match = _getMouseButton($$event);
  return match === 2;
}

var getMovementDeltaWhenPointerLocked = HandleMouseEventMainService$Wonderjs._getMovementDeltaWhenPointerLocked;

export {
  _getMouseButton ,
  isLeftMouseButton ,
  isRightMouseButton ,
  getMovementDeltaWhenPointerLocked ,
  
}
/* OptionService-WonderEditor Not a pure module */
