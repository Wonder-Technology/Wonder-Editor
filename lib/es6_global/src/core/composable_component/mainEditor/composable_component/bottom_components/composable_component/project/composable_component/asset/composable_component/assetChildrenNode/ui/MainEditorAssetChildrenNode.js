

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_option from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ReasonReact from "../../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Blob$WonderEditor from "../../../../../../../../../../../external/Blob.js";
import * as FileBox$WonderEditor from "../../../atom_component/fileBox/ui/FileBox.js";
import * as FolderBox$WonderEditor from "../../../atom_component/folderBox/ui/FolderBox.js";
import * as AssetUtils$WonderEditor from "../../../utils/AssetUtils.js";
import * as ImageUtils$WonderEditor from "../../../../../../../../../../header/utils/ImageUtils.js";
import * as ArrayService$WonderEditor from "../../../../../../../../../../../../service/atom/ArrayService.js";
import * as ConsoleUtils$WonderEditor from "../../../../../../../../../../../utils/ui/ConsoleUtils.js";
import * as OptionService$WonderEditor from "../../../../../../../../../../../../service/primitive/OptionService.js";
import * as StringService$WonderEditor from "../../../../../../../../../../../../service/atom/StringService.js";
import * as AssetTreeUtils$WonderEditor from "../../utils/AssetTreeUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/StateEngineService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as TreeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/TreeAssetEditorService.js";
import * as TreeRootAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/TreeRootAssetEditorService.js";
import * as WDBNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/WDBNodeMapAssetEditorService.js";
import * as ImageNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/ImageNodeMapAssetEditorService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/BasicSourceTextureEngineService.js";
import * as FolderNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/FolderNodeMapAssetEditorService.js";
import * as MaterialNodeMapAssetLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/asset/MaterialNodeMapAssetLogicService.js";
import * as TextureNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/TextureNodeMapAssetEditorService.js";
import * as AssetDragNodeToFolderEventHandler$WonderEditor from "../../../eventHandler/AssetDragNodeToFolderEventHandler.js";
import * as CurrentNodeDataAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/CurrentNodeDataAssetEditorService.js";
import * as MaterialNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/MaterialNodeMapAssetEditorService.js";

function _isSelected(currentNodeData, nodeId) {
  if (currentNodeData !== undefined) {
    return TreeAssetEditorService$WonderEditor.isIdEqual(nodeId, currentNodeData[/* currentNodeId */0]);
  } else {
    return false;
  }
}

function _buildImageNodeObjectURLIfNoBase64(assetTreeChildrenNodeArr, editorState) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (editorState, param) {
                if (param[/* type_ */2] !== 1) {
                  return editorState;
                } else {
                  var match = SparseMapService$WonderCommonlib.unsafeGet(param[/* nodeId */0], TextureNodeMapAssetEditorService$WonderEditor.getTextureNodeMap(editorState));
                  var image = match[/* image */1];
                  var result = SparseMapService$WonderCommonlib.unsafeGet(image, ImageNodeMapAssetEditorService$WonderEditor.getImageNodeMap(editorState));
                  if (result[/* blobObjectURL */2] !== undefined || result[/* base64 */0] !== undefined) {
                    return editorState;
                  } else {
                    var uint8Array = result[/* uint8Array */1];
                    if (uint8Array !== undefined) {
                      return ImageNodeMapAssetEditorService$WonderEditor.setResult(image, /* record */[
                                  /* base64 */result[/* base64 */0],
                                  /* uint8Array */result[/* uint8Array */1],
                                  /* blobObjectURL */Blob$WonderEditor.createObjectURL(Blob$WonderEditor.newBlobFromArrayBuffer(Caml_option.valFromOption(uint8Array), result[/* mimeType */4])),
                                  /* name */result[/* name */3],
                                  /* mimeType */result[/* mimeType */4]
                                ], editorState);
                    } else {
                      ConsoleUtils$WonderEditor.error("_buildImageNodeObjectURLIfNoBase64:image->uint8Array should exist", editorState);
                      return editorState;
                    }
                  }
                }
              }), editorState, assetTreeChildrenNodeArr);
}

function _getNodeNameByType(param, param$1) {
  var engineState = param$1[1];
  var editorState = param$1[0];
  var nodeId = param[/* nodeId */0];
  switch (param[/* type_ */2]) {
    case 0 : 
        return SparseMapService$WonderCommonlib.unsafeGet(nodeId, FolderNodeMapAssetEditorService$WonderEditor.getFolderNodeMap(editorState))[/* name */0];
    case 1 : 
        var match = SparseMapService$WonderCommonlib.unsafeGet(nodeId, TextureNodeMapAssetEditorService$WonderEditor.getTextureNodeMap(editorState));
        return BasicSourceTextureEngineService$WonderEditor.unsafeGetBasicSourceTextureName(match[/* textureComponent */0], engineState);
    case 2 : 
        return SparseMapService$WonderCommonlib.unsafeGet(nodeId, WDBNodeMapAssetEditorService$WonderEditor.getWDBNodeMap(editorState))[/* name */0];
    case 3 : 
        return MaterialNodeMapAssetLogicService$WonderEditor.getMaterialBaseName(nodeId, engineState, MaterialNodeMapAssetEditorService$WonderEditor.getMaterialNodeMap(editorState));
    
  }
}

function _sortByName(assetTreeChildrenNodeArr, param) {
  var engineState = param[1];
  var editorState = param[0];
  return assetTreeChildrenNodeArr.sort((function (node1, node2) {
                return _getNodeNameByType(node1, /* tuple */[
                                editorState,
                                engineState
                              ]).charAt(0).localeCompare(_getNodeNameByType(node2, /* tuple */[
                                  editorState,
                                  engineState
                                ]).charAt(0));
              }));
}

function sortAssetTreeChildrenNode(assetTreeChildrenNodeArr, param) {
  var engineState = param[1];
  var editorState = param[0];
  var folderAssetTreeChildrenNodeArr = assetTreeChildrenNodeArr.filter((function (param) {
          return param[/* type_ */2] === /* Folder */0;
        }));
  var wdbAssetTreeChildrenNodeArr = assetTreeChildrenNodeArr.filter((function (param) {
          return param[/* type_ */2] === /* WDB */2;
        }));
  var materialAssetTreeChildrenNodeArr = assetTreeChildrenNodeArr.filter((function (param) {
          return param[/* type_ */2] === /* Material */3;
        }));
  var textureAssetTreeChildrenNodeArr = assetTreeChildrenNodeArr.filter((function (param) {
          return param[/* type_ */2] === /* Texture */1;
        }));
  var __x = ArrayService$WonderEditor.fastConcat(_sortByName(folderAssetTreeChildrenNodeArr, /* tuple */[
            editorState,
            engineState
          ]), _sortByName(wdbAssetTreeChildrenNodeArr, /* tuple */[
            editorState,
            engineState
          ]));
  var __x$1 = ArrayService$WonderEditor.fastConcat(__x, _sortByName(materialAssetTreeChildrenNodeArr, /* tuple */[
            editorState,
            engineState
          ]));
  return ArrayService$WonderEditor.fastConcat(__x$1, _sortByName(textureAssetTreeChildrenNodeArr, /* tuple */[
                  editorState,
                  engineState
                ]));
}

function showSpecificTreeNodeChildren(assetTreeChildrenNodeArr, param, param$1, param$2) {
  var engineState = param$2[1];
  var editorState = param$2[0];
  var currentNodeData = param$1[2];
  var debounceTime = param$1[1];
  var dragImg = param$1[0];
  var dispatchFunc = param[1];
  var store = param[0];
  var result = sortAssetTreeChildrenNode(assetTreeChildrenNodeArr, /* tuple */[
          editorState,
          engineState
        ]).map((function (param) {
          var type_ = param[/* type_ */2];
          var nodeId = param[/* nodeId */0];
          switch (type_) {
            case 0 : 
                var match = SparseMapService$WonderCommonlib.unsafeGet(nodeId, FolderNodeMapAssetEditorService$WonderEditor.getFolderNodeMap(editorState));
                return ReasonReact.element(StringService$WonderEditor.intToString(nodeId), undefined, FolderBox$WonderEditor.make(store, dispatchFunc, dragImg, "move", "./public/img/assetPackage.png", nodeId, type_, match[/* name */0], _isSelected(currentNodeData, nodeId), AssetUtils$WonderEditor.getWidget(/* () */0), debounceTime, Curry._2(AssetDragNodeToFolderEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
                                    store,
                                    dispatchFunc
                                  ], /* () */0), AssetUtils$WonderEditor.isWidget, AssetTreeUtils$WonderEditor.isTreeNodeRelationError, /* array */[]));
            case 1 : 
                var match$1 = SparseMapService$WonderCommonlib.unsafeGet(nodeId, TextureNodeMapAssetEditorService$WonderEditor.getTextureNodeMap(editorState));
                var param$1 = SparseMapService$WonderCommonlib.unsafeGet(match$1[/* image */1], ImageNodeMapAssetEditorService$WonderEditor.getImageNodeMap(editorState));
                var blobObjectURL = param$1[/* blobObjectURL */2];
                var tmp;
                if (blobObjectURL !== undefined) {
                  tmp = blobObjectURL;
                } else {
                  var base64 = param$1[/* base64 */0];
                  if (base64 !== undefined) {
                    tmp = base64;
                  } else {
                    ConsoleUtils$WonderEditor.error("texture->source should has base64 or blobObjectURL data, but acutally not has", editorState);
                    tmp = ImageUtils$WonderEditor.getNullImageSrc(/* () */0);
                  }
                }
                return ReasonReact.element(StringService$WonderEditor.intToString(nodeId), undefined, FileBox$WonderEditor.make(store, dispatchFunc, "move", dragImg, tmp, nodeId, type_, BasicSourceTextureEngineService$WonderEditor.unsafeGetBasicSourceTextureName(match$1[/* textureComponent */0], engineState), AssetUtils$WonderEditor.getWidget(/* () */0), _isSelected(currentNodeData, nodeId), /* array */[]));
            case 2 : 
                var match$2 = SparseMapService$WonderCommonlib.unsafeGet(nodeId, WDBNodeMapAssetEditorService$WonderEditor.getWDBNodeMap(editorState));
                return ReasonReact.element(StringService$WonderEditor.intToString(nodeId), undefined, FileBox$WonderEditor.make(store, dispatchFunc, "copyMove", dragImg, "./public/img/wdb.png", nodeId, type_, match$2[/* name */0], AssetUtils$WonderEditor.getWidget(/* () */0), _isSelected(currentNodeData, nodeId), /* array */[]));
            case 3 : 
                var baseName = MaterialNodeMapAssetLogicService$WonderEditor.getMaterialBaseName(nodeId, engineState, MaterialNodeMapAssetEditorService$WonderEditor.getMaterialNodeMap(editorState));
                return ReasonReact.element(StringService$WonderEditor.intToString(nodeId), undefined, FileBox$WonderEditor.make(store, dispatchFunc, "move", dragImg, "./public/img/mat.png", nodeId, type_, baseName, AssetUtils$WonderEditor.getWidget(/* () */0), _isSelected(currentNodeData, nodeId), /* array */[]));
            
          }
        }));
  StateEngineService$WonderEditor.setState(engineState);
  StateEditorService$WonderEditor.setState(editorState);
  return result;
}

function buildCurrentTreeNodeChildrenComponent(param, dragImg, debounceTime) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var assetTreeChildrenNodeArr = OptionService$WonderEditor.unsafeGet(TreeAssetEditorService$WonderEditor.getSpecificTreeNodeById(AssetTreeUtils$WonderEditor.getTargetTreeNodeId(editorState), TreeRootAssetEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState)))[/* children */1];
  var editorState$1 = _buildImageNodeObjectURLIfNoBase64(assetTreeChildrenNodeArr, editorState);
  return showSpecificTreeNodeChildren(assetTreeChildrenNodeArr, /* tuple */[
              param[0],
              param[1]
            ], /* tuple */[
              dragImg,
              debounceTime,
              CurrentNodeDataAssetEditorService$WonderEditor.getCurrentNodeData(editorState$1)
            ], /* tuple */[
              editorState$1,
              engineState
            ]);
}

var Method = /* module */[
  /* _isSelected */_isSelected,
  /* _buildImageNodeObjectURLIfNoBase64 */_buildImageNodeObjectURLIfNoBase64,
  /* _getNodeNameByType */_getNodeNameByType,
  /* _sortByName */_sortByName,
  /* sortAssetTreeChildrenNode */sortAssetTreeChildrenNode,
  /* showSpecificTreeNodeChildren */showSpecificTreeNodeChildren,
  /* buildCurrentTreeNodeChildrenComponent */buildCurrentTreeNodeChildrenComponent
];

var component = ReasonReact.statelessComponent("MainEditorAssetHeader");

function render(param, dragImg, debounceTime, _self) {
  return React.createElement("article", {
              key: "assetChildrenNode",
              className: "wonder-asset-assetChildren"
            }, buildCurrentTreeNodeChildrenComponent(/* tuple */[
                  param[0],
                  param[1]
                ], dragImg, debounceTime));
}

function make(store, dispatchFunc, dragImg, debounceTime, _children) {
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
              return render(/* tuple */[
                          store,
                          dispatchFunc
                        ], dragImg, debounceTime, self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  Method ,
  component ,
  render ,
  make ,
  
}
/* component Not a pure module */
