

import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Console$WonderEditor from "../../../../../../../../../external/Console.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../external/DomHelper.js";
import * as ImgCanvasUtils$WonderEditor from "../../../../../../../../../utils/canvas/ImgCanvasUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as InspectorCanvasUtils$WonderEditor from "../../../utils/InspectorCanvasUtils.js";
import * as WDBInspectorEngineUtils$WonderEditor from "../utils/WDBInspectorEngineUtils.js";
import * as StateInspectorEngineService$WonderEditor from "../../../../../../../../../../service/state/inspectorEngine/StateInspectorEngineService.js";

function didMount(currentNodeId, wdbGameObject, dispatchFunc) {
  InspectorCanvasUtils$WonderEditor.showInspectorCanvas(/* () */0);
  return Curry._2(Console$WonderEditor.tryCatch, (function (param) {
                var match = WDBInspectorEngineUtils$WonderEditor.createWDBIntoInspectorCanvas(wdbGameObject, StateEditorService$WonderEditor.getState(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0), StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0));
                StateEditorService$WonderEditor.setState(match[1]);
                StateLogicService$WonderEditor.refreshInspectorEngineState(InspectorCanvasUtils$WonderEditor.restoreArcballCameraControllerAngle(WDBInspectorEngineUtils$WonderEditor.setCameraFocusWDBGameObject(match[0], match[2])));
                return InspectorCanvasUtils$WonderEditor.updateSnapshot(currentNodeId, /* tuple */[
                            ImgCanvasUtils$WonderEditor.clipTargetCanvasSnapshotAndSetToImageDataMapByWDBNodeId,
                            dispatchFunc
                          ]);
              }), (function (e) {
                Console$WonderEditor.throwFatal(e);
                return /* () */0;
              }));
}

function willUnmount(param) {
  InspectorCanvasUtils$WonderEditor.hideInspectorCanvas(/* () */0);
  StateInspectorEngineService$WonderEditor.setState(InspectorCanvasUtils$WonderEditor.setCameraDefaultDistance(InspectorCanvasUtils$WonderEditor.disposeContainerGameObjectAllChildrenAndReallocateCPUMemory(/* tuple */[
                StateEditorService$WonderEditor.getState(/* () */0),
                StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)
              ])));
  return /* () */0;
}

var Method = /* module */[
  /* didMount */didMount,
  /* willUnmount */willUnmount
];

var component = ReasonReact.statelessComponent("WDBInspector");

function render(name, param, _self) {
  return React.createElement("article", {
              className: "inspector-asset-wdb"
            }, React.createElement("h1", undefined, DomHelper$WonderEditor.textEl("Model")), React.createElement("hr", undefined), React.createElement("div", {
                  className: "inspector-item"
                }, React.createElement("div", {
                      className: "item-header"
                    }, DomHelper$WonderEditor.textEl("Name:")), React.createElement("div", {
                      className: "item-content"
                    }, React.createElement("input", {
                          className: "input-component float-input",
                          type: "text",
                          value: name,
                          onBlur: param[1],
                          onChange: param[0]
                        }))));
}

function make(dispatchFunc, name, onChangeFunc, onBlurFunc, currentNodeId, wdbGameObject, _children) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */(function (_self) {
              return didMount(currentNodeId, wdbGameObject, dispatchFunc);
            }),
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */(function (_self) {
              return willUnmount(/* () */0);
            }),
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (_self) {
              return render(name, /* tuple */[
                          onChangeFunc,
                          onBlurFunc
                        ], _self);
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
