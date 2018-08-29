

import * as Curry from "../../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Color$WonderEditor from "../../../../../../../../../../../../external/Color.js";
import * as ColorType$WonderEditor from "../../../../../../../../../../../../external/type/ColorType.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as PickColorComponent$WonderEditor from "../../../../../../../../atom_component/PickColorComponent/ui/PickColorComponent.js";
import * as MainEditorMaterialMap$WonderEditor from "../../../atom_component/MainEditorMaterialMap.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../../../../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as BasicMaterialDragTextureEventHandler$WonderEditor from "../eventHandler/BasicMaterialDragTextureEventHandler.js";
import * as BasicMaterialRemoveTextureEventHandler$WonderEditor from "../eventHandler/BasicMaterialRemoveTextureEventHandler.js";
import * as BasicMaterialCloseColorPickEventHandler$WonderEditor from "../eventHandler/BasicMaterialCloseColorPickEventHandler.js";

var component = ReasonReact.statelessComponent("MainEditorBasicMaterial");

function getColor(materialComponent, _) {
  return Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                    return BasicMaterialEngineService$WonderEditor.getColor(materialComponent, param);
                  })));
}

function changeColor(materialComponent, value) {
  var partial_arg = Color$WonderEditor.getEngineColorRgbArr(ColorType$WonderEditor.convertColorObjToColorPickType(value));
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[materialComponent],
                /* type_ : BasicMaterial */4
              ]], (function (param, param$1) {
                return BasicMaterialEngineService$WonderEditor.setColor(partial_arg, param, param$1);
              }));
}

var closeColorPick = BasicMaterialCloseColorPickEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1];

var onDrop = BasicMaterialDragTextureEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

function removeTexture(param, _, materialComponent) {
  var match = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return BasicMaterialEngineService$WonderEditor.getMap(materialComponent, param);
        }));
  if (match !== undefined) {
    return Curry._3(BasicMaterialRemoveTextureEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
                param[0],
                param[1]
              ], /* () */0, materialComponent);
  } else {
    return /* () */0;
  }
}

var Method = /* module */[
  /* getColor */getColor,
  /* changeColor */changeColor,
  /* closeColorPick */closeColorPick,
  /* onDrop */onDrop,
  /* removeTexture */removeTexture
];

function render(param, materialComponent, _) {
  var dispatchFunc = param[1];
  var store = param[0];
  return React.createElement("article", {
              className: "wonder-basic-material"
            }, ReasonReact.element(undefined, undefined, PickColorComponent$WonderEditor.make("color : ", (function () {
                        return Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                          return BasicMaterialEngineService$WonderEditor.getColor(materialComponent, param);
                                        })));
                      }), (function (param) {
                        return changeColor(materialComponent, param);
                      }), Curry._2(closeColorPick, /* tuple */[
                          store,
                          dispatchFunc
                        ], materialComponent), /* array */[])), ReasonReact.element(undefined, undefined, MainEditorMaterialMap$WonderEditor.make(store, dispatchFunc, materialComponent, "map : ", BasicMaterialEngineService$WonderEditor.getMap, onDrop, removeTexture, /* array */[])));
}

function make(store, dispatchFunc, materialComponent, _) {
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
