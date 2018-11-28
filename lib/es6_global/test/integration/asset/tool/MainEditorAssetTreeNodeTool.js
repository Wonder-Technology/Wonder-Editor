

import * as ImageUtils$WonderEditor from "../../../../src/core/composable_component/header/utils/ImageUtils.js";
import * as TextureUtils$WonderEditor from "../../../../src/core/utils/engine/TextureUtils.js";
import * as FolderNodeUtils$WonderEditor from "../../../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/utils/FolderNodeUtils.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/StateEngineService.js";
import * as TreeAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/TreeAssetEditorService.js";
import * as TreeRootAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/TreeRootAssetEditorService.js";
import * as ImageNodeMapAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/ImageNodeMapAssetEditorService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../src/service/state/engine/BasicSourceTextureEngineService.js";
import * as TextureNodeMapAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/TextureNodeMapAssetEditorService.js";

function addFolderIntoNodeMapWithNoNameName(index, parentFolderNodeId, editorState, engineState) {
  return FolderNodeUtils$WonderEditor.addFolderIntoNodeMap(index, parentFolderNodeId, FolderNodeUtils$WonderEditor.getNoNameFolderNameByNodeId(index, editorState), /* tuple */[
              editorState,
              engineState
            ]);
}

function _buildImageObj(src) {
  return {
          src: src,
          getAttribute: (function () {
              return src;
            })
        };
}

function addTextureIntoNodeMap(index, parentFolderNodeId, textureName, editorState) {
  var match = TextureUtils$WonderEditor.createAndInitTexture(textureName, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
  var textureComponent = match[0];
  var imageSrc = textureName + "img";
  StateEngineService$WonderEditor.setState(BasicSourceTextureEngineService$WonderEditor.setSource(_buildImageObj(imageSrc), textureComponent, match[1]));
  var extName = ".jpg";
  return TextureNodeMapAssetEditorService$WonderEditor.setResult(index, TextureNodeMapAssetEditorService$WonderEditor.buildTextureNodeResult(textureComponent, parentFolderNodeId, textureComponent), ImageNodeMapAssetEditorService$WonderEditor.setResult(textureComponent, ImageNodeMapAssetEditorService$WonderEditor.buildImageNodeResult(imageSrc, undefined, textureName + extName, ImageUtils$WonderEditor.getImageMimeType(extName, editorState)), editorState));
}

function getSpecificTreeNode(nodeId, editorState) {
  return TreeAssetEditorService$WonderEditor.getSpecificTreeNodeById(nodeId, TreeRootAssetEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState));
}

var addMaterialIntoNodeMap = FolderNodeUtils$WonderEditor.addMaterialIntoNodeMap;

export {
  addFolderIntoNodeMapWithNoNameName ,
  addMaterialIntoNodeMap ,
  _buildImageObj ,
  addTextureIntoNodeMap ,
  getSpecificTreeNode ,
  
}
/* ImageUtils-WonderEditor Not a pure module */
