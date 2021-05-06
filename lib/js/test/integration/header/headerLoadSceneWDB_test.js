'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var WDBTool$WonderEditor = require("../../tool/WDBTool.js");
var LoadTool$WonderEditor = require("../asset/tool/LoadTool.js");
var TestTool$WonderEditor = require("../../tool/TestTool.js");
var OptionService$WonderEditor = require("../../../src/service/primitive/OptionService.js");
var ReactTestTool$WonderEditor = require("../../tool/ReactTestTool.js");
var GLSLToolEngine$WonderEditor = require("../../tool/engine/GLSLToolEngine.js");
var FakeGlToolEngine$WonderEditor = require("../../tool/engine/FakeGlToolEngine.js");
var LoadSceneWDBTool$WonderEditor = require("./tool/LoadSceneWDBTool.js");
var BuildComponentTool$WonderEditor = require("../../tool/BuildComponentTool.js");
var DirectorToolEngine$WonderEditor = require("../../tool/engine/DirectorToolEngine.js");
var SceneEngineService$WonderEditor = require("../../../src/service/state/engine/SceneEngineService.js");
var StateEditorService$WonderEditor = require("../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorAssetTool$WonderEditor = require("../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var GameObjectToolEngine$WonderEditor = require("../../tool/engine/GameObjectToolEngine.js");
var GameViewEditorService$WonderEditor = require("../../../src/service/state/editor/view/gameView/GameViewEditorService.js");
var FlyCameraEngineService$WonderEditor = require("../../../src/service/state/engine/FlyCameraEngineService.js");
var SceneViewEditorService$WonderEditor = require("../../../src/service/state/editor/view/sceneView/SceneViewEditorService.js");
var GameObjectEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/GameObjectEngineService.js");
var LightMaterialToolEngine$WonderEditor = require("../../tool/engine/LightMaterialToolEngine.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../tool/engine/NoWorkerJobConfigToolEngine.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");

Wonder_jest.describe("header load scene wdb", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var boxTexturedWDBArrayBuffer = /* record */[/* contents */1];
        var sceneWDBArrayBuffer = /* record */[/* contents */1];
        beforeAll((function () {
                boxTexturedWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("BoxTextured");
                sceneWDBArrayBuffer[0] = WDBTool$WonderEditor.generateSceneWDBWithFlyCameraController(/* () */0);
                return /* () */0;
              }));
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, false, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                return DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test load scene wdb", (function (param) {
                      beforeEach((function () {
                              Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                              LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                              LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                              return LoadTool$WonderEditor.buildFakeLoadImage();
                            }));
                      Wonder_jest.testPromise("should clear current scene tree node", undefined, (function (param) {
                              return LoadSceneWDBTool$WonderEditor.loadSceneWDB(sceneWDBArrayBuffer[0], undefined, "Scene", /* () */0).then((function (param) {
                                            return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0))));
                                          }));
                            }));
                      Wonder_jest.describe("test load no light scene wdb to scene which has light", (function (param) {
                              var _prepare = function (testFunc) {
                                var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                var glShaderSource = gl.shaderSource;
                                var shaderSourceCountBeforeLoadSceneWDB = GLSLToolEngine$WonderEditor.getShaderSourceCallCount(glShaderSource);
                                return LoadSceneWDBTool$WonderEditor.loadSceneWDB(boxTexturedWDBArrayBuffer[0], undefined, "BoxTextured", /* () */0).then((function (param) {
                                              return Curry._2(testFunc, shaderSourceCountBeforeLoadSceneWDB, glShaderSource);
                                            }));
                              };
                              Wonder_jest.testPromise("new scene->cube->glsl should has no light count", undefined, (function (param) {
                                      return _prepare((function (shaderSourceCountBeforeLoadSceneWDB, glShaderSource) {
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getVsSourceByCount(glShaderSource, shaderSourceCountBeforeLoadSceneWDB), "#define DIRECTION_LIGHTS_COUNT 0"),
                                                                        GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getFsSourceByCount(glShaderSource, shaderSourceCountBeforeLoadSceneWDB), "#define POINT_LIGHTS_COUNT 0")
                                                                      ]), /* tuple */[
                                                                    true,
                                                                    true
                                                                  ]));
                                                  }));
                                    }));
                              return Wonder_jest.testPromise("if add light material and init after load, its glsl should has no light count", undefined, (function (param) {
                                            return _prepare((function (shaderSourceCountBeforeLoadSceneWDB, glShaderSource) {
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          var match = LightMaterialToolEngine$WonderEditor.createGameObject(engineState);
                                                          GameObjectEngineService$WonderEditor.initGameObject(match[1], match[0]);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getVsSourceByCount(glShaderSource, shaderSourceCountBeforeLoadSceneWDB + 1 | 0), "#define DIRECTION_LIGHTS_COUNT 0"),
                                                                              GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getFsSourceByCount(glShaderSource, shaderSourceCountBeforeLoadSceneWDB + 1 | 0), "#define POINT_LIGHTS_COUNT 0")
                                                                            ]), /* tuple */[
                                                                          true,
                                                                          true
                                                                        ]));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("test bind fly event", (function (param) {
                              return Wonder_jest.testPromise("should not bind scene wdb->fly cameraControllers event(instead bind editCamera->fly cameraController)", undefined, (function (param) {
                                            return LoadSceneWDBTool$WonderEditor.loadSceneWDB(sceneWDBArrayBuffer[0], undefined, "Scene", /* () */0).then((function (param) {
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          var __x = SceneViewEditorService$WonderEditor.unsafeGetEditCamera(StateEditorService$WonderEditor.getState(/* () */0));
                                                          var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetFlyCameraControllerComponent(__x, engineState);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              GameObjectToolEngine$WonderEditor.getAllFlyCameraControllers(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState).filter((function (cameraController) {
                                                                                      return FlyCameraEngineService$WonderEditor.isBindFlyCameraControllerEventForGameView(cameraController, engineState);
                                                                                    })).length,
                                                                              FlyCameraEngineService$WonderEditor.isBindFlyCameraControllerEventForGameView(__x$1, engineState)
                                                                            ]), /* tuple */[
                                                                          0,
                                                                          true
                                                                        ]));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.test("if load no wdb, return", (function (param) {
                              return Wonder_jest.Expect[/* toThrow */18](Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0]((function (param) {
                                                    return LoadSceneWDBTool$WonderEditor.load(TestTool$WonderEditor.getDispatch(/* () */0), {
                                                                target: {
                                                                  files: { }
                                                                },
                                                                preventDefault: (function (param) {
                                                                    return /* () */0;
                                                                  })
                                                              });
                                                  }))));
                            }));
                      return Wonder_jest.describe("set wdb->actived camera to editorState", (function (param) {
                                    Wonder_jest.testPromise("test wdb has one", undefined, (function (param) {
                                            return LoadSceneWDBTool$WonderEditor.loadSceneWDB(sceneWDBArrayBuffer[0], undefined, "Scene", /* () */0).then((function (param) {
                                                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameViewEditorService$WonderEditor.getActivedBasicCameraView(editorState)), OptionService$WonderEditor.unsafeGet(GameObjectEngineService$WonderEditor.getGameObjectActiveBasicCameraView(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)))));
                                                        }));
                                          }));
                                    return Wonder_jest.testPromise("test wdb not has one", undefined, (function (param) {
                                                  return LoadSceneWDBTool$WonderEditor.loadSceneWDB(boxTexturedWDBArrayBuffer[0], undefined, "BoxTextured", /* () */0).then((function (param) {
                                                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameViewEditorService$WonderEditor.getActivedBasicCameraView(editorState)), undefined));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
