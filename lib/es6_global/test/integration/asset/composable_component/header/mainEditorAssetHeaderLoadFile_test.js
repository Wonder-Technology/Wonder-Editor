

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as WDBTool$WonderEditor from "../../../../tool/WDBTool.js";
import * as LoadTool$WonderEditor from "../../tool/LoadTool.js";
import * as ConsoleTool$WonderEditor from "../../../../unit/tool/external/ConsoleTool.js";
import * as OptionService$WonderEditor from "../../../../../src/service/primitive/OptionService.js";
import * as ReactTestTool$WonderEditor from "../../../../tool/ReactTestTool.js";
import * as LoadAssetUtils$WonderEditor from "../../../../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/utils/LoadAssetUtils.js";
import * as EventListenerTool$WonderEditor from "../../../../unit/tool/EventListenerTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorAssetTool$WonderEditor from "../../tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as SceneTreeNodeDomTool$WonderEditor from "../../../../tool/domIndex/SceneTreeNodeDomTool.js";
import * as MainEditorAssetNodeTool$WonderEditor from "../../tool/MainEditorAssetNodeTool.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../tool/MainEditorAssetTreeTool.js";
import * as MainEditorAssetUploadTool$WonderEditor from "../../tool/MainEditorAssetUploadTool.js";
import * as TreeRootAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/TreeRootAssetEditorService.js";
import * as WDBNodeMapAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/WDBNodeMapAssetEditorService.js";
import * as ImageNodeMapAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/ImageNodeMapAssetEditorService.js";
import * as MainEditorAssetChildrenNodeTool$WonderEditor from "../../tool/MainEditorAssetChildrenNodeTool.js";
import * as TextureNodeMapAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/TextureNodeMapAssetEditorService.js";
import * as CurrentNodeDataAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/CurrentNodeDataAssetEditorService.js";
import * as CurrentNodeParentIdAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/CurrentNodeParentIdAssetEditorService.js";

describe("MainEditorAssetHeader->load file", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var boxTexturedWDBArrayBuffer = /* record */[/* contents */1];
        beforeAll((function () {
                boxTexturedWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("BoxTextured");
                return /* () */0;
              }));
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                        return /* () */0;
                      }));
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                Curry._1(Sinon.restoreSandbox, sandbox[0]);
                StateEditorService$WonderEditor.setState(CurrentNodeParentIdAssetEditorService$WonderEditor.clearCurrentNodeParentId(CurrentNodeDataAssetEditorService$WonderEditor.clearCurrentNodeData(StateEditorService$WonderEditor.getState(/* () */0))));
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
                                              MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */0](/* () */0);
                                              return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function () {
                                                            return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0)));
                                                          }));
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test logic", (function () {
                        describe("test should add into root node children", (function () {
                                return Wonder_jest.testPromise("test children node length", (function () {
                                              MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */0](/* () */0);
                                              var originChildrenLen = TreeRootAssetEditorService$WonderEditor.unsafeGetAssetTreeRoot(StateEditorService$WonderEditor.getState(/* () */0))[/* children */1].length;
                                              return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function () {
                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TreeRootAssetEditorService$WonderEditor.unsafeGetAssetTreeRoot(StateEditorService$WonderEditor.getState(/* () */0))[/* children */1].length - originChildrenLen | 0), 1));
                                                          }));
                                            }));
                              }));
                        describe("test should add into nodeMap", (function () {
                                describe("test imageNodeMap", (function () {
                                        Wonder_jest.testPromise("add image base64 to imageNodeMap", (function () {
                                                MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */0](/* () */0);
                                                var imgBase64 = "newImgBase64";
                                                return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, imgBase64, /* () */0).then((function (uploadedTextureNodeId) {
                                                              MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(uploadedTextureNodeId, undefined, undefined, /* () */0);
                                                              var match = SparseMapService$WonderCommonlib.unsafeGet(MainEditorAssetNodeTool$WonderEditor.getCurrentNodeId(/* () */0), TextureNodeMapAssetEditorService$WonderEditor.getTextureNodeMap(StateEditorService$WonderEditor.getState(/* () */0)));
                                                              var param = SparseMapService$WonderCommonlib.unsafeGet(match[/* image */1], ImageNodeMapAssetEditorService$WonderEditor.getImageNodeMap(StateEditorService$WonderEditor.getState(/* () */0)));
                                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(param[/* base64 */0])), imgBase64));
                                                            }));
                                              }));
                                        return Wonder_jest.testPromise("test show texture image, get it base64 from imageNodeMap", (function () {
                                                      MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */0](/* () */0);
                                                      return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, "newImgBase64", /* () */0).then((function () {
                                                                    return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0)));
                                                                  }));
                                                    }));
                                      }));
                                describe("test textureNodeMap", (function () {
                                        return Wonder_jest.testPromise("add created texture index to textureNodeMap", (function () {
                                                      MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */0](/* () */0);
                                                      return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                                    MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(uploadedTextureNodeId, undefined, undefined, /* () */0);
                                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorAssetNodeTool$WonderEditor.getTextureComponentFromCurrentNodeId(/* () */0)), 0));
                                                                  }));
                                                    }));
                                      }));
                                describe("test wdbNodeMap", (function () {
                                        beforeEach((function () {
                                                LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                                                LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                                                return LoadTool$WonderEditor.buildFakeLoadImage();
                                              }));
                                        return Wonder_jest.testPromise("add name, wdbGameObject, wdbArrayBuffer to wdbNodeMap", (function () {
                                                      MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */0](/* () */0);
                                                      var fileName = "BoxTextured";
                                                      var defaultSceneNewGameObjectUid = SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getNewGameObjectUid */5](/* () */0);
                                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, fileName, /* () */0).then((function (uploadedWDBNodeId) {
                                                                    var match = SparseMapService$WonderCommonlib.unsafeGet(uploadedWDBNodeId, WDBNodeMapAssetEditorService$WonderEditor.getWDBNodeMap(StateEditorService$WonderEditor.getState(/* () */0)));
                                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                        match[/* name */0],
                                                                                        match[/* wdbGameObject */3],
                                                                                        match[/* wdbArrayBuffer */2]
                                                                                      ]), /* tuple */[
                                                                                    fileName,
                                                                                    defaultSceneNewGameObjectUid,
                                                                                    boxTexturedWDBArrayBuffer[0]
                                                                                  ]));
                                                                  }));
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("deal with specific case", (function () {
                        return Wonder_jest.test("if upload error file type, should error", (function () {
                                      ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                      BuildComponentTool$WonderEditor.buildConsole(undefined, undefined, /* () */0);
                                      var errorStub = Curry._3(Sinon.createMethodStub, sandbox[0], console, "error");
                                      LoadAssetUtils$WonderEditor._handleAssetSpecificFuncByTypeSync(LoadAssetUtils$WonderEditor.getUploadAssetType("aaa.bb"), /* tuple */[
                                            (function () {
                                                return /* () */0;
                                              }),
                                            (function () {
                                                return /* () */0;
                                              }),
                                            (function () {
                                                return /* () */0;
                                              }),
                                            (function () {
                                                return /* () */0;
                                              })
                                          ]);
                                      return ConsoleTool$WonderEditor.judgeError("type is error", errorStub);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
