'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var AppStore$WonderEditor = require("../../../src/core/ui/store/AppStore.js");
var TestTool$WonderEditor = require("../../tool/TestTool.js");
var JudgeTool$WonderEditor = require("../../tool/JudgeTool.js");
var ReactTool$WonderEditor = require("../../tool/ui/ReactTool.js");
var SinonTool$WonderEditor = require("../../tool/SinonTool.js");
var InspectorTool$WonderEditor = require("../../tool/ui/InspectorTool.js");
var OptionService$WonderEditor = require("../../../src/service/primitive/OptionService.js");
var ReactTestTool$WonderEditor = require("../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../tool/GameObjectTool.js");
var InitScriptJobTool$WonderEditor = require("./tool/InitScriptJobTool.js");
var StateLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../tool/BuildComponentTool.js");
var SceneEngineService$WonderEditor = require("../../../src/service/state/engine/SceneEngineService.js");
var StateEditorService$WonderEditor = require("../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorAssetTool$WonderEditor = require("../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var GameObjectToolEngine$WonderEditor = require("../../tool/engine/GameObjectToolEngine.js");
var PickingEditorService$WonderEditor = require("../../../src/service/state/editor/picking/PickingEditorService.js");
var GameViewEditorService$WonderEditor = require("../../../src/service/state/editor/view/gameView/GameViewEditorService.js");
var GeometryEngineService$WonderEditor = require("../../../src/service/state/engine/GeometryEngineService.js");
var MainEditorAssetIdTool$WonderEditor = require("../asset/tool/MainEditorAssetIdTool.js");
var GameObjectEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/GameObjectEngineService.js");
var MainEditorAssetTreeTool$WonderEditor = require("../asset/tool/MainEditorAssetTreeTool.js");
var MainEditorSceneTreeTool$WonderEditor = require("../../unit/tool/MainEditorSceneTreeTool.js");
var MainEditorCameraViewTool$WonderEditor = require("../inspector/composable_component/sceneTree_inspector/cameraGroup/cameraView/tool/MainEditorCameraViewTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../asset/tool/MainEditorAssetUploadTool.js");
var BasicCameraViewEngineService$WonderEditor = require("../../../src/service/state/engine/camera/BasicCameraViewEngineService.js");
var MainEditorAssetFolderNodeTool$WonderEditor = require("../asset/tool/MainEditorAssetFolderNodeTool.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var MainEditorAssetAssetBundleNodeTool$WonderEditor = require("../asset/tool/MainEditorAssetAssetBundleNodeTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");

Wonder_jest.describe("init script api job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test api", (function (param) {
                      var _addGeometry = function (gameObject, engineState) {
                        var match = GeometryEngineService$WonderEditor.create(engineState);
                        var geometry = match[1];
                        var engineState$1 = GameObjectComponentEngineService$WonderEditor.addGeometryComponent(gameObject, geometry, match[0]);
                        return /* tuple */[
                                engineState$1,
                                geometry
                              ];
                      };
                      var _setSphereShape = function (geometry, editorState) {
                        return PickingEditorService$WonderEditor.setSphereShape(geometry, /* record */[
                                    /* radius */0.1,
                                    /* center : tuple */[
                                      0,
                                      0,
                                      0
                                    ]
                                  ], editorState);
                      };
                      Wonder_jest.describe("not rewrited api should exist", (function (param) {
                              return Wonder_jest.test("test", (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isSome(Caml_option.nullable_to_opt(InitScriptJobTool$WonderEditor.createRewritedScriptAPIJsObj(/* () */0).setTransformLocalPosition))), true);
                                          }));
                            }));
                      Wonder_jest.describe("disposeGameObject", (function (param) {
                              var _prepare = function (param) {
                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                var match = GameObjectToolEngine$WonderEditor.createGameObject(engineState);
                                return /* tuple */[
                                        match[0],
                                        match[1]
                                      ];
                              };
                              Wonder_jest.describe("handle engine state", (function (param) {
                                      return Wonder_jest.test("dispose gameObject", (function (param) {
                                                    var match = _prepare(/* () */0);
                                                    var gameObject = match[1];
                                                    var disposeGameObjectFunc = InitScriptJobTool$WonderEditor.createRewritedScriptAPIJsObj(/* () */0).disposeGameObject;
                                                    var engineState = disposeGameObjectFunc(gameObject, match[0]);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectToolEngine$WonderEditor.isAlive(gameObject, engineState)), false);
                                                  }));
                                    }));
                              return Wonder_jest.describe("handle editor state", (function (param) {
                                            Wonder_jest.test("if gameObject has geometry component, remove its picking->sphere shape data", (function (param) {
                                                    var disposeGameObjectFunc = InitScriptJobTool$WonderEditor.createRewritedScriptAPIJsObj(/* () */0).disposeGameObject;
                                                    var match = _prepare(/* () */0);
                                                    var gameObject = match[1];
                                                    var match$1 = _addGeometry(gameObject, match[0]);
                                                    var geometry = match$1[1];
                                                    StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                                            return _setSphereShape(geometry, param);
                                                          }));
                                                    disposeGameObjectFunc(gameObject, match$1[0]);
                                                    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isNone(PickingEditorService$WonderEditor.getSphereShape(geometry, editorState))), true);
                                                  }));
                                            Wonder_jest.test("if gameObject->basicCameraView is active, remove it from editorState", (function (param) {
                                                    var disposeGameObjectFunc = InitScriptJobTool$WonderEditor.createRewritedScriptAPIJsObj(/* () */0).disposeGameObject;
                                                    var match = _prepare(/* () */0);
                                                    var gameObject = match[1];
                                                    var match$1 = BasicCameraViewEngineService$WonderEditor.create(match[0]);
                                                    var basicCameraView = match$1[1];
                                                    var engineState = BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(basicCameraView, GameObjectComponentEngineService$WonderEditor.addBasicCameraViewComponent(gameObject, basicCameraView, match$1[0]));
                                                    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                    var editorState$1 = GameViewEditorService$WonderEditor.setActivedBasicCameraView(basicCameraView, editorState);
                                                    StateEditorService$WonderEditor.setState(editorState$1);
                                                    disposeGameObjectFunc(gameObject, engineState);
                                                    var editorState$2 = StateEditorService$WonderEditor.getState(/* () */0);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameViewEditorService$WonderEditor.isActiveBasicCameraView(basicCameraView, editorState$2)), false);
                                                  }));
                                            Wonder_jest.test("clear current data", (function (param) {
                                                    var disposeGameObjectFunc = InitScriptJobTool$WonderEditor.createRewritedScriptAPIJsObj(/* () */0).disposeGameObject;
                                                    var match = _prepare(/* () */0);
                                                    var gameObject = match[1];
                                                    StateEngineService$WonderEditor.setState(match[0]);
                                                    GameObjectTool$WonderEditor.setCurrentSceneTreeNode(gameObject);
                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                    var engineState$1 = disposeGameObjectFunc(gameObject, engineState);
                                                    StateEngineService$WonderEditor.setState(engineState$1);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isNone(GameObjectTool$WonderEditor.getCurrentSceneTreeNode(/* () */0))), true);
                                                  }));
                                            return Wonder_jest.test("dispatch scene tree and inspector", (function (param) {
                                                          var disposeGameObjectFunc = InitScriptJobTool$WonderEditor.createRewritedScriptAPIJsObj(/* () */0).disposeGameObject;
                                                          var dispatchFuncStub = ReactTool$WonderEditor.createDispatchFuncStub(sandbox);
                                                          var match = _prepare(/* () */0);
                                                          var engineState = disposeGameObjectFunc(match[1], match[0]);
                                                          StateEngineService$WonderEditor.setState(engineState);
                                                          return Sinon.toCalledWith(/* array */[[
                                                                        AppStore$WonderEditor.UpdateAction,
                                                                        /* Update */[/* array */[
                                                                            /* SceneTree */6,
                                                                            /* Inspector */2
                                                                          ]]
                                                                      ]], Wonder_jest.Expect[/* expect */0](dispatchFuncStub));
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("test asset bundle api", (function (param) {
                                    beforeEach((function () {
                                            MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                                            return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                                          }));
                                    Wonder_jest.describe("test cache api", (function (param) {
                                            return Wonder_jest.describe("not cache", (function (param) {
                                                          Wonder_jest.describe("initAssetBundleArrayBufferCache", (function (param) {
                                                                  return Wonder_jest.test("return empty promise", (function (param) {
                                                                                var initAssetBundleArrayBufferCache = InitScriptJobTool$WonderEditor.createRewritedScriptAPIJsObj(/* () */0).initAssetBundleArrayBufferCache;
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](initAssetBundleArrayBufferCache()), new Promise((function (resolve, reject) {
                                                                                                  return resolve();
                                                                                                })));
                                                                              }));
                                                                }));
                                                          return Wonder_jest.describe("isAssetBundleArrayBufferCached", (function (param) {
                                                                        return Wonder_jest.test("return resolve(false)", (function (param) {
                                                                                      var isAssetBundleArrayBufferCached = InitScriptJobTool$WonderEditor.createRewritedScriptAPIJsObj(/* () */0).isAssetBundleArrayBufferCached;
                                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](isAssetBundleArrayBufferCached()), new Promise((function (resolve, reject) {
                                                                                                        return resolve(false);
                                                                                                      })));
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                                    Wonder_jest.describe("getAssetBundlePath", (function (param) {
                                            return Wonder_jest.test("return empty str", (function (param) {
                                                          var getAssetBundlePath = InitScriptJobTool$WonderEditor.createRewritedScriptAPIJsObj(/* () */0).getAssetBundlePath;
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](getAssetBundlePath()), "");
                                                        }));
                                          }));
                                    Wonder_jest.describe("test load api", (function (param) {
                                            var _isArrayBufferEqual = function (a1, a2) {
                                              return JudgeTool$WonderEditor.isEqual(a1.byteLength, a2.byteLength);
                                            };
                                            return Wonder_jest.describe("loadAssetBundle", (function (param) {
                                                          return Wonder_jest.describe("get asset bundle from asset tree->asset bundle node", (function (param) {
                                                                        var _judge = function (abRelativePath, uploadedAssetBundleNodeId, loadAssetBundleFunc) {
                                                                          var loadedAssetBundle = /* record */[/* contents */-1];
                                                                          return Most.forEach((function (assetBundle) {
                                                                                          loadedAssetBundle[0] = assetBundle;
                                                                                          return /* () */0;
                                                                                        }), loadAssetBundleFunc(abRelativePath)).then((function (param) {
                                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_isArrayBufferEqual(loadedAssetBundle[0], StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                                                      return MainEditorAssetAssetBundleNodeTool$WonderEditor.getAssetBundle(uploadedAssetBundleNodeId, param);
                                                                                                                    })))), true));
                                                                                      }));
                                                                        };
                                                                        Wonder_jest.testPromise("test load one asset bundle asset", undefined, (function (param) {
                                                                                return MainEditorAssetUploadTool$WonderEditor.loadOneAssetBundle(undefined, undefined, "A.rab", undefined, /* () */0).then((function (uploadedAssetBundleNodeId) {
                                                                                              var loadAssetBundle = InitScriptJobTool$WonderEditor.createRewritedScriptAPIJsObj(/* () */0).loadAssetBundle;
                                                                                              return _judge("A.rab", uploadedAssetBundleNodeId, loadAssetBundle);
                                                                                            }));
                                                                              }));
                                                                        Wonder_jest.testPromise("test load one asset bundle asset in added folder", undefined, (function (param) {
                                                                                var addedFolderNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                                                                MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId1, undefined, /* () */0);
                                                                                return MainEditorAssetUploadTool$WonderEditor.loadOneAssetBundle(undefined, undefined, "A.rab", undefined, /* () */0).then((function (uploadedAssetBundleNodeId) {
                                                                                              var loadAssetBundle = InitScriptJobTool$WonderEditor.createRewritedScriptAPIJsObj(/* () */0).loadAssetBundle;
                                                                                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                              return _judge(MainEditorAssetFolderNodeTool$WonderEditor.getFolderName(addedFolderNodeId1, editorState) + "/A.rab", uploadedAssetBundleNodeId, loadAssetBundle);
                                                                                            }));
                                                                              }));
                                                                        return Wonder_jest.testPromise("test load one asset bundle asset in added-two-layer  folder", undefined, (function (param) {
                                                                                      MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                                                                      var addedFolderNodeId2 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                                                                      MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId2, undefined, /* () */0);
                                                                                      var addedFolderNodeId3 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                                                                      MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId3, undefined, /* () */0);
                                                                                      return MainEditorAssetUploadTool$WonderEditor.loadOneAssetBundle(undefined, undefined, "A.rab", undefined, /* () */0).then((function (uploadedAssetBundleNodeId) {
                                                                                                    var loadAssetBundle = InitScriptJobTool$WonderEditor.createRewritedScriptAPIJsObj(/* () */0).loadAssetBundle;
                                                                                                    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                                    return _judge(MainEditorAssetFolderNodeTool$WonderEditor.getFolderName(addedFolderNodeId2, editorState) + ("/" + (MainEditorAssetFolderNodeTool$WonderEditor.getFolderName(addedFolderNodeId3, editorState) + "/A.rab")), uploadedAssetBundleNodeId, loadAssetBundle);
                                                                                                  }));
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                                    Wonder_jest.describe("addSABSceneGameObjectChildrenToScene", (function (param) {
                                            var _prepare = function (param) {
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              var match = GameObjectToolEngine$WonderEditor.createGameObject(engineState);
                                              var gameObject1 = match[1];
                                              var match$1 = GameObjectToolEngine$WonderEditor.createGameObject(match[0]);
                                              var gameObject2 = match$1[1];
                                              var engineState$1 = GameObjectTool$WonderEditor.addChild(gameObject1, gameObject2, match$1[0]);
                                              var engineState$2 = GameObjectEngineService$WonderEditor.setGameObjectName("gameObject2", gameObject2, GameObjectEngineService$WonderEditor.setGameObjectName("gameObject1", gameObject1, engineState$1));
                                              return /* tuple */[
                                                      engineState$2,
                                                      /* tuple */[
                                                        gameObject1,
                                                        gameObject2
                                                      ]
                                                    ];
                                            };
                                            var _prepareAndExec = function (param) {
                                              var match = _prepare(/* () */0);
                                              var match$1 = match[1];
                                              var gameObject1 = match$1[0];
                                              var addSABSceneGameObjectChildrenToScene = InitScriptJobTool$WonderEditor.createRewritedScriptAPIJsObj(/* () */0).addSABSceneGameObjectChildrenToScene;
                                              var engineState = addSABSceneGameObjectChildrenToScene(gameObject1, match[0]);
                                              return /* tuple */[
                                                      engineState,
                                                      /* tuple */[
                                                        gameObject1,
                                                        match$1[1]
                                                      ]
                                                    ];
                                            };
                                            Wonder_jest.describe("handle engine state", (function (param) {
                                                    return Wonder_jest.test("add sab->scene gameObject->children to scene", (function (param) {
                                                                  var match = _prepareAndExec(/* () */0);
                                                                  var engineState = match[0];
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectTool$WonderEditor.getChildren(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState)), /* array */[match[1][1]]);
                                                                }));
                                                  }));
                                            return Wonder_jest.describe("handle editor state", (function (param) {
                                                          Wonder_jest.test("add to scene tree", (function (param) {
                                                                  var match = _prepareAndExec(/* () */0);
                                                                  StateEngineService$WonderEditor.setState(match[0]);
                                                                  return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                                                }));
                                                          Wonder_jest.test("dispatch scene tree", (function (param) {
                                                                  var dispatchFuncStub = ReactTool$WonderEditor.createDispatchFuncStub(sandbox);
                                                                  var match = _prepareAndExec(/* () */0);
                                                                  StateEngineService$WonderEditor.setState(match[0]);
                                                                  return Sinon.toCalledWith(/* array */[[
                                                                                AppStore$WonderEditor.UpdateAction,
                                                                                /* Update */[/* array */[/* SceneTree */6]]
                                                                              ]], Wonder_jest.Expect[/* expect */0](dispatchFuncStub));
                                                                }));
                                                          return Wonder_jest.test("test show scene tree inspector", (function (param) {
                                                                        var match = _prepareAndExec(/* () */0);
                                                                        StateEngineService$WonderEditor.setState(match[0]);
                                                                        MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, match[1][1], /* () */0);
                                                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                                      }));
                                                        }));
                                          }));
                                    Wonder_jest.describe("setSABSceneGameObjectToBeScene", (function (param) {
                                            var _prepare = function (param) {
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              var match = GameObjectToolEngine$WonderEditor.createGameObject(engineState);
                                              var gameObject1 = match[1];
                                              var match$1 = GameObjectToolEngine$WonderEditor.createGameObject(match[0]);
                                              var gameObject2 = match$1[1];
                                              var engineState$1 = GameObjectTool$WonderEditor.addChild(gameObject1, gameObject2, match$1[0]);
                                              var engineState$2 = GameObjectEngineService$WonderEditor.setGameObjectName("gameObject2", gameObject2, GameObjectEngineService$WonderEditor.setGameObjectName("gameObject1", gameObject1, engineState$1));
                                              return /* tuple */[
                                                      engineState$2,
                                                      /* tuple */[
                                                        gameObject1,
                                                        gameObject2
                                                      ]
                                                    ];
                                            };
                                            var _prepareAndExec = function (param) {
                                              var match = _prepare(/* () */0);
                                              var match$1 = match[1];
                                              var gameObject1 = match$1[0];
                                              var setSABSceneGameObjectToBeScene = InitScriptJobTool$WonderEditor.createRewritedScriptAPIJsObj(/* () */0).setSABSceneGameObjectToBeScene;
                                              var engineState = setSABSceneGameObjectToBeScene(gameObject1, match[0]);
                                              return /* tuple */[
                                                      engineState,
                                                      /* tuple */[
                                                        gameObject1,
                                                        match$1[1]
                                                      ]
                                                    ];
                                            };
                                            Wonder_jest.describe("handle engine state", (function (param) {
                                                    return Wonder_jest.test("set sab scene gameObject->isRoot to false", (function (param) {
                                                                  var match = _prepare(/* () */0);
                                                                  var gameObject1 = match[1][0];
                                                                  var engineState = GameObjectEngineService$WonderEditor.setGameObjectIsRoot(gameObject1, true, match[0]);
                                                                  var setSABSceneGameObjectToBeScene = InitScriptJobTool$WonderEditor.createRewritedScriptAPIJsObj(/* () */0).setSABSceneGameObjectToBeScene;
                                                                  var engineState$1 = setSABSceneGameObjectToBeScene(gameObject1, engineState);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectEngineService$WonderEditor.unsafeGetGameObjectIsRoot(SceneEngineService$WonderEditor.getSceneGameObject(engineState$1), engineState$1)), false);
                                                                }));
                                                  }));
                                            return Wonder_jest.describe("handle editor state", (function (param) {
                                                          Wonder_jest.test("clear picking->sphere shape data", (function (param) {
                                                                  StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                                                          return _setSphereShape(0, param);
                                                                        }));
                                                                  _prepareAndExec(/* () */0);
                                                                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isNone(PickingEditorService$WonderEditor.getSphereShape(0, editorState))), true);
                                                                }));
                                                          Wonder_jest.describe("set active basic camera view", (function (param) {
                                                                  Wonder_jest.test("if sab scene gameObject->children has active camera, set it to editorState", (function (param) {
                                                                          var match = _prepare(/* () */0);
                                                                          var match$1 = match[1];
                                                                          var match$2 = BasicCameraViewEngineService$WonderEditor.create(match[0]);
                                                                          var basicCameraView = match$2[1];
                                                                          var engineState = BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(basicCameraView, GameObjectComponentEngineService$WonderEditor.addBasicCameraViewComponent(match$1[1], basicCameraView, match$2[0]));
                                                                          var setSABSceneGameObjectToBeScene = InitScriptJobTool$WonderEditor.createRewritedScriptAPIJsObj(/* () */0).setSABSceneGameObjectToBeScene;
                                                                          setSABSceneGameObjectToBeScene(match$1[0], engineState);
                                                                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(GameViewEditorService$WonderEditor.getActivedBasicCameraView(editorState))), basicCameraView);
                                                                        }));
                                                                  return Wonder_jest.test("else, remove it to editorState", (function (param) {
                                                                                _prepareAndExec(/* () */0);
                                                                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isNone(GameViewEditorService$WonderEditor.getActivedBasicCameraView(editorState))), true);
                                                                              }));
                                                                }));
                                                          Wonder_jest.test("update scene tree", (function (param) {
                                                                  var match = _prepareAndExec(/* () */0);
                                                                  StateEngineService$WonderEditor.setState(match[0]);
                                                                  return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                                                }));
                                                          Wonder_jest.test("dispatch scene tree and inspector", (function (param) {
                                                                  var dispatchFuncStub = ReactTool$WonderEditor.createDispatchFuncStub(sandbox);
                                                                  var match = _prepareAndExec(/* () */0);
                                                                  StateEngineService$WonderEditor.setState(match[0]);
                                                                  return Sinon.toCalledWith(/* array */[[
                                                                                AppStore$WonderEditor.UpdateAction,
                                                                                /* Update */[/* array */[
                                                                                    /* SceneTree */6,
                                                                                    /* Inspector */2
                                                                                  ]]
                                                                              ]], Wonder_jest.Expect[/* expect */0](dispatchFuncStub));
                                                                }));
                                                          return Wonder_jest.describe("test show scene tree inspector", (function (param) {
                                                                        Wonder_jest.test("test show scene gameObject->inspector", (function (param) {
                                                                                var match = _prepareAndExec(/* () */0);
                                                                                StateEngineService$WonderEditor.setState(match[0]);
                                                                                MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, match[1][0], /* () */0);
                                                                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                                              }));
                                                                        return Wonder_jest.test("test show scene gameObject->child->inspector", (function (param) {
                                                                                      var match = _prepareAndExec(/* () */0);
                                                                                      StateEngineService$WonderEditor.setState(match[0]);
                                                                                      MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, match[1][1], /* () */0);
                                                                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                                    return Wonder_jest.describe("disposeSceneAllChildren", (function (param) {
                                                  var _prepareAndExec = function (param) {
                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                    var disposeSceneAllChildren = InitScriptJobTool$WonderEditor.createRewritedScriptAPIJsObj(/* () */0).disposeSceneAllChildren;
                                                    return disposeSceneAllChildren(engineState);
                                                  };
                                                  beforeEach((function () {
                                                          return MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                                                        }));
                                                  Wonder_jest.describe("handle engine state", (function (param) {
                                                          return Wonder_jest.test("dispose all scene children", (function (param) {
                                                                        var engineState = _prepareAndExec(/* () */0);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectTool$WonderEditor.getChildren(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState)), /* array */[]);
                                                                      }));
                                                        }));
                                                  return Wonder_jest.describe("handle editor state", (function (param) {
                                                                Wonder_jest.test("clear picking->sphere shape data", (function (param) {
                                                                        StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                                                                return _setSphereShape(0, param);
                                                                              }));
                                                                        _prepareAndExec(/* () */0);
                                                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isNone(PickingEditorService$WonderEditor.getSphereShape(0, editorState))), true);
                                                                      }));
                                                                Wonder_jest.test("scene tree should has no node", (function (param) {
                                                                        _prepareAndExec(/* () */0);
                                                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                                                      }));
                                                                Wonder_jest.test("if scene->children has active camera, remove it from editorState", (function (param) {
                                                                        MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode(/* () */0);
                                                                        var basicCameraView = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeBasicCameraView(/* () */0);
                                                                        MainEditorCameraViewTool$WonderEditor.setCurrentCamera(basicCameraView, undefined, undefined, undefined, /* () */0);
                                                                        _prepareAndExec(/* () */0);
                                                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameViewEditorService$WonderEditor.isActiveBasicCameraView(basicCameraView, editorState)), false);
                                                                      }));
                                                                Wonder_jest.test("clear current data", (function (param) {
                                                                        MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                                                        _prepareAndExec(/* () */0);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isNone(GameObjectTool$WonderEditor.getCurrentSceneTreeNode(/* () */0))), true);
                                                                      }));
                                                                return Wonder_jest.test("dispatch scene tree", (function (param) {
                                                                              var dispatchFuncStub = ReactTool$WonderEditor.createDispatchFuncStub(sandbox);
                                                                              var engineState = _prepareAndExec(/* () */0);
                                                                              StateEngineService$WonderEditor.setState(engineState);
                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                              Sinon.getCallCount(dispatchFuncStub),
                                                                                              SinonTool$WonderEditor.calledWith(dispatchFuncStub, [
                                                                                                    AppStore$WonderEditor.UpdateAction,
                                                                                                    /* Update */[/* array */[
                                                                                                        /* SceneTree */6,
                                                                                                        /* Inspector */2
                                                                                                      ]]
                                                                                                  ])
                                                                                            ]), /* tuple */[
                                                                                          1,
                                                                                          true
                                                                                        ]);
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
