

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Js_option from "../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as LoadTool$WonderEditor from "../asset/tool/LoadTool.js";
import * as ConsoleTool$WonderEditor from "../../unit/tool/external/ConsoleTool.js";
import * as ControllerTool$WonderEditor from "../../unit/composable_component/controller/tool/ControllerTool.js";
import * as ExportPackageTool$WonderEditor from "./tool/ExportPackageTool.js";
import * as StateEditorService$WonderEditor from "../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorAssetTool$WonderEditor from "../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as HeaderExportPackageUtils$WonderEditor from "../../../src/core/composable_component/header/utils/export/HeaderExportPackageUtils.js";
import * as MainEditorAssetUploadTool$WonderEditor from "../asset/tool/MainEditorAssetUploadTool.js";
import * as ImageNodeMapAssetEditorService$WonderEditor from "../../../src/service/state/editor/asset/ImageNodeMapAssetEditorService.js";
import * as TextureNodeMapAssetEditorService$WonderEditor from "../../../src/service/state/editor/asset/TextureNodeMapAssetEditorService.js";

describe("header export package", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("if is run", (function (param) {
                return Wonder_jest.test("warn", (function (param) {
                              ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                              var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                              ControllerTool$WonderEditor.run(/* () */0);
                              HeaderExportPackageUtils$WonderEditor.exportPackage("aaa");
                              return Sinon.toCalledWith(/* array */["should export package when stop, but now is run!"], Wonder_jest.Expect[/* expect */0](warn));
                            }));
              }));
        describe("optimize", (function (param) {
                beforeEach((function (param) {
                        Curry._1(LoadTool$WonderEditor.buildFakeAtob, /* () */0);
                        Curry._1(LoadTool$WonderEditor.buildFakeBtoa, /* () */0);
                        Curry._1(LoadTool$WonderEditor.buildFakeTextEncoder, /* () */0);
                        LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                        LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                        Curry._1(LoadTool$WonderEditor.buildFakeLoadImage, /* () */0);
                        Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                        return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                      }));
                return Wonder_jest.testPromise("set builded image uint8Array to editorState", (function (param) {
                              return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                            ExportPackageTool$WonderEditor.exportWPK(/* () */0);
                                            var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TextureNodeMapAssetEditorService$WonderEditor.getValidValues(editorState).filter((function (param) {
                                                                      return Js_option.isSome(ImageNodeMapAssetEditorService$WonderEditor.getUint8Array(param[/* image */1], ImageNodeMapAssetEditorService$WonderEditor.getImageNodeMap(editorState)));
                                                                    })).length), 1));
                                          }));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
