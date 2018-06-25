

import * as Block from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_obj from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Caml_format from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_format.js";
import * as ReasonReact from "../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Log$WonderLog from "../../../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AppStore$WonderEditor from "../../../../../../../../../ui/store/AppStore.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../external/DomHelper.js";
import * as DragUtils$WonderEditor from "../../../../../../../../../atom_component/dragTree/utils/DragUtils.js";
import * as ReactUtils$WonderEditor from "../../../../../../../../../utils/ui/ReactUtils.js";
import * as StringInput$WonderEditor from "../../../../../../../../../atom_component/stringInput/StringInput.js";
import * as GeometryUtils$WonderEditor from "../../../../../../../../../utils/engine/GeometryUtils.js";
import * as OptionService$WonderEditor from "../../../../../../../../../../service/primitive/OptionService.js";
import * as AssetTreeUtils$WonderEditor from "../../../../../../asset/composable_component/utils/AssetTreeUtils.js";
import * as GeometryService$WonderEditor from "../../../../../../../../../../service/primitive/geometry/GeometryService.js";
import * as ReasonReactUtils$WonderEditor from "../../../../../../../../../utils/ui/ReasonReactUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as DirectorEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/DirectorEngineService.js";
import * as GeometryEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/GeometryEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/GameObjectEngineService.js";
import * as AssetNodeMapEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/AssetNodeMapEditorService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as CurrentDragSourceEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/CurrentDragSourceEditorService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/BasicSourceTextureEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/GameObjectComponentEngineService.js";
import * as MainEditorMaterialMarkRedoUndoEventHandler$WonderEditor from "./eventHandler/MainEditorMaterialMarkRedoUndoEventHandler.js";

function handleFlag(startFlag) {
  if (startFlag) {
    return startFlag[0] === AssetTreeUtils$WonderEditor.getFlag(/* () */0);
  } else {
    return false;
  }
}

function _getNodeResultFromNodeMap(id, editorState) {
  return SparseMapService$WonderCommonlib.unsafeGet(id, AssetNodeMapEditorService$WonderEditor.unsafeGetNodeMap(editorState));
}

function handleTypeValid(startId, editorState) {
  if (startId) {
    var param = SparseMapService$WonderCommonlib.unsafeGet(startId[0], AssetNodeMapEditorService$WonderEditor.unsafeGetNodeMap(editorState));
    return param[/* type_ */1] === /* Texture */3;
  } else {
    return false;
  }
}

var setMaterialColor = MainEditorMaterialMarkRedoUndoEventHandler$WonderEditor.MakeEventHandler[/* onMarkRedoUndoByLastStack */4];

function _handleSetMap(gameObject, materialComponent, mapId, engienStateToGetData) {
  var match = BasicMaterialEngineService$WonderEditor.getMap(materialComponent, engienStateToGetData);
  if (match) {
    Log$WonderLog.print("has material");
    var match$1 = StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[
          /* record */[
            /* arguments : array */[mapId],
            /* type_ : Texture */3
          ],
          /* record */[
            /* arguments : array */[materialComponent],
            /* type_ : Material */2
          ]
        ], BasicMaterialEngineService$WonderEditor.setMap, /* tuple */[
          StateLogicService$WonderEditor.getEditEngineState(/* () */0),
          StateLogicService$WonderEditor.getRunEngineState(/* () */0)
        ]);
    StateLogicService$WonderEditor.setEditEngineState(DirectorEngineService$WonderEditor.loopBody(0, match$1[0]));
    return StateLogicService$WonderEditor.setRunEngineState(DirectorEngineService$WonderEditor.loopBody(0, match$1[1]));
  } else {
    Log$WonderLog.print("remove material and create material");
    var color = BasicMaterialEngineService$WonderEditor.getColor(materialComponent, engienStateToGetData);
    var match$2 = StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[
          /* record */[
            /* arguments : array */[gameObject],
            /* type_ : GameObject */0
          ],
          /* record */[
            /* arguments : array */[materialComponent],
            /* type_ : Material */2
          ]
        ], GameObjectEngineService$WonderEditor.disposeGameObjectBasicMaterialComponent, /* tuple */[
          StateLogicService$WonderEditor.getEditEngineState(/* () */0),
          StateLogicService$WonderEditor.getRunEngineState(/* () */0)
        ]);
    var match$3 = GeometryUtils$WonderEditor.createGeometry(match$2[0], match$2[1]);
    var newMaterial = match$3[0];
    var match$4 = StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[/* record */[
            /* arguments : array */[gameObject],
            /* type_ : GameObject */0
          ]], GameObjectEngineService$WonderEditor.initGameObject, StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[
              /* record */[
                /* arguments : array */[gameObject],
                /* type_ : GameObject */0
              ],
              /* record */[
                /* arguments : array */[newMaterial],
                /* type_ : Material */2
              ]
            ], GameObjectComponentEngineService$WonderEditor.addBasicMaterialComponent, StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[
                  /* record */[
                    /* arguments : array */[mapId],
                    /* type_ : Texture */3
                  ],
                  /* record */[
                    /* arguments : array */[newMaterial],
                    /* type_ : Material */2
                  ]
                ], BasicMaterialEngineService$WonderEditor.setMap, StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[/* record */[
                        /* arguments : array */[newMaterial],
                        /* type_ : Material */2
                      ]], (function (param, param$1) {
                        return BasicMaterialEngineService$WonderEditor.setColor(color, param, param$1);
                      }), /* tuple */[
                      match$3[1],
                      match$3[2]
                    ]))));
    StateLogicService$WonderEditor.setEditEngineState(DirectorEngineService$WonderEditor.loopBody(0, match$4[0]));
    return StateLogicService$WonderEditor.setRunEngineState(DirectorEngineService$WonderEditor.loopBody(0, match$4[1]));
  }
}

function _handleNoTexCoords(gameObject) {
  return Log$WonderLog.warn("the gameObject:" + (String(gameObject) + " have no texCoords"));
}

function handleBoxGeometryAddMap(gameObject, materialComponent, mapId, engineStateToGetData) {
  var match = GeometryService$WonderEditor.hasTexCoords(GeometryEngineService$WonderEditor.getBoxGeometryTexCoords(engineStateToGetData));
  if (match) {
    return _handleSetMap(gameObject, materialComponent, mapId, engineStateToGetData);
  } else {
    return _handleNoTexCoords(gameObject);
  }
}

function handleCustomGeometryAddMap(gameObject, materialComponent, mapId, engineStateToGetData) {
  var match = GeometryService$WonderEditor.hasTexCoords(GeometryEngineService$WonderEditor.getCustomGeometryTexCoords(GameObjectComponentEngineService$WonderEditor.getGeometryComponent(gameObject, engineStateToGetData), engineStateToGetData));
  if (match) {
    return _handleSetMap(gameObject, materialComponent, mapId, engineStateToGetData);
  } else {
    return _handleNoTexCoords(gameObject);
  }
}

function onDrop(dispatchFunc, startId, materialComponent) {
  Log$WonderLog.print(/* tuple */[
        "id",
        startId
      ]);
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var param = SparseMapService$WonderCommonlib.unsafeGet(startId, AssetNodeMapEditorService$WonderEditor.unsafeGetNodeMap(editorState));
  var result = param[/* result */2];
  var gameObject = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  var engineStateToGetData = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
  var match = GameObjectEngineService$WonderEditor.hasGameObjectBoxGeometryComponent(gameObject, engineStateToGetData);
  if (match) {
    handleBoxGeometryAddMap(gameObject, materialComponent, Caml_format.caml_int_of_string(OptionService$WonderEditor.unsafeGet(result)), engineStateToGetData);
  } else {
    handleCustomGeometryAddMap(gameObject, materialComponent, Caml_format.caml_int_of_string(OptionService$WonderEditor.unsafeGet(result)), engineStateToGetData);
  }
  return Curry._1(dispatchFunc, AppStore$WonderEditor.ReLoad);
}

function _isTriggerEvent(handleFlagFunc, handleTypeValidFunc) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = CurrentDragSourceEditorService$WonderEditor.getCurrentDragSource(editorState);
  if (Curry._1(handleFlagFunc, match[0])) {
    return Curry._2(handleTypeValidFunc, match[1], editorState);
  } else {
    return false;
  }
}

function handleDragEnter(handleFlagFunc, handleTypeValidFunc, _) {
  var match = _isTriggerEvent(handleFlagFunc, handleTypeValidFunc);
  if (match) {
    return /* DragEnter */1;
  } else {
    return /* Nothing */0;
  }
}

function handleDragLeave(handleFlagFunc, handleTypeValidFunc, $$event) {
  DomHelper$WonderEditor.stopPropagation($$event);
  var match = _isTriggerEvent(handleFlagFunc, handleTypeValidFunc);
  if (match) {
    return /* DragLeave */2;
  } else {
    return /* Nothing */0;
  }
}

var handleDragOver = DomHelper$WonderEditor.preventDefault;

function handleDrop(handleFlagFunc, handleTypeValidFunc, $$event) {
  var startId = DragUtils$WonderEditor.getDragedUid($$event);
  var match = _isTriggerEvent(handleFlagFunc, handleTypeValidFunc);
  if (match) {
    return /* DragDrop */[startId];
  } else {
    return /* DragLeave */2;
  }
}

function handleDrageEnd() {
  StateLogicService$WonderEditor.getAndSetEditorState(CurrentDragSourceEditorService$WonderEditor.clearCurrentDragSource);
  return /* DragEnd */3;
}

var Method = /* module */[
  /* handleFlag */handleFlag,
  /* _getNodeResultFromNodeMap */_getNodeResultFromNodeMap,
  /* handleTypeValid */handleTypeValid,
  /* setMaterialColor */setMaterialColor,
  /* _handleSetMap */_handleSetMap,
  /* _handleNoTexCoords */_handleNoTexCoords,
  /* handleBoxGeometryAddMap */handleBoxGeometryAddMap,
  /* handleCustomGeometryAddMap */handleCustomGeometryAddMap,
  /* onDrop */onDrop,
  /* _isTriggerEvent */_isTriggerEvent,
  /* handleDragEnter */handleDragEnter,
  /* handleDragLeave */handleDragLeave,
  /* handleDragOver */handleDragOver,
  /* handleDrop */handleDrop,
  /* handleDrageEnd */handleDrageEnd
];

var component = ReasonReact.reducerComponentWithRetainedProps("MainEditorBasicMaterial");

function reducer(dispatchFunc, materialComponent, action, state) {
  if (typeof action === "number") {
    switch (action) {
      case 0 : 
          return /* NoUpdate */0;
      case 1 : 
          return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("border", "2px dashed blue", state[/* style */0])]]);
      case 2 : 
          return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("border", "1px solid red", state[/* style */0])]]);
      case 3 : 
          return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("border", "1px solid red", ReactUtils$WonderEditor.addStyleProp("opacity", "1", state[/* style */0]))]]);
      
    }
  } else {
    var startId = action[0];
    return ReasonReactUtils$WonderEditor.sideEffects((function () {
                  return onDrop(dispatchFunc, startId, materialComponent);
                }));
  }
}

function render(param, materialComponent, param$1) {
  var send = param$1[/* send */3];
  var retainedProps = param$1[/* retainedProps */2];
  var match = retainedProps[/* map */1];
  var tmp;
  if (match) {
    var map = match[0];
    Log$WonderLog.print(/* tuple */[
          "map",
          map
        ]);
    tmp = React.createElement("img", {
          src: DomHelper$WonderEditor.getAttribute(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                      return BasicSourceTextureEngineService$WonderEditor.unsafeGetSource(map, param);
                    })), "src")
        });
  } else {
    tmp = React.createElement("img", {
          src: "./public/img/null.jpg"
        });
  }
  return React.createElement("article", {
              className: "wonder-inspector-material"
            }, ReasonReact.element(/* None */0, /* None */0, StringInput$WonderEditor.make(/* Some */[retainedProps[/* color */0]], /* Some */["color"], /* None */0, /* Some */[Curry._2(setMaterialColor, /* tuple */[
                            param[0],
                            param[1]
                          ], materialComponent)], /* array */[])), React.createElement("div", {
                  className: "material-texture",
                  style: param$1[/* state */1][/* style */0]
                }, React.createElement("div", {
                      className: "texture_ground",
                      onDragEnd: (function () {
                          return Curry._1(send, (StateLogicService$WonderEditor.getAndSetEditorState(CurrentDragSourceEditorService$WonderEditor.clearCurrentDragSource), /* DragEnd */3));
                        }),
                      onDragEnter: (function (_e) {
                          return Curry._1(send, handleDragEnter(handleFlag, handleTypeValid, _e));
                        }),
                      onDragLeave: (function (_e) {
                          return Curry._1(send, handleDragLeave(handleFlag, handleTypeValid, _e));
                        }),
                      onDragOver: handleDragOver,
                      onDrop: (function (_e) {
                          return Curry._1(send, handleDrop(handleFlag, handleTypeValid, _e));
                        })
                    }), React.createElement("span", {
                      className: ""
                    }, DomHelper$WonderEditor.textEl("texture:")), tmp));
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
          /* retainedProps */(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                    return BasicMaterialEngineService$WonderEditor.getColor(materialComponent, param);
                  })), Log$WonderLog.print(/* tuple */[
                  "init material",
                  materialComponent
                ]), /* record */[
              /* color */"#ffffff",
              /* map */StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                      return BasicMaterialEngineService$WonderEditor.getMap(materialComponent, param);
                    }))
            ]),
          /* reducer */(function (param, param$1) {
              return reducer(dispatchFunc, materialComponent, param, param$1);
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
