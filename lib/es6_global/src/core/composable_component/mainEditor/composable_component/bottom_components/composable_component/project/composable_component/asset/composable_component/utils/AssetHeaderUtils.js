

import * as Most from "most";
import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_dict from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_dict.js";
import * as Caml_option from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Zip$WonderBsJszip from "../../../../../../../../../../../../../../node_modules/wonder-bs-jszip/lib/es6_global/src/zip.js";
import * as Image$WonderEditor from "../../../../../../../../../../external/Image.js";
import * as MostUtils$Wonderjs from "../../../../../../../../../../../../../../node_modules/wonder.js/lib/es6_global/src/asset/utils/MostUtils.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../ui/store/AppStore.js";
import * as Caml_builtin_exceptions from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";
import * as FileReader$WonderEditor from "../../../../../../../../../../external/FileReader.js";
import * as ImageUtils$WonderEditor from "../../../../../../../../../header/utils/ImageUtils.js";
import * as ZipObject$WonderBsJszip from "../../../../../../../../../../../../../../node_modules/wonder-bs-jszip/lib/es6_global/src/zipObject.js";
import * as EventHelper$WonderEditor from "../../../../../../../../../../external/EventHelper.js";
import * as ArrayService$WonderEditor from "../../../../../../../../../../../service/atom/ArrayService.js";
import * as TextureUtils$WonderEditor from "../../../../../../../../../../utils/engine/TextureUtils.js";
import * as NodeAssetType$WonderEditor from "../../../../../../../../../../../service/record/editor/data/asset/NodeAssetType.js";
import * as ProgressUtils$WonderEditor from "../../../../../../../../../../atom_component/progress/utils/ProgressUtils.js";
import * as LoadAssetUtils$WonderEditor from "../../utils/LoadAssetUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as FileNameService$WonderEditor from "../../../../../../../../../../../service/atom/FileNameService.js";
import * as LoadGLTFZipUtils$WonderEditor from "./LoadGLTFZipUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as IdAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/IdAssetEditorService.js";
import * as WDBAssetLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/asset/WDBAssetLogicService.js";
import * as DirectorEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/DirectorEngineService.js";
import * as ConverterEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/ConverterEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as TextureNodeAssetService$WonderEditor from "../../../../../../../../../../../service/record/editor/asset/TextureNodeAssetService.js";
import * as PathTreeAssetLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/asset/PathTreeAssetLogicService.js";
import * as AssetBundleNodeAssetService$WonderEditor from "../../../../../../../../../../../service/record/editor/asset/AssetBundleNodeAssetService.js";
import * as ExtractAndRelateAssetsUtils$WonderEditor from "../header/utils/ExtractAndRelateAssetsUtils.js";
import * as OperateTreeAssetLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/asset/OperateTreeAssetLogicService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as TextureNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/TextureNodeAssetEditorService.js";
import * as ImageDataMapAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/ImageDataMapAssetEditorService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/BasicSourceTextureEngineService.js";
import * as AssetBundleNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/AssetBundleNodeAssetEditorService.js";
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
  return new Promise((function (resolve, reject) {
                return Curry._2(Image$WonderEditor.onload, imgBase64, (function (loadedImg) {
                              ImageUtils$WonderEditor.setImageName(loadedImg, fileName);
                              var engineState$1 = BasicSourceTextureEngineService$WonderEditor.setSource(loadedImg, textureComponent, engineState);
                              var match = ImageDataMapAssetEditorService$WonderEditor.addImageDataIfBase64NotExist(imgBase64, fileName, mimeType, editorState);
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
  StateEngineService$WonderEditor.setState(ProgressUtils$WonderEditor.changePercent(0, ProgressUtils$WonderEditor.show(StateEngineService$WonderEditor.unsafeGetState(/* () */0))));
  var __x = FileNameService$WonderEditor.getBaseName(param[0]);
  return WDBAssetLogicService$WonderEditor.importAssetWDB(/* tuple */[
                OperateTreeAssetLogicService$WonderEditor.getUniqueNodeName(__x, selectedFolderNodeInAssetTree, engineState),
                param[1]
              ], /* tuple */[
                param$1[0],
                selectedFolderNodeInAssetTree,
                true
              ], WDBAssetLogicService$WonderEditor.createWDBNodeUseCreatedSnapshot, /* tuple */[
                param$2[0],
                engineState
              ]).then((function (param) {
                var match = param[1];
                var match$1 = param[0];
                var allGameObjects = match$1[0];
                var match$2 = ExtractAndRelateAssetsUtils$WonderEditor.Extract[/* extractAndRelateAssets */13](allGameObjects, match$1[1], /* tuple */[
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
                var match$5 = ExtractAndRelateAssetsUtils$WonderEditor.AssetTree[/* addNodeToAssetTree */8](match$4[0], match$4[1], match$4[2], match$4[3], /* tuple */[
                      editorState,
                      engineState$1
                    ]);
                StateLogicService$WonderEditor.getAndSetEngineState(ProgressUtils$WonderEditor.finish);
                return Promise.resolve(/* tuple */[
                            match$5[0],
                            match$5[1]
                          ]);
              }));
}

function _getAssetBundleTypeByExtname(extname) {
  switch (extname) {
    case ".rab" : 
        return /* RAB */0;
    case ".sab" : 
        return /* SAB */1;
    case ".wab" : 
        return /* WAB */2;
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_getAssetBundleTypeByExtname", "unknown extName: " + (String(extname) + ""), "", "", ""));
  }
}

function _handleAssetAssetBundleType(param, param$1, param$2) {
  var engineState = param$2[1];
  var editorState = param$2[0];
  var selectedFolderNodeInAssetTree = param$1[1];
  var assetBundleNodeId = param$1[0];
  var assetBundleArrayBuffer = param[1];
  var fileName = param[0];
  return new Promise((function (resolve, reject) {
                var editorState$1 = AssetBundleNodeAssetEditorService$WonderEditor.addAssetBundleNodeToAssetTree(selectedFolderNodeInAssetTree, AssetBundleNodeAssetService$WonderEditor.buildNode(assetBundleNodeId, OperateTreeAssetLogicService$WonderEditor.getUniqueNodeName(FileNameService$WonderEditor.getBaseName(fileName), selectedFolderNodeInAssetTree, engineState), assetBundleArrayBuffer, _getAssetBundleTypeByExtname(FileNameService$WonderEditor.getExtName(fileName))), editorState);
                return resolve(/* tuple */[
                            editorState$1,
                            engineState
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

function _getZipRelativeFolderPath(zipRelativePath) {
  var arr = zipRelativePath.split("/");
  var match = arr.length > 0;
  if (match) {
    return arr.slice(0, arr.length - 1 | 0).join("/");
  } else {
    return "";
  }
}

function _buildPathInAssetTree(selectedFolderNodeInAssetTree, zipRelativePath, param) {
  var zipRelativeFolderPath = _getZipRelativeFolderPath(zipRelativePath);
  var match = zipRelativeFolderPath === "";
  return PathTreeAssetLogicService$WonderEditor.getNodePath(selectedFolderNodeInAssetTree, /* tuple */[
              param[0],
              param[1]
            ]) + (
          match ? "" : "/" + zipRelativeFolderPath
        );
}

function _handleAssetBundleZipType(param, param$1, createJsZipFunc, param$2) {
  var engineState = param$2[1];
  var editorState = param$2[0];
  var selectedFolderNodeInAssetTree = param$1[1];
  return Most.drain(Most.flatMap((function (zip) {
                      var streamArr = /* array */[];
                      StateEditorService$WonderEditor.setState(editorState);
                      StateEngineService$WonderEditor.setState(engineState);
                      Zip$WonderBsJszip.forEach(zip, (function (relativePath, zipEntry) {
                              var extname = FileNameService$WonderEditor.getExtName(relativePath);
                              var exit = 0;
                              switch (extname) {
                                case "" : 
                                    return /* () */0;
                                case ".rab" : 
                                case ".sab" : 
                                case ".wab" : 
                                    exit = 1;
                                    break;
                                default:
                                  return Log$WonderLog.fatal((function (param) {
                                                return Log$WonderLog.buildFatalMessage(param, "_handleAssetBundleZipType", "unknown extname: $extname", "", "");
                                              }));
                              }
                              if (exit === 1) {
                                ArrayService$WonderEditor.push(Most.fromPromise(ZipObject$WonderBsJszip.asyncUint8(zipEntry, undefined, /* () */0).then((function (content) {
                                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                var assetBundle = content.buffer;
                                                var match = IdAssetEditorService$WonderEditor.generateNodeId(editorState);
                                                var editorState$1 = match[0];
                                                var match$1 = OperateTreeAssetLogicService$WonderEditor.addFolderNodesToTreeByPath(_buildPathInAssetTree(selectedFolderNodeInAssetTree, relativePath, /* tuple */[
                                                          editorState$1,
                                                          engineState
                                                        ]), /* tuple */[
                                                      editorState$1,
                                                      engineState
                                                    ]);
                                                var parentFolderNode = match$1[1];
                                                var editorState$2 = AssetBundleNodeAssetEditorService$WonderEditor.addAssetBundleNodeToAssetTree(parentFolderNode, AssetBundleNodeAssetService$WonderEditor.buildNode(match[1], OperateTreeAssetLogicService$WonderEditor.getUniqueNodeName(FileNameService$WonderEditor.getBaseName(relativePath), parentFolderNode, engineState), assetBundle, _getAssetBundleTypeByExtname(extname)), match$1[0]);
                                                StateEditorService$WonderEditor.setState(editorState$2);
                                                return Promise.resolve(/* () */0);
                                              }))), streamArr);
                                return /* () */0;
                              }
                              
                            }));
                      return MostUtils$Wonderjs.concatArray(streamArr);
                    }), Most.fromPromise(Zip$WonderBsJszip.loadAsync(Curry._1(createJsZipFunc, /* () */0), undefined, /* `blob */[
                            -1055310499,
                            param[1]
                          ])))).then((function (param) {
                return Promise.resolve(/* tuple */[
                            StateEditorService$WonderEditor.getState(/* () */0),
                            StateEngineService$WonderEditor.unsafeGetState(/* () */0)
                          ]);
              }));
}

function _handleZipType(param, param$1, createJsZipFunc, param$2) {
  var engineState = param$2[1];
  var editorState = param$2[0];
  var selectedFolderNodeInAssetTree = param$1[1];
  var wdbNodeId = param$1[0];
  var jsZipBlob = param[1];
  var fileName = param[0];
  return Zip$WonderBsJszip.loadAsync(Curry._1(createJsZipFunc, /* () */0), undefined, /* `blob */[
                -1055310499,
                jsZipBlob
              ]).then((function (zip) {
                var isGLTFZip = /* record */[/* contents */false];
                var isAssetBundleZip = /* record */[/* contents */false];
                Zip$WonderBsJszip.forEach(zip, (function (relativePath, zipEntry) {
                        var match = FileNameService$WonderEditor.getExtName(relativePath);
                        switch (match) {
                          case ".gltf" : 
                              isGLTFZip[0] = true;
                              return /* () */0;
                          case ".rab" : 
                          case ".sab" : 
                          case ".wab" : 
                              isAssetBundleZip[0] = true;
                              return /* () */0;
                          default:
                            return /* () */0;
                        }
                      }));
                var match = isGLTFZip[0];
                if (match) {
                  return _handleGLTFZipType(/* tuple */[
                              fileName,
                              jsZipBlob
                            ], /* tuple */[
                              wdbNodeId,
                              selectedFolderNodeInAssetTree
                            ], createJsZipFunc, /* tuple */[
                              editorState,
                              engineState
                            ]);
                } else {
                  var match$1 = isAssetBundleZip[0];
                  if (match$1) {
                    return _handleAssetBundleZipType(/* tuple */[
                                fileName,
                                jsZipBlob
                              ], /* tuple */[
                                wdbNodeId,
                                selectedFolderNodeInAssetTree
                              ], createJsZipFunc, /* tuple */[
                                editorState,
                                engineState
                              ]);
                  } else {
                    return Promise.resolve(/* tuple */[
                                editorState,
                                engineState
                              ]);
                  }
                }
              }));
}

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
                387,
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

function _handleTextureType(fileResult, param, param$1) {
  var editorState = param$1[0];
  var selectedFolderNodeInAssetTree = param[0];
  var baseName = FileNameService$WonderEditor.getBaseName(fileResult[/* name */0]);
  var extName = FileNameService$WonderEditor.getExtName(fileResult[/* name */0]);
  var match = TextureUtils$WonderEditor.createAndInitTexture(OperateTreeAssetLogicService$WonderEditor.getUniqueNodeName(baseName, selectedFolderNodeInAssetTree, param$1[1]), extName, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
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
                (function (param) {
                    return _handleTextureType(fileResult, /* tuple */[
                                selectedFolderNodeInAssetTree,
                                assetNodeId
                              ], /* tuple */[
                                editorState,
                                engineState
                              ]);
                  }),
                (function (param) {
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
                (function (param) {
                    return _handleAssetAssetBundleType(/* tuple */[
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
                (function (param) {
                    return _handleZipType(/* tuple */[
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
  _handleImage ,
  _handleAssetWDBType ,
  _getAssetBundleTypeByExtname ,
  _handleAssetAssetBundleType ,
  _handleGLBType ,
  _handleGLTFZipType ,
  _getZipRelativeFolderPath ,
  _buildPathInAssetTree ,
  _handleAssetBundleZipType ,
  _handleZipType ,
  _handleSpecificFuncByTypeAsync ,
  _handleTextureType ,
  handleFileByTypeAsync ,
  fileLoad ,
  
}
/* most Not a pure module */
