

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Select$WonderEditor from "../../../../../../../../../../../atom_component/select/Select.js";
import * as ValueService$WonderEditor from "../../../../../../../../../../../../service/atom/ValueService.js";
import * as LanguageUtils$WonderEditor from "../../../../../../../../../../../utils/language/LanguageUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as LanguageEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/LanguageEditorService.js";
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

function buildNearComponent(param, currentGameObjectPerspectiveCamera, languageType) {
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
                    return blurNearEvent(partial_arg, currentGameObjectPerspectiveCamera, param);
                  }), "Near", StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraNear(currentGameObjectPerspectiveCamera, param);
                      })), (function (param) {
                    return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param$1) {
                                  return PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraNear(param, currentGameObjectPerspectiveCamera, param$1);
                                }));
                  }), (function (param) {
                    return blurNearEvent(partial_arg$1, currentGameObjectPerspectiveCamera, param);
                  }), LanguageUtils$WonderEditor.getInspectorLanguageDataByType("projection-near-describe", languageType), /* array */[]));
}

function buildFarComponent(param, currentGameObjectPerspectiveCamera, languageType) {
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
                    return blurFarEvent(partial_arg, currentGameObjectPerspectiveCamera, param);
                  }), "Far", StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraFar(currentGameObjectPerspectiveCamera, param);
                      })), (function (param) {
                    return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param$1) {
                                  return PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraFar(param, currentGameObjectPerspectiveCamera, param$1);
                                }));
                  }), (function (param) {
                    return blurFarEvent(partial_arg$1, currentGameObjectPerspectiveCamera, param);
                  }), LanguageUtils$WonderEditor.getInspectorLanguageDataByType("projection-far-describe", languageType), /* array */[]));
}

function buildFovyComponent(param, currentGameObjectPerspectiveCamera, languageType) {
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
                    return blurFovyEvent(partial_arg, currentGameObjectPerspectiveCamera, param);
                  }), "Fovy", StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraFovy(currentGameObjectPerspectiveCamera, param);
                      })), (function (param) {
                    return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param$1) {
                                  return PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraFovy(param, currentGameObjectPerspectiveCamera, param$1);
                                }));
                  }), (function (param) {
                    return blurFovyEvent(partial_arg$1, currentGameObjectPerspectiveCamera, param);
                  }), LanguageUtils$WonderEditor.getInspectorLanguageDataByType("projection-fovy-describe", languageType), /* array */[]));
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

function render(param, _self) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var currentGameObjectPerspectiveCamera = GameObjectComponentEngineService$WonderEditor.unsafeGetPerspectiveCameraProjectionComponent(StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode), engineState);
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  return React.createElement("article", {
              key: "MainEditorCameraProjection",
              className: "wonder-camera-projection"
            }, ReasonReact.element(undefined, undefined, Select$WonderEditor.make("Type", MainEditorCameraProjectionUtils$WonderEditor.getCameraProjectionOptions(/* () */0), /* PerspectiveCamera */0, (function (value) {
                        return /* () */0;
                      }), LanguageUtils$WonderEditor.getInspectorLanguageDataByType("projection-type-describe", languageType), /* array */[])), buildNearComponent(/* tuple */[
                  uiState,
                  dispatchFunc
                ], currentGameObjectPerspectiveCamera, languageType), buildFarComponent(/* tuple */[
                  uiState,
                  dispatchFunc
                ], currentGameObjectPerspectiveCamera, languageType), buildFovyComponent(/* tuple */[
                  uiState,
                  dispatchFunc
                ], currentGameObjectPerspectiveCamera, languageType));
}

function make(uiState, dispatchFunc, _children) {
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
