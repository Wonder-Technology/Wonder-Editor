'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var WDBTool$WonderEditor = require("../../../tool/WDBTool.js");
var ConsoleTool$WonderEditor = require("../../../unit/tool/external/ConsoleTool.js");
var JobEngineService$WonderEditor = require("../../../../src/service/state/engine/job/JobEngineService.js");
var ImportPackageTool$WonderEditor = require("./tool/ImportPackageTool.js");
var DirectorToolEngine$WonderEditor = require("../../../tool/engine/DirectorToolEngine.js");
var SceneEngineService$WonderEditor = require("../../../../src/service/state/engine/SceneEngineService.js");
var StateEditorService$WonderEditor = require("../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var PrimitiveLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/PrimitiveLogicService.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../asset/tool/MainEditorAssetUploadTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../tool/engine/NoWorkerJobConfigToolEngine.js");

Wonder_jest.describe("header import package", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var directionPointLightsAndCubeWDBArrayBuffer = /* record */[/* contents */1];
        beforeAll((function () {
                directionPointLightsAndCubeWDBArrayBuffer[0] = WDBTool$WonderEditor.generateDirectionPointLightsAndCubeWDB(/* () */0);
                return /* () */0;
              }));
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return ImportPackageTool$WonderEditor.prepareLoad(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("shouldn't warn exceed max count when c1(current scene(before import package)->total light count) + c2(scene wdb->total light count) is exceed but c2 is not exceed", (function (param) {
                      beforeEach((function () {
                              MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
                              MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                              return DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
                            }));
                      return Wonder_jest.testPromise("test", undefined, (function (param) {
                                    ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                    var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                    var match = PrimitiveLogicService$WonderEditor.createDirectionLight(editorState, engineState);
                                    var match$1 = PrimitiveLogicService$WonderEditor.createDirectionLight(match[0], match[1]);
                                    var match$2 = PrimitiveLogicService$WonderEditor.createDirectionLight(match$1[0], match$1[1]);
                                    var match$3 = PrimitiveLogicService$WonderEditor.createDirectionLight(match$2[0], match$2[1]);
                                    var engineState$1 = SceneEngineService$WonderEditor.addSceneChildren(/* array */[
                                          match[2],
                                          match$1[2],
                                          match$2[2],
                                          match$3[2]
                                        ], match$3[1]);
                                    StateEditorService$WonderEditor.setState(match$3[0]);
                                    StateEngineService$WonderEditor.setState(engineState$1);
                                    return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(directionPointLightsAndCubeWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                  return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                                return Promise.resolve(Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](warn))));
                                                              }), undefined, undefined, (function (param) {
                                                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                var engineState$1 = JobEngineService$WonderEditor.execDisposeJob(SceneEngineService$WonderEditor.disposeSceneAllChildrenKeepOrderRemoveGeometryRemoveMaterial(engineState));
                                                                var match = PrimitiveLogicService$WonderEditor.createDirectionLight(editorState, engineState$1);
                                                                var engineState$2 = SceneEngineService$WonderEditor.addSceneChild(match[2], match[1]);
                                                                StateEditorService$WonderEditor.setState(match[0]);
                                                                StateEngineService$WonderEditor.setState(engineState$2);
                                                                return /* () */0;
                                                              }), undefined, /* () */0);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
