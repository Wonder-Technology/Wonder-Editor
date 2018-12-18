

import * as Most from "most";
import * as Caml_option from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Blob$WonderEditor from "../../../../external/Blob.js";
import * as Contract$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ImageUtils$WonderEditor from "../ImageUtils.js";
import * as ArrayService$WonderEditor from "../../../../../service/atom/ArrayService.js";
import * as AssetIdUtils$WonderEditor from "../../../mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/utils/AssetIdUtils.js";
import * as OptionService$WonderEditor from "../../../../../service/primitive/OptionService.js";
import * as AssetTreeUtils$WonderEditor from "../../../mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/composable_component/utils/AssetTreeUtils.js";
import * as LoadImageUtils$WonderEditor from "../LoadImageUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SparseMapService$WonderEditor from "../../../../../service/atom/SparseMapService.js";
import * as StateEditorService$WonderEditor from "../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../service/state/engine/StateEngineService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as HeaderImportASBWDBUtils$WonderEditor from "./HeaderImportASBWDBUtils.js";
import * as HeaderImportFolderUtils$WonderEditor from "./HeaderImportFolderUtils.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../service/state/engine/LightMaterialEngineService.js";
import * as ImageNodeMapAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/ImageNodeMapAssetEditorService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../service/state/engine/BasicSourceTextureEngineService.js";
import * as TextureNodeMapAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/TextureNodeMapAssetEditorService.js";
import * as MaterialNodeMapAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/MaterialNodeMapAssetEditorService.js";

function _buildLoadImageStream(arrayBuffer, mimeType, errorMsg) {
  var blob = Blob$WonderEditor.newBlobFromArrayBuffer(arrayBuffer, mimeType);
  return Most.tap((function (image) {
                return Blob$WonderEditor.revokeObjectURL(blob);
              }), LoadImageUtils$WonderEditor.loadBlobImage(Blob$WonderEditor.createObjectURL(blob), errorMsg));
}

function _getArrayBuffer(buffer, bufferView, bufferViews) {
  var match = bufferViews[bufferView];
  var byteOffset = match[/* byteOffset */0];
  return buffer.slice(byteOffset, byteOffset + match[/* byteLength */1] | 0);
}

function buildImageData(param, buffer, editorState) {
  var bufferViews = param[/* bufferViews */6];
  return Most.reduce((function (param, param$1) {
                var imageIndex = param$1[2];
                var match = AssetIdUtils$WonderEditor.generateAssetId(param[2]);
                var assetNodeId = match[1];
                return /* tuple */[
                        SparseMapService$WonderCommonlib.set(imageIndex, param$1[0], param[0]),
                        SparseMapService$WonderCommonlib.set(imageIndex, assetNodeId, param[1]),
                        ImageNodeMapAssetEditorService$WonderEditor.setResult(assetNodeId, ImageNodeMapAssetEditorService$WonderEditor.buildImageNodeResult(undefined, Caml_option.some(param$1[1]), param$1[3], param$1[4], undefined, /* () */0), match[0])
                      ];
              }), /* tuple */[
              SparseMapService$WonderCommonlib.createEmpty(/* () */0),
              SparseMapService$WonderCommonlib.createEmpty(/* () */0),
              editorState
            ], Most.mergeArray(ArrayService$WonderCommonlib.reduceOneParami((function (streamArr, param, imageIndex) {
                        var mimeType = param[/* mimeType */2];
                        var name = param[/* name */0];
                        var arrayBuffer = _getArrayBuffer(buffer, param[/* bufferView */1], bufferViews);
                        return ArrayService$WonderEditor.push(Most.map((function (image) {
                                          return /* tuple */[
                                                  image,
                                                  new Uint8Array(arrayBuffer),
                                                  imageIndex,
                                                  name,
                                                  mimeType
                                                ];
                                        }), Most.map((function (image) {
                                              ImageUtils$WonderEditor.setImageName(image, name);
                                              return image;
                                            }), _buildLoadImageStream(arrayBuffer, mimeType, "load image error. imageIndex: " + (String(imageIndex) + "")))), streamArr);
                      }), /* array */[], param[/* images */2])));
}

function buildTextureData(param, param$1, param$2) {
  var imageNodeIdMap = param$1[1];
  var imageMap = param$1[0];
  return ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, textureIndex) {
                var source = param$1[/* source */1];
                var match = param[1];
                var match$1 = BasicSourceTextureEngineService$WonderEditor.create(match[1]);
                var texture = match$1[1];
                var engineState = BasicSourceTextureEngineService$WonderEditor.setSource(SparseMapService$WonderCommonlib.unsafeGet(source, imageMap), texture, BasicSourceTextureEngineService$WonderEditor.setBasicSourceTextureName(param$1[/* name */2], texture, BasicSourceTextureEngineService$WonderEditor.setFlipY(param$1[/* flipY */9], texture, BasicSourceTextureEngineService$WonderEditor.setType(param$1[/* type_ */8], texture, BasicSourceTextureEngineService$WonderEditor.setFormat(param$1[/* format */7], texture, BasicSourceTextureEngineService$WonderEditor.setMinFilter(param$1[/* minFilter */4], texture, BasicSourceTextureEngineService$WonderEditor.setMagFilter(param$1[/* magFilter */3], texture, BasicSourceTextureEngineService$WonderEditor.setWrapT(param$1[/* wrapT */6], texture, BasicSourceTextureEngineService$WonderEditor.setWrapS(param$1[/* wrapS */5], texture, match$1[0])))))))));
                var match$2 = AssetIdUtils$WonderEditor.generateAssetId(match[0]);
                var assetNodeId = match$2[1];
                var match$3 = HeaderImportFolderUtils$WonderEditor.buildFolder(param$1[/* path */0], /* tuple */[
                      match$2[0],
                      engineState
                    ]);
                var parentFolderNodeId = match$3[0];
                var editorState = AssetTreeUtils$WonderEditor.createNodeAndAddToTargetNodeChildren(OptionService$WonderEditor.unsafeGet(parentFolderNodeId), assetNodeId, /* Texture */1, TextureNodeMapAssetEditorService$WonderEditor.setResult(assetNodeId, TextureNodeMapAssetEditorService$WonderEditor.buildTextureNodeResult(texture, SparseMapService$WonderCommonlib.unsafeGet(source, imageNodeIdMap), Caml_option.some(parentFolderNodeId), /* () */0), match$3[1]));
                return /* tuple */[
                        SparseMapService$WonderCommonlib.set(textureIndex, texture, param[0]),
                        /* tuple */[
                          editorState,
                          engineState
                        ]
                      ];
              }), /* tuple */[
              SparseMapService$WonderCommonlib.createEmpty(/* () */0),
              /* tuple */[
                param$2[0],
                param$2[1]
              ]
            ], param[/* textures */1]);
}

function _buildMaterialEditorData(material, path, type_, param) {
  var match = AssetIdUtils$WonderEditor.generateAssetId(param[0]);
  var assetNodeId = match[1];
  var match$1 = HeaderImportFolderUtils$WonderEditor.buildFolder(path, /* tuple */[
        match[0],
        param[1]
      ]);
  var parentFolderNodeId = match$1[0];
  return AssetTreeUtils$WonderEditor.createNodeAndAddToTargetNodeChildren(OptionService$WonderEditor.unsafeGet(parentFolderNodeId), assetNodeId, /* Material */3, MaterialNodeMapAssetEditorService$WonderEditor.setResult(assetNodeId, MaterialNodeMapAssetEditorService$WonderEditor.buildMaterialNodeResult(type_, material, Caml_option.some(parentFolderNodeId), /* () */0), match$1[1]));
}

function _buildBasicMaterialData(basicMaterials, param) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, materialIndex) {
                var match = param[1];
                var match$1 = BasicMaterialEngineService$WonderEditor.create(match[1]);
                var material = match$1[1];
                var engineState = BasicMaterialEngineService$WonderEditor.setColor(param$1[/* color */2], material, BasicMaterialEngineService$WonderEditor.setBasicMaterialName(material, param$1[/* name */0], match$1[0]));
                var editorState = _buildMaterialEditorData(material, param$1[/* path */1], /* BasicMaterial */0, /* tuple */[
                      match[0],
                      engineState
                    ]);
                return /* tuple */[
                        SparseMapService$WonderCommonlib.set(materialIndex, material, param[0]),
                        /* tuple */[
                          editorState,
                          engineState
                        ]
                      ];
              }), /* tuple */[
              SparseMapService$WonderCommonlib.createEmpty(/* () */0),
              /* tuple */[
                param[0],
                param[1]
              ]
            ], basicMaterials);
}

function _buildLightMaterialData(lightMaterials, textureMap, param) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, materialIndex) {
                var diffuseMap = param$1[/* diffuseMap */3];
                var match = param[1];
                var match$1 = LightMaterialEngineService$WonderEditor.create(match[1]);
                var material = match$1[1];
                var engineState = LightMaterialEngineService$WonderEditor.setLightMaterialShininess(param$1[/* shininess */4], material, LightMaterialEngineService$WonderEditor.setLightMaterialDiffuseColor(param$1[/* diffuseColor */2], material, LightMaterialEngineService$WonderEditor.setLightMaterialName(material, param$1[/* name */0], match$1[0])));
                var match$2 = OptionService$WonderEditor.isJsonSerializedValueNone(diffuseMap);
                var engineState$1;
                if (match$2) {
                  engineState$1 = engineState;
                } else {
                  var diffuseMap$1 = OptionService$WonderEditor.unsafeGetJsonSerializedValue(diffuseMap);
                  engineState$1 = LightMaterialEngineService$WonderEditor.setLightMaterialDiffuseMap(SparseMapService$WonderCommonlib.unsafeGet(diffuseMap$1, textureMap), material, engineState);
                }
                var editorState = _buildMaterialEditorData(material, param$1[/* path */1], /* LightMaterial */1, /* tuple */[
                      match[0],
                      engineState$1
                    ]);
                return /* tuple */[
                        SparseMapService$WonderCommonlib.set(materialIndex, material, param[0]),
                        /* tuple */[
                          editorState,
                          engineState$1
                        ]
                      ];
              }), /* tuple */[
              SparseMapService$WonderCommonlib.createEmpty(/* () */0),
              /* tuple */[
                param[0],
                param[1]
              ]
            ], lightMaterials);
}

function buildMaterialData(param, textureMap, param$1) {
  var match = _buildBasicMaterialData(param[/* basicMaterials */3], /* tuple */[
        param$1[0],
        param$1[1]
      ]);
  var match$1 = match[1];
  var match$2 = _buildLightMaterialData(param[/* lightMaterials */4], textureMap, /* tuple */[
        match$1[0],
        match$1[1]
      ]);
  var match$3 = match$2[1];
  return /* tuple */[
          match[0],
          match$2[0],
          /* tuple */[
            match$3[0],
            match$3[1]
          ]
        ];
}

function addExtractedMateriialAssetDataToMaterialData(extractedMaterialAssetDataArr, param) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                var match = param$1[0];
                var material = match[0];
                var lightMaterialMap = param[1];
                var basicMaterialMap = param[0];
                if (match[1]) {
                  return /* tuple */[
                          basicMaterialMap,
                          SparseMapService$WonderEditor.push(material, lightMaterialMap)
                        ];
                } else {
                  return /* tuple */[
                          SparseMapService$WonderEditor.push(material, basicMaterialMap),
                          lightMaterialMap
                        ];
                }
              }), /* tuple */[
              param[0],
              param[1]
            ], extractedMaterialAssetDataArr);
}

function _mergeImageUint8ArrayDataMap(totalImageUint8ArrayDataMap, targetImageUint8ArrayDataMap) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("different wdb->imageUint8ArrayDataMap->key(texture) are different", "not"), (function (param) {
                        return Contract$WonderLog.Operators[/* = */0](SparseMapService$WonderEditor.getValidKeys(targetImageUint8ArrayDataMap).filter((function (texture) {
                                          return SparseMapService$WonderCommonlib.has(texture, totalImageUint8ArrayDataMap);
                                        })).length, 0);
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return SparseMapService$WonderEditor.mergeSparseMaps(/* array */[
              totalImageUint8ArrayDataMap,
              targetImageUint8ArrayDataMap
            ]);
}

function buildWDBData(param, buffer, param$1) {
  var bufferViews = param[/* bufferViews */6];
  StateEditorService$WonderEditor.setState(param$1[0]);
  StateEngineService$WonderEditor.setState(param$1[1]);
  var allGameObjectsArrRef = /* record */[/* contents : array */[]];
  return Most.drain(Most.concatMap((function (param) {
                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                      var arrayBuffer = _getArrayBuffer(buffer, param[/* bufferView */2], bufferViews);
                      var match = AssetIdUtils$WonderEditor.generateAssetId(editorState);
                      var match$1 = HeaderImportFolderUtils$WonderEditor.buildFolder(param[/* path */1], /* tuple */[
                            match[0],
                            engineState
                          ]);
                      return Most.fromPromise(HeaderImportASBWDBUtils$WonderEditor.importWDB(/* tuple */[
                                        param[/* name */0],
                                        arrayBuffer
                                      ], /* tuple */[
                                        match[1],
                                        OptionService$WonderEditor.unsafeGet(match$1[0])
                                      ], /* tuple */[
                                        match$1[1],
                                        engineState
                                      ]).then((function (param) {
                                        var match = param[1];
                                        var match$1 = param[0];
                                        var _wdbImageUint8ArrayDataMap = match$1[1];
                                        Contract$WonderLog.requireCheck((function (param) {
                                                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("wdbImageUint8ArrayDataMap be empty", "not"), (function (param) {
                                                              return Contract$WonderLog.Operators[/* = */0](SparseMapService$WonderEditor.length(_wdbImageUint8ArrayDataMap), 0);
                                                            }));
                                              }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
                                        StateEditorService$WonderEditor.setState(match[0]);
                                        StateEngineService$WonderEditor.setState(match[1]);
                                        allGameObjectsArrRef[0] = allGameObjectsArrRef[0].concat(match$1[0]);
                                        return Promise.resolve(/* () */0);
                                      })));
                    }), Most.from(param[/* wdbs */5]))).then((function (param) {
                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                return Promise.resolve(/* tuple */[
                            allGameObjectsArrRef[0],
                            /* tuple */[
                              editorState,
                              engineState
                            ]
                          ]);
              }));
}

export {
  _buildLoadImageStream ,
  _getArrayBuffer ,
  buildImageData ,
  buildTextureData ,
  _buildMaterialEditorData ,
  _buildBasicMaterialData ,
  _buildLightMaterialData ,
  buildMaterialData ,
  addExtractedMateriialAssetDataToMaterialData ,
  _mergeImageUint8ArrayDataMap ,
  buildWDBData ,
  
}
/* most Not a pure module */
