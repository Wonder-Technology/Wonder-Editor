

import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ReasonReact from "../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Color$WonderEditor from "../../../../../../../../../../external/Color.js";
import * as ColorType$WonderEditor from "../../../../../../../../../../external/type/ColorType.js";
import * as ValueService$WonderEditor from "../../../../../../../../../../../service/atom/ValueService.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/LightMaterialEngineService.js";
import * as StateInspectorEngineService$WonderEditor from "../../../../../../../../../../../service/state/inspectorEngine/StateInspectorEngineService.js";
import * as InspectorMaterialComponentUtils$WonderEditor from "../../../../../../utils/InspectorMaterialComponentUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as InspectorEngineMaterialChangeValueUtils$WonderEditor from "../../../../../sceneTree_Inspector/composable_component/renderGroup/material/utils/InspectorEngineMaterialChangeValueUtils.js";
import * as LightMaterialDragTextureForAssetEventHandler$WonderEditor from "./eventHandler/LightMaterialDragTextureForAssetEventHandler.js";
import * as LightMaterialRemoveTextureForAssetEventHandler$WonderEditor from "./eventHandler/LightMaterialRemoveTextureForAssetEventHandler.js";
import * as LightMaterialShininessBlurForAssetEventHandler$WonderEditor from "./eventHandler/LightMaterialShininessBlurForAssetEventHandler.js";
import * as LightMaterialCloseColorPickForAssetEventHandler$WonderEditor from "./eventHandler/LightMaterialCloseColorPickForAssetEventHandler.js";

function changeColor(materialComponent, value) {
  var colorArray = Color$WonderEditor.getEngineColorRgbArr(ColorType$WonderEditor.convertColorObjToColorPickType(value));
  StateLogicService$WonderEditor.refreshEngineState(LightMaterialEngineService$WonderEditor.setLightMaterialDiffuseColor(colorArray, materialComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return StateLogicService$WonderEditor.refreshInspectorEngineState(InspectorEngineMaterialChangeValueUtils$WonderEditor.changeMaterialValue(colorArray, /* tuple */[
                  GameObjectComponentEngineService$WonderEditor.getLightMaterialComponent,
                  LightMaterialEngineService$WonderEditor.setLightMaterialDiffuseColor
                ], StateEditorService$WonderEditor.getState(/* () */0), StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
}

function changeShininess(materialComponent, value) {
  StateLogicService$WonderEditor.refreshEngineState(LightMaterialEngineService$WonderEditor.setLightMaterialShininess(value, materialComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return StateLogicService$WonderEditor.refreshInspectorEngineState(InspectorEngineMaterialChangeValueUtils$WonderEditor.changeMaterialValue(value, /* tuple */[
                  GameObjectComponentEngineService$WonderEditor.getLightMaterialComponent,
                  LightMaterialEngineService$WonderEditor.setLightMaterialShininess
                ], StateEditorService$WonderEditor.getState(/* () */0), StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
}

var closeColorPick = LightMaterialCloseColorPickForAssetEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1];

function blurShininessEvent(param, param$1, shininessValue) {
  var materialComponent = param$1[0];
  var match = ValueService$WonderEditor.isValueEqual(/* Float */1, shininessValue, StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
              return LightMaterialEngineService$WonderEditor.getLightMaterialShininess(materialComponent, param);
            })));
  if (match) {
    return /* () */0;
  } else {
    return Curry._3(LightMaterialShininessBlurForAssetEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1], /* tuple */[
                param[0],
                param[1]
              ], /* tuple */[
                materialComponent,
                param$1[1]
              ], shininessValue);
  }
}

var dragToSetLightMaterialTexture = LightMaterialDragTextureForAssetEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

function removeTexture(param, currentNodeId, materialComponent) {
  var match = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseMap(materialComponent, param);
        }));
  if (match !== undefined) {
    Curry._3(LightMaterialRemoveTextureForAssetEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
          param[0],
          param[1]
        ], currentNodeId, materialComponent);
  }
  return /* () */0;
}

var Method = /* module */[
  /* changeColor */changeColor,
  /* changeShininess */changeShininess,
  /* closeColorPick */closeColorPick,
  /* blurShininessEvent */blurShininessEvent,
  /* dragToSetLightMaterialTexture */dragToSetLightMaterialTexture,
  /* removeTexture */removeTexture
];

var component = ReasonReact.statelessComponent("MainEditorLightMaterialForAsset");

function render(reduxTuple, param, _self) {
  var currentNodeId = param[1];
  var materialComponent = param[0];
  var partial_arg = /* tuple */[
    materialComponent,
    currentNodeId
  ];
  return InspectorMaterialComponentUtils$WonderEditor.buildLightMaterialComponent(reduxTuple, materialComponent, /* tuple */[
              changeColor,
              changeShininess,
              Curry._2(closeColorPick, reduxTuple, /* tuple */[
                    materialComponent,
                    currentNodeId
                  ]),
              (function (param) {
                  return blurShininessEvent(reduxTuple, partial_arg, param);
                }),
              Curry._2(dragToSetLightMaterialTexture, reduxTuple, /* tuple */[
                    materialComponent,
                    currentNodeId
                  ]),
              (function (param) {
                  return removeTexture(reduxTuple, currentNodeId, param);
                })
            ]);
}

function make(uiState, dispatchFunc, materialComponent, currentNodeId, _children) {
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
                          materialComponent,
                          currentNodeId
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
