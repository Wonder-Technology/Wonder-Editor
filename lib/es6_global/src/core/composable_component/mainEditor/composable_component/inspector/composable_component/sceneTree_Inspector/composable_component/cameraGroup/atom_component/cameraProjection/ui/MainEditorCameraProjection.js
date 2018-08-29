

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Select$WonderEditor from "../../../../../../../../../../../atom_component/select/Select.js";
import * as ValueService$WonderEditor from "../../../../../../../../../../../../service/atom/ValueService.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/scene/SceneEditorService.js";
import * as MainEditorCameraProjectionUtils$WonderEditor from "../utils/MainEditorCameraProjectionUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/GameObjectComponentEngineService.js";
import * as MainEditorFloatInputBaseComponent$WonderEditor from "../../../../../atom_component/FloatInputBaseComponent/MainEditorFloatInputBaseComponent.js";
import * as PerspectiveCameraFarBlurEventHandler$WonderEditor from "../eventHandler/PerspectiveCameraFarBlurEventHandler.js";
import * as PerspectiveCameraFovyBlurEventHandler$WonderEditor from "../eventHandler/PerspectiveCameraFovyBlurEventHandler.js";
import * as PerspectiveCameraNearBlurEventHandler$WonderEditor from "../eventHandler/PerspectiveCameraNearBlurEventHandler.js";
import * as PerspectiveCameraAspectBlurEventHandler$WonderEditor from "../eventHandler/PerspectiveCameraAspectBlurEventHandler.js";
import * as PerspectiveCameraProjectionEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/PerspectiveCameraProjectionEngineService.js";

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
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[perspectiveCameraComponent],
                /* type_ : PerspectiveCamera */9
              ]], (function (param, param$1) {
                return PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraNear(value, param, param$1);
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
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[perspectiveCameraComponent],
                /* type_ : PerspectiveCamera */9
              ]], (function (param, param$1) {
                return PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraFar(value, param, param$1);
              }));
}

function blurAspectEvent(param, perspectiveCameraComponent, value) {
  var match = ValueService$WonderEditor.isValueEqual(/* Float */1, value, StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
              return PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraAspect(perspectiveCameraComponent, param);
            })));
  if (match) {
    return /* () */0;
  } else {
    return Curry._3(PerspectiveCameraAspectBlurEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1], /* tuple */[
                param[0],
                param[1]
              ], perspectiveCameraComponent, value);
  }
}

function changeAspect(perspectiveCameraComponent, value) {
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[perspectiveCameraComponent],
                /* type_ : PerspectiveCamera */9
              ]], (function (param, param$1) {
                return PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraAspect(value, param, param$1);
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
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[perspectiveCameraComponent],
                /* type_ : PerspectiveCamera */9
              ]], (function (param, param$1) {
                return PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraFovy(value, param, param$1);
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
                    return changeNear(currentGameObjectPerspectiveCamera, param);
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
                    return changeFar(currentGameObjectPerspectiveCamera, param);
                  }), (function (param) {
                    return blurFarEvent(partial_arg, currentGameObjectPerspectiveCamera, param);
                  }), /* array */[]));
}

function buildAspectComponent(param, currentGameObjectPerspectiveCamera) {
  var partial_arg_000 = param[0];
  var partial_arg_001 = param[1];
  var partial_arg = /* tuple */[
    partial_arg_000,
    partial_arg_001
  ];
  return ReasonReact.element(undefined, undefined, MainEditorFloatInputBaseComponent$WonderEditor.make("Aspect", (function (param) {
                    return PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraAspect(currentGameObjectPerspectiveCamera, param);
                  }), (function (param) {
                    return changeAspect(currentGameObjectPerspectiveCamera, param);
                  }), (function (param) {
                    return blurAspectEvent(partial_arg, currentGameObjectPerspectiveCamera, param);
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
                    return changeFovy(currentGameObjectPerspectiveCamera, param);
                  }), (function (param) {
                    return blurFovyEvent(partial_arg, currentGameObjectPerspectiveCamera, param);
                  }), /* array */[]));
}

var Method = /* module */[
  /* blurNearEvent */blurNearEvent,
  /* changeNear */changeNear,
  /* blurFarEvent */blurFarEvent,
  /* changeFar */changeFar,
  /* blurAspectEvent */blurAspectEvent,
  /* changeAspect */changeAspect,
  /* blurFovyEvent */blurFovyEvent,
  /* changeFovy */changeFovy,
  /* buildNearComponent */buildNearComponent,
  /* buildFarComponent */buildFarComponent,
  /* buildAspectComponent */buildAspectComponent,
  /* buildFovyComponent */buildFovyComponent
];

var component = ReasonReact.statelessComponent("MainEditorCameraProjection");

function render(param, _) {
  var dispatchFunc = param[1];
  var store = param[0];
  var engineState = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
  var currentGameObjectPerspectiveCamera = GameObjectComponentEngineService$WonderEditor.getPerspectiveCameraProjectionComponent(StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode), engineState);
  return React.createElement("article", {
              key: "MainEditorCameraProjection",
              className: "wonder-camera-view"
            }, ReasonReact.element(undefined, undefined, Select$WonderEditor.make("type : ", MainEditorCameraProjectionUtils$WonderEditor.getCameraProjectionOptions(/* () */0), /* PerspectiveCamera */0, (function () {
                        return /* () */0;
                      }), /* array */[])), buildNearComponent(/* tuple */[
                  store,
                  dispatchFunc
                ], currentGameObjectPerspectiveCamera), buildFarComponent(/* tuple */[
                  store,
                  dispatchFunc
                ], currentGameObjectPerspectiveCamera), buildAspectComponent(/* tuple */[
                  store,
                  dispatchFunc
                ], currentGameObjectPerspectiveCamera), buildFovyComponent(/* tuple */[
                  store,
                  dispatchFunc
                ], currentGameObjectPerspectiveCamera));
}

function make(store, dispatchFunc, _) {
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
