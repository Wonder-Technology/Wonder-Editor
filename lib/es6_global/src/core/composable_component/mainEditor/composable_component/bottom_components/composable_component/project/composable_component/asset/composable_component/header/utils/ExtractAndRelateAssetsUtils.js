

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_option from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ImageUtils$WonderEditor from "../../../../../../../../../../header/utils/ImageUtils.js";
import * as ArrayService$WonderEditor from "../../../../../../../../../../../../service/atom/ArrayService.js";
import * as ImgCanvasUtils$WonderEditor from "../../../../../../../../../../../utils/canvas/ImgCanvasUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as UIStateAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/UIStateAssetService.js";
import * as IdAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/IdAssetEditorService.js";
import * as InspectorCanvasUtils$WonderEditor from "../../../../../../../../inspector/composable_component/assetTree_Inspector/utils/InspectorCanvasUtils.js";
import * as FolderNodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/FolderNodeAssetService.js";
import * as ImmutableHashMapService$WonderEditor from "../../../../../../../../../../../../service/atom/ImmutableHashMapService.js";
import * as IndexAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/IndexAssetEditorService.js";
import * as TextureNodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/TextureNodeAssetService.js";
import * as ImageDataMapAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/ImageDataMapAssetService.js";
import * as MaterialNodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/MaterialNodeAssetService.js";
import * as NodeNameAssetLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/asset/NodeNameAssetLogicService.js";
import * as ImmutableHashMapService$WonderCommonlib from "../../../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableHashMapService.js";
import * as OperateTextureLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/OperateTextureLogicService.js";
import * as OperateMaterialLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/material/OperateMaterialLogicService.js";
import * as StateInspectorEngineService$WonderEditor from "../../../../../../../../../../../../service/state/inspectorEngine/StateInspectorEngineService.js";
import * as FolderNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/FolderNodeAssetEditorService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";
import * as MaterialInspectorEngineUtils$WonderEditor from "../../../../../../../../inspector/composable_component/assetTree_Inspector/atom_component/material_Inspector/utils/MaterialInspectorEngineUtils.js";
import * as OperateTreeAssetLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/asset/OperateTreeAssetLogicService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as TextureNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/TextureNodeAssetEditorService.js";
import * as ExtractScriptAssetLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/asset/script/ExtractScriptAssetLogicService.js";
import * as ImageDataMapAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/ImageDataMapAssetEditorService.js";
import * as MaterialNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/MaterialNodeAssetEditorService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/BasicSourceTextureEngineService.js";
import * as ScriptAttributeNodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/ScriptAttributeNodeAssetService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as ScriptEventFunctionNodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/ScriptEventFunctionNodeAssetService.js";
import * as RelateGameObjectAndTextureAssetUtils$WonderEditor from "../../../../../../../../../../utils/RelateGameObjectAndTextureAssetUtils.js";
import * as RelateGameObjectAndMaterialAssetUtils$WonderEditor from "../../../../../../../../../../utils/RelateGameObjectAndMaterialAssetUtils.js";
import * as ScriptAttributeNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/ScriptAttributeNodeAssetEditorService.js";
import * as ScriptEventFunctionNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/ScriptEventFunctionNodeAssetEditorService.js";
import * as RelateGameObjectAndScriptEventFunctionAssetUtils$WonderEditor from "../../../../../../../../../../utils/RelateGameObjectAndScriptEventFunctionAssetUtils.js";

function _hasExtractedAsset(key, hasExtractedAssetMap) {
  var match = ImmutableSparseMapService$WonderCommonlib.get(key, hasExtractedAssetMap);
  if (match !== undefined && match) {
    return true;
  } else {
    return false;
  }
}

var _changeScriptAssetsHashMapToEntriesMap = ImmutableHashMapService$WonderCommonlib.getValidEntries;

function _extractAndRelateScriptEventFunctionAssets(gameObject, scriptEventFunctionAssetHashMap, totalExtractedScriptEventFunctionAssetEntriesArr, engineState) {
  var match = GameObjectComponentEngineService$WonderEditor.getScriptComponent(gameObject, engineState);
  var extractedScriptEventFunctionAssetEntriesArr = match !== undefined ? ExtractScriptAssetLogicService$WonderEditor.getScriptEventFunctionDataEntriesArrNotInScriptAssets(match, scriptEventFunctionAssetHashMap, engineState) : ArrayService$WonderCommonlib.createEmpty(/* () */0);
  var engineState$1 = RelateGameObjectAndScriptEventFunctionAssetUtils$WonderEditor.replaceToScriptEventFunctionAssetEventFunctionData(gameObject, ImmutableHashMapService$WonderCommonlib.getValidEntries(scriptEventFunctionAssetHashMap), engineState);
  return /* tuple */[
          ArrayService$WonderEditor.fastConcat(totalExtractedScriptEventFunctionAssetEntriesArr, extractedScriptEventFunctionAssetEntriesArr),
          engineState$1
        ];
}

function _extractAndRelateScriptAttributeAssets(gameObject, scriptAttributeAssetHashMap, totalExtractedScriptAttributeAssetEntriesArr, engineState) {
  var match = GameObjectComponentEngineService$WonderEditor.getScriptComponent(gameObject, engineState);
  var extractedScriptAttributeAssetEntriesArr = match !== undefined ? ExtractScriptAssetLogicService$WonderEditor.getScriptAttributeEntriesArrNotInScriptAssets(match, scriptAttributeAssetHashMap, engineState) : ArrayService$WonderCommonlib.createEmpty(/* () */0);
  return /* tuple */[
          ArrayService$WonderEditor.fastConcat(totalExtractedScriptAttributeAssetEntriesArr, extractedScriptAttributeAssetEntriesArr),
          engineState
        ];
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
                Caml_option.valFromOption(materialType)
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

function _buildScriptEventFunctionAssetHashMap(editorState) {
  return ImmutableHashMapService$WonderEditor.fromArray(ScriptEventFunctionNodeAssetEditorService$WonderEditor.findAllScriptEventFunctionNodes(editorState).map((function (node) {
                    var match = ScriptEventFunctionNodeAssetService$WonderEditor.getNodeData(node);
                    return /* tuple */[
                            match[/* name */0],
                            match[/* eventFunctionData */1]
                          ];
                  })));
}

function _buildScriptAttributeAssetHashMap(editorState) {
  return ImmutableHashMapService$WonderEditor.fromArray(ScriptAttributeNodeAssetEditorService$WonderEditor.findAllScriptAttributeNodes(editorState).map((function (node) {
                    var match = ScriptAttributeNodeAssetService$WonderEditor.getNodeData(node);
                    return /* tuple */[
                            match[/* name */0],
                            match[/* attribute */1]
                          ];
                  })));
}

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
          textureAssetDataMap,
          /* tuple */[
            _buildScriptEventFunctionAssetHashMap(editorState),
            _buildScriptAttributeAssetHashMap(editorState)
          ]
        ];
}

function extractAndRelateAssets(allGameObjects, imageUint8ArrayDataMap, param) {
  var engineState = param[1];
  var editorState = param[0];
  var match = _prepareData(editorState, engineState);
  var match$1 = match[6];
  var scriptAttributeAssetHashMap = match$1[1];
  var scriptEventFunctionAssetHashMap = match$1[0];
  var textureAssetDataMap = match[5];
  var lightMaterialDataMap = match[4];
  var basicMaterialDataMap = match[3];
  var defaultMaterialData = match[0];
  var match$2 = ArrayService$WonderCommonlib.reduceOneParam((function (param, gameObject) {
          var match = param[3];
          var editorState = match[0];
          var match$1 = param[2];
          var extractedTextureAssetDataArr = match$1[1];
          var match$2 = param[1];
          var hasExtractedTextureAssetMap = match$2[1];
          var match$3 = param[0];
          var replacedTargetTextureMap = match$3[1];
          var match$4 = _extractAndRelateScriptEventFunctionAssets(gameObject, scriptEventFunctionAssetHashMap, match$1[2], match[1]);
          var extractedScriptEventFunctionAssetEntriesArr = match$4[0];
          var match$5 = _extractAndRelateScriptAttributeAssets(gameObject, scriptAttributeAssetHashMap, match$1[3], match$4[1]);
          var extractedScriptAttributeAssetEntriesArr = match$5[0];
          var match$6 = _extractAndRelateMaterialAssets(gameObject, /* tuple */[
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
              ], match$5[1]);
          var engineState = match$6[4];
          var extractedMaterialAssetDataArr = match$6[3];
          var hasExtractedMaterialAssetMap = match$6[2];
          var replacedTargetMaterialMap = match$6[1];
          if (match$6[0]) {
            var match$7 = _extractAndRelateTextureAssets(gameObject, imageUint8ArrayDataMap, /* tuple */[
                  replacedTargetTextureMap,
                  hasExtractedTextureAssetMap,
                  extractedTextureAssetDataArr,
                  textureAssetDataMap
                ], /* tuple */[
                  editorState,
                  engineState
                ]);
            var match$8 = match$7[3];
            return /* tuple */[
                    /* tuple */[
                      replacedTargetMaterialMap,
                      match$7[0]
                    ],
                    /* tuple */[
                      hasExtractedMaterialAssetMap,
                      match$7[1]
                    ],
                    /* tuple */[
                      extractedMaterialAssetDataArr,
                      match$7[2],
                      extractedScriptEventFunctionAssetEntriesArr,
                      extractedScriptAttributeAssetEntriesArr
                    ],
                    /* tuple */[
                      match$8[0],
                      match$8[1]
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
                      extractedTextureAssetDataArr,
                      extractedScriptEventFunctionAssetEntriesArr,
                      extractedScriptAttributeAssetEntriesArr
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
          ArrayService$WonderCommonlib.createEmpty(/* () */0),
          ArrayService$WonderCommonlib.createEmpty(/* () */0),
          ArrayService$WonderCommonlib.createEmpty(/* () */0),
          ArrayService$WonderCommonlib.createEmpty(/* () */0)
        ],
        /* tuple */[
          editorState,
          engineState
        ]
      ], allGameObjects);
  var match$3 = match$2[3];
  var match$4 = match$2[2];
  return /* tuple */[
          /* tuple */[
            match$4[0],
            match$4[1],
            match$4[2],
            match$4[3]
          ],
          /* tuple */[
            match$3[0],
            match$3[1]
          ]
        ];
}

var Extract = /* module */[
  /* _hasExtractedAsset */_hasExtractedAsset,
  /* _changeScriptAssetsHashMapToEntriesMap */_changeScriptAssetsHashMapToEntriesMap,
  /* _extractAndRelateScriptEventFunctionAssets */_extractAndRelateScriptEventFunctionAssets,
  /* _extractAndRelateScriptAttributeAssets */_extractAndRelateScriptAttributeAssets,
  /* _isLightMaterialDataEqual */_isLightMaterialDataEqual,
  /* _addExtractedMaterialAssetData */_addExtractedMaterialAssetData,
  /* _extractAndRelateMaterialAssets */_extractAndRelateMaterialAssets,
  /* _addExtractedTextureAssetData */_addExtractedTextureAssetData,
  /* _extractAndRelateTextureAssets */_extractAndRelateTextureAssets,
  /* _buildMaterialMap */_buildMaterialMap,
  /* _buildScriptEventFunctionAssetHashMap */_buildScriptEventFunctionAssetHashMap,
  /* _buildScriptAttributeAssetHashMap */_buildScriptAttributeAssetHashMap,
  /* _prepareData */_prepareData,
  /* extractAndRelateAssets */extractAndRelateAssets
];

function _findTargetFolderChildNodeByName(folderNode, targetFolderChildNodeName, engineState) {
  return Caml_option.undefined_to_opt(UIStateAssetService$WonderEditor.get(FolderNodeAssetService$WonderEditor.getChildren(folderNode)).find((function (child) {
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

function _createMateiralNodeAndSnapshot(folderNode, param, editorState) {
  var match = IdAssetEditorService$WonderEditor.generateNodeId(editorState);
  var newNodeId = match[1];
  var match$1 = IndexAssetEditorService$WonderEditor.generateImageDataMapIndex(match[0]);
  var newImageDataIndex = match$1[1];
  return ImgCanvasUtils$WonderEditor.clipTargetCanvasSnapshotAndSetToImageDataMapByMaterialNodeId(document.getElementById("inspector-canvas"), document.getElementById("img-canvas"), newNodeId, ImageDataMapAssetEditorService$WonderEditor.setData(newImageDataIndex, ImageDataMapAssetService$WonderEditor.buildData(undefined, undefined, param[1], ImageUtils$WonderEditor.getDefaultMimeType(/* () */0), Caml_option.some(undefined), /* () */0), MaterialNodeAssetEditorService$WonderEditor.addMaterialNodeToAssetTree(folderNode, MaterialNodeAssetService$WonderEditor.buildNode(newNodeId, /* LightMaterial */1, param[0], newImageDataIndex), match$1[0])));
}

function _iterateMaterialArrayBuildMaterialNodes(extractedMaterialAssetDataArr, folderNode, param) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                var match = param$1[1];
                var match$1 = param$1[0];
                var materialType = match$1[1];
                var material = match$1[0];
                var engineState = param[1];
                var editorState = param[0];
                var materialName = OperateTreeAssetLogicService$WonderEditor.getUniqueNodeName(Curry._3(match[0], material, materialType, engineState), folderNode, engineState);
                var engineState$1 = Curry._4(match[1], material, materialType, materialName, engineState);
                var match$2 = MaterialInspectorEngineUtils$WonderEditor.createMaterialSphereIntoInspectorCanvas(/* LightMaterial */1, material, editorState, engineState$1, InspectorCanvasUtils$WonderEditor.disposeContainerGameObjectAllChildrenAndReallocateCPUMemory(/* tuple */[
                          editorState,
                          param[2]
                        ]));
                var inspectorEngineState = StateLogicService$WonderEditor.renderInspectorEngineStateAndReturnState(InspectorCanvasUtils$WonderEditor.restoreArcballCameraControllerAngle(match$2[1][0]));
                var editorState$1 = _createMateiralNodeAndSnapshot(folderNode, /* tuple */[
                      material,
                      materialName
                    ], match$2[0]);
                return /* tuple */[
                        editorState$1,
                        engineState$1,
                        inspectorEngineState
                      ];
              }), /* tuple */[
              param[0],
              param[1],
              param[2]
            ], extractedMaterialAssetDataArr);
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
    var match$2 = _iterateMaterialArrayBuildMaterialNodes(extractedMaterialAssetDataArr, match$1[1], /* tuple */[
          match$1[0],
          engineState,
          StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)
        ]);
    var editorState$1 = match$2[0];
    StateInspectorEngineService$WonderEditor.setState(InspectorCanvasUtils$WonderEditor.disposeContainerGameObjectAllChildrenAndReallocateCPUMemory(/* tuple */[
              editorState$1,
              match$2[2]
            ]));
    return /* tuple */[
            editorState$1,
            match$2[1]
          ];
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
                  var match$2 = ImageDataMapAssetEditorService$WonderEditor.addImageDataIfUint8ArrayNotExist(match$1[1], param$1[2], match$1[0], param[0]);
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

function _addScriptEventFunctionNodeToAssetTree(extractedScriptEventFunctionAssetEntriesArr, selectedFolderNodeInAssetTree, param) {
  var engineState = param[1];
  var editorState = param[0];
  var match = extractedScriptEventFunctionAssetEntriesArr.length === 0;
  if (match) {
    return /* tuple */[
            editorState,
            engineState
          ];
  } else {
    var match$1 = _buildFolderNode("ScriptEventFunctions", selectedFolderNodeInAssetTree, /* tuple */[
          editorState,
          engineState
        ]);
    var folderNode = match$1[1];
    return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                  var match = IdAssetEditorService$WonderEditor.generateNodeId(param[0]);
                  var editorState = ScriptEventFunctionNodeAssetEditorService$WonderEditor.addScriptEventFunctionNodeToAssetTree(folderNode, ScriptEventFunctionNodeAssetService$WonderEditor.buildNode(match[1], param$1[0], param$1[1]), match[0]);
                  return /* tuple */[
                          editorState,
                          param[1]
                        ];
                }), /* tuple */[
                match$1[0],
                engineState
              ], extractedScriptEventFunctionAssetEntriesArr);
  }
}

function _addScriptAttributeNodeToAssetTree(extractedScriptAttributeAssetEntriesArr, selectedFolderNodeInAssetTree, param) {
  var engineState = param[1];
  var editorState = param[0];
  var match = extractedScriptAttributeAssetEntriesArr.length === 0;
  if (match) {
    return /* tuple */[
            editorState,
            engineState
          ];
  } else {
    var match$1 = _buildFolderNode("ScriptAttributes", selectedFolderNodeInAssetTree, /* tuple */[
          editorState,
          engineState
        ]);
    var folderNode = match$1[1];
    return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                  var match = IdAssetEditorService$WonderEditor.generateNodeId(param[0]);
                  var editorState = ScriptAttributeNodeAssetEditorService$WonderEditor.addScriptAttributeNodeToAssetTree(folderNode, ScriptAttributeNodeAssetService$WonderEditor.buildNode(match[1], param$1[0], param$1[1]), match[0]);
                  return /* tuple */[
                          editorState,
                          param[1]
                        ];
                }), /* tuple */[
                match$1[0],
                engineState
              ], extractedScriptAttributeAssetEntriesArr);
  }
}

function addNodeToAssetTree(extractedMaterialAssetDataArr, extractedTextureAssetDataArr, extractedScriptEventFunctionAssetEntriesArr, extractedScriptAttributeAssetEntriesArr, param) {
  var editorState = param[0];
  var selectedFolderNodeInAssetTree = OperateTreeAssetEditorService$WonderEditor.unsafeGetSelectedFolderNodeInAssetTree(editorState);
  return _addScriptAttributeNodeToAssetTree(extractedScriptAttributeAssetEntriesArr, selectedFolderNodeInAssetTree, _addScriptEventFunctionNodeToAssetTree(extractedScriptEventFunctionAssetEntriesArr, selectedFolderNodeInAssetTree, _addTextureNodeToAssetTree(extractedTextureAssetDataArr, selectedFolderNodeInAssetTree, _addMaterialNodeToAssetTree(extractedMaterialAssetDataArr, selectedFolderNodeInAssetTree, /* tuple */[
                          editorState,
                          param[1]
                        ]))));
}

var AssetTree = /* module */[
  /* _findTargetFolderChildNodeByName */_findTargetFolderChildNodeByName,
  /* _buildFolderNode */_buildFolderNode,
  /* _createMateiralNodeAndSnapshot */_createMateiralNodeAndSnapshot,
  /* _iterateMaterialArrayBuildMaterialNodes */_iterateMaterialArrayBuildMaterialNodes,
  /* _addMaterialNodeToAssetTree */_addMaterialNodeToAssetTree,
  /* _addTextureNodeToAssetTree */_addTextureNodeToAssetTree,
  /* _addScriptEventFunctionNodeToAssetTree */_addScriptEventFunctionNodeToAssetTree,
  /* _addScriptAttributeNodeToAssetTree */_addScriptAttributeNodeToAssetTree,
  /* addNodeToAssetTree */addNodeToAssetTree
];

export {
  Extract ,
  AssetTree ,
  
}
/* ImageUtils-WonderEditor Not a pure module */
