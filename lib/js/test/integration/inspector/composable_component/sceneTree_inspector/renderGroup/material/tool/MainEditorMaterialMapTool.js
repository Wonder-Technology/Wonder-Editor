'use strict';

var ImageDataMapUtils$WonderEditor = require("../../../../../../../../src/core/composable_component/utils/ImageDataMapUtils.js");
var SelectAssetByImage$WonderEditor = require("../../../../../../../../src/core/atom_component/selectAsset/ui/SelectAssetByImage.js");
var TextureNodeAssetService$WonderEditor = require("../../../../../../../../src/service/record/editor/asset/TextureNodeAssetService.js");

function renderTextureGroup(state, sendFunc, findAllTextureNodesFunc) {
  return SelectAssetByImage$WonderEditor._renderAssetGroup("Texture", state, (function (currentTextureComponent, node) {
                return currentTextureComponent === TextureNodeAssetService$WonderEditor.getTextureComponent(node);
              }), (function (node, param) {
                return ImageDataMapUtils$WonderEditor.getImgSrc(TextureNodeAssetService$WonderEditor.getImageDataIndex(node), param[0]);
              }), sendFunc, findAllTextureNodesFunc);
}

exports.renderTextureGroup = renderTextureGroup;
/* ImageDataMapUtils-WonderEditor Not a pure module */
