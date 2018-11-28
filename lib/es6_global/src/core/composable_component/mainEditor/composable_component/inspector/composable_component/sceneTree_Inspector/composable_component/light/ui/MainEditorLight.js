

import * as Block from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Select$WonderEditor from "../../../../../../../../../atom_component/select/Select.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/scene/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/StateEngineService.js";
import * as MainEditorLightUtils$WonderEditor from "../utils/MainEditorLightUtils.js";
import * as MainEditorPointLight$WonderEditor from "../composable_component/point_light/ui/MainEditorPointLight.js";
import * as MainEditorDirectionLight$WonderEditor from "../composable_component/direction_light/ui/MainEditorDirectionLight.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/GameObjectComponentEngineService.js";
import * as MainEditorChangeLightEventHandler$WonderEditor from "../eventHandler/MainEditorChangeLightEventHandler.js";

var changeLight = MainEditorChangeLightEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

function renderDirectionLight(param, gameObject) {
  return ReasonReact.element(undefined, undefined, MainEditorDirectionLight$WonderEditor.make(param[0], param[1], StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return GameObjectComponentEngineService$WonderEditor.unsafeGetDirectionLightComponent(gameObject, param);
                      })), /* array */[]));
}

function renderPointLight(param, gameObject) {
  return ReasonReact.element(undefined, undefined, MainEditorPointLight$WonderEditor.make(param[0], param[1], StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return GameObjectComponentEngineService$WonderEditor.unsafeGetPointLightComponent(gameObject, param);
                      })), /* array */[]));
}

var Method = /* module */[
  /* changeLight */changeLight,
  /* renderDirectionLight */renderDirectionLight,
  /* renderPointLight */renderPointLight
];

var component = ReasonReact.reducerComponent("MainEditorLight");

function reducer(param, action, state) {
  var value = action[0];
  var sourceLightType = state[/* lightType */0];
  Curry._3(changeLight, /* tuple */[
        param[0],
        param[1]
      ], /* () */0, /* tuple */[
        sourceLightType,
        value
      ]);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = MainEditorLightUtils$WonderEditor.isLightExceedMaxCountByType(value, engineState);
  if (match[1]) {
    return /* NoUpdate */0;
  } else {
    return /* Update */Block.__(0, [/* record */[/* lightType */value]]);
  }
}

function render(param, param$1) {
  var send = param$1[/* send */3];
  var state = param$1[/* state */1];
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
              key: "MainEditorLight",
              className: "wonder-inspector-light"
            }, ReasonReact.element(undefined, undefined, Select$WonderEditor.make("Type", MainEditorLightUtils$WonderEditor.getLightOptions(/* () */0), state[/* lightType */0], (function (value) {
                        return Curry._1(send, /* ChangeLight */[value]);
                      }), /* array */[])), MainEditorLightUtils$WonderEditor.handleSpecificFuncByLightType(state[/* lightType */0], /* tuple */[
                  (function (param) {
                      return renderDirectionLight(partial_arg, param);
                    }),
                  (function (param) {
                      return renderPointLight(partial_arg$1, param);
                    })
                ]));
}

function make(store, dispatchFunc, _) {
  var partial_arg = /* tuple */[
    store,
    dispatchFunc
  ];
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
          /* initialState */(function () {
              var partial_arg = SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(StateEditorService$WonderEditor.getState(/* () */0));
              return /* record */[/* lightType */StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                              return MainEditorLightUtils$WonderEditor.getLightTypeByGameObject(partial_arg, param);
                            }))];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param, param$1) {
              return reducer(partial_arg, param, param$1);
            }),
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  Method ,
  component ,
  reducer ,
  render ,
  make ,
  
}
/* component Not a pure module */
