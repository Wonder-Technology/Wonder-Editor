

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../external/DomHelper.js";
import * as ComponentBox$WonderEditor from "../../../atom_component/componentBox/ui/ComponentBox.js";
import * as MainEditorLight$WonderEditor from "../composable_component/sceneTree_Inspector/atom_Inspector/light/ui/MainEditorLight.js";
import * as StateLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as LightEngineService$WonderEditor from "../../../../../../service/state/engine/LightEngineService.js";
import * as MainEditorMaterial$WonderEditor from "../composable_component/sceneTree_Inspector/atom_Inspector/material/ui/MainEditorMaterial.js";
import * as MainEditorTransform$WonderEditor from "../composable_component/sceneTree_Inspector/atom_Inspector/transform/ui/MainEditorTransform.js";
import * as MaterialEngineService$WonderEditor from "../../../../../../service/state/engine/MaterialEngineService.js";
import * as MainEditorArcballCamera$WonderEditor from "../composable_component/sceneTree_Inspector/atom_Inspector/camera/atom_component/arcball_camera/ui/MainEditorArcballCamera.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/GameObjectComponentEngineService.js";

function buildComponentBox(param, param$1, isClosable, buildComponentFunc) {
  return ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, ComponentBox$WonderEditor.make(param[0], isClosable, Curry._2(buildComponentFunc, /* tuple */[
                      param$1[0],
                      param$1[1]
                    ], param[1]), /* array */[]));
}

function _buildTransformFunc(param, component) {
  return ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, MainEditorTransform$WonderEditor.make(param[0], param[1], component, /* array */[]));
}

function _buildMaterialFunc(param, _) {
  return ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, MainEditorMaterial$WonderEditor.make(param[0], param[1], /* array */[]));
}

function _buildLightFunc(param, _) {
  return ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, MainEditorLight$WonderEditor.make(param[0], param[1], /* array */[]));
}

function _buildSouceInstanceFunc(_, _$1) {
  return React.createElement("div", {
              key: DomHelper$WonderEditor.getRandomKey(/* () */0)
            }, DomHelper$WonderEditor.textEl("simulate source instance"));
}

function _buildMeshRendererFunc(_, _$1) {
  return React.createElement("div", {
              key: DomHelper$WonderEditor.getRandomKey(/* () */0)
            }, DomHelper$WonderEditor.textEl("simulate Mesh Renderer"));
}

function _buildGeometryFunc(_, _$1) {
  return React.createElement("div", {
              key: DomHelper$WonderEditor.getRandomKey(/* () */0)
            }, DomHelper$WonderEditor.textEl("simulate Geometry"));
}

function _buildBasicCameraViewFunc(_, _$1) {
  return React.createElement("div", {
              key: DomHelper$WonderEditor.getRandomKey(/* () */0)
            }, DomHelper$WonderEditor.textEl("simulate basic camera view"));
}

function _buildPerspectiveCameraProjection(_, _$1) {
  return React.createElement("div", {
              key: DomHelper$WonderEditor.getRandomKey(/* () */0)
            }, DomHelper$WonderEditor.textEl("simulate perspective camera view"));
}

function _buildArcballCamera(param, component) {
  return ReasonReact.element(undefined, undefined, MainEditorArcballCamera$WonderEditor.make(param[0], param[1], component, /* array */[]));
}

function buildComponentUIComponent(param, type_, gameObject) {
  var dispatchFunc = param[1];
  var store = param[0];
  var engineStateToGetData = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
  switch (type_) {
    case 0 : 
        return buildComponentBox(/* tuple */[
                    "Transform",
                    GameObjectComponentEngineService$WonderEditor.getTransformComponent(gameObject, engineStateToGetData)
                  ], /* tuple */[
                    store,
                    dispatchFunc
                  ], false, _buildTransformFunc);
    case 1 : 
        return buildComponentBox(/* tuple */[
                    "MeshRenderer",
                    GameObjectComponentEngineService$WonderEditor.getMeshRendererComponent(gameObject, engineStateToGetData)
                  ], /* tuple */[
                    store,
                    dispatchFunc
                  ], true, _buildMeshRendererFunc);
    case 2 : 
        return buildComponentBox(/* tuple */[
                    "CustomGeometry",
                    GameObjectComponentEngineService$WonderEditor.getGeometryComponent(gameObject, engineStateToGetData)
                  ], /* tuple */[
                    store,
                    dispatchFunc
                  ], true, _buildGeometryFunc);
    case 3 : 
        return buildComponentBox(/* tuple */[
                    "ArcballCameraController",
                    GameObjectComponentEngineService$WonderEditor.getArcballCameraControllerComponent(gameObject, engineStateToGetData)
                  ], /* tuple */[
                    store,
                    dispatchFunc
                  ], true, _buildArcballCamera);
    case 4 : 
        return buildComponentBox(/* tuple */[
                    "BasicCameraView",
                    GameObjectComponentEngineService$WonderEditor.getBasicCameraViewComponent(gameObject, engineStateToGetData)
                  ], /* tuple */[
                    store,
                    dispatchFunc
                  ], true, _buildBasicCameraViewFunc);
    case 5 : 
        return buildComponentBox(/* tuple */[
                    "PerspectiveCameraProjection",
                    GameObjectComponentEngineService$WonderEditor.getPerspectiveCameraProjectionComponent(gameObject, engineStateToGetData)
                  ], /* tuple */[
                    store,
                    dispatchFunc
                  ], true, _buildPerspectiveCameraProjection);
    case 6 : 
        return buildComponentBox(/* tuple */[
                    "Material",
                    MaterialEngineService$WonderEditor.getMaterialComponent(gameObject, engineStateToGetData)
                  ], /* tuple */[
                    store,
                    dispatchFunc
                  ], true, _buildMaterialFunc);
    case 7 : 
        return buildComponentBox(/* tuple */[
                    "Light",
                    LightEngineService$WonderEditor.getLightComponent(gameObject, engineStateToGetData)
                  ], /* tuple */[
                    store,
                    dispatchFunc
                  ], true, _buildLightFunc);
    case 8 : 
        return null;
    
  }
}

export {
  buildComponentBox ,
  _buildTransformFunc ,
  _buildMaterialFunc ,
  _buildLightFunc ,
  _buildSouceInstanceFunc ,
  _buildMeshRendererFunc ,
  _buildGeometryFunc ,
  _buildBasicCameraViewFunc ,
  _buildPerspectiveCameraProjection ,
  _buildArcballCamera ,
  buildComponentUIComponent ,
  
}
/* react Not a pure module */
