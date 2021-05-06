'use strict';

var Caml_option = require("bs-platform/lib/js/caml_option.js");
var ImageUtils$WonderEditor = require("../../../../src/core/composable_component/utils/ImageUtils.js");
var TextureUtils$WonderEditor = require("../../../../src/core/utils/engine/TextureUtils.js");
var UIStateAssetService$WonderEditor = require("../../../../src/service/record/editor/asset/UIStateAssetService.js");
var WDBNodeAssetService$WonderEditor = require("../../../../src/service/record/editor/asset/WDBNodeAssetService.js");
var FolderNodeAssetService$WonderEditor = require("../../../../src/service/record/editor/asset/FolderNodeAssetService.js");
var CubemapNodeAssetService$WonderEditor = require("../../../../src/service/record/editor/asset/CubemapNodeAssetService.js");
var TextureNodeAssetService$WonderEditor = require("../../../../src/service/record/editor/asset/TextureNodeAssetService.js");
var MaterialNodeAssetService$WonderEditor = require("../../../../src/service/record/editor/asset/MaterialNodeAssetService.js");
var CubemapTextureEngineService$WonderEditor = require("../../../../src/service/state/engine/texture/CubemapTextureEngineService.js");
var OperateMaterialLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/material/OperateMaterialLogicService.js");
var OperateTreeAssetLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/asset/OperateTreeAssetLogicService.js");
var MainEditorAssetFolderNodeTool$WonderEditor = require("./MainEditorAssetFolderNodeTool.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");
var BasicSourceTextureEngineService$WonderEditor = require("../../../../src/service/state/engine/texture/BasicSourceTextureEngineService.js");
var BasicSourceTextureImageDataMapAssetService$WonderEditor = require("../../../../src/service/record/editor/asset/imageDataMap/BasicSourceTextureImageDataMapAssetService.js");
var CubemapTextureImageDataMapAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/imageDataMap/CubemapTextureImageDataMapAssetEditorService.js");
var BasicSourceTextureImageDataMapAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/imageDataMap/BasicSourceTextureImageDataMapAssetEditorService.js");

function _buildImageObj(src) {
  return {
          src: src,
          getAttribute: (function (prop) {
              return src;
            })
        };
}

function insertMaterialNode(materialNodeId, parentFolderNodeId, param, param$1) {
  var snapshotImageDataIndex = param[1];
  return /* tuple */[
          BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.setData(snapshotImageDataIndex, BasicSourceTextureImageDataMapAssetService$WonderEditor.buildData(OperateMaterialLogicService$WonderEditor.getDefaultSnapshotBase64(/* () */0), undefined, "material", ImageUtils$WonderEditor.getDefaultMimeType(/* () */0), Caml_option.some(undefined), /* () */0), OperateTreeAssetEditorService$WonderEditor.insertNode(parentFolderNodeId, MaterialNodeAssetService$WonderEditor.buildNode(materialNodeId, /* LightMaterial */1, param[0], snapshotImageDataIndex), param$1[0])),
          param$1[1]
        ];
}

function insertWDBNode(wdbNodeId, parentFolderNodeId, gameObject, name, imageDataIndex, param) {
  return /* tuple */[
          BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.setData(imageDataIndex, BasicSourceTextureImageDataMapAssetService$WonderEditor.buildData(undefined, undefined, "material", ImageUtils$WonderEditor.getDefaultMimeType(/* () */0), undefined, /* () */0), OperateTreeAssetEditorService$WonderEditor.insertNode(parentFolderNodeId, WDBNodeAssetService$WonderEditor.buildNode(wdbNodeId, name, gameObject, imageDataIndex), param[0])),
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
          OperateTreeAssetEditorService$WonderEditor.insertNode(parentFolderNodeId, TextureNodeAssetService$WonderEditor.buildNode(textureNodeId, undefined, /* BasicSource */0, textureComponent, textureComponent), BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.setData(textureComponent, BasicSourceTextureImageDataMapAssetService$WonderEditor.buildData(imageSrc, undefined, textureName + extName, ImageUtils$WonderEditor.getImageMimeType(extName, editorState), Caml_option.some(undefined), /* () */0), editorState)),
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

function insertCubemapNode(nodeId, parentFolderNodeId, cubemapName, param) {
  var match = CubemapTextureEngineService$WonderEditor.create(param[1]);
  var newCubemap = match[1];
  var engineState = CubemapTextureEngineService$WonderEditor.initTexture(newCubemap, CubemapTextureEngineService$WonderEditor.setCubemapTextureName(cubemapName, newCubemap, match[0]));
  var match$1 = CubemapTextureImageDataMapAssetEditorService$WonderEditor.addEmptyData(param[0]);
  return /* tuple */[
          OperateTreeAssetEditorService$WonderEditor.insertNode(parentFolderNodeId, CubemapNodeAssetService$WonderEditor.buildNode(nodeId, newCubemap, match$1[1]), match$1[0]),
          engineState
        ];
}

exports._buildImageObj = _buildImageObj;
exports.insertMaterialNode = insertMaterialNode;
exports.insertWDBNode = insertWDBNode;
exports.insertTextureNode = insertTextureNode;
exports.insertFolderNode = insertFolderNode;
exports.insertCubemapNode = insertCubemapNode;
/* ImageUtils-WonderEditor Not a pure module */
