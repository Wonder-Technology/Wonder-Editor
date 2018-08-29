

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ValueService$WonderEditor from "../../../../../../../../../../../../service/atom/ValueService.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as PointLightEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/PointLightEngineService.js";
import * as PointLightRangeBlurEventHandler$WonderEditor from "../ui/eventHandler/PointLightRangeBlurEventHandler.js";
import * as PointLightLinearBlurEventHandler$WonderEditor from "../ui/eventHandler/PointLightLinearBlurEventHandler.js";
import * as PointLightConstantBlurEventHandler$WonderEditor from "../ui/eventHandler/PointLightConstantBlurEventHandler.js";
import * as PointLightIntensityBlurEventHandler$WonderEditor from "../ui/eventHandler/PointLightIntensityBlurEventHandler.js";
import * as PointLightQuadraticBlurEventHandler$WonderEditor from "../ui/eventHandler/PointLightQuadraticBlurEventHandler.js";

function blurIntensityEvent(param, lightComponent, intensity) {
  var match = ValueService$WonderEditor.isValueEqual(/* Float */1, intensity, StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
              return PointLightEngineService$WonderEditor.getPointLightIntensity(lightComponent, param);
            })));
  if (match) {
    return /* () */0;
  } else {
    return Curry._3(PointLightIntensityBlurEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1], /* tuple */[
                param[0],
                param[1]
              ], lightComponent, intensity);
  }
}

function changeIntensity(lightComponent, value) {
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[lightComponent],
                /* type_ : PointLight */7
              ]], (function (param, param$1) {
                return PointLightEngineService$WonderEditor.setPointLightIntensity(value, param, param$1);
              }));
}

function blurConstantEvent(param, lightComponent, constant) {
  var match = ValueService$WonderEditor.isValueEqual(/* Float */1, constant, StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
              return PointLightEngineService$WonderEditor.getPointLightConstant(lightComponent, param);
            })));
  if (match) {
    return /* () */0;
  } else {
    return Curry._3(PointLightConstantBlurEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1], /* tuple */[
                param[0],
                param[1]
              ], lightComponent, constant);
  }
}

function changeConstant(lightComponent, value) {
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[lightComponent],
                /* type_ : PointLight */7
              ]], (function (param, param$1) {
                return PointLightEngineService$WonderEditor.setPointLightConstant(value, param, param$1);
              }));
}

function blurLinearEvent(param, lightComponent, linear) {
  var match = ValueService$WonderEditor.isValueEqual(/* Float */1, linear, StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
              return PointLightEngineService$WonderEditor.getPointLightLinear(lightComponent, param);
            })));
  if (match) {
    return /* () */0;
  } else {
    return Curry._3(PointLightLinearBlurEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1], /* tuple */[
                param[0],
                param[1]
              ], lightComponent, linear);
  }
}

function changeLinear(lightComponent, value) {
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[lightComponent],
                /* type_ : PointLight */7
              ]], (function (param, param$1) {
                return PointLightEngineService$WonderEditor.setPointLightLinear(value, param, param$1);
              }));
}

function blurQuadraticEvent(param, lightComponent, quadratic) {
  var match = ValueService$WonderEditor.isValueEqual(/* Float */1, quadratic, StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
              return PointLightEngineService$WonderEditor.getPointLightQuadratic(lightComponent, param);
            })));
  if (match) {
    return /* () */0;
  } else {
    return Curry._3(PointLightQuadraticBlurEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1], /* tuple */[
                param[0],
                param[1]
              ], lightComponent, quadratic);
  }
}

function changeQuadratic(lightComponent, value) {
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[lightComponent],
                /* type_ : PointLight */7
              ]], (function (param, param$1) {
                return PointLightEngineService$WonderEditor.setPointLightQuadratic(value, param, param$1);
              }));
}

function blurRangeEvent(param, lightComponent, range) {
  var match = ValueService$WonderEditor.isValueEqual(/* Float */1, range, StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
              return PointLightEngineService$WonderEditor.getPointLightRange(lightComponent, param);
            })));
  if (match) {
    return /* () */0;
  } else {
    return Curry._3(PointLightRangeBlurEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1], /* tuple */[
                param[0],
                param[1]
              ], lightComponent, range);
  }
}

function changeRange(lightComponent, value) {
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[lightComponent],
                /* type_ : PointLight */7
              ]], (function (param, param$1) {
                return PointLightEngineService$WonderEditor.setPointLightRange(value, param, param$1);
              }));
}

export {
  blurIntensityEvent ,
  changeIntensity ,
  blurConstantEvent ,
  changeConstant ,
  blurLinearEvent ,
  changeLinear ,
  blurQuadraticEvent ,
  changeQuadratic ,
  blurRangeEvent ,
  changeRange ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
