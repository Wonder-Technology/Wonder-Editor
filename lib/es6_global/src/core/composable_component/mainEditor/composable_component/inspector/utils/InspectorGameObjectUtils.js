

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../external/DomHelper.js";
import * as Caml_builtin_exceptions from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";
import * as StoreUtils$WonderEditor from "../../../../../utils/ui/StoreUtils.js";
import * as ComponentBox$WonderEditor from "../atom_component/componentBox/ui/ComponentBox.js";
import * as MainEditorLight$WonderEditor from "../composable_component/sceneTree_Inspector/composable_component/light/ui/MainEditorLight.js";
import * as StateLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as MainEditorGeometry$WonderEditor from "../composable_component/sceneTree_Inspector/composable_component/geometry/ui/MainEditorGeometry.js";
import * as MainEditorTransform$WonderEditor from "../composable_component/sceneTree_Inspector/composable_component/transform/ui/MainEditorTransform.js";
import * as MainEditorCameraGroup$WonderEditor from "../composable_component/sceneTree_Inspector/composable_component/cameraGroup/ui/MainEditorCameraGroup.js";
import * as MainEditorRenderGroup$WonderEditor from "../composable_component/sceneTree_Inspector/composable_component/renderGroup/ui/MainEditorRenderGroup.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as MainEditorArcballCameraController$WonderEditor from "../composable_component/sceneTree_Inspector/composable_component/camera/atom_component/arcball_camera/ui/MainEditorArcballCameraController.js";

function buildComponentBox(param, param$1, param$2, buildComponentFunc) {
  var gameObject = param$1[2];
  var dispatchFunc = param[1];
  var uiState = param[0];
  return ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, ComponentBox$WonderEditor.make(/* tuple */[
                  uiState,
                  dispatchFunc
                ], param$1[0], param$2[0], gameObject, Curry._2(buildComponentFunc, /* tuple */[
                      uiState,
                      dispatchFunc
                    ], gameObject), param$2[1], param$1[1], /* array */[]));
}

function _buildTransformFunc(param, gameObject) {
  return ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, MainEditorTransform$WonderEditor.make(param[0], param[1], StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, param);
                      })), gameObject, /* array */[]));
}

function _buildLightFunc(param, _) {
  return ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, MainEditorLight$WonderEditor.make(param[0], param[1], /* array */[]));
}

function _buildSouceInstanceFunc(_, _$1) {
  return React.createElement("div", {
              key: DomHelper$WonderEditor.getRandomKey(/* () */0)
            }, DomHelper$WonderEditor.textEl("simulate source instance"));
}

function _buildRenderGroupFunc(param, gameObject) {
  return ReasonReact.element(undefined, undefined, MainEditorRenderGroup$WonderEditor.make(param[0], param[1], gameObject, /* array */[]));
}

function _buildGeometryFunc(param, gameObject) {
  return ReasonReact.element(undefined, undefined, MainEditorGeometry$WonderEditor.make(param[0], param[1], gameObject, StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(gameObject, param);
                      })), false, /* array */[]));
}

function _buildCameraGroupFunc(param, _) {
  return ReasonReact.element(undefined, undefined, MainEditorCameraGroup$WonderEditor.make(param[0], param[1], /* array */[]));
}

function _buildArcballCamera(param, gameObject) {
  return ReasonReact.element(undefined, undefined, MainEditorArcballCameraController$WonderEditor.make(param[0], param[1], StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(gameObject, param);
                      })), /* array */[]));
}

function buildComponentUIComponent(param, type_, gameObject) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  switch (type_) {
    case 0 : 
        return buildComponentBox(/* tuple */[
                    uiState,
                    dispatchFunc
                  ], /* tuple */[
                    "Transform",
                    type_,
                    gameObject
                  ], /* tuple */[
                    false,
                    StoreUtils$WonderEditor.geGameObjectisShowComponentFromStore(uiState, type_)
                  ], _buildTransformFunc);
    case 1 : 
        return buildComponentBox(/* tuple */[
                    uiState,
                    dispatchFunc
                  ], /* tuple */[
                    "RenderGroup",
                    type_,
                    gameObject
                  ], /* tuple */[
                    true,
                    StoreUtils$WonderEditor.geGameObjectisShowComponentFromStore(uiState, type_)
                  ], _buildRenderGroupFunc);
    case 2 : 
        return buildComponentBox(/* tuple */[
                    uiState,
                    dispatchFunc
                  ], /* tuple */[
                    "Geometry",
                    type_,
                    gameObject
                  ], /* tuple */[
                    true,
                    StoreUtils$WonderEditor.geGameObjectisShowComponentFromStore(uiState, type_)
                  ], _buildGeometryFunc);
    case 3 : 
        return buildComponentBox(/* tuple */[
                    uiState,
                    dispatchFunc
                  ], /* tuple */[
                    "ArcballCameraController",
                    type_,
                    gameObject
                  ], /* tuple */[
                    true,
                    StoreUtils$WonderEditor.geGameObjectisShowComponentFromStore(uiState, type_)
                  ], _buildArcballCamera);
    case 4 : 
        return buildComponentBox(/* tuple */[
                    uiState,
                    dispatchFunc
                  ], /* tuple */[
                    "Camera Group",
                    type_,
                    gameObject
                  ], /* tuple */[
                    true,
                    StoreUtils$WonderEditor.geGameObjectisShowComponentFromStore(uiState, type_)
                  ], _buildCameraGroupFunc);
    case 5 : 
        return buildComponentBox(/* tuple */[
                    uiState,
                    dispatchFunc
                  ], /* tuple */[
                    "Light",
                    type_,
                    gameObject
                  ], /* tuple */[
                    true,
                    StoreUtils$WonderEditor.geGameObjectisShowComponentFromStore(uiState, type_)
                  ], _buildLightFunc);
    case 6 : 
        return null;
    case 7 : 
        throw [
              Caml_builtin_exceptions.match_failure,
              /* tuple */[
                "InspectorGameObjectUtils.re",
                72,
                2
              ]
            ];
    
  }
}

export {
  buildComponentBox ,
  _buildTransformFunc ,
  _buildLightFunc ,
  _buildSouceInstanceFunc ,
  _buildRenderGroupFunc ,
  _buildGeometryFunc ,
  _buildCameraGroupFunc ,
  _buildArcballCamera ,
  buildComponentUIComponent ,
  
}
/* react Not a pure module */
