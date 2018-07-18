

import * as Block from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_obj from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Js_option from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as ReasonReact from "../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../external/DomHelper.js";
import * as DragUtils$WonderEditor from "../../../../../../../../../atom_component/dragTree/utils/DragUtils.js";
import * as AssetUtils$WonderEditor from "../../../../../../asset/utils/AssetUtils.js";
import * as ReactUtils$WonderEditor from "../../../../../../../../../utils/ui/ReactUtils.js";
import * as ReasonReactUtils$WonderEditor from "../../../../../../../../../utils/ui/ReasonReactUtils.js";
import * as StateAssetService$WonderEditor from "../../../../../../../../../../service/state/asset/StateAssetService.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as ImageBase64MapAssetService$WonderEditor from "../../../../../../../../../../service/state/asset/ImageBase64MapAssetService.js";
import * as TextureNodeMapAssetService$WonderEditor from "../../../../../../../../../../service/state/asset/TextureNodeMapAssetService.js";
import * as CurrentDragSourceEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/CurrentDragSourceEditorService.js";
import * as MaterialDragTextureEventHandler$WonderEditor from "../ui/eventHandler/MaterialDragTextureEventHandler.js";
import * as MaterialRemoveTextureEventHandler$WonderEditor from "../ui/eventHandler/MaterialRemoveTextureEventHandler.js";

function isFlag(startFlag) {
  if (startFlag) {
    return startFlag[0] === AssetUtils$WonderEditor.getFlag(/* () */0);
  } else {
    return false;
  }
}

function isTypeValid(startId, assetState) {
  if (startId) {
    return Js_option.isSome(SparseMapService$WonderCommonlib.get(startId[0], TextureNodeMapAssetService$WonderEditor.getTextureNodeMap(assetState)));
  } else {
    return false;
  }
}

var onDrop = MaterialDragTextureEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

function removeTexture(param, _, materialComponent) {
  var match = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return BasicMaterialEngineService$WonderEditor.getMap(materialComponent, param);
        }));
  if (match) {
    return Curry._3(MaterialRemoveTextureEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
                param[0],
                param[1]
              ], /* () */0, materialComponent);
  } else {
    return /* () */0;
  }
}

function _isTriggerAction(isFlagFunc, isTypeValidFunc) {
  var match = CurrentDragSourceEditorService$WonderEditor.getCurrentDragSource(StateEditorService$WonderEditor.getState(/* () */0));
  if (Curry._1(isFlagFunc, match[0])) {
    return Curry._2(isTypeValidFunc, match[1], StateAssetService$WonderEditor.getState(/* () */0));
  } else {
    return false;
  }
}

function handleDragEnter(isFlagFunc, isTypeValidFunc, _) {
  var match = _isTriggerAction(isFlagFunc, isTypeValidFunc);
  if (match) {
    return /* DragEnter */1;
  } else {
    return /* Nothing */0;
  }
}

function handleDragLeave(isFlagFunc, isTypeValidFunc, $$event) {
  DomHelper$WonderEditor.stopPropagation($$event);
  var match = _isTriggerAction(isFlagFunc, isTypeValidFunc);
  if (match) {
    return /* DragLeave */2;
  } else {
    return /* Nothing */0;
  }
}

var handleDragOver = DomHelper$WonderEditor.preventDefault;

function handleDrop(isFlagFunc, isTypeValidFunc, $$event) {
  var startId = DragUtils$WonderEditor.getDragedUid($$event);
  var match = _isTriggerAction(isFlagFunc, isTypeValidFunc);
  if (match) {
    return /* DragDrop */[startId];
  } else {
    return /* DragLeave */2;
  }
}

function showMapComponent(retainedProps) {
  var match = retainedProps[/* map */0];
  if (match) {
    return React.createElement("img", {
                src: SparseMapService$WonderCommonlib.unsafeGet(match[0], ImageBase64MapAssetService$WonderEditor.getImageBase64Map(StateAssetService$WonderEditor.getState(/* () */0)))
              });
  } else {
    return React.createElement("img", {
                src: "./public/img/null.jpg"
              });
  }
}

var Method = /* module */[
  /* isFlag */isFlag,
  /* isTypeValid */isTypeValid,
  /* onDrop */onDrop,
  /* removeTexture */removeTexture,
  /* _isTriggerAction */_isTriggerAction,
  /* handleDragEnter */handleDragEnter,
  /* handleDragLeave */handleDragLeave,
  /* handleDragOver */handleDragOver,
  /* handleDrop */handleDrop,
  /* showMapComponent */showMapComponent
];

var component = ReasonReact.reducerComponentWithRetainedProps("MainEditorBasicMaterialMap");

function reducer(param, materialComponent, action, state) {
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
                  return Curry._3(onDrop, /* tuple */[
                              store,
                              dispatchFunc
                            ], materialComponent, startId);
                }));
  }
}

function render(param, materialComponent, param$1) {
  var send = param$1[/* send */3];
  var dispatchFunc = param[1];
  var store = param[0];
  return React.createElement("article", {
              className: "wonder-material-texture"
            }, React.createElement("div", {
                  className: "texture_ground",
                  style: param$1[/* state */1][/* style */0],
                  onDragEnter: (function (_e) {
                      return Curry._1(send, handleDragEnter(isFlag, isTypeValid, _e));
                    }),
                  onDragLeave: (function (_e) {
                      return Curry._1(send, handleDragLeave(isFlag, isTypeValid, _e));
                    }),
                  onDragOver: handleDragOver,
                  onDrop: (function (_e) {
                      return Curry._1(send, handleDrop(isFlag, isTypeValid, _e));
                    })
                }), React.createElement("span", {
                  className: ""
                }, DomHelper$WonderEditor.textEl("texture:")), showMapComponent(param$1[/* retainedProps */2]), React.createElement("button", {
                  className: "texture_remove",
                  onClick: (function () {
                      return removeTexture(/* tuple */[
                                  store,
                                  dispatchFunc
                                ], /* () */0, materialComponent);
                    })
                }, DomHelper$WonderEditor.textEl("remove")));
}

function shouldUpdate(param) {
  var newSelf = param[/* newSelf */1];
  var oldSelf = param[/* oldSelf */0];
  if (Caml_obj.caml_notequal(oldSelf[/* retainedProps */2], newSelf[/* retainedProps */2])) {
    return true;
  } else {
    return Caml_obj.caml_notequal(oldSelf[/* state */1], newSelf[/* state */1]);
  }
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
          /* shouldUpdate */shouldUpdate,
          /* render */(function (self) {
              return render(/* tuple */[
                          store,
                          dispatchFunc
                        ], materialComponent, self);
            }),
          /* initialState */(function () {
              return /* record */[/* style */{
                        opacity: "1"
                      }];
            }),
          /* retainedProps : record */[/* map */StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                    return BasicMaterialEngineService$WonderEditor.getMap(materialComponent, param);
                  }))],
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
  shouldUpdate ,
  make ,
  
}
/* component Not a pure module */
