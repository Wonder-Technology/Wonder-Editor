

import * as Most from "most";
import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_option from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Zip$WonderBsJszip from "../../../../../../../../../node_modules/wonder-bs-jszip/lib/es6_global/src/zip.js";
import * as FileSaver from "file-saver/FileSaver";
import * as Options$WonderBsJszip from "../../../../../../../../../node_modules/wonder-bs-jszip/lib/es6_global/src/options.js";
import * as ArrayService$WonderEditor from "../../../../../../service/atom/ArrayService.js";
import * as ConsoleUtils$WonderEditor from "../../../../../utils/ui/ConsoleUtils.js";
import * as LanguageUtils$WonderEditor from "../../../../../utils/language/LanguageUtils.js";
import * as TypeArrayType$WonderEditor from "../../../../../external/type/TypeArrayType.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as StateEditorService$WonderEditor from "../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../service/state/engine/state/StateEngineService.js";
import * as LanguageEditorService$WonderEditor from "../../../../../../service/state/editor/LanguageEditorService.js";
import * as HeaderExportSceneWDBUtils$WonderEditor from "../../export/HeaderExportSceneWDBUtils.js";
import * as ValueNodeSelectTreeService$WonderEditor from "../../../../../../service/record/ui/selectTree/ValueNodeSelectTreeService.js";
import * as IterateTreeSelectTreeService$WonderEditor from "../../../../../../service/record/ui/selectTree/IterateTreeSelectTreeService.js";
import * as Uint8ArrayAssetEditorService$WonderEditor from "../../../../../../service/state/editor/asset/Uint8ArrayAssetEditorService.js";
import * as GenerateSceneGraphEngineService$WonderEditor from "../../../../../../service/state/engine/GenerateSceneGraphEngineService.js";

function loadAndWriteIndexJsData(useWorker, fetchFunc, zip) {
  return fetchFunc("./publish/wd.js").then((function (response) {
                return response.text().then((function (jsStr) {
                              Zip$WonderBsJszip.write(zip, undefined, "wd.js", /* `str */[
                                    5744817,
                                    jsStr
                                  ]);
                              if (useWorker) {
                                return fetchFunc("./publish/wd.render.worker.js").then((function (response) {
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

function loadAndWriteIndexHtmlData(useWorker, sceneGraphArrayBuffer, fetchFunc, zip) {
  return fetchFunc(useWorker ? "./publish/index_worker.html" : "./publish/index.html").then((function (response) {
                return response.text().then((function (htmlStr) {
                              return Promise.resolve(Zip$WonderBsJszip.write(zip, undefined, "index.html", /* `str */[
                                              5744817,
                                              htmlStr
                                            ]));
                            }));
              }));
}

function _loadAndWriteSingleResArrayBufferData(name, fetchFunc, zip, $staropt$star, param) {
  var dirname = $staropt$star !== undefined ? $staropt$star : "./publish/res/loading";
  return Most.fromPromise(fetchFunc("" + (String(dirname) + ("/" + (String(name) + "")))).then((function (response) {
                    return response.arrayBuffer().then((function (arrayBuffer) {
                                  return Promise.resolve(Zip$WonderBsJszip.write(zip, Caml_option.some(Options$WonderBsJszip.makeWriteOptions(undefined, true, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0)), "res/loading/" + (String(name) + ""), /* `trustme */[
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
                  ])).then((function (param) {
                return Promise.resolve(zip);
              }));
}

function _loadAndWriteSingleConfigDataWithTargetFileNamePath(fileNamePath, targetFileNamePath, fetchFunc, zip) {
  return Most.fromPromise(fetchFunc("./publish/config/" + (String(fileNamePath) + "")).then((function (response) {
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
  return Most.drain(Most.mergeArray(streamArr$1)).then((function (param) {
                return Promise.resolve(zip);
              }));
}

function loadAndWriteJsData(fetchFunc, zip) {
  return fetchFunc("./publish/js/commonForNoWorkerAndWorker.js").then((function (response) {
                return response.text().then((function (jsStr) {
                              return Promise.resolve(Zip$WonderBsJszip.write(zip, undefined, "js/commonForNoWorkerAndWorker.js", /* `str */[
                                              5744817,
                                              jsStr
                                            ]));
                            }));
              }));
}

var LoadData = /* module */[
  /* loadAndWriteIndexJsData */loadAndWriteIndexJsData,
  /* loadAndWriteIndexHtmlData */loadAndWriteIndexHtmlData,
  /* _loadAndWriteSingleResArrayBufferData */_loadAndWriteSingleResArrayBufferData,
  /* loadAndWriteResData */loadAndWriteResData,
  /* _loadAndWriteSingleConfigDataWithTargetFileNamePath */_loadAndWriteSingleConfigDataWithTargetFileNamePath,
  /* _loadAndWriteSingleConfigData */_loadAndWriteSingleConfigData,
  /* loadAndWriteConfigData */loadAndWriteConfigData,
  /* loadAndWriteJsData */loadAndWriteJsData
];

function _generateAssetBundleData(selectTree) {
  return IterateTreeSelectTreeService$WonderEditor.fold((function (acc, nodeId, nodeData, children) {
                return acc;
              }), ArrayService$WonderCommonlib.createEmpty(/* () */0), selectTree, (function (abDataArr, nodeId, nodeData) {
                var match = ValueNodeSelectTreeService$WonderEditor.getIsSelect(nodeData);
                if (match) {
                  var value = ValueNodeSelectTreeService$WonderEditor.getValue(nodeData);
                  var type_ = ValueNodeSelectTreeService$WonderEditor.getType(nodeData);
                  if (type_ === "assetBundle") {
                    return ArrayService$WonderEditor.push(/* tuple */[
                                value[/* path */1],
                                value[/* assetBundle */0]
                              ], abDataArr);
                  } else {
                    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_generateAssetBundleData", "unknown type_: " + (String(type_) + ""), "", "", ""));
                  }
                } else {
                  return abDataArr;
                }
              }), /* () */0);
}

function _writeAssetBundleData(useAssetBundle, selectTreeForAssetBundle, createZipStream) {
  if (useAssetBundle) {
    return Most.map((function (zip) {
                  return ArrayService$WonderCommonlib.reduceOneParam((function (zip, param) {
                                return Zip$WonderBsJszip.write(zip, Caml_option.some(Options$WonderBsJszip.makeWriteOptions(undefined, true, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0)), param[0], /* `trustme */[
                                            380026608,
                                            TypeArrayType$WonderEditor.newBlobFromArrayBuffer(param[1])
                                          ]);
                              }), zip, _generateAssetBundleData(selectTreeForAssetBundle));
                }), createZipStream);
  } else {
    return createZipStream;
  }
}

function _loadData(useWorker, sceneGraphArrayBuffer, fetchFunc, createZipStream) {
  return Most.flatMap((function (zip) {
                return Most.fromPromise(loadAndWriteJsData(fetchFunc, zip));
              }), Most.flatMap((function (zip) {
                    return Most.fromPromise(loadAndWriteConfigData(useWorker, fetchFunc, zip));
                  }), Most.flatMap((function (zip) {
                        return Most.fromPromise(loadAndWriteResData(fetchFunc, zip));
                      }), Most.flatMap((function (zip) {
                            return Most.fromPromise(loadAndWriteIndexJsData(useWorker, fetchFunc, zip));
                          }), Most.flatMap((function (zip) {
                                return Most.fromPromise(loadAndWriteIndexHtmlData(useWorker, sceneGraphArrayBuffer, fetchFunc, zip));
                              }), createZipStream)))));
}

function _generateSceneWDB(editorState, engineState) {
  return HeaderExportSceneWDBUtils$WonderEditor.generateSceneWDB(false, GenerateSceneGraphEngineService$WonderEditor.generateWDB, Uint8ArrayAssetEditorService$WonderEditor.buildImageUint8ArrayMap(editorState), engineState);
}

function publishZip(param, param$1, createZipFunc, fetchFunc) {
  var zipName = param[0];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = StateEditorService$WonderEditor.getIsRun(/* () */0);
  if (match) {
    ConsoleUtils$WonderEditor.warn(LanguageUtils$WonderEditor.getMessageLanguageDataByType("should-in-stop", LanguageEditorService$WonderEditor.unsafeGetType(editorState)), editorState);
    return new Promise((function (resolve, reject) {
                  return resolve(undefined);
                }));
  } else {
    var match$1 = _generateSceneWDB(editorState, engineState);
    var sceneGraphArrayBuffer = match$1[1];
    StateEngineService$WonderEditor.setState(match$1[0]);
    return Most.drain(Most.tap((function (zip) {
                        Zip$WonderBsJszip.generateAsyncBlob(Zip$WonderBsJszip.write(zip, Caml_option.some(Options$WonderBsJszip.makeWriteOptions(undefined, true, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0)), "Scene.wdb", /* `trustme */[
                                    380026608,
                                    TypeArrayType$WonderEditor.newBlobFromArrayBuffer(sceneGraphArrayBuffer)
                                  ]), undefined, Zip$WonderBsJszip.makeAsyncBlobOptions(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0)).then((function (content) {
                                return Promise.resolve((FileSaver.saveAs(content, "" + (String(zipName) + ".zip")), /* () */0));
                              }));
                        return /* () */0;
                      }), _loadData(param[1], sceneGraphArrayBuffer, fetchFunc, _writeAssetBundleData(param$1[0], param$1[1], Most.just(Curry._1(createZipFunc, /* () */0)))))).then((function (param) {
                  return Promise.resolve(undefined);
                }));
  }
}

var Publish = /* module */[
  /* _generateAssetBundleData */_generateAssetBundleData,
  /* _writeAssetBundleData */_writeAssetBundleData,
  /* _loadData */_loadData,
  /* _generateSceneWDB */_generateSceneWDB,
  /* publishZip */publishZip
];

export {
  LoadData ,
  Publish ,
  
}
/* most Not a pure module */
