

import * as ReasonReact from "../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Header$WonderEditor from "../../src/core/composable_component/header/ui/Header.js";
import * as ReactTestRenderer from "react-test-renderer";
import * as TestTool$WonderEditor from "./TestTool.js";
import * as GameObjectTool$WonderEditor from "./GameObjectTool.js";
import * as MainEditorAsset$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/ui/MainEditorAsset.js";
import * as MainEditorLight$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/ui/MainEditorLight.js";
import * as MainEditorConsole$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/console/ui/MainEditorConsole.js";
import * as MainEditorGeometry$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/geometry/ui/MainEditorGeometry.js";
import * as MainEditorMaterial$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/ui/MainEditorMaterial.js";
import * as MainEditorAssetTree$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/composable_component/assetTree/ui/MainEditorAssetTree.js";
import * as MainEditorInspector$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/ui/MainEditorInspector.js";
import * as MainEditorSceneTree$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/left_components/composable_component/sceneTree/ui/MainEditorSceneTree.js";
import * as MainEditorTransform$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/ui/MainEditorTransform.js";
import * as MainEditorCameraView$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/cameraGroup/atom_component/cameraView/ui/MainEditorCameraView.js";
import * as MainEditorPointLight$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/composable_component/point_light/ui/MainEditorPointLight.js";
import * as MainEditorBottomHeader$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/bottom_components/atom_component/header/ui/MainEditorBottomHeader.js";
import * as MainEditorMeshRenderer$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/meshRenderer/ui/MainEditorMeshRenderer.js";
import * as MainEditorBasicMaterial$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/composable_component/basic_material/ui/MainEditorBasicMaterial.js";
import * as MainEditorLightMaterial$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/composable_component/light_material/ui/MainEditorLightMaterial.js";
import * as MainEditorDirectionLight$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/composable_component/direction_light/ui/MainEditorDirectionLight.js";
import * as MainEditorBottomComponents$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/bottom_components/ui/MainEditorBottomComponents.js";
import * as MainEditorCameraProjection$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/cameraGroup/atom_component/cameraProjection/ui/MainEditorCameraProjection.js";
import * as MainEditorAssetChildrenNode$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/composable_component/assetChildrenNode/ui/MainEditorAssetChildrenNode.js";

function buildHeader(store) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, Header$WonderEditor.make(store, TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

function buildSceneTree(store) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorSceneTree$WonderEditor.make(store, TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

function buildConsole($staropt$star, $staropt$star$1, param) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorConsole$WonderEditor.make(store, dispatchFunc, /* array */[])));
}

function buildBottom($staropt$star, $staropt$star$1, param) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorBottomComponents$WonderEditor.make(store, dispatchFunc, /* array */[])));
}

function buildBottomHeader($staropt$star, $staropt$star$1, param) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorBottomHeader$WonderEditor.make(store, dispatchFunc, /* array */[])));
}

function buildCameraProjection(param) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorCameraProjection$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

function buildCameraView(store) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorCameraView$WonderEditor.make(store, TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

function buildInspectorComponent(store, addableComponentConfig) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorInspector$WonderEditor.make(store, TestTool$WonderEditor.getDispatch(/* () */0), addableComponentConfig, /* array */[])));
}

function buildMeshRenderer(store) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorMeshRenderer$WonderEditor.make(store, TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

function buildGeometry(geometryComponent, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var gameObject = $staropt$star !== undefined ? $staropt$star : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  var store = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : TestTool$WonderEditor.getDispatch(/* () */0);
  var isShowGeometryGroup = $staropt$star$3 !== undefined ? $staropt$star$3 : false;
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorGeometry$WonderEditor.make(store, dispatchFunc, gameObject, geometryComponent, isShowGeometryGroup, /* array */[])));
}

function buildMainEditorTransformComponent(store, transformComponent) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorTransform$WonderEditor.make(store, TestTool$WonderEditor.getDispatch(/* () */0), transformComponent, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), /* array */[])));
}

function buildMaterial($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  if ($staropt$star === undefined) {
    GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  }
  if ($staropt$star$1 === undefined) {
    TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  }
  if ($staropt$star$2 === undefined) {
    TestTool$WonderEditor.getDispatch(/* () */0);
  }
  var isShowMaterialGroup = $staropt$star$3 !== undefined ? $staropt$star$3 : false;
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorMaterial$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), isShowMaterialGroup, /* array */[])));
}

function buildBasicMaterial(materialComponent) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorBasicMaterial$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), materialComponent, /* array */[])));
}

function buildLightMaterial(materialComponent) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorLightMaterial$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), materialComponent, /* array */[])));
}

function buildLight(param) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorLight$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

function buildDirectionLight(lightComponent) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorDirectionLight$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), lightComponent, /* array */[])));
}

function buildPointLight(lightComponent) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorPointLight$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), lightComponent, /* array */[])));
}

function buildAssetComponent(param) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorAsset$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

function buildAssetTree(param) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorAssetTree$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), document.createElement("img"), /* array */[])));
}

function buildAssetChildrenNode($staropt$star, param) {
  var debounceTime = $staropt$star !== undefined ? $staropt$star : 10;
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorAssetChildrenNode$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), document.createElement("img"), debounceTime, /* array */[])));
}

export {
  buildHeader ,
  buildSceneTree ,
  buildConsole ,
  buildBottom ,
  buildBottomHeader ,
  buildCameraProjection ,
  buildCameraView ,
  buildInspectorComponent ,
  buildMeshRenderer ,
  buildGeometry ,
  buildMainEditorTransformComponent ,
  buildMaterial ,
  buildBasicMaterial ,
  buildLightMaterial ,
  buildLight ,
  buildDirectionLight ,
  buildPointLight ,
  buildAssetComponent ,
  buildAssetTree ,
  buildAssetChildrenNode ,
  
}
/* ReasonReact Not a pure module */
