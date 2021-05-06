'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../../tool/TestTool.js");
var SinonTool$WonderEditor = require("../../../../tool/SinonTool.js");
var InspectorTool$WonderEditor = require("../../../../tool/ui/InspectorTool.js");
var ReactTestTool$WonderEditor = require("../../../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../../../tool/GameObjectTool.js");
var BuildComponentTool$WonderEditor = require("../../../../tool/BuildComponentTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../tool/MainEditorAssetIdTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../tool/MainEditorAssetTreeTool.js");
var MainEditorSceneTreeTool$WonderEditor = require("../../../../unit/tool/MainEditorSceneTreeTool.js");
var MainEditorScriptAttributeTool$WonderEditor = require("../../../inspector/composable_component/sceneTree_inspector/script/tool/MainEditorScriptAttributeTool.js");
var MainEditorInspectorAddComponentTool$WonderEditor = require("../../../inspector/atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../tool/MainEditorAssetHeaderOperateNodeTool.js");

Wonder_jest.describe("MainEditorAssetHeader->remove script event function", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("\n        select script event function;\n        click remove-button;\n            ", (function (param) {
                return Wonder_jest.test("should remove it from assetTreeRoot", (function (param) {
                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* ScriptAttribute */5][/* buildOneScriptAttributeAssetTree */0], /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeScriptAttributeNode(undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* ScriptAttribute */5][/* getFirstScriptAttributeNodeId */2], assetTreeData), /* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0));
                            }));
              }));
        return Wonder_jest.describe("should remove from script components", (function (param) {
                      beforeEach((function () {
                              MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                              return MainEditorInspectorAddComponentTool$WonderEditor.addScriptComponent(undefined, undefined, undefined, /* () */0);
                            }));
                      return Wonder_jest.test("test", (function (param) {
                                    var script = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
                                    MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                    var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                                    MainEditorScriptAttributeTool$WonderEditor.addScriptAttribute(script, Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeScriptAttributeNode(undefined, undefined, addedNodeId, /* () */0);
                                    MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), /* () */0);
                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                  }));
                    }));
      }));

/*  Not a pure module */
