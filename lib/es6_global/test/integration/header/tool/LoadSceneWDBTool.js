

import * as Most from "most";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_dict from "../../../../../../node_modules/bs-platform/lib/es6/js_dict.js";
import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as AppStore$WonderEditor from "../../../../src/core/ui/store/AppStore.js";
import * as LogUtils$WonderEditor from "../../../../src/core/utils/console/LogUtils.js";
import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as FileReader$WonderEditor from "../../../../src/core/external/FileReader.js";
import * as EventHelper$WonderEditor from "../../../../src/core/external/EventHelper.js";
import * as ArrayService$WonderEditor from "../../../../src/service/atom/ArrayService.js";
import * as ConsoleUtils$WonderEditor from "../../../../src/core/utils/ui/ConsoleUtils.js";
import * as BaseEventTool$WonderEditor from "../../../tool/ui/BaseEventTool.js";
import * as SceneWDBUtils$WonderEditor from "../../../../src/core/composable_component/header/utils/SceneWDBUtils.js";
import * as FileNameService$WonderEditor from "../../../../src/service/atom/FileNameService.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/StateEngineService.js";
import * as ShaderEngineService$WonderEditor from "../../../../src/service/state/engine/ShaderEngineService.js";
import * as MainEditorAssetIdTool$WonderEditor from "../../asset/tool/MainEditorAssetIdTool.js";
import * as GameObjectEngineService$WonderEditor from "../../../../src/service/state/engine/GameObjectEngineService.js";

function handleSceneWDB(wdbArrayBuffer) {
  return Most.tap((function (param) {
                return StateLogicService$WonderEditor.refreshEngineState(GameObjectEngineService$WonderEditor.initAllGameObjects(param[0], ShaderEngineService$WonderEditor.clearShaderCache(StateEngineService$WonderEditor.unsafeGetState(/* () */0))));
              }), SceneWDBUtils$WonderEditor.importSceneWDB(wdbArrayBuffer));
}

function _getUploadAssetType(name) {
  var extname = FileNameService$WonderEditor.getExtName(name);
  if (extname === ".wdb") {
    return /* LoadWDB */0;
  } else {
    var partial_arg = LogUtils$WonderEditor.buildErrorMessage("the loaded type is error", "", "", "");
    StateLogicService$WonderEditor.getEditorState((function (param) {
            return ConsoleUtils$WonderEditor.error(partial_arg, param);
          }));
    return /* LoadError */5;
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
                            return Most.fromPromise(new Promise((function (resolve, _) {
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
                          }), Most.just(Js_primitive.valFromOption(match))))).then((function () {
                  return Promise.resolve(Curry._1(dispatchFunc, [
                                  AppStore$WonderEditor.UpdateAction,
                                  /* Update */[/* array */[/* All */1]]
                                ]));
                }));
  } else {
    return new Promise((function (resolve, _) {
                  return resolve(Curry._1(dispatchFunc, [
                                  AppStore$WonderEditor.UpdateAction,
                                  /* Update */[/* array */[/* NoUpdate */0]]
                                ]));
                }));
  }
}

function loadSceneWDB(arrayBuffer, $staropt$star, $staropt$star$1, _) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var fileName = $staropt$star$1 !== undefined ? $staropt$star$1 : "Wdb";
  var uploadedWDBNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
  return load(dispatchFunc, BaseEventTool$WonderEditor.buildWDBFileEvent(fileName, arrayBuffer)).then((function () {
                return Promise.resolve(uploadedWDBNodeId);
              }));
}

export {
  handleSceneWDB ,
  _getUploadAssetType ,
  _readWDBByTypeSync ,
  load ,
  loadSceneWDB ,
  
}
/* most Not a pure module */
