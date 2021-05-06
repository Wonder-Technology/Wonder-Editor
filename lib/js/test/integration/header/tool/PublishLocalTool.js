'use strict';

var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var BuildFetchTool$WonderEditor = require("../../../tool/BuildFetchTool.js");
var HeaderPublishLocalUtils$WonderEditor = require("../../../../src/core/composable_component/header/utils/publish/local/HeaderPublishLocalUtils.js");

function getFetchPackageContentWithoutAssetCountWithDefault(param) {
  return 13;
}

function exportScene(editorState, engineState) {
  return HeaderPublishLocalUtils$WonderEditor.Publish[/* _generateSceneWDB */3](editorState, engineState);
}

function buildFakeFetch(sandbox, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, $staropt$star$8, $staropt$star$9, $staropt$star$10, $staropt$star$11, $staropt$star$12, param) {
  var html = $staropt$star !== undefined ? $staropt$star : "html";
  var js = $staropt$star$1 !== undefined ? $staropt$star$1 : "js";
  var resLogo = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : new ArrayBuffer(20);
  var resIco = $staropt$star$3 !== undefined ? Caml_option.valFromOption($staropt$star$3) : new ArrayBuffer(30);
  var dataSetting = $staropt$star$4 !== undefined ? $staropt$star$4 : "dataSetting";
  var dataInitJobs = $staropt$star$5 !== undefined ? $staropt$star$5 : "dataInitJobs";
  var dataLoopJobs = $staropt$star$6 !== undefined ? $staropt$star$6 : "dataLoopJobs";
  var dataInitPipelines = $staropt$star$7 !== undefined ? $staropt$star$7 : "dataInitPipelines";
  var dataLoopPipelines = $staropt$star$8 !== undefined ? $staropt$star$8 : "dataLoopPipelines";
  var dataNoWorkerSetting = $staropt$star$9 !== undefined ? $staropt$star$9 : "dataNoWorkerSetting";
  var dataShaderLibs = $staropt$star$10 !== undefined ? $staropt$star$10 : "dataShaderLibs";
  var dataShaders = $staropt$star$11 !== undefined ? $staropt$star$11 : "dataShaders";
  var jsFolderJs = $staropt$star$12 !== undefined ? $staropt$star$12 : "jsFolderJs";
  var fetch = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox, jsFolderJs), Sinon.onCall(12, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox, dataShaders), Sinon.onCall(11, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox, dataShaderLibs), Sinon.onCall(10, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox, dataNoWorkerSetting), Sinon.onCall(9, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox, dataLoopPipelines), Sinon.onCall(8, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox, dataInitPipelines), Sinon.onCall(7, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox, dataLoopJobs), Sinon.onCall(6, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox, dataInitJobs), Sinon.onCall(5, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox, dataSetting), Sinon.onCall(4, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchArrayBufferResponse(sandbox, resIco), Sinon.onCall(3, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchArrayBufferResponse(sandbox, resLogo), Sinon.onCall(2, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox, js), Sinon.onCall(1, Sinon.returns(BuildFetchTool$WonderEditor.buildFakeFetchTextResponse(sandbox, html), Sinon.onCall(0, fetch))))))))))))))))))))))))));
  return fetch;
}

exports.getFetchPackageContentWithoutAssetCountWithDefault = getFetchPackageContentWithoutAssetCountWithDefault;
exports.exportScene = exportScene;
exports.buildFakeFetch = buildFakeFetch;
/* Sinon Not a pure module */
