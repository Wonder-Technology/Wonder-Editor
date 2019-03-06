

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Blob$WonderEditor from "../../../../../../../../../../../external/Blob.js";
import * as Result$WonderEditor from "../../../../../../../../../../../../module/Result.js";
import * as FileBox$WonderEditor from "../../../atom_component/fileBox/ui/FileBox.js";
import * as FolderBox$WonderEditor from "../../../atom_component/folderBox/ui/FolderBox.js";
import * as ResultUtils$WonderEditor from "../../../../../../../../../../../utils/result/ResultUtils.js";
import * as ArrayService$WonderEditor from "../../../../../../../../../../../../service/atom/ArrayService.js";
import * as OptionService$WonderEditor from "../../../../../../../../../../../../service/primitive/OptionService.js";
import * as StringService$WonderEditor from "../../../../../../../../../../../../service/atom/StringService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as NodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/NodeAssetService.js";
import * as ImageDataMapUtils$WonderEditor from "../../../../../../../../../../utils/ImageDataMapUtils.js";
import * as AssetWidgetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/widget/AssetWidgetService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as WDBNodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/WDBNodeAssetService.js";
import * as FolderNodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/FolderNodeAssetService.js";
import * as TextureNodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/TextureNodeAssetService.js";
import * as MaterialNodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/MaterialNodeAssetService.js";
import * as NodeNameAssetLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/asset/NodeNameAssetLogicService.js";
import * as OperateTreeAssetLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/asset/OperateTreeAssetLogicService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as TextureNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/TextureNodeAssetEditorService.js";
import * as ImageDataMapAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/ImageDataMapAssetEditorService.js";
import * as CurrentNodeIdAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/CurrentNodeIdAssetEditorService.js";
import * as AssetDragNodeToFolderEventHandler$WonderEditor from "../../../eventHandler/AssetDragNodeToFolderEventHandler.js";

function _isSelected(currentNodeId, nodeId) {
  return OptionService$WonderEditor.andThenWithDefault((function (currentNodeId) {
                return NodeAssetService$WonderEditor.isIdEqual(nodeId, currentNodeId);
              }), false, currentNodeId);
}

function _build(imageDataIndex, editorState) {
  var data = ImageDataMapAssetEditorService$WonderEditor.unsafeGetData(imageDataIndex, editorState);
  var mimeType = data[/* mimeType */4];
  var uint8Array = data[/* uint8Array */1];
  var base64 = data[/* base64 */0];
  return OptionService$WonderEditor.either((function (editorState, param) {
                return Result$WonderEditor.SameDataResult[/* success */0](editorState);
              }), (function (editorState) {
                return OptionService$WonderEditor.either((function (editorState, param) {
                              return Result$WonderEditor.SameDataResult[/* success */0](editorState);
                            }), (function (editorState) {
                              return OptionService$WonderEditor.either((function (editorState, param) {
                                            return Result$WonderEditor.SameDataResult[/* success */0](ImageDataMapAssetEditorService$WonderEditor.setData(imageDataIndex, /* record */[
                                                            /* base64 */data[/* base64 */0],
                                                            /* uint8Array */data[/* uint8Array */1],
                                                            /* blobObjectURL */Blob$WonderEditor.createObjectURL(Blob$WonderEditor.newBlobFromArrayBuffer(uint8Array, mimeType)),
                                                            /* name */data[/* name */3],
                                                            /* mimeType */data[/* mimeType */4]
                                                          ], editorState));
                                          }), (function (editorState) {
                                            return Result$WonderEditor.SameDataResult[/* fail */1](/* tuple */[
                                                        "image->uint8Array should exist",
                                                        editorState
                                                      ]);
                                          }), editorState, uint8Array);
                            }), editorState, base64);
              }), editorState, data[/* blobObjectURL */2]);
}

function _buildImageDataObjectURLIfNoBase64(editorState) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (editorState, imageDataIndex) {
                return Result$WonderEditor.SameDataResult[/* either */4]((function (param) {
                              return _build(imageDataIndex, param);
                            }), editorState);
              }), Result$WonderEditor.SameDataResult[/* success */0](editorState), TextureNodeAssetEditorService$WonderEditor.findAllTextureNodes(editorState).map((function (textureNode) {
                    return TextureNodeAssetService$WonderEditor.getNodeData(textureNode)[/* imageDataIndex */1];
                  })));
}

function _sortByName(assetTreeChildrenNodeArr, engineState) {
  return assetTreeChildrenNodeArr.sort((function (node1, node2) {
                return NodeNameAssetLogicService$WonderEditor.getNodeName(node1, engineState).charAt(0).localeCompare(NodeNameAssetLogicService$WonderEditor.getNodeName(node2, engineState).charAt(0));
              }));
}

function sortAssetTreeChildrenNode(assetTreeChildrenNodeArr, engineState) {
  var folderAssetTreeChildrenNodeArr = assetTreeChildrenNodeArr.filter(FolderNodeAssetService$WonderEditor.isFolderNode);
  var wdbAssetTreeChildrenNodeArr = assetTreeChildrenNodeArr.filter(WDBNodeAssetService$WonderEditor.isWDBNode);
  var materialAssetTreeChildrenNodeArr = assetTreeChildrenNodeArr.filter(MaterialNodeAssetService$WonderEditor.isMaterialNode);
  var textureAssetTreeChildrenNodeArr = assetTreeChildrenNodeArr.filter(TextureNodeAssetService$WonderEditor.isTextureNode);
  return ArrayService$WonderEditor.fastConcatArrays(/* array */[
              _sortByName(folderAssetTreeChildrenNodeArr, engineState),
              _sortByName(wdbAssetTreeChildrenNodeArr, engineState),
              _sortByName(materialAssetTreeChildrenNodeArr, engineState),
              _sortByName(textureAssetTreeChildrenNodeArr, engineState)
            ]);
}

function showSpecificTreeNodeChildren(param, param$1, engineState, editorState) {
  var currentNodeId = param$1[2];
  var debounceTime = param$1[1];
  var dragImg = param$1[0];
  var dispatchFunc = param[1];
  var uiState = param[0];
  var widget = AssetWidgetService$WonderEditor.getWidget(/* () */0);
  var result = ArrayService$WonderEditor.traverseSameDataResultAndCollectByApply((function (node) {
          var nodeId = NodeAssetService$WonderEditor.getNodeId(node);
          var key = StringService$WonderEditor.intToString(nodeId);
          var isSelected = _isSelected(currentNodeId, nodeId);
          return NodeAssetService$WonderEditor.handleNode(node, (function (nodeId, param) {
                        var fileName = NodeNameAssetLogicService$WonderEditor.getTextureNodeName(param[/* textureComponent */0], engineState);
                        return Result$WonderEditor.SameDataResult[/* either */4]((function (imgSrc) {
                                      return Result$WonderEditor.SameDataResult[/* success */0](ReasonReact.element(key, undefined, FileBox$WonderEditor.make(uiState, dispatchFunc, "move", dragImg, imgSrc, nodeId, fileName, widget, isSelected, /* array */[])));
                                    }), ImageDataMapUtils$WonderEditor.getImgSrc(param[/* imageDataIndex */1], editorState));
                      }), (function (nodeId, param) {
                        var fileName = NodeNameAssetLogicService$WonderEditor.getMaterialNodeName(param[/* materialComponent */1], param[/* type_ */0], engineState);
                        return Result$WonderEditor.SameDataResult[/* success */0](ReasonReact.element(key, undefined, FileBox$WonderEditor.make(uiState, dispatchFunc, "move", dragImg, "./public/img/mat.png", nodeId, fileName, widget, isSelected, /* array */[])));
                      }), (function (nodeId, nodeData) {
                        var fileName = WDBNodeAssetService$WonderEditor.getNodeName(nodeData);
                        return Result$WonderEditor.SameDataResult[/* success */0](ReasonReact.element(key, undefined, FileBox$WonderEditor.make(uiState, dispatchFunc, "copyMove", dragImg, "./public/img/wdb.png", nodeId, fileName, widget, isSelected, /* array */[])));
                      }), (function (nodeId, nodeData, children) {
                        var name = FolderNodeAssetService$WonderEditor.getNodeName(nodeData);
                        return Result$WonderEditor.SameDataResult[/* success */0](ReasonReact.element(key, undefined, FolderBox$WonderEditor.make(uiState, dispatchFunc, dragImg, "move", "./public/img/assetPackage.png", nodeId, name, isSelected, widget, debounceTime, Curry._2(AssetDragNodeToFolderEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
                                                uiState,
                                                dispatchFunc
                                              ], /* () */0), AssetWidgetService$WonderEditor.isWidget, OperateTreeAssetLogicService$WonderEditor.checkNodeRelation, /* array */[])));
                      }));
        }), sortAssetTreeChildrenNode(FolderNodeAssetService$WonderEditor.getChildrenNodes(OperateTreeAssetEditorService$WonderEditor.unsafeGetSelectedFolderNodeInAssetTree(editorState)), engineState));
  StateEngineService$WonderEditor.setState(engineState);
  StateEditorService$WonderEditor.setState(editorState);
  return result;
}

function buildCurrentTreeNodeChildrenComponent(param, dragImg, debounceTime) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var partial_arg_002 = CurrentNodeIdAssetEditorService$WonderEditor.getCurrentNodeId(editorState);
  var partial_arg = /* tuple */[
    dragImg,
    debounceTime,
    partial_arg_002
  ];
  var partial_arg_000 = param[0];
  var partial_arg_001 = param[1];
  var partial_arg$1 = /* tuple */[
    partial_arg_000,
    partial_arg_001
  ];
  return ResultUtils$WonderEditor.handleError(Result$WonderEditor.SameDataResult[/* either */4]((function (param) {
                    return showSpecificTreeNodeChildren(partial_arg$1, partial_arg, engineState, param);
                  }), _buildImageDataObjectURLIfNoBase64(editorState)));
}

var Method = /* module */[
  /* _isSelected */_isSelected,
  /* _build */_build,
  /* _buildImageDataObjectURLIfNoBase64 */_buildImageDataObjectURLIfNoBase64,
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

function make(uiState, dispatchFunc, dragImg, debounceTime, _children) {
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
                          uiState,
                          dispatchFunc
                        ], dragImg, debounceTime, self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

export {
  Method ,
  component ,
  render ,
  make ,
  
}
/* component Not a pure module */
