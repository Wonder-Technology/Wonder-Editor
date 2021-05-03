

import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../external/DomHelper.js";
import * as LanguageUtils$WonderEditor from "../../../../../../../../../utils/language/LanguageUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as MainEditorCameraView$WonderEditor from "../atom_component/cameraView/ui/MainEditorCameraView.js";
import * as LanguageEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/LanguageEditorService.js";
import * as MainEditorCameraProjection$WonderEditor from "../atom_component/cameraProjection/ui/MainEditorCameraProjection.js";

var component = ReasonReact.statelessComponent("MainEditorCameraGroup");

function render(param, _self) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  return React.createElement("article", {
              key: "MainEditorCameraGroup",
              className: "wonder-camera-group"
            }, React.createElement("div", {
                  className: "inspector-component"
                }, React.createElement("div", {
                      className: "component-title",
                      title: LanguageUtils$WonderEditor.getInspectorLanguageDataByType("camera-view-describe", languageType)
                    }, DomHelper$WonderEditor.textEl("CameraView")), React.createElement("hr", undefined), React.createElement("div", {
                      className: "component-content"
                    }, ReasonReact.element(undefined, undefined, MainEditorCameraView$WonderEditor.make(uiState, dispatchFunc, /* array */[])))), React.createElement("div", {
                  className: "inspector-component"
                }, React.createElement("div", {
                      className: "component-title",
                      title: LanguageUtils$WonderEditor.getInspectorLanguageDataByType("camera-projection-describe", languageType)
                    }, DomHelper$WonderEditor.textEl("Projection")), React.createElement("hr", undefined), React.createElement("div", {
                      className: "component-content"
                    }, ReasonReact.element(undefined, undefined, MainEditorCameraProjection$WonderEditor.make(uiState, dispatchFunc, /* array */[])))));
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
  component ,
  render ,
  make ,
  
}
/* component Not a pure module */
