

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as WDBTool$WonderEditor from "../../../../../tool/WDBTool.js";
import * as LoadTool$WonderEditor from "../../../../asset/tool/LoadTool.js";
import * as MainEditorAssetTool$WonderEditor from "../../../../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../tool/MainEditorSceneTool.js";
import * as AssetTreeInspectorTool$WonderEditor from "../tool/AssetTreeInspectorTool.js";
import * as MainEditorAssetUploadTool$WonderEditor from "../../../../asset/tool/MainEditorAssetUploadTool.js";
import * as MainEditorAssetWDBNodeTool$WonderEditor from "../../../../asset/tool/MainEditorAssetWDBNodeTool.js";

describe("wdb inspector", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var boxTexturedWDBArrayBuffer = /* record */[/* contents */1];
        beforeAll((function () {
                boxTexturedWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("BoxTextured");
                return /* () */0;
              }));
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                return LoadTool$WonderEditor.buildFakeLoadImage();
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test rename", (function () {
                return Wonder_jest.testPromise("if rename to the existed name in the same dir, should fail", (function () {
                              var fileName1 = "BoxTextured1";
                              var fileName2 = "BoxTextured2";
                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, fileName1, /* () */0).then((function (uploadedWDBNodeId1) {
                                            return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, fileName2, /* () */0).then((function (uploadedWDBNodeId2) {
                                                          AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetWDBNode */3](undefined, undefined, uploadedWDBNodeId2, fileName1, /* () */0);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              MainEditorAssetWDBNodeTool$WonderEditor.getWDBName(uploadedWDBNodeId1, undefined, /* () */0),
                                                                              MainEditorAssetWDBNodeTool$WonderEditor.getWDBName(uploadedWDBNodeId2, undefined, /* () */0)
                                                                            ]), /* tuple */[
                                                                          fileName1,
                                                                          fileName2
                                                                        ]));
                                                        }));
                                          }));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
