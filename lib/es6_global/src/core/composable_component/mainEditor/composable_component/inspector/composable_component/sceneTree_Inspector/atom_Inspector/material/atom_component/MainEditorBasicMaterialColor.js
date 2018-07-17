

import * as Block from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Color$WonderEditor from "../../../../../../../../../external/Color.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../external/DomHelper.js";
import * as ReactColor$WonderEditor from "../../../../../../../../../external/ReactColor.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as MaterialSetColorEventHandler$WonderEditor from "../ui/eventHandler/MaterialSetColorEventHandler.js";

function changeColor(materialComponent, value) {
  var partial_arg = Color$WonderEditor.getEngineColorRgbArr(Color$WonderEditor.convertColorObjToColorPickType(value));
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[materialComponent],
                /* type_ : Material */2
              ]], (function (param, param$1) {
                return BasicMaterialEngineService$WonderEditor.setColor(partial_arg, param, param$1);
              }));
}

var closeColorPick = MaterialSetColorEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1];

var Method = /* module */[
  /* changeColor */changeColor,
  /* closeColorPick */closeColorPick
];

var component = ReasonReact.reducerComponent("MainEditorBasicMaterialColor");

function reducer(param, materialComponent, _, state) {
  var match = state[/* isShowColorPick */1];
  if (match) {
    Curry._3(closeColorPick, /* tuple */[
          param[0],
          param[1]
        ], materialComponent, state[/* colorHex */0]);
    return /* Update */Block.__(0, [/* record */[
                /* colorHex */Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                            return BasicMaterialEngineService$WonderEditor.getColor(materialComponent, param);
                          }))),
                /* isShowColorPick */false
              ]]);
  } else {
    return /* Update */Block.__(0, [/* record */[
                /* colorHex */state[/* colorHex */0],
                /* isShowColorPick */true
              ]]);
  }
}

function render(_, materialComponent, param) {
  var send = param[/* send */3];
  var state = param[/* state */1];
  var match = state[/* isShowColorPick */1];
  return React.createElement("article", {
              className: "wonder-material-color"
            }, React.createElement("div", {
                  className: ""
                }, React.createElement("span", {
                      className: ""
                    }, DomHelper$WonderEditor.textEl("color : ")), React.createElement("span", {
                      className: ""
                    }, DomHelper$WonderEditor.textEl(state[/* colorHex */0])), React.createElement("button", {
                      className: "",
                      onClick: (function () {
                          return Curry._1(send, /* ToggleShowColorPick */0);
                        })
                    }, DomHelper$WonderEditor.textEl("pick color")), match ? React.createElement("div", {
                        className: "color-pick-item"
                      }, ReasonReact.element(/* None */0, /* None */0, ReactColor$WonderEditor.Sketch[/* make */0](/* Some */[state[/* colorHex */0]], /* Some */[(function (value, _) {
                                    return changeColor(materialComponent, value);
                                  })], /* array */[]))) : null));
}

function make(store, dispatchFunc, materialComponent, _) {
  var partial_arg = /* tuple */[
    store,
    dispatchFunc
  ];
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
          /* initialState */(function () {
              return /* record */[
                      /* colorHex */Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                  return BasicMaterialEngineService$WonderEditor.getColor(materialComponent, param);
                                }))),
                      /* isShowColorPick */false
                    ];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param, param$1) {
              return reducer(partial_arg, materialComponent, param, param$1);
            }),
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
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
