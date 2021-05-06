'use strict';

var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");
var ReactTestRenderer = require("react-test-renderer");
var TestTool$WonderEditor = require("./TestTool.js");
var Controller$WonderEditor = require("../../src/core/composable_component/controller/ui/Controller.js");
var InspectorTool$WonderEditor = require("./ui/InspectorTool.js");
var GameObjectTool$WonderEditor = require("./GameObjectTool.js");
var MainEditorLight$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/ui/MainEditorLight.js");
var MainEditorGeometry$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/geometry/ui/MainEditorGeometry.js");
var MainEditorMaterial$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/ui/MainEditorMaterial.js");
var MainEditorInspector$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/ui/MainEditorInspector.js");
var MainEditorSceneTree$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/left_components/composable_component/sceneTree/ui/MainEditorSceneTree.js");
var MainEditorTransform$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/ui/MainEditorTransform.js");
var MainEditorCameraView$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/cameraGroup/atom_component/cameraView/ui/MainEditorCameraView.js");
var MainEditorPointLight$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/composable_component/point_light/ui/MainEditorPointLight.js");
var MainEditorMeshRenderer$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/meshRenderer/ui/MainEditorMeshRenderer.js");
var MainEditorDirectionLight$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/composable_component/direction_light/ui/MainEditorDirectionLight.js");
var MainEditorCameraProjection$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/cameraGroup/atom_component/cameraProjection/ui/MainEditorCameraProjection.js");
var MainEditorBasicMaterialForGameObject$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/composable_component/basic_material/ui/MainEditorBasicMaterialForGameObject.js");
var MainEditorLightMaterialForGameObject$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/composable_component/light_material/ui/MainEditorLightMaterialForGameObject.js");

function buildCameraView(param) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorCameraView$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

function buildSceneTree(param) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorSceneTree$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

function buildLight(param) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorLight$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

function buildGeometry(param) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorGeometry$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), GameObjectTool$WonderEditor.getCurrentSceneTreeNodeGeometry(/* () */0), false, /* array */[])));
}

function buildMeshRenderer(param) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorMeshRenderer$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

function buildMaterial(param) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorMaterial$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), undefined, /* array */[])));
}

function buildBasicMaterialForGameObject(param) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorBasicMaterialForGameObject$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), GameObjectTool$WonderEditor.getCurrentSceneTreeNodeBasicMaterial(/* () */0), /* array */[])));
}

function buildLightMaterialForGameObject(param) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorLightMaterialForGameObject$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), GameObjectTool$WonderEditor.getCurrentSceneTreeNodeLightMaterial(/* () */0), /* array */[])));
}

function buildInspectorComponent(param) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorInspector$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0), /* array */[])));
}

function buildMainEditorTransformComponent(param) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorTransform$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0), GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), /* array */[])));
}

function buildDirectionLight(param) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorDirectionLight$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), GameObjectTool$WonderEditor.getCurrentSceneTreeNodeDirectionLightComponent(/* () */0), /* array */[])));
}

function buildCameraProjection(param) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorCameraProjection$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

function buildPointLight(param) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorPointLight$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), GameObjectTool$WonderEditor.getCurrentSceneTreeNodePointLightComponent(/* () */0), /* array */[])));
}

function buildController(param) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, Controller$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

exports.buildCameraView = buildCameraView;
exports.buildSceneTree = buildSceneTree;
exports.buildLight = buildLight;
exports.buildGeometry = buildGeometry;
exports.buildMeshRenderer = buildMeshRenderer;
exports.buildMaterial = buildMaterial;
exports.buildBasicMaterialForGameObject = buildBasicMaterialForGameObject;
exports.buildLightMaterialForGameObject = buildLightMaterialForGameObject;
exports.buildInspectorComponent = buildInspectorComponent;
exports.buildMainEditorTransformComponent = buildMainEditorTransformComponent;
exports.buildDirectionLight = buildDirectionLight;
exports.buildCameraProjection = buildCameraProjection;
exports.buildPointLight = buildPointLight;
exports.buildController = buildController;
/* ReasonReact Not a pure module */
