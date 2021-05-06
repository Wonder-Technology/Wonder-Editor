'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../tool/TestTool.js");
var InspectorTool$WonderEditor = require("../../../tool/ui/InspectorTool.js");
var ReactTestTool$WonderEditor = require("../../../tool/ReactTestTool.js");
var OldNewSelfTool$WonderEditor = require("../../../unit/tool/OldNewSelfTool.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var AssetWidgetService$WonderEditor = require("../../../../src/service/record/editor/widget/AssetWidgetService.js");
var BuildComponentTool$WonderEditor = require("../../../tool/BuildComponentTool.js");
var MainEditorAssetTool$WonderEditor = require("../../asset/tool/MainEditorAssetTool.js");
var MainEditorInspector$WonderEditor = require("../../../../src/core/composable_component/mainEditor/composable_component/inspector/ui/MainEditorInspector.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var SceneTreeWidgetService$WonderEditor = require("../../../../src/service/record/editor/widget/SceneTreeWidgetService.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../asset/tool/MainEditorAssetTreeTool.js");
var MainEditorAssetChildrenNodeTool$WonderEditor = require("../../asset/tool/MainEditorAssetChildrenNodeTool.js");
var CurrentSelectSourceEditorService$WonderEditor = require("../../../../src/service/state/editor/CurrentSelectSourceEditorService.js");

Wonder_jest.describe("MainEditorInspector", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test should update", (function (param) {
                Wonder_jest.test("if reatinedProps updateTypeArr include All, should update", (function (param) {
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorInspector$WonderEditor.shouldUpdate(OldNewSelfTool$WonderEditor.buildNewSelf(/* record */[/* updateTypeArr : array */[/* All */1]]))), true);
                      }));
                Wonder_jest.test("else if reatinedProps updateTypeArr include Inspector, should update", (function (param) {
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorInspector$WonderEditor.shouldUpdate(OldNewSelfTool$WonderEditor.buildNewSelf(/* record */[/* updateTypeArr : array */[/* Inspector */2]]))), true);
                      }));
                return Wonder_jest.test("else, should not update", (function (param) {
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorInspector$WonderEditor.shouldUpdate(OldNewSelfTool$WonderEditor.buildNewSelf(/* record */[/* updateTypeArr : array */[/* SceneTree */6]]))), false);
                            }));
              }));
        return Wonder_jest.describe("change source to show it's inspector", (function (param) {
                      Wonder_jest.test("if not set currentSelectSource, show nothing", (function (param) {
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                            }));
                      Wonder_jest.describe("else set currentSelectSource is SceneTree", (function (param) {
                              beforeEach((function () {
                                      MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                      var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                                      return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                                    return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                                                  }));
                                    }));
                              return Wonder_jest.test("show currentSceneTreeNode component", (function (param) {
                                            return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                          }));
                            }));
                      return Wonder_jest.describe("else set currentSelectSource is Asset", (function (param) {
                                    beforeEach((function () {
                                            var partial_arg = AssetWidgetService$WonderEditor.getWidget(/* () */0);
                                            return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                                          return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                                                        }));
                                          }));
                                    return Wonder_jest.test("show currentNodeId's asset node component", (function (param) {
                                                  var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                                                  MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData), undefined, undefined, /* () */0);
                                                  return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
