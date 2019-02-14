

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_primitive from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as ImageUtils$WonderEditor from "../../../../../../../../../../header/utils/ImageUtils.js";
import * as ArrayService$WonderEditor from "../../../../../../../../../../../../service/atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as UIStateAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/UIStateAssetService.js";
import * as IdAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/IdAssetEditorService.js";
import * as FolderNodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/FolderNodeAssetService.js";
import * as TextureNodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/TextureNodeAssetService.js";
import * as MaterialNodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/MaterialNodeAssetService.js";
import * as NodeNameAssetLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/asset/NodeNameAssetLogicService.js";
import * as OperateTextureLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/OperateTextureLogicService.js";
import * as OperateMaterialLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/material/OperateMaterialLogicService.js";
import * as FolderNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/FolderNodeAssetEditorService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";
import * as OperateTreeAssetLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/asset/OperateTreeAssetLogicService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as TextureNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/TextureNodeAssetEditorService.js";
import * as ImageDataMapAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/ImageDataMapAssetEditorService.js";
import * as MaterialNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/MaterialNodeAssetEditorService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/BasicSourceTextureEngineService.js";
import * as RelateGameObjectAndTextureAssetUtils$WonderEditor from "../../../../../../../../../../utils/RelateGameObjectAndTextureAssetUtils.js";
import * as RelateGameObjectAndMaterialAssetUtils$WonderEditor from "../../../../../../../../../../utils/RelateGameObjectAndMaterialAssetUtils.js";

function _hasExtractedAsset(key, hasExtractedAssetMap) {
  var match = ImmutableSparseMapService$WonderCommonlib.get(key, hasExtractedAssetMap);
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
            ], material2, /* tuple */[
              imageUint8ArrayDataMap,
              (function (param, param$1, param$2, param$3) {
                  return RelateGameObjectAndTextureAssetUtils$WonderEditor.isTextureDataEqual(RelateGameObjectAndTextureAssetUtils$WonderEditor.isImageDataEqual, param, param$1, param$2, param$3);
                }),
              engineState
            ]);
}

function _addExtractedMaterialAssetData(param, replacedTargetMaterialMap, param$1, engineState) {
  var extractedMaterialAssetDataArr = param$1[1];
  var hasExtractedMaterialAssetMap = param$1[0];
  var materialType = param[1];
  var sourceMaterial = param[0];
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
                NodeNameAssetLogicService$WonderEditor.getMaterialNodeName,
                OperateMaterialLogicService$WonderEditor.setName
              ]
            ], extractedMaterialAssetDataArr),
        ImmutableSparseMapService$WonderCommonlib.set(sourceMaterial$1, true, hasExtractedMaterialAssetMap)
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

function _extractAndRelateMaterialAssets(gameObject, param, param$1, engineState) {
  var extractedMaterialAssetDataArr = param[2];
  var hasExtractedMaterialAssetMap = param[1];
  var match = RelateGameObjectAndMaterialAssetUtils$WonderEditor.getRelatedMaterialDataFromGameObject(gameObject, param[0], param$1[0], param$1[1], param$1[2], _isLightMaterialDataEqual, engineState);
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
    return _addExtractedMaterialAssetData(/* tuple */[
                sourceMaterial,
                materialType
              ], replacedTargetMaterialMap, /* tuple */[
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
              ImmutableSparseMapService$WonderCommonlib.unsafeGet(sourceTexture$1, imageUint8ArrayDataMap),
              ImageUtils$WonderEditor.getImageName(BasicSourceTextureEngineService$WonderEditor.unsafeGetSource(sourceTexture$1, engineState)),
              /* tuple */[
                OperateTextureLogicService$WonderEditor.getName,
                BasicSourceTextureEngineService$WonderEditor.setBasicSourceTextureName
              ]
            ], extractedTextureAssetDataArr),
        ImmutableSparseMapService$WonderCommonlib.set(sourceTexture$1, true, hasExtractedTextureAssetMap)
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
  var match = RelateGameObjectAndTextureAssetUtils$WonderEditor.getRelatedTextureDataFromGameObject(gameObject, /* tuple */[
        param[0],
        param[3],
        imageUint8ArrayDataMap
      ], /* tuple */[
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

var _buildMaterialMap = MaterialNodeAssetEditorService$WonderEditor.getMaterialComponentsByType;

function _prepareData(editorState, engineState) {
  var defaultMaterialData = RelateGameObjectAndMaterialAssetUtils$WonderEditor.getDefaultMaterialData(editorState, engineState);
  var basicMaterialMap = MaterialNodeAssetEditorService$WonderEditor.getMaterialComponentsByType(/* BasicMaterial */0, editorState);
  var lightMaterialMap = MaterialNodeAssetEditorService$WonderEditor.getMaterialComponentsByType(/* LightMaterial */1, editorState);
  var basicMaterialDataMap = RelateGameObjectAndMaterialAssetUtils$WonderEditor.getBasicMaterialDataMap(basicMaterialMap, engineState);
  var lightMaterialDataMap = RelateGameObjectAndMaterialAssetUtils$WonderEditor.getLightMaterialDataMap(lightMaterialMap, /* tuple */[
        editorState,
        engineState
      ]);
  var textureAssetDataMap = ImmutableSparseMapService$WonderCommonlib.mapValid((function (textureComponent) {
          return /* tuple */[
                  textureComponent,
                  RelateGameObjectAndTextureAssetUtils$WonderEditor.getTextureData(textureComponent, /* tuple */[
                        editorState,
                        engineState
                      ])
                ];
        }), TextureNodeAssetEditorService$WonderEditor.getTextureComponents(editorState));
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
              ], /* tuple */[
                imageUint8ArrayDataMap,
                defaultMaterialData,
                /* tuple */[
                  basicMaterialDataMap,
                  lightMaterialDataMap
                ]
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
          ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
        ],
        /* tuple */[
          ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
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

function _findTargetFolderChildNodeByName(folderNode, targetFolderChildNodeName, engineState) {
  return Js_primitive.undefined_to_opt(UIStateAssetService$WonderEditor.get(FolderNodeAssetService$WonderEditor.getChildren(folderNode)).find((function (child) {
                    return NodeNameAssetLogicService$WonderEditor.getNodeName(child, engineState) === targetFolderChildNodeName;
                  })));
}

function _buildFolderNode(folderName, selectedFolderNodeInAssetTree, param) {
  var editorState = param[0];
  var match = _findTargetFolderChildNodeByName(selectedFolderNodeInAssetTree, folderName, param[1]);
  if (match !== undefined) {
    return /* tuple */[
            editorState,
            match
          ];
  } else {
    var match$1 = IdAssetEditorService$WonderEditor.generateNodeId(editorState);
    var newNode = FolderNodeAssetService$WonderEditor.buildNode(match$1[1], folderName, undefined, /* () */0);
    var editorState$1 = FolderNodeAssetEditorService$WonderEditor.addFolderNodeToAssetTree(selectedFolderNodeInAssetTree, newNode, match$1[0]);
    return /* tuple */[
            editorState$1,
            newNode
          ];
  }
}

function _addMaterialNodeToAssetTree(extractedMaterialAssetDataArr, selectedFolderNodeInAssetTree, param) {
  var engineState = param[1];
  var editorState = param[0];
  var match = extractedMaterialAssetDataArr.length === 0;
  if (match) {
    return /* tuple */[
            editorState,
            engineState
          ];
  } else {
    var match$1 = _buildFolderNode("Materials", selectedFolderNodeInAssetTree, /* tuple */[
          editorState,
          engineState
        ]);
    var folderNode = match$1[1];
    return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                  var match = param$1[1];
                  var match$1 = param$1[0];
                  var materialType = match$1[1];
                  var material = match$1[0];
                  var engineState = param[1];
                  var materialName = OperateTreeAssetLogicService$WonderEditor.getUniqueNodeName(Curry._3(match[0], material, materialType, engineState), folderNode, engineState);
                  var engineState$1 = Curry._4(match[1], material, materialType, materialName, engineState);
                  var match$2 = IdAssetEditorService$WonderEditor.generateNodeId(param[0]);
                  var editorState = MaterialNodeAssetEditorService$WonderEditor.addMaterialNodeToAssetTree(folderNode, MaterialNodeAssetService$WonderEditor.buildNode(match$2[1], /* LightMaterial */1, material), match$2[0]);
                  return /* tuple */[
                          editorState,
                          engineState$1
                        ];
                }), /* tuple */[
                match$1[0],
                engineState
              ], extractedMaterialAssetDataArr);
  }
}

function _addTextureNodeToAssetTree(extractedTextureAssetDataArr, selectedFolderNodeInAssetTree, param) {
  var engineState = param[1];
  var editorState = param[0];
  var match = extractedTextureAssetDataArr.length === 0;
  if (match) {
    return /* tuple */[
            editorState,
            engineState
          ];
  } else {
    var match$1 = _buildFolderNode("Textures", selectedFolderNodeInAssetTree, /* tuple */[
          editorState,
          engineState
        ]);
    var folderNode = match$1[1];
    return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                  var match = param$1[3];
                  var match$1 = param$1[1];
                  var texture = param$1[0];
                  var engineState = param[1];
                  var textureName = OperateTreeAssetLogicService$WonderEditor.getUniqueNodeName(Curry._2(match[0], texture, engineState), folderNode, engineState);
                  var engineState$1 = Curry._3(match[1], textureName, texture, engineState);
                  var match$2 = ImageDataMapAssetEditorService$WonderEditor.addImageNodeByUint8Array(match$1[1], param$1[2], match$1[0], param[0]);
                  var match$3 = IdAssetEditorService$WonderEditor.generateNodeId(match$2[0]);
                  var editorState = TextureNodeAssetEditorService$WonderEditor.addTextureNodeToAssetTree(folderNode, TextureNodeAssetService$WonderEditor.buildNode(match$3[1], texture, match$2[1]), match$3[0]);
                  return /* tuple */[
                          editorState,
                          engineState$1
                        ];
                }), /* tuple */[
                match$1[0],
                engineState
              ], extractedTextureAssetDataArr);
  }
}

function addNodeToAssetTree(extractedMaterialAssetDataArr, extractedTextureAssetDataArr, param) {
  var editorState = param[0];
  var selectedFolderNodeInAssetTree = OperateTreeAssetEditorService$WonderEditor.unsafeGetSelectedFolderNodeInAssetTree(editorState);
  return _addTextureNodeToAssetTree(extractedTextureAssetDataArr, selectedFolderNodeInAssetTree, _addMaterialNodeToAssetTree(extractedMaterialAssetDataArr, selectedFolderNodeInAssetTree, /* tuple */[
                  editorState,
                  param[1]
                ]));
}

var AssetTree = /* module */[
  /* _findTargetFolderChildNodeByName */_findTargetFolderChildNodeByName,
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
