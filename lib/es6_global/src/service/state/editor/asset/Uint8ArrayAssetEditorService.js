

import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as TextureNodeAssetService$WonderEditor from "../../../record/editor/asset/TextureNodeAssetService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";
import * as TextureNodeAssetEditorService$WonderEditor from "./TextureNodeAssetEditorService.js";
import * as ImageDataMapAssetEditorService$WonderEditor from "./ImageDataMapAssetEditorService.js";

function buildImageUint8ArrayMap(editorState) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (map, textureNode) {
                var match = TextureNodeAssetService$WonderEditor.getNodeData(textureNode);
                var textureComponent = match[/* textureComponent */0];
                var match$1 = ImageDataMapAssetEditorService$WonderEditor.unsafeGetData(match[/* imageDataIndex */1], editorState);
                var mimeType = match$1[/* mimeType */4];
                return OptionService$WonderEditor.andThenWithDefault((function (uint8Array) {
                              return ImmutableSparseMapService$WonderCommonlib.set(textureComponent, /* tuple */[
                                          mimeType,
                                          uint8Array
                                        ], map);
                            }), map, match$1[/* uint8Array */1]);
              }), ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), TextureNodeAssetEditorService$WonderEditor.findAllTextureNodes(editorState));
}

export {
  buildImageUint8ArrayMap ,
  
}
/* OptionService-WonderEditor Not a pure module */
