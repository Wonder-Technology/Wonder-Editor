

import * as Block from "../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Color$WonderEditor from "../../../external/Color.js";
import * as ColorType$WonderEditor from "../../../external/type/ColorType.js";
import * as DomHelper$WonderEditor from "../../../external/DomHelper.js";
import * as ControllerUtils$WonderEditor from "../../../utils/controller/ControllerUtils.js";
import * as StateLogicService$WonderEditor from "../../../../service/stateTuple/logic/StateLogicService.js";
import * as PickColorComponent$WonderEditor from "../../mainEditor/composable_component/inspector/atom_component/PickColorComponent/ui/PickColorComponent.js";
import * as SceneEngineService$WonderEditor from "../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../service/state/editor/StateEditorService.js";
import * as ControllerAmbientLightCloseColorPickEventHandler$WonderEditor from "../eventHandler/ControllerAmbientLightCloseColorPickEventHandler.js";

function changeColor(value) {
  var partial_arg = Color$WonderEditor.getEngineColorRgbArr(ColorType$WonderEditor.convertColorObjToColorPickType(value));
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param) {
                return SceneEngineService$WonderEditor.setAmbientLightColor(partial_arg, param);
              }));
}

function getColor() {
  return Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getAmbientLightColor));
}

var closeColorPick = ControllerAmbientLightCloseColorPickEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1];

function buildAmbientLightComponent(store, dispatchFunc) {
  return React.createElement("div", {
              className: "header-item"
            }, React.createElement("div", {
                  className: "component-item"
                }, ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, PickColorComponent$WonderEditor.make("Ambient Color : ", getColor, changeColor, Curry._2(closeColorPick, /* tuple */[
                              store,
                              dispatchFunc
                            ], /* () */0), /* array */[]))));
}

var Method = /* module */[
  /* changeColor */changeColor,
  /* getColor */getColor,
  /* closeColorPick */closeColorPick,
  /* buildAmbientLightComponent */buildAmbientLightComponent
];

var component = ReasonReact.reducerComponent("Controller");

function reducer(_, state) {
  return /* Update */Block.__(0, [/* record */[/* isReload */!state[/* isReload */0]]]);
}

function render(store, dispatchFunc, param) {
  var send = param[/* send */3];
  var match = StateEditorService$WonderEditor.getIsRun(/* () */0);
  return React.createElement("article", {
              key: "header",
              className: "wonder-controller-component"
            }, React.createElement("div", {
                  className: "header-controller"
                }, React.createElement("div", {
                      className: "controller-transform"
                    }, buildAmbientLightComponent(store, dispatchFunc)), React.createElement("div", {
                      className: "controller-runAndStop",
                      onClick: (function () {
                          var match = StateEditorService$WonderEditor.getIsRun(/* () */0);
                          if (match) {
                            ControllerUtils$WonderEditor.stop(dispatchFunc);
                          } else {
                            ControllerUtils$WonderEditor.run(store);
                          }
                          return Curry._1(send, /* Reload */0);
                        })
                    }, match ? React.createElement("img", {
                            src: "./public/img/stop.png"
                          }) : React.createElement("img", {
                            src: "./public/img/run.png"
                          })), React.createElement("div", {
                      className: "controller-other"
                    })));
}

function make(store, dispatchFunc, _) {
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
              return render(store, dispatchFunc, self);
            }),
          /* initialState */(function () {
              return /* record */[/* isReload */false];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */reducer,
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
