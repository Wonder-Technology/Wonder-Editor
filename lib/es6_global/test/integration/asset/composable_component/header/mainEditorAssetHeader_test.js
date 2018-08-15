

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as TestTool$WonderEditor from "../../../../tool/TestTool.js";
import * as BaseEventTool$WonderEditor from "../../../../tool/ui/BaseEventTool.js";
import * as ReactTestTool$WonderEditor from "../../../../tool/ReactTestTool.js";
import * as EventListenerTool$WonderEditor from "../../../../unit/tool/EventListenerTool.js";
import * as AssetTreeEventTool$WonderEditor from "../../tool/AssetTreeEventTool.js";
import * as AssetTreeNodeUtils$WonderEditor from "../../../../../src/core/composable_component/mainEditor/composable_component/asset/utils/AssetTreeNodeUtils.js";
import * as BuildComponentTool$WonderEditor from "../../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorAssetTool$WonderEditor from "../../tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as MainEditorAssetNodeTool$WonderEditor from "../../tool/MainEditorAssetNodeTool.js";
import * as AssetTreeRootEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/AssetTreeRootEditorService.js";
import * as AssetJsonNodeMapEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/AssetJsonNodeMapEditorService.js";
import * as AssetImageBase64MapEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/AssetImageBase64MapEditorService.js";
import * as AssetCurrentNodeDataEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/AssetCurrentNodeDataEditorService.js";
import * as AssetCurrentNodeParentIdEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/AssetCurrentNodeParentIdEditorService.js";

describe("MainEditorAssetHeader", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                Curry._1(Sinon.restoreSandbox, sandbox[0]);
                StateEditorService$WonderEditor.setState(AssetCurrentNodeParentIdEditorService$WonderEditor.clearCurrentNodeParentId(AssetCurrentNodeDataEditorService$WonderEditor.clearCurrentNodeData(StateEditorService$WonderEditor.getState(/* () */0))));
                return /* () */0;
              }));
        describe("test operate treeNode", (function () {
                describe("test add folder", (function () {
                        var _triggerAddFolderClick = function ($staropt$star, _) {
                          if ($staropt$star !== undefined) {
                            Js_primitive.valFromOption($staropt$star);
                          } else {
                            BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                          }
                          return BaseEventTool$WonderEditor.triggerComponentEvent(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0), AssetTreeEventTool$WonderEditor.triggerAddFolderClick);
                        };
                        describe("if not select specific treeNode, add folder into root treeNode", (function () {
                                Wonder_jest.test("test snapshot", (function () {
                                        MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                        _triggerAddFolderClick(undefined, /* () */0);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                      }));
                                describe("test logic", (function () {
                                        Wonder_jest.test("test asset children length before add folder", (function () {
                                                MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(StateEditorService$WonderEditor.getState(/* () */0))[/* children */1].length), 5);
                                              }));
                                        return Wonder_jest.test("test asset children length after add folder", (function () {
                                                      MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                      _triggerAddFolderClick(undefined, /* () */0);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(StateEditorService$WonderEditor.getState(/* () */0))[/* children */1].length), 6);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return Wonder_jest.test("else, add folder into specific treeNode", (function () {
                                      var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                      var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                                      MainEditorAssetTool$WonderEditor.clickAssetTreeNodeToSetCurrentNode(component, MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstFolderDomIndexForAssetTree */4](assetTreeDomRecord));
                                      _triggerAddFolderClick(Js_primitive.some(component), /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                    }));
                      }));
                describe("test remove tree node", (function () {
                        Wonder_jest.test("if not select specific treeNode, remove-button's disabled props should == true ", (function () {
                                MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                              }));
                        describe("else", (function () {
                                describe("test snapshot", (function () {
                                        Wonder_jest.test("remove-button's disabled props should == false", (function () {
                                                var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                                                MainEditorAssetTool$WonderEditor.clickAssetTreeNodeToSetCurrentNode(component, MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstFolderDomIndexForAssetTree */4](assetTreeDomRecord));
                                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(component);
                                              }));
                                        describe("test select folder", (function () {
                                                return Wonder_jest.test("click remove-button should remove folder from assetTreeRoot", (function () {
                                                              var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                              var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                                                              MainEditorAssetTool$WonderEditor.clickAssetTreeNodeToSetCurrentNode(component, MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstFolderDomIndexForAssetTree */4](assetTreeDomRecord));
                                                              BaseEventTool$WonderEditor.triggerComponentEvent(component, AssetTreeEventTool$WonderEditor.triggerRemoveNodeClick);
                                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                                            }));
                                              }));
                                        describe("test select file", (function () {
                                                Wonder_jest.test("select texture;\n                click remove-button;\n                should remove it from assetTreeRoot", (function () {
                                                        var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                        MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */7](assetTreeDomRecord));
                                                        var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                                                        BaseEventTool$WonderEditor.triggerComponentEvent(component, AssetTreeEventTool$WonderEditor.triggerRemoveNodeClick);
                                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                                      }));
                                                return Wonder_jest.test("select json is currentNode;\n                click remove-button;\n                should remove it from assetTreeRoot", (function () {
                                                              var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
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
                                                MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(StateEditorService$WonderEditor.getState(/* () */0))[/* children */1].length), 5);
                                              }));
                                        return Wonder_jest.test("test remove node from aseetTreeRoot", (function () {
                                                      var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                      var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                                                      MainEditorAssetTool$WonderEditor.clickAssetTreeNodeToSetCurrentNode(component, MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstFolderDomIndexForAssetTree */4](assetTreeDomRecord));
                                                      BaseEventTool$WonderEditor.triggerComponentEvent(component, AssetTreeEventTool$WonderEditor.triggerRemoveNodeClick);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(StateEditorService$WonderEditor.getState(/* () */0))[/* children */1].length), 4);
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
                                              MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                              return MainEditorAssetTool$WonderEditor.fileLoad(TestTool$WonderEditor.getDispatch(/* () */0), BaseEventTool$WonderEditor.buildFileEvent(undefined, undefined, undefined, undefined, /* () */0)).then((function () {
                                                            return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0)));
                                                          }));
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test logic", (function () {
                        describe("test should add into root node children", (function () {
                                return Wonder_jest.testPromise("test children node length", (function () {
                                              MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                              var originChildrenLen = AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(StateEditorService$WonderEditor.getState(/* () */0))[/* children */1].length;
                                              return MainEditorAssetTool$WonderEditor.fileLoad(TestTool$WonderEditor.getDispatch(/* () */0), BaseEventTool$WonderEditor.buildFileEvent(undefined, undefined, undefined, undefined, /* () */0)).then((function () {
                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(StateEditorService$WonderEditor.getState(/* () */0))[/* children */1].length - originChildrenLen | 0), 2));
                                                          }));
                                            }));
                              }));
                        describe("test should add into nodeMap", (function () {
                                describe("test imageBase64Map", (function () {
                                        Wonder_jest.testPromise("add image base64 to imageBase64Map", (function () {
                                                var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                var imgBase64 = "newImgBase64";
                                                return MainEditorAssetTool$WonderEditor.fileLoad(TestTool$WonderEditor.getDispatch(/* () */0), BaseEventTool$WonderEditor.buildFileEvent(undefined, imgBase64, undefined, undefined, /* () */0)).then((function () {
                                                              MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getUploadedeTextureNodeDomIndex */1](assetTreeDomRecord));
                                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SparseMapService$WonderCommonlib.unsafeGet(MainEditorAssetNodeTool$WonderEditor.getTextureIndexFromCurrentNodeId(/* () */0), AssetImageBase64MapEditorService$WonderEditor.getImageBase64Map(StateEditorService$WonderEditor.getState(/* () */0)))), imgBase64));
                                                            }));
                                              }));
                                        return Wonder_jest.testPromise("test show texture image, get it base64 from imageBase64Map", (function () {
                                                      MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                      return MainEditorAssetTool$WonderEditor.fileLoad(TestTool$WonderEditor.getDispatch(/* () */0), BaseEventTool$WonderEditor.buildFileEvent(undefined, "newImgBase64", undefined, undefined, /* () */0)).then((function () {
                                                                    return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0)));
                                                                  }));
                                                    }));
                                      }));
                                describe("test textureNodeMap", (function () {
                                        return Wonder_jest.testPromise("add created texture index to textureNodeMap", (function () {
                                                      var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                      return MainEditorAssetTool$WonderEditor.fileLoad(TestTool$WonderEditor.getDispatch(/* () */0), BaseEventTool$WonderEditor.buildFileEvent(undefined, undefined, undefined, undefined, /* () */0)).then((function () {
                                                                    MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getUploadedeTextureNodeDomIndex */1](assetTreeDomRecord));
                                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorAssetNodeTool$WonderEditor.getTextureIndexFromCurrentNodeId(/* () */0)), MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getUploadedTextureIndex */0](assetTreeDomRecord)));
                                                                  }));
                                                    }));
                                      }));
                                describe("test jsonNodeMap", (function () {
                                        return Wonder_jest.testPromise("add json string to jsonNodeMap", (function () {
                                                      var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                      var jsonName = "newLoadJson.json";
                                                      return MainEditorAssetTool$WonderEditor.fileLoad(TestTool$WonderEditor.getDispatch(/* () */0), BaseEventTool$WonderEditor.buildFileEvent(undefined, undefined, jsonName, "I'm the result", /* () */0)).then((function () {
                                                                    MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getUploadedeJsonNodeDomIndex */2](assetTreeDomRecord));
                                                                    var match = SparseMapService$WonderCommonlib.unsafeGet(MainEditorAssetNodeTool$WonderEditor.getCurrentNodeId(/* () */0), AssetJsonNodeMapEditorService$WonderEditor.getJsonNodeMap(StateEditorService$WonderEditor.getState(/* () */0)));
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
                describe("deal with specific case", (function () {
                        return Wonder_jest.test("if upload error file type, should throw error", (function () {
                                      return Wonder_jest.Expect[/* toThrowMessageRe */21]((/getUploadFileType/img), Wonder_jest.Expect[/* expect */0]((function () {
                                                        return AssetTreeNodeUtils$WonderEditor.getUploadFileType("json/png");
                                                      })));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
