

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as LoadTool$WonderEditor from "../asset/tool/LoadTool.js";
import * as ConsoleTool$WonderEditor from "../../unit/tool/external/ConsoleTool.js";
import * as ControllerTool$WonderEditor from "../../unit/composable_component/controller/tool/ControllerTool.js";
import * as ExportSceneTool$WonderEditor from "./tool/ExportSceneTool.js";
import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorAssetTool$WonderEditor from "../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as HeaderExportSceneUtils$WonderEditor from "../../../src/core/composable_component/header/utils/export/HeaderExportSceneUtils.js";
import * as GameObjectEngineService$WonderEditor from "../../../src/service/state/engine/gameObject/GameObjectEngineService.js";
import * as MainEditorAssetUploadTool$WonderEditor from "../asset/tool/MainEditorAssetUploadTool.js";
import * as MainEditorAssetWDBNodeTool$WonderEditor from "../asset/tool/MainEditorAssetWDBNodeTool.js";

describe("header export scene", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("if is run", (function () {
                return Wonder_jest.test("warn", (function (param) {
                              ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                              var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                              ControllerTool$WonderEditor.run(/* () */0);
                              HeaderExportSceneUtils$WonderEditor.exportScene("aaa");
                              return Sinon.toCalledWith(/* array */["should export scene when stop, but now is run!"], Wonder_jest.Expect[/* expect */0](warn));
                            }));
              }));
        describe("else", (function () {
                beforeEach((function () {
                        LoadTool$WonderEditor.buildFakeAtob(/* () */0);
                        LoadTool$WonderEditor.buildFakeBtoa(/* () */0);
                        LoadTool$WonderEditor.buildFakeTextEncoder(/* () */0);
                        LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                        LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                        LoadTool$WonderEditor.buildFakeLoadImage(/* () */0);
                        Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                        return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                      }));
                describe("test isRoot", (function () {
                        return Wonder_jest.testPromise("set scene gameObject->isRoot to true", undefined, (function (param) {
                                      var match = ExportSceneTool$WonderEditor.exportScene(StateEditorService$WonderEditor.getState(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                      StateEngineService$WonderEditor.setState(match[0]);
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(match[1], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                    var partial_arg = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                            return MainEditorAssetWDBNodeTool$WonderEditor.getWDBGameObject(uploadedWDBNodeId, param);
                                                          }));
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                              return GameObjectEngineService$WonderEditor.getGameObjectIsRoot(partial_arg, param);
                                                                            }))), true));
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
