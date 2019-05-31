

import * as Block from "../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as DomHelper$WonderEditor from "../../../../external/DomHelper.js";
import * as SelectTree$WonderEditor from "../../../../atom_component/selectTree/SelectTree.js";
import * as ArrayService$WonderEditor from "../../../../../service/atom/ArrayService.js";
import * as LanguageUtils$WonderEditor from "../../../../utils/language/LanguageUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SelectTreeUtils$WonderEditor from "../../../../atom_component/selectTree/utils/SelectTreeUtils.js";
import * as SingleInputModal$WonderEditor from "../../../../atom_component/singleInputModal/SingleInputModal.js";
import * as ImageDataMapUtils$WonderEditor from "../../../utils/ImageDataMapUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../service/stateTuple/logic/StateLogicService.js";
import * as ImageDataAssetService$WonderEditor from "../../../../../service/record/editor/asset/ImageDataAssetService.js";
import * as LanguageEditorService$WonderEditor from "../../../../../service/state/editor/LanguageEditorService.js";
import * as HeaderAssetBundleUtils$WonderEditor from "./utils/HeaderAssetBundleUtils.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../service/state/engine/LightMaterialEngineService.js";
import * as ValueNodeSelectTreeService$WonderEditor from "../../../../../service/record/ui/selectTree/ValueNodeSelectTreeService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";
import * as IterateTreeSelectTreeService$WonderEditor from "../../../../../service/record/ui/selectTree/IterateTreeSelectTreeService.js";
import * as TextureNodeAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/TextureNodeAssetEditorService.js";
import * as ImageDataMapAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/ImageDataMapAssetEditorService.js";
import * as GenerateAssetBundleEngineService$WonderEditor from "../../../../../service/state/engine/asset_bundle/GenerateAssetBundleEngineService.js";

function _toggleSelect(tree, send, isSelect, node) {
  var tree$1 = SelectTreeUtils$WonderEditor.setSelectForSelectTree(tree, isSelect, node);
  return Curry._1(send, /* UpdateSelectTreeForGenerateSingleRAB */[tree$1]);
}

function buildGenerateSingleRABUI(send, selectTreeForGenerateSingleRAB) {
  return ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, SelectTree$WonderEditor.make(selectTreeForGenerateSingleRAB, (function (type_, value, editorState) {
                    switch (type_) {
                      case "geometry" : 
                          return "./public/img/wdb.png";
                      case "scriptAttribute" : 
                          return "./public/img/scriptAttribute.png";
                      case "scriptEventFunction" : 
                          return "./public/img/selectJsFunc.png";
                      case "basicMaterial" : 
                      case "lightMaterial" : 
                      case "texture" : 
                          return ImageDataMapUtils$WonderEditor.getImgSrc(value[/* imageDataIndex */1], editorState);
                      default:
                        return undefined;
                    }
                  }), (function (param, param$1) {
                    return _toggleSelect(selectTreeForGenerateSingleRAB, send, param, param$1);
                  }), /* array */[]));
}

function _getMaterialComponentFromMaterialData(materialData) {
  return materialData[/* materialComponent */0];
}

function _addLightMaterialContainedTextureData(lightMaterials, textures, param) {
  var engineState = param[1];
  var editorState = param[0];
  return ArrayService$WonderCommonlib.reduceOneParam((function (textures, lightMaterialComponent) {
                var match = LightMaterialEngineService$WonderEditor.hasLightMaterialDiffuseMap(lightMaterialComponent, engineState);
                if (match) {
                  var match$1 = TextureNodeAssetEditorService$WonderEditor.getDataByTextureComponent(LightMaterialEngineService$WonderEditor.unsafeGetLightMaterialDiffuseMap(lightMaterialComponent, engineState), editorState);
                  if (match$1 !== undefined) {
                    var textureNodeData = match$1;
                    return ArrayService$WonderEditor.push(/* record */[
                                /* textureComponent */textureNodeData[/* textureComponent */0],
                                /* imageDataIndex */textureNodeData[/* imageDataIndex */1]
                              ], textures);
                  } else {
                    return textures;
                  }
                } else {
                  return textures;
                }
              }), textures, lightMaterials);
}

function _generateSingleRABResourceData(selectTreeForGenerateSingleRAB, param) {
  var editorState = param[0];
  var match = IterateTreeSelectTreeService$WonderEditor.fold((function (acc, nodeId, nodeData, children) {
          return acc;
        }), /* tuple */[
        ArrayService$WonderCommonlib.createEmpty(/* () */0),
        ArrayService$WonderCommonlib.createEmpty(/* () */0),
        ArrayService$WonderCommonlib.createEmpty(/* () */0),
        ArrayService$WonderCommonlib.createEmpty(/* () */0),
        ArrayService$WonderCommonlib.createEmpty(/* () */0),
        ArrayService$WonderCommonlib.createEmpty(/* () */0)
      ], selectTreeForGenerateSingleRAB, (function (param, nodeId, nodeData) {
          var scriptAttributeDataArr = param[5];
          var scriptEventFunctionDataArr = param[4];
          var geometrys = param[3];
          var textures = param[2];
          var lightMaterials = param[1];
          var basicMaterials = param[0];
          var match = ValueNodeSelectTreeService$WonderEditor.getIsSelect(nodeData);
          if (match) {
            var value = ValueNodeSelectTreeService$WonderEditor.getValue(nodeData);
            var match$1 = ValueNodeSelectTreeService$WonderEditor.getType(nodeData);
            switch (match$1) {
              case "basicMaterial" : 
                  return /* tuple */[
                          ArrayService$WonderEditor.push(value[/* materialComponent */0], basicMaterials),
                          lightMaterials,
                          textures,
                          geometrys,
                          scriptEventFunctionDataArr,
                          scriptAttributeDataArr
                        ];
              case "geometry" : 
                  return /* tuple */[
                          basicMaterials,
                          lightMaterials,
                          textures,
                          ArrayService$WonderEditor.push(value, geometrys),
                          scriptEventFunctionDataArr,
                          scriptAttributeDataArr
                        ];
              case "lightMaterial" : 
                  return /* tuple */[
                          basicMaterials,
                          ArrayService$WonderEditor.push(value[/* materialComponent */0], lightMaterials),
                          textures,
                          geometrys,
                          scriptEventFunctionDataArr,
                          scriptAttributeDataArr
                        ];
              case "scriptAttribute" : 
                  return /* tuple */[
                          basicMaterials,
                          lightMaterials,
                          textures,
                          geometrys,
                          scriptEventFunctionDataArr,
                          ArrayService$WonderEditor.push(value, scriptAttributeDataArr)
                        ];
              case "scriptEventFunction" : 
                  return /* tuple */[
                          basicMaterials,
                          lightMaterials,
                          textures,
                          geometrys,
                          ArrayService$WonderEditor.push(value, scriptEventFunctionDataArr),
                          scriptAttributeDataArr
                        ];
              case "texture" : 
                  return /* tuple */[
                          basicMaterials,
                          lightMaterials,
                          ArrayService$WonderEditor.push(value, textures),
                          geometrys,
                          scriptEventFunctionDataArr,
                          scriptAttributeDataArr
                        ];
              default:
                return /* tuple */[
                        basicMaterials,
                        lightMaterials,
                        textures,
                        geometrys,
                        scriptEventFunctionDataArr,
                        scriptAttributeDataArr
                      ];
            }
          } else {
            return /* tuple */[
                    basicMaterials,
                    lightMaterials,
                    textures,
                    geometrys,
                    scriptEventFunctionDataArr,
                    scriptAttributeDataArr
                  ];
          }
        }), /* () */0);
  var lightMaterials = match[1];
  var textures = _addLightMaterialContainedTextureData(lightMaterials, match[2], /* tuple */[
        editorState,
        param[1]
      ]);
  var imageDataMap = ImmutableSparseMapService$WonderCommonlib.mapValid((function (imageData) {
          var imageName = imageData[/* name */3];
          return /* record */[
                  /* uint8Array */ImageDataAssetService$WonderEditor.getUint8Array(imageData, (function (param) {
                          return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_generateSingleRABResourceData", "image(whose name is " + (String(imageName) + ") should has uint8Array or base64 data"), "", "", ""));
                        })),
                  /* name */imageName,
                  /* mimeType */imageData[/* mimeType */4]
                ];
        }), ImageDataMapAssetEditorService$WonderEditor.getMap(editorState));
  return /* tuple */[
          ArrayService$WonderCommonlib.removeDuplicateItems(match[0]),
          ArrayService$WonderCommonlib.removeDuplicateItems(lightMaterials),
          ArrayService$WonderEditor.removeDuplicateItems((function (param) {
                  return String(param[/* textureComponent */0]);
                }), textures),
          ArrayService$WonderCommonlib.removeDuplicateItems(match[3]),
          ArrayService$WonderEditor.removeDuplicateItems((function (param) {
                  return param[/* name */0];
                }), match[4]),
          ArrayService$WonderEditor.removeDuplicateItems((function (param) {
                  return param[/* name */0];
                }), match[5]),
          imageDataMap
        ];
}

function generateAndDownloadSingleRAB(selectTreeForGenerateSingleRAB, baseName, param) {
  var engineState = param[1];
  var match = _generateSingleRABResourceData(selectTreeForGenerateSingleRAB, /* tuple */[
        param[0],
        engineState
      ]);
  var rab = GenerateAssetBundleEngineService$WonderEditor.generateSingleRAB(GenerateAssetBundleEngineService$WonderEditor.buildResourceData(match[0], match[1], match[2], match[3], match[4], match[5], match[6]), engineState);
  return HeaderAssetBundleUtils$WonderEditor.downloadAB("" + (String(baseName) + ".rab"), rab);
}

function renderGenerateSingleRABModal(languageType, selectTreeForGenerateSingleRAB, send, param) {
  var submitFunc = param[1];
  return ReasonReact.element(undefined, undefined, SingleInputModal$WonderEditor.make(param[0], LanguageUtils$WonderEditor.getHeaderLanguageDataByType("generate-single-rab", languageType), "name", /* array */[buildGenerateSingleRABUI(send, selectTreeForGenerateSingleRAB)], (function (baseName) {
                    StateLogicService$WonderEditor.getStateToGetData((function (param) {
                            return generateAndDownloadSingleRAB(selectTreeForGenerateSingleRAB, baseName, param);
                          }));
                    return Curry._1(submitFunc, /* () */0);
                  }), "WonderSingleRAB", /* array */[]));
}

var Method = /* module */[
  /* _toggleSelect */_toggleSelect,
  /* buildGenerateSingleRABUI */buildGenerateSingleRABUI,
  /* _getMaterialComponentFromMaterialData */_getMaterialComponentFromMaterialData,
  /* _addLightMaterialContainedTextureData */_addLightMaterialContainedTextureData,
  /* _generateSingleRABResourceData */_generateSingleRABResourceData,
  /* generateAndDownloadSingleRAB */generateAndDownloadSingleRAB,
  /* renderGenerateSingleRABModal */renderGenerateSingleRABModal
];

var component = ReasonReact.reducerComponent("HeaderAssetBundleGenerateSingleRAB");

function reducer(action, state) {
  return /* Update */Block.__(0, [/* record */[/* selectTreeForGenerateSingleRAB */action[0]]]);
}

function render(param, param$1) {
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  return React.createElement("article", {
              key: "wonderAssetBundleRab",
              className: "wonder-assetBundle-rab"
            }, renderGenerateSingleRABModal(languageType, param[/* state */1][/* selectTreeForGenerateSingleRAB */0], param[/* send */3], /* tuple */[
                  param$1[0],
                  param$1[1]
                ]));
}

function make(selectTreeForGenerateSingleRAB, closeFunc, submitFunc, _children) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(self, /* tuple */[
                          closeFunc,
                          submitFunc
                        ]);
            }),
          /* initialState */(function (param) {
              return /* record */[/* selectTreeForGenerateSingleRAB */selectTreeForGenerateSingleRAB];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */reducer,
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

export {
  Method ,
  component ,
  reducer ,
  render ,
  make ,
  
}
/* component Not a pure module */
