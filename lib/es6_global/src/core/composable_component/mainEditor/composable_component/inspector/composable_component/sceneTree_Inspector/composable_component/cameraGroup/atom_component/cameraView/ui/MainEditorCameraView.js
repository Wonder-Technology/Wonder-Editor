

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Select$WonderEditor from "../../../../../../../../../../../atom_component/select/Select.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../../../external/DomHelper.js";
import * as LanguageUtils$WonderEditor from "../../../../../../../../../../../utils/language/LanguageUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as GameViewEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/view/gameView/GameViewEditorService.js";
import * as LanguageEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/LanguageEditorService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as MainEditorCameraViewUtils$WonderEditor from "../utils/MainEditorCameraViewUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
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

function render(param, _self) {
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var currentSceneTreeNodeBasicCameraViewComponent = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode), engineState);
  var isCurrentCamera = GameViewEditorService$WonderEditor.isActiveBasicCameraView(currentSceneTreeNodeBasicCameraViewComponent, StateEditorService$WonderEditor.getState(/* () */0));
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  var partial_arg_000 = param[0];
  var partial_arg_001 = param[1];
  var partial_arg = /* tuple */[
    partial_arg_000,
    partial_arg_001
  ];
  return React.createElement("article", {
              key: "MainEditorCameraView",
              className: "wonder-camera-view"
            }, ReasonReact.element(undefined, undefined, Select$WonderEditor.make("Type", MainEditorCameraViewUtils$WonderEditor.getCameraViewOptions(/* () */0), /* BasicCameraView */0, (function (value) {
                        return /* () */0;
                      }), LanguageUtils$WonderEditor.getInspectorLanguageDataByType("view-type-describe", languageType), /* array */[])), React.createElement("div", {
                  className: "inspector-item"
                }, React.createElement("div", {
                      className: "item-header",
                      title: LanguageUtils$WonderEditor.getInspectorLanguageDataByType("current-camera-describe", languageType)
                    }, DomHelper$WonderEditor.textEl("CurrentCamera")), React.createElement("div", {
                      className: "item-content"
                    }, React.createElement("input", {
                          defaultChecked: isCurrentCamera,
                          disabled: isCurrentCamera,
                          type: "checkbox",
                          onClick: (function (param) {
                              return setCurrentCamera(partial_arg, currentSceneTreeNodeBasicCameraViewComponent, param);
                            })
                        }))));
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
