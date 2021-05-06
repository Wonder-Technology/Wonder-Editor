'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var AppStore$WonderEditor = require("../../../../src/core/ui/store/AppStore.js");
var LogUtils$WonderEditor = require("../../../../src/core/utils/console/LogUtils.js");
var TestTool$WonderEditor = require("../../../tool/TestTool.js");
var FileReader$WonderEditor = require("../../../../src/core/external/FileReader.js");
var EventHelper$WonderEditor = require("../../../../src/core/external/EventHelper.js");
var ArrayService$WonderEditor = require("../../../../src/service/atom/ArrayService.js");
var BaseEventTool$WonderEditor = require("../../../tool/ui/BaseEventTool.js");
var SceneWDBUtils$WonderEditor = require("../../../../src/core/composable_component/header/utils/SceneWDBUtils.js");
var FileNameService$WonderEditor = require("../../../../src/service/atom/FileNameService.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var ShaderEngineService$WonderEditor = require("../../../../src/service/state/engine/ShaderEngineService.js");
var MainEditorAssetIdTool$WonderEditor = require("../../asset/tool/MainEditorAssetIdTool.js");
var GameObjectEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/GameObjectEngineService.js");

function handleSceneWDB(wdbArrayBuffer) {
  return Most.tap((function (param) {
                return StateLogicService$WonderEditor.refreshEngineState(GameObjectEngineService$WonderEditor.initAllGameObjects(param[0][0], ShaderEngineService$WonderEditor.clearInitShaderCache(StateEngineService$WonderEditor.unsafeGetState(/* () */0))));
              }), SceneWDBUtils$WonderEditor.importSceneWDB(wdbArrayBuffer));
}

function _getUploadAssetType(name) {
  var extname = FileNameService$WonderEditor.getExtName(name);
  if (extname === ".wdb") {
    return /* LoadWDB */0;
  } else {
    return /* LoadError */[LogUtils$WonderEditor.buildErrorMessage("the loaded type is error", "", "", "")];
  }
}

function _readWDBByTypeSync(reader, fileInfo) {
  reader.readAsArrayBuffer(fileInfo[/* file */2]);
  return /* () */0;
}

function load(dispatchFunc, $$event) {
  EventHelper$WonderEditor.preventDefault($$event);
  var match = ArrayService$WonderEditor.getFirst(Js_dict.values($$event.target.files).map(FileReader$WonderEditor.convertFileJsObjectToFileInfoRecord));
  if (match !== undefined) {
    return Most.drain(Most.flatMap((function (wdbResult) {
                        return handleSceneWDB(wdbResult[/* result */2]);
                      }), Most.flatMap((function (wdbInfo) {
                            return Most.fromPromise(new Promise((function (resolve, reject) {
                                              var reader = new FileReader();
                                              Curry._2(FileReader$WonderEditor.onload, reader, (function (result) {
                                                      return resolve(/* record */[
                                                                  /* name */wdbInfo[/* name */0],
                                                                  /* type_ */_getUploadAssetType(wdbInfo[/* name */0]),
                                                                  /* result */result
                                                                ]);
                                                    }));
                                              return _readWDBByTypeSync(reader, wdbInfo);
                                            })));
                          }), Most.just(Caml_option.valFromOption(match))))).then((function (param) {
                  return Promise.resolve(Curry._1(dispatchFunc, [
                                  AppStore$WonderEditor.UpdateAction,
                                  /* Update */[/* array */[/* All */1]]
                                ]));
                }));
  } else {
    return new Promise((function (resolve, reject) {
                  return resolve(Curry._1(dispatchFunc, [
                                  AppStore$WonderEditor.UpdateAction,
                                  /* Update */[/* array */[/* NoUpdate */0]]
                                ]));
                }));
  }
}

function loadSceneWDB(arrayBuffer, $staropt$star, $staropt$star$1, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var fileName = $staropt$star$1 !== undefined ? $staropt$star$1 : "Wdb";
  var uploadedWDBNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
  return load(dispatchFunc, BaseEventTool$WonderEditor.buildWDBFileEvent(fileName, arrayBuffer)).then((function (param) {
                return Promise.resolve(uploadedWDBNodeId);
              }));
}

exports.handleSceneWDB = handleSceneWDB;
exports._getUploadAssetType = _getUploadAssetType;
exports._readWDBByTypeSync = _readWDBByTypeSync;
exports.load = load;
exports.loadSceneWDB = loadSceneWDB;
/* most Not a pure module */
