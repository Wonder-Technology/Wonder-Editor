

import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as LanguageUtils$WonderEditor from "../../../../../../../../../utils/language/LanguageUtils.js";
import * as TransformUtils$WonderEditor from "../utils/TransformUtils.js";
import * as Vector3Service$WonderEditor from "../../../../../../../../../../service/primitive/Vector3Service.js";
import * as ThreeFloatInput$WonderEditor from "../../../../../../../../../atom_component/floatInput/ThreeFloatInput.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as LanguageEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/LanguageEditorService.js";
import * as ScaleBlurEventHandler$WonderEditor from "../eventHandler/ScaleBlurEventHandler.js";
import * as TransformEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/transform/TransformEditorService.js";
import * as TransformEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/TransformEngineService.js";
import * as PositionBlurEventHandler$WonderEditor from "../eventHandler/PositionBlurEventHandler.js";
import * as RotationBlurEventHandler$WonderEditor from "../eventHandler/RotationBlurEventHandler.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";

function blurPositionEvent(param, transformComponent, param$1) {
  var z = param$1[2];
  var y = param$1[1];
  var x = param$1[0];
  var match = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return TransformUtils$WonderEditor.getTransformPositionData(transformComponent, param);
        }));
  var match$1 = Vector3Service$WonderEditor.isEqual(/* tuple */[
        x,
        y,
        z
      ], /* tuple */[
        match[0],
        match[1],
        match[2]
      ]);
  if (match$1) {
    return /* () */0;
  } else {
    return Curry._3(PositionBlurEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1], /* tuple */[
                param[0],
                param[1]
              ], transformComponent, /* tuple */[
                x,
                y,
                z
              ]);
  }
}

function blurRotationEvent(param, transformComponent, param$1) {
  var z = param$1[2];
  var y = param$1[1];
  var x = param$1[0];
  var match = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return TransformUtils$WonderEditor.getTransformRotationData(transformComponent, param);
        }));
  var match$1 = Vector3Service$WonderEditor.isEqual(/* tuple */[
        x,
        y,
        z
      ], /* tuple */[
        match[0],
        match[1],
        match[2]
      ]);
  if (match$1) {
    return /* () */0;
  } else {
    return Curry._3(RotationBlurEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1], /* tuple */[
                param[0],
                param[1]
              ], transformComponent, /* tuple */[
                x,
                y,
                z
              ]);
  }
}

function blurScaleEvent(param, transformComponent, param$1) {
  var z = param$1[2];
  var y = param$1[1];
  var x = param$1[0];
  var match = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return TransformUtils$WonderEditor.getTransformScaleData(transformComponent, param);
        }));
  var match$1 = Vector3Service$WonderEditor.isEqual(/* tuple */[
        x,
        y,
        z
      ], /* tuple */[
        match[0],
        match[1],
        match[2]
      ]);
  if (match$1) {
    return /* () */0;
  } else {
    return Curry._3(ScaleBlurEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1], /* tuple */[
                param[0],
                param[1]
              ], transformComponent, /* tuple */[
                x,
                y,
                z
              ]);
  }
}

function _setCurrentSceneTreeNodeLocalPosition(transformComponent, param) {
  var partial_arg_000 = param[0];
  var partial_arg_001 = param[1];
  var partial_arg_002 = param[2];
  var partial_arg = /* tuple */[
    partial_arg_000,
    partial_arg_001,
    partial_arg_002
  ];
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param) {
                return TransformEngineService$WonderEditor.setLocalPosition(partial_arg, transformComponent, param);
              }));
}

function changePositionX(transformComponent, value) {
  var match = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return TransformUtils$WonderEditor.getSceneTreeNodeLocalPosition(transformComponent, param);
        }));
  return _setCurrentSceneTreeNodeLocalPosition(transformComponent, /* tuple */[
              value,
              match[1],
              match[2]
            ]);
}

function changePositionY(transformComponent, value) {
  var match = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return TransformUtils$WonderEditor.getSceneTreeNodeLocalPosition(transformComponent, param);
        }));
  return _setCurrentSceneTreeNodeLocalPosition(transformComponent, /* tuple */[
              match[0],
              value,
              match[2]
            ]);
}

function changePositionZ(transformComponent, value) {
  var match = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return TransformUtils$WonderEditor.getSceneTreeNodeLocalPosition(transformComponent, param);
        }));
  return _setCurrentSceneTreeNodeLocalPosition(transformComponent, /* tuple */[
              match[0],
              match[1],
              value
            ]);
}

function _setCurrentSceneTreeNodeLocalScale(transformComponent, param) {
  var partial_arg_000 = param[0];
  var partial_arg_001 = param[1];
  var partial_arg_002 = param[2];
  var partial_arg = /* tuple */[
    partial_arg_000,
    partial_arg_001,
    partial_arg_002
  ];
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param) {
                return TransformEngineService$WonderEditor.setLocalScale(partial_arg, transformComponent, param);
              }));
}

function changeScaleX(transformComponent, value) {
  var match = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return TransformEngineService$WonderEditor.getLocalScale(transformComponent, param);
        }));
  return _setCurrentSceneTreeNodeLocalScale(transformComponent, /* tuple */[
              value,
              match[1],
              match[2]
            ]);
}

function changeScaleY(transformComponent, value) {
  var match = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return TransformEngineService$WonderEditor.getLocalScale(transformComponent, param);
        }));
  return _setCurrentSceneTreeNodeLocalScale(transformComponent, /* tuple */[
              match[0],
              value,
              match[2]
            ]);
}

function changeScaleZ(transformComponent, value) {
  var match = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return TransformEngineService$WonderEditor.getLocalScale(transformComponent, param);
        }));
  return _setCurrentSceneTreeNodeLocalScale(transformComponent, /* tuple */[
              match[0],
              match[1],
              value
            ]);
}

function _setCurrentSceneTreeNodeLocalRotation(transformComponent, localEulerAngles) {
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param) {
                return TransformEngineService$WonderEditor.setLocalEulerAngles(localEulerAngles, transformComponent, param);
              }));
}

function _changeRotationField(transformComponent, value, setLocalEulerAngleFieldFunc) {
  StateLogicService$WonderEditor.getAndSetEditorState(Curry._2(setLocalEulerAngleFieldFunc, transformComponent, value));
  var match = StateLogicService$WonderEditor.getStateToGetData((function (param) {
          return TransformEditorService$WonderEditor.getLocalEulerAngleOrInit(transformComponent, param);
        }));
  var localEulerAngles = match[0];
  StateEditorService$WonderEditor.setState(match[1]);
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param) {
                return TransformEngineService$WonderEditor.setLocalEulerAngles(localEulerAngles, transformComponent, param);
              }));
}

function changeRotationX(transformComponent, value) {
  return _changeRotationField(transformComponent, value, TransformEditorService$WonderEditor.setLocalEulerAngleX);
}

function changeRotationY(transformComponent, value) {
  return _changeRotationField(transformComponent, value, TransformEditorService$WonderEditor.setLocalEulerAngleY);
}

function changeRotationZ(transformComponent, value) {
  return _changeRotationField(transformComponent, value, TransformEditorService$WonderEditor.setLocalEulerAngleZ);
}

function buildShadeComponent(gameObject) {
  var match = GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent(gameObject, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
  if (match) {
    return React.createElement("div", {
                className: "transform-shade"
              });
  } else {
    return null;
  }
}

var Method = /* module */[
  /* blurPositionEvent */blurPositionEvent,
  /* blurRotationEvent */blurRotationEvent,
  /* blurScaleEvent */blurScaleEvent,
  /* _setCurrentSceneTreeNodeLocalPosition */_setCurrentSceneTreeNodeLocalPosition,
  /* changePositionX */changePositionX,
  /* changePositionY */changePositionY,
  /* changePositionZ */changePositionZ,
  /* _setCurrentSceneTreeNodeLocalScale */_setCurrentSceneTreeNodeLocalScale,
  /* changeScaleX */changeScaleX,
  /* changeScaleY */changeScaleY,
  /* changeScaleZ */changeScaleZ,
  /* _setCurrentSceneTreeNodeLocalRotation */_setCurrentSceneTreeNodeLocalRotation,
  /* _changeRotationField */_changeRotationField,
  /* changeRotationX */changeRotationX,
  /* changeRotationY */changeRotationY,
  /* changeRotationZ */changeRotationZ,
  /* buildShadeComponent */buildShadeComponent
];

var component = ReasonReact.statelessComponent("MainEditorTransform");

function render(param, param$1, _self) {
  var transformComponent = param$1[0];
  var dispatchFunc = param[1];
  var uiState = param[0];
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  return React.createElement("article", {
              className: "wonder-inspector-transform"
            }, ReasonReact.element(undefined, undefined, ThreeFloatInput$WonderEditor.make(uiState, dispatchFunc, "Position", transformComponent, changePositionX, changePositionY, changePositionZ, TransformUtils$WonderEditor.getTransformPositionData, blurPositionEvent, blurPositionEvent, true, LanguageUtils$WonderEditor.getInspectorLanguageDataByType("position-describe", languageType), /* array */[])), ReasonReact.element(undefined, undefined, ThreeFloatInput$WonderEditor.make(uiState, dispatchFunc, "Rotation", transformComponent, changeRotationX, changeRotationY, changeRotationZ, TransformUtils$WonderEditor.getTransformRotationData, blurRotationEvent, blurRotationEvent, true, LanguageUtils$WonderEditor.getInspectorLanguageDataByType("rotation-describe", languageType), /* array */[])), ReasonReact.element(undefined, undefined, ThreeFloatInput$WonderEditor.make(uiState, dispatchFunc, "Scale", transformComponent, changeScaleX, changeScaleY, changeScaleZ, TransformUtils$WonderEditor.getTransformScaleData, blurScaleEvent, blurScaleEvent, true, LanguageUtils$WonderEditor.getInspectorLanguageDataByType("scale-describe", languageType), /* array */[])), buildShadeComponent(param$1[1]));
}

function make(uiState, dispatchFunc, transformComponent, gameObject, _children) {
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
                        ], /* tuple */[
                          transformComponent,
                          gameObject
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
