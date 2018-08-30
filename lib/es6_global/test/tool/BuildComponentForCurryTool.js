

import * as ReasonReact from "../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Header$WonderEditor from "../../src/core/composable_component/header/ui/Header.js";
import * as ReactTestRenderer from "react-test-renderer";
import * as TestTool$WonderEditor from "./TestTool.js";
import * as InspectorTool$WonderEditor from "./ui/InspectorTool.js";
import * as GameObjectTool$WonderEditor from "./GameObjectTool.js";
import * as MainEditorLight$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/ui/MainEditorLight.js";
import * as MainEditorGeometry$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/geometry/ui/MainEditorGeometry.js";
import * as MainEditorMaterial$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/ui/MainEditorMaterial.js";
import * as MainEditorInspector$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/ui/MainEditorInspector.js";
import * as MainEditorSceneTree$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/sceneTree/ui/MainEditorSceneTree.js";
import * as MainEditorTransform$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/ui/MainEditorTransform.js";
import * as MainEditorCameraView$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/cameraGroup/atom_component/cameraView/ui/MainEditorCameraView.js";
import * as MainEditorPointLight$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/composable_component/point_light/ui/MainEditorPointLight.js";
import * as MainEditorMeshRenderer$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/meshRenderer/ui/MainEditorMeshRenderer.js";
import * as MainEditorBasicMaterial$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/composable_component/basic_material/ui/MainEditorBasicMaterial.js";
import * as MainEditorLightMaterial$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/composable_component/light_material/ui/MainEditorLightMaterial.js";
import * as MainEditorDirectionLight$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/composable_component/direction_light/ui/MainEditorDirectionLight.js";
import * as MainEditorCameraProjection$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/cameraGroup/atom_component/cameraProjection/ui/MainEditorCameraProjection.js";

function buildCameraView() {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorCameraView$WonderEditor.make(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

function buildSceneTree() {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorSceneTree$WonderEditor.make(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

function buildLight() {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorLight$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

function buildGeometry() {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorGeometry$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), GameObjectTool$WonderEditor.getCurrentGameObjectGeometry(/* () */0), /* array */[])));
}

function buildMeshRenderer() {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorMeshRenderer$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

function buildMaterial() {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorMaterial$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

function buildBasicMaterial() {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorBasicMaterial$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), GameObjectTool$WonderEditor.getCurrentGameObjectBasicMaterial(/* () */0), /* array */[])));
}

function buildLightMaterial() {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorLightMaterial$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), GameObjectTool$WonderEditor.getCurrentGameObjectLightMaterial(/* () */0), /* array */[])));
}

function buildInspectorComponent() {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorInspector$WonderEditor.make(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0), /* array */[])));
}

function buildMainEditorTransformComponent() {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorTransform$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0), /* array */[])));
}

function buildDirectionLight() {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorDirectionLight$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), GameObjectTool$WonderEditor.getCurrentGameObjectDirectionLightComponent(/* () */0), /* array */[])));
}

function buildCameraProjection() {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorCameraProjection$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

function buildPointLight() {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorPointLight$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), GameObjectTool$WonderEditor.getCurrentGameObjectPointLightComponent(/* () */0), /* array */[])));
}

function buildHeader() {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, Header$WonderEditor.make(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

export {
  buildCameraView ,
  buildSceneTree ,
  buildLight ,
  buildGeometry ,
  buildMeshRenderer ,
  buildMaterial ,
  buildBasicMaterial ,
  buildLightMaterial ,
  buildInspectorComponent ,
  buildMainEditorTransformComponent ,
  buildDirectionLight ,
  buildCameraProjection ,
  buildPointLight ,
  buildHeader ,
  
}
/* ReasonReact Not a pure module */
