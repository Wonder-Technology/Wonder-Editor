

import * as Block from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_obj from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact from "../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Select$WonderEditor from "../../../../../../../../../../atom_component/select/Select.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../../external/DomHelper.js";
import * as ArrayService$WonderEditor from "../../../../../../../../../../../service/atom/ArrayService.js";
import * as ReasonReactUtils$WonderEditor from "../../../../../../../../../../utils/ui/ReasonReactUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/scene/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/StateEngineService.js";
import * as MainEditorBasicMaterial$WonderEditor from "../composable_component/basic_material/ui/MainEditorBasicMaterial.js";
import * as MainEditorLightMaterial$WonderEditor from "../composable_component/light_material/ui/MainEditorLightMaterial.js";
import * as MainEditorMaterialUtils$WonderEditor from "../utils/MainEditorMaterialUtils.js";
import * as MaterialDataAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/MaterialDataAssetEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/GameObjectComponentEngineService.js";
import * as MaterialNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/MaterialNodeMapAssetEditorService.js";
import * as MainEditorChangeMaterialEventHandler$WonderEditor from "../eventHandler/MainEditorChangeMaterialEventHandler.js";
import * as MainEditorChangeMaterialTypeEventHandler$WonderEditor from "../eventHandler/MainEditorChangeMaterialTypeEventHandler.js";

var changeMaterialType = MainEditorChangeMaterialTypeEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var changeMaterial = MainEditorChangeMaterialEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

function renderBasicMaterial(param, _) {
  var gameObject = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return ReasonReact.element(undefined, undefined, MainEditorBasicMaterial$WonderEditor.make(param[0], param[1], StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(gameObject, param);
                      })), /* array */[]));
}

function renderLightMaterial(param, _) {
  var gameObject = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return ReasonReact.element(undefined, undefined, MainEditorLightMaterial$WonderEditor.make(param[0], param[1], StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject, param);
                      })), /* array */[]));
}

function _sortByName(allMaterialAssetData, engineState) {
  return allMaterialAssetData.sort((function (param, param$1) {
                var match = param$1[1];
                var match$1 = param[1];
                return MainEditorMaterialUtils$WonderEditor.getName(match$1[0], match$1[1], engineState).charAt(0).localeCompare(MainEditorMaterialUtils$WonderEditor.getName(match[0], match[1], engineState).charAt(0));
              }));
}

function _getAllMaterialAssetData(editorState, engineState) {
  return _sortByName(ArrayService$WonderEditor.fastConcat(MaterialNodeMapAssetEditorService$WonderEditor.getResults(editorState).map((function (param) {
                        var match = param[1];
                        return /* tuple */[
                                param[0],
                                /* tuple */[
                                  match[/* materialComponent */2],
                                  match[/* type_ */1]
                                ]
                              ];
                      })), MaterialDataAssetEditorService$WonderEditor.getAllDefaultMaterialData(editorState).map((function (materialData) {
                        return /* tuple */[
                                undefined,
                                materialData
                              ];
                      }))), engineState);
}

function showMaterialAssets(send, _, currentMaterial, currentMaterialType) {
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  return _getAllMaterialAssetData(editorState, engineState).map((function (param) {
                var match = param[1];
                var materialType = match[1];
                var material = match[0];
                var materialNodeId = param[0];
                var match$1 = Caml_obj.caml_equal(/* tuple */[
                      material,
                      materialType
                    ], /* tuple */[
                      currentMaterial,
                      currentMaterialType
                    ]);
                var className = match$1 ? "item-content item-active" : "item-content";
                return React.createElement("div", {
                            key: DomHelper$WonderEditor.getRandomKey(/* () */0),
                            className: className,
                            onClick: (function () {
                                return Curry._1(send, /* ChangeMaterial */Block.__(1, [
                                              materialNodeId,
                                              /* tuple */[
                                                material,
                                                materialType
                                              ]
                                            ]));
                              })
                          }, DomHelper$WonderEditor.textEl(MainEditorMaterialUtils$WonderEditor.getName(material, materialType, engineState)));
              }));
}

function _isEqualDefaultMaterial(material, materialType, editorState) {
  var match = MaterialDataAssetEditorService$WonderEditor.unsafeGetMaterialDataByType(materialType, editorState);
  return material === match[0];
}

function buildShadeComponent(currentMaterial, materialType) {
  var match = _isEqualDefaultMaterial(currentMaterial, materialType, StateEditorService$WonderEditor.getState(/* () */0));
  if (match) {
    return React.createElement("div", {
                className: "material-shade"
              });
  } else {
    return null;
  }
}

var Method = /* module */[
  /* changeMaterialType */changeMaterialType,
  /* changeMaterial */changeMaterial,
  /* renderBasicMaterial */renderBasicMaterial,
  /* renderLightMaterial */renderLightMaterial,
  /* _sortByName */_sortByName,
  /* _getAllMaterialAssetData */_getAllMaterialAssetData,
  /* showMaterialAssets */showMaterialAssets,
  /* _isEqualDefaultMaterial */_isEqualDefaultMaterial,
  /* buildShadeComponent */buildShadeComponent
];

var component = ReasonReact.reducerComponent("MainEditorMaterial");

function reducer(reduxTuple, currentSceneTreeNode, action, state) {
  if (typeof action === "number") {
    if (action === 0) {
      return /* Update */Block.__(0, [/* record */[
                  /* materialType */state[/* materialType */0],
                  /* isShowMaterialGroup */true,
                  /* currentMaterial */state[/* currentMaterial */2]
                ]]);
    } else {
      return /* Update */Block.__(0, [/* record */[
                  /* materialType */state[/* materialType */0],
                  /* isShowMaterialGroup */false,
                  /* currentMaterial */state[/* currentMaterial */2]
                ]]);
    }
  } else if (action.tag) {
    var match = action[1];
    var targetMaterialType = match[1];
    var targetMaterial = match[0];
    var materialNodeId = action[0];
    var sourceMaterial = state[/* currentMaterial */2];
    var sourceMaterialType = state[/* materialType */0];
    var match$1 = Caml_obj.caml_equal(/* tuple */[
          sourceMaterial,
          sourceMaterialType
        ], /* tuple */[
          targetMaterial,
          targetMaterialType
        ]);
    if (match$1) {
      return /* NoUpdate */0;
    } else {
      return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                  /* materialType */targetMaterialType,
                  /* isShowMaterialGroup */state[/* isShowMaterialGroup */1],
                  /* currentMaterial */targetMaterial
                ], (function () {
                    return Curry._3(changeMaterial, reduxTuple, currentSceneTreeNode, /* tuple */[
                                materialNodeId,
                                /* tuple */[
                                  sourceMaterial,
                                  targetMaterial
                                ],
                                /* tuple */[
                                  state[/* materialType */0],
                                  targetMaterialType
                                ]
                              ]);
                  }));
    }
  } else {
    var value = action[0];
    var sourceMaterialType$1 = state[/* materialType */0];
    return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                /* materialType */value,
                /* isShowMaterialGroup */state[/* isShowMaterialGroup */1],
                /* currentMaterial */state[/* currentMaterial */2]
              ], (function () {
                  return Curry._3(changeMaterialType, reduxTuple, /* () */0, /* tuple */[
                              sourceMaterialType$1,
                              value
                            ]);
                }));
  }
}

function render(param, currentSceneTreeNode, param$1) {
  var send = param$1[/* send */3];
  var state = param$1[/* state */1];
  var dispatchFunc = param[1];
  var store = param[0];
  var partial_arg = state[/* materialType */0];
  var partial_arg$1 = state[/* currentMaterial */2];
  var match = state[/* isShowMaterialGroup */1];
  var partial_arg$2 = /* tuple */[
    store,
    dispatchFunc
  ];
  var partial_arg$3 = /* tuple */[
    store,
    dispatchFunc
  ];
  return React.createElement("article", {
              key: "MainEditorMaterial",
              className: "wonder-inspector-material"
            }, React.createElement("div", {
                  className: "inspector-item"
                }, React.createElement("div", {
                      className: "item-header"
                    }, DomHelper$WonderEditor.textEl("Material")), React.createElement("div", {
                      className: "item-content"
                    }, React.createElement("div", {
                          className: "inspector-select"
                        }, React.createElement("div", {
                              className: "select-name"
                            }, DomHelper$WonderEditor.textEl(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                        return MainEditorMaterialUtils$WonderEditor.getName(partial_arg$1, partial_arg, param);
                                      })))), React.createElement("div", {
                              className: "select-img",
                              onClick: (function () {
                                  return Curry._1(send, /* ShowMaterialGroup */0);
                                })
                            }, React.createElement("img", {
                                  src: "./public/img/select.png"
                                }))))), match ? React.createElement("div", {
                    className: "select-component-content"
                  }, React.createElement("div", {
                        className: "select-component-item"
                      }, React.createElement("div", {
                            className: "item-header"
                          }, DomHelper$WonderEditor.textEl("Material")), showMaterialAssets(send, currentSceneTreeNode, state[/* currentMaterial */2], state[/* materialType */0])), React.createElement("div", {
                        className: "select-component-bg",
                        onClick: (function () {
                            return Curry._1(send, /* HideMaterialGroup */1);
                          })
                      })) : null, React.createElement("div", {
                  className: "material-value"
                }, ReasonReact.element(undefined, undefined, Select$WonderEditor.make("Type", MainEditorMaterialUtils$WonderEditor.getMaterialOptions(/* () */0), state[/* materialType */0], (function (value) {
                            return Curry._1(send, /* ChangeMaterialType */Block.__(0, [value]));
                          }), /* array */[])), React.createElement("div", {
                      className: ""
                    }, MainEditorMaterialUtils$WonderEditor.handleSpecificFuncByMaterialType(state[/* materialType */0], /* tuple */[
                          (function (param) {
                              return renderBasicMaterial(partial_arg$2, param);
                            }),
                          (function (param) {
                              return renderLightMaterial(partial_arg$3, param);
                            })
                        ])), buildShadeComponent(state[/* currentMaterial */2], state[/* materialType */0])));
}

function make(store, dispatchFunc, currentSceneTreeNode, $staropt$star, _) {
  var isShowMaterialGroup = $staropt$star !== undefined ? $staropt$star : false;
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
                        ], currentSceneTreeNode, self);
            }),
          /* initialState */(function () {
              var materialType = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                      return MainEditorMaterialUtils$WonderEditor.getMaterialTypeByGameObject(currentSceneTreeNode, param);
                    }));
              return /* record */[
                      /* materialType */materialType,
                      /* isShowMaterialGroup */isShowMaterialGroup,
                      /* currentMaterial */StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                              return MainEditorMaterialUtils$WonderEditor.getMaterialComponentByType(currentSceneTreeNode, materialType, param);
                            }))
                    ];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param, param$1) {
              return reducer(partial_arg, currentSceneTreeNode, param, param$1);
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
