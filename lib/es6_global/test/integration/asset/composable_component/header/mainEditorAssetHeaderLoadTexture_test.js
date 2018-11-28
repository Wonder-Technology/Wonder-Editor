

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as LoadTool$WonderEditor from "../../tool/LoadTool.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorAssetTool$WonderEditor from "../../tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../tool/MainEditorAssetTreeTool.js";
import * as MainEditorAssetUploadTool$WonderEditor from "../../tool/MainEditorAssetUploadTool.js";
import * as TreeRootAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/TreeRootAssetEditorService.js";
import * as MainEditorAssetTextureNodeTool$WonderEditor from "../../tool/MainEditorAssetTextureNodeTool.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../src/service/state/engine/BasicSourceTextureEngineService.js";

describe("MainEditorAssetHeader->load texture", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                              return /* () */0;
                            }));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test load texture", (function () {
                beforeEach((function () {
                        Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                        Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                        LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                        LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                        return LoadTool$WonderEditor.buildFakeLoadImage();
                      }));
                return Wonder_jest.testPromise("set source name", (function () {
                              MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */0](/* () */0);
                              var imgName = "1.png";
                              return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, imgName, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                            var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                            var textureComponent = MainEditorAssetTextureNodeTool$WonderEditor.getTextureComponent(uploadedTextureNodeId, editorState);
                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                            var source = BasicSourceTextureEngineService$WonderEditor.unsafeGetSource(textureComponent, engineState);
                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](source.name), imgName));
                                          }));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
