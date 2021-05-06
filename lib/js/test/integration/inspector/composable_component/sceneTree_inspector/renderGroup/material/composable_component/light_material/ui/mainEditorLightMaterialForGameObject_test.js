'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Color$WonderEditor = require("../../../../../../../../../../src/core/external/Color.js");
var TestTool$WonderEditor = require("../../../../../../../../../tool/TestTool.js");
var MainUtils$WonderEditor = require("../../../../../../../../../../src/core/utils/engine/MainUtils.js");
var CanvasTool$WonderEditor = require("../../../../../../../../../unit/atom_component/canvas/tool/CanvasTool.js");
var ConsoleTool$WonderEditor = require("../../../../../../../../../unit/tool/external/ConsoleTool.js");
var FloatService$WonderEditor = require("../../../../../../../../../../src/service/atom/FloatService.js");
var InspectorTool$WonderEditor = require("../../../../../../../../../tool/ui/InspectorTool.js");
var PickColorTool$WonderEditor = require("../../../../../../../../../tool/PickColorTool.js");
var ReactTestTool$WonderEditor = require("../../../../../../../../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../../../../../../../../tool/GameObjectTool.js");
var EventListenerTool$WonderEditor = require("../../../../../../../../../unit/tool/EventListenerTool.js");
var StateLogicService$WonderEditor = require("../../../../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../../../../../../../tool/BuildComponentTool.js");
var DirectorToolEngine$WonderEditor = require("../../../../../../../../../tool/engine/DirectorToolEngine.js");
var StateEditorService$WonderEditor = require("../../../../../../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorAssetTool$WonderEditor = require("../../../../../../../../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../../../../tool/MainEditorSceneTool.js");
var GeometryEngineService$WonderEditor = require("../../../../../../../../../../src/service/state/engine/GeometryEngineService.js");
var SceneTreeEditorService$WonderEditor = require("../../../../../../../../../../src/service/state/editor/sceneTree/SceneTreeEditorService.js");
var SceneTreeWidgetService$WonderEditor = require("../../../../../../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../../../../../../../asset/tool/MainEditorAssetTreeTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../../../../../../../asset/tool/MainEditorAssetUploadTool.js");
var LightMaterialEngineService$WonderEditor = require("../../../../../../../../../../src/service/state/engine/LightMaterialEngineService.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../../../../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../../../../../../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var CurrentNodeIdAssetEditorService$WonderEditor = require("../../../../../../../../../../src/service/state/editor/asset/CurrentNodeIdAssetEditorService.js");
var CurrentSelectSourceEditorService$WonderEditor = require("../../../../../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../../../../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../../../../../../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");
var MainEditorInspectorRemoveComponentTool$WonderEditor = require("../../../../../../../atom_component/addableComponent/tool/MainEditorInspectorRemoveComponentTool.js");
var MainEditorLightMaterialForGameObjectTool$WonderEditor = require("../../../tool/MainEditorLightMaterialForGameObjectTool.js");
var SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor = require("../../../../../../../../../../src/service/state/editor/asset/SelectedFolderNodeIdInAssetTreeAssetEditorService.js");

Wonder_jest.describe("MainEditorLightMaterialForGameObject component", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareWithEmptyJob = function (param) {
          MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
          return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
        };
        var _prepareWithJob = function (param) {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
          return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test set currentSceneTreeNode", (function (param) {
                      Wonder_jest.describe("test change color", (function (param) {
                              beforeEach((function () {
                                      _prepareWithJob(/* () */0);
                                      MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                      return DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
                                    }));
                              return PickColorTool$WonderEditor.testOperateColorPickToChangeColor(sandbox, /* tuple */[
                                          GameObjectTool$WonderEditor.getCurrentSceneTreeNodeLightMaterial,
                                          MainEditorLightMaterialForGameObjectTool$WonderEditor.changeColor,
                                          LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseColor
                                        ]);
                            }));
                      Wonder_jest.describe("test gameObject light material texture", (function (param) {
                              var _getGameObjectMaterialMap = function (engineState, gameObject) {
                                return LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseMap(GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject, engineState), engineState);
                              };
                              beforeEach((function () {
                                      _prepareWithEmptyJob(/* () */0);
                                      MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function (param) {
                                              MainEditorAssetTool$WonderEditor.initAssetTree(/* () */0);
                                              return MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                            }));
                                      var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                                      return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                                    return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                                                  }));
                                    }));
                              afterEach((function () {
                                      StateEditorService$WonderEditor.setState(SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor.clearSelectedFolderNodeIdInAssetTree(CurrentNodeIdAssetEditorService$WonderEditor.clearCurrentNodeId(StateEditorService$WonderEditor.getState(/* () */0))));
                                      return /* () */0;
                                    }));
                              Wonder_jest.describe("test drag texture to set gameObject material map", (function (param) {
                                      Wonder_jest.describe("test snapshot", (function (param) {
                                              Wonder_jest.test("test no drag", (function (param) {
                                                      Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                    }));
                                              Wonder_jest.test("test drag texture asset into gameObject material map zone, the zone should show the texture source", (function (param) {
                                                      var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildTwoTextureAssetTree */1], /* () */0);
                                                      MainEditorLightMaterialForGameObjectTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData), /* () */0);
                                                      MainEditorLightMaterialForGameObjectTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getSecondTextureNodeId */3], assetTreeData), /* () */0);
                                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                    }));
                                              return Wonder_jest.test("test set map when already has map, material's map should be the new one", (function (param) {
                                                            var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildTwoTextureAssetTree */1], /* () */0);
                                                            MainEditorLightMaterialForGameObjectTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData), /* () */0);
                                                            MainEditorLightMaterialForGameObjectTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getSecondTextureNodeId */3], assetTreeData), /* () */0);
                                                            return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                          }));
                                            }));
                                      Wonder_jest.describe("test logic", (function (param) {
                                              return Wonder_jest.describe("\n              upload texture;\n              drag texture to set gameObject->material->map;\n               ", (function (param) {
                                                            var _prepare = function (testFunc) {
                                                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                                                              return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                                            return Curry._2(testFunc, uploadedTextureNodeId, assetTreeData);
                                                                          }));
                                                            };
                                                            var _exec = function (uploadedTextureNodeId) {
                                                              return MainEditorLightMaterialForGameObjectTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, undefined, uploadedTextureNodeId, /* () */0);
                                                            };
                                                            var _hasMap = function (param) {
                                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                              var currentGameObject = StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
                                                              return LightMaterialEngineService$WonderEditor.hasLightMaterialDiffuseMap(GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(currentGameObject, engineState), engineState);
                                                            };
                                                            beforeEach((function () {
                                                                    Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                                                                    return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                                                                  }));
                                                            Wonder_jest.testPromise("should set texture to be material's map", undefined, (function (param) {
                                                                    return _prepare((function (uploadedTextureNodeId, assetTreeData) {
                                                                                  _exec(uploadedTextureNodeId);
                                                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_hasMap(/* () */0)), true));
                                                                                }));
                                                                  }));
                                                            Wonder_jest.testPromise("if gameObject has no geometry, still can set", undefined, (function (param) {
                                                                    return _prepare((function (uploadedTextureNodeId, assetTreeData) {
                                                                                  MainEditorInspectorRemoveComponentTool$WonderEditor.removeGeometryComponent(undefined, undefined, undefined, /* () */0);
                                                                                  _exec(uploadedTextureNodeId);
                                                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_hasMap(/* () */0)), true));
                                                                                }));
                                                                  }));
                                                            return Wonder_jest.testPromise("if gameObject->geometry has no texCoords, warn and can't set", undefined, (function (param) {
                                                                          return _prepare((function (uploadedTextureNodeId, assetTreeData) {
                                                                                        ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                                                                        var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                                                                        var currentGameObject = StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
                                                                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                        var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(currentGameObject, engineState);
                                                                                        var engineState$1 = GeometryEngineService$WonderEditor.setGeometryTexCoords(new Float32Array(/* array */[]), __x, engineState);
                                                                                        StateEngineService$WonderEditor.setState(engineState$1);
                                                                                        _exec(uploadedTextureNodeId);
                                                                                        var engineMaterialMap = _getGameObjectMaterialMap(StateEngineService$WonderEditor.unsafeGetState(/* () */0), currentGameObject);
                                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                            ConsoleTool$WonderEditor.getMessage(warn).includes("have no texCoords"),
                                                                                                            engineMaterialMap
                                                                                                          ]), /* tuple */[
                                                                                                        true,
                                                                                                        undefined
                                                                                                      ]));
                                                                                      }));
                                                                        }));
                                                          }));
                                            }));
                                      return Wonder_jest.describe("fix bug", (function (param) {
                                                    return Wonder_jest.test("\n              set lightMaterial color;\n              drag texture to set gameObject material texture;\n\n              the color should == original color\n            ", (function (param) {
                                                                  var currentGameObjectMaterial = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeLightMaterial(/* () */0);
                                                                  var newColor = {
                                                                    hex: "#7df1e8",
                                                                    rgb: {
                                                                      r: 125,
                                                                      g: 241,
                                                                      b: 232
                                                                    }
                                                                  };
                                                                  MainEditorLightMaterialForGameObjectTool$WonderEditor.changeColor(currentGameObjectMaterial, newColor);
                                                                  var oldColor = Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                              return LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseColor(currentGameObjectMaterial, param);
                                                                            })));
                                                                  var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildTwoTextureAssetTree */1], /* () */0);
                                                                  MainEditorLightMaterialForGameObjectTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData), /* () */0);
                                                                  MainEditorLightMaterialForGameObjectTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getSecondTextureNodeId */3], assetTreeData), /* () */0);
                                                                  var currentGameObjectMaterial$1 = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeLightMaterial(/* () */0);
                                                                  var newColor$1 = Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                              return LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseColor(currentGameObjectMaterial$1, param);
                                                                            })));
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](newColor$1), oldColor);
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.describe("test set remove texture", (function (param) {
                                            beforeEach((function () {
                                                    MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n                   [\n                    {\n                      \"name\": \"default\",\n                      \"jobs\": [\n                          {\"name\": \"init_inspector_engine\" }\n                      ]\n                    }\n                  ]\n                   ", undefined, "\n                   [\n                      {\"name\": \"init_inspector_engine\" }\n                   ]\n                   ", undefined, /* () */0), undefined, false, /* () */0);
                                                    StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
                                                    CanvasTool$WonderEditor.prepareInspectorCanvasAndImgCanvas(sandbox);
                                                    return /* () */0;
                                                  }));
                                            Wonder_jest.describe("test snapshop", (function (param) {
                                                    Wonder_jest.test("test if not set map,should change nothing", (function (param) {
                                                            var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeTextureNode(undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData), /* () */0);
                                                            return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                          }));
                                                    return Wonder_jest.test("test if have already set map,should remove map", (function (param) {
                                                                  var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                                                                  var textureNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData);
                                                                  MainEditorLightMaterialForGameObjectTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, undefined, textureNodeId, /* () */0);
                                                                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeTextureNode(undefined, undefined, textureNodeId, /* () */0);
                                                                  return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                                }));
                                                  }));
                                            return Wonder_jest.describe("test logic", (function (param) {
                                                          return Wonder_jest.test("should remove material's map", (function (param) {
                                                                        var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                                                                        var textureNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData);
                                                                        MainEditorLightMaterialForGameObjectTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, undefined, textureNodeId, /* () */0);
                                                                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeTextureNode(undefined, undefined, textureNodeId, /* () */0);
                                                                        var currentGameObject = StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
                                                                        var engineMaterialMap = _getGameObjectMaterialMap(StateEngineService$WonderEditor.unsafeGetState(/* () */0), currentGameObject);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](engineMaterialMap), undefined);
                                                                      }));
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("test change light material shininess", (function (param) {
                                    beforeEach((function () {
                                            _prepareWithEmptyJob(/* () */0);
                                            return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                          }));
                                    return Wonder_jest.describe("test logic", (function (param) {
                                                  return Wonder_jest.test("test change shininess should set into engine", (function (param) {
                                                                var currentGameObjectMaterial = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeLightMaterial(/* () */0);
                                                                BuildComponentTool$WonderEditor.buildLightMaterialForGameObject(currentGameObjectMaterial);
                                                                MainEditorLightMaterialForGameObjectTool$WonderEditor.changeShininess(currentGameObjectMaterial, 1.1, /* () */0);
                                                                MainEditorLightMaterialForGameObjectTool$WonderEditor.blurShininess(undefined, undefined, currentGameObjectMaterial, 1.1, /* () */0);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                          return LightMaterialEngineService$WonderEditor.getLightMaterialShininess(currentGameObjectMaterial, param);
                                                                                        })), 5)), 1.1);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
