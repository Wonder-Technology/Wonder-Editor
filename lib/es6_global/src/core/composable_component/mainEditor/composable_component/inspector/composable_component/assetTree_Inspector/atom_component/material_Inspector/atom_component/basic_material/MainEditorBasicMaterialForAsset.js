

import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ReasonReact from "../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Color$WonderEditor from "../../../../../../../../../../external/Color.js";
import * as ColorType$WonderEditor from "../../../../../../../../../../external/type/ColorType.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as StateInspectorEngineService$WonderEditor from "../../../../../../../../../../../service/state/inspectorEngine/StateInspectorEngineService.js";
import * as InspectorMaterialComponentUtils$WonderEditor from "../../../../../../utils/InspectorMaterialComponentUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as InspectorEngineMaterialChangeValueUtils$WonderEditor from "../../../../../sceneTree_Inspector/composable_component/renderGroup/material/utils/InspectorEngineMaterialChangeValueUtils.js";
import * as BasicMaterialCloseColorPickForAssetEventHandler$WonderEditor from "./eventHandler/BasicMaterialCloseColorPickForAssetEventHandler.js";

function changeColor(materialComponent, value) {
  var colorArray = Color$WonderEditor.getEngineColorRgbArr(ColorType$WonderEditor.convertColorObjToColorPickType(value));
  StateLogicService$WonderEditor.refreshEngineState(BasicMaterialEngineService$WonderEditor.setColor(colorArray, materialComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return StateLogicService$WonderEditor.refreshInspectorEngineState(InspectorEngineMaterialChangeValueUtils$WonderEditor.changeMaterialValue(colorArray, /* tuple */[
                  GameObjectComponentEngineService$WonderEditor.getBasicMaterialComponent,
                  BasicMaterialEngineService$WonderEditor.setColor
                ], StateEditorService$WonderEditor.getState(/* () */0), StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
}

var closeColorPick = BasicMaterialCloseColorPickForAssetEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1];

var Method = /* module */[
  /* changeColor */changeColor,
  /* closeColorPick */closeColorPick
];

var component = ReasonReact.statelessComponent("MainEditorBasicMaterialForAsset");

function render(reduxTuple, param, _self) {
  var materialComponent = param[0];
  return InspectorMaterialComponentUtils$WonderEditor.buildBasicMaterialComponent(materialComponent, /* tuple */[
              changeColor,
              Curry._2(closeColorPick, reduxTuple, /* tuple */[
                    materialComponent,
                    param[1]
                  ])
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
