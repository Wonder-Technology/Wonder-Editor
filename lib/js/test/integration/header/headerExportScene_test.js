'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var LoadTool$WonderEditor = require("../asset/tool/LoadTool.js");
var MainUtils$WonderEditor = require("../../../src/core/utils/engine/MainUtils.js");
var CanvasTool$WonderEditor = require("../../unit/atom_component/canvas/tool/CanvasTool.js");
var ConsoleTool$WonderEditor = require("../../unit/tool/external/ConsoleTool.js");
var ControllerTool$WonderEditor = require("../../unit/composable_component/controller/tool/ControllerTool.js");
var ExportSceneTool$WonderEditor = require("./tool/ExportSceneTool.js");
var StateLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/StateLogicService.js");
var StateEditorService$WonderEditor = require("../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorAssetTool$WonderEditor = require("../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var HeaderExportSceneUtils$WonderEditor = require("../../../src/core/composable_component/header/utils/export/HeaderExportSceneUtils.js");
var GameObjectEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/GameObjectEngineService.js");
var MainEditorAssetUploadTool$WonderEditor = require("../asset/tool/MainEditorAssetUploadTool.js");
var MainEditorAssetWDBNodeTool$WonderEditor = require("../asset/tool/MainEditorAssetWDBNodeTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");

Wonder_jest.describe("header export scene", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n              {\n                \"name\": \"default\",\n                \"jobs\": [\n                    {\"name\": \"init_inspector_engine\" }\n                ]\n              }\n            ]\n             ", undefined, "\n             [\n                {\"name\": \"init_inspector_engine\" }\n             ]\n             ", undefined, /* () */0), undefined, false, /* () */0);
                StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
                CanvasTool$WonderEditor.prepareInspectorCanvasAndImgCanvas(sandbox);
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("if is run", (function (param) {
                return Wonder_jest.test("warn", (function (param) {
                              ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                              var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                              ControllerTool$WonderEditor.run(/* () */0);
                              HeaderExportSceneUtils$WonderEditor.exportScene("aaa");
                              return Sinon.toCalledWith(/* array */["should operate when stop, but now is run!"], Wonder_jest.Expect[/* expect */0](warn));
                            }));
              }));
        return Wonder_jest.describe("else", (function (param) {
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
                      return Wonder_jest.describe("test isRoot", (function (param) {
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
                    }));
      }));

/*  Not a pure module */
