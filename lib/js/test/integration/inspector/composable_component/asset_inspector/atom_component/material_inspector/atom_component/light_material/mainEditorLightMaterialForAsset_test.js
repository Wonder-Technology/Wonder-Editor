'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Color$WonderEditor = require("../../../../../../../../../src/core/external/Color.js");
var AppStore$WonderEditor = require("../../../../../../../../../src/core/ui/store/AppStore.js");
var MainUtils$WonderEditor = require("../../../../../../../../../src/core/utils/engine/MainUtils.js");
var ReactTool$WonderEditor = require("../../../../../../../../tool/ui/ReactTool.js");
var CanvasTool$WonderEditor = require("../../../../../../../../unit/atom_component/canvas/tool/CanvasTool.js");
var EventListenerTool$WonderEditor = require("../../../../../../../../unit/tool/EventListenerTool.js");
var MainEditorAssetTool$WonderEditor = require("../../../../../../../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../../../../../../asset/tool/MainEditorAssetUploadTool.js");
var LightMaterialEngineService$WonderEditor = require("../../../../../../../../../src/service/state/engine/LightMaterialEngineService.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../../../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../../../../../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var MainEditorLightMaterialForAssetTool$WonderEditor = require("../tool/MainEditorLightMaterialForAssetTool.js");

Wonder_jest.describe("MainEditorLightMaterialForAsset component", (function (param) {
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
                      beforeEach((function () {
                              MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n              {\n                \"name\": \"default\",\n                \"jobs\": [\n                    {\"name\": \"init_inspector_engine\" }\n                ]\n              }\n            ]\n             ", undefined, "\n             [\n                {\"name\": \"init_inspector_engine\" }\n             ]\n             ", undefined, /* () */0), undefined, false, /* () */0);
                              StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
                              return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                            }));
                      Wonder_jest.describe("test change currentSceneTreeNode's lightMaterial value should change materialSphere's lightMaterial value", (function (param) {
                              Wonder_jest.test("test change color", (function (param) {
                                      var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      var match = MainEditorLightMaterialForAssetTool$WonderEditor.prepareMaterialSphere(inspectorEngineState);
                                      StateInspectorEngineService$WonderEditor.setState(match[0]);
                                      var newColor = {
                                        hex: "#7df1e8",
                                        rgb: {
                                          r: 125,
                                          g: 241,
                                          b: 232
                                        }
                                      };
                                      MainEditorLightMaterialForAssetTool$WonderEditor.changeColor(match[2], newColor);
                                      var inspectorEngineState$1 = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Color$WonderEditor.getHexString(LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseColor(match[1], inspectorEngineState$1))), newColor.hex);
                                    }));
                              return Wonder_jest.test("test change shininess", (function (param) {
                                            var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                            var match = MainEditorLightMaterialForAssetTool$WonderEditor.prepareMaterialSphere(inspectorEngineState);
                                            StateInspectorEngineService$WonderEditor.setState(match[0]);
                                            MainEditorLightMaterialForAssetTool$WonderEditor.changeShininess(match[2], 20.5, /* () */0);
                                            var inspectorEngineState$1 = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialEngineService$WonderEditor.getLightMaterialShininess(match[1], inspectorEngineState$1)), 20.5);
                                          }));
                            }));
                      return Wonder_jest.describe("redraw inspector canvas", (function (param) {
                                    beforeEach((function () {
                                            Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                                            return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                                          }));
                                    afterEach((function () {
                                            return CanvasTool$WonderEditor.restoreMainCanvasAndInspectorCanvasDom(/* () */0);
                                          }));
                                    Wonder_jest.describe("drag texture", (function (param) {
                                            return Wonder_jest.testPromise("dispatch Inspector", undefined, (function (param) {
                                                          var dispatchFuncStub = ReactTool$WonderEditor.createDispatchFuncStub(sandbox);
                                                          var match = MainEditorLightMaterialForAssetTool$WonderEditor.prepareInspectorMaterialSphereAndImgCanvas(sandbox, undefined, undefined, /* () */0);
                                                          var newMaterialComponent = match[1];
                                                          var addedMaterialNodeId = match[0];
                                                          return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                                        MainEditorLightMaterialForAssetTool$WonderEditor.dragAssetTextureToMap(addedMaterialNodeId, uploadedTextureNodeId, undefined, undefined, newMaterialComponent, /* () */0);
                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg([
                                                                                                    AppStore$WonderEditor.UpdateAction,
                                                                                                    /* Update */[/* array */[/* Inspector */2]]
                                                                                                  ], dispatchFuncStub))), 1));
                                                                      }));
                                                        }));
                                          }));
                                    return Wonder_jest.describe("remove texture", (function (param) {
                                                  return Wonder_jest.testPromise("dispatch Inspector", undefined, (function (param) {
                                                                var dispatchFuncStub = ReactTool$WonderEditor.createDispatchFuncStub(sandbox);
                                                                var match = MainEditorLightMaterialForAssetTool$WonderEditor.prepareInspectorMaterialSphereAndImgCanvas(sandbox, undefined, undefined, /* () */0);
                                                                var newMaterialComponent = match[1];
                                                                var addedMaterialNodeId = match[0];
                                                                return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                                              MainEditorLightMaterialForAssetTool$WonderEditor.dragAssetTextureToMap(addedMaterialNodeId, uploadedTextureNodeId, undefined, undefined, newMaterialComponent, /* () */0);
                                                                              MainEditorLightMaterialForAssetTool$WonderEditor.removeTexture(uploadedTextureNodeId, newMaterialComponent, undefined, undefined, /* () */0);
                                                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg([
                                                                                                          AppStore$WonderEditor.UpdateAction,
                                                                                                          /* Update */[/* array */[/* Inspector */2]]
                                                                                                        ], dispatchFuncStub))), 2));
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
