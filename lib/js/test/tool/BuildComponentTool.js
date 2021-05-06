'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");
var Header$WonderEditor = require("../../src/core/composable_component/header/ui/Header.js");
var ReactTestRenderer = require("react-test-renderer");
var TestTool$WonderEditor = require("./TestTool.js");
var ReactTool$WonderEditor = require("./ui/ReactTool.js");
var SinonTool$WonderEditor = require("./SinonTool.js");
var Controller$WonderEditor = require("../../src/core/composable_component/controller/ui/Controller.js");
var HeaderNotice$WonderEditor = require("../../src/core/composable_component/header/atom_component/notice/HeaderNotice.js");
var GameObjectTool$WonderEditor = require("./GameObjectTool.js");
var MainEditorAsset$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/ui/MainEditorAsset.js");
var MainEditorLight$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/ui/MainEditorLight.js");
var MainEditorScript$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/script/ui/MainEditorScript.js");
var MainEditorConsole$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/console/ui/MainEditorConsole.js");
var StateLogicService$WonderEditor = require("../../src/service/stateTuple/logic/StateLogicService.js");
var AssetInspectorTool$WonderEditor = require("../integration/inspector/composable_component/asset_inspector/tool/AssetInspectorTool.js");
var MainEditorGeometry$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/geometry/ui/MainEditorGeometry.js");
var MainEditorMaterial$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/ui/MainEditorMaterial.js");
var MainEditorAssetTree$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/composable_component/assetTree/ui/MainEditorAssetTree.js");
var MainEditorInspector$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/ui/MainEditorInspector.js");
var MainEditorSceneTree$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/left_components/composable_component/sceneTree/ui/MainEditorSceneTree.js");
var MainEditorTransform$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/ui/MainEditorTransform.js");
var MainEditorCameraView$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/cameraGroup/atom_component/cameraView/ui/MainEditorCameraView.js");
var MainEditorLeftHeader$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/left_components/atom_component/header/MainEditorLeftHeader.js");
var MainEditorPointLight$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/composable_component/point_light/ui/MainEditorPointLight.js");
var MainEditorMaterialMap$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/atom_component/MainEditorMaterialMap.js");
var MainEditorBottomHeader$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/bottom_components/atom_component/header/ui/MainEditorBottomHeader.js");
var MainEditorMeshRenderer$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/meshRenderer/ui/MainEditorMeshRenderer.js");
var MainEditorDirectionLight$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/composable_component/direction_light/ui/MainEditorDirectionLight.js");
var ScriptAttributeInspector$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/scriptAttribute_inspector/ui/ScriptAttributeInspector.js");
var MainEditorScriptAttribute$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/script/atom_component/attribute/ui/MainEditorScriptAttribute.js");
var LightMaterialEngineService$WonderEditor = require("../../src/service/state/engine/LightMaterialEngineService.js");
var MainEditorBottomComponents$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/bottom_components/ui/MainEditorBottomComponents.js");
var MainEditorCameraProjection$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/cameraGroup/atom_component/cameraProjection/ui/MainEditorCameraProjection.js");
var MainEditorAssetChildrenNode$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/composable_component/assetChildrenNode/ui/MainEditorAssetChildrenNode.js");
var ScriptAttributeInspectorTool$WonderEditor = require("../integration/inspector/composable_component/asset_inspector/atom_component/script_inspector/tool/ScriptAttributeInspectorTool.js");
var ScriptEventFunctionInspector$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/scriptEventFunction_inspector/ui/ScriptEventFunctionInspector.js");
var MainEditorScriptEventFunction$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/script/atom_component/eventFunction/ui/MainEditorScriptEventFunction.js");
var ScriptEventFunctionInspectorTool$WonderEditor = require("../integration/inspector/composable_component/asset_inspector/atom_component/script_inspector/tool/ScriptEventFunctionInspectorTool.js");
var MainEditorBasicMaterialForGameObject$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/composable_component/basic_material/ui/MainEditorBasicMaterialForGameObject.js");
var MainEditorLightMaterialForGameObject$WonderEditor = require("../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/composable_component/light_material/ui/MainEditorLightMaterialForGameObject.js");

function buildHeader(uiState) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, Header$WonderEditor.make(uiState, TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

function buildHeaderNotice(param) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, HeaderNotice$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

function buildLeftHeader(param) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorLeftHeader$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

function buildSceneTree(uiState) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorSceneTree$WonderEditor.make(uiState, TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

function buildConsole($staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorConsole$WonderEditor.make(uiState, dispatchFunc, /* array */[])));
}

function buildBottom($staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorBottomComponents$WonderEditor.make(uiState, dispatchFunc, /* array */[])));
}

function buildBottomHeader($staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorBottomHeader$WonderEditor.make(uiState, dispatchFunc, /* array */[])));
}

function buildCameraProjection(param) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorCameraProjection$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

function buildCameraView(uiState) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorCameraView$WonderEditor.make(uiState, TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

function buildInspectorComponent(uiState, addableComponentConfig) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorInspector$WonderEditor.make(uiState, TestTool$WonderEditor.getDispatch(/* () */0), addableComponentConfig, /* array */[])));
}

function buildMeshRenderer(uiState) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorMeshRenderer$WonderEditor.make(uiState, TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

function buildGeometry(geometryComponent, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var gameObject = $staropt$star !== undefined ? $staropt$star : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : TestTool$WonderEditor.getDispatch(/* () */0);
  var isShowGeometryGroup = $staropt$star$3 !== undefined ? $staropt$star$3 : false;
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorGeometry$WonderEditor.make(uiState, dispatchFunc, gameObject, geometryComponent, isShowGeometryGroup, /* array */[])));
}

function buildMainEditorTransformComponent(uiState, transformComponent) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorTransform$WonderEditor.make(uiState, TestTool$WonderEditor.getDispatch(/* () */0), transformComponent, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), /* array */[])));
}

function buildMaterial($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  if ($staropt$star === undefined) {
    GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  }
  if ($staropt$star$1 === undefined) {
    TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  }
  if ($staropt$star$2 !== undefined) {
    Caml_option.valFromOption($staropt$star$2);
  } else {
    TestTool$WonderEditor.getDispatch(/* () */0);
  }
  var isShowMaterialGroup = $staropt$star$3 !== undefined ? $staropt$star$3 : false;
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorMaterial$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), isShowMaterialGroup, /* array */[])));
}

function buildMaterialMap($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var isShowTextureGroup = $staropt$star$2 !== undefined ? $staropt$star$2 : false;
  var materialComponent = $staropt$star$3 !== undefined ? $staropt$star$3 : GameObjectTool$WonderEditor.getCurrentSceneTreeNodeMaterial(/* () */0);
  var partial_arg = /* tuple */[
    uiState,
    dispatchFunc
  ];
  var partial_arg$1 = MainEditorLightMaterialForGameObject$WonderEditor.Method[/* removeTexture */5];
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorMaterialMap$WonderEditor.make(uiState, dispatchFunc, materialComponent, "Diffuse map", LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseMap, Curry._2(MainEditorLightMaterialForGameObject$WonderEditor.Method[/* dragToSetLightMaterialTexture */4], /* tuple */[
                          uiState,
                          dispatchFunc
                        ], materialComponent), (function (param) {
                        return partial_arg$1(partial_arg, /* () */0, param);
                      }), isShowTextureGroup, undefined, /* array */[])));
}

function buildBasicMaterialForGameObject(materialComponent) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorBasicMaterialForGameObject$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), materialComponent, /* array */[])));
}

function buildLightMaterialForGameObject(materialComponent) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorLightMaterialForGameObject$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), materialComponent, /* array */[])));
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

function buildController(param) {
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, Controller$WonderEditor.make(TestTool$WonderEditor.buildEmptyAppState(/* () */0), TestTool$WonderEditor.getDispatch(/* () */0), /* array */[])));
}

function buildUI(ui) {
  return ReactTestRenderer.create(ui);
}

function buildScriptEventFunctionInspectorComponent(currentNodeId, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, param) {
  var name = $staropt$star !== undefined ? $staropt$star : StateLogicService$WonderEditor.getEditorState((function (param) {
            return ScriptEventFunctionInspectorTool$WonderEditor.getEventFunctionName(currentNodeId, param);
          }));
  var eventFunctionData = $staropt$star$1 !== undefined ? $staropt$star$1 : StateLogicService$WonderEditor.getEditorState((function (param) {
            return ScriptEventFunctionInspectorTool$WonderEditor.getEventFunctionData(currentNodeId, param);
          }));
  var uiState = $staropt$star$2 !== undefined ? $staropt$star$2 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$3 !== undefined ? $staropt$star$3 : TestTool$WonderEditor.getDispatch(/* () */0);
  var renameFunc;
  if ($staropt$star$4 !== undefined) {
    renameFunc = $staropt$star$4;
  } else {
    var partial_arg = /* tuple */[
      uiState,
      dispatchFunc
    ];
    var partial_arg$1 = AssetInspectorTool$WonderEditor.Rename[/* renameAssetNode */0];
    renameFunc = (function (param) {
        return partial_arg$1(partial_arg, currentNodeId, param);
      });
  }
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, ScriptEventFunctionInspector$WonderEditor.make(uiState, dispatchFunc, currentNodeId, name, eventFunctionData, renameFunc, /* array */[])));
}

function buildScriptAttributeInspectorComponent(currentNodeId, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, param) {
  var name = $staropt$star !== undefined ? $staropt$star : StateLogicService$WonderEditor.getEditorState((function (param) {
            return ScriptAttributeInspectorTool$WonderEditor.getAttributeName(currentNodeId, param);
          }));
  var attribute = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : StateLogicService$WonderEditor.getEditorState((function (param) {
            return ScriptAttributeInspectorTool$WonderEditor.getAttribute(currentNodeId, param);
          }));
  var uiState = $staropt$star$2 !== undefined ? $staropt$star$2 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$3 !== undefined ? $staropt$star$3 : TestTool$WonderEditor.getDispatch(/* () */0);
  var renameFunc;
  if ($staropt$star$4 !== undefined) {
    renameFunc = $staropt$star$4;
  } else {
    var partial_arg = /* tuple */[
      uiState,
      dispatchFunc
    ];
    var partial_arg$1 = AssetInspectorTool$WonderEditor.Rename[/* renameAssetNode */0];
    renameFunc = (function (param) {
        return partial_arg$1(partial_arg, currentNodeId, param);
      });
  }
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, ScriptAttributeInspector$WonderEditor.make(uiState, dispatchFunc, currentNodeId, name, attribute, renameFunc, /* array */[])));
}

function renderScriptEventFunctionComponent(sandbox, state, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var send = $staropt$star$2 !== undefined ? $staropt$star$2 : Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
  return ReactTestRenderer.create(MainEditorScriptEventFunction$WonderEditor.render(/* tuple */[
                  uiState,
                  dispatchFunc
                ], ReactTool$WonderEditor.buildFakeSelf(state, send)));
}

function renderScriptAttributeComponent(sandbox, state, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var send = $staropt$star$2 !== undefined ? $staropt$star$2 : Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
  return ReactTestRenderer.create(MainEditorScriptAttribute$WonderEditor.render(/* tuple */[
                  uiState,
                  dispatchFunc
                ], ReactTool$WonderEditor.buildFakeSelf(state, send)));
}

function buildScriptComponent(script, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, MainEditorScript$WonderEditor.make(uiState, dispatchFunc, script, /* array */[])));
}

exports.buildHeader = buildHeader;
exports.buildHeaderNotice = buildHeaderNotice;
exports.buildLeftHeader = buildLeftHeader;
exports.buildSceneTree = buildSceneTree;
exports.buildConsole = buildConsole;
exports.buildBottom = buildBottom;
exports.buildBottomHeader = buildBottomHeader;
exports.buildCameraProjection = buildCameraProjection;
exports.buildCameraView = buildCameraView;
exports.buildInspectorComponent = buildInspectorComponent;
exports.buildMeshRenderer = buildMeshRenderer;
exports.buildGeometry = buildGeometry;
exports.buildMainEditorTransformComponent = buildMainEditorTransformComponent;
exports.buildMaterial = buildMaterial;
exports.buildMaterialMap = buildMaterialMap;
exports.buildBasicMaterialForGameObject = buildBasicMaterialForGameObject;
exports.buildLightMaterialForGameObject = buildLightMaterialForGameObject;
exports.buildLight = buildLight;
exports.buildDirectionLight = buildDirectionLight;
exports.buildPointLight = buildPointLight;
exports.buildAssetComponent = buildAssetComponent;
exports.buildAssetTree = buildAssetTree;
exports.buildAssetChildrenNode = buildAssetChildrenNode;
exports.buildController = buildController;
exports.buildUI = buildUI;
exports.buildScriptEventFunctionInspectorComponent = buildScriptEventFunctionInspectorComponent;
exports.buildScriptAttributeInspectorComponent = buildScriptAttributeInspectorComponent;
exports.renderScriptEventFunctionComponent = renderScriptEventFunctionComponent;
exports.renderScriptAttributeComponent = renderScriptAttributeComponent;
exports.buildScriptComponent = buildScriptComponent;
/* ReasonReact Not a pure module */
