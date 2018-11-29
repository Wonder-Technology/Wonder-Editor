

import * as Block from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Js_option from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as ReasonReact from "../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../../external/DomHelper.js";
import * as DragUtils$WonderEditor from "../../../../../../../../../../atom_component/dragTree/utils/DragUtils.js";
import * as AssetUtils$WonderEditor from "../../../../../../../bottom_components/composable_component/project/composable_component/asset/utils/AssetUtils.js";
import * as ReactUtils$WonderEditor from "../../../../../../../../../../utils/ui/ReactUtils.js";
import * as ReasonReactUtils$WonderEditor from "../../../../../../../../../../utils/ui/ReasonReactUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/StateEngineService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as CurrentDragSourceEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/CurrentDragSourceEditorService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/BasicSourceTextureEngineService.js";
import * as TextureNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/TextureNodeMapAssetEditorService.js";

function isWidget(startWidget) {
  if (startWidget !== undefined) {
    return startWidget === AssetUtils$WonderEditor.getWidget(/* () */0);
  } else {
    return false;
  }
}

function isTypeValid(startId, editorState) {
  if (startId !== undefined) {
    return Js_option.isSome(SparseMapService$WonderCommonlib.get(startId, TextureNodeMapAssetEditorService$WonderEditor.getTextureNodeMap(editorState)));
  } else {
    return false;
  }
}

function _isTriggerAction(isWidgetFunc, isTypeValidFunc) {
  var match = CurrentDragSourceEditorService$WonderEditor.getCurrentDragSource(StateEditorService$WonderEditor.getState(/* () */0));
  if (Curry._1(isWidgetFunc, match[0])) {
    return Curry._2(isTypeValidFunc, match[1], StateEditorService$WonderEditor.getState(/* () */0));
  } else {
    return false;
  }
}

function handleDragEnter(isWidgetFunc, isTypeValidFunc, _) {
  var match = _isTriggerAction(isWidgetFunc, isTypeValidFunc);
  if (match) {
    return /* DragEnter */1;
  } else {
    return /* Nothing */0;
  }
}

function handleDragLeave(isWidgetFunc, isTypeValidFunc, $$event) {
  DomHelper$WonderEditor.stopPropagation($$event);
  var match = _isTriggerAction(isWidgetFunc, isTypeValidFunc);
  if (match) {
    return /* DragLeave */2;
  } else {
    return /* Nothing */0;
  }
}

var handleDragOver = DomHelper$WonderEditor.preventDefault;

function handleDrop(isWidgetFunc, isTypeValidFunc, $$event) {
  var startId = DragUtils$WonderEditor.getDragedId($$event);
  DomHelper$WonderEditor.preventDefault($$event);
  var match = _isTriggerAction(isWidgetFunc, isTypeValidFunc);
  if (match) {
    return /* DragDrop */[startId];
  } else {
    return /* DragLeave */2;
  }
}

function showMapComponent(materialComponent, getMapFunc) {
  var match = StateLogicService$WonderEditor.getEngineStateToGetData(Curry._1(getMapFunc, materialComponent));
  if (match !== undefined) {
    var source = BasicSourceTextureEngineService$WonderEditor.unsafeGetSource(match, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
    return React.createElement("img", {
                src: source.src
              });
  } else {
    return null;
  }
}

var Method = /* module */[
  /* isWidget */isWidget,
  /* isTypeValid */isTypeValid,
  /* _isTriggerAction */_isTriggerAction,
  /* handleDragEnter */handleDragEnter,
  /* handleDragLeave */handleDragLeave,
  /* handleDragOver */handleDragOver,
  /* handleDrop */handleDrop,
  /* showMapComponent */showMapComponent
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
          return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("border", "2px solid coral", state[/* style */0])]]);
      case 2 : 
          return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("border", "2px solid rgb(167,165,165)", state[/* style */0])]]);
      
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

function _renderDragableImage(_, materialComponent, getMapFunc, param) {
  var send = param[/* send */3];
  return React.createElement("div", {
              className: "texture-img",
              style: param[/* state */1][/* style */0]
            }, React.createElement("div", {
                  className: "img-dragBg",
                  onDragEnter: (function (_e) {
                      return Curry._1(send, handleDragEnter(isWidget, isTypeValid, _e));
                    }),
                  onDragLeave: (function (_e) {
                      return Curry._1(send, handleDragLeave(isWidget, isTypeValid, _e));
                    }),
                  onDragOver: handleDragOver,
                  onDrop: (function (_e) {
                      return Curry._1(send, handleDrop(isWidget, isTypeValid, _e));
                    })
                }), showMapComponent(materialComponent, getMapFunc));
}

function render(param, param$1, param$2, self) {
  var removeTextureFunc = param$2[1];
  var materialComponent = param$1[0];
  var dispatchFunc = param[1];
  var store = param[0];
  return React.createElement("article", {
              className: "inspector-item"
            }, React.createElement("div", {
                  className: "item-header"
                }, DomHelper$WonderEditor.textEl(param$1[1])), React.createElement("div", {
                  className: "item-content item-texture"
                }, _renderDragableImage(store, materialComponent, param$2[0], self), React.createElement("button", {
                      className: "texture-remove",
                      onClick: (function () {
                          return Curry._3(removeTextureFunc, /* tuple */[
                                      store,
                                      dispatchFunc
                                    ], /* () */0, materialComponent);
                        })
                    }, DomHelper$WonderEditor.textEl("Remove"))));
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
  _renderDragableImage ,
  render ,
  make ,
  
}
/* component Not a pure module */
