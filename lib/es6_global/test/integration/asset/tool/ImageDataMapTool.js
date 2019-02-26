

import * as TextureNodeAssetService$WonderEditor from "../../../../src/service/record/editor/asset/TextureNodeAssetService.js";
import * as ImageDataMapAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/ImageDataMapAssetEditorService.js";

function getDataByTextureNode(textureNode, editorState) {
  var match = TextureNodeAssetService$WonderEditor.getNodeData(textureNode);
  return ImageDataMapAssetEditorService$WonderEditor.unsafeGetData(match[/* imageDataIndex */1], editorState);
}

export {
  getDataByTextureNode ,
  
}
/* TextureNodeAssetService-WonderEditor Not a pure module */
