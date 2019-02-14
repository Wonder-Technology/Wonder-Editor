

import * as Curry from "../../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Color$WonderEditor from "../../../../../../../../../../../../external/Color.js";
import * as ColorType$WonderEditor from "../../../../../../../../../../../../external/type/ColorType.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as PickColorComponent$WonderEditor from "../../../../../../../../atom_component/PickColorComponent/ui/PickColorComponent.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../../../../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as BasicMaterialCloseColorPickEventHandler$WonderEditor from "../eventHandler/BasicMaterialCloseColorPickEventHandler.js";

var component = ReasonReact.statelessComponent("MainEditorBasicMaterial");

function getColor(materialComponent, _) {
  return Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                    return BasicMaterialEngineService$WonderEditor.getColor(materialComponent, param);
                  })));
}

function changeColor(materialComponent, value) {
  var __x = Color$WonderEditor.getEngineColorRgbArr(ColorType$WonderEditor.convertColorObjToColorPickType(value));
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param) {
                return BasicMaterialEngineService$WonderEditor.setColor(__x, materialComponent, param);
              }));
}

var closeColorPick = BasicMaterialCloseColorPickEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1];

var Method = /* module */[
  /* getColor */getColor,
  /* changeColor */changeColor,
  /* closeColorPick */closeColorPick
];

function render(param, materialComponent, _) {
  return React.createElement("article", {
              className: "wonder-basic-material"
            }, ReasonReact.element(undefined, undefined, PickColorComponent$WonderEditor.make("Color", (function () {
                        return Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                          return BasicMaterialEngineService$WonderEditor.getColor(materialComponent, param);
                                        })));
                      }), (function (param) {
                        return changeColor(materialComponent, param);
                      }), Curry._2(closeColorPick, /* tuple */[
                          param[0],
                          param[1]
                        ], materialComponent), /* array */[])));
}

function make(uiState, dispatchFunc, materialComponent, _) {
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
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  component ,
  Method ,
  render ,
  make ,
  
}
/* component Not a pure module */
