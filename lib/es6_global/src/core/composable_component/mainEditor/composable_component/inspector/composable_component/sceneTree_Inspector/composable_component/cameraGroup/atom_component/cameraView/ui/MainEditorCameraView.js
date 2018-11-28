

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Select$WonderEditor from "../../../../../../../../../../../atom_component/select/Select.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../../../external/DomHelper.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/scene/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/StateEngineService.js";
import * as GameViewEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/view/gameView/GameViewEditorService.js";
import * as MainEditorCameraViewUtils$WonderEditor from "../utils/MainEditorCameraViewUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/GameObjectComponentEngineService.js";
import * as CameraViewSetCurrentCameraEventHandler$WonderEditor from "../eventHandler/CameraViewSetCurrentCameraEventHandler.js";

function setCurrentCamera(param, basicCameraView, $$event) {
  var match = $$event.target.checked;
  if (match) {
    return Curry._3(CameraViewSetCurrentCameraEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
                param[0],
                param[1]
              ], /* () */0, basicCameraView);
  } else {
    return /* () */0;
  }
}

var Method = /* module */[/* setCurrentCamera */setCurrentCamera];

var component = ReasonReact.statelessComponent("MainEditorCameraView");

function render(param, _) {
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var currentGameObjectBasicCameraViewComponent = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode), engineState);
  var isCurrentCamera = GameViewEditorService$WonderEditor.isActiveBasicCameraView(currentGameObjectBasicCameraViewComponent, StateEditorService$WonderEditor.getState(/* () */0));
  var partial_arg_000 = param[0];
  var partial_arg_001 = param[1];
  var partial_arg = /* tuple */[
    partial_arg_000,
    partial_arg_001
  ];
  return React.createElement("article", {
              key: "MainEditorCameraView",
              className: "wonder-camera-view"
            }, ReasonReact.element(undefined, undefined, Select$WonderEditor.make("Type", MainEditorCameraViewUtils$WonderEditor.getCameraViewOptions(/* () */0), /* BasicCameraView */0, (function () {
                        return /* () */0;
                      }), /* array */[])), React.createElement("div", {
                  className: "inspector-item"
                }, React.createElement("div", {
                      className: "item-header"
                    }, DomHelper$WonderEditor.textEl("CurrentCamera")), React.createElement("div", {
                      className: "item-content"
                    }, React.createElement("input", {
                          defaultChecked: isCurrentCamera,
                          disabled: isCurrentCamera,
                          type: "checkbox",
                          onClick: (function (param) {
                              return setCurrentCamera(partial_arg, currentGameObjectBasicCameraViewComponent, param);
                            })
                        }))));
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
