

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ImageUtils$WonderEditor from "../../../../../../../../../../header/utils/ImageUtils.js";
import * as ArrayService$WonderEditor from "../../../../../../../../../../../../service/atom/ArrayService.js";
import * as AssetIdUtils$WonderEditor from "../../../utils/AssetIdUtils.js";
import * as AssetTreeUtils$WonderEditor from "../../utils/AssetTreeUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SparseMapService$WonderEditor from "../../../../../../../../../../../../service/atom/SparseMapService.js";
import * as AddFolderNodeUtils$WonderEditor from "../../utils/AddFolderNodeUtils.js";
import * as AddTextureNodeUtils$WonderEditor from "../../utils/AddTextureNodeUtils.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as AddMaterialNodeUtils$WonderEditor from "../../utils/AddMaterialNodeUtils.js";
import * as MainEditorMaterialUtils$WonderEditor from "../../../../../../../../inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/utils/MainEditorMaterialUtils.js";
import * as OperateTextureLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/OperateTextureLogicService.js";
import * as RelateGameObjectAndAssetUtils$WonderEditor from "../../../../../../../../../../utils/RelateGameObjectAndAssetUtils.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/BasicSourceTextureEngineService.js";
import * as TextureNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/TextureNodeMapAssetEditorService.js";
import * as MaterialNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/MaterialNodeMapAssetEditorService.js";
import * as IterateAssetTreeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/IterateAssetTreeAssetEditorService.js";

function _hasExtractedAsset(key, hasExtractedAssetMap) {
  var match = SparseMapService$WonderCommonlib.get(key, hasExtractedAssetMap);
  if (match !== undefined && match) {
    return true;
  } else {
    return false;
  }
}

function _isLightMaterialDataEqual(param, material2, imageUint8ArrayDataMap, engineState) {
  return RelateGameObjectAndAssetUtils$WonderEditor.isLightMaterialDataEqual(/* tuple */[
              param[0],
              param[1],
              param[2],
              param[3]
            ], material2, imageUint8ArrayDataMap, (function (param, param$1, param$2, param$3) {
                return RelateGameObjectAndAssetUtils$WonderEditor.isTextureDataEqual(RelateGameObjectAndAssetUtils$WonderEditor.isImageDataEqual, param, param$1, param$2, param$3);
              }), engineState);
}

function _extractAndRelateMaterialAssets(gameObject, param, imageUint8ArrayDataMap, defaultMaterialData, materialDataMapData, engineState) {
  var extractedMaterialAssetDataArr = param[2];
  var hasExtractedMaterialAssetMap = param[1];
  var match = RelateGameObjectAndAssetUtils$WonderEditor.getRelatedMaterialDataFromGameObject(gameObject, param[0], imageUint8ArrayDataMap, defaultMaterialData, materialDataMapData, _isLightMaterialDataEqual, engineState);
  var replacedTargetMaterialMap = match[3];
  var materialType = match[2];
  var targetMaterial = match[1];
  var sourceMaterial = match[0];
  var match$1 = RelateGameObjectAndAssetUtils$WonderEditor.doesNeedReplaceMaterial(/* tuple */[
        sourceMaterial,
        targetMaterial,
        materialType
      ]);
  if (match$1) {
    var engineState$1 = RelateGameObjectAndAssetUtils$WonderEditor.replaceToMaterialAssetMaterialComponent(gameObject, /* tuple */[
          sourceMaterial,
          targetMaterial,
          materialType
        ], engineState);
    return /* tuple */[
            false,
            replacedTargetMaterialMap,
            hasExtractedMaterialAssetMap,
            extractedMaterialAssetDataArr,
            engineState$1
          ];
  } else {
    var match$2;
    if (sourceMaterial !== undefined && materialType !== undefined) {
      var sourceMaterial$1 = sourceMaterial;
      var match$3 = _hasExtractedAsset(sourceMaterial$1, hasExtractedMaterialAssetMap);
      match$2 = match$3 ? /* tuple */[
          extractedMaterialAssetDataArr,
          hasExtractedMaterialAssetMap
        ] : /* tuple */[
          ArrayService$WonderEditor.push(/* tuple */[
                /* tuple */[
                  sourceMaterial$1,
                  materialType
                ],
                /* tuple */[
                  MainEditorMaterialUtils$WonderEditor.getName,
                  MainEditorMaterialUtils$WonderEditor.setName
                ]
              ], extractedMaterialAssetDataArr),
          SparseMapService$WonderCommonlib.set(sourceMaterial$1, true, hasExtractedMaterialAssetMap)
        ];
    } else {
      match$2 = /* tuple */[
        extractedMaterialAssetDataArr,
        hasExtractedMaterialAssetMap
      ];
    }
    return /* tuple */[
            true,
            replacedTargetMaterialMap,
            match$2[1],
            match$2[0],
            engineState
          ];
  }
}

function _extractAndRelateTextureAssets(gameObject, imageUint8ArrayDataMap, param, param$1) {
  var engineState = param$1[1];
  var editorState = param$1[0];
  var extractedTextureAssetDataArr = param[2];
  var hasExtractedTextureAssetMap = param[1];
  var match = RelateGameObjectAndAssetUtils$WonderEditor.getRelatedTextureDataFromGameObject(gameObject, param[0], param[3], imageUint8ArrayDataMap, /* tuple */[
        editorState,
        engineState
      ]);
  var replacedTargetTextureMap = match[3];
  var setMapFunc = match[2];
  var targetTexture = match[1];
  var sourceTexture = match[0];
  var match$1 = RelateGameObjectAndAssetUtils$WonderEditor.doesNeedReplaceTexture(/* tuple */[
        targetTexture,
        setMapFunc
      ]);
  if (match$1) {
    var engineState$1 = RelateGameObjectAndAssetUtils$WonderEditor.replaceToTextureAssetTextureComponent(gameObject, /* tuple */[
          targetTexture,
          setMapFunc
        ], /* tuple */[
          editorState,
          engineState
        ]);
    return /* tuple */[
            replacedTargetTextureMap,
            hasExtractedTextureAssetMap,
            extractedTextureAssetDataArr,
            /* tuple */[
              editorState,
              engineState$1
            ]
          ];
  } else {
    var match$2;
    if (sourceTexture !== undefined) {
      var sourceTexture$1 = sourceTexture;
      var match$3 = _hasExtractedAsset(sourceTexture$1, hasExtractedTextureAssetMap);
      match$2 = match$3 ? /* tuple */[
          extractedTextureAssetDataArr,
          hasExtractedTextureAssetMap
        ] : /* tuple */[
          ArrayService$WonderEditor.push(/* tuple */[
                sourceTexture$1,
                SparseMapService$WonderCommonlib.unsafeGet(sourceTexture$1, imageUint8ArrayDataMap),
                ImageUtils$WonderEditor.getImageName(BasicSourceTextureEngineService$WonderEditor.unsafeGetSource(sourceTexture$1, engineState)),
                /* tuple */[
                  OperateTextureLogicService$WonderEditor.getTextureBaseNameByTextureComponent,
                  BasicSourceTextureEngineService$WonderEditor.setBasicSourceTextureName
                ]
              ], extractedTextureAssetDataArr),
          SparseMapService$WonderCommonlib.set(sourceTexture$1, true, hasExtractedTextureAssetMap)
        ];
    } else {
      match$2 = /* tuple */[
        extractedTextureAssetDataArr,
        hasExtractedTextureAssetMap
      ];
    }
    return /* tuple */[
            replacedTargetTextureMap,
            match$2[1],
            match$2[0],
            /* tuple */[
              editorState,
              engineState
            ]
          ];
  }
}

function _buildMaterialMap(materialType, editorState) {
  return SparseMapService$WonderEditor.map((function (param) {
                return param[/* materialComponent */2];
              }), SparseMapService$WonderEditor.filter((function (param) {
                    return param[/* type_ */1] === materialType;
                  }), MaterialNodeMapAssetEditorService$WonderEditor.getValidValues(editorState)));
}

function extractAndRelateAssets(allGameObjects, imageUint8ArrayDataMap, param) {
  var engineState = param[1];
  var editorState = param[0];
  var defaultMaterialData = RelateGameObjectAndAssetUtils$WonderEditor.getDefaultMaterialData(editorState, engineState);
  var basicMaterialMap = _buildMaterialMap(/* BasicMaterial */0, editorState);
  var lightMaterialMap = _buildMaterialMap(/* LightMaterial */1, editorState);
  var basicMaterialDataMap = RelateGameObjectAndAssetUtils$WonderEditor.getBasicMaterialDataMap(basicMaterialMap, engineState);
  var lightMaterialDataMap = RelateGameObjectAndAssetUtils$WonderEditor.getLightMaterialDataMap(lightMaterialMap, /* tuple */[
        editorState,
        engineState
      ]);
  var textureAssetDataMap = SparseMapService$WonderEditor.map((function (textureComponent) {
          return /* tuple */[
                  textureComponent,
                  RelateGameObjectAndAssetUtils$WonderEditor.getTextureData(textureComponent, /* tuple */[
                        editorState,
                        engineState
                      ])
                ];
        }), TextureNodeMapAssetEditorService$WonderEditor.getTextureComponents(editorState));
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, gameObject) {
          var match = param[3];
          var editorState = match[0];
          var match$1 = param[2];
          var extractedTextureAssetDataArr = match$1[1];
          var match$2 = param[1];
          var hasExtractedTextureAssetMap = match$2[1];
          var match$3 = param[0];
          var replacedTargetTextureMap = match$3[1];
          var match$4 = _extractAndRelateMaterialAssets(gameObject, /* tuple */[
                match$3[0],
                match$2[0],
                match$1[0]
              ], imageUint8ArrayDataMap, defaultMaterialData, /* tuple */[
                basicMaterialDataMap,
                lightMaterialDataMap
              ], match[1]);
          var engineState = match$4[4];
          var extractedMaterialAssetDataArr = match$4[3];
          var hasExtractedMaterialAssetMap = match$4[2];
          var replacedTargetMaterialMap = match$4[1];
          if (match$4[0]) {
            var match$5 = _extractAndRelateTextureAssets(gameObject, imageUint8ArrayDataMap, /* tuple */[
                  replacedTargetTextureMap,
                  hasExtractedTextureAssetMap,
                  extractedTextureAssetDataArr,
                  textureAssetDataMap
                ], /* tuple */[
                  editorState,
                  engineState
                ]);
            var match$6 = match$5[3];
            return /* tuple */[
                    /* tuple */[
                      replacedTargetMaterialMap,
                      match$5[0]
                    ],
                    /* tuple */[
                      hasExtractedMaterialAssetMap,
                      match$5[1]
                    ],
                    /* tuple */[
                      extractedMaterialAssetDataArr,
                      match$5[2]
                    ],
                    /* tuple */[
                      match$6[0],
                      match$6[1]
                    ]
                  ];
          } else {
            return /* tuple */[
                    /* tuple */[
                      replacedTargetMaterialMap,
                      replacedTargetTextureMap
                    ],
                    /* tuple */[
                      hasExtractedMaterialAssetMap,
                      hasExtractedTextureAssetMap
                    ],
                    /* tuple */[
                      extractedMaterialAssetDataArr,
                      extractedTextureAssetDataArr
                    ],
                    /* tuple */[
                      editorState,
                      engineState
                    ]
                  ];
          }
        }), /* tuple */[
        /* tuple */[
          SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          SparseMapService$WonderCommonlib.createEmpty(/* () */0)
        ],
        /* tuple */[
          SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          SparseMapService$WonderCommonlib.createEmpty(/* () */0)
        ],
        /* tuple */[
          /* array */[],
          /* array */[]
        ],
        /* tuple */[
          editorState,
          engineState
        ]
      ], allGameObjects);
  var match$1 = match[3];
  var match$2 = match[2];
  return /* tuple */[
          /* tuple */[
            match$2[0],
            match$2[1]
          ],
          /* tuple */[
            match$1[0],
            match$1[1]
          ]
        ];
}

function _buildFolderNode(siblingFolderDataArr, folderName, parentFolderNodeId, param) {
  var editorState = param[0];
  var match = siblingFolderDataArr.find((function (param) {
          return param[0] === folderName;
        }));
  if (match !== undefined) {
    return /* tuple */[
            editorState,
            match[1]
          ];
  } else {
    var match$1 = AssetIdUtils$WonderEditor.generateAssetId(editorState);
    var newIndex = match$1[1];
    var editorState$1 = AddFolderNodeUtils$WonderEditor.addFolderNodeToAssetTree(folderName, /* tuple */[
          parentFolderNodeId,
          newIndex
        ], /* tuple */[
          match$1[0],
          param[1]
        ]);
    return /* tuple */[
            editorState$1,
            newIndex
          ];
  }
}

function _addMaterialNodeToAssetTree(extractedMaterialAssetDataArr, siblingFolderDataArr, parentFolderNodeId, param) {
  var engineState = param[1];
  var editorState = param[0];
  var match = extractedMaterialAssetDataArr.length === 0;
  if (match) {
    return /* tuple */[
            editorState,
            engineState
          ];
  } else {
    var match$1 = _buildFolderNode(siblingFolderDataArr, "Materials", parentFolderNodeId, /* tuple */[
          editorState,
          engineState
        ]);
    var folderNodeId = match$1[1];
    return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                  var match = param$1[1];
                  var match$1 = param$1[0];
                  var materialType = match$1[1];
                  var material = match$1[0];
                  var engineState = param[1];
                  var editorState = param[0];
                  var materialName = IterateAssetTreeAssetEditorService$WonderEditor.getUniqueTreeNodeName(Curry._3(match[0], material, materialType, engineState), /* Material */3, folderNodeId, /* tuple */[
                        editorState,
                        engineState
                      ]);
                  var engineState$1 = Curry._4(match[1], material, materialType, materialName, engineState);
                  var match$2 = AssetIdUtils$WonderEditor.generateAssetId(editorState);
                  var editorState$1 = AddMaterialNodeUtils$WonderEditor.addMaterialNodeToAssetTree(material, /* tuple */[
                        folderNodeId,
                        match$2[1]
                      ], match$2[0]);
                  return /* tuple */[
                          editorState$1,
                          engineState$1
                        ];
                }), /* tuple */[
                match$1[0],
                engineState
              ], extractedMaterialAssetDataArr);
  }
}

function _addTextureNodeToAssetTree(extractedTextureAssetDataArr, siblingFolderDataArr, parentFolderNodeId, param) {
  var engineState = param[1];
  var editorState = param[0];
  var match = extractedTextureAssetDataArr.length === 0;
  if (match) {
    return /* tuple */[
            editorState,
            engineState
          ];
  } else {
    var match$1 = _buildFolderNode(siblingFolderDataArr, "Textures", parentFolderNodeId, /* tuple */[
          editorState,
          engineState
        ]);
    var folderNodeId = match$1[1];
    return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                  var match = param$1[3];
                  var match$1 = param$1[1];
                  var texture = param$1[0];
                  var engineState = param[1];
                  var editorState = param[0];
                  var textureName = IterateAssetTreeAssetEditorService$WonderEditor.getUniqueTreeNodeName(Curry._2(match[0], texture, engineState), /* Texture */1, folderNodeId, /* tuple */[
                        editorState,
                        engineState
                      ]);
                  var engineState$1 = Curry._3(match[1], textureName, texture, engineState);
                  var match$2 = AddTextureNodeUtils$WonderEditor.addImageNodeByUint8Array(match$1[1], param$1[2], match$1[0], editorState);
                  var match$3 = AssetIdUtils$WonderEditor.generateAssetId(match$2[1]);
                  var editorState$1 = AddTextureNodeUtils$WonderEditor.addTextureNodeToAssetTree(texture, /* tuple */[
                        folderNodeId,
                        match$3[1],
                        match$2[0]
                      ], match$3[0]);
                  return /* tuple */[
                          editorState$1,
                          engineState$1
                        ];
                }), /* tuple */[
                match$1[0],
                engineState
              ], extractedTextureAssetDataArr);
  }
}

function addNodeToAssetTree(extractedMaterialAssetDataArr, extractedTextureAssetDataArr, param) {
  var engineState = param[1];
  var editorState = param[0];
  var targetTreeNodeId = AssetTreeUtils$WonderEditor.getTargetTreeNodeId(editorState);
  var siblingFolderDataArr = IterateAssetTreeAssetEditorService$WonderEditor.getChildrenNameAndIdArr(targetTreeNodeId, /* Folder */0, /* tuple */[
        editorState,
        engineState
      ]);
  return _addTextureNodeToAssetTree(extractedTextureAssetDataArr, siblingFolderDataArr, targetTreeNodeId, _addMaterialNodeToAssetTree(extractedMaterialAssetDataArr, siblingFolderDataArr, targetTreeNodeId, /* tuple */[
                  editorState,
                  engineState
                ]));
}

export {
  _hasExtractedAsset ,
  _isLightMaterialDataEqual ,
  _extractAndRelateMaterialAssets ,
  _extractAndRelateTextureAssets ,
  _buildMaterialMap ,
  extractAndRelateAssets ,
  _buildFolderNode ,
  _addMaterialNodeToAssetTree ,
  _addTextureNodeToAssetTree ,
  addNodeToAssetTree ,
  
}
/* ImageUtils-WonderEditor Not a pure module */
