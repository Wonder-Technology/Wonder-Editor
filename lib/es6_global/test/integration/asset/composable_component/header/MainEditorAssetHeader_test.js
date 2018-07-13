

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../tool/TestTool.js";
import * as BaseEventTool$WonderEditor from "../../../../tool/ui/BaseEventTool.js";
import * as ReactTestTool$WonderEditor from "../../../../tool/ReactTestTool.js";
import * as EventListenerTool$WonderEditor from "../../../../unit/tool/EventListenerTool.js";
import * as StateAssetService$WonderEditor from "../../../../../src/service/state/asset/StateAssetService.js";
import * as AssetTreeEventTool$WonderEditor from "../../tool/AssetTreeEventTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../tool/BuildComponentTool.js";
import * as MainEditorAssetTool$WonderEditor from "../../tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as MainEditorAssetHeader$WonderEditor from "../../../../../src/core/composable_component/mainEditor/composable_component/asset/composable_component/header/ui/MainEditorAssetHeader.js";
import * as JsonNodeMapAssetService$WonderEditor from "../../../../../src/service/state/asset/JsonNodeMapAssetService.js";
import * as MainEditorAssetNodeTool$WonderEditor from "../../tool/MainEditorAssetNodeTool.js";
import * as AssetTreeRootAssetService$WonderEditor from "../../../../../src/service/state/asset/AssetTreeRootAssetService.js";
import * as ImageBase64MapAssetService$WonderEditor from "../../../../../src/service/state/asset/ImageBase64MapAssetService.js";
import * as CurrentNodeDataAssetService$WonderEditor from "../../../../../src/service/state/asset/CurrentNodeDataAssetService.js";
import * as CurrentNodeParentIdAssetService$WonderEditor from "../../../../../src/service/state/asset/CurrentNodeParentIdAssetService.js";

describe("MainEditorAssetHeader", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initStateAndGl(sandbox, /* None */0, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                Curry._1(Sinon.restoreSandbox, sandbox[0]);
                StateAssetService$WonderEditor.setState(CurrentNodeParentIdAssetService$WonderEditor.clearCurrentNodeParentId(CurrentNodeDataAssetService$WonderEditor.clearCurrentNodeData(StateAssetService$WonderEditor.getState(/* () */0))));
                return /* () */0;
              }));
        describe("test operate treeNode", (function () {
                describe("test add folder", (function () {
                        var _triggerAddFolderClick = function ($staropt$star, _) {
                          if (!$staropt$star) {
                            BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                          }
                          return BaseEventTool$WonderEditor.triggerComponentEvent(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0), AssetTreeEventTool$WonderEditor.triggerAddFolderClick);
                        };
                        describe("if not select specific treeNode, add folder into root treeNode", (function () {
                                Wonder_jest.test("test snapshot", (function () {
                                        MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRootTest(/* () */0);
                                        _triggerAddFolderClick(/* None */0, /* () */0);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                      }));
                                describe("test logic", (function () {
                                        Wonder_jest.test("test asset children length before add folder", (function () {
                                                MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRootTest(/* () */0);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssetTreeRootAssetService$WonderEditor.unsafeGetAssetTreeRoot(StateAssetService$WonderEditor.getState(/* () */0))[/* children */1].length), 5);
                                              }));
                                        return Wonder_jest.test("test asset children length after add folder", (function () {
                                                      MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRootTest(/* () */0);
                                                      _triggerAddFolderClick(/* None */0, /* () */0);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssetTreeRootAssetService$WonderEditor.unsafeGetAssetTreeRoot(StateAssetService$WonderEditor.getState(/* () */0))[/* children */1].length), 6);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return Wonder_jest.test("else, add folder into specific treeNode", (function () {
                                      var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRootTest(/* () */0);
                                      var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                                      MainEditorAssetTool$WonderEditor.clickAssetTreeNodeToSetCurrentNode(component, MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstFolderDomIndexForAssetTree */4](assetTreeDomRecord));
                                      _triggerAddFolderClick(/* Some */[component], /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                    }));
                      }));
                describe("test remove tree node", (function () {
                        Wonder_jest.test("if not select specific treeNode, remove-button's disabled props should == true ", (function () {
                                MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRootTest(/* () */0);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                              }));
                        describe("else", (function () {
                                describe("test snapshot", (function () {
                                        Wonder_jest.test("remove-button's disabled props should == false", (function () {
                                                var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRootTest(/* () */0);
                                                var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                                                MainEditorAssetTool$WonderEditor.clickAssetTreeNodeToSetCurrentNode(component, MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstFolderDomIndexForAssetTree */4](assetTreeDomRecord));
                                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(component);
                                              }));
                                        describe("test select folder", (function () {
                                                return Wonder_jest.test("click remove-button should remove folder from assetTreeRoot", (function () {
                                                              var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRootTest(/* () */0);
                                                              var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                                                              MainEditorAssetTool$WonderEditor.clickAssetTreeNodeToSetCurrentNode(component, MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstFolderDomIndexForAssetTree */4](assetTreeDomRecord));
                                                              BaseEventTool$WonderEditor.triggerComponentEvent(component, AssetTreeEventTool$WonderEditor.triggerRemoveNodeClick);
                                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                                            }));
                                              }));
                                        describe("test select file", (function () {
                                                Wonder_jest.test("select texture;\n                click remove-button;\n                should remove it from assetTreeRoot", (function () {
                                                        var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRootTest(/* () */0);
                                                        MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */7](assetTreeDomRecord));
                                                        var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                                                        BaseEventTool$WonderEditor.triggerComponentEvent(component, AssetTreeEventTool$WonderEditor.triggerRemoveNodeClick);
                                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                                      }));
                                                return Wonder_jest.test("select json is currentNode;\n                click remove-button;\n                should remove it from assetTreeRoot", (function () {
                                                              var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRootTest(/* () */0);
                                                              MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstJsonDomIndex */9](assetTreeDomRecord));
                                                              var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                                                              BaseEventTool$WonderEditor.triggerComponentEvent(component, AssetTreeEventTool$WonderEditor.triggerRemoveNodeClick);
                                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                describe("test logic", (function () {
                                        Wonder_jest.test("test assetTree root length before remove", (function () {
                                                MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRootTest(/* () */0);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssetTreeRootAssetService$WonderEditor.unsafeGetAssetTreeRoot(StateAssetService$WonderEditor.getState(/* () */0))[/* children */1].length), 5);
                                              }));
                                        return Wonder_jest.test("test remove node from aseetTreeRoot", (function () {
                                                      var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRootTest(/* () */0);
                                                      var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                                                      MainEditorAssetTool$WonderEditor.clickAssetTreeNodeToSetCurrentNode(component, MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstFolderDomIndexForAssetTree */4](assetTreeDomRecord));
                                                      BaseEventTool$WonderEditor.triggerComponentEvent(component, AssetTreeEventTool$WonderEditor.triggerRemoveNodeClick);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssetTreeRootAssetService$WonderEditor.unsafeGetAssetTreeRoot(StateAssetService$WonderEditor.getState(/* () */0))[/* children */1].length), 4);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test load file", (function () {
                beforeEach((function () {
                        Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                        return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                      }));
                describe("test snapshot", (function () {
                        describe("if not select specific treeNode", (function () {
                                return Wonder_jest.testPromise("load file should add into root node children", (function () {
                                              MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRootTest(/* () */0);
                                              return MainEditorAssetHeader$WonderEditor.Method[/* _fileLoad */4](TestTool$WonderEditor.getDispatch(/* () */0), BaseEventTool$WonderEditor.buildFileEvent(/* None */0, /* None */0, /* None */0, /* None */0, /* () */0)).then((function () {
                                                            return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0)));
                                                          }));
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test logic", (function () {
                        describe("test should add into root node children", (function () {
                                return Wonder_jest.testPromise("test children node length", (function () {
                                              MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRootTest(/* () */0);
                                              var normalChildrenLen = AssetTreeRootAssetService$WonderEditor.unsafeGetAssetTreeRoot(StateAssetService$WonderEditor.getState(/* () */0))[/* children */1].length;
                                              return MainEditorAssetHeader$WonderEditor.Method[/* _fileLoad */4](TestTool$WonderEditor.getDispatch(/* () */0), BaseEventTool$WonderEditor.buildFileEvent(/* None */0, /* None */0, /* None */0, /* None */0, /* () */0)).then((function () {
                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssetTreeRootAssetService$WonderEditor.unsafeGetAssetTreeRoot(StateAssetService$WonderEditor.getState(/* () */0))[/* children */1].length - normalChildrenLen | 0), 2));
                                                          }));
                                            }));
                              }));
                        describe("test should add into nodeMap", (function () {
                                describe("test imageBase64Map", (function () {
                                        return Wonder_jest.testPromise("add image base64 to imageBase64Map", (function () {
                                                      var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRootTest(/* () */0);
                                                      var imgBase64 = "newImgBase64";
                                                      return MainEditorAssetHeader$WonderEditor.Method[/* _fileLoad */4](TestTool$WonderEditor.getDispatch(/* () */0), BaseEventTool$WonderEditor.buildFileEvent(/* None */0, /* Some */[imgBase64], /* None */0, /* None */0, /* () */0)).then((function () {
                                                                    MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getUploadedeTextureNodeDomIndex */1](assetTreeDomRecord));
                                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SparseMapService$WonderCommonlib.unsafeGet(MainEditorAssetNodeTool$WonderEditor.getTextureIndexFromCurrentNodeId(/* () */0), ImageBase64MapAssetService$WonderEditor.getImageBase64Map(StateAssetService$WonderEditor.getState(/* () */0)))), imgBase64));
                                                                  }));
                                                    }));
                                      }));
                                describe("test textureNodeMap", (function () {
                                        return Wonder_jest.testPromise("add created texture index to textureNodeMap", (function () {
                                                      var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRootTest(/* () */0);
                                                      return MainEditorAssetHeader$WonderEditor.Method[/* _fileLoad */4](TestTool$WonderEditor.getDispatch(/* () */0), BaseEventTool$WonderEditor.buildFileEvent(/* None */0, /* None */0, /* None */0, /* None */0, /* () */0)).then((function () {
                                                                    MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getUploadedeTextureNodeDomIndex */1](assetTreeDomRecord));
                                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorAssetNodeTool$WonderEditor.getTextureIndexFromCurrentNodeId(/* () */0)), MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getUploadedTextureIndex */0](assetTreeDomRecord)));
                                                                  }));
                                                    }));
                                      }));
                                describe("test jsonNodeMap", (function () {
                                        return Wonder_jest.testPromise("add json string to jsonNodeMap", (function () {
                                                      var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRootTest(/* () */0);
                                                      var jsonName = "newLoadJson.json";
                                                      return MainEditorAssetHeader$WonderEditor.Method[/* _fileLoad */4](TestTool$WonderEditor.getDispatch(/* () */0), BaseEventTool$WonderEditor.buildFileEvent(/* None */0, /* None */0, /* Some */[jsonName], /* Some */["I'm the result"], /* () */0)).then((function () {
                                                                    MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getUploadedeJsonNodeDomIndex */2](assetTreeDomRecord));
                                                                    var match = SparseMapService$WonderCommonlib.unsafeGet(MainEditorAssetNodeTool$WonderEditor.getCurrentNodeId(/* () */0), JsonNodeMapAssetService$WonderEditor.getJsonNodeMap(StateAssetService$WonderEditor.getState(/* () */0)));
                                                                    var jsonResult = match[/* jsonResult */1];
                                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                        match[/* name */0],
                                                                                        jsonResult
                                                                                      ]), /* tuple */[
                                                                                    jsonName,
                                                                                    jsonResult
                                                                                  ]));
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

export {
  
}
/*  Not a pure module */
