

import * as SparseMapService$WonderEditor from "../../../atom/SparseMapService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as TextureNodeMapAssetService$WonderEditor from "../../../record/editor/asset/TextureNodeMapAssetService.js";

function getTextureNodeMap(editorState) {
  return TextureNodeMapAssetService$WonderEditor.getTextureNodeMap(editorState[/* assetRecord */2]);
}

function setTextureNodeMap(textureNodeMap, editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* assetRecord */TextureNodeMapAssetService$WonderEditor.setTextureNodeMap(textureNodeMap, editorState[/* assetRecord */2]),
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* currentDragSource */editorState[/* currentDragSource */10],
          /* currentSelectSource */editorState[/* currentSelectSource */11],
          /* loopId */editorState[/* loopId */12]
        ];
}

function setResult(nodeId, result, editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* assetRecord */TextureNodeMapAssetService$WonderEditor.setResult(nodeId, result, editorState[/* assetRecord */2]),
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* currentDragSource */editorState[/* currentDragSource */10],
          /* currentSelectSource */editorState[/* currentSelectSource */11],
          /* loopId */editorState[/* loopId */12]
        ];
}

function getImage(nodeId, textureNodeMap) {
  return SparseMapService$WonderCommonlib.unsafeGet(nodeId, textureNodeMap)[/* image */1];
}

function getParentFolderNodeId(nodeId, textureNodeMap) {
  return SparseMapService$WonderCommonlib.unsafeGet(nodeId, textureNodeMap)[/* parentFolderNodeId */2];
}

function buildTextureNodeResult(textureComponent, parentFolderNodeId, image) {
  return /* record */[
          /* textureComponent */textureComponent,
          /* image */image,
          /* parentFolderNodeId */parentFolderNodeId
        ];
}

function setTextureNodeResultParent(parentFolderNodeId, texureResult) {
  return /* record */[
          /* textureComponent */texureResult[/* textureComponent */0],
          /* image */texureResult[/* image */1],
          /* parentFolderNodeId */parentFolderNodeId
        ];
}

function getValidValues(editorState) {
  return SparseMapService$WonderEditor.getValidValues(TextureNodeMapAssetService$WonderEditor.getTextureNodeMap(editorState[/* assetRecord */2]));
}

function getResultByTextureComponent(textureComponent, editorState) {
  return SparseMapService$WonderEditor.find((function (texureResult) {
                return texureResult[/* textureComponent */0] === textureComponent;
              }), SparseMapService$WonderEditor.getValidValues(TextureNodeMapAssetService$WonderEditor.getTextureNodeMap(editorState[/* assetRecord */2])));
}

function doesAnyTextureUseImage(targetImage, editorState) {
  return SparseMapService$WonderEditor.getValidValues(TextureNodeMapAssetService$WonderEditor.getTextureNodeMap(editorState[/* assetRecord */2])).filter((function (param) {
                return param[/* image */1] === targetImage;
              })).length > 0;
}

function getTextureComponents(editorState) {
  return SparseMapService$WonderEditor.map((function (param) {
                return param[/* textureComponent */0];
              }), SparseMapService$WonderEditor.getValidValues(TextureNodeMapAssetService$WonderEditor.getTextureNodeMap(editorState[/* assetRecord */2])));
}

export {
  getTextureNodeMap ,
  setTextureNodeMap ,
  setResult ,
  getImage ,
  getParentFolderNodeId ,
  buildTextureNodeResult ,
  setTextureNodeResultParent ,
  getValidValues ,
  getResultByTextureComponent ,
  doesAnyTextureUseImage ,
  getTextureComponents ,
  
}
/* SparseMapService-WonderEditor Not a pure module */
