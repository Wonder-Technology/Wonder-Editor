

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as CamlinternalOO from "../../../../../../../node_modules/bs-platform/lib/es6/camlinternalOO.js";
import * as Timeout$WonderEditor from "../../../../../src/core/external/Timeout.js";
import * as WDBTool$WonderEditor from "../../../../tool/WDBTool.js";
import * as LoadTool$WonderEditor from "../../tool/LoadTool.js";
import * as FolderBoxTool$WonderEditor from "../../../../unit/atom_component/folderBox/tool/FolderBoxTool.js";
import * as ReactTestTool$WonderEditor from "../../../../tool/ReactTestTool.js";
import * as NodeAssetService$WonderEditor from "../../../../../src/service/record/editor/asset/NodeAssetService.js";
import * as EventListenerTool$WonderEditor from "../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorAssetTool$WonderEditor from "../../tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as MainEditorAssetIdTool$WonderEditor from "../../tool/MainEditorAssetIdTool.js";
import * as AssetTreeInspectorTool$WonderEditor from "../../../inspector/composable_component/assetTree_inspector/tool/AssetTreeInspectorTool.js";
import * as FolderNodeAssetService$WonderEditor from "../../../../../src/service/record/editor/asset/FolderNodeAssetService.js";
import * as MainEditorAssetNodeTool$WonderEditor from "../../tool/MainEditorAssetNodeTool.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../tool/MainEditorAssetTreeTool.js";
import * as MainEditorAssetUploadTool$WonderEditor from "../../tool/MainEditorAssetUploadTool.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as CurrentNodeIdAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/CurrentNodeIdAssetEditorService.js";
import * as MainEditorAssetChildrenNodeTool$WonderEditor from "../../tool/MainEditorAssetChildrenNodeTool.js";
import * as MainEditorAssetHeaderOperateNodeTool$WonderEditor from "../../tool/MainEditorAssetHeaderOperateNodeTool.js";
import * as SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/SelectedFolderNodeIdInAssetTreeAssetEditorService.js";

var class_tables = [
  0,
  0,
  0
];

var class_tables$1 = [
  0,
  0,
  0
];

var class_tables$2 = [
  0,
  0,
  0
];

var class_tables$3 = [
  0,
  0,
  0
];

var class_tables$4 = [
  0,
  0,
  0
];

var class_tables$5 = [
  0,
  0,
  0
];

var class_tables$6 = [
  0,
  0,
  0
];

describe("MainEditorAssetChildrenNode", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                Curry._1(Sinon.restoreSandbox, sandbox[0]);
                StateEditorService$WonderEditor.setState(SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor.clearSelectedFolderNodeIdInAssetTree(CurrentNodeIdAssetEditorService$WonderEditor.clearCurrentNodeId(StateEditorService$WonderEditor.getState(/* () */0))));
                return /* () */0;
              }));
        describe("test set current node", (function () {
                Wonder_jest.test("click texture file to be current node", (function () {
                        var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                        MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData), undefined, undefined, /* () */0);
                        var currentNodeId = MainEditorAssetNodeTool$WonderEditor.unsafeGetCurrentNodeId(StateEditorService$WonderEditor.getState(/* () */0));
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](currentNodeId), Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData));
                      }));
                describe("test click folder", (function () {
                        describe("test single click", (function () {
                                Wonder_jest.testPromise("test set folder to be current node", (function () {
                                        var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                        var fakeDom = Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                                        BuildComponentTool$WonderEditor.buildAssetChildrenNode(10, /* () */0);
                                        if (!class_tables$6[0]) {
                                          var $$class = CamlinternalOO.create_table(0);
                                          var env_init = function () {
                                            return CamlinternalOO.create_object_opt(0, $$class);
                                          };
                                          CamlinternalOO.init_class($$class);
                                          class_tables$6[0] = env_init;
                                        }
                                        Curry._3(EventListenerTool$WonderEditor.triggerEvent, fakeDom, "mousedown", Curry._1(class_tables$6[0], 0));
                                        return new Promise((function (resolve, _) {
                                                      return Curry._2(Timeout$WonderEditor.$$setTimeout, (function () {
                                                                    if (!class_tables$5[0]) {
                                                                      var $$class = CamlinternalOO.create_table(0);
                                                                      var env_init = function () {
                                                                        return CamlinternalOO.create_object_opt(0, $$class);
                                                                      };
                                                                      CamlinternalOO.init_class($$class);
                                                                      class_tables$5[0] = env_init;
                                                                    }
                                                                    Curry._3(EventListenerTool$WonderEditor.triggerEvent, fakeDom, "mousedown", Curry._1(class_tables$5[0], 0));
                                                                    var currentNodeId = MainEditorAssetNodeTool$WonderEditor.unsafeGetCurrentNodeId(StateEditorService$WonderEditor.getState(/* () */0));
                                                                    return resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](currentNodeId), Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData)));
                                                                  }), 20);
                                                    }));
                                      }));
                                return Wonder_jest.testPromise("test snapshot", (function () {
                                              Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                              var fakeDom = Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                                              BuildComponentTool$WonderEditor.buildAssetChildrenNode(10, /* () */0);
                                              if (!class_tables$4[0]) {
                                                var $$class = CamlinternalOO.create_table(0);
                                                var env_init = function () {
                                                  return CamlinternalOO.create_object_opt(0, $$class);
                                                };
                                                CamlinternalOO.init_class($$class);
                                                class_tables$4[0] = env_init;
                                              }
                                              Curry._3(EventListenerTool$WonderEditor.triggerEvent, fakeDom, "mousedown", Curry._1(class_tables$4[0], 0));
                                              return new Promise((function (resolve, _) {
                                                            return Curry._2(Timeout$WonderEditor.$$setTimeout, (function () {
                                                                          if (!class_tables$3[0]) {
                                                                            var $$class = CamlinternalOO.create_table(0);
                                                                            var env_init = function () {
                                                                              return CamlinternalOO.create_object_opt(0, $$class);
                                                                            };
                                                                            CamlinternalOO.init_class($$class);
                                                                            class_tables$3[0] = env_init;
                                                                          }
                                                                          Curry._3(EventListenerTool$WonderEditor.triggerEvent, fakeDom, "mousedown", Curry._1(class_tables$3[0], 0));
                                                                          return resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0)));
                                                                        }), 20);
                                                          }));
                                            }));
                              }));
                        return Wonder_jest.testPromise("double click folder, set folder to be currentAssetNodeParent and currentNode(are the same)", (function () {
                                      Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                      var fakeDom = Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                                      BuildComponentTool$WonderEditor.buildAssetChildrenNode(10, /* () */0);
                                      if (!class_tables$2[0]) {
                                        var $$class = CamlinternalOO.create_table(0);
                                        var env_init = function () {
                                          return CamlinternalOO.create_object_opt(0, $$class);
                                        };
                                        CamlinternalOO.init_class($$class);
                                        class_tables$2[0] = env_init;
                                      }
                                      Curry._3(EventListenerTool$WonderEditor.triggerEvent, fakeDom, "mousedown", Curry._1(class_tables$2[0], 0));
                                      return new Promise((function (resolve, _) {
                                                    return Curry._2(Timeout$WonderEditor.$$setTimeout, (function () {
                                                                  if (!class_tables$1[0]) {
                                                                    var $$class = CamlinternalOO.create_table(0);
                                                                    var env_init = function () {
                                                                      return CamlinternalOO.create_object_opt(0, $$class);
                                                                    };
                                                                    CamlinternalOO.init_class($$class);
                                                                    class_tables$1[0] = env_init;
                                                                  }
                                                                  Curry._3(EventListenerTool$WonderEditor.triggerEvent, fakeDom, "mousedown", Curry._1(class_tables$1[0], 0));
                                                                  return Curry._2(Timeout$WonderEditor.$$setTimeout, (function () {
                                                                                if (!class_tables[0]) {
                                                                                  var $$class = CamlinternalOO.create_table(0);
                                                                                  var env_init = function () {
                                                                                    return CamlinternalOO.create_object_opt(0, $$class);
                                                                                  };
                                                                                  CamlinternalOO.init_class($$class);
                                                                                  class_tables[0] = env_init;
                                                                                }
                                                                                Curry._3(EventListenerTool$WonderEditor.triggerEvent, fakeDom, "mousedown", Curry._1(class_tables[0], 0));
                                                                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                return resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](NodeAssetService$WonderEditor.isNodeEqualById(MainEditorAssetNodeTool$WonderEditor.unsafeGetCurrentNode(editorState), MainEditorAssetNodeTool$WonderEditor.unsafeGetSelectedFolderNodeInAssetTree(editorState))), true));
                                                                              }), 20);
                                                                }), 5);
                                                  }));
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test asse tree node->isShowChildren", (function () {
                describe("test double click folder", (function () {
                        return Wonder_jest.test("folder->parent folder->isShowChildren should set to true", (function () {
                                      MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                      var addedFolderNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                      MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId1, undefined, /* () */0);
                                      var addedFolderNodeId2 = addedFolderNodeId1 + 1 | 0;
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                      MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId2, undefined, /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                      StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                              return OperateTreeAssetEditorService$WonderEditor.setNodeIsShowChildren(addedFolderNodeId1, false, param);
                                            }));
                                      FolderBoxTool$WonderEditor.onDoubleClick(addedFolderNodeId2, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](FolderNodeAssetService$WonderEditor.getIsShowChildren(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(addedFolderNodeId1, StateEditorService$WonderEditor.getState(/* () */0)))), true);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test show order", (function () {
                var cubeTexturedWDBArrayBuffer = /* record */[/* contents */1];
                beforeAll((function () {
                        cubeTexturedWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("CubeTextured");
                        return /* () */0;
                      }));
                beforeEach((function () {
                        Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                        LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                        LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                        LoadTool$WonderEditor.buildFakeLoadImage();
                        return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                      }));
                return Wonder_jest.testPromise("\n        order should be:\n        1)for different type_:folder,wdb,material,texture;\n        2)for the same type_:sort by firstname alphabetically\n        ", (function () {
                              var addedFolderNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                              var addedMaterialNodeId1 = addedFolderNodeId1 + 1 | 0;
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                              var addedFolderNodeId2 = addedMaterialNodeId1 + 1 | 0;
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                              var addedMaterialNodeId2 = addedFolderNodeId2 + 1 | 0;
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, "C_WDB", /* () */0).then((function () {
                                            return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, "BImage.png", undefined, /* () */0).then((function () {
                                                          return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, "A_WDB", /* () */0).then((function () {
                                                                        return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, "AImage.jpg", undefined, /* () */0).then((function () {
                                                                                      AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetFolderNode */3](undefined, undefined, addedFolderNodeId1, "FFolder", /* () */0);
                                                                                      AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetFolderNode */3](undefined, undefined, addedFolderNodeId2, "AFolder", /* () */0);
                                                                                      AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */2](undefined, undefined, addedMaterialNodeId1, "CMaterial", /* () */0);
                                                                                      AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */2](undefined, undefined, addedMaterialNodeId2, "AMaterial", /* () */0);
                                                                                      return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
