

import * as Block from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_obj from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact from "../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Select$WonderEditor from "../../../../../../../../../../atom_component/select/Select.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../ui/store/AppStore.js";
import * as ArrayService$WonderEditor from "../../../../../../../../../../../service/atom/ArrayService.js";
import * as LanguageUtils$WonderEditor from "../../../../../../../../../../utils/language/LanguageUtils.js";
import * as NodeAssetService$WonderEditor from "../../../../../../../../../../../service/record/editor/asset/NodeAssetService.js";
import * as ReasonReactUtils$WonderEditor from "../../../../../../../../../../utils/ui/ReasonReactUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as SelectAssetGroupBar$WonderEditor from "../../../../../../../../../../atom_component/selectAssetGroup/SelectAssetGroupBar.js";
import * as LanguageEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/LanguageEditorService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as SelectAssetGroupWidget$WonderEditor from "../../../../../../../../../../atom_component/selectAssetGroup/SelectAssetGroupWidget.js";
import * as MainEditorMaterialUtils$WonderEditor from "../utils/MainEditorMaterialUtils.js";
import * as MaterialNodeAssetService$WonderEditor from "../../../../../../../../../../../service/record/editor/asset/MaterialNodeAssetService.js";
import * as NodeNameAssetLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/asset/NodeNameAssetLogicService.js";
import * as MaterialDataAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/MaterialDataAssetEditorService.js";
import * as MaterialNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/MaterialNodeAssetEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as MainEditorBasicMaterialForGameObject$WonderEditor from "../composable_component/basic_material/ui/MainEditorBasicMaterialForGameObject.js";
import * as MainEditorChangeMaterialEventHandler$WonderEditor from "../eventHandler/MainEditorChangeMaterialEventHandler.js";
import * as MainEditorLightMaterialForGameObject$WonderEditor from "../composable_component/light_material/ui/MainEditorLightMaterialForGameObject.js";
import * as MainEditorChangeMaterialTypeEventHandler$WonderEditor from "../eventHandler/MainEditorChangeMaterialTypeEventHandler.js";

var changeMaterialType = MainEditorChangeMaterialTypeEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var changeMaterial = MainEditorChangeMaterialEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

function renderBasicMaterial(param, param$1) {
  var gameObject = StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return ReasonReact.element(undefined, undefined, MainEditorBasicMaterialForGameObject$WonderEditor.make(param[0], param[1], StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(gameObject, param);
                      })), /* array */[]));
}

function renderLightMaterial(param, param$1) {
  var gameObject = StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return ReasonReact.element(undefined, undefined, MainEditorLightMaterialForGameObject$WonderEditor.make(param[0], param[1], StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject, param);
                      })), /* array */[]));
}

function _sortByName(engineState, allMaterialAssetData) {
  return allMaterialAssetData.sort((function (param, param$1) {
                var match = param$1[1];
                var match$1 = param[1];
                return NodeNameAssetLogicService$WonderEditor.getMaterialNodeName(match$1[0], match$1[1], engineState).charAt(0).localeCompare(NodeNameAssetLogicService$WonderEditor.getMaterialNodeName(match[0], match[1], engineState).charAt(0));
              }));
}

function _getAllMaterialAssetData(editorState, engineState) {
  return _sortByName(engineState, ArrayService$WonderEditor.fastConcat(MaterialNodeAssetEditorService$WonderEditor.findAllMaterialNodes(editorState).map((function (materialNode) {
                        var match = MaterialNodeAssetService$WonderEditor.getNodeData(materialNode);
                        return /* tuple */[
                                NodeAssetService$WonderEditor.getNodeId(materialNode),
                                /* tuple */[
                                  match[/* materialComponent */1],
                                  match[/* type_ */0]
                                ]
                              ];
                      })), MaterialDataAssetEditorService$WonderEditor.getAllDefaultMaterialData(editorState).map((function (materialData) {
                        return /* tuple */[
                                undefined,
                                materialData
                              ];
                      }))));
}

function _isEqualDefaultMaterial(material, materialType, editorState) {
  var match = MaterialDataAssetEditorService$WonderEditor.unsafeGetDefaultMaterialDataByType(materialType, editorState);
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

function handleChangeMaterial(reduxTuple, currentSceneTreeNode, param, state) {
  var match = param[1];
  var targetMaterialType = match[1];
  var targetMaterial = match[0];
  var materialNodeId = param[0];
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
              ], (function (_state) {
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
}

var Method = /* module */[
  /* changeMaterialType */changeMaterialType,
  /* changeMaterial */changeMaterial,
  /* renderBasicMaterial */renderBasicMaterial,
  /* renderLightMaterial */renderLightMaterial,
  /* _sortByName */_sortByName,
  /* _getAllMaterialAssetData */_getAllMaterialAssetData,
  /* _isEqualDefaultMaterial */_isEqualDefaultMaterial,
  /* buildShadeComponent */buildShadeComponent,
  /* handleChangeMaterial */handleChangeMaterial
];

var component = ReasonReact.reducerComponent("MainEditorMaterial");

function reducer(reduxTuple, currentSceneTreeNode, action, state) {
  var dispatchFunc = reduxTuple[1];
  if (typeof action === "number") {
    if (action === 0) {
      return /* Update */Block.__(0, [/* record */[
                  /* materialType */state[/* materialType */0],
                  /* isShowMaterialGroup */true,
                  /* currentMaterial */state[/* currentMaterial */2]
                ]]);
    } else {
      return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                  /* materialType */state[/* materialType */0],
                  /* isShowMaterialGroup */false,
                  /* currentMaterial */state[/* currentMaterial */2]
                ], (function (_state) {
                    Curry._1(dispatchFunc, [
                          AppStore$WonderEditor.UpdateAction,
                          /* Update */[/* array */[/* Inspector */2]]
                        ]);
                    return /* () */0;
                  }));
    }
  } else if (action.tag) {
    var match = action[1];
    return handleChangeMaterial(reduxTuple, currentSceneTreeNode, /* tuple */[
                action[0],
                /* tuple */[
                  match[0],
                  match[1]
                ]
              ], state);
  } else {
    var value = action[0];
    var sourceMaterialType = state[/* materialType */0];
    return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                /* materialType */value,
                /* isShowMaterialGroup */state[/* isShowMaterialGroup */1],
                /* currentMaterial */state[/* currentMaterial */2]
              ], (function (state) {
                  return Curry._3(changeMaterialType, reduxTuple, /* () */0, /* tuple */[
                              sourceMaterialType,
                              value
                            ]);
                }));
  }
}

function render(param, currentSceneTreeNode, self) {
  var send = self[/* send */3];
  var state = self[/* state */1];
  var dispatchFunc = param[1];
  var uiState = param[0];
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  var match = state[/* isShowMaterialGroup */1];
  var partial_arg = /* tuple */[
    uiState,
    dispatchFunc
  ];
  var partial_arg$1 = /* tuple */[
    uiState,
    dispatchFunc
  ];
  return React.createElement("article", {
              key: "MainEditorMaterial",
              className: "wonder-inspector-material"
            }, ReasonReact.element(undefined, undefined, SelectAssetGroupBar$WonderEditor.make("Material", LanguageUtils$WonderEditor.getInspectorLanguageDataByType("material-material-describe", languageType), NodeNameAssetLogicService$WonderEditor.getMaterialNodeName(state[/* currentMaterial */2], state[/* materialType */0], StateEngineService$WonderEditor.unsafeGetState(/* () */0)), (function (send) {
                        return Curry._1(send, /* ShowMaterialGroup */0);
                      }), send, /* array */[])), match ? ReasonReact.element(undefined, undefined, SelectAssetGroupWidget$WonderEditor.make("Material", (function (send) {
                          return Curry._1(send, /* HideMaterialGroup */1);
                        }), send, (function (param) {
                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                          return _getAllMaterialAssetData(editorState, engineState);
                        }), (function (param) {
                          var match = param[1];
                          var currentMaterial = state[/* currentMaterial */2];
                          var currentMaterialType = state[/* materialType */0];
                          return Caml_obj.caml_equal(/* tuple */[
                                      match[0],
                                      match[1]
                                    ], /* tuple */[
                                      currentMaterial,
                                      currentMaterialType
                                    ]);
                        }), (function (param, send) {
                          var match = param[1];
                          return Curry._1(send, /* ChangeMaterial */Block.__(1, [
                                        param[0],
                                        /* tuple */[
                                          match[0],
                                          match[1]
                                        ]
                                      ]));
                        }), (function (param) {
                          var match = param[1];
                          return NodeNameAssetLogicService$WonderEditor.getMaterialNodeName(match[0], match[1], StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                        }), /* array */[])) : null, React.createElement("div", {
                  className: "material-value"
                }, ReasonReact.element(undefined, undefined, Select$WonderEditor.make("Type", MainEditorMaterialUtils$WonderEditor.getMaterialOptions(/* () */0), state[/* materialType */0], (function (value) {
                            return Curry._1(send, /* ChangeMaterialType */Block.__(0, [value]));
                          }), LanguageUtils$WonderEditor.getInspectorLanguageDataByType("material-type-describe", languageType), /* array */[])), React.createElement("div", {
                      className: ""
                    }, MainEditorMaterialUtils$WonderEditor.handleSpecificFuncByMaterialType(state[/* materialType */0], /* tuple */[
                          (function (param) {
                              return renderBasicMaterial(partial_arg, param);
                            }),
                          (function (param) {
                              return renderLightMaterial(partial_arg$1, param);
                            })
                        ])), buildShadeComponent(state[/* currentMaterial */2], state[/* materialType */0])));
}

function make(uiState, dispatchFunc, currentSceneTreeNode, $staropt$star, _children) {
  var isShowMaterialGroup = $staropt$star !== undefined ? $staropt$star : false;
  var partial_arg = /* tuple */[
    uiState,
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
                          uiState,
                          dispatchFunc
                        ], currentSceneTreeNode, self);
            }),
          /* initialState */(function (param) {
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
          /* jsElementWrapped */component[/* jsElementWrapped */13]
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
