

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Color$WonderEditor from "../../../../../../../../../../../external/Color.js";
import * as ColorType$WonderEditor from "../../../../../../../../../../../external/type/ColorType.js";
import * as LanguageUtils$WonderEditor from "../../../../../../../../../../../utils/language/LanguageUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as PickColorComponent$WonderEditor from "../../../../../../../atom_component/PickColorComponent/ui/PickColorComponent.js";
import * as LanguageEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/LanguageEditorService.js";
import * as PointLightEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/PointLightEngineService.js";
import * as MainEditorPointLightUtils$WonderEditor from "../utils/MainEditorPointLightUtils.js";
import * as MainEditorFloatInputBaseComponent$WonderEditor from "../../../../../atom_component/FloatInputBaseComponent/MainEditorFloatInputBaseComponent.js";
import * as PointLightCloseColorPickEventHandler$WonderEditor from "./eventHandler/PointLightCloseColorPickEventHandler.js";

var component = ReasonReact.statelessComponent("MainEditorPointLight");

function getColor(lightComponent, param) {
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

function buildColorPickComponent(param, lightComponent, languageType) {
  return ReasonReact.element(undefined, undefined, PickColorComponent$WonderEditor.make("Color", LanguageUtils$WonderEditor.getInspectorLanguageDataByType("light-color-describe", languageType), (function (param) {
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

function buildIntensityComponent(param, lightComponent, languageType) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  var partial_arg = /* tuple */[
    uiState,
    dispatchFunc
  ];
  var partial_arg$1 = /* tuple */[
    uiState,
    dispatchFunc
  ];
  return ReasonReact.element(undefined, undefined, MainEditorFloatInputBaseComponent$WonderEditor.make((function (param) {
                    return MainEditorPointLightUtils$WonderEditor.blurIntensityEvent(partial_arg, lightComponent, param);
                  }), "Intensity", StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return PointLightEngineService$WonderEditor.getPointLightIntensity(lightComponent, param);
                      })), (function (param) {
                    return MainEditorPointLightUtils$WonderEditor.changeIntensity(lightComponent, param);
                  }), (function (param) {
                    return MainEditorPointLightUtils$WonderEditor.blurIntensityEvent(partial_arg$1, lightComponent, param);
                  }), LanguageUtils$WonderEditor.getInspectorLanguageDataByType("light-intensity-describe", languageType), /* array */[]));
}

function buildConstantComponent(param, lightComponent, languageType) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  var partial_arg = /* tuple */[
    uiState,
    dispatchFunc
  ];
  var partial_arg$1 = /* tuple */[
    uiState,
    dispatchFunc
  ];
  return ReasonReact.element(undefined, undefined, MainEditorFloatInputBaseComponent$WonderEditor.make((function (param) {
                    return MainEditorPointLightUtils$WonderEditor.blurConstantEvent(partial_arg, lightComponent, param);
                  }), "Constant", StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return PointLightEngineService$WonderEditor.getPointLightConstant(lightComponent, param);
                      })), (function (param) {
                    return MainEditorPointLightUtils$WonderEditor.changeConstant(lightComponent, param);
                  }), (function (param) {
                    return MainEditorPointLightUtils$WonderEditor.blurConstantEvent(partial_arg$1, lightComponent, param);
                  }), LanguageUtils$WonderEditor.getInspectorLanguageDataByType("light-constant-describe", languageType), /* array */[]));
}

function buildLinearComponent(param, lightComponent, languageType) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  var partial_arg = /* tuple */[
    uiState,
    dispatchFunc
  ];
  var partial_arg$1 = /* tuple */[
    uiState,
    dispatchFunc
  ];
  return ReasonReact.element(undefined, undefined, MainEditorFloatInputBaseComponent$WonderEditor.make((function (param) {
                    return MainEditorPointLightUtils$WonderEditor.blurLinearEvent(partial_arg, lightComponent, param);
                  }), "Linear", StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return PointLightEngineService$WonderEditor.getPointLightLinear(lightComponent, param);
                      })), (function (param) {
                    return MainEditorPointLightUtils$WonderEditor.changeLinear(lightComponent, param);
                  }), (function (param) {
                    return MainEditorPointLightUtils$WonderEditor.blurLinearEvent(partial_arg$1, lightComponent, param);
                  }), LanguageUtils$WonderEditor.getInspectorLanguageDataByType("light-linear-describe", languageType), /* array */[]));
}

function buildQuadraticComponent(param, lightComponent, languageType) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  var partial_arg = /* tuple */[
    uiState,
    dispatchFunc
  ];
  var partial_arg$1 = /* tuple */[
    uiState,
    dispatchFunc
  ];
  return ReasonReact.element(undefined, undefined, MainEditorFloatInputBaseComponent$WonderEditor.make((function (param) {
                    return MainEditorPointLightUtils$WonderEditor.blurQuadraticEvent(partial_arg, lightComponent, param);
                  }), "Quadratic", StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return PointLightEngineService$WonderEditor.getPointLightQuadratic(lightComponent, param);
                      })), (function (param) {
                    return MainEditorPointLightUtils$WonderEditor.changeQuadratic(lightComponent, param);
                  }), (function (param) {
                    return MainEditorPointLightUtils$WonderEditor.blurQuadraticEvent(partial_arg$1, lightComponent, param);
                  }), LanguageUtils$WonderEditor.getInspectorLanguageDataByType("light-quadratic-describe", languageType), /* array */[]));
}

function buildRangeComponent(param, lightComponent, languageType) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  var partial_arg = /* tuple */[
    uiState,
    dispatchFunc
  ];
  var partial_arg$1 = /* tuple */[
    uiState,
    dispatchFunc
  ];
  return ReasonReact.element(undefined, undefined, MainEditorFloatInputBaseComponent$WonderEditor.make((function (param) {
                    return MainEditorPointLightUtils$WonderEditor.blurRangeEvent(partial_arg, lightComponent, param);
                  }), "Range", StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return PointLightEngineService$WonderEditor.getPointLightRange(lightComponent, param);
                      })), (function (param) {
                    return MainEditorPointLightUtils$WonderEditor.changeRange(lightComponent, param);
                  }), (function (param) {
                    return MainEditorPointLightUtils$WonderEditor.blurRangeEvent(partial_arg$1, lightComponent, param);
                  }), LanguageUtils$WonderEditor.getInspectorLanguageDataByType("light-range-describe", languageType), /* array */[]));
}

var Method = /* module */[
  /* getColor */getColor,
  /* changeColor */changeColor,
  /* closeColorPick */closeColorPick,
  /* buildColorPickComponent */buildColorPickComponent,
  /* buildIntensityComponent */buildIntensityComponent,
  /* buildConstantComponent */buildConstantComponent,
  /* buildLinearComponent */buildLinearComponent,
  /* buildQuadraticComponent */buildQuadraticComponent,
  /* buildRangeComponent */buildRangeComponent
];

function render(param, lightComponent, _self) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  return React.createElement("article", {
              className: "wonder-point-light"
            }, buildColorPickComponent(/* tuple */[
                  uiState,
                  dispatchFunc
                ], lightComponent, languageType), buildIntensityComponent(/* tuple */[
                  uiState,
                  dispatchFunc
                ], lightComponent, languageType), buildConstantComponent(/* tuple */[
                  uiState,
                  dispatchFunc
                ], lightComponent, languageType), buildLinearComponent(/* tuple */[
                  uiState,
                  dispatchFunc
                ], lightComponent, languageType), buildQuadraticComponent(/* tuple */[
                  uiState,
                  dispatchFunc
                ], lightComponent, languageType), buildRangeComponent(/* tuple */[
                  uiState,
                  dispatchFunc
                ], lightComponent, languageType));
}

function make(uiState, dispatchFunc, lightComponent, _children) {
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
                          uiState,
                          dispatchFunc
                        ], lightComponent, self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

export {
  component ,
  Method ,
  render ,
  make ,
  
}
/* component Not a pure module */
