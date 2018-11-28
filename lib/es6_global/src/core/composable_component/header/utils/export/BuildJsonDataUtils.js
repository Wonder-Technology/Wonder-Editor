

import * as Js_primitive from "../../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Copyright$WonderEditor from "../../../../../Copyright.js";
import * as BufferUtils$WonderEditor from "../BufferUtils.js";
import * as ArrayService$WonderEditor from "../../../../../service/atom/ArrayService.js";
import * as OptionService$WonderEditor from "../../../../../service/primitive/OptionService.js";
import * as AssetNodeUtils$WonderEditor from "../../../mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/utils/AssetNodeUtils.js";
import * as SparseMapService$WonderEditor from "../../../../../service/atom/SparseMapService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../service/state/engine/LightMaterialEngineService.js";
import * as WDBNodeMapAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/WDBNodeMapAssetEditorService.js";
import * as ImageNodeMapAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/ImageNodeMapAssetEditorService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../service/state/engine/BasicSourceTextureEngineService.js";
import * as TextureNodeMapAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/TextureNodeMapAssetEditorService.js";
import * as MaterialNodeMapAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/MaterialNodeMapAssetEditorService.js";

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
  var match = SparseMapService$WonderEditor.reduceiValid((function (param, param$1, imageNodeId) {
          var byteOffset = param[4];
          var bufferViewArr = param[2];
          var imageArr = param[1];
          var uint8Array = OptionService$WonderEditor.unsafeGet(param$1[/* uint8Array */1]);
          var byteLength = uint8Array.length;
          var alignedByteLength = BufferUtils$WonderEditor.alignedLength(byteLength);
          return /* tuple */[
                  SparseMapService$WonderCommonlib.set(imageNodeId, imageArr.length, param[0]),
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
        SparseMapService$WonderCommonlib.createEmpty(/* () */0),
        /* array */[],
        /* array */[],
        /* array */[],
        0
      ], ImageNodeMapAssetEditorService$WonderEditor.getImageNodeMap(editorState));
  var bufferViewArr = match[2];
  return /* tuple */[
          match[0],
          match[1],
          bufferViewArr,
          match[3],
          _computeBufferViewDataByteLength(bufferViewArr)
        ];
}

function _getAssetNodePathFromAssets(_parentFolderNodeId, _namePathArr, _param) {
  while(true) {
    var param = _param;
    var namePathArr = _namePathArr;
    var parentFolderNodeId = _parentFolderNodeId;
    var engineState = param[1];
    var editorState = param[0];
    if (parentFolderNodeId !== undefined) {
      var parentFolderNodeId$1 = parentFolderNodeId;
      _param = /* tuple */[
        editorState,
        engineState
      ];
      _namePathArr = ArrayService$WonderEditor.push(AssetNodeUtils$WonderEditor.getAssetNodeTotalName(/* Folder */0, parentFolderNodeId$1, /* tuple */[
                editorState,
                engineState
              ]), namePathArr.slice());
      _parentFolderNodeId = AssetNodeUtils$WonderEditor.getAssetNodeParentId(/* Folder */0, parentFolderNodeId$1, editorState);
      continue ;
    } else {
      return namePathArr.reverse().join("/");
    }
  };
}

function _buildTextureData(imageIndexMap, param) {
  var engineState = param[1];
  var editorState = param[0];
  return SparseMapService$WonderEditor.reduceiValid((function (param, param$1, textureNodeId) {
                var textureComponent = param$1[/* textureComponent */0];
                var textureArr = param[1];
                return /* tuple */[
                        SparseMapService$WonderCommonlib.set(textureComponent, textureArr.length, param[0]),
                        ArrayService$WonderEditor.push(/* record */[
                              /* path */_getAssetNodePathFromAssets(param$1[/* parentFolderNodeId */2], /* array */[], /* tuple */[
                                    editorState,
                                    engineState
                                  ]),
                              /* source */SparseMapService$WonderCommonlib.unsafeGet(param$1[/* image */1], imageIndexMap),
                              /* name */AssetNodeUtils$WonderEditor.getAssetNodeTotalName(/* Texture */1, textureNodeId, /* tuple */[
                                    editorState,
                                    engineState
                                  ]),
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
              SparseMapService$WonderCommonlib.createEmpty(/* () */0),
              /* array */[]
            ], TextureNodeMapAssetEditorService$WonderEditor.getTextureNodeMap(editorState));
}

function _getTextureIndexFromMap(textureComponent, textureIndexMap) {
  if (textureComponent !== undefined) {
    return Js_primitive.some(SparseMapService$WonderCommonlib.unsafeGet(textureComponent, textureIndexMap));
  }
  
}

function _buildMaterialData(textureIndexMap, param) {
  var engineState = param[1];
  var editorState = param[0];
  return SparseMapService$WonderEditor.reduceiValid((function (param, param$1, materialNodeId) {
                var materialComponent = param$1[/* materialComponent */2];
                var parentFolderNodeId = param$1[/* parentFolderNodeId */0];
                var lightMaterialArr = param[1];
                var basicMaterialArr = param[0];
                var name = AssetNodeUtils$WonderEditor.getAssetNodeTotalName(/* Material */3, materialNodeId, /* tuple */[
                      editorState,
                      engineState
                    ]);
                if (param$1[/* type_ */1]) {
                  return /* tuple */[
                          basicMaterialArr,
                          ArrayService$WonderEditor.push(/* record */[
                                /* name */name,
                                /* path */_getAssetNodePathFromAssets(parentFolderNodeId, /* array */[], /* tuple */[
                                      editorState,
                                      engineState
                                    ]),
                                /* diffuseColor */LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseColor(materialComponent, engineState),
                                /* diffuseMap */_getTextureIndexFromMap(LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseMap(materialComponent, engineState), textureIndexMap),
                                /* shininess */LightMaterialEngineService$WonderEditor.getLightMaterialShininess(materialComponent, engineState)
                              ], lightMaterialArr)
                        ];
                } else {
                  return /* tuple */[
                          ArrayService$WonderEditor.push(/* record */[
                                /* name */name,
                                /* path */_getAssetNodePathFromAssets(parentFolderNodeId, /* array */[], /* tuple */[
                                      editorState,
                                      engineState
                                    ]),
                                /* color */BasicMaterialEngineService$WonderEditor.getColor(materialComponent, engineState)
                              ], basicMaterialArr),
                          lightMaterialArr
                        ];
                }
              }), /* tuple */[
              /* array */[],
              /* array */[]
            ], MaterialNodeMapAssetEditorService$WonderEditor.getMaterialNodeMap(editorState));
}

function _buildWDBData(imageAlignedByteLength, imageBufferViewArr, param) {
  var engineState = param[1];
  var editorState = param[0];
  var imageBufferViewIndex = imageBufferViewArr.length;
  var match = SparseMapService$WonderEditor.reduceValid((function (param, param$1) {
          var wdbArrayBuffer = param$1[/* wdbArrayBuffer */2];
          var byteOffset = param[3];
          var bufferViewArr = param[2];
          var byteLength = wdbArrayBuffer.byteLength;
          var alignedByteLength = BufferUtils$WonderEditor.alignedLength(byteLength);
          return /* tuple */[
                  ArrayService$WonderEditor.push(/* record */[
                        /* name */param$1[/* name */0],
                        /* path */_getAssetNodePathFromAssets(param$1[/* parentFolderNodeId */1], /* array */[], /* tuple */[
                              editorState,
                              engineState
                            ]),
                        /* bufferView */imageBufferViewIndex + bufferViewArr.length | 0
                      ], param[0]),
                  ArrayService$WonderEditor.push(wdbArrayBuffer, param[1]),
                  ArrayService$WonderEditor.push(/* record */[
                        /* byteOffset */byteOffset,
                        /* byteLength */byteLength
                      ], bufferViewArr),
                  byteOffset + alignedByteLength | 0
                ];
        }), /* tuple */[
        /* array */[],
        /* array */[],
        /* array */[],
        imageAlignedByteLength
      ], WDBNodeMapAssetEditorService$WonderEditor.getWDBNodeMap(editorState));
  var bufferViewArr = match[2];
  var match$1 = bufferViewArr.length === 0;
  return /* tuple */[
          match[0],
          match[1],
          bufferViewArr,
          match$1 ? imageAlignedByteLength : _computeBufferViewDataByteLength(bufferViewArr)
        ];
}

function buildJsonData(editorState, engineState) {
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
  var match$3 = _buildWDBData(match[4], imageBufferViewArr, /* tuple */[
        editorState,
        engineState
      ]);
  return /* tuple */[
          /* tuple */[
            match[1],
            match$1[1],
            match$2[0],
            match$2[1],
            match$3[0]
          ],
          /* tuple */[
            imageBufferViewArr,
            match$3[2]
          ],
          /* tuple */[
            match[3],
            match$3[1]
          ],
          match$3[3]
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
  _getAssetNodePathFromAssets ,
  _buildTextureData ,
  _getTextureIndexFromMap ,
  _buildMaterialData ,
  _buildWDBData ,
  buildJsonData ,
  buildJsonUint8Array ,
  
}
/* BufferUtils-WonderEditor Not a pure module */
