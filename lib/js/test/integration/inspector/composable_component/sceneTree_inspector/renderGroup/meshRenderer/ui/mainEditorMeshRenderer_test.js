'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../../../../../tool/TestTool.js");
var ReactTestTool$WonderEditor = require("../../../../../../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../../../../../../tool/GameObjectTool.js");
var StateLogicService$WonderEditor = require("../../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../../../../../tool/BuildComponentTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../../tool/MainEditorSceneTool.js");
var MeshRendererEngineService$WonderEditor = require("../../../../../../../../src/service/state/engine/MeshRendererEngineService.js");
var MainEditorMeshRendererTool$WonderEditor = require("../tool/MainEditorMeshRendererTool.js");

Wonder_jest.describe("mainEditor meshRenderer", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test meshRenderer change drawMode", (function (param) {
                      beforeEach((function () {
                              return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                            }));
                      Wonder_jest.describe("test set drawMode to Lines", (function (param) {
                              Wonder_jest.test("test snapshot", (function (param) {
                                      var lineType = MainEditorMeshRendererTool$WonderEditor.getDrawModeLineType(/* () */0);
                                      MainEditorMeshRendererTool$WonderEditor.changeMode(lineType, undefined, undefined, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMeshRenderer(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                    }));
                              return Wonder_jest.test("test logic", (function (param) {
                                            var lineType = MainEditorMeshRendererTool$WonderEditor.getDrawModeLineType(/* () */0);
                                            MainEditorMeshRendererTool$WonderEditor.changeMode(lineType, undefined, undefined, undefined, /* () */0);
                                            var meshRenderer = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeMeshRenderer(/* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                  return MeshRendererEngineService$WonderEditor.getDrawMode(meshRenderer, param);
                                                                }))), lineType);
                                          }));
                            }));
                      Wonder_jest.describe("test set drawMode to Points", (function (param) {
                              Wonder_jest.test("test snapshot", (function (param) {
                                      var pointType = MainEditorMeshRendererTool$WonderEditor.getDrawModePointType(/* () */0);
                                      MainEditorMeshRendererTool$WonderEditor.changeMode(pointType, undefined, undefined, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMeshRenderer(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                    }));
                              return Wonder_jest.test("test logic", (function (param) {
                                            var pointType = MainEditorMeshRendererTool$WonderEditor.getDrawModePointType(/* () */0);
                                            MainEditorMeshRendererTool$WonderEditor.changeMode(pointType, undefined, undefined, undefined, /* () */0);
                                            var meshRenderer = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeMeshRenderer(/* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                  return MeshRendererEngineService$WonderEditor.getDrawMode(meshRenderer, param);
                                                                }))), pointType);
                                          }));
                            }));
                      return Wonder_jest.describe("test set drawMode to Triangle_fan", (function (param) {
                                    Wonder_jest.test("test snapshot", (function (param) {
                                            var triangleFanType = MainEditorMeshRendererTool$WonderEditor.getDrawModeTriangleFanType(/* () */0);
                                            MainEditorMeshRendererTool$WonderEditor.changeMode(triangleFanType, undefined, undefined, undefined, /* () */0);
                                            return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMeshRenderer(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                          }));
                                    return Wonder_jest.test("test logic", (function (param) {
                                                  var triangleFanType = MainEditorMeshRendererTool$WonderEditor.getDrawModeTriangleFanType(/* () */0);
                                                  MainEditorMeshRendererTool$WonderEditor.changeMode(triangleFanType, undefined, undefined, undefined, /* () */0);
                                                  var meshRenderer = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeMeshRenderer(/* () */0);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                        return MeshRendererEngineService$WonderEditor.getDrawMode(meshRenderer, param);
                                                                      }))), triangleFanType);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
