

import * as Js_primitive from "../../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Copyright$WonderEditor from "../../../../../Copyright.js";
import * as BufferUtils$WonderEditor from "../BufferUtils.js";
import * as ArrayService$WonderEditor from "../../../../../service/atom/ArrayService.js";
import * as OptionService$WonderEditor from "../../../../../service/primitive/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as WDBNodeAssetService$WonderEditor from "../../../../../service/record/editor/asset/WDBNodeAssetService.js";
import * as TextureNodeAssetService$WonderEditor from "../../../../../service/record/editor/asset/TextureNodeAssetService.js";
import * as MaterialNodeAssetService$WonderEditor from "../../../../../service/record/editor/asset/MaterialNodeAssetService.js";
import * as HeaderExportAssetWDBUtils$WonderEditor from "./HeaderExportAssetWDBUtils.js";
import * as NodeNameAssetLogicService$WonderEditor from "../../../../../service/stateTuple/logic/asset/NodeNameAssetLogicService.js";
import * as PathTreeAssetLogicService$WonderEditor from "../../../../../service/stateTuple/logic/asset/PathTreeAssetLogicService.js";
import * as WDBNodeAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/WDBNodeAssetEditorService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../service/state/engine/LightMaterialEngineService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";
import * as TextureNodeAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/TextureNodeAssetEditorService.js";
import * as ImageDataMapAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/ImageDataMapAssetEditorService.js";
import * as MaterialNodeAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/MaterialNodeAssetEditorService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../service/state/engine/BasicSourceTextureEngineService.js";

function _getUint8Array(uint8Array, _, _$1) {
  return OptionService$WonderEditor.unsafeGet(uint8Array);
}

function _computeBufferViewDataByteLength(bufferViewArr) {
  var match = ArrayService$WonderEditor.getLast(bufferViewArr);
  if (match !== undefined) {
    var match$1 = match;
    return match$1[/* byteOffset */0] + BufferUtils$WonderEditor.alignedLength(match$1[/* byteLength */1]) | 0;
  } else {
    return 0;
  }
}

function _buildImageData(editorState) {
  var match = ImmutableSparseMapService$WonderCommonlib.reduceiValid((function (param, param$1, imageDataIndex) {
          var byteOffset = param[4];
          var bufferViewArr = param[2];
          var imageArr = param[1];
          var uint8Array = OptionService$WonderEditor.unsafeGet(param$1[/* uint8Array */1]);
          var byteLength = uint8Array.length;
          var alignedByteLength = BufferUtils$WonderEditor.alignedLength(byteLength);
          return /* tuple */[
                  ImmutableSparseMapService$WonderCommonlib.set(imageDataIndex, imageArr.length, param[0]),
                  ArrayService$WonderEditor.push(/* record */[
                        /* name */param$1[/* name */3],
                        /* bufferView */bufferViewArr.length,
                        /* mimeType */param$1[/* mimeType */4]
                      ], imageArr),
                  ArrayService$WonderEditor.push(/* record */[
                        /* byteOffset */byteOffset,
                        /* byteLength */byteLength
                      ], bufferViewArr),
                  ArrayService$WonderEditor.push(uint8Array, param[3]),
                  byteOffset + alignedByteLength | 0
                ];
        }), /* tuple */[
        ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
        /* array */[],
        /* array */[],
        /* array */[],
        0
      ], ImageDataMapAssetEditorService$WonderEditor.getMap(editorState));
  var bufferViewArr = match[2];
  return /* tuple */[
          match[0],
          match[1],
          bufferViewArr,
          match[3],
          _computeBufferViewDataByteLength(bufferViewArr)
        ];
}

function _buildTextureData(imageIndexMap, param) {
  var engineState = param[1];
  var editorState = param[0];
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, node) {
                var textureArr = param[1];
                var match = TextureNodeAssetService$WonderEditor.getNodeData(node);
                var textureComponent = match[/* textureComponent */0];
                return /* tuple */[
                        ImmutableSparseMapService$WonderCommonlib.set(textureComponent, textureArr.length, param[0]),
                        ArrayService$WonderEditor.push(/* record */[
                              /* path */PathTreeAssetLogicService$WonderEditor.getNodePath(node, /* tuple */[
                                    editorState,
                                    engineState
                                  ]),
                              /* source */ImmutableSparseMapService$WonderCommonlib.unsafeGet(match[/* imageDataIndex */1], imageIndexMap),
                              /* name */NodeNameAssetLogicService$WonderEditor.getNodeName(node, engineState),
                              /* magFilter */BasicSourceTextureEngineService$WonderEditor.getMagFilter(textureComponent, engineState),
                              /* minFilter */BasicSourceTextureEngineService$WonderEditor.getMinFilter(textureComponent, engineState),
                              /* wrapS */BasicSourceTextureEngineService$WonderEditor.getWrapS(textureComponent, engineState),
                              /* wrapT */BasicSourceTextureEngineService$WonderEditor.getWrapT(textureComponent, engineState),
                              /* format */BasicSourceTextureEngineService$WonderEditor.getFormat(textureComponent, engineState),
                              /* type_ */BasicSourceTextureEngineService$WonderEditor.getType(textureComponent, engineState),
                              /* flipY */BasicSourceTextureEngineService$WonderEditor.getFlipY(textureComponent, engineState)
                            ], textureArr)
                      ];
              }), /* tuple */[
              ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
              /* array */[]
            ], TextureNodeAssetEditorService$WonderEditor.findAllTextureNodes(editorState));
}

function _getTextureIndexFromMap(textureComponent, textureIndexMap) {
  if (textureComponent !== undefined) {
    return Js_primitive.some(ImmutableSparseMapService$WonderCommonlib.unsafeGet(textureComponent, textureIndexMap));
  }
  
}

function _buildMaterialData(textureIndexMap, param) {
  var engineState = param[1];
  var editorState = param[0];
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, node) {
                var lightMaterialArr = param[1];
                var basicMaterialArr = param[0];
                var name = NodeNameAssetLogicService$WonderEditor.getNodeName(node, engineState);
                var path = PathTreeAssetLogicService$WonderEditor.getNodePath(node, /* tuple */[
                      editorState,
                      engineState
                    ]);
                var match = MaterialNodeAssetService$WonderEditor.getNodeData(node);
                var materialComponent = match[/* materialComponent */1];
                if (match[/* type_ */0]) {
                  return /* tuple */[
                          basicMaterialArr,
                          ArrayService$WonderEditor.push(/* record */[
                                /* name */name,
                                /* path */path,
                                /* diffuseColor */LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseColor(materialComponent, engineState),
                                /* diffuseMap */_getTextureIndexFromMap(LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseMap(materialComponent, engineState), textureIndexMap),
                                /* shininess */LightMaterialEngineService$WonderEditor.getLightMaterialShininess(materialComponent, engineState)
                              ], lightMaterialArr)
                        ];
                } else {
                  return /* tuple */[
                          ArrayService$WonderEditor.push(/* record */[
                                /* name */name,
                                /* path */path,
                                /* color */BasicMaterialEngineService$WonderEditor.getColor(materialComponent, engineState)
                              ], basicMaterialArr),
                          lightMaterialArr
                        ];
                }
              }), /* tuple */[
              /* array */[],
              /* array */[]
            ], MaterialNodeAssetEditorService$WonderEditor.findAllMaterialNodes(editorState));
}

function _buildWDBData(imageUint8ArrayMap, imageAlignedByteLength, imageBufferViewArr, param) {
  var editorState = param[0];
  var imageBufferViewIndex = imageBufferViewArr.length;
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, node) {
          var byteOffset = param[4];
          var bufferViewArr = param[3];
          var match = WDBNodeAssetService$WonderEditor.getNodeData(node);
          var match$1 = HeaderExportAssetWDBUtils$WonderEditor.generate(match[/* wdbGameObject */1], imageUint8ArrayMap, param[0]);
          var wdbArrayBuffer = match$1[1];
          var engineState = match$1[0];
          var byteLength = wdbArrayBuffer.byteLength;
          var alignedByteLength = BufferUtils$WonderEditor.alignedLength(byteLength);
          return /* tuple */[
                  engineState,
                  ArrayService$WonderEditor.push(/* record */[
                        /* name */match[/* name */0],
                        /* path */PathTreeAssetLogicService$WonderEditor.getNodePath(node, /* tuple */[
                              editorState,
                              engineState
                            ]),
                        /* bufferView */imageBufferViewIndex + bufferViewArr.length | 0
                      ], param[1]),
                  ArrayService$WonderEditor.push(wdbArrayBuffer, param[2]),
                  ArrayService$WonderEditor.push(/* record */[
                        /* byteOffset */byteOffset,
                        /* byteLength */byteLength
                      ], bufferViewArr),
                  byteOffset + alignedByteLength | 0
                ];
        }), /* tuple */[
        param[1],
        /* array */[],
        /* array */[],
        /* array */[],
        imageAlignedByteLength
      ], WDBNodeAssetEditorService$WonderEditor.findAllWDBNodes(editorState));
  var bufferViewArr = match[3];
  var match$1 = bufferViewArr.length === 0;
  return /* tuple */[
          match[0],
          match[1],
          match[2],
          bufferViewArr,
          match$1 ? imageAlignedByteLength : _computeBufferViewDataByteLength(bufferViewArr)
        ];
}

function buildJsonData(imageUint8ArrayMap, param) {
  var engineState = param[1];
  var editorState = param[0];
  var match = _buildImageData(editorState);
  var imageBufferViewArr = match[2];
  var match$1 = _buildTextureData(match[0], /* tuple */[
        editorState,
        engineState
      ]);
  var match$2 = _buildMaterialData(match$1[0], /* tuple */[
        editorState,
        engineState
      ]);
  var match$3 = _buildWDBData(imageUint8ArrayMap, match[4], imageBufferViewArr, /* tuple */[
        editorState,
        engineState
      ]);
  return /* tuple */[
          match$3[0],
          /* tuple */[
            match[1],
            match$1[1],
            match$2[0],
            match$2[1],
            match$3[1]
          ],
          /* tuple */[
            imageBufferViewArr,
            match$3[3]
          ],
          /* tuple */[
            match[3],
            match$3[2]
          ],
          match$3[4]
        ];
}

function buildJsonUint8Array(_, param) {
  var encoder = new TextEncoder();
  return encoder.encode(JSON.stringify(/* record */[
                  /* copyright : record */[
                    /* version */Copyright$WonderEditor.getVersion(/* () */0),
                    /* author */Copyright$WonderEditor.getAuthor(/* () */0)
                  ],
                  /* textures */param[2],
                  /* images */param[1],
                  /* basicMaterials */param[3],
                  /* lightMaterials */param[4],
                  /* wdbs */param[5],
                  /* bufferViews */param[0]
                ]));
}

export {
  _getUint8Array ,
  _computeBufferViewDataByteLength ,
  _buildImageData ,
  _buildTextureData ,
  _getTextureIndexFromMap ,
  _buildMaterialData ,
  _buildWDBData ,
  buildJsonData ,
  buildJsonUint8Array ,
  
}
/* BufferUtils-WonderEditor Not a pure module */
