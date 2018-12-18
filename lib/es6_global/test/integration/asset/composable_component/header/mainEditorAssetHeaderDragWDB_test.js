

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
import * as SceneTreeTool$WonderEditor from "../../../../tool/SceneTreeTool.js";
import * as GLSLToolEngine$WonderEditor from "../../../../tool/engine/GLSLToolEngine.js";
import * as SceneGraphUtils$WonderEditor from "../../../../../src/core/composable_component/mainEditor/composable_component/left_components/composable_component/sceneTree/utils/SceneGraphUtils.js";
import * as ShaderToolEngine$WonderEditor from "../../../../tool/engine/ShaderToolEngine.js";
import * as EventListenerTool$WonderEditor from "../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../tool/BuildComponentTool.js";
import * as SceneEngineService$WonderEditor from "../../../../../src/service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorAssetTool$WonderEditor from "../../tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as GameObjectToolEngine$WonderEditor from "../../../../tool/engine/GameObjectToolEngine.js";
import * as MainEditorAssetIdTool$WonderEditor from "../../tool/MainEditorAssetIdTool.js";
import * as PrimitiveEngineService$WonderEditor from "../../../../../src/service/state/engine/PrimitiveEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../src/service/state/engine/GameObjectEngineService.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../tool/MainEditorAssetTreeTool.js";
import * as MainEditorSceneTreeTool$WonderEditor from "../../../../unit/tool/MainEditorSceneTreeTool.js";
import * as MainEditorPointLightTool$WonderEditor from "../../../inspector/composable_component/sceneTree_inspector/light/point/tool/MainEditorPointLightTool.js";
import * as MainEditorAssetUploadTool$WonderEditor from "../../tool/MainEditorAssetUploadTool.js";
import * as TreeRootAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/TreeRootAssetEditorService.js";
import * as MainEditorAssetHeaderOperateNodeTool$WonderEditor from "../../tool/MainEditorAssetHeaderOperateNodeTool.js";

describe("MainEditorAssetHeader->drag wdb", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var directionPointLightsAndBoxWDBArrayBuffer = /* record */[/* contents */1];
        beforeAll((function (param) {
                directionPointLightsAndBoxWDBArrayBuffer[0] = WDBTool$WonderEditor.generateDirectionPointLightsAndBoxWDB(/* () */0);
                return /* () */0;
              }));
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                return LoadTool$WonderEditor.buildFakeLoadImage();
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test drag wdb to folder node", (function (param) {
                return Wonder_jest.testPromise("\n        1.load wdb asset w1;\n        2.add folder f1;\n        3.drag w1 to f1;\n        4.select f1;\n\n        asset children should show w1\n        ", (function (param) {
                              MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                              MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */0](/* () */0);
                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(directionPointLightsAndBoxWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                            MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](StateLogicService$WonderEditor.getEditorState(TreeRootAssetEditorService$WonderEditor.getRootTreeNodeId), undefined, /* () */0);
                                            var addedFolderNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                            MainEditorAssetTreeTool$WonderEditor.Drag[/* dragAssetChildrenNodeIntoAssetTreeNode */1](uploadedWDBNodeId, addedFolderNodeId, undefined, undefined, /* () */0);
                                            MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId, undefined, /* () */0);
                                            return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                          }));
                            }));
              }));
        describe("test drag wdb to scene tree", (function (param) {
                describe("test wdb has direction and point light gameObjects", (function (param) {
                        var _test = function (sandbox, testFunc) {
                          return DragWDBTool$WonderEditor.testDragWDB(sandbox, /* tuple */[
                                      "DirectionPointLightsAndBox",
                                      directionPointLightsAndBoxWDBArrayBuffer[0]
                                    ], testFunc);
                        };
                        describe("should init cloned gameObjects", (function (param) {
                                return Wonder_jest.testPromise("glsl->direction,point light count should + 1", (function (param) {
                                              return _test(sandbox, (function (shaderSourceCountBeforeDrag, shaderSourceCountAfterDrag, glShaderSource) {
                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
                        describe("should reinit origin gameObjects in scene", (function (param) {
                                return Wonder_jest.testPromise("glsl->direction,point light count should + 1", (function (param) {
                                              return _test(sandbox, (function (shaderSourceCountBeforeDrag, shaderSourceCountAfterDrag, glShaderSource) {
                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLToolEngine$WonderEditor.containMultiline(GLSLToolEngine$WonderEditor.getFsSourceByCount(glShaderSource, shaderSourceCountBeforeDrag), /* :: */[
                                                                                    "#define DIRECTION_LIGHTS_COUNT 1",
                                                                                    /* :: */[
                                                                                      "#define POINT_LIGHTS_COUNT 1",
                                                                                      /* [] */0
                                                                                    ]
                                                                                  ])), true));
                                                          }));
                                            }));
                              }));
                        Wonder_jest.testPromise("should reinit cloned gameObjects", (function (param) {
                                return _test(sandbox, (function (shaderSourceCountBeforeDrag, shaderSourceCountAfterDrag, glShaderSource) {
                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](shaderSourceCountAfterDrag - shaderSourceCountBeforeDrag | 0), 1));
                                            }));
                              }));
                        return Wonder_jest.testPromise("should clear shader cache", (function (param) {
                                      return _test(sandbox, (function (shaderSourceCountBeforeDrag, shaderSourceCountAfterDrag, glShaderSource) {
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ShaderToolEngine$WonderEditor.isShaderCacheClear(StateEngineService$WonderEditor.unsafeGetState(/* () */0))), true));
                                                  }));
                                    }));
                      }));
                describe("check", (function (param) {
                        describe("check light count before drag", (function (param) {
                                describe("if light count will exceed max count after drag, warn", (function (param) {
                                        var _test = function (createLightFunc, judgeFunc) {
                                          ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                          var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                          MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                                          MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */0](/* () */0);
                                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                          var match = Curry._2(createLightFunc, editorState, engineState);
                                          StateEditorService$WonderEditor.setState(match[0]);
                                          StateEngineService$WonderEditor.setState(match[1]);
                                          return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(directionPointLightsAndBoxWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                        MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                        MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                        return Curry._1(judgeFunc, warn);
                                                      }));
                                        };
                                        describe("test direction light", (function (param) {
                                                Wonder_jest.testPromise("test not exceed", (function (param) {
                                                        return _test((function (editorState, engineState) {
                                                                      var match = PrimitiveEngineService$WonderEditor.createDirectionLight(editorState, engineState);
                                                                      var match$1 = PrimitiveEngineService$WonderEditor.createDirectionLight(match[0], match[1]);
                                                                      return /* tuple */[
                                                                              match$1[0],
                                                                              match$1[1]
                                                                            ];
                                                                    }), (function (warn) {
                                                                      return Promise.resolve(Sinon.toCalled(Wonder_jest.Expect[/* noT_ */22](Wonder_jest.Expect[/* expect */0](warn))));
                                                                    }));
                                                      }));
                                                return Wonder_jest.testPromise("test exceed", (function (param) {
                                                              return _test((function (editorState, engineState) {
                                                                            var match = PrimitiveEngineService$WonderEditor.createDirectionLight(editorState, engineState);
                                                                            var match$1 = PrimitiveEngineService$WonderEditor.createDirectionLight(match[0], match[1]);
                                                                            var match$2 = PrimitiveEngineService$WonderEditor.createDirectionLight(match$1[0], match$1[1]);
                                                                            return /* tuple */[
                                                                                    match$2[0],
                                                                                    match$2[1]
                                                                                  ];
                                                                          }), (function (warn) {
                                                                            return Promise.resolve(Wonder_jest.Expect[/* toContain */10]("the direction light count is exceed max count!")(Wonder_jest.Expect[/* expect */0](ConsoleTool$WonderEditor.getMessage(warn))));
                                                                          }));
                                                            }));
                                              }));
                                        describe("test point light", (function (param) {
                                                Wonder_jest.testPromise("test not exceed", (function (param) {
                                                        return _test((function (editorState, engineState) {
                                                                      var match = PrimitiveEngineService$WonderEditor.createDirectionLight(editorState, engineState);
                                                                      var match$1 = PrimitiveEngineService$WonderEditor.createDirectionLight(match[0], match[1]);
                                                                      var match$2 = MainEditorPointLightTool$WonderEditor.createPointLight(match$1[0], match$1[1]);
                                                                      return /* tuple */[
                                                                              match$2[0],
                                                                              match$2[1]
                                                                            ];
                                                                    }), (function (warn) {
                                                                      return Promise.resolve(Sinon.toCalled(Wonder_jest.Expect[/* noT_ */22](Wonder_jest.Expect[/* expect */0](warn))));
                                                                    }));
                                                      }));
                                                return Wonder_jest.testPromise("test exceed", (function (param) {
                                                              return _test((function (editorState, engineState) {
                                                                            var match = MainEditorPointLightTool$WonderEditor.createPointLight(editorState, engineState);
                                                                            var match$1 = MainEditorPointLightTool$WonderEditor.createPointLight(match[0], match[1]);
                                                                            var match$2 = MainEditorPointLightTool$WonderEditor.createPointLight(match$1[0], match$1[1]);
                                                                            return /* tuple */[
                                                                                    match$2[0],
                                                                                    match$2[1]
                                                                                  ];
                                                                          }), (function (warn) {
                                                                            return Promise.resolve(Wonder_jest.Expect[/* toContain */10]("the point light count is exceed max count!")(Wonder_jest.Expect[/* expect */0](ConsoleTool$WonderEditor.getMessage(warn))));
                                                                          }));
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("test drag wdb to gameObject", (function (param) {
                        return Wonder_jest.testPromise("should add to target sceneTree node's children", (function (param) {
                                      MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */0]);
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(directionPointLightsAndBoxWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                    MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, MainEditorSceneTool$WonderEditor.getFirstBox(engineState), undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                    return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0))));
                                                  }));
                                    }));
                      }));
                describe("fix bug", (function (param) {
                        describe("should remain other scene tree node's isShowChildren not change", (function (param) {
                                return Wonder_jest.test("test scene graph data", (function (param) {
                                              var match = SceneTreeTool$WonderEditor.buildThreeLayerSceneGraphToEngine(sandbox);
                                              var match$1 = match[1];
                                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              var isShowChildrenMap = SceneGraphUtils$WonderEditor.buildIsShowChildrenMap(SceneGraphUtils$WonderEditor.getSceneGraphDataFromEngine(/* tuple */[
                                                        editorState,
                                                        engineState
                                                      ]));
                                              var isShowChildrenMap$1 = SparseMapService$WonderCommonlib.set(match[2], false, SparseMapService$WonderCommonlib.set(match$1[1], true, SparseMapService$WonderCommonlib.set(match$1[0], true, isShowChildrenMap)));
                                              var match$2 = GameObjectToolEngine$WonderEditor.createGameObject(engineState);
                                              var newGameObject1 = match$2[1];
                                              var engineState$1 = GameObjectEngineService$WonderEditor.setGameObjectName("gameObject_0", newGameObject1, match$2[0]);
                                              var engineState$2 = SceneEngineService$WonderEditor.addSceneChild(newGameObject1, engineState$1);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SceneGraphUtils$WonderEditor.buildIsShowChildrenMap(SceneGraphUtils$WonderEditor.setIsShowChildrenByMap(isShowChildrenMap$1, SceneGraphUtils$WonderEditor.getSceneGraphDataFromEngine(/* tuple */[
                                                                          editorState,
                                                                          engineState$2
                                                                        ])))), /* array */[
                                                          true,
                                                          undefined,
                                                          undefined,
                                                          true,
                                                          false,
                                                          false,
                                                          true,
                                                          false
                                                        ]);
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
