

import * as Most from "most";
import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Zip$WonderBsJszip from "../../../../../../../../../../../../../../node_modules/wonder-bs-jszip/lib/es6_global/src/zip.js";
import * as MostUtils$Wonderjs from "../../../../../../../../../../../../../../node_modules/wonder.js/lib/es6_global/src/asset/utils/MostUtils.js";
import * as ZipObject$WonderBsJszip from "../../../../../../../../../../../../../../node_modules/wonder-bs-jszip/lib/es6_global/src/zipObject.js";
import * as ArrayService$WonderEditor from "../../../../../../../../../../../service/atom/ArrayService.js";
import * as FileNameService$WonderEditor from "../../../../../../../../../../../service/atom/FileNameService.js";
import * as LoadGLTFZipUtils$WonderEditor from "./LoadGLTFZipUtils.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as IdAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/IdAssetEditorService.js";
import * as AssetHeaderHandleGLBUtils$WonderEditor from "./AssetHeaderHandleGLBUtils.js";
import * as PathTreeAssetLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/asset/PathTreeAssetLogicService.js";
import * as AssetBundleNodeAssetService$WonderEditor from "../../../../../../../../../../../service/record/editor/asset/AssetBundleNodeAssetService.js";
import * as AssetHeaderAssetBundleUtils$WonderEditor from "./AssetHeaderAssetBundleUtils.js";
import * as OperateTreeAssetLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/asset/OperateTreeAssetLogicService.js";
import * as AssetBundleNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/AssetBundleNodeAssetEditorService.js";

function _handleGLTFZipType(param, param$1, createJsZipFunc, param$2) {
  var engineState = param$2[1];
  var editorState = param$2[0];
  var selectedFolderNodeInAssetTree = param$1[1];
  var wdbNodeId = param$1[0];
  var fileName = param[0];
  return LoadGLTFZipUtils$WonderEditor.convertGLTFToGLB(param[1], createJsZipFunc).then((function (glbArrayBuffer) {
                return AssetHeaderHandleGLBUtils$WonderEditor.handleGLBType(/* tuple */[
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
                                                var editorState$2 = AssetBundleNodeAssetEditorService$WonderEditor.addAssetBundleNodeToAssetTree(parentFolderNode, AssetBundleNodeAssetService$WonderEditor.buildNode(match[1], OperateTreeAssetLogicService$WonderEditor.getUniqueNodeName(FileNameService$WonderEditor.getBaseName(relativePath), parentFolderNode, engineState), assetBundle, AssetHeaderAssetBundleUtils$WonderEditor.getAssetBundleTypeByExtname(extname)), match$1[0]);
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

function _judgeZipType(zip) {
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
  return /* tuple */[
          isGLTFZip[0],
          isAssetBundleZip[0]
        ];
}

function handleZipType(param, param$1, createJsZipFunc, param$2) {
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
                var match = _judgeZipType(zip);
                if (match[0]) {
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
                } else if (match[1]) {
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
              }));
}

export {
  _handleGLTFZipType ,
  _getZipRelativeFolderPath ,
  _buildPathInAssetTree ,
  _handleAssetBundleZipType ,
  _judgeZipType ,
  handleZipType ,
  
}
/* most Not a pure module */
