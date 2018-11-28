

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Color$WonderEditor from "../../../../../../../../../../../external/Color.js";
import * as ColorType$WonderEditor from "../../../../../../../../../../../external/type/ColorType.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as PickColorComponent$WonderEditor from "../../../../../../../atom_component/PickColorComponent/ui/PickColorComponent.js";
import * as PointLightEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/PointLightEngineService.js";
import * as MainEditorPointLightUtils$WonderEditor from "../utils/MainEditorPointLightUtils.js";
import * as MainEditorFloatInputBaseComponent$WonderEditor from "../../../../../atom_component/FloatInputBaseComponent/MainEditorFloatInputBaseComponent.js";
import * as PointLightCloseColorPickEventHandler$WonderEditor from "./eventHandler/PointLightCloseColorPickEventHandler.js";

var component = ReasonReact.statelessComponent("MainEditorPointLight");

function getColor(lightComponent, _) {
  return Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                    return PointLightEngineService$WonderEditor.getPointLightColor(lightComponent, param);
                  })));
}

function changeColor(lightComponent, value) {
  var __x = Color$WonderEditor.getEngineColorRgbArr(ColorType$WonderEditor.convertColorObjToColorPickType(value));
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param) {
                return PointLightEngineService$WonderEditor.setPointLightColor(__x, lightComponent, param);
              }));
}

var closeColorPick = PointLightCloseColorPickEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1];

function buildColorPickComponent(param, lightComponent) {
  return ReasonReact.element(undefined, undefined, PickColorComponent$WonderEditor.make("color : ", (function () {
                    return Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                      return PointLightEngineService$WonderEditor.getPointLightColor(lightComponent, param);
                                    })));
                  }), (function (param) {
                    return changeColor(lightComponent, param);
                  }), Curry._2(closeColorPick, /* tuple */[
                      param[0],
                      param[1]
                    ], lightComponent), /* array */[]));
}

function buildItensityComponent(param, lightComponent) {
  var partial_arg_000 = param[0];
  var partial_arg_001 = param[1];
  var partial_arg = /* tuple */[
    partial_arg_000,
    partial_arg_001
  ];
  return React.createElement("div", {
              className: "light-intensity"
            }, ReasonReact.element(undefined, undefined, MainEditorFloatInputBaseComponent$WonderEditor.make("Intensity", (function (param) {
                        return PointLightEngineService$WonderEditor.getPointLightIntensity(lightComponent, param);
                      }), (function (param) {
                        return MainEditorPointLightUtils$WonderEditor.changeIntensity(lightComponent, param);
                      }), (function (param) {
                        return MainEditorPointLightUtils$WonderEditor.blurIntensityEvent(partial_arg, lightComponent, param);
                      }), /* array */[])));
}

function buildConstantComponent(param, lightComponent) {
  var partial_arg_000 = param[0];
  var partial_arg_001 = param[1];
  var partial_arg = /* tuple */[
    partial_arg_000,
    partial_arg_001
  ];
  return React.createElement("div", {
              className: "light-constant"
            }, ReasonReact.element(undefined, undefined, MainEditorFloatInputBaseComponent$WonderEditor.make("Constant", (function (param) {
                        return PointLightEngineService$WonderEditor.getPointLightConstant(lightComponent, param);
                      }), (function (param) {
                        return MainEditorPointLightUtils$WonderEditor.changeConstant(lightComponent, param);
                      }), (function (param) {
                        return MainEditorPointLightUtils$WonderEditor.blurConstantEvent(partial_arg, lightComponent, param);
                      }), /* array */[])));
}

function buildLinearComponent(param, lightComponent) {
  var partial_arg_000 = param[0];
  var partial_arg_001 = param[1];
  var partial_arg = /* tuple */[
    partial_arg_000,
    partial_arg_001
  ];
  return React.createElement("div", {
              className: "light-linear"
            }, ReasonReact.element(undefined, undefined, MainEditorFloatInputBaseComponent$WonderEditor.make("Linear", (function (param) {
                        return PointLightEngineService$WonderEditor.getPointLightLinear(lightComponent, param);
                      }), (function (param) {
                        return MainEditorPointLightUtils$WonderEditor.changeLinear(lightComponent, param);
                      }), (function (param) {
                        return MainEditorPointLightUtils$WonderEditor.blurLinearEvent(partial_arg, lightComponent, param);
                      }), /* array */[])));
}

function buildQuadraticComponent(param, lightComponent) {
  var partial_arg_000 = param[0];
  var partial_arg_001 = param[1];
  var partial_arg = /* tuple */[
    partial_arg_000,
    partial_arg_001
  ];
  return React.createElement("div", {
              className: "light-quadratic"
            }, ReasonReact.element(undefined, undefined, MainEditorFloatInputBaseComponent$WonderEditor.make("Quadratic", (function (param) {
                        return PointLightEngineService$WonderEditor.getPointLightQuadratic(lightComponent, param);
                      }), (function (param) {
                        return MainEditorPointLightUtils$WonderEditor.changeQuadratic(lightComponent, param);
                      }), (function (param) {
                        return MainEditorPointLightUtils$WonderEditor.blurQuadraticEvent(partial_arg, lightComponent, param);
                      }), /* array */[])));
}

function buildRangeComponent(param, lightComponent) {
  var partial_arg_000 = param[0];
  var partial_arg_001 = param[1];
  var partial_arg = /* tuple */[
    partial_arg_000,
    partial_arg_001
  ];
  return React.createElement("div", {
              className: "light-range"
            }, ReasonReact.element(undefined, undefined, MainEditorFloatInputBaseComponent$WonderEditor.make("Range", (function (param) {
                        return PointLightEngineService$WonderEditor.getPointLightRange(lightComponent, param);
                      }), (function (param) {
                        return MainEditorPointLightUtils$WonderEditor.changeRange(lightComponent, param);
                      }), (function (param) {
                        return MainEditorPointLightUtils$WonderEditor.blurRangeEvent(partial_arg, lightComponent, param);
                      }), /* array */[])));
}

var Method = /* module */[
  /* getColor */getColor,
  /* changeColor */changeColor,
  /* closeColorPick */closeColorPick,
  /* buildColorPickComponent */buildColorPickComponent,
  /* buildItensityComponent */buildItensityComponent,
  /* buildConstantComponent */buildConstantComponent,
  /* buildLinearComponent */buildLinearComponent,
  /* buildQuadraticComponent */buildQuadraticComponent,
  /* buildRangeComponent */buildRangeComponent
];

function render(param, lightComponent, _) {
  var dispatchFunc = param[1];
  var store = param[0];
  return React.createElement("article", {
              className: "wonder-point-light"
            }, buildColorPickComponent(/* tuple */[
                  store,
                  dispatchFunc
                ], lightComponent), buildItensityComponent(/* tuple */[
                  store,
                  dispatchFunc
                ], lightComponent), buildConstantComponent(/* tuple */[
                  store,
                  dispatchFunc
                ], lightComponent), buildLinearComponent(/* tuple */[
                  store,
                  dispatchFunc
                ], lightComponent), buildQuadraticComponent(/* tuple */[
                  store,
                  dispatchFunc
                ], lightComponent), buildRangeComponent(/* tuple */[
                  store,
                  dispatchFunc
                ], lightComponent));
}

function make(store, dispatchFunc, lightComponent, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(/* tuple */[
                          store,
                          dispatchFunc
                        ], lightComponent, self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  component ,
  Method ,
  render ,
  make ,
  
}
/* component Not a pure module */
