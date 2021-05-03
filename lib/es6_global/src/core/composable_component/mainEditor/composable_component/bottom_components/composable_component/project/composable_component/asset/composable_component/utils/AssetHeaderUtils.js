

import * as Most from "most";
import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_dict from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_dict.js";
import * as Caml_option from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../ui/store/AppStore.js";
import * as Caml_builtin_exceptions from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";
import * as FileReader$WonderEditor from "../../../../../../../../../../external/FileReader.js";
import * as EventHelper$WonderEditor from "../../../../../../../../../../external/EventHelper.js";
import * as ArrayService$WonderEditor from "../../../../../../../../../../../service/atom/ArrayService.js";
import * as NodeAssetType$WonderEditor from "../../../../../../../../../../../service/record/editor/data/asset/NodeAssetType.js";
import * as LoadAssetUtils$WonderEditor from "../../utils/LoadAssetUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as IdAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/IdAssetEditorService.js";
import * as AssetHeaderHandleGLBUtils$WonderEditor from "./AssetHeaderHandleGLBUtils.js";
import * as AssetHeaderHandleWDBUtils$WonderEditor from "./AssetHeaderHandleWDBUtils.js";
import * as AssetHeaderHandleZipUtils$WonderEditor from "./AssetHeaderHandleZipUtils.js";
import * as AssetHeaderHandleTextureUtils$WonderEditor from "./AssetHeaderHandleTextureUtils.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as AssetHeaderHandleAssetBundleUtils$WonderEditor from "./AssetHeaderHandleAssetBundleUtils.js";

function _handleSpecificFuncByTypeAsync(type_, param) {
  switch (type_) {
    case 0 : 
        return Curry._1(param[1], /* () */0);
    case 1 : 
        return Curry._1(param[3], /* () */0);
    case 2 : 
        return Curry._1(param[4], /* () */0);
    case 4 : 
        return Curry._1(param[0], /* () */0);
    case 5 : 
        return Curry._1(param[2], /* () */0);
    case 3 : 
    case 6 : 
        throw [
              Caml_builtin_exceptions.match_failure,
              /* tuple */[
                "AssetHeaderUtils.re",
                16,
                2
              ]
            ];
    case 7 : 
        return new Promise((function (resolve, reject) {
                      return reject([
                                  NodeAssetType$WonderEditor.LoadException,
                                  "load asset error"
                                ]);
                    }));
    
  }
}

function handleFileByTypeAsync(fileResult, createJsZipFunc) {
  var match = StateLogicService$WonderEditor.getEditorState(IdAssetEditorService$WonderEditor.generateNodeId);
  var assetNodeId = match[1];
  var editorState = match[0];
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var selectedFolderNodeInAssetTree = OperateTreeAssetEditorService$WonderEditor.unsafeGetSelectedFolderNodeInAssetTree(editorState);
  return _handleSpecificFuncByTypeAsync(fileResult[/* type_ */1], /* tuple */[
                (function (param) {
                    return AssetHeaderHandleTextureUtils$WonderEditor.handleTextureType(fileResult, /* tuple */[
                                selectedFolderNodeInAssetTree,
                                assetNodeId
                              ], /* tuple */[
                                editorState,
                                engineState
                              ]);
                  }),
                (function (param) {
                    return AssetHeaderHandleWDBUtils$WonderEditor.handleAssetWDBType(/* tuple */[
                                fileResult[/* name */0],
                                fileResult[/* result */2]
                              ], /* tuple */[
                                assetNodeId,
                                selectedFolderNodeInAssetTree
                              ], /* tuple */[
                                editorState,
                                engineState
                              ]);
                  }),
                (function (param) {
                    return AssetHeaderHandleAssetBundleUtils$WonderEditor.handleAssetBundleType(/* tuple */[
                                fileResult[/* name */0],
                                fileResult[/* result */2]
                              ], /* tuple */[
                                assetNodeId,
                                selectedFolderNodeInAssetTree
                              ], /* tuple */[
                                editorState,
                                engineState
                              ]);
                  }),
                (function (param) {
                    return AssetHeaderHandleGLBUtils$WonderEditor.handleGLBType(/* tuple */[
                                fileResult[/* name */0],
                                fileResult[/* result */2]
                              ], /* tuple */[
                                assetNodeId,
                                selectedFolderNodeInAssetTree
                              ], /* tuple */[
                                editorState,
                                engineState
                              ]);
                  }),
                (function (param) {
                    return AssetHeaderHandleZipUtils$WonderEditor.handleZipType(/* tuple */[
                                fileResult[/* name */0],
                                fileResult[/* result */2]
                              ], /* tuple */[
                                assetNodeId,
                                selectedFolderNodeInAssetTree
                              ], createJsZipFunc, /* tuple */[
                                editorState,
                                engineState
                              ]);
                  })
              ]).then((function (param) {
                StateEditorService$WonderEditor.setState(param[0]);
                StateEngineService$WonderEditor.setState(param[1]);
                return Promise.resolve(/* () */0);
              }));
}

function fileLoad(param, createJsZipFunc, $$event) {
  var dispatchFunc = param[1];
  EventHelper$WonderEditor.preventDefault($$event);
  var target = $$event.target;
  var match = ArrayService$WonderEditor.getFirst(Js_dict.values(target.files));
  if (match !== undefined) {
    var fileInfo = FileReader$WonderEditor.convertFileJsObjectToFileInfoRecord(Caml_option.valFromOption(match));
    return Most.drain(Most.flatMap((function (fileResult) {
                        return Most.fromPromise(handleFileByTypeAsync(fileResult, createJsZipFunc));
                      }), Most.fromPromise(new Promise((function (resolve, reject) {
                                var reader = new FileReader();
                                Curry._2(FileReader$WonderEditor.onload, reader, (function (result) {
                                        return resolve(/* record */[
                                                    /* name */fileInfo[/* name */0],
                                                    /* type_ */LoadAssetUtils$WonderEditor.getUploadAssetType(fileInfo[/* name */0]),
                                                    /* result */result
                                                  ]);
                                      }));
                                return LoadAssetUtils$WonderEditor.readAssetByTypeSync(reader, fileInfo);
                              }))))).then((function (param) {
                  FileReader$WonderEditor.makeSureCanLoadSameNameFileAgain(target);
                  Curry._1(dispatchFunc, [
                        AppStore$WonderEditor.UpdateAction,
                        /* Update */[/* array */[
                            /* Inspector */2,
                            /* Project */4
                          ]]
                      ]);
                  return Promise.resolve(/* () */0);
                }));
  } else {
    return Promise.resolve(/* () */0);
  }
}

export {
  _handleSpecificFuncByTypeAsync ,
  handleFileByTypeAsync ,
  fileLoad ,
  
}
/* most Not a pure module */
