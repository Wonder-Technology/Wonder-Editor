

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Js_option from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as GLBTool$WonderEditor from "../../../tool/GLBTool.js";
import * as LoadTool$WonderEditor from "../../asset/tool/LoadTool.js";
import * as RayUtils$WonderEditor from "../../../../src/core/utils/engine/job/rayCaster/RayUtils.js";
import * as EventTool$WonderEditor from "../tool/EventTool.js";
import * as LoadWDBTool$WonderEditor from "../../tool/LoadWDBTool.js";
import * as GameObjectTool$WonderEditor from "../../../tool/GameObjectTool.js";
import * as CoordinateUtils$WonderEditor from "../../../../src/core/utils/engine/job/coordinate/CoordinateUtils.js";
import * as RayIntersectUtils$WonderEditor from "../../../../src/core/utils/engine/job/rayCaster/RayIntersectUtils.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as InitPickingJobTool$WonderEditor from "../tool/InitPickingJobTool.js";
import * as SceneEngineService$WonderEditor from "../../../../src/service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorAssetTool$WonderEditor from "../../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as GeometryLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/geometry/GeometryLogicService.js";
import * as GeometryEngineService$WonderEditor from "../../../../src/service/state/engine/GeometryEngineService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../src/service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as SceneTreeWidgetService$WonderEditor from "../../../../src/service/record/editor/widget/SceneTreeWidgetService.js";
import * as SceneViewEditorService$WonderEditor from "../../../../src/service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../src/service/state/engine/gameObject/GameObjectEngineService.js";
import * as MainEditorAssetNodeTool$WonderEditor from "../../asset/tool/MainEditorAssetNodeTool.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../asset/tool/MainEditorAssetTreeTool.js";
import * as MainEditorSceneTreeTool$WonderEditor from "../../../unit/tool/MainEditorSceneTreeTool.js";
import * as CustomEventEditorService$WonderEditor from "../../../../src/service/state/editor/event/CustomEventEditorService.js";
import * as MainEditorLeftHeaderTool$WonderEditor from "../../../unit/composable_component/mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js";
import * as ManageEventEngineService$WonderEditor from "../../../../src/service/state/engine/event/ManageEventEngineService.js";
import * as MainEditorAssetUploadTool$WonderEditor from "../../asset/tool/MainEditorAssetUploadTool.js";
import * as InitTransformGizmosJobTool$WonderEditor from "../tool/InitTransformGizmosJobTool.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js";
import * as SelectTranslationGizmoSceneViewEditorService$WonderEditor from "../../../../src/service/state/editor/view/sceneView/transform/translation/SelectTranslationGizmoSceneViewEditorService.js";

describe("init picking job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                Curry._1(Sinon.restoreSandbox, sandbox[0]);
                return EventTool$WonderEditor.restore(/* () */0);
              }));
        describe("test find picked one", (function () {
                describe("should set finded one to current scene tree node", (function () {
                        describe("test not trigger pick", (function () {
                                var _prepare = function () {
                                  return InitPickingJobTool$WonderEditor.prepareOneGameObject(InitPickingJobTool$WonderEditor.createCube, sandbox, 500, 200, 0, 0, /* tuple */[
                                              0,
                                              0,
                                              2
                                            ], /* tuple */[
                                              0,
                                              0,
                                              0
                                            ], /* tuple */[
                                              0,
                                              0,
                                              0
                                            ], /* () */0);
                                };
                                describe("if pointtap->mouse button isn't left button", (function () {
                                        return Wonder_jest.test("not trigger pick", (function () {
                                                      _prepare(/* () */0);
                                                      InitPickingJobTool$WonderEditor.triggerPicking(3, sandbox, 250, 100, /* () */0);
                                                      return InitPickingJobTool$WonderEditor.notPick(/* () */0);
                                                    }));
                                      }));
                                describe("if select any translation gizmo", (function () {
                                        beforeEach((function () {
                                                _prepare(/* () */0);
                                                StateLogicService$WonderEditor.getAndSetState(InitTransformGizmosJobTool$WonderEditor.createTransformGizmos);
                                                return StateLogicService$WonderEditor.getAndSetEditorState(SelectTranslationGizmoSceneViewEditorService$WonderEditor.onlySelectTranslationXAxisGizmo);
                                              }));
                                        Wonder_jest.test("not trigger pick success", (function () {
                                                InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                                                return InitPickingJobTool$WonderEditor.notPick(/* () */0);
                                              }));
                                        return Wonder_jest.test("not trigger pick fail", (function () {
                                                      GameObjectTool$WonderEditor.setCurrentSceneTreeNode(500);
                                                      InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 50, 100, /* () */0);
                                                      return InitPickingJobTool$WonderEditor.pickOne(500);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("test only pick one", (function () {
                                describe("test cube", (function () {
                                        var _prepare = function () {
                                          return InitPickingJobTool$WonderEditor.prepareOneGameObject(InitPickingJobTool$WonderEditor.createCube, sandbox, 510, 200, 10, 20, /* tuple */[
                                                      6.986046314239502,
                                                      0.43706008791923523,
                                                      -0.06429910659790039
                                                    ], /* tuple */[
                                                      3,
                                                      0,
                                                      0
                                                    ], /* tuple */[
                                                      45,
                                                      0,
                                                      0
                                                    ], /* () */0);
                                        };
                                        Wonder_jest.test("test find", (function () {
                                                var gameObject1 = _prepare(/* () */0);
                                                InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 243, 139, /* () */0);
                                                return InitPickingJobTool$WonderEditor.pickOne(gameObject1);
                                              }));
                                        return Wonder_jest.test("test not find", (function () {
                                                      _prepare(/* () */0);
                                                      InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 235, 144, /* () */0);
                                                      return InitPickingJobTool$WonderEditor.notPick(/* () */0);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("test pick multi ones", (function () {
                                describe("find the top one whose distance between intersected point and the camera position is nearest", (function () {
                                        describe("test cube", (function () {
                                                var _prepare = function () {
                                                  return InitPickingJobTool$WonderEditor.prepareTwoGameObjects(sandbox, 510, 200, 10, 20, /* tuple */[
                                                              2.2987656593322754,
                                                              8.099184036254883,
                                                              1.1699984073638916
                                                            ], /* tuple */[
                                                              0,
                                                              0,
                                                              0
                                                            ], /* tuple */[
                                                              0,
                                                              0,
                                                              0
                                                            ], /* tuple */[
                                                              1,
                                                              2,
                                                              0
                                                            ], /* tuple */[
                                                              0,
                                                              0,
                                                              0
                                                            ], InitPickingJobTool$WonderEditor.createCube, InitPickingJobTool$WonderEditor.createCube, undefined, /* () */0);
                                                };
                                                Wonder_jest.test("test find gameObject1", (function () {
                                                        var match = _prepare(/* () */0);
                                                        InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 261, 111, /* () */0);
                                                        return InitPickingJobTool$WonderEditor.pickOne(match[0]);
                                                      }));
                                                Wonder_jest.test("test find gameObject2", (function () {
                                                        var match = _prepare(/* () */0);
                                                        InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 267, 120, /* () */0);
                                                        return InitPickingJobTool$WonderEditor.pickOne(match[1]);
                                                      }));
                                                return Wonder_jest.test("test not find", (function () {
                                                              _prepare(/* () */0);
                                                              InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 251, 140, /* () */0);
                                                              return InitPickingJobTool$WonderEditor.notPick(/* () */0);
                                                            }));
                                              }));
                                        describe("test triangle", (function () {
                                                var _createTriangleInPositiveYAxis = function (engineState) {
                                                  var match = GeometryEngineService$WonderEditor.create(engineState);
                                                  var geometry = match[1];
                                                  var vertices1 = new Float32Array(/* array */[
                                                        1,
                                                        0,
                                                        3,
                                                        0,
                                                        1,
                                                        3,
                                                        -1,
                                                        0,
                                                        3
                                                      ]);
                                                  var indices1 = new Uint16Array(/* array */[
                                                        0,
                                                        1,
                                                        2
                                                      ]);
                                                  var engineState$1 = GeometryEngineService$WonderEditor.setGeometryIndices16(geometry, indices1, GeometryEngineService$WonderEditor.setGeometryVertices(geometry, vertices1, match[0]));
                                                  return InitPickingJobTool$WonderEditor.createGameObject(geometry, engineState$1);
                                                };
                                                var _prepare = function (gameObject1Pos, gameObject2Pos) {
                                                  return InitPickingJobTool$WonderEditor.prepareTwoGameObjects(sandbox, 500, 200, 0, 0, /* tuple */[
                                                              0,
                                                              0,
                                                              5
                                                            ], gameObject1Pos, /* tuple */[
                                                              0,
                                                              0,
                                                              0
                                                            ], gameObject2Pos, /* tuple */[
                                                              0,
                                                              0,
                                                              0
                                                            ], InitPickingJobTool$WonderEditor.createCube, _createTriangleInPositiveYAxis, undefined, /* () */0);
                                                };
                                                Wonder_jest.test("test find", (function () {
                                                        var match = _prepare(/* tuple */[
                                                              0,
                                                              0,
                                                              3
                                                            ], /* tuple */[
                                                              0,
                                                              0,
                                                              1
                                                            ]);
                                                        InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                                                        return InitPickingJobTool$WonderEditor.pickOne(match[1]);
                                                      }));
                                                return Wonder_jest.test("test not find", (function () {
                                                              var match = _prepare(/* tuple */[
                                                                    0,
                                                                    0,
                                                                    4.1
                                                                  ], /* tuple */[
                                                                    0,
                                                                    0,
                                                                    1
                                                                  ]);
                                                              InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                                                              return InitPickingJobTool$WonderEditor.pickOne(match[0]);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        describe("test sphere shape cache", (function () {
                                var _changePoints = function (gameObject) {
                                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                  var geometry = GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(gameObject, engineState);
                                  var match = GeometryLogicService$WonderEditor.setGeometryPoints(geometry, new Uint16Array(/* array */[
                                            0,
                                            1,
                                            2
                                          ]), GeometryEngineService$WonderEditor.setGeometryIndices16, GeometryLogicService$WonderEditor.setGeometryPoints(geometry, new Float32Array(/* array */[
                                                2.5,
                                                0,
                                                0,
                                                0,
                                                0.5,
                                                0,
                                                1.5,
                                                0,
                                                0
                                              ]), GeometryEngineService$WonderEditor.setGeometryVertices, /* tuple */[
                                            editorState,
                                            engineState
                                          ]));
                                  StateEditorService$WonderEditor.setState(match[0]);
                                  StateEngineService$WonderEditor.setState(match[1]);
                                  return /* () */0;
                                };
                                return Wonder_jest.test("if change geometry points, the intersect should be correct", (function () {
                                              var gameObject = InitPickingJobTool$WonderEditor.prepareOneGameObject(InitPickingJobTool$WonderEditor.createCube, sandbox, 510, 200, 10, 20, /* tuple */[
                                                    0,
                                                    0,
                                                    2.5
                                                  ], /* tuple */[
                                                    0,
                                                    0,
                                                    0
                                                  ], /* tuple */[
                                                    0,
                                                    0,
                                                    0
                                                  ], /* () */0);
                                              InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 265, 120, /* () */0);
                                              StateLogicService$WonderEditor.getAndSetEditorState(SceneTreeEditorService$WonderEditor.clearCurrentSceneTreeNode);
                                              _changePoints(gameObject);
                                              InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 265, 120, /* () */0);
                                              return InitPickingJobTool$WonderEditor.notPick(/* () */0);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("if find one", (function () {
                        var _prepare = function () {
                          return InitPickingJobTool$WonderEditor.prepareOneGameObject(InitPickingJobTool$WonderEditor.createCube, sandbox, 500, 200, 10, 20, /* tuple */[
                                      0,
                                      0,
                                      2
                                    ], /* tuple */[
                                      0,
                                      0,
                                      0
                                    ], /* tuple */[
                                      0,
                                      0,
                                      0
                                    ], /* () */0);
                        };
                        var _triggerPicking = function () {
                          return InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 260, 120, /* () */0);
                        };
                        Wonder_jest.test("set current select source to scene tree", (function () {
                                _prepare(/* () */0);
                                StateLogicService$WonderEditor.getAndSetEditorState(CurrentSelectSourceEditorService$WonderEditor.clearCurrentSelectSource);
                                _triggerPicking(/* () */0);
                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](CurrentSelectSourceEditorService$WonderEditor.getCurrentSelectSource(editorState)), SceneTreeWidgetService$WonderEditor.getWidget(/* () */0));
                              }));
                        describe("handle pick success", (function () {
                                Wonder_jest.test("the picked gameObject's all parents should show children", (function () {
                                        var _createParentGameObject = function (engineState) {
                                          var match = GameObjectEngineService$WonderEditor.create(engineState);
                                          var parent = match[1];
                                          var engineState$1 = GameObjectEngineService$WonderEditor.setGameObjectName("parent", parent, match[0]);
                                          return /* tuple */[
                                                  engineState$1,
                                                  parent
                                                ];
                                        };
                                        var gameObject = _prepare(/* () */0);
                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                        var match = _createParentGameObject(engineState);
                                        var parent1 = match[1];
                                        var match$1 = _createParentGameObject(match[0]);
                                        var parent2 = match$1[1];
                                        HierarchyGameObjectEngineService$WonderEditor.addChild(parent2, gameObject, HierarchyGameObjectEngineService$WonderEditor.addChild(parent1, parent2, SceneEngineService$WonderEditor.addSceneChild(parent1, match$1[0])));
                                        _triggerPicking(/* () */0);
                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                        var engineState$1 = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                        var sceneGameObject = SceneEngineService$WonderEditor.getSceneGameObject(engineState$1);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        SceneTreeEditorService$WonderEditor.getIsShowChildern(parent1, sceneGameObject, editorState),
                                                        SceneTreeEditorService$WonderEditor.getIsShowChildern(parent2, sceneGameObject, editorState)
                                                      ]), /* tuple */[
                                                    true,
                                                    true
                                                  ]);
                                      }));
                                return Wonder_jest.test("trigger selectSceneTreeNode event", (function () {
                                              _prepare(/* () */0);
                                              var a = /* record */[/* contents */0];
                                              StateEngineService$WonderEditor.setState(ManageEventEngineService$WonderEditor.onCustomGlobalEvent(CustomEventEditorService$WonderEditor.getSelectSceneTreeNodeEventName(/* () */0), (function ($$event, engineState) {
                                                          a[0] = 1;
                                                          return /* tuple */[
                                                                  engineState,
                                                                  $$event
                                                                ];
                                                        }), StateEngineService$WonderEditor.unsafeGetState(/* () */0), undefined, /* () */0));
                                              _triggerPicking(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](a[0]), 1);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("if not find", (function () {
                        describe("handle pick fail", (function () {
                                var _prepare = function () {
                                  return InitPickingJobTool$WonderEditor.prepareOneGameObject(InitPickingJobTool$WonderEditor.createCube, sandbox, 500, 200, 10, 20, /* tuple */[
                                              0,
                                              0,
                                              20
                                            ], /* tuple */[
                                              0,
                                              0,
                                              0
                                            ], /* tuple */[
                                              0,
                                              0,
                                              0
                                            ], /* () */0);
                                };
                                var _triggerPicking = function () {
                                  return InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 410, 120, /* () */0);
                                };
                                Wonder_jest.test("clear current scene tree node", (function () {
                                        _prepare(/* () */0);
                                        GameObjectTool$WonderEditor.setCurrentSceneTreeNode(500);
                                        _triggerPicking(/* () */0);
                                        return InitPickingJobTool$WonderEditor.notPick(/* () */0);
                                      }));
                                Wonder_jest.test("clear current asset node id", (function () {
                                        _prepare(/* () */0);
                                        MainEditorAssetNodeTool$WonderEditor.setCurrentNodeId(500);
                                        _triggerPicking(/* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(MainEditorAssetNodeTool$WonderEditor.getCurrentNodeId)), undefined);
                                      }));
                                Wonder_jest.test("clear current select source", (function () {
                                        _prepare(/* () */0);
                                        StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                                return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* Asset */1, param);
                                              }));
                                        _triggerPicking(/* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(CurrentSelectSourceEditorService$WonderEditor.getCurrentSelectSource)), undefined);
                                      }));
                                return Wonder_jest.test("not trigger selectSceneTreeNode event", (function () {
                                              _prepare(/* () */0);
                                              var a = /* record */[/* contents */0];
                                              StateEngineService$WonderEditor.setState(ManageEventEngineService$WonderEditor.onCustomGlobalEvent(CustomEventEditorService$WonderEditor.getSelectSceneTreeNodeEventName(/* () */0), (function ($$event, engineState) {
                                                          a[0] = 1;
                                                          return /* tuple */[
                                                                  engineState,
                                                                  $$event
                                                                ];
                                                        }), StateEngineService$WonderEditor.unsafeGetState(/* () */0), undefined, /* () */0));
                                              _triggerPicking(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](a[0]), 0);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test find top parent gameObject which is root", (function () {
                        var truckGLBArrayBuffer = /* record */[/* contents */1];
                        var _prepare = function () {
                          return InitPickingJobTool$WonderEditor.prepare(sandbox, 500, 200, 0, 0, /* tuple */[
                                      0,
                                      2,
                                      3
                                    ], undefined, /* () */0);
                        };
                        beforeAll((function () {
                                truckGLBArrayBuffer[0] = GLBTool$WonderEditor.getGLBArrayBuffer("CesiumMilkTruck");
                                return /* () */0;
                              }));
                        beforeEach((function () {
                                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                                LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                                Curry._1(LoadTool$WonderEditor.buildFakeTextEncoder, /* () */0);
                                LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                                LoadTool$WonderEditor.buildFakeLoadImage();
                                _prepare(/* () */0);
                                MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                                MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                return /* () */0;
                              }));
                        describe("test glb", (function () {
                                Wonder_jest.testPromise("pick glb rootGameObject->children should pick glb rootGameObject", (function () {
                                        var glbName = "Truck";
                                        return MainEditorAssetUploadTool$WonderEditor.loadOneGLB(truckGLBArrayBuffer[0], undefined, undefined, glbName, /* () */0).then((function (uploadedWDBNodeId) {
                                                      MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                      InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                                                      return Promise.resolve(InitPickingJobTool$WonderEditor.pickOne(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                            return LoadWDBTool$WonderEditor.findGameObjectByName(glbName, param);
                                                                          }))));
                                                    }));
                                      }));
                                Wonder_jest.testPromise("if glb rootGameObject has parent gameObject p1 which is root, should pick p1", (function () {
                                        var glbName = "Truck";
                                        return MainEditorAssetUploadTool$WonderEditor.loadOneGLB(truckGLBArrayBuffer[0], undefined, undefined, glbName, /* () */0).then((function (uploadedWDBNodeId) {
                                                      MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                      var newGameObject = GameObjectTool$WonderEditor.getNewGameObject(undefined, /* () */0);
                                                      MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                                                      StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                                              return GameObjectEngineService$WonderEditor.setGameObjectIsRoot(newGameObject, true, param);
                                                            }));
                                                      var glbRootGameObject = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                              return LoadWDBTool$WonderEditor.findGameObjectByName(glbName, param);
                                                            }));
                                                      StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                                              return GameObjectTool$WonderEditor.addChild(newGameObject, glbRootGameObject, param);
                                                            }));
                                                      InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                                                      return Promise.resolve(InitPickingJobTool$WonderEditor.pickOne(newGameObject));
                                                    }));
                                      }));
                                describe("test pick the same one multiple times", (function () {
                                        Wonder_jest.testPromise("pick glb child c1;\n            pick c1 again;\n\n            should pick c1;\n            ", (function () {
                                                return MainEditorAssetUploadTool$WonderEditor.loadOneGLB(truckGLBArrayBuffer[0], undefined, undefined, "Truck", /* () */0).then((function (uploadedWDBNodeId) {
                                                              MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                              InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                                                              InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                                                              var partial_arg = LoadWDBTool$WonderEditor.Truck[/* getTruck0GameObjectName */1](/* () */0);
                                                              return Promise.resolve(InitPickingJobTool$WonderEditor.pickOne(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                    return LoadWDBTool$WonderEditor.findGameObjectByName(partial_arg, param);
                                                                                  }))));
                                                            }));
                                              }));
                                        return Wonder_jest.testPromise("pick glb child c1;\n            pick c1 again;\n            pick c1 again;\n\n            should pick glb rootGameObject;\n            ", (function () {
                                                      var glbName = "Truck";
                                                      return MainEditorAssetUploadTool$WonderEditor.loadOneGLB(truckGLBArrayBuffer[0], undefined, undefined, glbName, /* () */0).then((function (uploadedWDBNodeId) {
                                                                    MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                                    InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                                                                    InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                                                                    InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                                                                    return Promise.resolve(InitPickingJobTool$WonderEditor.pickOne(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                          return LoadWDBTool$WonderEditor.findGameObjectByName(glbName, param);
                                                                                        }))));
                                                                  }));
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("isIntersectTriangle", (function () {
                        describe("test cull", (function () {
                                var _isIntersectTriangle = function (sandbox, cullType, va, vb, vc, locationInView, viewWidth, viewHeight, cameraPos) {
                                  InitPickingJobTool$WonderEditor.prepareStateAndView(sandbox, viewWidth, viewHeight, InitPickingJobTool$WonderEditor.buildDefaultNoWorkerJobRecord(/* () */0));
                                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                  var match = InitPickingJobTool$WonderEditor.prepareCamera(cameraPos, /* tuple */[
                                        viewWidth,
                                        viewHeight
                                      ], /* tuple */[
                                        editorState,
                                        engineState
                                      ]);
                                  var match$1 = match[1];
                                  var editorState$1 = match$1[0];
                                  var cameraGameObject = SceneViewEditorService$WonderEditor.unsafeGetEditCamera(editorState$1);
                                  var ray = RayUtils$WonderEditor._createPerspectiveCameraRay(CoordinateUtils$WonderEditor.convertMouselocationInViewToNDC(locationInView, CoordinateUtils$WonderEditor.getSceneViewSize(editorState$1)), RayUtils$WonderEditor._getPerspectiveCameraData(cameraGameObject, /* tuple */[
                                            editorState$1,
                                            match$1[1]
                                          ]));
                                  return Js_option.isSome(RayIntersectUtils$WonderEditor.checkIntersectTriangle(cullType, /* tuple */[
                                                  va,
                                                  vb,
                                                  vc
                                                ], ray));
                                };
                                describe("test back cull", (function () {
                                        Wonder_jest.test("test intersect front side", (function () {
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_isIntersectTriangle(sandbox, /* Back */0, /* tuple */[
                                                                    1,
                                                                    0,
                                                                    0
                                                                  ], /* tuple */[
                                                                    0,
                                                                    1,
                                                                    0
                                                                  ], /* tuple */[
                                                                    -1,
                                                                    0,
                                                                    0
                                                                  ], /* tuple */[
                                                                    250,
                                                                    100
                                                                  ], 500, 200, /* tuple */[
                                                                    0,
                                                                    0,
                                                                    2
                                                                  ])), true);
                                              }));
                                        return Wonder_jest.test("test not intersect back side", (function () {
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_isIntersectTriangle(sandbox, /* Back */0, /* tuple */[
                                                                          -1,
                                                                          0,
                                                                          0
                                                                        ], /* tuple */[
                                                                          0,
                                                                          1,
                                                                          0
                                                                        ], /* tuple */[
                                                                          1,
                                                                          0,
                                                                          0
                                                                        ], /* tuple */[
                                                                          250,
                                                                          100
                                                                        ], 500, 200, /* tuple */[
                                                                          0,
                                                                          0,
                                                                          2
                                                                        ])), false);
                                                    }));
                                      }));
                                describe("test front cull", (function () {
                                        Wonder_jest.test("test intersect back side", (function () {
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_isIntersectTriangle(sandbox, /* Front */1, /* tuple */[
                                                                    -1,
                                                                    0,
                                                                    0
                                                                  ], /* tuple */[
                                                                    0,
                                                                    1,
                                                                    0
                                                                  ], /* tuple */[
                                                                    1,
                                                                    0,
                                                                    0
                                                                  ], /* tuple */[
                                                                    250,
                                                                    100
                                                                  ], 500, 200, /* tuple */[
                                                                    0,
                                                                    0,
                                                                    2
                                                                  ])), true);
                                              }));
                                        return Wonder_jest.test("test not intersect front side", (function () {
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_isIntersectTriangle(sandbox, /* Front */1, /* tuple */[
                                                                          1,
                                                                          0,
                                                                          0
                                                                        ], /* tuple */[
                                                                          0,
                                                                          1,
                                                                          0
                                                                        ], /* tuple */[
                                                                          -1,
                                                                          0,
                                                                          0
                                                                        ], /* tuple */[
                                                                          250,
                                                                          100
                                                                        ], 500, 200, /* tuple */[
                                                                          0,
                                                                          0,
                                                                          2
                                                                        ])), false);
                                                    }));
                                      }));
                                describe("test not cull", (function () {
                                        Wonder_jest.test("test intersect back side", (function () {
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_isIntersectTriangle(sandbox, /* None */2, /* tuple */[
                                                                    -1,
                                                                    0,
                                                                    0
                                                                  ], /* tuple */[
                                                                    0,
                                                                    1,
                                                                    0
                                                                  ], /* tuple */[
                                                                    1,
                                                                    0,
                                                                    0
                                                                  ], /* tuple */[
                                                                    250,
                                                                    100
                                                                  ], 500, 200, /* tuple */[
                                                                    0,
                                                                    0,
                                                                    2
                                                                  ])), true);
                                              }));
                                        return Wonder_jest.test("test intersect front side", (function () {
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_isIntersectTriangle(sandbox, /* None */2, /* tuple */[
                                                                          1,
                                                                          0,
                                                                          0
                                                                        ], /* tuple */[
                                                                          0,
                                                                          1,
                                                                          0
                                                                        ], /* tuple */[
                                                                          -1,
                                                                          0,
                                                                          0
                                                                        ], /* tuple */[
                                                                          250,
                                                                          100
                                                                        ], 500, 200, /* tuple */[
                                                                          0,
                                                                          0,
                                                                          2
                                                                        ])), true);
                                                    }));
                                      }));
                                describe("test both cull", (function () {
                                        Wonder_jest.test("test not intersect back side", (function () {
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_isIntersectTriangle(sandbox, /* Both */3, /* tuple */[
                                                                    -1,
                                                                    0,
                                                                    0
                                                                  ], /* tuple */[
                                                                    0,
                                                                    1,
                                                                    0
                                                                  ], /* tuple */[
                                                                    1,
                                                                    0,
                                                                    0
                                                                  ], /* tuple */[
                                                                    250,
                                                                    100
                                                                  ], 500, 200, /* tuple */[
                                                                    0,
                                                                    0,
                                                                    2
                                                                  ])), false);
                                              }));
                                        return Wonder_jest.test("test not intersect front side", (function () {
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_isIntersectTriangle(sandbox, /* Both */3, /* tuple */[
                                                                          1,
                                                                          0,
                                                                          0
                                                                        ], /* tuple */[
                                                                          0,
                                                                          1,
                                                                          0
                                                                        ], /* tuple */[
                                                                          -1,
                                                                          0,
                                                                          0
                                                                        ], /* tuple */[
                                                                          250,
                                                                          100
                                                                        ], 500, 200, /* tuple */[
                                                                          0,
                                                                          0,
                                                                          2
                                                                        ])), false);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("fix bug", (function () {
                        describe("can pick the geometry which has indices32 data", (function () {
                                var _createIndices32Triangle = function (engineState) {
                                  var match = GeometryEngineService$WonderEditor.create(engineState);
                                  var geometry = match[1];
                                  var vertices1 = new Float32Array(/* array */[
                                        1,
                                        0,
                                        0,
                                        0,
                                        1,
                                        0,
                                        -1,
                                        0,
                                        0
                                      ]);
                                  var indices1 = new Uint32Array(/* array */[
                                        0,
                                        1,
                                        2
                                      ]);
                                  var engineState$1 = GeometryEngineService$WonderEditor.setGeometryIndices32(geometry, indices1, GeometryEngineService$WonderEditor.setGeometryVertices(geometry, vertices1, match[0]));
                                  return InitPickingJobTool$WonderEditor.createGameObject(geometry, engineState$1);
                                };
                                var _prepare = function () {
                                  return InitPickingJobTool$WonderEditor.prepareOneGameObject(_createIndices32Triangle, sandbox, 500, 200, 0, 0, /* tuple */[
                                              0,
                                              0,
                                              3
                                            ], /* tuple */[
                                              0,
                                              0,
                                              0
                                            ], /* tuple */[
                                              0,
                                              0,
                                              0
                                            ], /* () */0);
                                };
                                return Wonder_jest.test("test pick", (function () {
                                              var gameObject1 = _prepare(/* () */0);
                                              InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                                              return InitPickingJobTool$WonderEditor.pickOne(gameObject1);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
