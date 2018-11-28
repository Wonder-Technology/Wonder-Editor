

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../../tool/TestTool.js";
import * as ArrayService$WonderEditor from "../../../../../../../src/service/atom/ArrayService.js";
import * as BaseEventTool$WonderEditor from "../../../../../../tool/ui/BaseEventTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../../tool/ReactTestTool.js";
import * as SceneTreeTool$WonderEditor from "../../../../../../tool/SceneTreeTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../tool/GameObjectTool.js";
import * as NodeToolEngine$WonderEditor from "../../../../../../tool/engine/NodeToolEngine.js";
import * as OldNewSelfTool$WonderEditor from "../../../../../tool/OldNewSelfTool.js";
import * as EventListenerTool$WonderEditor from "../../../../../tool/EventListenerTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../tool/BuildComponentTool.js";
import * as SceneTreeEventTool$WonderEditor from "../../../../../../tool/SceneTreeEventTool.js";
import * as MainEditorAssetTool$WonderEditor from "../../../../../../integration/asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../tool/MainEditorSceneTool.js";
import * as MainEditorSceneTree$WonderEditor from "../../../../../../../src/core/composable_component/mainEditor/composable_component/sceneTree/ui/MainEditorSceneTree.js";
import * as SceneTreeNodeDomTool$WonderEditor from "../../../../../../tool/domIndex/SceneTreeNodeDomTool.js";
import * as MainEditorMaterialTool$WonderEditor from "../../../../../../integration/inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorMaterialTool.js";
import * as MainEditorAssetNodeTool$WonderEditor from "../../../../../../integration/asset/tool/MainEditorAssetNodeTool.js";
import * as MainEditorAssetHeaderWDBTool$WonderEditor from "../../../../../../integration/asset/tool/MainEditorAssetHeaderWDBTool.js";

describe("MainEditorSceneTree", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("get sceneTree from engine", (function () {
                describe("test should update", (function () {
                        Wonder_jest.test("if reatinedProps updateTypeArr include All, should update", (function () {
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorSceneTree$WonderEditor.shouldUpdate(OldNewSelfTool$WonderEditor.buildNewSelf(/* record */[/* updateTypeArr : array */[/* All */1]]))), true);
                              }));
                        Wonder_jest.test("else if reatinedProps updateTypeArr include SceneTree, should update", (function () {
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorSceneTree$WonderEditor.shouldUpdate(OldNewSelfTool$WonderEditor.buildNewSelf(/* record */[/* updateTypeArr : array */[/* SceneTree */4]]))), true);
                              }));
                        return Wonder_jest.test("else, should not update", (function () {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorSceneTree$WonderEditor.shouldUpdate(OldNewSelfTool$WonderEditor.buildNewSelf(/* record */[/* updateTypeArr : array */[
                                                                /* BottomComponent */3,
                                                                /* Inspector */2
                                                              ]]))), false);
                                    }));
                      }));
                describe("test simple scene graph data which haven't children case", (function () {
                        beforeEach((function () {
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                              }));
                        afterEach((function () {
                                return GameObjectTool$WonderEditor.clearCurrentSceneTreeNode(/* () */0);
                              }));
                        Wonder_jest.test("no drag", (function () {
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)));
                              }));
                        return Wonder_jest.test("drag treeNode into target treeNode", (function () {
                                      var component = BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
                                      var firstCubeDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getFirstCubeDomIndex */1](/* () */0);
                                      var secondCubeDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getSecondCubeDomIndex */2](/* () */0);
                                      BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                              return SceneTreeEventTool$WonderEditor.triggerDragStart(secondCubeDomIndex, param);
                                            }));
                                      BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                              return SceneTreeEventTool$WonderEditor.triggerDragEnter(firstCubeDomIndex, param);
                                            }));
                                      BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                              return SceneTreeEventTool$WonderEditor.triggerDragLeave(firstCubeDomIndex, param);
                                            }));
                                      BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                              return SceneTreeEventTool$WonderEditor.triggerDragDrop(firstCubeDomIndex, param);
                                            }));
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)));
                                    }));
                      }));
                describe("set current gameObject", (function () {
                        beforeEach((function () {
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                                              return /* () */0;
                                            }));
                              }));
                        return Wonder_jest.test("click treeNode to set it to be currentSceneTreeNode", (function () {
                                      var firstCubeDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getFirstCubeDomIndex */1](/* () */0);
                                      var component = BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
                                      BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                              return SceneTreeEventTool$WonderEditor.triggerClickEvent(firstCubeDomIndex, param);
                                            }));
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0)), ArrayService$WonderEditor.unsafeGetNth(firstCubeDomIndex, GameObjectTool$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0))));
                                    }));
                      }));
                describe("test drag asset wdb file into sceneTree", (function () {
                        beforeEach((function () {
                                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                                MainEditorAssetHeaderWDBTool$WonderEditor.buildFakeTextDecoder(MainEditorAssetHeaderWDBTool$WonderEditor.convertUint8ArrayToBuffer);
                                MainEditorAssetHeaderWDBTool$WonderEditor.buildFakeURL(sandbox[0]);
                                MainEditorAssetHeaderWDBTool$WonderEditor.buildFakeLoadImage();
                                return SceneTreeTool$WonderEditor.buildThreeLayerSceneGraphToEngine(sandbox);
                              }));
                        return Wonder_jest.testPromise("test drag asset wdb into scene should clone itself add into engineState scene", (function () {
                                      var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                      var fileName = "BoxTextured";
                                      var newWDBArrayBuffer = NodeToolEngine$WonderEditor.getWDBArrayBuffer(fileName);
                                      return MainEditorAssetTool$WonderEditor.fileLoad(TestTool$WonderEditor.getDispatch(/* () */0), BaseEventTool$WonderEditor.buildWDBFileEvent(fileName, newWDBArrayBuffer)).then((function () {
                                                    var component = BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
                                                    var rootDivDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateThreeLayer[/* getRootDivDomIndex */0](/* () */0);
                                                    MainEditorMaterialTool$WonderEditor.triggerFileDragStartEvent(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getAddedFirstNodeDomIndex */3](assetTreeDomRecord));
                                                    BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                                            return SceneTreeEventTool$WonderEditor.triggerDragEnterDiv(rootDivDomIndex, param);
                                                          }));
                                                    BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                                            return SceneTreeEventTool$WonderEditor.triggerDragDropDiv(rootDivDomIndex, param);
                                                          }));
                                                    return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0))));
                                                  }));
                                    }));
                      }));
                describe("test has children case", (function () {
                        describe("have first layer children", (function () {
                                beforeEach((function () {
                                        return SceneTreeTool$WonderEditor.buildThreeLayerSceneGraphToEngine(sandbox);
                                      }));
                                Wonder_jest.test("no drag", (function () {
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)));
                                      }));
                                Wonder_jest.test("drag treeNode into first layer treeNode parent", (function () {
                                        var component = BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
                                        var firstLayerFirstCubeDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateThreeLayer[/* getFirstLayerFirstCubeDomIndex */1](/* () */0);
                                        var firstLayerThirdCubeDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateThreeLayer[/* getFirstLayerThirdCubeDomIndex */3](/* () */0);
                                        BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                                return SceneTreeEventTool$WonderEditor.triggerDragStart(firstLayerThirdCubeDomIndex, param);
                                              }));
                                        BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                                return SceneTreeEventTool$WonderEditor.triggerDragEnter(firstLayerFirstCubeDomIndex, param);
                                              }));
                                        BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                                return SceneTreeEventTool$WonderEditor.triggerDragDrop(firstLayerFirstCubeDomIndex, param);
                                              }));
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)));
                                      }));
                                Wonder_jest.test("drag treeNode into first layer treeNode children", (function () {
                                        var component = BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
                                        var firstLayerFirstCubeDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateThreeLayer[/* getFirstLayerFirstCubeDomIndex */1](/* () */0);
                                        var firstLayerThirdCubeDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateThreeLayer[/* getFirstLayerThirdCubeDomIndex */3](/* () */0);
                                        var secondLayerFirstCubeDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateThreeLayer[/* getSecondLayerFirstCubeDomIndex */4](/* () */0);
                                        BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                                return SceneTreeEventTool$WonderEditor.triggerDragStart(firstLayerThirdCubeDomIndex, param);
                                              }));
                                        BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                                return SceneTreeEventTool$WonderEditor.triggerDragEnterChildren(firstLayerFirstCubeDomIndex, secondLayerFirstCubeDomIndex, param);
                                              }));
                                        BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                                return SceneTreeEventTool$WonderEditor.triggerDragDropChildren(firstLayerFirstCubeDomIndex, secondLayerFirstCubeDomIndex, param);
                                              }));
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)));
                                      }));
                                return Wonder_jest.test("drag first layer child treeNode into root div", (function () {
                                              var component = BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
                                              var firstLayerFirstCubeDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateThreeLayer[/* getFirstLayerFirstCubeDomIndex */1](/* () */0);
                                              var rootDivDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateThreeLayer[/* getRootDivDomIndex */0](/* () */0);
                                              var secondLayerFirstCubeDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateThreeLayer[/* getSecondLayerFirstCubeDomIndex */4](/* () */0);
                                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                                      var parentIndex = firstLayerFirstCubeDomIndex;
                                                      var childrenIndex = secondLayerFirstCubeDomIndex;
                                                      var domChildren = param;
                                                      var dragTreeArticle = ArrayService$WonderEditor.unsafeGetNth(0, domChildren);
                                                      var array = dragTreeArticle.children;
                                                      var treeNodeUl = ArrayService$WonderEditor.unsafeGetNth(parentIndex, array);
                                                      var array$1 = treeNodeUl.children;
                                                      var treeNodeChildrenUl = ArrayService$WonderEditor.unsafeGetNth(childrenIndex, array$1);
                                                      return BaseEventTool$WonderEditor.triggerDragStartEvent(treeNodeChildrenUl, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
                                                    }));
                                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                                      return SceneTreeEventTool$WonderEditor.triggerDragEnterDiv(rootDivDomIndex, param);
                                                    }));
                                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                                      return SceneTreeEventTool$WonderEditor.triggerDragLeaveDiv(rootDivDomIndex, param);
                                                    }));
                                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                                      return SceneTreeEventTool$WonderEditor.triggerDragDropDiv(rootDivDomIndex, param);
                                                    }));
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)));
                                            }));
                              }));
                        describe("have second layer children", (function () {
                                return Wonder_jest.test("drag has second treeNode into no child treeNode", (function () {
                                              SceneTreeTool$WonderEditor.buildFourLayerSceneGraphToEngine(sandbox);
                                              var component = BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
                                              var firstLayerFirstCubeDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateFourLayer[/* getFirstLayerFirstCubeDomIndex */0](/* () */0);
                                              var firstLayerSecondCubeDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateFourLayer[/* getFirstLayerSecondCubeDomIndex */1](/* () */0);
                                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                                      return SceneTreeEventTool$WonderEditor.triggerDragStart(firstLayerFirstCubeDomIndex, param);
                                                    }));
                                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                                      return SceneTreeEventTool$WonderEditor.triggerDragEnter(firstLayerSecondCubeDomIndex, param);
                                                    }));
                                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                                      return SceneTreeEventTool$WonderEditor.triggerDragDrop(firstLayerSecondCubeDomIndex, param);
                                                    }));
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)));
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("deal with the specific case", (function () {
                        Wonder_jest.test("if drag treeNode into itself, keep not change", (function () {
                                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                                var component = BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
                                var firstCameraDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getFirstCameraDomIndex */0](/* () */0);
                                BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                        return SceneTreeEventTool$WonderEditor.triggerDragStart(firstCameraDomIndex, param);
                                      }));
                                BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                        return SceneTreeEventTool$WonderEditor.triggerDragEnter(firstCameraDomIndex, param);
                                      }));
                                BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                        return SceneTreeEventTool$WonderEditor.triggerDragDrop(firstCameraDomIndex, param);
                                      }));
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)));
                              }));
                        Wonder_jest.test("if drag treeNode into it's first layer chidlren, keep not change", (function () {
                                SceneTreeTool$WonderEditor.buildThreeLayerSceneGraphToEngine(sandbox);
                                var component = BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
                                var firstLayerFirstCubeDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateThreeLayer[/* getFirstLayerFirstCubeDomIndex */1](/* () */0);
                                var secondLayerFirstCubeDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateThreeLayer[/* getSecondLayerFirstCubeDomIndex */4](/* () */0);
                                BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                        return SceneTreeEventTool$WonderEditor.triggerDragStart(firstLayerFirstCubeDomIndex, param);
                                      }));
                                BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                        return SceneTreeEventTool$WonderEditor.triggerDragEnterChildren(firstLayerFirstCubeDomIndex, secondLayerFirstCubeDomIndex, param);
                                      }));
                                BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                        return SceneTreeEventTool$WonderEditor.triggerDragDropChildren(firstLayerFirstCubeDomIndex, secondLayerFirstCubeDomIndex, param);
                                      }));
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)));
                              }));
                        describe("if drag treeNode into it's second layer chidlren", (function () {
                                return Wonder_jest.test("if drag treeNode into it's second layer chidlren, keep not change", (function () {
                                              SceneTreeTool$WonderEditor.buildFourLayerSceneGraphToEngine(sandbox);
                                              var component = BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
                                              var firstLayerFirstCubeDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateFourLayer[/* getFirstLayerFirstCubeDomIndex */0](/* () */0);
                                              var secondLayerFirstCubeDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateFourLayer[/* getSecondLayerFirstCubeDomIndex */2](/* () */0);
                                              var thirdLayerFirstCubeDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateFourLayer[/* getThirdLayerFirstCubeDomIndex */3](/* () */0);
                                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                                      return SceneTreeEventTool$WonderEditor.triggerDragStart(firstLayerFirstCubeDomIndex, param);
                                                    }));
                                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                                      var parentIndex = firstLayerFirstCubeDomIndex;
                                                      var firstIndex = secondLayerFirstCubeDomIndex;
                                                      var secondIndex = thirdLayerFirstCubeDomIndex;
                                                      var domChildren = param;
                                                      var dragTreeArticle = ArrayService$WonderEditor.unsafeGetNth(0, domChildren);
                                                      var array = dragTreeArticle.children;
                                                      var treeNodeUl = ArrayService$WonderEditor.unsafeGetNth(parentIndex, array);
                                                      var array$1 = treeNodeUl.children;
                                                      var treeNodeFirstChildrenUl = ArrayService$WonderEditor.unsafeGetNth(firstIndex, array$1);
                                                      var array$2 = treeNodeFirstChildrenUl.children;
                                                      var treeNodeSecondChildrenUl = ArrayService$WonderEditor.unsafeGetNth(secondIndex, array$2);
                                                      var array$3 = treeNodeSecondChildrenUl.children;
                                                      var treeNodeLi = ArrayService$WonderEditor.unsafeGetNth(0, array$3);
                                                      var array$4 = treeNodeLi.children;
                                                      var div = ArrayService$WonderEditor.unsafeGetNth(0, array$4);
                                                      return BaseEventTool$WonderEditor.triggerDragEnterEvent(div, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
                                                    }));
                                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                                      var parentIndex = firstLayerFirstCubeDomIndex;
                                                      var firstIndex = secondLayerFirstCubeDomIndex;
                                                      var secondIndex = thirdLayerFirstCubeDomIndex;
                                                      var domChildren = param;
                                                      var dragTreeArticle = ArrayService$WonderEditor.unsafeGetNth(0, domChildren);
                                                      var array = dragTreeArticle.children;
                                                      var treeNodeUl = ArrayService$WonderEditor.unsafeGetNth(parentIndex, array);
                                                      var array$1 = treeNodeUl.children;
                                                      var treeNodeFirstChildrenUl = ArrayService$WonderEditor.unsafeGetNth(firstIndex, array$1);
                                                      var array$2 = treeNodeFirstChildrenUl.children;
                                                      var treeNodeSecondChildrenUl = ArrayService$WonderEditor.unsafeGetNth(secondIndex, array$2);
                                                      var array$3 = treeNodeSecondChildrenUl.children;
                                                      var treeNodeLi = ArrayService$WonderEditor.unsafeGetNth(0, array$3);
                                                      var array$4 = treeNodeLi.children;
                                                      var div = ArrayService$WonderEditor.unsafeGetNth(0, array$4);
                                                      return BaseEventTool$WonderEditor.triggerDropEvent(div, BaseEventTool$WonderEditor.buildDragEvent(/* () */0));
                                                    }));
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)));
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
