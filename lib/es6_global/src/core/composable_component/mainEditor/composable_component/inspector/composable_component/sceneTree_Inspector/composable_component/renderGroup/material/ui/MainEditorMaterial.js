

import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Select$WonderEditor from "../../../../../../../../../../atom_component/select/Select.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../../external/DomHelper.js";
import * as ReasonReactUtils$WonderEditor from "../../../../../../../../../../utils/ui/ReasonReactUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/scene/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as MainEditorBasicMaterial$WonderEditor from "../composable_component/basic_material/ui/MainEditorBasicMaterial.js";
import * as MainEditorLightMaterial$WonderEditor from "../composable_component/light_material/ui/MainEditorLightMaterial.js";
import * as MainEditorMaterialUtils$WonderEditor from "../utils/MainEditorMaterialUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/GameObjectComponentEngineService.js";
import * as MainEditorChangeMaterialEventHandler$WonderEditor from "../eventHandler/MainEditorChangeMaterialEventHandler.js";

var changeMaterial = MainEditorChangeMaterialEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

function renderBasicMaterial(param, gameObject) {
  return ReasonReact.element(undefined, undefined, MainEditorBasicMaterial$WonderEditor.make(param[0], param[1], StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return GameObjectComponentEngineService$WonderEditor.getBasicMaterialComponent(gameObject, param);
                      })), /* array */[]));
}

function renderLightMaterial(param, gameObject) {
  return ReasonReact.element(undefined, undefined, MainEditorLightMaterial$WonderEditor.make(param[0], param[1], StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return GameObjectComponentEngineService$WonderEditor.getLightMaterialComponent(gameObject, param);
                      })), /* array */[]));
}

var Method = /* module */[
  /* changeMaterial */changeMaterial,
  /* renderBasicMaterial */renderBasicMaterial,
  /* renderLightMaterial */renderLightMaterial
];

var component = ReasonReact.reducerComponent("MainEditorMaterial");

function reducer(param, action, state) {
  var dispatchFunc = param[1];
  var store = param[0];
  var originMaterialType = state[/* materialType */0];
  return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[/* materialType */action[0]], (function (state) {
                return Curry._3(changeMaterial, /* tuple */[
                            store,
                            dispatchFunc
                          ], /* () */0, /* tuple */[
                            originMaterialType,
                            state[/* materialType */0]
                          ]);
              }));
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
              key: "MainEditorMaterial",
              className: "wonder-material"
            }, React.createElement("div", {
                  className: "material-drag-div"
                }, React.createElement("div", {
                      className: "material-drag-name"
                    }), React.createElement("div", {
                      className: "material-select"
                    }, DomHelper$WonderEditor.textEl("select"))), React.createElement("div", {
                  className: ""
                }, ReasonReact.element(undefined, undefined, Select$WonderEditor.make("shader", MainEditorMaterialUtils$WonderEditor.getMaterialOptions(/* () */0), state[/* materialType */0], (function (value) {
                            return Curry._1(send, /* ChangeMaterial */[value]);
                          }), /* array */[]))), React.createElement("div", {
                  className: ""
                }, MainEditorMaterialUtils$WonderEditor.handleSpecificFuncByMaterialType(state[/* materialType */0], /* tuple */[
                      (function (param) {
                          return renderBasicMaterial(partial_arg, param);
                        }),
                      (function (param) {
                          return renderLightMaterial(partial_arg$1, param);
                        })
                    ])));
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
              return /* record */[/* materialType */StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                              return MainEditorMaterialUtils$WonderEditor.getMaterialTypeByGameObject(partial_arg, param);
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
