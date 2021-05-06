'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Js_list = require("bs-platform/lib/js/js_list.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var LoadTool$WonderEditor = require("../asset/tool/LoadTool.js");
var MainUtils$WonderEditor = require("../../../src/core/utils/engine/MainUtils.js");
var CanvasTool$WonderEditor = require("../../unit/atom_component/canvas/tool/CanvasTool.js");
var HeaderTool$WonderEditor = require("../../unit/composable_component/header/tool/HeaderTool.js");
var OptionService$WonderEditor = require("../../../src/service/primitive/OptionService.js");
var BuildFetchTool$WonderEditor = require("../../tool/BuildFetchTool.js");
var PublishLocalTool$WonderEditor = require("./tool/PublishLocalTool.js");
var StateLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/StateLogicService.js");
var StateEditorService$WonderEditor = require("../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorAssetTool$WonderEditor = require("../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var GameObjectEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/GameObjectEngineService.js");
var HeaderPublishLocalUtils$WonderEditor = require("../../../src/core/composable_component/header/utils/publish/local/HeaderPublishLocalUtils.js");
var MainEditorAssetTreeTool$WonderEditor = require("../asset/tool/MainEditorAssetTreeTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../asset/tool/MainEditorAssetUploadTool.js");
var MainEditorAssetWDBNodeTool$WonderEditor = require("../asset/tool/MainEditorAssetWDBNodeTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");

Wonder_jest.describe("header publish local", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n              {\n                \"name\": \"default\",\n                \"jobs\": [\n                    {\"name\": \"init_inspector_engine\" }\n                ]\n              }\n            ]\n             ", undefined, "\n             [\n                {\"name\": \"init_inspector_engine\" }\n             ]\n             ", undefined, /* () */0), undefined, false, /* () */0);
                StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
                CanvasTool$WonderEditor.prepareInspectorCanvasAndImgCanvas(sandbox);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                LoadTool$WonderEditor.buildFakeTextEncoder(/* () */0);
                LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                return LoadTool$WonderEditor.buildFakeLoadImage();
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("download zip", (function (param) {
                var _prepare = function (judgeFunc, buildFakeFetch, $staropt$star, param) {
                  var useWorker = $staropt$star !== undefined ? $staropt$star : false;
                  Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */9][/* ThreeLayer */0][/* buildFolderAndTextureAndMaterialAssetTree */0], /* () */0);
                  var fakeFetchFunc = Curry._1(buildFakeFetch, /* () */0);
                  var obj = HeaderTool$WonderEditor.buildPublishFakeJsZipCreateFunc(sandbox[0]);
                  return HeaderPublishLocalUtils$WonderEditor.Publish[/* publishZip */4](/* tuple */[
                                "WonderLocal",
                                useWorker
                              ], /* tuple */[
                                false,
                                -1
                              ], (function (param) {
                                  return obj;
                                }), fakeFetchFunc).then((function (param) {
                                var file = obj.file;
                                var fetchCount = PublishLocalTool$WonderEditor.getFetchPackageContentWithoutAssetCountWithDefault(/* () */0);
                                return Promise.resolve(Curry._2(judgeFunc, fetchCount, file));
                              }));
                };
                Wonder_jest.describe("test default", (function (param) {
                        var _testText = function (callCount, targetText) {
                          return _prepare((function (fetchCount, file) {
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(Js_list.hd(Sinon.getArgs(Sinon.getCall(callCount, file))))), targetText);
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
                                        var param$13 = eta;
                                        return PublishLocalTool$WonderEditor.buildFakeFetch(sandbox, param, param$1, param$2, param$3, param$4, param$5, param$6, param$7, param$8, param$9, param$10, param$11, param$12, param$13);
                                      }), false, /* () */0);
                        };
                        Wonder_jest.testPromise("export index.html", undefined, (function (param) {
                                return _testText(0, "index.html");
                              }));
                        Wonder_jest.testPromise("export wd.js", undefined, (function (param) {
                                return _testText(1, "wd.js");
                              }));
                        Wonder_jest.describe("export res data", (function (param) {
                                Wonder_jest.testPromise("export logo", undefined, (function (param) {
                                        return _testText(2, "res/loading/logo.png");
                                      }));
                                return Wonder_jest.testPromise("export ico", undefined, (function (param) {
                                              return _testText(3, "res/loading/favicon.ico");
                                            }));
                              }));
                        Wonder_jest.describe("export config data", (function (param) {
                                Wonder_jest.testPromise("export setting", undefined, (function (param) {
                                        return _testText(4, "config/setting.json");
                                      }));
                                Wonder_jest.testPromise("export init jobs", undefined, (function (param) {
                                        return _testText(5, "config/no_worker/job/init_jobs.json");
                                      }));
                                Wonder_jest.testPromise("export loop jobs", undefined, (function (param) {
                                        return _testText(6, "config/no_worker/job/loop_jobs.json");
                                      }));
                                Wonder_jest.testPromise("export init pipelines", undefined, (function (param) {
                                        return _testText(7, "config/no_worker/pipeline/init_pipelines.json");
                                      }));
                                Wonder_jest.testPromise("export loop pipelines", undefined, (function (param) {
                                        return _testText(8, "config/no_worker/pipeline/loop_pipelines.json");
                                      }));
                                Wonder_jest.testPromise("export no worker setting", undefined, (function (param) {
                                        return _testText(9, "config/no_worker/setting/setting.json");
                                      }));
                                Wonder_jest.testPromise("export shader libs", undefined, (function (param) {
                                        return _testText(10, "config/render/shader/shader_libs.json");
                                      }));
                                return Wonder_jest.testPromise("export shaders", undefined, (function (param) {
                                              return _testText(11, "config/render/shader/shaders.json");
                                            }));
                              }));
                        Wonder_jest.describe("export js data", (function (param) {
                                return Wonder_jest.testPromise("export commonForNoWorkerAndWorker.js", undefined, (function (param) {
                                              return _testText(12, "js/commonForNoWorkerAndWorker.js");
                                            }));
                              }));
                        return Wonder_jest.testPromise("export Scene.wdb", undefined, (function (param) {
                                      return _prepare((function (fetchCount, file) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(Js_list.hd(Sinon.getArgs(Sinon.getCall(fetchCount, file))))), "Scene.wdb");
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
                                                    var param$13 = eta;
                                                    return PublishLocalTool$WonderEditor.buildFakeFetch(sandbox, param, param$1, param$2, param$3, param$4, param$5, param$6, param$7, param$8, param$9, param$10, param$11, param$12, param$13);
                                                  }), false, /* () */0);
                                    }));
                      }));
                return Wonder_jest.describe("test use worker", (function (param) {
                              var _testText = function (callCount, targetText) {
                                return _prepare((function (fetchCount, file) {
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(Js_list.hd(Sinon.getArgs(Sinon.getCall(callCount, file))))), targetText);
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
                                              var param$20 = undefined;
                                              var param$21 = eta;
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
                                              var $staropt$star$20 = param$20;
                                              var html = $staropt$star !== undefined ? $staropt$star : "html";
                                              var mainWorkerJs = $staropt$star$1 !== undefined ? $staropt$star$1 : "main worker js";
                                              var renderWorkerJs = $staropt$star$2 !== undefined ? $staropt$star$2 : "render worker js";
                                              var resLogo = $staropt$star$3 !== undefined ? Caml_option.valFromOption($staropt$star$3) : new ArrayBuffer(20);
                                              var resIco = $staropt$star$4 !== undefined ? Caml_option.valFromOption($staropt$star$4) : new ArrayBuffer(30);
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
                                              var jsFolderJs = $staropt$star$20 !== undefined ? $staropt$star$20 : "jsFolderJs";
                                              var fetch = Sinon.createEmptyStubWithJsObjSandbox(sandbox$1);
                                              Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, jsFolderJs), Sinon.onCall(20, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataWorkerSetting), Sinon.onCall(19, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataWorkerWorkerPipelines), Sinon.onCall(18, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataWorkerMainLoopPipelines), Sinon.onCall(17, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataWorkerMainInitPipelines), Sinon.onCall(16, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataWorkerWorkerJobs), Sinon.onCall(15, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataWorkerMainLoopJobs), Sinon.onCall(14, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataWorkerMainInitJobs), Sinon.onCall(13, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataShaders), Sinon.onCall(12, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataShaderLibs), Sinon.onCall(11, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataNoWorkerSetting), Sinon.onCall(10, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataLoopPipelines), Sinon.onCall(9, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataInitPipelines), Sinon.onCall(8, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataLoopJobs), Sinon.onCall(7, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataInitJobs), Sinon.onCall(6, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, dataSetting), Sinon.onCall(5, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchArrayBufferResponse(sandbox$1, resIco), Sinon.onCall(4, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchArrayBufferResponse(sandbox$1, resLogo), Sinon.onCall(3, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, renderWorkerJs), Sinon.onCall(2, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, mainWorkerJs), Sinon.onCall(1, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox$1, html), Sinon.onCall(0, fetch))))))))))))))))))))))))))))))))))))))))));
                                              return fetch;
                                            }), true, /* () */0);
                              };
                              Wonder_jest.testPromise("export wd.render.worker.js", undefined, (function (param) {
                                      return _testText(2, "wd.render.worker.js");
                                    }));
                              Wonder_jest.testPromise("export setting", undefined, (function (param) {
                                      return _testText(5, "config/setting.json");
                                    }));
                              return Wonder_jest.testPromise("export worker setting", undefined, (function (param) {
                                            return _testText(19, "config/worker/setting/setting.json");
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test isRoot", (function (param) {
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
                      return Wonder_jest.testPromise("set scene gameObject->isRoot to false", undefined, (function (param) {
                                    var match = PublishLocalTool$WonderEditor.exportScene(StateEditorService$WonderEditor.getState(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                    StateEngineService$WonderEditor.setState(match[0]);
                                    return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(match[1], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                  var partial_arg = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                          return MainEditorAssetWDBNodeTool$WonderEditor.getWDBGameObject(uploadedWDBNodeId, param);
                                                        }));
                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                            return GameObjectEngineService$WonderEditor.getGameObjectIsRoot(partial_arg, param);
                                                                          }))), false));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
