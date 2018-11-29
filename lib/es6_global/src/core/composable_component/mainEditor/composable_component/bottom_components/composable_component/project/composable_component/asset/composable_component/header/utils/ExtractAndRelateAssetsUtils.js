

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_primitive from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
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
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/BasicSourceTextureEngineService.js";
import * as TextureNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/TextureNodeMapAssetEditorService.js";
import * as MaterialNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/MaterialNodeMapAssetEditorService.js";
import * as IterateAssetTreeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/IterateAssetTreeAssetEditorService.js";
import * as RelateGameObjectAndTextureAssetUtils$WonderEditor from "../../../../../../../../../../utils/RelateGameObjectAndTextureAssetUtils.js";
import * as RelateGameObjectAndMaterialAssetUtils$WonderEditor from "../../../../../../../../../../utils/RelateGameObjectAndMaterialAssetUtils.js";

function _hasExtractedAsset(key, hasExtractedAssetMap) {
  var match = SparseMapService$WonderCommonlib.get(key, hasExtractedAssetMap);
  if (match !== undefined && match) {
    return true;
  } else {
    return false;
  }
}

function _isLightMaterialDataEqual(param, material2, imageUint8ArrayDataMap, engineState) {
  return RelateGameObjectAndMaterialAssetUtils$WonderEditor.isLightMaterialDataEqual(/* tuple */[
              param[0],
              param[1],
              param[2],
              param[3]
            ], material2, imageUint8ArrayDataMap, (function (param, param$1, param$2, param$3) {
                return RelateGameObjectAndTextureAssetUtils$WonderEditor.isTextureDataEqual(RelateGameObjectAndTextureAssetUtils$WonderEditor.isImageDataEqual, param, param$1, param$2, param$3);
              }), engineState);
}

function _addExtractedMaterialAssetData(sourceMaterial, materialType, replacedTargetMaterialMap, param, engineState) {
  var extractedMaterialAssetDataArr = param[1];
  var hasExtractedMaterialAssetMap = param[0];
  var match;
  if (sourceMaterial !== undefined && materialType !== undefined) {
    var sourceMaterial$1 = sourceMaterial;
    var match$1 = _hasExtractedAsset(sourceMaterial$1, hasExtractedMaterialAssetMap);
    match = match$1 ? /* tuple */[
        extractedMaterialAssetDataArr,
        hasExtractedMaterialAssetMap
      ] : /* tuple */[
        ArrayService$WonderEditor.push(/* tuple */[
              /* tuple */[
                sourceMaterial$1,
                Js_primitive.valFromOption(materialType)
              ],
              /* tuple */[
                MainEditorMaterialUtils$WonderEditor.getName,
                MainEditorMaterialUtils$WonderEditor.setName
              ]
            ], extractedMaterialAssetDataArr),
        SparseMapService$WonderCommonlib.set(sourceMaterial$1, true, hasExtractedMaterialAssetMap)
      ];
  } else {
    match = /* tuple */[
      extractedMaterialAssetDataArr,
      hasExtractedMaterialAssetMap
    ];
  }
  return /* tuple */[
          true,
          replacedTargetMaterialMap,
          match[1],
          match[0],
          engineState
        ];
}

function _extractAndRelateMaterialAssets(gameObject, param, imageUint8ArrayDataMap, defaultMaterialData, materialDataMapData, engineState) {
  var extractedMaterialAssetDataArr = param[2];
  var hasExtractedMaterialAssetMap = param[1];
  var match = RelateGameObjectAndMaterialAssetUtils$WonderEditor.getRelatedMaterialDataFromGameObject(gameObject, param[0], imageUint8ArrayDataMap, defaultMaterialData, materialDataMapData, _isLightMaterialDataEqual, engineState);
  var replacedTargetMaterialMap = match[3];
  var materialType = match[2];
  var targetMaterial = match[1];
  var sourceMaterial = match[0];
  var match$1 = RelateGameObjectAndMaterialAssetUtils$WonderEditor.doesNeedReplaceMaterial(/* tuple */[
        sourceMaterial,
        targetMaterial,
        materialType
      ]);
  if (match$1) {
    var engineState$1 = RelateGameObjectAndMaterialAssetUtils$WonderEditor.replaceToMaterialAssetMaterialComponent(gameObject, /* tuple */[
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
    return _addExtractedMaterialAssetData(sourceMaterial, materialType, replacedTargetMaterialMap, /* tuple */[
                hasExtractedMaterialAssetMap,
                extractedMaterialAssetDataArr
              ], engineState);
  }
}

function _addExtractedTextureAssetData(sourceTexture, replacedTargetTextureMap, imageUint8ArrayDataMap, param, param$1) {
  var engineState = param$1[1];
  var extractedTextureAssetDataArr = param[1];
  var hasExtractedTextureAssetMap = param[0];
  var match;
  if (sourceTexture !== undefined) {
    var sourceTexture$1 = sourceTexture;
    var match$1 = _hasExtractedAsset(sourceTexture$1, hasExtractedTextureAssetMap);
    match = match$1 ? /* tuple */[
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
    match = /* tuple */[
      extractedTextureAssetDataArr,
      hasExtractedTextureAssetMap
    ];
  }
  return /* tuple */[
          replacedTargetTextureMap,
          match[1],
          match[0],
          /* tuple */[
            param$1[0],
            engineState
          ]
        ];
}

function _extractAndRelateTextureAssets(gameObject, imageUint8ArrayDataMap, param, param$1) {
  var engineState = param$1[1];
  var editorState = param$1[0];
  var extractedTextureAssetDataArr = param[2];
  var hasExtractedTextureAssetMap = param[1];
  var match = RelateGameObjectAndTextureAssetUtils$WonderEditor.getRelatedTextureDataFromGameObject(gameObject, param[0], param[3], imageUint8ArrayDataMap, /* tuple */[
        editorState,
        engineState
      ]);
  var replacedTargetTextureMap = match[3];
  var setMapFunc = match[2];
  var targetTexture = match[1];
  var match$1 = RelateGameObjectAndTextureAssetUtils$WonderEditor.doesNeedReplaceTexture(/* tuple */[
        targetTexture,
        setMapFunc
      ]);
  if (match$1) {
    var engineState$1 = RelateGameObjectAndTextureAssetUtils$WonderEditor.replaceToTextureAssetTextureComponent(gameObject, /* tuple */[
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
    return _addExtractedTextureAssetData(match[0], replacedTargetTextureMap, imageUint8ArrayDataMap, /* tuple */[
                hasExtractedTextureAssetMap,
                extractedTextureAssetDataArr
              ], /* tuple */[
                editorState,
                engineState
              ]);
  }
}

function _buildMaterialMap(materialType, editorState) {
  return SparseMapService$WonderEditor.map((function (param) {
                return param[/* materialComponent */2];
              }), SparseMapService$WonderEditor.filter((function (param) {
                    return param[/* type_ */1] === materialType;
                  }), MaterialNodeMapAssetEditorService$WonderEditor.getValidValues(editorState)));
}

function _prepareData(editorState, engineState) {
  var defaultMaterialData = RelateGameObjectAndMaterialAssetUtils$WonderEditor.getDefaultMaterialData(editorState, engineState);
  var basicMaterialMap = _buildMaterialMap(/* BasicMaterial */0, editorState);
  var lightMaterialMap = _buildMaterialMap(/* LightMaterial */1, editorState);
  var basicMaterialDataMap = RelateGameObjectAndMaterialAssetUtils$WonderEditor.getBasicMaterialDataMap(basicMaterialMap, engineState);
  var lightMaterialDataMap = RelateGameObjectAndMaterialAssetUtils$WonderEditor.getLightMaterialDataMap(lightMaterialMap, /* tuple */[
        editorState,
        engineState
      ]);
  var textureAssetDataMap = SparseMapService$WonderEditor.map((function (textureComponent) {
          return /* tuple */[
                  textureComponent,
                  RelateGameObjectAndTextureAssetUtils$WonderEditor.getTextureData(textureComponent, /* tuple */[
                        editorState,
                        engineState
                      ])
                ];
        }), TextureNodeMapAssetEditorService$WonderEditor.getTextureComponents(editorState));
  return /* tuple */[
          defaultMaterialData,
          basicMaterialMap,
          lightMaterialMap,
          basicMaterialDataMap,
          lightMaterialDataMap,
          textureAssetDataMap
        ];
}

function extractAndRelateAssets(allGameObjects, imageUint8ArrayDataMap, param) {
  var engineState = param[1];
  var editorState = param[0];
  var match = _prepareData(editorState, engineState);
  var textureAssetDataMap = match[5];
  var lightMaterialDataMap = match[4];
  var basicMaterialDataMap = match[3];
  var defaultMaterialData = match[0];
  var match$1 = ArrayService$WonderCommonlib.reduceOneParam((function (param, gameObject) {
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
  var match$2 = match$1[3];
  var match$3 = match$1[2];
  return /* tuple */[
          /* tuple */[
            match$3[0],
            match$3[1]
          ],
          /* tuple */[
            match$2[0],
            match$2[1]
          ]
        ];
}

var Extract = /* module */[
  /* _hasExtractedAsset */_hasExtractedAsset,
  /* _isLightMaterialDataEqual */_isLightMaterialDataEqual,
  /* _addExtractedMaterialAssetData */_addExtractedMaterialAssetData,
  /* _extractAndRelateMaterialAssets */_extractAndRelateMaterialAssets,
  /* _addExtractedTextureAssetData */_addExtractedTextureAssetData,
  /* _extractAndRelateTextureAssets */_extractAndRelateTextureAssets,
  /* _buildMaterialMap */_buildMaterialMap,
  /* _prepareData */_prepareData,
  /* extractAndRelateAssets */extractAndRelateAssets
];

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

var AssetTree = /* module */[
  /* _buildFolderNode */_buildFolderNode,
  /* _addMaterialNodeToAssetTree */_addMaterialNodeToAssetTree,
  /* _addTextureNodeToAssetTree */_addTextureNodeToAssetTree,
  /* addNodeToAssetTree */addNodeToAssetTree
];

export {
  Extract ,
  AssetTree ,
  
}
/* ImageUtils-WonderEditor Not a pure module */
