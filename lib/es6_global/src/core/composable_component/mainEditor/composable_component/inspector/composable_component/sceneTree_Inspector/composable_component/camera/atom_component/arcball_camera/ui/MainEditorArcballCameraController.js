

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as ValueService$WonderEditor from "../../../../../../../../../../../../service/atom/ValueService.js";
import * as TransformUtils$WonderEditor from "../../../../transform/utils/TransformUtils.js";
import * as Vector3Service$WonderEditor from "../../../../../../../../../../../../service/primitive/Vector3Service.js";
import * as ThreeFloatInput$WonderEditor from "../../../../../../../../../../../atom_component/floatInput/ThreeFloatInput.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/ArcballCameraEngineService.js";
import * as ArcballCameraPhiEventHandler$WonderEditor from "../eventHandler/ArcballCameraPhiEventHandler.js";
import * as ArcballCameraThetaEventHandler$WonderEditor from "../eventHandler/ArcballCameraThetaEventHandler.js";
import * as ArcballCameraTargetEventHandler$WonderEditor from "../eventHandler/ArcballCameraTargetEventHandler.js";
import * as ArcballCameraDistanceEventHandler$WonderEditor from "../eventHandler/ArcballCameraDistanceEventHandler.js";
import * as MainEditorFloatInputBaseComponent$WonderEditor from "../../../../../atom_component/FloatInputBaseComponent/MainEditorFloatInputBaseComponent.js";
import * as ArcballCameraMinDistanceEventHandler$WonderEditor from "../eventHandler/ArcballCameraMinDistanceEventHandler.js";

function _blurArcballCameraValue(param, arcballCameraController, value, param$1) {
  var match = ValueService$WonderEditor.isValueEqual(/* Float */1, value, StateLogicService$WonderEditor.getEngineStateToGetData(Curry._1(param$1[0], arcballCameraController)));
  if (match) {
    return /* () */0;
  } else {
    return Curry._3(param$1[1], /* tuple */[
                param[0],
                param[1]
              ], arcballCameraController, value);
  }
}

function _blurArcballCameraTarget(param, arcballCameraController, target, param$1) {
  var newTarget = StateLogicService$WonderEditor.getEngineStateToGetData(Curry._1(param$1[0], arcballCameraController));
  var match = Vector3Service$WonderEditor.isEqual(target, newTarget);
  if (match) {
    return /* () */0;
  } else {
    return Curry._3(param$1[1], /* tuple */[
                param[0],
                param[1]
              ], arcballCameraController, target);
  }
}

function blurArcballCameraDistance(param, arcballCameraController, distance) {
  return _blurArcballCameraValue(/* tuple */[
              param[0],
              param[1]
            ], arcballCameraController, distance, /* tuple */[
              ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerDistance,
              ArcballCameraDistanceEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1]
            ]);
}

function blurArcballCameraMinDistance(param, arcballCameraController, minDistance) {
  return _blurArcballCameraValue(/* tuple */[
              param[0],
              param[1]
            ], arcballCameraController, minDistance, /* tuple */[
              ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerMinDistance,
              ArcballCameraMinDistanceEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1]
            ]);
}

function blurArcballCameraPhi(param, arcballCameraController, minDistance) {
  return _blurArcballCameraValue(/* tuple */[
              param[0],
              param[1]
            ], arcballCameraController, minDistance, /* tuple */[
              ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerPhi,
              ArcballCameraPhiEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1]
            ]);
}

function blurArcballCameraTheta(param, arcballCameraController, minDistance) {
  return _blurArcballCameraValue(/* tuple */[
              param[0],
              param[1]
            ], arcballCameraController, minDistance, /* tuple */[
              ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerTheta,
              ArcballCameraThetaEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1]
            ]);
}

function blurArcballCameraTarget(param, arcballCameraController, target) {
  return _blurArcballCameraTarget(/* tuple */[
              param[0],
              param[1]
            ], arcballCameraController, target, /* tuple */[
              ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerTarget,
              ArcballCameraTargetEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1]
            ]);
}

function dragDropArcballCameraDistance(param, arcballCameraController, distance) {
  var dispatchFunc = param[1];
  blurArcballCameraDistance(/* tuple */[
        param[0],
        dispatchFunc
      ], arcballCameraController, distance);
  return StateLogicService$WonderEditor.getAndSetState((function (param) {
                return TransformUtils$WonderEditor.refreshTransformWithDispatchFunc(dispatchFunc, param);
              }));
}

function changeDistance(arcballCameraController, value) {
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param) {
                return ArcballCameraEngineService$WonderEditor.setArcballCameraControllerDistance(value, arcballCameraController, param);
              }));
}

function changeMinDistance(arcballCameraController, value) {
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param) {
                return ArcballCameraEngineService$WonderEditor.setArcballCameraControllerMinDistance(value, arcballCameraController, param);
              }));
}

function changePhi(arcballCameraController, value) {
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param) {
                return ArcballCameraEngineService$WonderEditor.setArcballCameraControllerPhi(arcballCameraController, value, param);
              }));
}

function changeTheta(arcballCameraController, value) {
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param) {
                return ArcballCameraEngineService$WonderEditor.setArcballCameraControllerTheta(arcballCameraController, value, param);
              }));
}

function _setTarget(arcballCameraController, target) {
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param) {
                return ArcballCameraEngineService$WonderEditor.setArcballCameraControllerTarget(arcballCameraController, target, param);
              }));
}

function changeTargetX(arcballCameraController, value) {
  var match = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerTarget(arcballCameraController, param);
        }));
  var partial_arg_001 = match[1];
  var partial_arg_002 = match[2];
  var partial_arg = /* tuple */[
    value,
    partial_arg_001,
    partial_arg_002
  ];
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param) {
                return ArcballCameraEngineService$WonderEditor.setArcballCameraControllerTarget(arcballCameraController, partial_arg, param);
              }));
}

function changeTargetY(arcballCameraController, value) {
  var match = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerTarget(arcballCameraController, param);
        }));
  var partial_arg_000 = match[0];
  var partial_arg_002 = match[2];
  var partial_arg = /* tuple */[
    partial_arg_000,
    value,
    partial_arg_002
  ];
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param) {
                return ArcballCameraEngineService$WonderEditor.setArcballCameraControllerTarget(arcballCameraController, partial_arg, param);
              }));
}

function changeTargetZ(arcballCameraController, value) {
  var match = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerTarget(arcballCameraController, param);
        }));
  var partial_arg_000 = match[0];
  var partial_arg_001 = match[1];
  var partial_arg = /* tuple */[
    partial_arg_000,
    partial_arg_001,
    value
  ];
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param) {
                return ArcballCameraEngineService$WonderEditor.setArcballCameraControllerTarget(arcballCameraController, partial_arg, param);
              }));
}

function renderDistanceField(uiStoreDataTuple, arcballCameraController) {
  return ReasonReact.element(undefined, undefined, MainEditorFloatInputBaseComponent$WonderEditor.make((function (value) {
                    return dragDropArcballCameraDistance(uiStoreDataTuple, arcballCameraController, value);
                  }), "Distance", (function (param) {
                    return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerDistance(arcballCameraController, param);
                  }), (function (param) {
                    return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param$1) {
                                  return ArcballCameraEngineService$WonderEditor.setArcballCameraControllerDistance(param, arcballCameraController, param$1);
                                }));
                  }), (function (param) {
                    return blurArcballCameraDistance(uiStoreDataTuple, arcballCameraController, param);
                  }), /* array */[]));
}

function renderMinDistanceField(uiStoreDataTuple, arcballCameraController) {
  var dispatchFunc = uiStoreDataTuple[1];
  return ReasonReact.element(undefined, undefined, MainEditorFloatInputBaseComponent$WonderEditor.make((function (value) {
                    blurArcballCameraMinDistance(uiStoreDataTuple, arcballCameraController, value);
                    return StateLogicService$WonderEditor.getAndSetState((function (param) {
                                  return TransformUtils$WonderEditor.refreshTransformWithDispatchFunc(dispatchFunc, param);
                                }));
                  }), "Min Distance", (function (param) {
                    return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerMinDistance(arcballCameraController, param);
                  }), (function (param) {
                    return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param$1) {
                                  return ArcballCameraEngineService$WonderEditor.setArcballCameraControllerMinDistance(param, arcballCameraController, param$1);
                                }));
                  }), (function (param) {
                    return blurArcballCameraMinDistance(uiStoreDataTuple, arcballCameraController, param);
                  }), /* array */[]));
}

function renderTargetField(param, arcballCameraController) {
  return ReasonReact.element(undefined, undefined, ThreeFloatInput$WonderEditor.make(param[0], param[1], "Target", arcballCameraController, changeTargetX, changeTargetY, changeTargetZ, ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerTarget, blurArcballCameraTarget, (function (param, arcballCameraController, target) {
                    var dispatchFunc = param[1];
                    blurArcballCameraTarget(/* tuple */[
                          param[0],
                          dispatchFunc
                        ], arcballCameraController, target);
                    return StateLogicService$WonderEditor.getAndSetState((function (param) {
                                  return TransformUtils$WonderEditor.refreshTransformWithDispatchFunc(dispatchFunc, param);
                                }));
                  }), true, /* array */[]));
}

function renderPhiField(uiStoreDataTuple, arcballCameraController) {
  var dispatchFunc = uiStoreDataTuple[1];
  return ReasonReact.element(undefined, undefined, MainEditorFloatInputBaseComponent$WonderEditor.make((function (value) {
                    blurArcballCameraPhi(uiStoreDataTuple, arcballCameraController, value);
                    return StateLogicService$WonderEditor.getAndSetState((function (param) {
                                  return TransformUtils$WonderEditor.refreshTransformWithDispatchFunc(dispatchFunc, param);
                                }));
                  }), "Phi", (function (param) {
                    return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerPhi(arcballCameraController, param);
                  }), (function (param) {
                    return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param$1) {
                                  return ArcballCameraEngineService$WonderEditor.setArcballCameraControllerPhi(arcballCameraController, param, param$1);
                                }));
                  }), (function (param) {
                    return blurArcballCameraPhi(uiStoreDataTuple, arcballCameraController, param);
                  }), /* array */[]));
}

function renderThetaField(uiStoreDataTuple, arcballCameraController) {
  var dispatchFunc = uiStoreDataTuple[1];
  return ReasonReact.element(undefined, undefined, MainEditorFloatInputBaseComponent$WonderEditor.make((function (value) {
                    blurArcballCameraTheta(uiStoreDataTuple, arcballCameraController, value);
                    return StateLogicService$WonderEditor.getAndSetState((function (param) {
                                  return TransformUtils$WonderEditor.refreshTransformWithDispatchFunc(dispatchFunc, param);
                                }));
                  }), "Theta", (function (param) {
                    return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerTheta(arcballCameraController, param);
                  }), (function (param) {
                    return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param$1) {
                                  return ArcballCameraEngineService$WonderEditor.setArcballCameraControllerTheta(arcballCameraController, param, param$1);
                                }));
                  }), (function (param) {
                    return blurArcballCameraTheta(uiStoreDataTuple, arcballCameraController, param);
                  }), /* array */[]));
}

var Method = /* module */[
  /* _blurArcballCameraValue */_blurArcballCameraValue,
  /* _blurArcballCameraTarget */_blurArcballCameraTarget,
  /* blurArcballCameraDistance */blurArcballCameraDistance,
  /* blurArcballCameraMinDistance */blurArcballCameraMinDistance,
  /* blurArcballCameraPhi */blurArcballCameraPhi,
  /* blurArcballCameraTheta */blurArcballCameraTheta,
  /* blurArcballCameraTarget */blurArcballCameraTarget,
  /* dragDropArcballCameraDistance */dragDropArcballCameraDistance,
  /* changeDistance */changeDistance,
  /* changeMinDistance */changeMinDistance,
  /* changePhi */changePhi,
  /* changeTheta */changeTheta,
  /* _setTarget */_setTarget,
  /* changeTargetX */changeTargetX,
  /* changeTargetY */changeTargetY,
  /* changeTargetZ */changeTargetZ,
  /* renderDistanceField */renderDistanceField,
  /* renderMinDistanceField */renderMinDistanceField,
  /* renderTargetField */renderTargetField,
  /* renderPhiField */renderPhiField,
  /* renderThetaField */renderThetaField
];

var component = ReasonReact.statelessComponent("MainEditorArcballCameraController");

function render(uiStoreDataTuple, arcballCameraController, _self) {
  return React.createElement("article", {
              className: "wonder-inspector-arcballCameraController"
            }, renderDistanceField(uiStoreDataTuple, arcballCameraController), renderMinDistanceField(uiStoreDataTuple, arcballCameraController), renderTargetField(uiStoreDataTuple, arcballCameraController), renderPhiField(uiStoreDataTuple, arcballCameraController), renderThetaField(uiStoreDataTuple, arcballCameraController));
}

function make(uiState, dispatchFunc, arcballCameraController, _children) {
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
                        ], arcballCameraController, self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

export {
  Method ,
  component ,
  render ,
  make ,
  
}
/* component Not a pure module */
