

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../../ui/store/AppStore.js";
import * as ValueService$WonderEditor from "../../../../../../../../../../../../service/atom/ValueService.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/ArcballCameraEngineService.js";
import * as ArcballCameraDistanceEventHandler$WonderEditor from "../eventHandler/ArcballCameraDistanceEventHandler.js";
import * as MainEditorFloatInputBaseComponent$WonderEditor from "../../../../../atom_component/FloatInputBaseComponent/MainEditorFloatInputBaseComponent.js";
import * as ArcballCameraMinDistanceEventHandler$WonderEditor from "../eventHandler/ArcballCameraMinDistanceEventHandler.js";

function blurArcbalCameraDistance(param, arcballCameraController, distance) {
  var dispatchFunc = param[1];
  var match = ValueService$WonderEditor.isValueEqual(/* Float */1, distance, StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
              return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerDistance(arcballCameraController, param);
            })));
  if (!match) {
    Curry._3(ArcballCameraDistanceEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1], /* tuple */[
          param[0],
          dispatchFunc
        ], arcballCameraController, distance);
  }
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* Inspector */1]]
      ]);
  return /* () */0;
}

function blurArcbalCameraMinDistance(param, arcballCameraController, minDistance) {
  var dispatchFunc = param[1];
  var match = ValueService$WonderEditor.isValueEqual(/* Float */1, minDistance, StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
              return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerMinDistance(arcballCameraController, param);
            })));
  if (!match) {
    Curry._3(ArcballCameraMinDistanceEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1], /* tuple */[
          param[0],
          dispatchFunc
        ], arcballCameraController, minDistance);
  }
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* Inspector */1]]
      ]);
  return /* () */0;
}

function changeDistance(arcballCameraController, value) {
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[arcballCameraController],
                /* type_ : ArcballCameraController */9
              ]], (function (param, param$1) {
                return ArcballCameraEngineService$WonderEditor.setArcballCameraControllerDistance(value, param, param$1);
              }));
}

function changeMinDistance(arcballCameraController, value) {
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[arcballCameraController],
                /* type_ : ArcballCameraController */9
              ]], (function (param, param$1) {
                return ArcballCameraEngineService$WonderEditor.setArcballCameraControllerMinDistance(value, param, param$1);
              }));
}

var Method = /* module */[
  /* blurArcbalCameraDistance */blurArcbalCameraDistance,
  /* blurArcbalCameraMinDistance */blurArcbalCameraMinDistance,
  /* changeDistance */changeDistance,
  /* changeMinDistance */changeMinDistance
];

var component = ReasonReact.statelessComponent("MainEditorArcballCamera");

function render(param, arcballCameraController, _) {
  var dispatchFunc = param[1];
  var store = param[0];
  var partial_arg = /* tuple */[
    store,
    dispatchFunc
  ];
  var partial_arg$1 = /* tuple */[
    store,
    dispatchFunc
  ];
  return React.createElement("article", {
              className: "wonder-inspector-arcballCameraController"
            }, ReasonReact.element(undefined, undefined, MainEditorFloatInputBaseComponent$WonderEditor.make("Distance", (function (param) {
                        return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerDistance(arcballCameraController, param);
                      }), (function (param) {
                        return changeDistance(arcballCameraController, param);
                      }), (function (param) {
                        return blurArcbalCameraDistance(partial_arg, arcballCameraController, param);
                      }), /* array */[])), ReasonReact.element(undefined, undefined, MainEditorFloatInputBaseComponent$WonderEditor.make("Min Distance", (function (param) {
                        return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerMinDistance(arcballCameraController, param);
                      }), (function (param) {
                        return changeMinDistance(arcballCameraController, param);
                      }), (function (param) {
                        return blurArcbalCameraMinDistance(partial_arg$1, arcballCameraController, param);
                      }), /* array */[])));
}

function make(store, dispatchFunc, arcballCameraController, _) {
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
                        ], arcballCameraController, self);
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
