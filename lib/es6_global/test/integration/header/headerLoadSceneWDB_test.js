

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as WDBTool$WonderEditor from "../../tool/WDBTool.js";
import * as LoadTool$WonderEditor from "../asset/tool/LoadTool.js";
import * as TestTool$WonderEditor from "../../tool/TestTool.js";
import * as IMGUITool$WonderEditor from "../../unit/tool/IMGUITool.js";
import * as StringTool$WonderEditor from "../../unit/tool/StringTool.js";
import * as OptionService$WonderEditor from "../../../src/service/primitive/OptionService.js";
import * as ReactTestTool$WonderEditor from "../../tool/ReactTestTool.js";
import * as GLSLToolEngine$WonderEditor from "../../tool/engine/GLSLToolEngine.js";
import * as FakeGlToolEngine$WonderEditor from "../../tool/engine/FakeGlToolEngine.js";
import * as LoadSceneWDBTool$WonderEditor from "./tool/LoadSceneWDBTool.js";
import * as BuildComponentTool$WonderEditor from "../../tool/BuildComponentTool.js";
import * as DirectorToolEngine$WonderEditor from "../../tool/engine/DirectorToolEngine.js";
import * as IMGUIEditorService$WonderEditor from "../../../src/service/state/editor/imgui/IMGUIEditorService.js";
import * as SceneEngineService$WonderEditor from "../../../src/service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorAssetTool$WonderEditor from "../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as GameObjectToolEngine$WonderEditor from "../../tool/engine/GameObjectToolEngine.js";
import * as GameViewEditorService$WonderEditor from "../../../src/service/state/editor/view/gameView/GameViewEditorService.js";
import * as SceneViewEditorService$WonderEditor from "../../../src/service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../../src/service/state/engine/GameObjectEngineService.js";
import * as LightMaterialToolEngine$WonderEditor from "../../tool/engine/LightMaterialToolEngine.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../src/service/state/engine/ArcballCameraEngineService.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../src/service/state/engine/GameObjectComponentEngineService.js";

describe("header load scene wdb", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var boxTexturedWDBArrayBuffer = /* record */[/* contents */1];
        var sceneWDBArrayBuffer = /* record */[/* contents */1];
        beforeAll((function () {
                boxTexturedWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("BoxTextured");
                sceneWDBArrayBuffer[0] = WDBTool$WonderEditor.generateSceneWDB(/* () */0);
                return /* () */0;
              }));
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, false, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                return DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test load scene wdb", (function () {
                beforeEach((function () {
                        Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                        LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                        LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                        return LoadTool$WonderEditor.buildFakeLoadImage();
                      }));
                Wonder_jest.testPromise("should clear current scene tree node", (function () {
                        return LoadSceneWDBTool$WonderEditor.loadSceneWDB(sceneWDBArrayBuffer[0], undefined, "Scene", /* () */0).then((function () {
                                      return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0))));
                                    }));
                      }));
                describe("test load no light scene wdb to scene which has light", (function () {
                        var _prepare = function (testFunc) {
                          var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                          var glShaderSource = gl.shaderSource;
                          var shaderSourceCountBeforeLoadSceneWDB = GLSLToolEngine$WonderEditor.getShaderSourceCallCount(glShaderSource);
                          return LoadSceneWDBTool$WonderEditor.loadSceneWDB(boxTexturedWDBArrayBuffer[0], undefined, "BoxTextured", /* () */0).then((function () {
                                        return Curry._2(testFunc, shaderSourceCountBeforeLoadSceneWDB, glShaderSource);
                                      }));
                        };
                        Wonder_jest.testPromise("new scene->box->glsl should has no light count", (function () {
                                return _prepare((function (shaderSourceCountBeforeLoadSceneWDB, glShaderSource) {
                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                  GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getVsSourceByCount(glShaderSource, shaderSourceCountBeforeLoadSceneWDB), "#define DIRECTION_LIGHTS_COUNT 0"),
                                                                  GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getFsSourceByCount(glShaderSource, shaderSourceCountBeforeLoadSceneWDB), "#define POINT_LIGHTS_COUNT 0")
                                                                ]), /* tuple */[
                                                              true,
                                                              true
                                                            ]));
                                            }));
                              }));
                        return Wonder_jest.testPromise("if add light material and init after load, its glsl should has no light count", (function () {
                                      return _prepare((function (shaderSourceCountBeforeLoadSceneWDB, glShaderSource) {
                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                    var match = LightMaterialToolEngine$WonderEditor.createGameObject(engineState);
                                                    GameObjectEngineService$WonderEditor.initGameObject(match[1], match[0]);
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getVsSourceByCount(glShaderSource, shaderSourceCountBeforeLoadSceneWDB + 1 | 0), "#define DIRECTION_LIGHTS_COUNT 0"),
                                                                        GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getFsSourceByCount(glShaderSource, shaderSourceCountBeforeLoadSceneWDB + 1 | 0), "#define POINT_LIGHTS_COUNT 0")
                                                                      ]), /* tuple */[
                                                                    true,
                                                                    true
                                                                  ]));
                                                  }));
                                    }));
                      }));
                describe("test imgui", (function () {
                        describe("test engineState", (function () {
                                describe("if scene wdb's imgui exist", (function () {
                                        return Wonder_jest.testPromise("should save scene wdb's imgui func and customData to editorState", (function () {
                                                      return LoadSceneWDBTool$WonderEditor.loadSceneWDB(sceneWDBArrayBuffer[0], undefined, "Scene", /* () */0).then((function () {
                                                                    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                        StringTool$WonderEditor.removeNewLinesAndSpaces(IMGUITool$WonderEditor.unsafeGetIMGUIFuncStrFromEditorState(editorState)),
                                                                                        IMGUIEditorService$WonderEditor.unsafeGetGameViewIMGUICustomData(editorState)
                                                                                      ]), /* tuple */[
                                                                                    StringTool$WonderEditor.removeNewLinesAndSpaces("function(_,apiJsObj,engineState){\n        var label = apiJsObj.label;\n        return label(/*tuple*/[100,30,300,200], \"imgui\", 0, engineState);\n                               }"),
                                                                                    null
                                                                                  ]));
                                                                  }));
                                                    }));
                                      }));
                                describe("else", (function () {
                                        return Wonder_jest.testPromise("should remove scene wdb's imgui func and customData from editorState", (function () {
                                                      return LoadSceneWDBTool$WonderEditor.loadSceneWDB(sceneWDBArrayBuffer[0], undefined, "Scene", /* () */0).then((function () {
                                                                    return LoadSceneWDBTool$WonderEditor.loadSceneWDB(boxTexturedWDBArrayBuffer[0], undefined, "BoxTextured", /* () */0).then((function () {
                                                                                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                      IMGUIEditorService$WonderEditor.getGameViewIMGUIFunc(editorState),
                                                                                                      IMGUIEditorService$WonderEditor.getGameViewIMGUICustomData(editorState)
                                                                                                    ]), /* tuple */[
                                                                                                  undefined,
                                                                                                  undefined
                                                                                                ]));
                                                                                }));
                                                                  }));
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("test bind arcball event", (function () {
                        return Wonder_jest.testPromise("should not bind scene wdb->arcball cameraControllers(instead bind editCamera->arcball cameraController)", (function () {
                                      return LoadSceneWDBTool$WonderEditor.loadSceneWDB(sceneWDBArrayBuffer[0], undefined, "Scene", /* () */0).then((function () {
                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                    var __x = SceneViewEditorService$WonderEditor.unsafeGetEditCamera(StateEditorService$WonderEditor.getState(/* () */0));
                                                    var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(__x, engineState);
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        GameObjectToolEngine$WonderEditor.getAllArcballCameraControllers(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState).filter((function (cameraController) {
                                                                                return ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(cameraController, engineState);
                                                                              })).length,
                                                                        ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(__x$1, engineState)
                                                                      ]), /* tuple */[
                                                                    0,
                                                                    true
                                                                  ]));
                                                  }));
                                    }));
                      }));
                Wonder_jest.test("if load no wdb, return", (function () {
                        return Wonder_jest.Expect[/* toThrow */18](Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0]((function () {
                                              return LoadSceneWDBTool$WonderEditor.load(TestTool$WonderEditor.getDispatch(/* () */0), {
                                                          target: {
                                                            files: { }
                                                          },
                                                          preventDefault: (function () {
                                                              return /* () */0;
                                                            })
                                                        });
                                            }))));
                      }));
                describe("set wdb->actived camera to editorState", (function () {
                        Wonder_jest.testPromise("test wdb has one", (function () {
                                return LoadSceneWDBTool$WonderEditor.loadSceneWDB(sceneWDBArrayBuffer[0], undefined, "Scene", /* () */0).then((function () {
                                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameViewEditorService$WonderEditor.getActivedBasicCameraView(editorState)), OptionService$WonderEditor.unsafeGet(GameObjectEngineService$WonderEditor.getGameObjectActiveBasicCameraView(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)))));
                                            }));
                              }));
                        return Wonder_jest.testPromise("test wdb not has one", (function () {
                                      return LoadSceneWDBTool$WonderEditor.loadSceneWDB(boxTexturedWDBArrayBuffer[0], undefined, "BoxTextured", /* () */0).then((function () {
                                                    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameViewEditorService$WonderEditor.getActivedBasicCameraView(editorState)), undefined));
                                                  }));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
