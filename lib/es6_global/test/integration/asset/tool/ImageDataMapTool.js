

import * as TextureNodeAssetService$WonderEditor from "../../../../src/service/record/editor/asset/TextureNodeAssetService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";
import * as ImageDataMapAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/ImageDataMapAssetEditorService.js";

function getDataByTextureNode(textureNode, editorState) {
  var match = TextureNodeAssetService$WonderEditor.getNodeData(textureNode);
  return ImageDataMapAssetEditorService$WonderEditor.unsafeGetData(match[/* imageDataIndex */1], editorState);
}

function getMapValidLength(editorState) {
  return ImmutableSparseMapService$WonderCommonlib.getValidValues(ImageDataMapAssetEditorService$WonderEditor.getMap(editorState)).length;
}

export {
  getDataByTextureNode ,
  getMapValidLength ,
  
}
/* TextureNodeAssetService-WonderEditor Not a pure module */
