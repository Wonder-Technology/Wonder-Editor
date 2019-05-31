

import * as Curry from "../../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ReasonReact from "../../../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Color$WonderEditor from "../../../../../../../../../../../../external/Color.js";
import * as ColorType$WonderEditor from "../../../../../../../../../../../../external/type/ColorType.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../../../../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as InspectorMaterialComponentUtils$WonderEditor from "../../../../../../../../utils/InspectorMaterialComponentUtils.js";
import * as BasicMaterialCloseColorPickForGameObjectEventHandler$WonderEditor from "../eventHandler/BasicMaterialCloseColorPickForGameObjectEventHandler.js";

var component = ReasonReact.statelessComponent("MainEditorBasicMaterialForGameObject");

function changeColor(materialComponent, value) {
  var colorArray = Color$WonderEditor.getEngineColorRgbArr(ColorType$WonderEditor.convertColorObjToColorPickType(value));
  return StateLogicService$WonderEditor.refreshEngineState(BasicMaterialEngineService$WonderEditor.setColor(colorArray, materialComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
}

var closeColorPick = BasicMaterialCloseColorPickForGameObjectEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1];

var Method = /* module */[
  /* changeColor */changeColor,
  /* closeColorPick */closeColorPick
];

function render(reduxTuple, materialComponent, _self) {
  return InspectorMaterialComponentUtils$WonderEditor.buildBasicMaterialComponent(materialComponent, /* tuple */[
              changeColor,
              Curry._2(closeColorPick, reduxTuple, materialComponent)
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
  component ,
  Method ,
  render ,
  make ,
  
}
/* component Not a pure module */
