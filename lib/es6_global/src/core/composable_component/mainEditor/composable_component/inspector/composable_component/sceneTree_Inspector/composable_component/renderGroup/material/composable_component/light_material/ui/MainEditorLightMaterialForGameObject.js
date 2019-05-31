

import * as Curry from "../../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ReasonReact from "../../../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Color$WonderEditor from "../../../../../../../../../../../../external/Color.js";
import * as ColorType$WonderEditor from "../../../../../../../../../../../../external/type/ColorType.js";
import * as ValueService$WonderEditor from "../../../../../../../../../../../../../service/atom/ValueService.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../../../../../../../../../service/state/engine/LightMaterialEngineService.js";
import * as InspectorMaterialComponentUtils$WonderEditor from "../../../../../../../../utils/InspectorMaterialComponentUtils.js";
import * as LightMaterialDragTextureForGameObjectEventHandler$WonderEditor from "../eventHandler/LightMaterialDragTextureForGameObjectEventHandler.js";
import * as LightMaterialRemoveTextureForGameObjectEventHandler$WonderEditor from "../eventHandler/LightMaterialRemoveTextureForGameObjectEventHandler.js";
import * as LightMaterialShininessBlurForGameObjectEventHandler$WonderEditor from "../eventHandler/LightMaterialShininessBlurForGameObjectEventHandler.js";
import * as LightMaterialCloseColorPickForGameObjectEventHandler$WonderEditor from "../eventHandler/LightMaterialCloseColorPickForGameObjectEventHandler.js";

function changeColor(materialComponent, value) {
  var colorArray = Color$WonderEditor.getEngineColorRgbArr(ColorType$WonderEditor.convertColorObjToColorPickType(value));
  return StateLogicService$WonderEditor.refreshEngineState(LightMaterialEngineService$WonderEditor.setLightMaterialDiffuseColor(colorArray, materialComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
}

function changeShininess(materialComponent, value) {
  return StateLogicService$WonderEditor.refreshEngineState(LightMaterialEngineService$WonderEditor.setLightMaterialShininess(value, materialComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
}

var closeColorPick = LightMaterialCloseColorPickForGameObjectEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1];

function blurShininessEvent(param, materialComponent, shininessValue) {
  var match = ValueService$WonderEditor.isValueEqual(/* Float */1, shininessValue, StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
              return LightMaterialEngineService$WonderEditor.getLightMaterialShininess(materialComponent, param);
            })));
  if (match) {
    return /* () */0;
  } else {
    return Curry._3(LightMaterialShininessBlurForGameObjectEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1], /* tuple */[
                param[0],
                param[1]
              ], materialComponent, shininessValue);
  }
}

var dragToSetLightMaterialTexture = LightMaterialDragTextureForGameObjectEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

function removeTexture(param, param$1, materialComponent) {
  var match = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseMap(materialComponent, param);
        }));
  if (match !== undefined) {
    return Curry._3(LightMaterialRemoveTextureForGameObjectEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
                param[0],
                param[1]
              ], /* () */0, materialComponent);
  } else {
    return /* () */0;
  }
}

var Method = /* module */[
  /* changeColor */changeColor,
  /* changeShininess */changeShininess,
  /* closeColorPick */closeColorPick,
  /* blurShininessEvent */blurShininessEvent,
  /* dragToSetLightMaterialTexture */dragToSetLightMaterialTexture,
  /* removeTexture */removeTexture
];

var component = ReasonReact.statelessComponent("MainEditorLightMaterialForGameObject");

function render(reduxTuple, materialComponent, _self) {
  return InspectorMaterialComponentUtils$WonderEditor.buildLightMaterialComponent(reduxTuple, materialComponent, /* tuple */[
              changeColor,
              changeShininess,
              Curry._2(closeColorPick, reduxTuple, materialComponent),
              (function (param) {
                  return blurShininessEvent(reduxTuple, materialComponent, param);
                }),
              Curry._2(dragToSetLightMaterialTexture, reduxTuple, materialComponent),
              (function (param) {
                  return removeTexture(reduxTuple, /* () */0, param);
                })
            ]);
}

function make(uiState, dispatchFunc, materialComponent, _children) {
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
                        ], materialComponent, self);
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
