'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var WDBTool$WonderEditor = require("../../../../tool/WDBTool.js");
var LoadTool$WonderEditor = require("../../tool/LoadTool.js");
var TestTool$WonderEditor = require("../../../../tool/TestTool.js");
var MainUtils$WonderEditor = require("../../../../../src/core/utils/engine/MainUtils.js");
var CanvasTool$WonderEditor = require("../../../../unit/atom_component/canvas/tool/CanvasTool.js");
var ConsoleTool$WonderEditor = require("../../../../unit/tool/external/ConsoleTool.js");
var DragWDBTool$WonderEditor = require("../../../tool/DragWDBTool.js");
var ReactTestTool$WonderEditor = require("../../../../tool/ReactTestTool.js");
var GLSLToolEngine$WonderEditor = require("../../../../tool/engine/GLSLToolEngine.js");
var ShaderToolEngine$WonderEditor = require("../../../../tool/engine/ShaderToolEngine.js");
var StateLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../../tool/BuildComponentTool.js");
var SceneEngineService$WonderEditor = require("../../../../../src/service/state/engine/SceneEngineService.js");
var StateEditorService$WonderEditor = require("../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorAssetTool$WonderEditor = require("../../tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../tool/MainEditorAssetIdTool.js");
var PrimitiveLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/PrimitiveLogicService.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../tool/MainEditorAssetTreeTool.js");
var MainEditorSceneTreeTool$WonderEditor = require("../../../../unit/tool/MainEditorSceneTreeTool.js");
var MainEditorPointLightTool$WonderEditor = require("../../../inspector/composable_component/sceneTree_inspector/light/point/tool/MainEditorPointLightTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../tool/MainEditorAssetUploadTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../tool/MainEditorAssetHeaderOperateNodeTool.js");

Wonder_jest.describe("MainEditorAssetHeader->drag wdb", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var directionPointLightsAndCubeWDBArrayBuffer = /* record */[/* contents */1];
        beforeAll((function () {
                directionPointLightsAndCubeWDBArrayBuffer[0] = WDBTool$WonderEditor.generateDirectionPointLightsAndCubeWDB(/* () */0);
                return /* () */0;
              }));
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n              {\n                \"name\": \"default\",\n                \"jobs\": [\n                    {\"name\": \"init_inspector_engine\" }\n                ]\n              }\n            ]\n             ", undefined, "\n             [\n                {\"name\": \"init_inspector_engine\" }\n             ]\n             ", undefined, /* () */0), undefined, false, /* () */0);
                StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
                CanvasTool$WonderEditor.prepareInspectorCanvasAndImgCanvas(sandbox);
                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                return LoadTool$WonderEditor.buildFakeLoadImage();
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test drag wdb to folder node", (function (param) {
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
        return Wonder_jest.describe("test drag wdb to scene tree", (function (param) {
                      Wonder_jest.describe("test wdb has direction and point light gameObjects", (function (param) {
                              var _test = function (sandbox, testFunc) {
                                return DragWDBTool$WonderEditor.testDragWDB(sandbox, /* tuple */[
                                            "DirectionPointLightsAndCube",
                                            directionPointLightsAndCubeWDBArrayBuffer[0]
                                          ], testFunc);
                              };
                              Wonder_jest.describe("should init cloned gameObjects", (function (param) {
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
                              Wonder_jest.describe("should reinit origin gameObjects", (function (param) {
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
                      Wonder_jest.describe("check", (function (param) {
                              return Wonder_jest.describe("check light count before drag", (function (param) {
                                            return Wonder_jest.describe("if light count will exceed max count after drag, warn", (function (param) {
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
                                                          Wonder_jest.describe("test direction light", (function (param) {
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
                                                          return Wonder_jest.describe("test point light", (function (param) {
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
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("test drag wdb to be target gameObject sib", (function (param) {
                                    beforeEach((function () {
                                            MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1]);
                                            return /* () */0;
                                          }));
                                    Wonder_jest.describe("test drag gameObject before target gameObject", (function (param) {
                                            Wonder_jest.describe("test target gameObject isn't scene gameObject", (function (param) {
                                                    return Wonder_jest.testPromise("test snapshot", undefined, (function (param) {
                                                                  return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(directionPointLightsAndCubeWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, MainEditorSceneTool$WonderEditor.getFirstCube(engineState), undefined, undefined, undefined, undefined, undefined, undefined, /* DragBeforeTarget */1, /* () */0);
                                                                                return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0))));
                                                                              }));
                                                                }));
                                                  }));
                                            return Wonder_jest.describe("test target gameObject is scene gameObject", (function (param) {
                                                          return Wonder_jest.describe("set dragged gameobject to be scene first child", (function (param) {
                                                                        return Wonder_jest.testPromise("test snapshot", undefined, (function (param) {
                                                                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(directionPointLightsAndCubeWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                                                    StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                                    MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject), undefined, undefined, undefined, undefined, undefined, undefined, /* DragBeforeTarget */1, /* () */0);
                                                                                                    return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0))));
                                                                                                  }));
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                                    Wonder_jest.describe("test drag gameObject into target gameObject", (function (param) {
                                            Wonder_jest.describe("test target gameObject isn't scene gameObject", (function (param) {
                                                    return Wonder_jest.testPromise("test snapshot", undefined, (function (param) {
                                                                  return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(directionPointLightsAndCubeWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, MainEditorSceneTool$WonderEditor.getFirstCube(engineState), undefined, undefined, undefined, undefined, undefined, undefined, /* DragIntoTarget */2, /* () */0);
                                                                                return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0))));
                                                                              }));
                                                                }));
                                                  }));
                                            return Wonder_jest.describe("test target gameObject is scene gameObject", (function (param) {
                                                          return Wonder_jest.describe("set dragged gameobject to be scene last child", (function (param) {
                                                                        return Wonder_jest.testPromise("test snapshot", undefined, (function (param) {
                                                                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(directionPointLightsAndCubeWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                                                    StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                                    MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject), undefined, undefined, undefined, undefined, undefined, undefined, /* DragIntoTarget */2, /* () */0);
                                                                                                    return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0))));
                                                                                                  }));
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                                    return Wonder_jest.describe("test drag gameObject after target gameObject", (function (param) {
                                                  Wonder_jest.describe("test target gameObject isn't scene gameObject", (function (param) {
                                                          return Wonder_jest.testPromise("test snapshot", undefined, (function (param) {
                                                                        return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(directionPointLightsAndCubeWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                      MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, MainEditorSceneTool$WonderEditor.getFirstCube(engineState), undefined, undefined, undefined, undefined, undefined, undefined, /* DragAfterTarget */3, /* () */0);
                                                                                      return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0))));
                                                                                    }));
                                                                      }));
                                                        }));
                                                  return Wonder_jest.describe("test target gameObject is scene gameObject", (function (param) {
                                                                return Wonder_jest.describe("set dragged gameobject to be scene first child", (function (param) {
                                                                              return Wonder_jest.testPromise("test snapshot", undefined, (function (param) {
                                                                                            return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(directionPointLightsAndCubeWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                                                          StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                                          MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject), undefined, undefined, undefined, undefined, undefined, undefined, /* DragAfterTarget */3, /* () */0);
                                                                                                          return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0))));
                                                                                                        }));
                                                                                          }));
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
