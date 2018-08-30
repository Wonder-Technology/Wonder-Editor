

import * as Block from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Js_option from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as ReasonReact from "../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../../external/DomHelper.js";
import * as DragUtils$WonderEditor from "../../../../../../../../../../atom_component/dragTree/utils/DragUtils.js";
import * as AssetUtils$WonderEditor from "../../../../../../../bottom_components/asset/utils/AssetUtils.js";
import * as ReactUtils$WonderEditor from "../../../../../../../../../../utils/ui/ReactUtils.js";
import * as ReasonReactUtils$WonderEditor from "../../../../../../../../../../utils/ui/ReasonReactUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as CurrentDragSourceEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/CurrentDragSourceEditorService.js";
import * as AssetImageBase64MapEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/AssetImageBase64MapEditorService.js";
import * as AssetTextureNodeMapEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/AssetTextureNodeMapEditorService.js";

function isWidge(startWidge) {
  if (startWidge !== undefined) {
    return startWidge === AssetUtils$WonderEditor.getWidge(/* () */0);
  } else {
    return false;
  }
}

function isTypeValid(startId, editorState) {
  if (startId !== undefined) {
    return Js_option.isSome(SparseMapService$WonderCommonlib.get(startId, AssetTextureNodeMapEditorService$WonderEditor.getTextureNodeMap(editorState)));
  } else {
    return false;
  }
}

function _isTriggerAction(isWidgeFunc, isTypeValidFunc) {
  var match = CurrentDragSourceEditorService$WonderEditor.getCurrentDragSource(StateEditorService$WonderEditor.getState(/* () */0));
  if (Curry._1(isWidgeFunc, match[0])) {
    return Curry._2(isTypeValidFunc, match[1], StateEditorService$WonderEditor.getState(/* () */0));
  } else {
    return false;
  }
}

function handleDragEnter(isWidgeFunc, isTypeValidFunc, _) {
  var match = _isTriggerAction(isWidgeFunc, isTypeValidFunc);
  if (match) {
    return /* DragEnter */1;
  } else {
    return /* Nothing */0;
  }
}

function handleDragLeave(isWidgeFunc, isTypeValidFunc, $$event) {
  DomHelper$WonderEditor.stopPropagation($$event);
  var match = _isTriggerAction(isWidgeFunc, isTypeValidFunc);
  if (match) {
    return /* DragLeave */2;
  } else {
    return /* Nothing */0;
  }
}

var handleDragOver = DomHelper$WonderEditor.preventDefault;

function handleDrop(isWidgeFunc, isTypeValidFunc, $$event) {
  var startId = DragUtils$WonderEditor.getDragedUid($$event);
  var match = _isTriggerAction(isWidgeFunc, isTypeValidFunc);
  if (match) {
    return /* DragDrop */[startId];
  } else {
    return /* DragLeave */2;
  }
}

function showMapComponent(materialComponent, getMapFunc) {
  var match = StateLogicService$WonderEditor.getEngineStateToGetData(Curry._1(getMapFunc, materialComponent));
  if (match !== undefined) {
    return React.createElement("img", {
                src: SparseMapService$WonderCommonlib.unsafeGet(match, AssetImageBase64MapEditorService$WonderEditor.getImageBase64Map(StateEditorService$WonderEditor.getState(/* () */0)))
              });
  } else {
    return React.createElement("img", {
                src: "./public/img/null.jpg"
              });
  }
}

function buildDragDiv(state, send) {
  return React.createElement("div", {
              className: "texture_ground",
              style: state[/* style */0],
              onDragEnter: (function (_e) {
                  return Curry._1(send, handleDragEnter(isWidge, isTypeValid, _e));
                }),
              onDragLeave: (function (_e) {
                  return Curry._1(send, handleDragLeave(isWidge, isTypeValid, _e));
                }),
              onDragOver: handleDragOver,
              onDrop: (function (_e) {
                  return Curry._1(send, handleDrop(isWidge, isTypeValid, _e));
                })
            });
}

var Method = /* module */[
  /* isWidge */isWidge,
  /* isTypeValid */isTypeValid,
  /* _isTriggerAction */_isTriggerAction,
  /* handleDragEnter */handleDragEnter,
  /* handleDragLeave */handleDragLeave,
  /* handleDragOver */handleDragOver,
  /* handleDrop */handleDrop,
  /* showMapComponent */showMapComponent,
  /* buildDragDiv */buildDragDiv
];

var component = ReasonReact.reducerComponent("MainEditorMaterialMap");

function reducer(param, param$1, action, state) {
  var onDropFunc = param$1[1];
  var materialComponent = param$1[0];
  var dispatchFunc = param[1];
  var store = param[0];
  if (typeof action === "number") {
    switch (action) {
      case 0 : 
          return /* NoUpdate */0;
      case 1 : 
          return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("border", "2px dashed blue", state[/* style */0])]]);
      case 2 : 
          return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("border", "1px solid red", state[/* style */0])]]);
      
    }
  } else {
    var startId = action[0];
    return ReasonReactUtils$WonderEditor.sideEffects((function () {
                  return Curry._3(onDropFunc, /* tuple */[
                              store,
                              dispatchFunc
                            ], materialComponent, startId);
                }));
  }
}

function render(param, param$1, param$2, param$3) {
  var removeTextureFunc = param$2[1];
  var materialComponent = param$1[0];
  var dispatchFunc = param[1];
  var store = param[0];
  return React.createElement("article", {
              className: "wonder-material-texture"
            }, buildDragDiv(param$3[/* state */1], param$3[/* send */3]), React.createElement("span", {
                  className: ""
                }, DomHelper$WonderEditor.textEl(param$1[1])), showMapComponent(materialComponent, param$2[0]), React.createElement("button", {
                  className: "texture_remove",
                  onClick: (function () {
                      return Curry._3(removeTextureFunc, /* tuple */[
                                  store,
                                  dispatchFunc
                                ], /* () */0, materialComponent);
                    })
                }, DomHelper$WonderEditor.textEl("remove")));
}

function make(store, dispatchFunc, materialComponent, label, getMapFunc, onDropFunc, removeTextureFunc, _) {
  var partial_arg = /* tuple */[
    materialComponent,
    onDropFunc
  ];
  var partial_arg$1 = /* tuple */[
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
                        ], /* tuple */[
                          materialComponent,
                          label
                        ], /* tuple */[
                          getMapFunc,
                          removeTextureFunc
                        ], self);
            }),
          /* initialState */(function () {
              return /* record */[/* style */{
                        opacity: "1"
                      }];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param, param$1) {
              return reducer(partial_arg$1, partial_arg, param, param$1);
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
