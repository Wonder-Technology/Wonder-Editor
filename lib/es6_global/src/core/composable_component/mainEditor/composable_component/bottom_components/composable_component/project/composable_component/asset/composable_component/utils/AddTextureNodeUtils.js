

import * as Caml_option from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as AssetIdUtils$WonderEditor from "../../utils/AssetIdUtils.js";
import * as Base64Service$WonderEditor from "../../../../../../../../../../../service/primitive/Base64Service.js";
import * as AssetTreeUtils$WonderEditor from "./AssetTreeUtils.js";
import * as FolderNodeUtils$WonderEditor from "../../utils/FolderNodeUtils.js";
import * as SparseMapService$WonderEditor from "../../../../../../../../../../../service/atom/SparseMapService.js";
import * as Uint8ArrayService$WonderEditor from "../../../../../../../../../../../service/primitive/Uint8ArrayService.js";
import * as ImageNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/ImageNodeMapAssetEditorService.js";

function addTextureNodeToAssetTree(texture, param, editorState) {
  var newNodeId = param[1];
  var targetTreeNodeId = param[0];
  return AssetTreeUtils$WonderEditor.createNodeAndAddToTargetNodeChildren(targetTreeNodeId, newNodeId, /* Texture */1, FolderNodeUtils$WonderEditor.addTextureIntoNodeMap(newNodeId, targetTreeNodeId, texture, param[2], editorState));
}

function _getImageNodeIdByBase64(imageBase64, editorState) {
  var match = SparseMapService$WonderEditor.find((function (param) {
          return Base64Service$WonderEditor.isBase64Equal(imageBase64, param[1][/* base64 */0]);
        }), SparseMapService$WonderEditor.getValidDataArr(ImageNodeMapAssetEditorService$WonderEditor.getImageNodeMap(editorState)));
  if (match !== undefined) {
    return match[0];
  }
  
}

function _getImageNodeIdByUint8Array(imageUint8Array, editorState) {
  var match = SparseMapService$WonderEditor.find((function (param) {
          return Uint8ArrayService$WonderEditor.isUint8ArrayEqual(Caml_option.some(imageUint8Array), param[1][/* uint8Array */1]);
        }), SparseMapService$WonderEditor.getValidDataArr(ImageNodeMapAssetEditorService$WonderEditor.getImageNodeMap(editorState)));
  if (match !== undefined) {
    return match[0];
  }
  
}

function addImageNodeByBase64(base64, fileName, mimeType, editorState) {
  var match = _getImageNodeIdByBase64(base64, editorState);
  if (match !== undefined) {
    return /* tuple */[
            match,
            editorState
          ];
  } else {
    var match$1 = AssetIdUtils$WonderEditor.generateAssetId(editorState);
    var imageNodeId = match$1[1];
    return /* tuple */[
            imageNodeId,
            ImageNodeMapAssetEditorService$WonderEditor.setResult(imageNodeId, ImageNodeMapAssetEditorService$WonderEditor.buildImageNodeResult(base64, undefined, fileName, mimeType, undefined, /* () */0), match$1[0])
          ];
  }
}

function addImageNodeByUint8Array(uint8Array, name, mimeType, editorState) {
  var match = _getImageNodeIdByUint8Array(uint8Array, editorState);
  if (match !== undefined) {
    return /* tuple */[
            match,
            editorState
          ];
  } else {
    var match$1 = AssetIdUtils$WonderEditor.generateAssetId(editorState);
    var imageNodeId = match$1[1];
    return /* tuple */[
            imageNodeId,
            ImageNodeMapAssetEditorService$WonderEditor.setResult(imageNodeId, ImageNodeMapAssetEditorService$WonderEditor.buildImageNodeResult(undefined, Caml_option.some(uint8Array), name, mimeType, undefined, /* () */0), match$1[0])
          ];
  }
}

export {
  addTextureNodeToAssetTree ,
  _getImageNodeIdByBase64 ,
  _getImageNodeIdByUint8Array ,
  addImageNodeByBase64 ,
  addImageNodeByUint8Array ,
  
}
/* AssetIdUtils-WonderEditor Not a pure module */
