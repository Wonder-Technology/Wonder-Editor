

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_obj from "../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ImageUtils$WonderEditor from "../header/utils/ImageUtils.js";
import * as SparseMapService$WonderEditor from "../../../service/atom/SparseMapService.js";
import * as Uint8ArrayService$WonderEditor from "../../../service/primitive/Uint8ArrayService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as GeometryEngineService$WonderEditor from "../../../service/state/engine/GeometryEngineService.js";
import * as ConverterEngineService$WonderEditor from "../../../service/state/engine/ConverterEngineService.js";
import * as AllMaterialEngineService$WonderEditor from "../../../service/state/engine/AllMaterialEngineService.js";
import * as GeometryAssetLogicService$WonderEditor from "../../../service/stateTuple/logic/asset/GeometryAssetLogicService.js";
import * as MaterialAssetLogicService$WonderEditor from "../../../service/stateTuple/logic/asset/MaterialAssetLogicService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../service/state/engine/BasicMaterialEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../service/state/engine/LightMaterialEngineService.js";
import * as PrepareDefaultComponentUtils$WonderEditor from "../../utils/engine/PrepareDefaultComponentUtils.js";
import * as GeometryDataAssetEditorService$WonderEditor from "../../../service/state/editor/asset/GeometryDataAssetEditorService.js";
import * as ImageNodeMapAssetEditorService$WonderEditor from "../../../service/state/editor/asset/ImageNodeMapAssetEditorService.js";
import * as MaterialDataAssetEditorService$WonderEditor from "../../../service/state/editor/asset/MaterialDataAssetEditorService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../service/state/engine/BasicSourceTextureEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../service/state/engine/GameObjectComponentEngineService.js";
import * as TextureNodeMapAssetEditorService$WonderEditor from "../../../service/state/editor/asset/TextureNodeMapAssetEditorService.js";

function isValueEqual(key1, key2, getFunc, engineState) {
  return Caml_obj.caml_equal(Curry._2(getFunc, key1, engineState), Curry._2(getFunc, key2, engineState));
}

function _isNameEqual(name1, component2, param, engineState) {
  var isDefaultNameFunc = param[1];
  var match = Curry._2(param[0], component2, engineState);
  if (name1 !== undefined) {
    if (match !== undefined) {
      var name2 = Js_primitive.valFromOption(match);
      var name1$1 = Js_primitive.valFromOption(name1);
      var match$1 = Curry._1(isDefaultNameFunc, name1$1) && Curry._1(isDefaultNameFunc, name2);
      if (match$1) {
        return true;
      } else {
        return Caml_obj.caml_equal(name1$1, name2);
      }
    } else {
      return false;
    }
  } else {
    return match === undefined;
  }
}

function _isBasicMaterialNameEqual(name1, material2, engineState) {
  return _isNameEqual(name1, material2, /* tuple */[
              BasicMaterialEngineService$WonderEditor.getBasicMaterialName,
              ConverterEngineService$WonderEditor.isDefaultBasicMaterialName
            ], engineState);
}

function _isLightMaterialNameEqual(name1, material2, engineState) {
  return _isNameEqual(name1, material2, /* tuple */[
              LightMaterialEngineService$WonderEditor.getLightMaterialName,
              ConverterEngineService$WonderEditor.isDefaultLightMaterialName
            ], engineState);
}

function _isTextureNameEqual(name1, texture2, engineState) {
  return _isNameEqual(name1, texture2, /* tuple */[
              BasicSourceTextureEngineService$WonderEditor.getBasicSourceTextureName,
              ConverterEngineService$WonderEditor.isDefaultTextureName
            ], engineState);
}

function isGeometryNameEqual(name1, name2) {
  if (name1 !== undefined) {
    if (name2 !== undefined) {
      var name2$1 = name2;
      var name1$1 = name1;
      var match = ConverterEngineService$WonderEditor.isDefaultGeometryName(name1$1) && ConverterEngineService$WonderEditor.isDefaultGeometryName(name2$1);
      if (match) {
        return true;
      } else {
        return name1$1 === name2$1;
      }
    } else {
      return false;
    }
  } else {
    return name2 === undefined;
  }
}

function isImageNameEqual(name1, image2) {
  var name2 = ImageUtils$WonderEditor.getImageName(image2);
  var match = ConverterEngineService$WonderEditor.isDefaultImageName(name1) && ConverterEngineService$WonderEditor.isDefaultImageName(name2);
  if (match) {
    return true;
  } else {
    return name1 === name2;
  }
}

function isBasicMaterialDataEqual(param, material2, _, engineState) {
  if (_isBasicMaterialNameEqual(param[0], material2, engineState)) {
    return Caml_obj.caml_equal(param[1], BasicMaterialEngineService$WonderEditor.getColor(material2, engineState));
  } else {
    return false;
  }
}

function _isImageValueEqual(image1, image2, getFunc) {
  return Caml_obj.caml_equal(Curry._1(getFunc, image1), Curry._1(getFunc, image2));
}

function _getImageUint8ArrayByTextureComponent(textureComponent, editorState) {
  var match = TextureNodeMapAssetEditorService$WonderEditor.getResultByTextureComponent(textureComponent, editorState);
  if (match !== undefined) {
    return ImageNodeMapAssetEditorService$WonderEditor.getUint8Array(match[/* image */1], ImageNodeMapAssetEditorService$WonderEditor.getImageNodeMap(editorState));
  }
  
}

function isImageDataEqual(param, image2, texture2, imageUint8ArrayDataMap) {
  if (isImageNameEqual(param[0], image2) && Caml_obj.caml_equal(param[1], ImageUtils$WonderEditor.getImageWidth(image2)) && Caml_obj.caml_equal(param[2], ImageUtils$WonderEditor.getImageHeight(image2))) {
    var match = SparseMapService$WonderCommonlib.get(texture2, imageUint8ArrayDataMap);
    if (match !== undefined) {
      return Uint8ArrayService$WonderEditor.isUint8ArrayEqual(param[3], Js_primitive.some(match[1]));
    } else {
      return true;
    }
  } else {
    return false;
  }
}

function isTextureDataEqual(isImageDataEqualFunc, param, texture2, imageUint8ArrayDataMap, engineState) {
  if (_isTextureNameEqual(param[0], texture2, engineState) && param[1] === BasicSourceTextureEngineService$WonderEditor.getWrapS(texture2, engineState) && param[2] === BasicSourceTextureEngineService$WonderEditor.getWrapT(texture2, engineState) && param[3] === BasicSourceTextureEngineService$WonderEditor.getMinFilter(texture2, engineState) && param[4] === BasicSourceTextureEngineService$WonderEditor.getMagFilter(texture2, engineState)) {
    return Curry._4(isImageDataEqualFunc, param[5], BasicSourceTextureEngineService$WonderEditor.unsafeGetSource(texture2, engineState), texture2, imageUint8ArrayDataMap);
  } else {
    return false;
  }
}

function isLightMaterialDataEqual(param, material2, imageUint8ArrayDataMap, isTextureDataEqualFunc, engineState) {
  var textureData = param[3];
  if (_isLightMaterialNameEqual(param[0], material2, engineState) && Caml_obj.caml_equal(param[1], LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseColor(material2, engineState)) && param[2] === LightMaterialEngineService$WonderEditor.getLightMaterialShininess(material2, engineState)) {
    var match = LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseMap(material2, engineState);
    if (textureData !== undefined) {
      if (match !== undefined) {
        return Curry._4(isTextureDataEqualFunc, Js_primitive.valFromOption(textureData), match, imageUint8ArrayDataMap, engineState);
      } else {
        return false;
      }
    } else {
      return match === undefined;
    }
  } else {
    return false;
  }
}

function isEqualDefaultBasicMaterial(gameObjectMaterial, param, engineState) {
  return MaterialAssetLogicService$WonderEditor.isDefaultBasicMaterial(gameObjectMaterial, param[1][0], engineState);
}

function isEqualDefaultLightMaterial(gameObjectMaterial, param, engineState) {
  return MaterialAssetLogicService$WonderEditor.isDefaultLightMaterial(gameObjectMaterial, param[1][0], engineState);
}

function getRelatedMaterialData(gameObject, replacedTargetMaterialMap, imageUint8ArrayDataMap, param, param$1, engineState) {
  var isMaterialDataEqualFunc = param$1[2];
  var unsafeGetMaterialComponentFunc = param$1[0];
  var defaultMaterialData = param[2];
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("default material component has not been added to gameObject", "has"), (function () {
                        var material = Curry._2(unsafeGetMaterialComponentFunc, gameObject, engineState);
                        return material !== defaultMaterialData[0];
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  var material = Curry._2(unsafeGetMaterialComponentFunc, gameObject, engineState);
  var match = SparseMapService$WonderCommonlib.get(material, replacedTargetMaterialMap);
  var match$1;
  if (match !== undefined) {
    match$1 = /* tuple */[
      Js_primitive.valFromOption(match),
      replacedTargetMaterialMap
    ];
  } else {
    var match$2 = Curry._3(param$1[1], material, defaultMaterialData, engineState);
    var targetMaterial;
    if (match$2) {
      targetMaterial = defaultMaterialData[0];
    } else {
      var match$3 = SparseMapService$WonderEditor.find((function (param) {
              return Curry._4(isMaterialDataEqualFunc, param[1], material, imageUint8ArrayDataMap, engineState);
            }), param[1]);
      targetMaterial = match$3 !== undefined ? match$3[0] : undefined;
    }
    match$1 = /* tuple */[
      targetMaterial,
      SparseMapService$WonderCommonlib.set(material, targetMaterial, replacedTargetMaterialMap)
    ];
  }
  return /* tuple */[
          material,
          match$1[0],
          Js_primitive.some(param[0]),
          match$1[1]
        ];
}

function getRelatedMaterialDataFromGameObject(gameObject, replacedTargetMaterialMap, imageUint8ArrayDataMap, param, param$1, isLightMaterialDataEqualFunc, engineState) {
  var match = GameObjectComponentEngineService$WonderEditor.hasBasicMaterialComponent(gameObject, engineState);
  if (match) {
    return getRelatedMaterialData(gameObject, replacedTargetMaterialMap, imageUint8ArrayDataMap, /* tuple */[
                /* BasicMaterial */0,
                param$1[0],
                param[0]
              ], /* tuple */[
                GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent,
                isEqualDefaultBasicMaterial,
                isBasicMaterialDataEqual
              ], engineState);
  } else {
    var match$1 = GameObjectComponentEngineService$WonderEditor.hasLightMaterialComponent(gameObject, engineState);
    if (match$1) {
      return getRelatedMaterialData(gameObject, replacedTargetMaterialMap, imageUint8ArrayDataMap, /* tuple */[
                  /* LightMaterial */1,
                  param$1[1],
                  param[1]
                ], /* tuple */[
                  GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent,
                  isEqualDefaultLightMaterial,
                  isLightMaterialDataEqualFunc
                ], engineState);
    } else {
      return /* tuple */[
              undefined,
              undefined,
              undefined,
              replacedTargetMaterialMap
            ];
    }
  }
}

function doesNeedReplaceMaterial(param) {
  if (param[0] !== undefined && param[1] !== undefined) {
    return param[2] !== undefined;
  } else {
    return false;
  }
}

function replaceToMaterialAssetMaterialComponent(gameObject, param, engineState) {
  var materialType = param[2];
  var targetMaterial = param[1];
  var sourceMaterial = param[0];
  if (sourceMaterial !== undefined && targetMaterial !== undefined && materialType !== undefined) {
    var targetMaterial$1 = targetMaterial;
    var sourceMaterial$1 = sourceMaterial;
    if (materialType) {
      return GameObjectComponentEngineService$WonderEditor.addLightMaterialComponent(gameObject, targetMaterial$1, GameObjectComponentEngineService$WonderEditor.disposeLightMaterialComponent(gameObject, sourceMaterial$1, engineState));
    } else {
      return GameObjectComponentEngineService$WonderEditor.addBasicMaterialComponent(gameObject, targetMaterial$1, GameObjectComponentEngineService$WonderEditor.disposeBasicMaterialComponent(gameObject, sourceMaterial$1, engineState));
    }
  } else {
    return engineState;
  }
}

function getRelatedTextureData(gameObject, replacedTargetTextureMap, textureAssetDataMap, imageUint8ArrayDataMap, param, param$1) {
  var engineState = param$1[1];
  var material = Curry._2(param[0], gameObject, engineState);
  var match = Curry._2(param[1], material, engineState);
  if (match !== undefined) {
    var sourceTexture = match;
    var match$1 = SparseMapService$WonderCommonlib.get(sourceTexture, replacedTargetTextureMap);
    var match$2;
    if (match$1 !== undefined) {
      match$2 = /* tuple */[
        Js_primitive.valFromOption(match$1),
        replacedTargetTextureMap
      ];
    } else {
      var match$3 = SparseMapService$WonderEditor.find((function (param) {
              return isTextureDataEqual(isImageDataEqual, param[1], sourceTexture, imageUint8ArrayDataMap, engineState);
            }), textureAssetDataMap);
      var targetTexture = match$3 !== undefined ? Js_primitive.some(match$3[0]) : undefined;
      match$2 = /* tuple */[
        targetTexture,
        SparseMapService$WonderCommonlib.set(sourceTexture, targetTexture, replacedTargetTextureMap)
      ];
    }
    return /* tuple */[
            sourceTexture,
            match$2[0],
            Js_primitive.some(param[2]),
            match$2[1]
          ];
  } else {
    return /* tuple */[
            undefined,
            undefined,
            undefined,
            replacedTargetTextureMap
          ];
  }
}

function doesNeedReplaceTexture(param) {
  if (param[0] !== undefined) {
    return param[1] !== undefined;
  } else {
    return false;
  }
}

function getRelatedTextureDataFromGameObject(gameObject, replacedTargetTextureMap, textureAssetDataMap, imageUint8ArrayDataMap, param) {
  var engineState = param[1];
  var match = GameObjectComponentEngineService$WonderEditor.hasBasicMaterialComponent(gameObject, engineState);
  if (match) {
    return /* tuple */[
            undefined,
            undefined,
            undefined,
            replacedTargetTextureMap
          ];
  } else {
    var match$1 = GameObjectComponentEngineService$WonderEditor.hasLightMaterialComponent(gameObject, engineState);
    if (match$1) {
      return getRelatedTextureData(gameObject, replacedTargetTextureMap, textureAssetDataMap, imageUint8ArrayDataMap, /* tuple */[
                  GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent,
                  LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseMap,
                  LightMaterialEngineService$WonderEditor.setLightMaterialDiffuseMap
                ], /* tuple */[
                  param[0],
                  engineState
                ]);
    } else {
      return /* tuple */[
              undefined,
              undefined,
              undefined,
              replacedTargetTextureMap
            ];
    }
  }
}

function replaceToTextureAssetTextureComponent(gameObject, param, param$1) {
  var engineState = param$1[1];
  var setMapFunc = param[1];
  var targetTexture = param[0];
  if (targetTexture !== undefined && setMapFunc !== undefined) {
    var match = AllMaterialEngineService$WonderEditor.getMaterialComponent(gameObject, /* tuple */[
          param$1[0],
          engineState
        ]);
    if (match !== undefined) {
      return Curry._3(setMapFunc, Js_primitive.valFromOption(targetTexture), match, engineState);
    } else {
      return engineState;
    }
  } else {
    return engineState;
  }
}

function getGeometryData(geometry, engineState) {
  return /* tuple */[
          GeometryEngineService$WonderEditor.getGeometryName(geometry, engineState),
          GeometryEngineService$WonderEditor.getGeometryVertices(geometry, engineState),
          GeometryEngineService$WonderEditor.getGeometryNormals(geometry, engineState),
          GeometryEngineService$WonderEditor.getGeometryTexCoords(geometry, engineState)
        ];
}

function isGeometryDataEqualForDefaultGeometry(param, param$1, _) {
  return isGeometryNameEqual(param[0], param$1[0]);
}

function isDefaultGeometry(geometry, param) {
  var engineState = param[1];
  var editorState = param[0];
  var defaultCubeGeometry = GeometryDataAssetEditorService$WonderEditor.unsafeGetDefaultCubeGeometryComponent(editorState);
  var defaultCubeGeometryName = PrepareDefaultComponentUtils$WonderEditor.getDefaultCubeGeometryName(/* () */0);
  var defaultSphereGeometry = GeometryDataAssetEditorService$WonderEditor.unsafeGetDefaultSphereGeometryComponent(editorState);
  var defaultSphereGeometryName = PrepareDefaultComponentUtils$WonderEditor.getDefaultSphereGeometryName(/* () */0);
  if (GeometryAssetLogicService$WonderEditor.isGeometryEqualDefaultGeometryData(geometry, defaultCubeGeometry, defaultCubeGeometryName, engineState)) {
    return true;
  } else {
    return GeometryAssetLogicService$WonderEditor.isGeometryEqualDefaultGeometryData(geometry, defaultSphereGeometry, defaultSphereGeometryName, engineState);
  }
}

function getTargetGeometryByJudgeDefaultGeometry(geometryData, param, isGeometryDataEqualFunc, engineState) {
  var match = param[1];
  var match$1 = param[0];
  var match$2 = Curry._3(isGeometryDataEqualFunc, geometryData, match$1[2], engineState);
  if (match$2) {
    return Js_primitive.some(match$1[0]);
  } else {
    var match$3 = Curry._3(isGeometryDataEqualFunc, geometryData, match[2], engineState);
    if (match$3) {
      return Js_primitive.some(match[0]);
    } else {
      return undefined;
    }
  }
}

function replaceGeometryComponent(gameObject, sourceGeomtry, targetGeometry, engineState) {
  if (targetGeometry !== undefined) {
    return GameObjectComponentEngineService$WonderEditor.addGeometryComponent(gameObject, targetGeometry, GameObjectComponentEngineService$WonderEditor.disposeGeometryComponent(gameObject, sourceGeomtry, engineState));
  } else {
    return engineState;
  }
}

function replaceWDBAssetGameObjectGeometryComponentToDefaultGeometryComponent(gameObject, param, engineState) {
  var match = param[1];
  var match$1 = param[0];
  var match$2 = GameObjectComponentEngineService$WonderEditor.getGeometryComponent(gameObject, engineState);
  if (match$2 !== undefined) {
    var geometry = match$2;
    var targetGeometry = getTargetGeometryByJudgeDefaultGeometry(getGeometryData(geometry, engineState), /* tuple */[
          /* tuple */[
            match$1[0],
            match$1[1],
            match$1[2]
          ],
          /* tuple */[
            match[0],
            match[1],
            match[2]
          ]
        ], isGeometryDataEqualForDefaultGeometry, engineState);
    return replaceGeometryComponent(gameObject, geometry, targetGeometry, engineState);
  } else {
    return engineState;
  }
}

function getDefaultGeometryData(editorState, engineState) {
  var defaultGeometry = GeometryDataAssetEditorService$WonderEditor.unsafeGetDefaultCubeGeometryComponent(editorState);
  var defaultCubeGeometryData_001 = PrepareDefaultComponentUtils$WonderEditor.getDefaultCubeGeometryName(/* () */0);
  var defaultCubeGeometryData_002 = getGeometryData(defaultGeometry, engineState);
  var defaultCubeGeometryData = /* tuple */[
    defaultGeometry,
    defaultCubeGeometryData_001,
    defaultCubeGeometryData_002
  ];
  var defaultGeometry$1 = GeometryDataAssetEditorService$WonderEditor.unsafeGetDefaultSphereGeometryComponent(editorState);
  var defaultSphereGeometryData_001 = PrepareDefaultComponentUtils$WonderEditor.getDefaultSphereGeometryName(/* () */0);
  var defaultSphereGeometryData_002 = getGeometryData(defaultGeometry$1, engineState);
  var defaultSphereGeometryData = /* tuple */[
    defaultGeometry$1,
    defaultSphereGeometryData_001,
    defaultSphereGeometryData_002
  ];
  return /* tuple */[
          defaultCubeGeometryData,
          defaultSphereGeometryData
        ];
}

function getBasicMaterialData(material, engineState) {
  return /* tuple */[
          BasicMaterialEngineService$WonderEditor.getBasicMaterialName(material, engineState),
          BasicMaterialEngineService$WonderEditor.getColor(material, engineState)
        ];
}

function _getImageData(image, texture, editorState) {
  return /* tuple */[
          ImageUtils$WonderEditor.getImageName(image),
          ImageUtils$WonderEditor.getImageWidth(image),
          ImageUtils$WonderEditor.getImageHeight(image),
          _getImageUint8ArrayByTextureComponent(texture, editorState)
        ];
}

function getTextureData(texture, param) {
  var engineState = param[1];
  return /* tuple */[
          BasicSourceTextureEngineService$WonderEditor.getBasicSourceTextureName(texture, engineState),
          BasicSourceTextureEngineService$WonderEditor.getWrapS(texture, engineState),
          BasicSourceTextureEngineService$WonderEditor.getWrapT(texture, engineState),
          BasicSourceTextureEngineService$WonderEditor.getMinFilter(texture, engineState),
          BasicSourceTextureEngineService$WonderEditor.getMagFilter(texture, engineState),
          _getImageData(BasicSourceTextureEngineService$WonderEditor.unsafeGetSource(texture, engineState), texture, param[0])
        ];
}

function getLightMaterialData(material, param) {
  var engineState = param[1];
  var match = LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseMap(material, engineState);
  return /* tuple */[
          LightMaterialEngineService$WonderEditor.getLightMaterialName(material, engineState),
          LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseColor(material, engineState),
          LightMaterialEngineService$WonderEditor.getLightMaterialShininess(material, engineState),
          match !== undefined ? getTextureData(match, /* tuple */[
                  param[0],
                  engineState
                ]) : undefined
        ];
}

function getDefaultMaterialData(editorState, engineState) {
  var defaultBasicMaterial = MaterialDataAssetEditorService$WonderEditor.unsafeGetDefaultBasicMaterial(editorState);
  var defaultBasicMaterialData_001 = getBasicMaterialData(defaultBasicMaterial, engineState);
  var defaultBasicMaterialData = /* tuple */[
    defaultBasicMaterial,
    defaultBasicMaterialData_001
  ];
  var defaultLightMaterial = MaterialDataAssetEditorService$WonderEditor.unsafeGetDefaultLightMaterial(editorState);
  var defaultLightMaterialData_001 = getLightMaterialData(defaultLightMaterial, /* tuple */[
        editorState,
        engineState
      ]);
  var defaultLightMaterialData = /* tuple */[
    defaultLightMaterial,
    defaultLightMaterialData_001
  ];
  return /* tuple */[
          defaultBasicMaterialData,
          defaultLightMaterialData
        ];
}

function getBasicMaterialDataMap(basicMaterialMap, engineState) {
  return SparseMapService$WonderEditor.getValidValues(basicMaterialMap).map((function (material) {
                return /* tuple */[
                        material,
                        getBasicMaterialData(material, engineState)
                      ];
              }));
}

function getLightMaterialDataMap(lightMaterialMap, param) {
  var engineState = param[1];
  var editorState = param[0];
  return SparseMapService$WonderEditor.getValidValues(lightMaterialMap).map((function (material) {
                return /* tuple */[
                        material,
                        getLightMaterialData(material, /* tuple */[
                              editorState,
                              engineState
                            ])
                      ];
              }));
}

export {
  isValueEqual ,
  _isNameEqual ,
  _isBasicMaterialNameEqual ,
  _isLightMaterialNameEqual ,
  _isTextureNameEqual ,
  isGeometryNameEqual ,
  isImageNameEqual ,
  isBasicMaterialDataEqual ,
  _isImageValueEqual ,
  _getImageUint8ArrayByTextureComponent ,
  isImageDataEqual ,
  isTextureDataEqual ,
  isLightMaterialDataEqual ,
  isEqualDefaultBasicMaterial ,
  isEqualDefaultLightMaterial ,
  getRelatedMaterialData ,
  getRelatedMaterialDataFromGameObject ,
  doesNeedReplaceMaterial ,
  replaceToMaterialAssetMaterialComponent ,
  getRelatedTextureData ,
  doesNeedReplaceTexture ,
  getRelatedTextureDataFromGameObject ,
  replaceToTextureAssetTextureComponent ,
  getGeometryData ,
  isGeometryDataEqualForDefaultGeometry ,
  isDefaultGeometry ,
  getTargetGeometryByJudgeDefaultGeometry ,
  replaceGeometryComponent ,
  replaceWDBAssetGameObjectGeometryComponentToDefaultGeometryComponent ,
  getDefaultGeometryData ,
  getBasicMaterialData ,
  _getImageData ,
  getTextureData ,
  getLightMaterialData ,
  getDefaultMaterialData ,
  getBasicMaterialDataMap ,
  getLightMaterialDataMap ,
  
}
/* Log-WonderLog Not a pure module */
