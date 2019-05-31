

import * as Most from "most";
import * as Caml_option from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Blob$WonderEditor from "../../../../external/Blob.js";
import * as Contract$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ImageUtils$WonderEditor from "../ImageUtils.js";
import * as ArrayService$WonderEditor from "../../../../../service/atom/ArrayService.js";
import * as AssembleABSystem$Wonderjs from "../../../../../../../../node_modules/wonder.js/lib/es6_global/src/asset_bundle/import/assemble/AssembleABSystem.js";
import * as OptionService$WonderEditor from "../../../../../service/primitive/OptionService.js";
import * as LoadImageUtils$WonderEditor from "../LoadImageUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as StateEditorService$WonderEditor from "../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../service/state/engine/state/StateEngineService.js";
import * as IdAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/IdAssetEditorService.js";
import * as HeaderImportASBWDBUtils$WonderEditor from "./HeaderImportASBWDBUtils.js";
import * as IndexAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/IndexAssetEditorService.js";
import * as TextureNodeAssetService$WonderEditor from "../../../../../service/record/editor/asset/TextureNodeAssetService.js";
import * as ImageDataMapAssetService$WonderEditor from "../../../../../service/record/editor/asset/ImageDataMapAssetService.js";
import * as MaterialNodeAssetService$WonderEditor from "../../../../../service/record/editor/asset/MaterialNodeAssetService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../service/state/engine/LightMaterialEngineService.js";
import * as AssetBundleNodeAssetService$WonderEditor from "../../../../../service/record/editor/asset/AssetBundleNodeAssetService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";
import * as OperateTreeAssetLogicService$WonderEditor from "../../../../../service/stateTuple/logic/asset/OperateTreeAssetLogicService.js";
import * as TextureNodeAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/TextureNodeAssetEditorService.js";
import * as ImageDataMapAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/ImageDataMapAssetEditorService.js";
import * as MaterialNodeAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/MaterialNodeAssetEditorService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../service/state/engine/BasicSourceTextureEngineService.js";
import * as ScriptAttributeNodeAssetService$WonderEditor from "../../../../../service/record/editor/asset/ScriptAttributeNodeAssetService.js";
import * as AssetBundleNodeAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/AssetBundleNodeAssetEditorService.js";
import * as ScriptEventFunctionNodeAssetService$WonderEditor from "../../../../../service/record/editor/asset/ScriptEventFunctionNodeAssetService.js";
import * as ScriptAttributeNodeAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/ScriptAttributeNodeAssetEditorService.js";
import * as ScriptEventFunctionNodeAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/ScriptEventFunctionNodeAssetEditorService.js";

function _buildLoadImageStream(blob, blobObjectURL, mimeType, errorMsg) {
  return Most.tap((function (image) {
                return Blob$WonderEditor.revokeObjectURL(blob);
              }), LoadImageUtils$WonderEditor.loadBlobImage(blobObjectURL, errorMsg));
}

function _getArrayBuffer(buffer, bufferView, bufferViews) {
  var match = bufferViews[bufferView];
  var byteOffset = match[/* byteOffset */0];
  return buffer.slice(byteOffset, byteOffset + match[/* byteLength */1] | 0);
}

function buildImageData(param, buffer, editorState) {
  var bufferViews = param[/* bufferViews */9];
  return Most.reduce((function (param, param$1) {
                var imageIndex = param$1[2];
                var match = IndexAssetEditorService$WonderEditor.generateImageDataMapIndex(param[2]);
                var imageDataIndex = match[1];
                return /* tuple */[
                        ImmutableSparseMapService$WonderCommonlib.set(imageIndex, param$1[0], param[0]),
                        ImmutableSparseMapService$WonderCommonlib.set(imageIndex, imageDataIndex, param[1]),
                        ImageDataMapAssetEditorService$WonderEditor.setData(imageDataIndex, ImageDataMapAssetService$WonderEditor.buildData(undefined, undefined, param$1[3], param$1[4], Caml_option.some(param$1[1]), /* () */0), match[0])
                      ];
              }), /* tuple */[
              ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
              ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
              editorState
            ], Most.mergeArray(ArrayService$WonderCommonlib.reduceOneParami((function (streamArr, param, imageIndex) {
                        var mimeType = param[/* mimeType */2];
                        var name = param[/* name */0];
                        var arrayBuffer = _getArrayBuffer(buffer, param[/* bufferView */1], bufferViews);
                        var blob = Blob$WonderEditor.newBlobFromArrayBuffer(arrayBuffer, mimeType);
                        var blobObjectURL = Blob$WonderEditor.createObjectURL(blob);
                        return ArrayService$WonderEditor.push(Most.map((function (image) {
                                          return /* tuple */[
                                                  image,
                                                  blobObjectURL,
                                                  imageIndex,
                                                  name,
                                                  mimeType
                                                ];
                                        }), Most.map((function (image) {
                                              ImageUtils$WonderEditor.setImageName(image, name);
                                              return image;
                                            }), _buildLoadImageStream(blob, blobObjectURL, mimeType, "load image error. imageIndex: " + (String(imageIndex) + "")))), streamArr);
                      }), /* array */[], param[/* images */2])));
}

function buildTextureData(param, param$1, param$2) {
  var imageDataIndexMap = param$1[1];
  var imageMap = param$1[0];
  return ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, textureIndex) {
                var source = param$1[/* source */1];
                var match = param[1];
                var match$1 = BasicSourceTextureEngineService$WonderEditor.create(match[1]);
                var texture = match$1[1];
                var engineState = BasicSourceTextureEngineService$WonderEditor.setSource(ImmutableSparseMapService$WonderCommonlib.unsafeGet(source, imageMap), texture, BasicSourceTextureEngineService$WonderEditor.setBasicSourceTextureName(param$1[/* name */2], texture, BasicSourceTextureEngineService$WonderEditor.setFlipY(param$1[/* flipY */9], texture, BasicSourceTextureEngineService$WonderEditor.setType(param$1[/* type_ */8], texture, BasicSourceTextureEngineService$WonderEditor.setFormat(param$1[/* format */7], texture, BasicSourceTextureEngineService$WonderEditor.setMinFilter(param$1[/* minFilter */4], texture, BasicSourceTextureEngineService$WonderEditor.setMagFilter(param$1[/* magFilter */3], texture, BasicSourceTextureEngineService$WonderEditor.setWrapT(param$1[/* wrapT */6], texture, BasicSourceTextureEngineService$WonderEditor.setWrapS(param$1[/* wrapS */5], texture, match$1[0])))))))));
                var match$2 = IdAssetEditorService$WonderEditor.generateNodeId(match[0]);
                var match$3 = OperateTreeAssetLogicService$WonderEditor.addFolderNodesToTreeByPath(param$1[/* path */0], /* tuple */[
                      match$2[0],
                      engineState
                    ]);
                var editorState = TextureNodeAssetEditorService$WonderEditor.addTextureNodeToAssetTree(match$3[1], TextureNodeAssetService$WonderEditor.buildNode(match$2[1], texture, ImmutableSparseMapService$WonderCommonlib.unsafeGet(source, imageDataIndexMap)), match$3[0]);
                return /* tuple */[
                        ImmutableSparseMapService$WonderCommonlib.set(textureIndex, texture, param[0]),
                        /* tuple */[
                          editorState,
                          engineState
                        ]
                      ];
              }), /* tuple */[
              ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
              /* tuple */[
                param$2[0],
                param$2[1]
              ]
            ], param[/* textures */1]);
}

function _addMaterialToAssetTree(param, param$1, param$2) {
  var match = IdAssetEditorService$WonderEditor.generateNodeId(param$2[0]);
  var match$1 = OperateTreeAssetLogicService$WonderEditor.addFolderNodesToTreeByPath(param[1], /* tuple */[
        match[0],
        param$2[1]
      ]);
  return MaterialNodeAssetEditorService$WonderEditor.addMaterialNodeToAssetTree(match$1[1], MaterialNodeAssetService$WonderEditor.buildNode(match[1], param[2], param[0], ImmutableSparseMapService$WonderCommonlib.unsafeGet(param$1[0], param$1[1])), match$1[0]);
}

function _buildBasicMaterialData(basicMaterials, imageDataIndexMap, param) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, materialIndex) {
                var match = param[1];
                var match$1 = BasicMaterialEngineService$WonderEditor.create(match[1]);
                var material = match$1[1];
                var engineState = BasicMaterialEngineService$WonderEditor.setColor(param$1[/* color */3], material, BasicMaterialEngineService$WonderEditor.setBasicMaterialName(param$1[/* name */0], material, match$1[0]));
                var editorState = _addMaterialToAssetTree(/* tuple */[
                      material,
                      param$1[/* path */1],
                      /* BasicMaterial */0
                    ], /* tuple */[
                      param$1[/* snapshot */2],
                      imageDataIndexMap
                    ], /* tuple */[
                      match[0],
                      engineState
                    ]);
                return /* tuple */[
                        ImmutableSparseMapService$WonderCommonlib.set(materialIndex, material, param[0]),
                        /* tuple */[
                          editorState,
                          engineState
                        ]
                      ];
              }), /* tuple */[
              ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
              /* tuple */[
                param[0],
                param[1]
              ]
            ], basicMaterials);
}

function _buildLightMaterialData(lightMaterials, param, param$1) {
  var textureMap = param[1];
  var imageDataIndexMap = param[0];
  return ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, materialIndex) {
                var diffuseMap = param$1[/* diffuseMap */4];
                var match = param[1];
                var match$1 = LightMaterialEngineService$WonderEditor.create(match[1]);
                var material = match$1[1];
                var engineState = LightMaterialEngineService$WonderEditor.setLightMaterialShininess(param$1[/* shininess */5], material, LightMaterialEngineService$WonderEditor.setLightMaterialDiffuseColor(param$1[/* diffuseColor */3], material, LightMaterialEngineService$WonderEditor.setLightMaterialName(param$1[/* name */0], material, match$1[0])));
                var match$2 = OptionService$WonderEditor.isJsonSerializedValueNone(diffuseMap);
                var engineState$1;
                if (match$2) {
                  engineState$1 = engineState;
                } else {
                  var diffuseMap$1 = OptionService$WonderEditor.unsafeGetJsonSerializedValue(diffuseMap);
                  engineState$1 = LightMaterialEngineService$WonderEditor.setLightMaterialDiffuseMap(ImmutableSparseMapService$WonderCommonlib.unsafeGet(diffuseMap$1, textureMap), material, engineState);
                }
                var editorState = _addMaterialToAssetTree(/* tuple */[
                      material,
                      param$1[/* path */1],
                      /* LightMaterial */1
                    ], /* tuple */[
                      param$1[/* snapshot */2],
                      imageDataIndexMap
                    ], /* tuple */[
                      match[0],
                      engineState$1
                    ]);
                return /* tuple */[
                        ImmutableSparseMapService$WonderCommonlib.set(materialIndex, material, param[0]),
                        /* tuple */[
                          editorState,
                          engineState$1
                        ]
                      ];
              }), /* tuple */[
              ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
              /* tuple */[
                param$1[0],
                param$1[1]
              ]
            ], lightMaterials);
}

function buildMaterialData(param, param$1, param$2) {
  var imageDataIndexMap = param$1[0];
  var match = _buildBasicMaterialData(param[/* basicMaterials */3], imageDataIndexMap, /* tuple */[
        param$2[0],
        param$2[1]
      ]);
  var match$1 = match[1];
  var match$2 = _buildLightMaterialData(param[/* lightMaterials */4], /* tuple */[
        imageDataIndexMap,
        param$1[1]
      ], /* tuple */[
        match$1[0],
        match$1[1]
      ]);
  var match$3 = match$2[1];
  return /* tuple */[
          imageDataIndexMap,
          /* tuple */[
            match[0],
            match$2[0]
          ],
          /* tuple */[
            match$3[0],
            match$3[1]
          ]
        ];
}

function _addScriptEventFunctionToAssetTree(eventFunctionData, path, name, engineState, editorState) {
  var match = IdAssetEditorService$WonderEditor.generateNodeId(editorState);
  var match$1 = OperateTreeAssetLogicService$WonderEditor.addFolderNodesToTreeByPath(path, /* tuple */[
        match[0],
        engineState
      ]);
  return ScriptEventFunctionNodeAssetEditorService$WonderEditor.addScriptEventFunctionNodeToAssetTree(match$1[1], ScriptEventFunctionNodeAssetService$WonderEditor.buildNode(match[1], name, eventFunctionData), match$1[0]);
}

function buildScriptEventFunctionData(param, engineState, editorState) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, scriptEventFunctionIndex) {
                var name = param$1[/* name */0];
                var eventFunctionData = AssembleABSystem$Wonderjs.RAB[/* convertEventFunctionDataStrToRecord */10](param$1[/* eventFunctionDataStr */2]);
                var editorState = _addScriptEventFunctionToAssetTree(eventFunctionData, param$1[/* path */1], name, engineState, param[1]);
                return /* tuple */[
                        ImmutableSparseMapService$WonderCommonlib.set(scriptEventFunctionIndex, /* tuple */[
                              name,
                              eventFunctionData
                            ], param[0]),
                        editorState
                      ];
              }), /* tuple */[
              ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
              editorState
            ], param[/* scriptEventFunctions */6]);
}

function _addScriptAttributeToAssetTree(attribute, path, name, engineState, editorState) {
  var match = IdAssetEditorService$WonderEditor.generateNodeId(editorState);
  var match$1 = OperateTreeAssetLogicService$WonderEditor.addFolderNodesToTreeByPath(path, /* tuple */[
        match[0],
        engineState
      ]);
  return ScriptAttributeNodeAssetEditorService$WonderEditor.addScriptAttributeNodeToAssetTree(match$1[1], ScriptAttributeNodeAssetService$WonderEditor.buildNode(match[1], name, attribute), match$1[0]);
}

function buildScriptAttributeData(param, engineState, editorState) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, scriptAttributeIndex) {
                var name = param$1[/* name */0];
                var attribute = AssembleABSystem$Wonderjs.RAB[/* convertAttributeStrToRecord */12](param$1[/* attributeStr */2]);
                var editorState = _addScriptAttributeToAssetTree(attribute, param$1[/* path */1], name, engineState, param[1]);
                return /* tuple */[
                        ImmutableSparseMapService$WonderCommonlib.set(scriptAttributeIndex, /* tuple */[
                              name,
                              attribute
                            ], param[0]),
                        editorState
                      ];
              }), /* tuple */[
              ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
              editorState
            ], param[/* scriptAttributes */7]);
}

function _addAssetBundleToAssetTree(param, engineState, editorState) {
  var match = IdAssetEditorService$WonderEditor.generateNodeId(editorState);
  var match$1 = OperateTreeAssetLogicService$WonderEditor.addFolderNodesToTreeByPath(param[1], /* tuple */[
        match[0],
        engineState
      ]);
  return AssetBundleNodeAssetEditorService$WonderEditor.addAssetBundleNodeToAssetTree(match$1[1], AssetBundleNodeAssetService$WonderEditor.buildNode(match[1], param[0], param[3], param[2]), match$1[0]);
}

function buildAssetBundleData(param, buffer, engineState, editorState) {
  var bufferViews = param[/* bufferViews */9];
  return ArrayService$WonderCommonlib.reduceOneParam((function (editorState, param) {
                var assetBundle = _getArrayBuffer(buffer, param[/* assetBundleBufferView */3], bufferViews);
                return _addAssetBundleToAssetTree(/* tuple */[
                            param[/* name */0],
                            param[/* path */1],
                            param[/* type_ */2],
                            assetBundle
                          ], engineState, editorState);
              }), editorState, param[/* assetBundles */8]);
}

function _mergeImageUint8ArrayDataMap(totalImageUint8ArrayDataMap, targetImageUint8ArrayDataMap) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("different wdb->imageUint8ArrayDataMap->key(texture) are different", "not"), (function (param) {
                        return Contract$WonderLog.Operators[/* = */0](ImmutableSparseMapService$WonderCommonlib.getValidKeys(targetImageUint8ArrayDataMap).filter((function (texture) {
                                          return ImmutableSparseMapService$WonderCommonlib.has(texture, totalImageUint8ArrayDataMap);
                                        })).length, 0);
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return ImmutableSparseMapService$WonderCommonlib.mergeSparseMaps(/* array */[
              totalImageUint8ArrayDataMap,
              targetImageUint8ArrayDataMap
            ]);
}

function buildWDBData(imageDataIndexMap, param, buffer, param$1) {
  var bufferViews = param[/* bufferViews */9];
  StateEditorService$WonderEditor.setState(param$1[0]);
  StateEngineService$WonderEditor.setState(param$1[1]);
  var allGameObjectsArrRef = /* record */[/* contents : array */[]];
  return Most.drain(Most.concatMap((function (param) {
                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                      var arrayBuffer = _getArrayBuffer(buffer, param[/* bufferView */2], bufferViews);
                      var match = IdAssetEditorService$WonderEditor.generateNodeId(editorState);
                      var match$1 = OperateTreeAssetLogicService$WonderEditor.addFolderNodesToTreeByPath(param[/* path */1], /* tuple */[
                            match[0],
                            engineState
                          ]);
                      return Most.fromPromise(HeaderImportASBWDBUtils$WonderEditor.importWDB(/* tuple */[
                                        imageDataIndexMap,
                                        param[/* snapshot */3],
                                        param[/* name */0],
                                        arrayBuffer
                                      ], /* tuple */[
                                        match[1],
                                        match$1[1]
                                      ], /* tuple */[
                                        match$1[0],
                                        engineState
                                      ]).then((function (param) {
                                        var match = param[1];
                                        var match$1 = param[0];
                                        var _wdbImageUint8ArrayDataMap = match$1[1];
                                        Contract$WonderLog.requireCheck((function (param) {
                                                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("wdbImageUint8ArrayDataMap be empty", "not"), (function (param) {
                                                              return Contract$WonderLog.Operators[/* = */0](ImmutableSparseMapService$WonderCommonlib.length(_wdbImageUint8ArrayDataMap), 0);
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
  _addMaterialToAssetTree ,
  _buildBasicMaterialData ,
  _buildLightMaterialData ,
  buildMaterialData ,
  _addScriptEventFunctionToAssetTree ,
  buildScriptEventFunctionData ,
  _addScriptAttributeToAssetTree ,
  buildScriptAttributeData ,
  _addAssetBundleToAssetTree ,
  buildAssetBundleData ,
  _mergeImageUint8ArrayDataMap ,
  buildWDBData ,
  
}
/* most Not a pure module */
