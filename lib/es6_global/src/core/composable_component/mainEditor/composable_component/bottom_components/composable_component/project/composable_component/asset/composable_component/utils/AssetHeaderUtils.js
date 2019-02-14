

import * as Most from "most";
import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_dict from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_dict.js";
import * as Js_primitive from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Image$WonderEditor from "../../../../../../../../../../external/Image.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../ui/store/AppStore.js";
import * as Caml_builtin_exceptions from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";
import * as FileReader$WonderEditor from "../../../../../../../../../../external/FileReader.js";
import * as ImageUtils$WonderEditor from "../../../../../../../../../header/utils/ImageUtils.js";
import * as EventHelper$WonderEditor from "../../../../../../../../../../external/EventHelper.js";
import * as ArrayService$WonderEditor from "../../../../../../../../../../../service/atom/ArrayService.js";
import * as TextureUtils$WonderEditor from "../../../../../../../../../../utils/engine/TextureUtils.js";
import * as NodeAssetType$WonderEditor from "../../../../../../../../../../../service/record/editor/data/asset/NodeAssetType.js";
import * as LoadAssetUtils$WonderEditor from "../../utils/LoadAssetUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as FileNameService$WonderEditor from "../../../../../../../../../../../service/atom/FileNameService.js";
import * as LoadGLTFZipUtils$WonderEditor from "./LoadGLTFZipUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/StateEngineService.js";
import * as IdAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/IdAssetEditorService.js";
import * as WDBAssetLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/asset/WDBAssetLogicService.js";
import * as DirectorEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/DirectorEngineService.js";
import * as ConverterEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/ConverterEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as TextureNodeAssetService$WonderEditor from "../../../../../../../../../../../service/record/editor/asset/TextureNodeAssetService.js";
import * as ExtractAndRelateAssetsUtils$WonderEditor from "../header/utils/ExtractAndRelateAssetsUtils.js";
import * as OperateTreeAssetLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/asset/OperateTreeAssetLogicService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as TextureNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/TextureNodeAssetEditorService.js";
import * as ImageDataMapAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/ImageDataMapAssetEditorService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/BasicSourceTextureEngineService.js";
import * as RelateGameObjectAndGeometryAssetUtils$WonderEditor from "../../../../../../../../../utils/RelateGameObjectAndGeometryAssetUtils.js";

function _handleImage(param, param$1, param$2) {
  var engineState = param$2[1];
  var editorState = param$2[0];
  var textureComponent = param$1[2];
  var selectedFolderNodeInAssetTree = param$1[1];
  var textureNodeId = param$1[0];
  var imgBase64 = param[2];
  var fileName = param[1];
  var mimeType = param[0];
  return new Promise((function (resolve, _) {
                return Curry._2(Image$WonderEditor.onload, imgBase64, (function (loadedImg) {
                              ImageUtils$WonderEditor.setImageName(loadedImg, fileName);
                              var engineState$1 = BasicSourceTextureEngineService$WonderEditor.setSource(loadedImg, textureComponent, engineState);
                              var match = ImageDataMapAssetEditorService$WonderEditor.addImageNodeByBase64(imgBase64, fileName, mimeType, editorState);
                              var editorState$1 = TextureNodeAssetEditorService$WonderEditor.addTextureNodeToAssetTree(selectedFolderNodeInAssetTree, TextureNodeAssetService$WonderEditor.buildNode(textureNodeId, textureComponent, match[1]), match[0]);
                              return resolve(/* tuple */[
                                          editorState$1,
                                          engineState$1
                                        ]);
                            }));
              }));
}

function _handleAssetWDBType(param, param$1, param$2) {
  var engineState = param$2[1];
  var selectedFolderNodeInAssetTree = param$1[1];
  return WDBAssetLogicService$WonderEditor.importAssetWDB(/* tuple */[
                OperateTreeAssetLogicService$WonderEditor.getUniqueNodeName(FileNameService$WonderEditor.getBaseName(param[0]), selectedFolderNodeInAssetTree, engineState),
                param[1]
              ], /* tuple */[
                param$1[0],
                selectedFolderNodeInAssetTree
              ], true, /* tuple */[
                param$2[0],
                engineState
              ]).then((function (param) {
                var match = param[1];
                var match$1 = param[0];
                var allGameObjects = match$1[0];
                var match$2 = ExtractAndRelateAssetsUtils$WonderEditor.Extract[/* extractAndRelateAssets */8](allGameObjects, match$1[1], /* tuple */[
                      match[0],
                      match[1]
                    ]);
                var match$3 = match$2[1];
                var engineState = match$3[1];
                var editorState = match$3[0];
                var match$4 = match$2[0];
                var defaultGeometryData = RelateGameObjectAndGeometryAssetUtils$WonderEditor.getDefaultGeometryData(editorState, engineState);
                var engineState$1 = DirectorEngineService$WonderEditor.loopBody(0, ArrayService$WonderCommonlib.reduceOneParam((function (engineState, gameObject) {
                            return GameObjectEngineService$WonderEditor.initGameObject(gameObject, RelateGameObjectAndGeometryAssetUtils$WonderEditor.replaceWDBAssetGameObjectGeometryComponentToDefaultGeometryComponent(gameObject, defaultGeometryData, engineState));
                          }), engineState, allGameObjects));
                var match$5 = ExtractAndRelateAssetsUtils$WonderEditor.AssetTree[/* addNodeToAssetTree */4](match$4[0], match$4[1], /* tuple */[
                      editorState,
                      engineState$1
                    ]);
                return Promise.resolve(/* tuple */[
                            match$5[0],
                            match$5[1]
                          ]);
              }));
}

function _handleGLBType(param, param$1, param$2) {
  return _handleAssetWDBType(/* tuple */[
              param[0],
              ConverterEngineService$WonderEditor.convertGLBToWDB(param[1])
            ], /* tuple */[
              param$1[0],
              param$1[1]
            ], /* tuple */[
              param$2[0],
              param$2[1]
            ]);
}

function _handleGLTFZipType(param, param$1, createJsZipFunc, param$2) {
  var engineState = param$2[1];
  var editorState = param$2[0];
  var selectedFolderNodeInAssetTree = param$1[1];
  var wdbNodeId = param$1[0];
  var fileName = param[0];
  return LoadGLTFZipUtils$WonderEditor.convertGLTFToGLB(param[1], createJsZipFunc).then((function (glbArrayBuffer) {
                return _handleGLBType(/* tuple */[
                            fileName,
                            glbArrayBuffer
                          ], /* tuple */[
                            wdbNodeId,
                            selectedFolderNodeInAssetTree
                          ], /* tuple */[
                            editorState,
                            engineState
                          ]);
              }));
}

function _handleSpecificFuncByTypeAsync(type_, param) {
  switch (type_) {
    case 0 : 
        return Curry._1(param[1], /* () */0);
    case 1 : 
        return Curry._1(param[2], /* () */0);
    case 2 : 
        return Curry._1(param[3], /* () */0);
    case 3 : 
        return Curry._1(param[0], /* () */0);
    case 4 : 
        throw [
              Caml_builtin_exceptions.match_failure,
              /* tuple */[
                "AssetHeaderUtils.re",
                149,
                2
              ]
            ];
    case 5 : 
        return new Promise((function (_, reject) {
                      return reject([
                                  NodeAssetType$WonderEditor.LoadException,
                                  "load asset error"
                                ]);
                    }));
    
  }
}

function _handleTextureType(fileResult, param, param$1) {
  var editorState = param$1[0];
  var selectedFolderNodeInAssetTree = param[0];
  var baseName = FileNameService$WonderEditor.getBaseName(fileResult[/* name */0]);
  var extName = FileNameService$WonderEditor.getExtName(fileResult[/* name */0]);
  var match = TextureUtils$WonderEditor.createAndInitTexture(OperateTreeAssetLogicService$WonderEditor.getUniqueNodeName(baseName, selectedFolderNodeInAssetTree, param$1[1]), StateEngineService$WonderEditor.unsafeGetState(/* () */0));
  return _handleImage(/* tuple */[
              ImageUtils$WonderEditor.getImageMimeType(extName, editorState),
              fileResult[/* name */0],
              fileResult[/* result */2]
            ], /* tuple */[
              param[1],
              selectedFolderNodeInAssetTree,
              match[0]
            ], /* tuple */[
              editorState,
              match[1]
            ]);
}

function handleFileByTypeAsync(fileResult, createJsZipFunc) {
  var match = StateLogicService$WonderEditor.getEditorState(IdAssetEditorService$WonderEditor.generateNodeId);
  var assetNodeId = match[1];
  var editorState = match[0];
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var selectedFolderNodeInAssetTree = OperateTreeAssetEditorService$WonderEditor.unsafeGetSelectedFolderNodeInAssetTree(editorState);
  return _handleSpecificFuncByTypeAsync(fileResult[/* type_ */1], /* tuple */[
                (function () {
                    return _handleTextureType(fileResult, /* tuple */[
                                selectedFolderNodeInAssetTree,
                                assetNodeId
                              ], /* tuple */[
                                editorState,
                                engineState
                              ]);
                  }),
                (function () {
                    return _handleAssetWDBType(/* tuple */[
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
                (function () {
                    return _handleGLBType(/* tuple */[
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
                (function () {
                    return _handleGLTFZipType(/* tuple */[
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
    var fileInfo = FileReader$WonderEditor.convertFileJsObjectToFileInfoRecord(Js_primitive.valFromOption(match));
    return Most.drain(Most.flatMap((function (fileResult) {
                        return Most.fromPromise(handleFileByTypeAsync(fileResult, createJsZipFunc));
                      }), Most.fromPromise(new Promise((function (resolve, _) {
                                var reader = new FileReader();
                                Curry._2(FileReader$WonderEditor.onload, reader, (function (result) {
                                        return resolve(/* record */[
                                                    /* name */fileInfo[/* name */0],
                                                    /* type_ */LoadAssetUtils$WonderEditor.getUploadAssetType(fileInfo[/* name */0]),
                                                    /* result */result
                                                  ]);
                                      }));
                                return LoadAssetUtils$WonderEditor.readAssetByTypeSync(reader, fileInfo);
                              }))))).then((function () {
                  FileReader$WonderEditor.makeSureCanLoadSameNameFileAgain(target);
                  Curry._1(dispatchFunc, [
                        AppStore$WonderEditor.UpdateAction,
                        /* Update */[/* array */[/* Project */4]]
                      ]);
                  return Promise.resolve(/* () */0);
                }));
  } else {
    return Promise.resolve(/* () */0);
  }
}

export {
  _handleImage ,
  _handleAssetWDBType ,
  _handleGLBType ,
  _handleGLTFZipType ,
  _handleSpecificFuncByTypeAsync ,
  _handleTextureType ,
  handleFileByTypeAsync ,
  fileLoad ,
  
}
/* most Not a pure module */
