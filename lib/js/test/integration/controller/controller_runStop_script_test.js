'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var AppStore$WonderEditor = require("../../../src/core/ui/store/AppStore.js");
var LoopTool$WonderEditor = require("../../unit/composable_component/controller/tool/LoopTool.js");
var TestTool$WonderEditor = require("../../tool/TestTool.js");
var MainUtils$WonderEditor = require("../../../src/core/utils/engine/MainUtils.js");
var ReactTool$WonderEditor = require("../../tool/ui/ReactTool.js");
var SinonTool$WonderEditor = require("../../tool/SinonTool.js");
var ConsoleTool$WonderEditor = require("../../unit/tool/external/ConsoleTool.js");
var ArrayService$WonderEditor = require("../../../src/service/atom/ArrayService.js");
var ControllerTool$WonderEditor = require("../../unit/composable_component/controller/tool/ControllerTool.js");
var GameObjectTool$WonderEditor = require("../../tool/GameObjectTool.js");
var FakeGlToolEngine$WonderEditor = require("../../tool/engine/FakeGlToolEngine.js");
var StateLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/StateLogicService.js");
var DirectorToolEngine$WonderEditor = require("../../tool/engine/DirectorToolEngine.js");
var StateEditorService$WonderEditor = require("../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var ScriptEngineService$WonderEditor = require("../../../src/service/state/engine/script/ScriptEngineService.js");
var MainEditorAssetIdTool$WonderEditor = require("../asset/tool/MainEditorAssetIdTool.js");
var TransformEngineService$WonderEditor = require("../../../src/service/state/engine/TransformEngineService.js");
var GameObjectEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/GameObjectEngineService.js");
var MainEditorAssetTreeTool$WonderEditor = require("../asset/tool/MainEditorAssetTreeTool.js");
var MainEditorLeftHeaderTool$WonderEditor = require("../../unit/composable_component/mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../tool/engine/NoWorkerJobConfigToolEngine.js");
var ScriptAttributeInspectorTool$WonderEditor = require("../inspector/composable_component/asset_inspector/atom_component/script_inspector/tool/ScriptAttributeInspectorTool.js");
var MainEditorScriptAttributeTool$WonderEditor = require("../inspector/composable_component/sceneTree_inspector/script/tool/MainEditorScriptAttributeTool.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var ScriptEventFunctionInspectorTool$WonderEditor = require("../inspector/composable_component/asset_inspector/atom_component/script_inspector/tool/ScriptEventFunctionInspectorTool.js");
var MainEditorScriptEventFunctionTool$WonderEditor = require("../inspector/composable_component/sceneTree_inspector/script/tool/MainEditorScriptEventFunctionTool.js");
var MainEditorInspectorAddComponentTool$WonderEditor = require("../inspector/atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");

Wonder_jest.describe("controller run and stop->script", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareWithNoWorkerJobRecord = function (noWorkerJobRecord) {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, noWorkerJobRecord, undefined, undefined, false, undefined, /* () */0);
          StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
          StateEngineService$WonderEditor.setState(FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
          MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
          return MainEditorInspectorAddComponentTool$WonderEditor.addScriptComponent(undefined, undefined, undefined, /* () */0);
        };
        var _buildNoWorkerJobConfigOnlyWithUpdateScript = function (param) {
          return NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n         {\n           \"name\": \"default\",\n           \"jobs\": [\n{\"name\": \"init_editor\" },\n{\"name\": \"init_script_api\" }\n           ]\n         }\n       ]\n             ", "\n             [\n         {\n           \"name\": \"default\",\n           \"jobs\": [\n{\"name\": \"update_script\" }\n           ]\n         }\n       ]\n             ", "\n             [\n{\"name\": \"init_editor\" },\n{\"name\": \"init_script_api\" }\n             ]\n             ", "\n             [\n{\"name\": \"update_script\" }\n             ]\n             ", /* () */0);
        };
        var _buildNoWorkerJobConfigWithDispose = function (param) {
          return NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n         {\n           \"name\": \"default\",\n           \"jobs\": [\n{\"name\": \"init_editor\" },\n{\"name\": \"init_script_api\" }\n           ]\n         }\n       ]\n             ", "\n             [\n         {\n           \"name\": \"default\",\n           \"jobs\": [\n{\"name\": \"update_script\" },\n{\"name\": \"dispose\" }\n           ]\n         }\n       ]\n             ", "\n             [\n{\"name\": \"init_editor\" },\n{\"name\": \"init_script_api\" }\n             ]\n             ", "\n             [\n{\"name\": \"update_script\" },\n{\"name\": \"dispose\" }\n             ]\n             ", /* () */0);
        };
        var _prepareOneScriptEventFunction = function (param) {
          MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
          var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
          MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
          var eventFunctionName = ScriptEventFunctionInspectorTool$WonderEditor.getEventFunctionName(addedNodeId, editorState);
          var script = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
          var gameObject = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                  return ScriptEngineService$WonderEditor.unsafeGetScriptGameObject(script, param);
                }));
          MainEditorScriptEventFunctionTool$WonderEditor.addScriptEventFunction(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0), Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
          return /* tuple */[
                  script,
                  gameObject,
                  addedNodeId,
                  eventFunctionName
                ];
        };
        var _buildUpdateEventFunctionSetLocalPosition1 = function (param) {
          return Caml_option.some((function (script, api, engineState) {
                        var unsafeGetGameObjectTransformComponent = api.unsafeGetGameObjectTransformComponent;
                        var setTransformLocalPosition = api.setTransformLocalPosition;
                        var unsafeGetScriptGameObject = api.unsafeGetScriptGameObject;
                        var gameObject = unsafeGetScriptGameObject(script, engineState);
                        var tran = unsafeGetGameObjectTransformComponent(gameObject, engineState);
                        return setTransformLocalPosition(tran, /* tuple */[
                                    1,
                                    0,
                                    0
                                  ], engineState);
                      }));
        };
        var _buildUpdateEventFunctionSetLocalPosition2 = function (param) {
          return Caml_option.some((function (script, api, engineState) {
                        var unsafeGetGameObjectTransformComponent = api.unsafeGetGameObjectTransformComponent;
                        var setTransformLocalPosition = api.setTransformLocalPosition;
                        var unsafeGetScriptGameObject = api.unsafeGetScriptGameObject;
                        var gameObject = unsafeGetScriptGameObject(script, engineState);
                        var tran = unsafeGetGameObjectTransformComponent(gameObject, engineState);
                        return setTransformLocalPosition(tran, /* tuple */[
                                    2,
                                    0,
                                    0
                                  ], engineState);
                      }));
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return TestTool$WonderEditor.closeContractCheck(/* () */0);
              }));
        afterEach((function () {
                TestTool$WonderEditor.openContractCheck(/* () */0);
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test exec event function", (function (param) {
                var _prepareTwoScriptEventFunctions = function (param) {
                  MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                  var addedNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
                  var addedNodeId2 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                  var eventFunctionName1 = ScriptEventFunctionInspectorTool$WonderEditor.getEventFunctionName(addedNodeId1, editorState);
                  var eventFunctionName2 = ScriptEventFunctionInspectorTool$WonderEditor.getEventFunctionName(addedNodeId2, editorState);
                  var script1 = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
                  MainEditorSceneTool$WonderEditor.setSecondCubeToBeCurrentSceneTreeNode(/* () */0);
                  MainEditorInspectorAddComponentTool$WonderEditor.addScriptComponent(undefined, undefined, undefined, /* () */0);
                  var script2 = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
                  MainEditorScriptEventFunctionTool$WonderEditor.addScriptEventFunction(script1, Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                  MainEditorScriptEventFunctionTool$WonderEditor.addScriptEventFunction(script2, Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                  MainEditorScriptEventFunctionTool$WonderEditor.handleChangeScriptEventFunction(script2, Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), addedNodeId1, addedNodeId2, undefined, undefined, /* () */0);
                  var gameObject1 = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                          return ScriptEngineService$WonderEditor.unsafeGetScriptGameObject(script1, param);
                        }));
                  var gameObject2 = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                          return ScriptEngineService$WonderEditor.unsafeGetScriptGameObject(script2, param);
                        }));
                  return /* tuple */[
                          /* tuple */[
                            script1,
                            gameObject1,
                            addedNodeId1,
                            eventFunctionName1
                          ],
                          /* tuple */[
                            script2,
                            gameObject2,
                            addedNodeId2,
                            eventFunctionName2
                          ]
                        ];
                };
                Wonder_jest.describe("test run", (function (param) {
                        Wonder_jest.test("should exec init event function", (function (param) {
                                _prepareWithNoWorkerJobRecord(_buildNoWorkerJobConfigOnlyWithUpdateScript(/* () */0));
                                var match = _prepareOneScriptEventFunction(/* () */0);
                                ScriptEventFunctionInspectorTool$WonderEditor.updateEventFunctionData(match[2], match[3], ScriptEventFunctionInspectorTool$WonderEditor.buildEventFunctionDataJsObjStr(Caml_option.some(Caml_option.some((function (script, api, engineState) {
                                                    engineState[/* arcballCameraControllerRecord */25] = -1;
                                                    return engineState;
                                                  }))), undefined, undefined, /* () */0));
                                ControllerTool$WonderEditor.run(/* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateEngineService$WonderEditor.unsafeGetState(/* () */0)[/* arcballCameraControllerRecord */25]), -1);
                              }));
                        Wonder_jest.describe("test exec update event function", (function (param) {
                                Wonder_jest.test("loopBody should exec update event function", (function (param) {
                                        _prepareWithNoWorkerJobRecord(_buildNoWorkerJobConfigOnlyWithUpdateScript(/* () */0));
                                        var match = _prepareOneScriptEventFunction(/* () */0);
                                        ScriptEventFunctionInspectorTool$WonderEditor.updateEventFunctionData(match[2], match[3], ScriptEventFunctionInspectorTool$WonderEditor.buildEventFunctionDataJsObjStr(undefined, Caml_option.some(Caml_option.some((function (script, api, engineState) {
                                                            engineState[/* arcballCameraControllerRecord */25] = -1;
                                                            return engineState;
                                                          }))), undefined, /* () */0));
                                        ControllerTool$WonderEditor.run(/* () */0);
                                        LoopTool$WonderEditor.getAndRefreshEngineStateForRunLoop(/* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateEngineService$WonderEditor.unsafeGetState(/* () */0)[/* arcballCameraControllerRecord */25]), -1);
                                      }));
                                return Wonder_jest.test("test exec dispose event function:\n\n           create script event function assets sef1, sef2;\n           gameObject g1 add script component s1;\n           gameObject g2 add script component s2;\n           s1 add sef1;\n           s2 add sef2;\n           sef1->update: dispose g2;\n           run;\n           loop;\n\n           should exec sef2->dispose;\n            ", (function (param) {
                                              _prepareWithNoWorkerJobRecord(_buildNoWorkerJobConfigWithDispose(/* () */0));
                                              var match = _prepareTwoScriptEventFunctions(/* () */0);
                                              var match$1 = match[1];
                                              var match$2 = match[0];
                                              var gameObject1 = match$2[1];
                                              StateEngineService$WonderEditor.setState(GameObjectEngineService$WonderEditor.setGameObjectName("gameObject2", match$1[1], GameObjectEngineService$WonderEditor.setGameObjectName("gameObject1", gameObject1, StateEngineService$WonderEditor.unsafeGetState(/* () */0))));
                                              ScriptEventFunctionInspectorTool$WonderEditor.updateEventFunctionData(match$2[2], match$2[3], ScriptEventFunctionInspectorTool$WonderEditor.buildEventFunctionDataJsObjStr(undefined, Caml_option.some(Caml_option.some((function (script, api, engineState) {
                                                                  var disposeGameObject = api.disposeGameObject;
                                                                  var findGameObjectsByName = api.findGameObjectsByName;
                                                                  var gameObject2 = findGameObjectsByName("gameObject2", engineState)[0];
                                                                  return disposeGameObject(gameObject2, engineState);
                                                                }))), undefined, /* () */0));
                                              ScriptEventFunctionInspectorTool$WonderEditor.updateEventFunctionData(match$1[2], match$1[3], ScriptEventFunctionInspectorTool$WonderEditor.buildEventFunctionDataJsObjStr(undefined, undefined, Caml_option.some(Caml_option.some((function (script, api, engineState) {
                                                                  var unsafeGetGameObjectTransformComponent = api.unsafeGetGameObjectTransformComponent;
                                                                  var setTransformLocalPosition = api.setTransformLocalPosition;
                                                                  var findGameObjectsByName = api.findGameObjectsByName;
                                                                  var gameObject1 = findGameObjectsByName("gameObject1", engineState)[0];
                                                                  var tran1 = unsafeGetGameObjectTransformComponent(gameObject1, engineState);
                                                                  return setTransformLocalPosition(tran1, /* tuple */[
                                                                              1,
                                                                              0,
                                                                              0
                                                                            ], engineState);
                                                                }))), /* () */0));
                                              ControllerTool$WonderEditor.run(/* () */0);
                                              LoopTool$WonderEditor.getAndRefreshEngineStateForRunLoop(/* () */0);
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformEngineService$WonderEditor.getLocalPosition(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject1, engineState), engineState)), /* tuple */[
                                                          1.0,
                                                          0,
                                                          0
                                                        ]);
                                            }));
                              }));
                        return Wonder_jest.describe("editor operation which exec loop shouldn't exec script event functions", (function (param) {
                                      return Wonder_jest.test("test leftHeader->dispose gameObject operation", (function (param) {
                                                    _prepareWithNoWorkerJobRecord(_buildNoWorkerJobConfigOnlyWithUpdateScript(/* () */0));
                                                    var match = _prepareOneScriptEventFunction(/* () */0);
                                                    ScriptEventFunctionInspectorTool$WonderEditor.updateEventFunctionData(match[2], match[3], ScriptEventFunctionInspectorTool$WonderEditor.buildEventFunctionDataJsObjStr(undefined, Caml_option.some(Caml_option.some((function (script, api, engineState) {
                                                                        engineState[/* arcballCameraControllerRecord */25] = -1;
                                                                        return engineState;
                                                                      }))), undefined, /* () */0));
                                                    ControllerTool$WonderEditor.run(/* () */0);
                                                    GameObjectTool$WonderEditor.setCurrentSceneTreeNode(match[1]);
                                                    MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* <> */6], Wonder_jest.Expect[/* expect */0](StateEngineService$WonderEditor.unsafeGetState(/* () */0)[/* arcballCameraControllerRecord */25]), -1);
                                                  }));
                                    }));
                      }));
                Wonder_jest.describe("test stop", (function (param) {
                        return Wonder_jest.test("loopBody shouldn't exec update event function", (function (param) {
                                      _prepareWithNoWorkerJobRecord(_buildNoWorkerJobConfigOnlyWithUpdateScript(/* () */0));
                                      var match = _prepareOneScriptEventFunction(/* () */0);
                                      ScriptEventFunctionInspectorTool$WonderEditor.updateEventFunctionData(match[2], match[3], ScriptEventFunctionInspectorTool$WonderEditor.buildEventFunctionDataJsObjStr(undefined, Caml_option.some(Caml_option.some((function (script, api, engineState) {
                                                          engineState[/* arcballCameraControllerRecord */25] = -1;
                                                          return engineState;
                                                        }))), undefined, /* () */0));
                                      ControllerTool$WonderEditor.run(/* () */0);
                                      ControllerTool$WonderEditor.stop(/* () */0);
                                      DirectorToolEngine$WonderEditor.runWithDefaultTimeEngineState(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* != */7], Wonder_jest.Expect[/* expect */0](StateEngineService$WonderEditor.unsafeGetState(/* () */0)[/* arcballCameraControllerRecord */25]), -1);
                                    }));
                      }));
                return Wonder_jest.describe("script api should update editor", (function (param) {
                              return Wonder_jest.describe("test disposeGameObject api", (function (param) {
                                            return Wonder_jest.test("should update scene tree", (function (param) {
                                                          _prepareWithNoWorkerJobRecord(_buildNoWorkerJobConfigWithDispose(/* () */0));
                                                          var match = _prepareOneScriptEventFunction(/* () */0);
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          StateEngineService$WonderEditor.setState(GameObjectEngineService$WonderEditor.setGameObjectName("secondCube", MainEditorSceneTool$WonderEditor.getSecondCube(engineState), engineState));
                                                          ScriptEventFunctionInspectorTool$WonderEditor.updateEventFunctionData(match[2], match[3], ScriptEventFunctionInspectorTool$WonderEditor.buildEventFunctionDataJsObjStr(undefined, Caml_option.some(Caml_option.some((function (script, api, engineState) {
                                                                              var disposeGameObject = api.disposeGameObject;
                                                                              var findGameObjectsByName = api.findGameObjectsByName;
                                                                              var gameObjects = findGameObjectsByName("secondCube", engineState);
                                                                              var match = gameObjects.length;
                                                                              if (match !== 0) {
                                                                                var secondCubeGameObject = findGameObjectsByName("secondCube", engineState)[0];
                                                                                return disposeGameObject(secondCubeGameObject, engineState);
                                                                              } else {
                                                                                return engineState;
                                                                              }
                                                                            }))), undefined, /* () */0));
                                                          var dispatchFuncStub = ReactTool$WonderEditor.createDispatchFuncStub(sandbox);
                                                          ControllerTool$WonderEditor.run(/* () */0);
                                                          LoopTool$WonderEditor.getAndRefreshEngineStateForRunLoop(/* () */0);
                                                          StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg([
                                                                                  AppStore$WonderEditor.UpdateAction,
                                                                                  /* Update */[/* array */[
                                                                                      /* SceneTree */6,
                                                                                      /* Inspector */2
                                                                                    ]]
                                                                                ], dispatchFuncStub))), 1);
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test redo/undo engine engineState", (function (param) {
                return Wonder_jest.test("stop should undo to the engineState which is copied before run", (function (param) {
                              _prepareWithNoWorkerJobRecord(_buildNoWorkerJobConfigOnlyWithUpdateScript(/* () */0));
                              var match = _prepareOneScriptEventFunction(/* () */0);
                              ScriptEventFunctionInspectorTool$WonderEditor.updateEventFunctionData(match[2], match[3], ScriptEventFunctionInspectorTool$WonderEditor.buildEventFunctionDataJsObjStr(undefined, Caml_option.some(_buildUpdateEventFunctionSetLocalPosition1(/* () */0)), undefined, /* () */0));
                              ControllerTool$WonderEditor.run(/* () */0);
                              LoopTool$WonderEditor.getAndRefreshEngineStateForRunLoop(/* () */0);
                              ControllerTool$WonderEditor.stop(/* () */0);
                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformEngineService$WonderEditor.getLocalPosition(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(match[1], engineState), engineState)), /* tuple */[
                                          0,
                                          0,
                                          0
                                        ]);
                            }));
              }));
        return Wonder_jest.describe("hot reloading", (function (param) {
                      Wonder_jest.describe("support operate event function", (function (param) {
                              var _prepare = function (param) {
                                _prepareWithNoWorkerJobRecord(_buildNoWorkerJobConfigOnlyWithUpdateScript(/* () */0));
                                var match = _prepareOneScriptEventFunction(/* () */0);
                                var eventFunctionName = match[3];
                                var addedNodeId = match[2];
                                ScriptEventFunctionInspectorTool$WonderEditor.updateEventFunctionData(addedNodeId, eventFunctionName, ScriptEventFunctionInspectorTool$WonderEditor.buildEventFunctionDataJsObjStr(undefined, Caml_option.some(_buildUpdateEventFunctionSetLocalPosition1(/* () */0)), undefined, /* () */0));
                                return /* tuple */[
                                        match[0],
                                        match[1],
                                        addedNodeId,
                                        eventFunctionName
                                      ];
                              };
                              Wonder_jest.describe("support change event function when run", (function (param) {
                                      return Wonder_jest.test("test", (function (param) {
                                                    var match = _prepare(/* () */0);
                                                    ControllerTool$WonderEditor.run(/* () */0);
                                                    LoopTool$WonderEditor.getAndRefreshEngineStateForRunLoop(/* () */0);
                                                    ScriptEventFunctionInspectorTool$WonderEditor.updateEventFunctionData(match[2], match[3], ScriptEventFunctionInspectorTool$WonderEditor.buildEventFunctionDataJsObjStr(undefined, Caml_option.some(_buildUpdateEventFunctionSetLocalPosition2(/* () */0)), undefined, /* () */0));
                                                    LoopTool$WonderEditor.getAndRefreshEngineStateForRunLoop(/* () */0);
                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformEngineService$WonderEditor.getLocalPosition(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(match[1], engineState), engineState)), /* tuple */[
                                                                2,
                                                                0,
                                                                0
                                                              ]);
                                                  }));
                                    }));
                              return Wonder_jest.describe("support remove event function when run", (function (param) {
                                            return Wonder_jest.test("test", (function (param) {
                                                          var match = _prepare(/* () */0);
                                                          ControllerTool$WonderEditor.run(/* () */0);
                                                          LoopTool$WonderEditor.getAndRefreshEngineStateForRunLoop(/* () */0);
                                                          MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeScriptEventFunctionNode(undefined, undefined, match[2], /* () */0);
                                                          LoopTool$WonderEditor.getAndRefreshEngineStateForRunLoop(/* () */0);
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformEngineService$WonderEditor.getLocalPosition(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(match[1], engineState), engineState)), /* tuple */[
                                                                      1,
                                                                      0,
                                                                      0
                                                                    ]);
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("support operate attribute", (function (param) {
                                    var _prepare = function (param) {
                                      _prepareWithNoWorkerJobRecord(_buildNoWorkerJobConfigOnlyWithUpdateScript(/* () */0));
                                      var match = _prepareOneScriptEventFunction(/* () */0);
                                      var script = match[0];
                                      var addedAttributeNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                                      ScriptAttributeInspectorTool$WonderEditor.addDefaultField(sandbox, addedAttributeNodeId, undefined, /* () */0);
                                      var match$1 = ArrayService$WonderEditor.unsafeGetFirst(StateLogicService$WonderEditor.getEditorState((function (param) {
                                                  return ScriptAttributeInspectorTool$WonderEditor.getAttributeEntries(addedAttributeNodeId, param);
                                                })));
                                      var newFieldName = "speed";
                                      ScriptAttributeInspectorTool$WonderEditor.renameField(sandbox, addedAttributeNodeId, match$1[0], newFieldName, undefined, /* () */0);
                                      var attributeName = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                              return ScriptAttributeInspectorTool$WonderEditor.getAttributeName(addedAttributeNodeId, param);
                                            }));
                                      var attribute = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                              return ScriptAttributeInspectorTool$WonderEditor.getAttribute(addedAttributeNodeId, param);
                                            }));
                                      MainEditorScriptAttributeTool$WonderEditor.addScriptAttribute(script, Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                                      ScriptEventFunctionInspectorTool$WonderEditor.updateEventFunctionData(match[2], match[3], ScriptEventFunctionInspectorTool$WonderEditor.buildEventFunctionDataJsObjStr(undefined, Caml_option.some(Caml_option.some((function (script, api, engineState) {
                                                          var unsafeGetGameObjectTransformComponent = api.unsafeGetGameObjectTransformComponent;
                                                          var setTransformLocalPosition = api.setTransformLocalPosition;
                                                          var unsafeGetScriptGameObject = api.unsafeGetScriptGameObject;
                                                          var unsafeGetScriptAttribute = api.unsafeGetScriptAttribute;
                                                          var scriptAttribute = unsafeGetScriptAttribute(script, "New Script Attribute", engineState);
                                                          var unsafeGetScriptAttributeFieldValue = api.unsafeGetScriptAttributeFieldValue;
                                                          var speed = unsafeGetScriptAttributeFieldValue("speed", scriptAttribute);
                                                          var gameObject = unsafeGetScriptGameObject(script, engineState);
                                                          var tran = unsafeGetGameObjectTransformComponent(gameObject, engineState);
                                                          return setTransformLocalPosition(tran, /* tuple */[
                                                                      speed,
                                                                      0,
                                                                      0
                                                                    ], engineState);
                                                        }))), undefined, /* () */0));
                                      return /* tuple */[
                                              script,
                                              attributeName,
                                              newFieldName,
                                              attribute,
                                              match[1],
                                              addedAttributeNodeId
                                            ];
                                    };
                                    Wonder_jest.describe("support change attribute->default value(will change value too) when run", (function (param) {
                                            return Wonder_jest.test("test", (function (param) {
                                                          var match = _prepare(/* () */0);
                                                          ControllerTool$WonderEditor.run(/* () */0);
                                                          LoopTool$WonderEditor.getAndRefreshEngineStateForRunLoop(/* () */0);
                                                          MainEditorScriptAttributeTool$WonderEditor.changeScriptAttributeFieldDefaultValueFloat(match[0], match[1], match[2], match[3], 10.0);
                                                          LoopTool$WonderEditor.getAndRefreshEngineStateForRunLoop(/* () */0);
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformEngineService$WonderEditor.getLocalPosition(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(match[4], engineState), engineState)), /* tuple */[
                                                                      10.0,
                                                                      0,
                                                                      0
                                                                    ]);
                                                        }));
                                          }));
                                    return Wonder_jest.describe("support remove attribute when run", (function (param) {
                                                  return Wonder_jest.test("if event function used attribute is removed, error", (function (param) {
                                                                var errorStub = ConsoleTool$WonderEditor.stubError(sandbox, undefined, /* () */0);
                                                                var match = _prepare(/* () */0);
                                                                ControllerTool$WonderEditor.run(/* () */0);
                                                                LoopTool$WonderEditor.getAndRefreshEngineStateForRunLoop(/* () */0);
                                                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeScriptAttributeNode(undefined, undefined, match[5], /* () */0);
                                                                LoopTool$WonderEditor.getAndRefreshEngineStateForRunLoop(/* () */0);
                                                                return ConsoleTool$WonderEditor.judgeError("expect data exist(get by getExn), but actual not", errorStub);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
