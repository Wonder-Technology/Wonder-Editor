

import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Select$WonderEditor from "../../../../../../../../../../atom_component/select/Select.js";
import * as ReasonReactUtils$WonderEditor from "../../../../../../../../../../utils/ui/ReasonReactUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/scene/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as MeshRendererEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/MeshRendererEngineService.js";
import * as MainEditorMeshRendererUtils$WonderEditor from "../util/MainEditorMeshRendererUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/GameObjectComponentEngineService.js";
import * as MeshRendererChangeModeEventHandler$WonderEditor from "../eventHandler/MeshRendererChangeModeEventHandler.js";

var changeMode = MeshRendererChangeModeEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var Method = /* module */[/* changeMode */changeMode];

var component = ReasonReact.reducerComponent("MainEditorMeshRenderer");

function reducer(param, action, state) {
  var dispatchFunc = param[1];
  var store = param[0];
  return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
              /* drawMode */action[0],
              /* meshRenderer */state[/* meshRenderer */1]
            ], (function (state) {
                return Curry._3(changeMode, /* tuple */[
                            store,
                            dispatchFunc
                          ], state[/* meshRenderer */1], state[/* drawMode */0]);
              }));
}

function render(_, param) {
  var send = param[/* send */3];
  return React.createElement("article", {
              key: "MainEditorMeshRenderer",
              className: "wonder-mesh-renderer"
            }, React.createElement("div", {
                  className: ""
                }, ReasonReact.element(undefined, undefined, Select$WonderEditor.make("draw mode", MainEditorMeshRendererUtils$WonderEditor.getDrawModeOptions(/* () */0), param[/* state */1][/* drawMode */0], (function (value) {
                            return Curry._1(send, /* ChangeMode */[value]);
                          }), /* array */[]))));
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
              var engineState = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
              var meshRenderer = GameObjectComponentEngineService$WonderEditor.getMeshRendererComponent(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(StateEditorService$WonderEditor.getState(/* () */0)), engineState);
              return /* record */[
                      /* drawMode */MeshRendererEngineService$WonderEditor.getDrawMode(meshRenderer, engineState),
                      /* meshRenderer */meshRenderer
                    ];
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
