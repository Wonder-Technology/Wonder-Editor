

import * as Most from "most";
import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_primitive from "../../../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Zip$WonderBsJszip from "../../../../../../../../../node_modules/wonder-bs-jszip/lib/es6_global/src/zip.js";
import * as FileSaver from "file-saver/FileSaver";
import * as Options$WonderBsJszip from "../../../../../../../../../node_modules/wonder-bs-jszip/lib/es6_global/src/options.js";
import * as ArrayService$WonderEditor from "../../../../../../service/atom/ArrayService.js";
import * as ConsoleUtils$WonderEditor from "../../../../../utils/ui/ConsoleUtils.js";
import * as TypeArrayType$WonderEditor from "../../../../../external/type/TypeArrayType.js";
import * as StateEditorService$WonderEditor from "../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../service/state/engine/StateEngineService.js";
import * as HeaderExportSceneWDBUtils$WonderEditor from "../../export/HeaderExportSceneWDBUtils.js";
import * as GenerateSceneGraphEngineService$WonderEditor from "../../../../../../service/state/engine/GenerateSceneGraphEngineService.js";

function loadAndWriteIndexJsData(useWorker, fetchFunc, zip) {
  return Curry._1(fetchFunc, "./publish/wd.min.js").then((function (response) {
                return response.text().then((function (jsStr) {
                              Zip$WonderBsJszip.write(zip, undefined, "wd.min.js", /* `str */[
                                    5744817,
                                    jsStr
                                  ]);
                              if (useWorker) {
                                return Curry._1(fetchFunc, "./publish/wd.render.worker.js").then((function (response) {
                                              return response.text().then((function (jsStr) {
                                                            Zip$WonderBsJszip.write(zip, undefined, "wd.render.worker.js", /* `str */[
                                                                  5744817,
                                                                  jsStr
                                                                ]);
                                                            return Promise.resolve(zip);
                                                          }));
                                            }));
                              } else {
                                return Promise.resolve(zip);
                              }
                            }));
              }));
}

function _replaceIndexHtml(indexHtmlStr, sceneGraphArrayBuffer) {
  return indexHtmlStr.replace((/\$totalWDBByteLength/img), sceneGraphArrayBuffer.byteLength.toString());
}

function loadAndWriteIndexHtmlData(useWorker, sceneGraphArrayBuffer, fetchFunc, zip) {
  return Curry._1(fetchFunc, useWorker ? "./publish/index_worker.html" : "./publish/index.html").then((function (response) {
                return response.text().then((function (htmlStr) {
                              return Promise.resolve(Zip$WonderBsJszip.write(zip, undefined, "index.html", /* `str */[
                                              5744817,
                                              _replaceIndexHtml(htmlStr, sceneGraphArrayBuffer)
                                            ]));
                            }));
              }));
}

function _loadAndWriteSingleResArrayBufferData(name, fetchFunc, zip, $staropt$star, _) {
  var dirname = $staropt$star !== undefined ? $staropt$star : "./publish/res/loading";
  return Most.fromPromise(Curry._1(fetchFunc, "" + (String(dirname) + ("/" + (String(name) + "")))).then((function (response) {
                    return response.arrayBuffer().then((function (arrayBuffer) {
                                  return Promise.resolve(Zip$WonderBsJszip.write(zip, Js_primitive.some(Options$WonderBsJszip.makeWriteOptions(undefined, true, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0)), "res/loading/" + (String(name) + ""), /* `trustme */[
                                                  380026608,
                                                  TypeArrayType$WonderEditor.newBlobFromArrayBuffer(arrayBuffer)
                                                ]));
                                }));
                  })));
}

function loadAndWriteResData(fetchFunc, zip) {
  return Most.drain(Most.mergeArray(/* array */[
                    _loadAndWriteSingleResArrayBufferData("logo.png", fetchFunc, zip, "./public/logo", /* () */0),
                    _loadAndWriteSingleResArrayBufferData("favicon.ico", fetchFunc, zip, "./public/logo", /* () */0)
                  ])).then((function () {
                return Promise.resolve(zip);
              }));
}

function _loadAndWriteSingleConfigDataWithTargetFileNamePath(fileNamePath, targetFileNamePath, fetchFunc, zip) {
  return Most.fromPromise(Curry._1(fetchFunc, "./publish/config/" + (String(fileNamePath) + "")).then((function (response) {
                    return response.text().then((function (str) {
                                  return Promise.resolve(Zip$WonderBsJszip.write(zip, undefined, "config/" + (String(targetFileNamePath) + ""), /* `str */[
                                                  5744817,
                                                  str
                                                ]));
                                }));
                  })));
}

function _loadAndWriteSingleConfigData(fileNamePath, fetchFunc, zip) {
  return _loadAndWriteSingleConfigDataWithTargetFileNamePath(fileNamePath, fileNamePath, fetchFunc, zip);
}

function loadAndWriteConfigData(useWorker, fetchFunc, zip) {
  var streamArr = /* array */[
    _loadAndWriteSingleConfigDataWithTargetFileNamePath(useWorker ? "setting_worker.json" : "setting.json", "setting.json", fetchFunc, zip),
    _loadAndWriteSingleConfigData("no_worker/job/init_jobs.json", fetchFunc, zip),
    _loadAndWriteSingleConfigData("no_worker/job/loop_jobs.json", fetchFunc, zip),
    _loadAndWriteSingleConfigData("no_worker/pipeline/init_pipelines.json", fetchFunc, zip),
    _loadAndWriteSingleConfigData("no_worker/pipeline/loop_pipelines.json", fetchFunc, zip),
    _loadAndWriteSingleConfigData("no_worker/setting/setting.json", fetchFunc, zip),
    _loadAndWriteSingleConfigData("render/shader/shader_libs.json", fetchFunc, zip),
    _loadAndWriteSingleConfigData("render/shader/shaders.json", fetchFunc, zip)
  ];
  var streamArr$1 = useWorker ? ArrayService$WonderEditor.fastConcat(streamArr, /* array */[
          _loadAndWriteSingleConfigData("worker/job/main/main_init_jobs.json", fetchFunc, zip),
          _loadAndWriteSingleConfigData("worker/job/main/main_loop_jobs.json", fetchFunc, zip),
          _loadAndWriteSingleConfigData("worker/job/worker/worker_jobs.json", fetchFunc, zip),
          _loadAndWriteSingleConfigData("worker/pipeline/main/main_init_pipelines.json", fetchFunc, zip),
          _loadAndWriteSingleConfigData("worker/pipeline/main/main_loop_pipelines.json", fetchFunc, zip),
          _loadAndWriteSingleConfigData("worker/pipeline/worker/worker_pipelines.json", fetchFunc, zip),
          _loadAndWriteSingleConfigData("worker/setting/setting.json", fetchFunc, zip)
        ]) : streamArr;
  return Most.drain(Most.mergeArray(streamArr$1)).then((function () {
                return Promise.resolve(zip);
              }));
}

var LoadData = /* module */[
  /* loadAndWriteIndexJsData */loadAndWriteIndexJsData,
  /* _replaceIndexHtml */_replaceIndexHtml,
  /* loadAndWriteIndexHtmlData */loadAndWriteIndexHtmlData,
  /* _loadAndWriteSingleResArrayBufferData */_loadAndWriteSingleResArrayBufferData,
  /* loadAndWriteResData */loadAndWriteResData,
  /* _loadAndWriteSingleConfigDataWithTargetFileNamePath */_loadAndWriteSingleConfigDataWithTargetFileNamePath,
  /* _loadAndWriteSingleConfigData */_loadAndWriteSingleConfigData,
  /* loadAndWriteConfigData */loadAndWriteConfigData
];

function _loadData(useWorker, sceneGraphArrayBuffer, fetchFunc, createZipStream) {
  return Most.flatMap((function (zip) {
                return Most.fromPromise(loadAndWriteConfigData(useWorker, fetchFunc, zip));
              }), Most.flatMap((function (zip) {
                    return Most.fromPromise(loadAndWriteResData(fetchFunc, zip));
                  }), Most.flatMap((function (zip) {
                        return Most.fromPromise(loadAndWriteIndexJsData(useWorker, fetchFunc, zip));
                      }), Most.flatMap((function (zip) {
                            return Most.fromPromise(loadAndWriteIndexHtmlData(useWorker, sceneGraphArrayBuffer, fetchFunc, zip));
                          }), createZipStream))));
}

function publishZip(param, createZipFunc, fetchFunc) {
  var zipName = param[0];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = StateEditorService$WonderEditor.getIsRun(/* () */0);
  if (match) {
    ConsoleUtils$WonderEditor.warn("should publish local when stop, but now is run!", editorState);
    return new Promise((function (resolve, _) {
                  return resolve(undefined);
                }));
  } else {
    var match$1 = HeaderExportSceneWDBUtils$WonderEditor.generateSceneWDB(GenerateSceneGraphEngineService$WonderEditor.generateWDB, /* tuple */[
          editorState,
          engineState
        ]);
    var sceneGraphArrayBuffer = match$1[1];
    StateEngineService$WonderEditor.setState(match$1[0]);
    return Most.drain(Most.tap((function (zip) {
                        Zip$WonderBsJszip.generateAsyncBlob(Zip$WonderBsJszip.write(zip, Js_primitive.some(Options$WonderBsJszip.makeWriteOptions(undefined, true, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0)), "Scene.wdb", /* `trustme */[
                                    380026608,
                                    TypeArrayType$WonderEditor.newBlobFromArrayBuffer(sceneGraphArrayBuffer)
                                  ]), undefined, Zip$WonderBsJszip.makeAsyncBlobOptions(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0)).then((function (content) {
                                return Promise.resolve((FileSaver.saveAs(content, zipName + ".zip"), /* () */0));
                              }));
                        return /* () */0;
                      }), _loadData(param[1], sceneGraphArrayBuffer, fetchFunc, Most.just(Curry._1(createZipFunc, /* () */0))))).then((function () {
                  return Promise.resolve(undefined);
                }));
  }
}

var Publish = /* module */[
  /* _loadData */_loadData,
  /* publishZip */publishZip
];

export {
  LoadData ,
  Publish ,
  
}
/* most Not a pure module */
