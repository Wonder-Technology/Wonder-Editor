

import * as ImageUtils$WonderEditor from "../../../../src/core/composable_component/header/utils/ImageUtils.js";
import * as TextureUtils$WonderEditor from "../../../../src/core/utils/engine/TextureUtils.js";
import * as UIStateAssetService$WonderEditor from "../../../../src/service/record/editor/asset/UIStateAssetService.js";
import * as WDBNodeAssetService$WonderEditor from "../../../../src/service/record/editor/asset/WDBNodeAssetService.js";
import * as FolderNodeAssetService$WonderEditor from "../../../../src/service/record/editor/asset/FolderNodeAssetService.js";
import * as TextureNodeAssetService$WonderEditor from "../../../../src/service/record/editor/asset/TextureNodeAssetService.js";
import * as ImageDataMapAssetService$WonderEditor from "../../../../src/service/record/editor/asset/ImageDataMapAssetService.js";
import * as MaterialNodeAssetService$WonderEditor from "../../../../src/service/record/editor/asset/MaterialNodeAssetService.js";
import * as OperateTreeAssetLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/asset/OperateTreeAssetLogicService.js";
import * as MainEditorAssetFolderNodeTool$WonderEditor from "./MainEditorAssetFolderNodeTool.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as ImageDataMapAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/ImageDataMapAssetEditorService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../src/service/state/engine/BasicSourceTextureEngineService.js";

function _buildImageObj(src) {
  return {
          src: src,
          getAttribute: (function (prop) {
              return src;
            })
        };
}

function insertMaterialNode(materialNodeId, parentFolderNodeId, material, param) {
  return /* tuple */[
          OperateTreeAssetEditorService$WonderEditor.insertNode(parentFolderNodeId, MaterialNodeAssetService$WonderEditor.buildNode(materialNodeId, /* LightMaterial */1, material), param[0]),
          param[1]
        ];
}

function insertWDBNode(wdbNodeId, parentFolderNodeId, gameObject, name, param) {
  return /* tuple */[
          OperateTreeAssetEditorService$WonderEditor.insertNode(parentFolderNodeId, WDBNodeAssetService$WonderEditor.buildNode(wdbNodeId, name, gameObject), param[0]),
          param[1]
        ];
}

function insertTextureNode(textureNodeId, parentFolderNodeId, textureName, param) {
  var editorState = param[0];
  var match = TextureUtils$WonderEditor.createAndInitTexture(textureName, ".png", param[1]);
  var textureComponent = match[0];
  var imageSrc = textureName + "img";
  var engineState = BasicSourceTextureEngineService$WonderEditor.setSource(_buildImageObj(imageSrc), textureComponent, match[1]);
  var extName = ".jpg";
  return /* tuple */[
          OperateTreeAssetEditorService$WonderEditor.insertNode(parentFolderNodeId, TextureNodeAssetService$WonderEditor.buildNode(textureNodeId, textureComponent, textureComponent), ImageDataMapAssetEditorService$WonderEditor.setData(textureComponent, ImageDataMapAssetService$WonderEditor.buildData(imageSrc, undefined, textureName + extName, ImageUtils$WonderEditor.getImageMimeType(extName, editorState), undefined, /* () */0), editorState)),
          engineState
        ];
}

function insertFolderNode(folderNodeId, parentFolderNodeId, param) {
  var engineState = param[1];
  var editorState = param[0];
  return /* tuple */[
          OperateTreeAssetEditorService$WonderEditor.insertNode(parentFolderNodeId, FolderNodeAssetService$WonderEditor.buildNode(folderNodeId, OperateTreeAssetLogicService$WonderEditor.getUniqueNodeName(MainEditorAssetFolderNodeTool$WonderEditor.getNoNameFolderName(/* () */0), OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(parentFolderNodeId, editorState), engineState), UIStateAssetService$WonderEditor.build(undefined, true, /* () */0), /* () */0), editorState),
          engineState
        ];
}

export {
  _buildImageObj ,
  insertMaterialNode ,
  insertWDBNode ,
  insertTextureNode ,
  insertFolderNode ,
  
}
/* ImageUtils-WonderEditor Not a pure module */
