

import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Select$WonderEditor from "../../../../../../../../../atom_component/select/Select.js";
import * as Console$WonderEditor from "../../../../../../../../../external/Console.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../external/DomHelper.js";
import * as StringInput$WonderEditor from "../../../../../../../../../atom_component/stringInput/StringInput.js";
import * as LanguageUtils$WonderEditor from "../../../../../../../../../utils/language/LanguageUtils.js";
import * as ImgCanvasUtils$WonderEditor from "../../../../../../../../../utils/canvas/ImgCanvasUtils.js";
import * as ReasonReactUtils$WonderEditor from "../../../../../../../../../utils/ui/ReasonReactUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as InspectorCanvasUtils$WonderEditor from "../../../utils/InspectorCanvasUtils.js";
import * as LanguageEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/LanguageEditorService.js";
import * as MainEditorMaterialUtils$WonderEditor from "../../../../sceneTree_Inspector/composable_component/renderGroup/material/utils/MainEditorMaterialUtils.js";
import * as StateInspectorEngineService$WonderEditor from "../../../../../../../../../../service/state/inspectorEngine/StateInspectorEngineService.js";
import * as MaterialInspectorEngineUtils$WonderEditor from "../utils/MaterialInspectorEngineUtils.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as MainEditorBasicMaterialForAsset$WonderEditor from "../atom_component/basic_material/MainEditorBasicMaterialForAsset.js";
import * as MainEditorLightMaterialForAsset$WonderEditor from "../atom_component/light_material/MainEditorLightMaterialForAsset.js";
import * as InspectorChangeMaterialTypeEventHandler$WonderEditor from "../eventHandler/InspectorChangeMaterialTypeEventHandler.js";
import * as MaterialSphereInspectorCanvasEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/inspectorCanvas/MaterialSphereInspectorCanvasEditorService.js";

var changeMaterialType = InspectorChangeMaterialTypeEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

function didMount(type_, materialComponent) {
  InspectorCanvasUtils$WonderEditor.showInspectorCanvas(/* () */0);
  return Curry._2(Console$WonderEditor.tryCatch, (function (param) {
                var match = MaterialInspectorEngineUtils$WonderEditor.createMaterialSphereIntoInspectorCanvas(type_, materialComponent, StateEditorService$WonderEditor.getState(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0), StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0));
                var match$1 = match[1];
                StateEditorService$WonderEditor.setState(MaterialSphereInspectorCanvasEditorService$WonderEditor.setMaterialSphereGameObjectInInspectorCanvas(match$1[1], match[0]));
                return StateLogicService$WonderEditor.refreshInspectorEngineState(match$1[0]);
              }), (function (e) {
                Console$WonderEditor.throwFatal(e);
                return /* () */0;
              }));
}

function _doesUpdateSnapshot(currentNodeId, param) {
  var editorState = param[0];
  if (OperateTreeAssetEditorService$WonderEditor.isNodeExistById(currentNodeId, editorState)) {
    return MaterialSphereInspectorCanvasEditorService$WonderEditor.isExistInContainer(editorState, param[1]);
  } else {
    return false;
  }
}

function willUnmount(currentNodeId, dispatchFunc) {
  StateLogicService$WonderEditor.refreshInspectorEngineState(StateLogicService$WonderEditor.getInspectorEngineStateToGetData(InspectorCanvasUtils$WonderEditor.restoreArcballCameraControllerAngle));
  InspectorCanvasUtils$WonderEditor.hideInspectorCanvas(/* () */0);
  var match = _doesUpdateSnapshot(currentNodeId, /* tuple */[
        StateEditorService$WonderEditor.getState(/* () */0),
        StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)
      ]);
  if (match) {
    InspectorCanvasUtils$WonderEditor.updateSnapshot(currentNodeId, /* tuple */[
          ImgCanvasUtils$WonderEditor.clipTargetCanvasSnapshotAndSetToImageDataMapByMaterialNodeId,
          dispatchFunc
        ]);
  }
  StateInspectorEngineService$WonderEditor.setState(InspectorCanvasUtils$WonderEditor.disposeContainerGameObjectAllChildrenAndReallocateCPUMemory(/* tuple */[
            StateEditorService$WonderEditor.getState(/* () */0),
            StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)
          ]));
  return StateLogicService$WonderEditor.getAndSetEditorState(MaterialSphereInspectorCanvasEditorService$WonderEditor.removeMaterialSphereGameObjectInInspectorCanvas);
}

var Method = /* module */[
  /* changeMaterialType */changeMaterialType,
  /* didMount */didMount,
  /* _doesUpdateSnapshot */_doesUpdateSnapshot,
  /* willUnmount */willUnmount
];

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
  var materialComponent = param$1[3];
  var currentNodeId = param$1[2];
  var dispatchFunc = param[1];
  var uiState = param[0];
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  var match = state[/* materialType */0];
  return React.createElement("article", {
              key: "MaterialInspector",
              className: "wonder-material-inspector"
            }, React.createElement("h1", undefined, DomHelper$WonderEditor.textEl("Material")), React.createElement("hr", undefined), ReasonReact.element(undefined, undefined, StringInput$WonderEditor.make(param$1[0], "Name", LanguageUtils$WonderEditor.getInspectorLanguageDataByType("material-name-describe", languageType), undefined, renameFunc, false, /* array */[])), ReasonReact.element(undefined, undefined, Select$WonderEditor.make("Type", MainEditorMaterialUtils$WonderEditor.getMaterialOptions(/* () */0), state[/* materialType */0], (function (value) {
                        return Curry._1(send, /* ChangeMaterialType */[value]);
                      }), LanguageUtils$WonderEditor.getInspectorLanguageDataByType("material-type-describe", languageType), /* array */[])), match ? ReasonReact.element(undefined, undefined, MainEditorLightMaterialForAsset$WonderEditor.make(uiState, dispatchFunc, materialComponent, currentNodeId, /* array */[])) : ReasonReact.element(undefined, undefined, MainEditorBasicMaterialForAsset$WonderEditor.make(uiState, dispatchFunc, materialComponent, currentNodeId, /* array */[])));
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
          /* didMount */(function (_self) {
              return didMount(type_, materialComponent);
            }),
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */(function (_self) {
              return willUnmount(currentNodeId, dispatchFunc);
            }),
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(/* tuple */[
                          uiState,
                          dispatchFunc
                        ], /* tuple */[
                          name,
                          type_,
                          currentNodeId,
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
