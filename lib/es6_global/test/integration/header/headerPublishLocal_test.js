

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Js_list from "../../../../../node_modules/bs-platform/lib/es6/js_list.js";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Js_primitive from "../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as LoadTool$WonderEditor from "../asset/tool/LoadTool.js";
import * as HeaderTool$WonderEditor from "../../unit/composable_component/header/tool/HeaderTool.js";
import * as OptionService$WonderEditor from "../../../src/service/primitive/OptionService.js";
import * as BuildFetchTool$WonderEditor from "../../tool/BuildFetchTool.js";
import * as PublishLocalTool$WonderEditor from "./tool/PublishLocalTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as HeaderPublishLocalUtils$WonderEditor from "../../../src/core/composable_component/header/utils/publish/local/HeaderPublishLocalUtils.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../asset/tool/MainEditorAssetTreeTool.js";

describe("header publish local", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                Curry._1(LoadTool$WonderEditor.buildFakeTextEncoder, /* () */0);
                LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                return LoadTool$WonderEditor.buildFakeLoadImage();
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("download zip", (function () {
                var _prepare = function (judgeFunc, buildFakeFetch, $staropt$star, _) {
                  var useWorker = $staropt$star !== undefined ? $staropt$star : false;
                  Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */4][/* ThreeLayer */0][/* buildFolderAndTextureAndMaterialAssetTree */0], /* () */0);
                  var fakeFetchFunc = Curry._1(buildFakeFetch, /* () */0);
                  var obj = HeaderTool$WonderEditor.buildPublishFakeJsZipCreateFunc(sandbox[0]);
                  return HeaderPublishLocalUtils$WonderEditor.Publish[/* publishZip */1](/* tuple */[
                                "WonderLocal",
                                useWorker
                              ], (function () {
                                  return obj;
                                }), fakeFetchFunc).then((function () {
                                var file = obj.file;
                                var fetchCount = PublishLocalTool$WonderEditor.getFetchPackageContentWithoutAssetCountWithDefault(/* () */0);
                                return Promise.resolve(Curry._2(judgeFunc, fetchCount, file));
                              }));
                };
                describe("test default", (function () {
                        var _buildFakeFetch = function (sandbox, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, $staropt$star$8, $staropt$star$9, $staropt$star$10, $staropt$star$11, _) {
                          var html = $staropt$star !== undefined ? $staropt$star : "html";
                          var js = $staropt$star$1 !== undefined ? $staropt$star$1 : "js";
                          var resLogo = $staropt$star$2 !== undefined ? Js_primitive.valFromOption($staropt$star$2) : new ArrayBuffer(20);
                          var resIco = $staropt$star$3 !== undefined ? Js_primitive.valFromOption($staropt$star$3) : new ArrayBuffer(30);
                          var dataSetting = $staropt$star$4 !== undefined ? $staropt$star$4 : "dataSetting";
                          var dataInitJobs = $staropt$star$5 !== undefined ? $staropt$star$5 : "dataInitJobs";
                          var dataLoopJobs = $staropt$star$6 !== undefined ? $staropt$star$6 : "dataLoopJobs";
                          var dataInitPipelines = $staropt$star$7 !== undefined ? $staropt$star$7 : "dataInitPipelines";
                          var dataLoopPipelines = $staropt$star$8 !== undefined ? $staropt$star$8 : "dataLoopPipelines";
                          var dataNoWorkerSetting = $staropt$star$9 !== undefined ? $staropt$star$9 : "dataNoWorkerSetting";
                          var dataShaderLibs = $staropt$star$10 !== undefined ? $staropt$star$10 : "dataShaderLibs";
                          var dataShaders = $staropt$star$11 !== undefined ? $staropt$star$11 : "dataShaders";
                          var fetch = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                          Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox, dataShaders), Sinon.onCall(11, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox, dataShaderLibs), Sinon.onCall(10, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox, dataNoWorkerSetting), Sinon.onCall(9, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox, dataLoopPipelines), Sinon.onCall(8, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox, dataInitPipelines), Sinon.onCall(7, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox, dataLoopJobs), Sinon.onCall(6, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox, dataInitJobs), Sinon.onCall(5, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox, dataSetting), Sinon.onCall(4, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchArrayBufferResponse(sandbox, resIco), Sinon.onCall(3, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchArrayBufferResponse(sandbox, resLogo), Sinon.onCall(2, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox, js), Sinon.onCall(1, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox, html), Sinon.onCall(0, fetch))))))))))))))))))))))));
                          return fetch;
                        };
                        var _testText = function (callCount, targetText) {
                          return _prepare((function (_, file) {
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(Js_list.hd(Sinon.getArgs(Sinon.getCall(callCount, file))))), targetText);
                                      }), (function (eta) {
                                        var param = undefined;
                                        var param$1 = undefined;
                                        var param$2 = undefined;
                                        var param$3 = undefined;
                                        var param$4 = undefined;
                                        var param$5 = undefined;
                                        var param$6 = undefined;
                                        var param$7 = undefined;
                                        var param$8 = undefined;
                                        var param$9 = undefined;
                                        var param$10 = undefined;
                                        var param$11 = undefined;
                                        var param$12 = eta;
                                        return _buildFakeFetch(sandbox, param, param$1, param$2, param$3, param$4, param$5, param$6, param$7, param$8, param$9, param$10, param$11, param$12);
                                      }), false, /* () */0);
                        };
                        Wonder_jest.testPromise("export index.html", (function () {
                                return _testText(0, "index.html");
                              }));
                        Wonder_jest.testPromise("export wd.min.js", (function () {
                                return _testText(1, "wd.min.js");
                              }));
                        describe("export res data", (function () {
                                Wonder_jest.testPromise("export logo", (function () {
                                        return _testText(2, "res/loading/logo.png");
                                      }));
                                return Wonder_jest.testPromise("export ico", (function () {
                                              return _testText(3, "res/loading/favicon.ico");
                                            }));
                              }));
                        describe("export config data", (function () {
                                Wonder_jest.testPromise("export setting", (function () {
                                        return _testText(4, "config/setting.json");
                                      }));
                                Wonder_jest.testPromise("export init jobs", (function () {
                                        return _testText(5, "config/no_worker/job/init_jobs.json");
                                      }));
                                Wonder_jest.testPromise("export loop jobs", (function () {
                                        return _testText(6, "config/no_worker/job/loop_jobs.json");
                                      }));
                                Wonder_jest.testPromise("export init pipelines", (function () {
                                        return _testText(7, "config/no_worker/pipeline/init_pipelines.json");
                                      }));
                                Wonder_jest.testPromise("export loop pipelines", (function () {
                                        return _testText(8, "config/no_worker/pipeline/loop_pipelines.json");
                                      }));
                                Wonder_jest.testPromise("export no worker setting", (function () {
                                        return _testText(9, "config/no_worker/setting/setting.json");
                                      }));
                                Wonder_jest.testPromise("export shader libs", (function () {
                                        return _testText(10, "config/render/shader/shader_libs.json");
                                      }));
                                return Wonder_jest.testPromise("export shaders", (function () {
                                              return _testText(11, "config/render/shader/shaders.json");
                                            }));
                              }));
                        return Wonder_jest.testPromise("export Scene.wdb", (function () {
                                      return _prepare((function (fetchCount, file) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(Js_list.hd(Sinon.getArgs(Sinon.getCall(fetchCount, file))))), "Scene.wdb");
                                                  }), (function (eta) {
                                                    var param = undefined;
                                                    var param$1 = undefined;
                                                    var param$2 = undefined;
                                                    var param$3 = undefined;
                                                    var param$4 = undefined;
                                                    var param$5 = undefined;
                                                    var param$6 = undefined;
                                                    var param$7 = undefined;
                                                    var param$8 = undefined;
                                                    var param$9 = undefined;
                                                    var param$10 = undefined;
                                                    var param$11 = undefined;
                                                    var param$12 = eta;
                                                    return _buildFakeFetch(sandbox, param, param$1, param$2, param$3, param$4, param$5, param$6, param$7, param$8, param$9, param$10, param$11, param$12);
                                                  }), false, /* () */0);
                                    }));
                      }));
                describe("test useWorker", (function () {
                        var _testText = function (callCount, targetText) {
                          return _prepare((function (_, file) {
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(Js_list.hd(Sinon.getArgs(Sinon.getCall(callCount, file))))), targetText);
                                      }), (function (eta) {
                                        var param = undefined;
                                        var param$1 = undefined;
                                        var param$2 = undefined;
                                        var param$3 = undefined;
                                        var param$4 = undefined;
                                        var param$5 = undefined;
                                        var param$6 = undefined;
                                        var param$7 = undefined;
                                        var param$8 = undefined;
                                        var param$9 = undefined;
                                        var param$10 = undefined;
                                        var param$11 = undefined;
                                        var param$12 = undefined;
                                        var param$13 = undefined;
                                        var param$14 = undefined;
                                        var param$15 = undefined;
                                        var param$16 = undefined;
                                        var param$17 = undefined;
                                        var param$18 = undefined;
                                        var param$19 = undefined;
                                        var param$20 = eta;
                                        var sandbox$1 = sandbox;
                                        var $staropt$star = param;
                                        var $staropt$star$1 = param$1;
                                        var $staropt$star$2 = param$2;
                                        var $staropt$star$3 = param$3;
                                        var $staropt$star$4 = param$4;
                                        var $staropt$star$5 = param$5;
                                        var $staropt$star$6 = param$6;
                                        var $staropt$star$7 = param$7;
                                        var $staropt$star$8 = param$8;
                                        var $staropt$star$9 = param$9;
                                        var $staropt$star$10 = param$10;
                                        var $staropt$star$11 = param$11;
                                        var $staropt$star$12 = param$12;
                                        var $staropt$star$13 = param$13;
                                        var $staropt$star$14 = param$14;
                                        var $staropt$star$15 = param$15;
                                        var $staropt$star$16 = param$16;
                                        var $staropt$star$17 = param$17;
                                        var $staropt$star$18 = param$18;
                                        var $staropt$star$19 = param$19;
                                        var html = $staropt$star !== undefined ? $staropt$star : "html";
                                        var mainWorkerJs = $staropt$star$1 !== undefined ? $staropt$star$1 : "main worker js";
                                        var renderWorkerJs = $staropt$star$2 !== undefined ? $staropt$star$2 : "render worker js";
                                        var resLogo = $staropt$star$3 !== undefined ? Js_primitive.valFromOption($staropt$star$3) : new ArrayBuffer(20);
                                        var resIco = $staropt$star$4 !== undefined ? Js_primitive.valFromOption($staropt$star$4) : new ArrayBuffer(30);
                                        var dataSetting = $staropt$star$5 !== undefined ? $staropt$star$5 : "dataSetting";
                                        var dataInitJobs = $staropt$star$6 !== undefined ? $staropt$star$6 : "dataInitJobs";
                                        var dataLoopJobs = $staropt$star$7 !== undefined ? $staropt$star$7 : "dataLoopJobs";
                                        var dataInitPipelines = $staropt$star$8 !== undefined ? $staropt$star$8 : "dataInitPipelines";
                                        var dataLoopPipelines = $staropt$star$9 !== undefined ? $staropt$star$9 : "dataLoopPipelines";
                                        var dataNoWorkerSetting = $staropt$star$10 !== undefined ? $staropt$star$10 : "dataNoWorkerSetting";
                                        var dataShaderLibs = $staropt$star$11 !== undefined ? $staropt$star$11 : "dataShaderLibs";
                                        var dataShaders = $staropt$star$12 !== undefined ? $staropt$star$12 : "dataShaders";
                                        var dataWorkerMainInitJobs = $staropt$star$13 !== undefined ? $staropt$star$13 : "dataWorkerMainInitJobs";
                                        var dataWorkerMainLoopJobs = $staropt$star$14 !== undefined ? $staropt$star$14 : "dataWorkerMainLoopJobs";
                                        var dataWorkerWorkerJobs = $staropt$star$15 !== undefined ? $staropt$star$15 : "dataWorkerWorkerJobs";
                                        var dataWorkerMainInitPipelines = $staropt$star$16 !== undefined ? $staropt$star$16 : "dataWorkerMainInitPipelines";
                                        var dataWorkerMainLoopPipelines = $staropt$star$17 !== undefined ? $staropt$star$17 : "dataWorkerMainLoopPipelines";
                                        var dataWorkerWorkerPipelines = $staropt$star$18 !== undefined ? $staropt$star$18 : "dataWorkerWorkerPipelines";
                                        var dataWorkerSetting = $staropt$star$19 !== undefined ? $staropt$star$19 : "dataWorkerSetting";
                                        var fetch = Sinon.createEmptyStubWithJsObjSandbox(sandbox$1);
                                        Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataWorkerSetting), Sinon.onCall(19, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataWorkerWorkerPipelines), Sinon.onCall(18, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataWorkerMainLoopPipelines), Sinon.onCall(17, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataWorkerMainInitPipelines), Sinon.onCall(16, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataWorkerWorkerJobs), Sinon.onCall(15, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataWorkerMainLoopJobs), Sinon.onCall(14, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataWorkerMainInitJobs), Sinon.onCall(13, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataShaders), Sinon.onCall(12, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataShaderLibs), Sinon.onCall(11, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataNoWorkerSetting), Sinon.onCall(10, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataLoopPipelines), Sinon.onCall(9, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataInitPipelines), Sinon.onCall(8, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataLoopJobs), Sinon.onCall(7, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataInitJobs), Sinon.onCall(6, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataSetting), Sinon.onCall(5, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchArrayBufferResponse(sandbox$1, resIco), Sinon.onCall(4, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchArrayBufferResponse(sandbox$1, resLogo), Sinon.onCall(3, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, renderWorkerJs), Sinon.onCall(2, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, mainWorkerJs), Sinon.onCall(1, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, html), Sinon.onCall(0, fetch))))))))))))))))))))))))))))))))))))))));
                                        return fetch;
                                      }), true, /* () */0);
                        };
                        Wonder_jest.testPromise("export wd.render.worker.js", (function () {
                                return _testText(2, "wd.render.worker.js");
                              }));
                        Wonder_jest.testPromise("export setting", (function () {
                                return _testText(5, "config/setting.json");
                              }));
                        return Wonder_jest.testPromise("export worker setting", (function () {
                                      return _testText(19, "config/worker/setting/setting.json");
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
