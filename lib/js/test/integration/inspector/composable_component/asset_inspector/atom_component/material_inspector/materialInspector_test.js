'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../../../../tool/TestTool.js");
var CanvasTool$WonderEditor = require("../../../../../../unit/atom_component/canvas/tool/CanvasTool.js");
var ConsoleTool$WonderEditor = require("../../../../../../unit/tool/external/ConsoleTool.js");
var InspectorTool$WonderEditor = require("../../../../../../tool/ui/InspectorTool.js");
var ReactTestTool$WonderEditor = require("../../../../../../tool/ReactTestTool.js");
var MaterialAssetTool$WonderEditor = require("../../../../../asset/tool/MaterialAssetTool.js");
var StateLogicService$WonderEditor = require("../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var AssetInspectorTool$WonderEditor = require("../../tool/AssetInspectorTool.js");
var BuildComponentTool$WonderEditor = require("../../../../../../tool/BuildComponentTool.js");
var StateEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/state/StateEngineService.js");
var InspectorCanvasTool$WonderEditor = require("../../tool/InspectorCanvasTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetIdTool.js");
var MaterialInspectorTool$WonderEditor = require("./tool/MaterialInspectorTool.js");
var MainEditorMaterialTool$WonderEditor = require("../../../sceneTree_inspector/renderGroup/material/tool/MainEditorMaterialTool.js");
var LightMaterialToolEngine$WonderEditor = require("../../../../../../tool/engine/LightMaterialToolEngine.js");
var MaterialNodeAssetService$WonderEditor = require("../../../../../../../src/service/record/editor/asset/MaterialNodeAssetService.js");
var NodeNameAssetLogicService$WonderEditor = require("../../../../../../../src/service/stateTuple/logic/asset/NodeNameAssetLogicService.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");
var MainEditorAssetChildrenNodeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetChildrenNodeTool.js");
var MainEditorAssetMaterialNodeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetMaterialNodeTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");

Wonder_jest.describe("material inspector", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                InspectorCanvasTool$WonderEditor.prepareInspectorEngineState(sandbox);
                CanvasTool$WonderEditor.stubMainCanvasAndInspectorCanvasDom(sandbox, undefined, undefined, undefined, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test rename material", (function (param) {
                Wonder_jest.test("if type is basicMaterial, rename to default basic material name should not work", (function (param) {
                        ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                        var addedMaterialNodeId = MaterialAssetTool$WonderEditor.addOneBasicMaterial(/* () */0);
                        var newName = MainEditorMaterialTool$WonderEditor.getDefaultBasicMaterialName(/* () */0);
                        AssetInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */5](undefined, undefined, addedMaterialNodeId, newName, /* () */0);
                        MainEditorAssetChildrenNodeTool$WonderEditor.selectMaterialNode(addedMaterialNodeId, undefined, undefined, /* () */0);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                      }));
                Wonder_jest.test("if type is lightMaterial, rename to default light material name should not work", (function (param) {
                        ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                        var addedMaterialNodeId = MaterialAssetTool$WonderEditor.addOneLightMaterial(/* () */0);
                        var newName = MainEditorMaterialTool$WonderEditor.getDefaultLightMaterialName(/* () */0);
                        AssetInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */5](undefined, undefined, addedMaterialNodeId, newName, /* () */0);
                        MainEditorAssetChildrenNodeTool$WonderEditor.selectMaterialNode(addedMaterialNodeId, undefined, undefined, /* () */0);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                      }));
                return Wonder_jest.describe("fix bug", (function (param) {
                              Wonder_jest.test("if rename to the same name, should warn", (function (param) {
                                      ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                      var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                      var addedMaterialNodeId = MaterialAssetTool$WonderEditor.addOneLightMaterial(/* () */0);
                                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      var match = MaterialNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(addedMaterialNodeId, editorState));
                                      var newName = NodeNameAssetLogicService$WonderEditor.getMaterialNodeName(match[/* materialComponent */1], match[/* type_ */0], engineState);
                                      AssetInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */5](undefined, undefined, addedMaterialNodeId, newName, /* () */0);
                                      return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](warn));
                                    }));
                              return Wonder_jest.test("if rename to the existed name in the same dir, should fail", (function (param) {
                                            var addedMaterialNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                            var addedMaterialNodeId2 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                            var newName = "materialName";
                                            AssetInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */5](undefined, undefined, addedMaterialNodeId1, newName, /* () */0);
                                            var material2OldName = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialName(addedMaterialNodeId2, undefined, undefined, /* () */0);
                                            AssetInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */5](undefined, undefined, addedMaterialNodeId2, newName, /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialName(addedMaterialNodeId1, undefined, undefined, /* () */0),
                                                            MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialName(addedMaterialNodeId2, undefined, undefined, /* () */0)
                                                          ]), /* tuple */[
                                                        newName,
                                                        material2OldName
                                                      ]);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("change material type", (function (param) {
                      return Wonder_jest.test("if source material has no gameObject, still dispose source material", (function (param) {
                                    var addedMaterialNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                    var materialComponent1 = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId1, undefined, /* () */0);
                                    MainEditorAssetChildrenNodeTool$WonderEditor.selectMaterialNode(addedMaterialNodeId1, undefined, undefined, /* () */0);
                                    MaterialInspectorTool$WonderEditor.changeMaterialType(materialComponent1, /* LightMaterial */1, /* BasicMaterial */0, addedMaterialNodeId1, undefined, undefined, /* () */0);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                          return LightMaterialToolEngine$WonderEditor.isAlive(materialComponent1, param);
                                                        }))), false);
                                  }));
                    }));
      }));

/*  Not a pure module */
