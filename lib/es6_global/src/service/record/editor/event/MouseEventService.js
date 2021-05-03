

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

function _replaceExceptionMovementDeltaToZero(movementDelta) {
  var match = Math.abs(movementDelta[0]) > 500 || Math.abs(movementDelta[1]) > 500;
  if (match) {
    return /* tuple */[
            0,
            0
          ];
  } else {
    return movementDelta;
  }
}

function getMovementDeltaWhenPointerLockedAndFixBug(mouseDomEvent) {
  return _replaceExceptionMovementDeltaToZero(HandleMouseEventMainService$Wonderjs._getMovementDeltaWhenPointerLocked(mouseDomEvent));
}

export {
  _getMouseButton ,
  isLeftMouseButton ,
  isRightMouseButton ,
  _replaceExceptionMovementDeltaToZero ,
  getMovementDeltaWhenPointerLockedAndFixBug ,
  
}
/* OptionService-WonderEditor Not a pure module */
