

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Select$WonderEditor from "../../../../../../../../../../../atom_component/select/Select.js";
import * as ValueService$WonderEditor from "../../../../../../../../../../../../service/atom/ValueService.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/StateEngineService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as MainEditorCameraProjectionUtils$WonderEditor from "../utils/MainEditorCameraProjectionUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as MainEditorFloatInputBaseComponent$WonderEditor from "../../../../../atom_component/FloatInputBaseComponent/MainEditorFloatInputBaseComponent.js";
import * as PerspectiveCameraFarBlurEventHandler$WonderEditor from "../eventHandler/PerspectiveCameraFarBlurEventHandler.js";
import * as PerspectiveCameraFovyBlurEventHandler$WonderEditor from "../eventHandler/PerspectiveCameraFovyBlurEventHandler.js";
import * as PerspectiveCameraNearBlurEventHandler$WonderEditor from "../eventHandler/PerspectiveCameraNearBlurEventHandler.js";
import * as PerspectiveCameraProjectionEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/camera/PerspectiveCameraProjectionEngineService.js";

function blurNearEvent(param, perspectiveCameraComponent, value) {
  var match = ValueService$WonderEditor.isValueEqual(/* Float */1, value, StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
              return PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraNear(perspectiveCameraComponent, param);
            })));
  if (match) {
    return /* () */0;
  } else {
    return Curry._3(PerspectiveCameraNearBlurEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1], /* tuple */[
                param[0],
                param[1]
              ], perspectiveCameraComponent, value);
  }
}

function changeNear(perspectiveCameraComponent, value) {
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param) {
                return PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraNear(value, perspectiveCameraComponent, param);
              }));
}

function blurFarEvent(param, perspectiveCameraComponent, value) {
  var match = ValueService$WonderEditor.isValueEqual(/* Float */1, value, StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
              return PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraFar(perspectiveCameraComponent, param);
            })));
  if (match) {
    return /* () */0;
  } else {
    return Curry._3(PerspectiveCameraFarBlurEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1], /* tuple */[
                param[0],
                param[1]
              ], perspectiveCameraComponent, value);
  }
}

function changeFar(perspectiveCameraComponent, value) {
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param) {
                return PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraFar(value, perspectiveCameraComponent, param);
              }));
}

function blurFovyEvent(param, perspectiveCameraComponent, value) {
  var match = ValueService$WonderEditor.isValueEqual(/* Float */1, value, StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
              return PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraFovy(perspectiveCameraComponent, param);
            })));
  if (match) {
    return /* () */0;
  } else {
    return Curry._3(PerspectiveCameraFovyBlurEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1], /* tuple */[
                param[0],
                param[1]
              ], perspectiveCameraComponent, value);
  }
}

function changeFovy(perspectiveCameraComponent, value) {
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param) {
                return PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraFovy(value, perspectiveCameraComponent, param);
              }));
}

function buildNearComponent(param, currentGameObjectPerspectiveCamera) {
  var partial_arg_000 = param[0];
  var partial_arg_001 = param[1];
  var partial_arg = /* tuple */[
    partial_arg_000,
    partial_arg_001
  ];
  return ReasonReact.element(undefined, undefined, MainEditorFloatInputBaseComponent$WonderEditor.make("Near", (function (param) {
                    return PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraNear(currentGameObjectPerspectiveCamera, param);
                  }), (function (param) {
                    return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param$1) {
                                  return PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraNear(param, currentGameObjectPerspectiveCamera, param$1);
                                }));
                  }), (function (param) {
                    return blurNearEvent(partial_arg, currentGameObjectPerspectiveCamera, param);
                  }), /* array */[]));
}

function buildFarComponent(param, currentGameObjectPerspectiveCamera) {
  var partial_arg_000 = param[0];
  var partial_arg_001 = param[1];
  var partial_arg = /* tuple */[
    partial_arg_000,
    partial_arg_001
  ];
  return ReasonReact.element(undefined, undefined, MainEditorFloatInputBaseComponent$WonderEditor.make("Far", (function (param) {
                    return PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraFar(currentGameObjectPerspectiveCamera, param);
                  }), (function (param) {
                    return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param$1) {
                                  return PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraFar(param, currentGameObjectPerspectiveCamera, param$1);
                                }));
                  }), (function (param) {
                    return blurFarEvent(partial_arg, currentGameObjectPerspectiveCamera, param);
                  }), /* array */[]));
}

function buildFovyComponent(param, currentGameObjectPerspectiveCamera) {
  var partial_arg_000 = param[0];
  var partial_arg_001 = param[1];
  var partial_arg = /* tuple */[
    partial_arg_000,
    partial_arg_001
  ];
  return ReasonReact.element(undefined, undefined, MainEditorFloatInputBaseComponent$WonderEditor.make("Fovy", (function (param) {
                    return PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraFovy(currentGameObjectPerspectiveCamera, param);
                  }), (function (param) {
                    return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param$1) {
                                  return PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraFovy(param, currentGameObjectPerspectiveCamera, param$1);
                                }));
                  }), (function (param) {
                    return blurFovyEvent(partial_arg, currentGameObjectPerspectiveCamera, param);
                  }), /* array */[]));
}

var Method = /* module */[
  /* blurNearEvent */blurNearEvent,
  /* changeNear */changeNear,
  /* blurFarEvent */blurFarEvent,
  /* changeFar */changeFar,
  /* blurFovyEvent */blurFovyEvent,
  /* changeFovy */changeFovy,
  /* buildNearComponent */buildNearComponent,
  /* buildFarComponent */buildFarComponent,
  /* buildFovyComponent */buildFovyComponent
];

var component = ReasonReact.statelessComponent("MainEditorCameraProjection");

function render(param, _) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var currentGameObjectPerspectiveCamera = GameObjectComponentEngineService$WonderEditor.unsafeGetPerspectiveCameraProjectionComponent(StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode), engineState);
  return React.createElement("article", {
              key: "MainEditorCameraProjection",
              className: "wonder-camera-projection"
            }, ReasonReact.element(undefined, undefined, Select$WonderEditor.make("Type", MainEditorCameraProjectionUtils$WonderEditor.getCameraProjectionOptions(/* () */0), /* PerspectiveCamera */0, (function () {
                        return /* () */0;
                      }), /* array */[])), buildNearComponent(/* tuple */[
                  uiState,
                  dispatchFunc
                ], currentGameObjectPerspectiveCamera), buildFarComponent(/* tuple */[
                  uiState,
                  dispatchFunc
                ], currentGameObjectPerspectiveCamera), buildFovyComponent(/* tuple */[
                  uiState,
                  dispatchFunc
                ], currentGameObjectPerspectiveCamera));
}

function make(uiState, dispatchFunc, _) {
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
                        ], self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  Method ,
  component ,
  render ,
  make ,
  
}
/* component Not a pure module */
