

import * as Js_option from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as JudgeTool$WonderEditor from "../../../tool/JudgeTool.js";
import * as OptionService$WonderEditor from "../../../../src/service/primitive/OptionService.js";
import * as FileNameService$WonderEditor from "../../../../src/service/atom/FileNameService.js";
import * as SparseMapService$WonderEditor from "../../../../src/service/atom/SparseMapService.js";
import * as TextureNodeMapAssetService$WonderEditor from "../../../../src/service/record/editor/asset/TextureNodeMapAssetService.js";
import * as ImageNodeMapAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/ImageNodeMapAssetEditorService.js";
import * as TextureNodeMapAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/TextureNodeMapAssetEditorService.js";

function getResult(nodeId, editorState) {
  return TextureNodeMapAssetService$WonderEditor.getResult(nodeId, editorState[/* assetRecord */2]);
}

function getTextureComponent(nodeId, editorState) {
  return OptionService$WonderEditor.unsafeGet(TextureNodeMapAssetService$WonderEditor.getResult(nodeId, editorState[/* assetRecord */2]))[/* textureComponent */0];
}

function setTextureName(nodeId, name, editorState) {
  var textureComponent = getTextureComponent(nodeId, editorState);
  var init = ImageNodeMapAssetEditorService$WonderEditor.unsafeGetResult(textureComponent, editorState);
  return ImageNodeMapAssetEditorService$WonderEditor.setResult(textureComponent, /* record */[
              /* base64 */init[/* base64 */0],
              /* uint8Array */init[/* uint8Array */1],
              /* blobObjectURL */init[/* blobObjectURL */2],
              /* name */name,
              /* mimeType */init[/* mimeType */4]
            ], editorState);
}

function hasTextureComponent(material, editorState) {
  return Js_option.isSome(Caml_option.undefined_to_opt(TextureNodeMapAssetEditorService$WonderEditor.getValidValues(editorState).find((function (param) {
                        return JudgeTool$WonderEditor.isEqual(param[/* textureComponent */0], material);
                      }))));
}

function findTextureNodeIdByTextureComponent(texture, editorState) {
  var match = SparseMapService$WonderEditor.getValidDataArr(TextureNodeMapAssetEditorService$WonderEditor.getTextureNodeMap(editorState)).find((function (param) {
          return param[1][/* textureComponent */0] === texture;
        }));
  if (match !== undefined) {
    return match[0];
  }
  
}

var buildTextureAssetName = FileNameService$WonderEditor.getBaseName;

export {
  getResult ,
  getTextureComponent ,
  setTextureName ,
  hasTextureComponent ,
  findTextureNodeIdByTextureComponent ,
  buildTextureAssetName ,
  
}
/* OptionService-WonderEditor Not a pure module */
