

import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Image$WonderEditor from "../../../../../../../../../../external/Image.js";
import * as ImageUtils$WonderEditor from "../../../../../../../../../header/utils/ImageUtils.js";
import * as TextureUtils$WonderEditor from "../../../../../../../../../../utils/engine/TextureUtils.js";
import * as FileNameService$WonderEditor from "../../../../../../../../../../../service/atom/FileNameService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as TextureNodeAssetService$WonderEditor from "../../../../../../../../../../../service/record/editor/asset/TextureNodeAssetService.js";
import * as OperateTreeAssetLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/asset/OperateTreeAssetLogicService.js";
import * as TextureNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/TextureNodeAssetEditorService.js";
import * as ImageDataMapAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/ImageDataMapAssetEditorService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/BasicSourceTextureEngineService.js";

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

function handleTextureType(fileResult, param, param$1) {
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

export {
  _handleImage ,
  handleTextureType ,
  
}
/* Image-WonderEditor Not a pure module */
