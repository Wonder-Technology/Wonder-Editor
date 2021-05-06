'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ReactTestTool$WonderEditor = require("../../../../tool/ReactTestTool.js");
var EventListenerTool$WonderEditor = require("../../../../unit/tool/EventListenerTool.js");
var BuildComponentTool$WonderEditor = require("../../../../tool/BuildComponentTool.js");
var StateEditorService$WonderEditor = require("../../../../../src/service/state/editor/StateEditorService.js");
var InspectorCanvasTool$WonderEditor = require("../../../inspector/composable_component/asset_inspector/tool/InspectorCanvasTool.js");
var MainEditorAssetTool$WonderEditor = require("../../tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../tool/MainEditorAssetTreeTool.js");
var CurrentNodeIdAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/CurrentNodeIdAssetEditorService.js");
var SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/SelectedFolderNodeIdInAssetTreeAssetEditorService.js");

Wonder_jest.describe("MainEditorAssetHeader->remove node", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                InspectorCanvasTool$WonderEditor.prepareInspectorEngineState(sandbox);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                Curry._1(Sinon.restoreSandbox, sandbox[0]);
                StateEditorService$WonderEditor.setState(SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor.clearSelectedFolderNodeIdInAssetTree(CurrentNodeIdAssetEditorService$WonderEditor.clearCurrentNodeId(StateEditorService$WonderEditor.getState(/* () */0))));
                return /* () */0;
              }));
        return Wonder_jest.describe("test remove tree node", (function (param) {
                      Wonder_jest.test("if not select specific treeNode, remove-button's disabled props should == true ", (function (param) {
                              MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                              MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                            }));
                      return Wonder_jest.describe("else", (function (param) {
                                    return Wonder_jest.test("remove-button's disabled props should == false", (function (param) {
                                                  MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                                                  var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                                  MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData), undefined, /* () */0);
                                                  return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
