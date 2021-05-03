

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as DomExtend$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/external/DomExtend.js";

function changeInput(inputRegEx, $$event) {
  var inputVal = $$event.target.value;
  switch (inputVal) {
    case "" : 
        return /* Change */[""];
    case "-" : 
        return /* Change */["-"];
    default:
      var match = inputRegEx.test(inputVal);
      if (match) {
        return /* Change */[inputVal];
      } else {
        return /* Change */[undefined];
      }
  }
}

function triggerOnChange(value, param) {
  var onChangeFunc = param[1];
  if (onChangeFunc !== undefined) {
    return Curry._1(onChangeFunc, Curry._1(param[0], value));
  } else {
    return /* () */0;
  }
}

function triggerOnBlur(value, param) {
  var onBlurFunc = param[1];
  if (onBlurFunc !== undefined) {
    return Curry._1(onBlurFunc, Curry._1(param[0], value));
  } else {
    return /* () */0;
  }
}

function handleDragStart($$event, dragStartType, send) {
  DomExtend$Wonderjs.requestPointerLock($$event.target);
  return Curry._1(send, dragStartType);
}

export {
  changeInput ,
  triggerOnChange ,
  triggerOnBlur ,
  handleDragStart ,
  
}
/* No side effect */
