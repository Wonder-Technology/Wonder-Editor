

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as WDBTool$WonderEditor from "../../../../tool/WDBTool.js";
import * as LoadTool$WonderEditor from "../../tool/LoadTool.js";
import * as TestTool$WonderEditor from "../../../../tool/TestTool.js";
import * as ConsoleTool$WonderEditor from "../../../../unit/tool/external/ConsoleTool.js";
import * as DragWDBTool$WonderEditor from "../../../tool/DragWDBTool.js";
import * as ReactTestTool$WonderEditor from "../../../../tool/ReactTestTool.js";
import * as GLSLToolEngine$WonderEditor from "../../../../tool/engine/GLSLToolEngine.js";
import * as ShaderToolEngine$WonderEditor from "../../../../tool/engine/ShaderToolEngine.js";
import * as EventListenerTool$WonderEditor from "../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../tool/BuildComponentTool.js";
import * as SceneEngineService$WonderEditor from "../../../../../src/service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorAssetTool$WonderEditor from "../../tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as MainEditorAssetIdTool$WonderEditor from "../../tool/MainEditorAssetIdTool.js";
import * as PrimitiveLogicService$WonderEditor from "../../../../../src/service/stateTuple/logic/PrimitiveLogicService.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../tool/MainEditorAssetTreeTool.js";
import * as MainEditorSceneTreeTool$WonderEditor from "../../../../unit/tool/MainEditorSceneTreeTool.js";
import * as MainEditorPointLightTool$WonderEditor from "../../../inspector/composable_component/sceneTree_inspector/light/point/tool/MainEditorPointLightTool.js";
import * as MainEditorAssetUploadTool$WonderEditor from "../../tool/MainEditorAssetUploadTool.js";
import * as MainEditorAssetHeaderOperateNodeTool$WonderEditor from "../../tool/MainEditorAssetHeaderOperateNodeTool.js";

describe("MainEditorAssetHeader->drag wdb", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var directionPointLightsAndCubeWDBArrayBuffer = /* record */[/* contents */1];
        beforeAll((function () {
                directionPointLightsAndCubeWDBArrayBuffer[0] = WDBTool$WonderEditor.generateDirectionPointLightsAndCubeWDB(/* () */0);
                return /* () */0;
              }));
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                return LoadTool$WonderEditor.buildFakeLoadImage();
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test drag wdb to folder node", (function () {
                return Wonder_jest.testPromise("\n        1.load wdb asset w1;\n        2.add folder f1;\n        3.drag w1 to f1;\n        4.select f1;\n\n        asset children should show w1\n        ", undefined, (function (param) {
                              MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                              MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(directionPointLightsAndCubeWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                            MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](MainEditorAssetTreeTool$WonderEditor.getRootNodeId(StateEditorService$WonderEditor.getState(/* () */0)), undefined, /* () */0);
                                            var addedFolderNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                            MainEditorAssetTreeTool$WonderEditor.Drag[/* dragAssetChildrenNodeIntoAssetTreeNode */1](uploadedWDBNodeId, addedFolderNodeId, undefined, undefined, /* () */0);
                                            MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId, undefined, /* () */0);
                                            return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                          }));
                            }));
              }));
        describe("test drag wdb to scene tree", (function () {
                describe("test wdb has direction and point light gameObjects", (function () {
                        var _test = function (sandbox, testFunc) {
                          return DragWDBTool$WonderEditor.testDragWDB(sandbox, /* tuple */[
                                      "DirectionPointLightsAndCube",
                                      directionPointLightsAndCubeWDBArrayBuffer[0]
                                    ], testFunc);
                        };
                        describe("should init cloned gameObjects", (function () {
                                return Wonder_jest.testPromise("glsl->direction,point light count should + 1", undefined, (function (param) {
                                              return _test(sandbox, (function (shaderSourceCountBeforeDrag, shaderSourceCountAfterDrag, glShaderSource) {
                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                GLSLToolEngine$WonderEditor.containMultiline(GLSLToolEngine$WonderEditor.getVsSourceByCount(glShaderSource, shaderSourceCountBeforeDrag), /* :: */[
                                                                                      "#define DIRECTION_LIGHTS_COUNT 1",
                                                                                      /* :: */[
                                                                                        "#define POINT_LIGHTS_COUNT 1",
                                                                                        /* [] */0
                                                                                      ]
                                                                                    ]),
                                                                                GLSLToolEngine$WonderEditor.containMultiline(GLSLToolEngine$WonderEditor.getFsSourceByCount(glShaderSource, shaderSourceCountBeforeDrag), /* :: */[
                                                                                      "#define DIRECTION_LIGHTS_COUNT 1",
                                                                                      /* :: */[
                                                                                        "#define POINT_LIGHTS_COUNT 1",
                                                                                        /* [] */0
                                                                                      ]
                                                                                    ])
                                                                              ]), /* tuple */[
                                                                            true,
                                                                            true
                                                                          ]));
                                                          }));
                                            }));
                              }));
                        describe("should reinit origin gameObjects", (function () {
                                return Wonder_jest.testPromise("glsl->direction,point light count should + 1", undefined, (function (param) {
                                              return _test(sandbox, (function (shaderSourceCountBeforeDrag, shaderSourceCountAfterDrag, glShaderSource) {
                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLToolEngine$WonderEditor.containMultiline(GLSLToolEngine$WonderEditor.getFsSourceByCount(glShaderSource, shaderSourceCountBeforeDrag), /* :: */[
                                                                                    "#define DIRECTION_LIGHTS_COUNT 1",
                                                                                    /* :: */[
                                                                                      "#define POINT_LIGHTS_COUNT 1",
                                                                                      /* [] */0
                                                                                    ]
                                                                                  ])), true));
                                                          }));
                                            }));
                              }));
                        Wonder_jest.testPromise("should reinit cloned gameObjects", undefined, (function (param) {
                                return _test(sandbox, (function (shaderSourceCountBeforeDrag, shaderSourceCountAfterDrag, glShaderSource) {
                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](shaderSourceCountAfterDrag - shaderSourceCountBeforeDrag | 0), 1));
                                            }));
                              }));
                        return Wonder_jest.testPromise("should clear shader cache", undefined, (function (param) {
                                      return _test(sandbox, (function (shaderSourceCountBeforeDrag, shaderSourceCountAfterDrag, glShaderSource) {
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ShaderToolEngine$WonderEditor.isInitShaderCacheClear(StateEngineService$WonderEditor.unsafeGetState(/* () */0))), true));
                                                  }));
                                    }));
                      }));
                describe("check", (function () {
                        describe("check light count before drag", (function () {
                                describe("if light count will exceed max count after drag, warn", (function () {
                                        var _test = function (createLightFunc, judgeFunc) {
                                          ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                          var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                          MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                                          MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                          var match = Curry._2(createLightFunc, editorState, engineState);
                                          StateEditorService$WonderEditor.setState(match[0]);
                                          StateEngineService$WonderEditor.setState(match[1]);
                                          return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(directionPointLightsAndCubeWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                        MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                        MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                        return Curry._1(judgeFunc, warn);
                                                      }));
                                        };
                                        describe("test direction light", (function () {
                                                Wonder_jest.testPromise("test not exceed", undefined, (function (param) {
                                                        return _test((function (editorState, engineState) {
                                                                      var match = PrimitiveLogicService$WonderEditor.createDirectionLight(editorState, engineState);
                                                                      var match$1 = PrimitiveLogicService$WonderEditor.createDirectionLight(match[0], match[1]);
                                                                      return /* tuple */[
                                                                              match$1[0],
                                                                              match$1[1]
                                                                            ];
                                                                    }), (function (warn) {
                                                                      return Promise.resolve(Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](warn))));
                                                                    }));
                                                      }));
                                                return Wonder_jest.testPromise("test exceed", undefined, (function (param) {
                                                              return _test((function (editorState, engineState) {
                                                                            var match = PrimitiveLogicService$WonderEditor.createDirectionLight(editorState, engineState);
                                                                            var match$1 = PrimitiveLogicService$WonderEditor.createDirectionLight(match[0], match[1]);
                                                                            var match$2 = PrimitiveLogicService$WonderEditor.createDirectionLight(match$1[0], match$1[1]);
                                                                            return /* tuple */[
                                                                                    match$2[0],
                                                                                    match$2[1]
                                                                                  ];
                                                                          }), (function (warn) {
                                                                            return Promise.resolve(Wonder_jest.Expect[/* toContain */10]("the direction light count is exceed max count!", Wonder_jest.Expect[/* expect */0](ConsoleTool$WonderEditor.getMessage(warn))));
                                                                          }));
                                                            }));
                                              }));
                                        describe("test point light", (function () {
                                                Wonder_jest.testPromise("test not exceed", undefined, (function (param) {
                                                        return _test((function (editorState, engineState) {
                                                                      var match = PrimitiveLogicService$WonderEditor.createDirectionLight(editorState, engineState);
                                                                      var match$1 = PrimitiveLogicService$WonderEditor.createDirectionLight(match[0], match[1]);
                                                                      var match$2 = MainEditorPointLightTool$WonderEditor.createPointLight(match$1[0], match$1[1]);
                                                                      return /* tuple */[
                                                                              match$2[0],
                                                                              match$2[1]
                                                                            ];
                                                                    }), (function (warn) {
                                                                      return Promise.resolve(Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](warn))));
                                                                    }));
                                                      }));
                                                return Wonder_jest.testPromise("test exceed", undefined, (function (param) {
                                                              return _test((function (editorState, engineState) {
                                                                            var match = MainEditorPointLightTool$WonderEditor.createPointLight(editorState, engineState);
                                                                            var match$1 = MainEditorPointLightTool$WonderEditor.createPointLight(match[0], match[1]);
                                                                            var match$2 = MainEditorPointLightTool$WonderEditor.createPointLight(match$1[0], match$1[1]);
                                                                            return /* tuple */[
                                                                                    match$2[0],
                                                                                    match$2[1]
                                                                                  ];
                                                                          }), (function (warn) {
                                                                            return Promise.resolve(Wonder_jest.Expect[/* toContain */10]("the point light count is exceed max count!", Wonder_jest.Expect[/* expect */0](ConsoleTool$WonderEditor.getMessage(warn))));
                                                                          }));
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("test drag wdb to be target gameObject sib", (function () {
                        beforeEach((function () {
                                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1]);
                                return /* () */0;
                              }));
                        describe("test drag gameObject before target gameObject", (function () {
                                describe("test target gameObject isn't scene gameObject", (function () {
                                        return Wonder_jest.testPromise("test snapshot", undefined, (function (param) {
                                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(directionPointLightsAndCubeWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                    MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, MainEditorSceneTool$WonderEditor.getFirstCube(engineState), undefined, undefined, undefined, undefined, undefined, undefined, /* DragBeforeTarget */1, /* () */0);
                                                                    return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0))));
                                                                  }));
                                                    }));
                                      }));
                                describe("test target gameObject is scene gameObject", (function () {
                                        describe("set dragged gameobject to be scene first child", (function () {
                                                return Wonder_jest.testPromise("test snapshot", undefined, (function (param) {
                                                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(directionPointLightsAndCubeWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                            StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                            MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject), undefined, undefined, undefined, undefined, undefined, undefined, /* DragBeforeTarget */1, /* () */0);
                                                                            return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0))));
                                                                          }));
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        describe("test drag gameObject into target gameObject", (function () {
                                describe("test target gameObject isn't scene gameObject", (function () {
                                        return Wonder_jest.testPromise("test snapshot", undefined, (function (param) {
                                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(directionPointLightsAndCubeWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                    MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, MainEditorSceneTool$WonderEditor.getFirstCube(engineState), undefined, undefined, undefined, undefined, undefined, undefined, /* DragIntoTarget */2, /* () */0);
                                                                    return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0))));
                                                                  }));
                                                    }));
                                      }));
                                describe("test target gameObject is scene gameObject", (function () {
                                        describe("set dragged gameobject to be scene last child", (function () {
                                                return Wonder_jest.testPromise("test snapshot", undefined, (function (param) {
                                                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(directionPointLightsAndCubeWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                            StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                            MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject), undefined, undefined, undefined, undefined, undefined, undefined, /* DragIntoTarget */2, /* () */0);
                                                                            return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0))));
                                                                          }));
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        describe("test drag gameObject after target gameObject", (function () {
                                describe("test target gameObject isn't scene gameObject", (function () {
                                        return Wonder_jest.testPromise("test snapshot", undefined, (function (param) {
                                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(directionPointLightsAndCubeWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                    MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, MainEditorSceneTool$WonderEditor.getFirstCube(engineState), undefined, undefined, undefined, undefined, undefined, undefined, /* DragAfterTarget */3, /* () */0);
                                                                    return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0))));
                                                                  }));
                                                    }));
                                      }));
                                describe("test target gameObject is scene gameObject", (function () {
                                        describe("set dragged gameobject to be scene first child", (function () {
                                                return Wonder_jest.testPromise("test snapshot", undefined, (function (param) {
                                                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(directionPointLightsAndCubeWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                            StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                            MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject), undefined, undefined, undefined, undefined, undefined, undefined, /* DragAfterTarget */3, /* () */0);
                                                                            return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0))));
                                                                          }));
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
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
