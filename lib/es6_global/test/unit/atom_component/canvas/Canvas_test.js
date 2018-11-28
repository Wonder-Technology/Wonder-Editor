

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as WDBTool$WonderEditor from "../../../tool/WDBTool.js";
import * as LoadTool$WonderEditor from "../../../integration/asset/tool/LoadTool.js";
import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as CanvasTool$WonderEditor from "./tool/CanvasTool.js";
import * as ReactTestTool$WonderEditor from "../../../tool/ReactTestTool.js";
import * as GameObjectTool$WonderEditor from "../../../tool/GameObjectTool.js";
import * as EventListenerTool$WonderEditor from "../../tool/EventListenerTool.js";
import * as BuildComponentTool$WonderEditor from "../../../tool/BuildComponentTool.js";
import * as MainEditorAssetTool$WonderEditor from "../../../integration/asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../../integration/asset/tool/MainEditorAssetTreeTool.js";
import * as MainEditorAssetUploadTool$WonderEditor from "../../../integration/asset/tool/MainEditorAssetUploadTool.js";

describe("Canvas", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test drag wdb", (function () {
                var boxTexturedWDBArrayBuffer = /* record */[/* contents */1];
                beforeAll((function () {
                        boxTexturedWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("BoxTextured");
                        return /* () */0;
                      }));
                beforeEach((function () {
                        Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                        Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                        LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                        LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                        LoadTool$WonderEditor.buildFakeLoadImage();
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                                return /* () */0;
                              }));
                        MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */0](/* () */0);
                        return /* () */0;
                      }));
                describe("test drag wdb to scene", (function () {
                        return Wonder_jest.testPromise("if current sceneTree node is None, add to scene", (function () {
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                    GameObjectTool$WonderEditor.clearCurrentSceneTreeNode(/* () */0);
                                                    CanvasTool$WonderEditor.Drag[/* dragWDBAsset */0](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                    return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0))));
                                                  }));
                                    }));
                      }));
                describe("test drag wdb to gameObject", (function () {
                        return Wonder_jest.testPromise("should add to current sceneTree node's children", (function () {
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                    MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode(/* () */0);
                                                    CanvasTool$WonderEditor.Drag[/* dragWDBAsset */0](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                    return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0))));
                                                  }));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
