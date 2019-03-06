

import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Select$WonderEditor from "../../../../../../../../../atom_component/select/Select.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../external/DomHelper.js";
import * as StringInput$WonderEditor from "../../../../../../../../../atom_component/stringInput/StringInput.js";
import * as ReasonReactUtils$WonderEditor from "../../../../../../../../../utils/ui/ReasonReactUtils.js";
import * as MainEditorBasicMaterial$WonderEditor from "../../../../sceneTree_Inspector/composable_component/renderGroup/material/composable_component/basic_material/ui/MainEditorBasicMaterial.js";
import * as MainEditorLightMaterial$WonderEditor from "../../../../sceneTree_Inspector/composable_component/renderGroup/material/composable_component/light_material/ui/MainEditorLightMaterial.js";
import * as MainEditorMaterialUtils$WonderEditor from "../../../../sceneTree_Inspector/composable_component/renderGroup/material/utils/MainEditorMaterialUtils.js";
import * as InspectorChangeMaterialTypeEventHandler$WonderEditor from "../eventHandler/InspectorChangeMaterialTypeEventHandler.js";

var changeMaterialType = InspectorChangeMaterialTypeEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var Method = /* module */[/* changeMaterialType */changeMaterialType];

var component = ReasonReact.reducerComponent("MaterialInspector");

function reducer(param, param$1, action, state) {
  var value = action[0];
  var materialComponent = param$1[1];
  var currentNodeId = param$1[0];
  var dispatchFunc = param[1];
  var uiState = param[0];
  var sourceMaterialType = state[/* materialType */0];
  return ReasonReactUtils$WonderEditor.sideEffects((function (param) {
                return Curry._3(changeMaterialType, /* tuple */[
                            uiState,
                            dispatchFunc
                          ], /* tuple */[
                            currentNodeId,
                            materialComponent
                          ], /* tuple */[
                            sourceMaterialType,
                            value
                          ]);
              }));
}

function render(param, param$1, renameFunc, param$2) {
  var send = param$2[/* send */3];
  var state = param$2[/* state */1];
  var materialComponent = param$1[2];
  var dispatchFunc = param[1];
  var uiState = param[0];
  var match = state[/* materialType */0];
  return React.createElement("article", {
              key: "MaterialInspector",
              className: "wonder-material-inspector"
            }, React.createElement("h1", undefined, DomHelper$WonderEditor.textEl("Material")), React.createElement("hr", undefined), ReasonReact.element(undefined, undefined, StringInput$WonderEditor.make(param$1[0], "Name", undefined, renameFunc, false, /* array */[])), ReasonReact.element(undefined, undefined, Select$WonderEditor.make("Type", MainEditorMaterialUtils$WonderEditor.getMaterialOptions(/* () */0), state[/* materialType */0], (function (value) {
                        return Curry._1(send, /* ChangeMaterialType */[value]);
                      }), /* array */[])), match ? ReasonReact.element(undefined, undefined, MainEditorLightMaterial$WonderEditor.make(uiState, dispatchFunc, materialComponent, /* array */[])) : ReasonReact.element(undefined, undefined, MainEditorBasicMaterial$WonderEditor.make(uiState, dispatchFunc, materialComponent, /* array */[])));
}

function make(uiState, dispatchFunc, currentNodeId, name, type_, materialComponent, renameFunc, _children) {
  var partial_arg = /* tuple */[
    currentNodeId,
    materialComponent
  ];
  var partial_arg$1 = /* tuple */[
    uiState,
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
                          uiState,
                          dispatchFunc
                        ], /* tuple */[
                          name,
                          type_,
                          materialComponent
                        ], renameFunc, self);
            }),
          /* initialState */(function (param) {
              return /* record */[/* materialType */type_];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param, param$1) {
              return reducer(partial_arg$1, partial_arg, param, param$1);
            }),
          /* jsElementWrapped */component[/* jsElementWrapped */13]
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
