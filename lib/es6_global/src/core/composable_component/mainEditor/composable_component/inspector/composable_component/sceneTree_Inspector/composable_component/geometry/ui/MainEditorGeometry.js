

import * as Block from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as ArrayService$WonderEditor from "../../../../../../../../../../service/atom/ArrayService.js";
import * as LanguageUtils$WonderEditor from "../../../../../../../../../utils/language/LanguageUtils.js";
import * as ReasonReactUtils$WonderEditor from "../../../../../../../../../utils/ui/ReasonReactUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as SelectAssetGroupBar$WonderEditor from "../../../../../../../../../atom_component/selectAssetGroup/SelectAssetGroupBar.js";
import * as GeometryEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/GeometryEngineService.js";
import * as LanguageEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/LanguageEditorService.js";
import * as SelectAssetGroupWidget$WonderEditor from "../../../../../../../../../atom_component/selectAssetGroup/SelectAssetGroupWidget.js";
import * as MainEditorGeometryUtils$WonderEditor from "../utils/MainEditorGeometryUtils.js";
import * as GeometryAssetLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/asset/GeometryAssetLogicService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/LightMaterialEngineService.js";
import * as GeometryDataAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/GeometryDataAssetEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as MainEditorChangeGeometryEventHandler$WonderEditor from "../eventHandler/MainEditorChangeGeometryEventHandler.js";

var changeGeometry = MainEditorChangeGeometryEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

function _isGameObjectLightMaterialComponentHasMap(gameObject, engineState) {
  var material = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject, engineState);
  if (LightMaterialEngineService$WonderEditor.hasLightMaterialDiffuseMap(material, engineState)) {
    return true;
  } else {
    return LightMaterialEngineService$WonderEditor.hasLightMaterialSpecularMap(material, engineState);
  }
}

function _isGameObjectMaterialComponentHasMap(gameObject, engineState) {
  var match = GameObjectComponentEngineService$WonderEditor.hasBasicMaterialComponent(gameObject, engineState);
  if (match) {
    return false;
  } else {
    var match$1 = GameObjectComponentEngineService$WonderEditor.hasLightMaterialComponent(gameObject, engineState);
    if (match$1) {
      return _isGameObjectLightMaterialComponentHasMap(gameObject, engineState);
    } else {
      return false;
    }
  }
}

function _sortByName(engineState, allGeometryAssets) {
  return allGeometryAssets.sort((function (geometry1, geometry2) {
                return MainEditorGeometryUtils$WonderEditor.getName(geometry1, engineState).charAt(0).localeCompare(MainEditorGeometryUtils$WonderEditor.getName(geometry2, engineState).charAt(0));
              }));
}

function _getAllGeometryAssetsAndDefaultGeometrys(editorState, engineState) {
  return ArrayService$WonderEditor.fastConcat(_sortByName(engineState, GeometryAssetLogicService$WonderEditor.getGeometryAssets(editorState, engineState)), GeometryDataAssetEditorService$WonderEditor.unsafeGetDefaultGeometryComponents(editorState));
}

function getAllShowGeometrys(gameObject, param) {
  var engineState = param[1];
  var editorState = param[0];
  var match = _isGameObjectMaterialComponentHasMap(gameObject, engineState);
  if (match) {
    return _getAllGeometryAssetsAndDefaultGeometrys(editorState, engineState).filter((function (geometry) {
                  return GeometryEngineService$WonderEditor.hasGeometryTexCoords(geometry, engineState);
                }));
  } else {
    return _getAllGeometryAssetsAndDefaultGeometrys(editorState, engineState);
  }
}

var Method = /* module */[
  /* changeGeometry */changeGeometry,
  /* _isGameObjectLightMaterialComponentHasMap */_isGameObjectLightMaterialComponentHasMap,
  /* _isGameObjectMaterialComponentHasMap */_isGameObjectMaterialComponentHasMap,
  /* _sortByName */_sortByName,
  /* _getAllGeometryAssetsAndDefaultGeometrys */_getAllGeometryAssetsAndDefaultGeometrys,
  /* getAllShowGeometrys */getAllShowGeometrys
];

var component = ReasonReact.reducerComponent("MainEditorGeometry");

function reducer(reduxTuple, currentSceneTreeNode, action, state) {
  if (typeof action === "number") {
    if (action !== 0) {
      return /* Update */Block.__(0, [/* record */[
                  /* isShowGeometryGroup */false,
                  /* currentGeometry */state[/* currentGeometry */1]
                ]]);
    } else {
      return /* Update */Block.__(0, [/* record */[
                  /* isShowGeometryGroup */true,
                  /* currentGeometry */state[/* currentGeometry */1]
                ]]);
    }
  } else {
    var targetGeometry = action[0];
    var sourceGeometry = state[/* currentGeometry */1];
    var match = sourceGeometry === targetGeometry;
    if (match) {
      return /* NoUpdate */0;
    } else {
      return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                  /* isShowGeometryGroup */state[/* isShowGeometryGroup */0],
                  /* currentGeometry */targetGeometry
                ], (function (_state) {
                    return Curry._3(changeGeometry, reduxTuple, currentSceneTreeNode, /* tuple */[
                                sourceGeometry,
                                targetGeometry
                              ]);
                  }));
    }
  }
}

function render(param, currentSceneTreeNode, self) {
  var send = self[/* send */3];
  var state = self[/* state */1];
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  var partial_arg = state[/* currentGeometry */1];
  var match = state[/* isShowGeometryGroup */0];
  return React.createElement("article", {
              key: "MainEditorGeometry",
              className: "wonder-inspector-geometry"
            }, ReasonReact.element(undefined, undefined, SelectAssetGroupBar$WonderEditor.make("Geometry", LanguageUtils$WonderEditor.getInspectorLanguageDataByType("geometry-geometry-describe", languageType), StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                            return MainEditorGeometryUtils$WonderEditor.getName(partial_arg, param);
                          })), (function (send) {
                        return Curry._1(send, /* ShowGeometryGroup */0);
                      }), send, /* array */[])), match ? ReasonReact.element(undefined, undefined, SelectAssetGroupWidget$WonderEditor.make("Geometry", (function (send) {
                          return Curry._1(send, /* HideGeometryGroup */1);
                        }), send, (function (param) {
                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                          return getAllShowGeometrys(currentSceneTreeNode, /* tuple */[
                                      editorState,
                                      engineState
                                    ]);
                        }), (function (geometry) {
                          var currentGeometry = state[/* currentGeometry */1];
                          return geometry === currentGeometry;
                        }), (function (geometry, send) {
                          return Curry._1(send, /* ChangeGeometry */[geometry]);
                        }), (function (geometry) {
                          return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                        return MainEditorGeometryUtils$WonderEditor.getName(geometry, param);
                                      }));
                        }), /* array */[])) : null);
}

function make(uiState, dispatchFunc, currentSceneTreeNode, geometryComponent, isShowGeometryGroup, _children) {
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
              return /* record */[
                      /* isShowGeometryGroup */isShowGeometryGroup,
                      /* currentGeometry */geometryComponent
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
