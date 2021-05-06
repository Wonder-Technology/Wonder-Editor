'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Color$WonderEditor = require("../../../../../../../../../src/core/external/Color.js");
var MainUtils$WonderEditor = require("../../../../../../../../../src/core/utils/engine/MainUtils.js");
var EventListenerTool$WonderEditor = require("../../../../../../../../unit/tool/EventListenerTool.js");
var StateEditorService$WonderEditor = require("../../../../../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../../../../../src/service/state/engine/state/StateEngineService.js");
var InspectorEngineTool$WonderEditor = require("../../../../../../../../tool/InspectorEngineTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../../../tool/MainEditorSceneTool.js");
var MaterialInspectorTool$WonderEditor = require("../../tool/MaterialInspectorTool.js");
var BasicMaterialEngineService$WonderEditor = require("../../../../../../../../../src/service/state/engine/BasicMaterialEngineService.js");
var MaterialInspectorCanvasTool$WonderEditor = require("../../tool/MaterialInspectorCanvasTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../../../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../../../../../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var MaterialInspectorEngineUtils$WonderEditor = require("../../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/material_Inspector/utils/MaterialInspectorEngineUtils.js");
var MainEditorBasicMaterialForAssetTool$WonderEditor = require("../tool/MainEditorBasicMaterialForAssetTool.js");
var MainEditorBasicMaterialForGameObjectTool$WonderEditor = require("../../../../../sceneTree_inspector/renderGroup/material/tool/MainEditorBasicMaterialForGameObjectTool.js");

Wonder_jest.describe("MainEditorBasicMaterialForAsset component", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test change inspectorEngine value", (function (param) {
                      var _prepareMaterialSphere = function (inspectorEngineState) {
                        var match = MaterialInspectorCanvasTool$WonderEditor.createNewMaterial(/* () */0);
                        var newMaterialComponent = match[1];
                        var addedMaterialNodeId = match[0];
                        MaterialInspectorTool$WonderEditor.changeMaterialType(newMaterialComponent, /* LightMaterial */1, /* BasicMaterial */0, addedMaterialNodeId, undefined, undefined, /* () */0);
                        var match$1 = MaterialInspectorEngineUtils$WonderEditor.createMaterialSphereIntoInspectorCanvas(/* BasicMaterial */0, newMaterialComponent, StateEditorService$WonderEditor.getState(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0), inspectorEngineState);
                        StateEditorService$WonderEditor.setState(match$1[0]);
                        var materialSphereBasicMaterial = InspectorEngineTool$WonderEditor.getMaterialSphereBasicMaterial(StateEditorService$WonderEditor.getState(/* () */0), match$1[1][0]);
                        return /* tuple */[
                                materialSphereBasicMaterial,
                                newMaterialComponent,
                                addedMaterialNodeId
                              ];
                      };
                      beforeEach((function () {
                              MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n              {\n                \"name\": \"default\",\n                \"jobs\": [\n                    {\"name\": \"init_inspector_engine\" }\n                ]\n              }\n            ]\n             ", undefined, "\n             [\n                {\"name\": \"init_inspector_engine\" }\n             ]\n             ", undefined, /* () */0), undefined, false, /* () */0);
                              StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
                              MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                              return MainEditorBasicMaterialForGameObjectTool$WonderEditor.changeMaterialTypeToBeBasicMaterial(undefined, undefined, /* () */0);
                            }));
                      return Wonder_jest.describe("test change basicMaterial asset's value should change materialSphere's basicMaterial's value", (function (param) {
                                    return Wonder_jest.test("test change color", (function (param) {
                                                  var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                  var match = _prepareMaterialSphere(inspectorEngineState);
                                                  var newColor = {
                                                    hex: "#7df1e8",
                                                    rgb: {
                                                      r: 125,
                                                      g: 241,
                                                      b: 232
                                                    }
                                                  };
                                                  MainEditorBasicMaterialForAssetTool$WonderEditor.changeColor(match[1], newColor);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Color$WonderEditor.getHexString(BasicMaterialEngineService$WonderEditor.getColor(match[0], inspectorEngineState))), newColor.hex);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
