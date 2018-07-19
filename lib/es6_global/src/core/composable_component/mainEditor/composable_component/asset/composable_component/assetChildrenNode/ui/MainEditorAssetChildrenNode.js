

import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as FileBox$WonderEditor from "../../../atom_component/fileBox/ui/FileBox.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as FolderBox$WonderEditor from "../../../atom_component/folderBox/ui/FolderBox.js";
import * as AssetUtils$WonderEditor from "../../../utils/AssetUtils.js";
import * as OptionService$WonderEditor from "../../../../../../../../service/primitive/OptionService.js";
import * as AssetTreeUtils$WonderEditor from "../../utils/AssetTreeUtils.js";
import * as StateAssetService$WonderEditor from "../../../../../../../../service/state/asset/StateAssetService.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as JsonNodeMapAssetService$WonderEditor from "../../../../../../../../service/state/asset/JsonNodeMapAssetService.js";
import * as AssetTreeRootAssetService$WonderEditor from "../../../../../../../../service/state/asset/AssetTreeRootAssetService.js";
import * as FolderNodeMapAssetService$WonderEditor from "../../../../../../../../service/state/asset/FolderNodeMapAssetService.js";
import * as ImageBase64MapAssetService$WonderEditor from "../../../../../../../../service/state/asset/ImageBase64MapAssetService.js";
import * as TextureNodeMapAssetService$WonderEditor from "../../../../../../../../service/state/asset/TextureNodeMapAssetService.js";
import * as CurrentNodeDataAssetService$WonderEditor from "../../../../../../../../service/state/asset/CurrentNodeDataAssetService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../service/state/engine/BasicSourceTextureEngineService.js";

function _isSelected(currentNodeData, nodeId) {
  if (currentNodeData !== undefined) {
    return AssetUtils$WonderEditor.isIdEqual(nodeId, currentNodeData[/* currentNodeId */0]);
  } else {
    return false;
  }
}

function showSpecificTreeNodeChildren(param, param$1, assetState, assetTreeNodeChildrenArr) {
  var currentNodeData = param$1[2];
  var debounceTime = param$1[1];
  var dragImg = param$1[0];
  var dispatchFunc = param[1];
  var store = param[0];
  return assetTreeNodeChildrenArr.map((function (param) {
                var nodeId = param[/* id */0];
                var type_ = param[/* type_ */2];
                switch (type_) {
                  case 0 : 
                      var match = SparseMapService$WonderCommonlib.unsafeGet(nodeId, FolderNodeMapAssetService$WonderEditor.getFolderNodeMap(assetState));
                      return ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, FolderBox$WonderEditor.make(store, dispatchFunc, dragImg, "./public/img/11.jpg", nodeId, type_, match[/* name */0], _isSelected(currentNodeData, nodeId), AssetUtils$WonderEditor.getFlag(/* () */0), debounceTime, (function (param) {
                                        return AssetTreeUtils$WonderEditor.onDrop(dispatchFunc, param);
                                      }), AssetUtils$WonderEditor.isFlag, AssetUtils$WonderEditor.isTreeNodeRelationError, /* array */[]));
                  case 1 : 
                      var match$1 = SparseMapService$WonderCommonlib.unsafeGet(nodeId, JsonNodeMapAssetService$WonderEditor.getJsonNodeMap(assetState));
                      return ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, FileBox$WonderEditor.make(store, dispatchFunc, dragImg, "./public/img/12.jpg", nodeId, type_, match$1[/* name */0], AssetUtils$WonderEditor.getFlag(/* () */0), _isSelected(currentNodeData, nodeId), /* array */[]));
                  case 2 : 
                      var match$2 = SparseMapService$WonderCommonlib.unsafeGet(nodeId, TextureNodeMapAssetService$WonderEditor.getTextureNodeMap(assetState));
                      var textureIndex = match$2[/* textureIndex */0];
                      return ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, FileBox$WonderEditor.make(store, dispatchFunc, dragImg, SparseMapService$WonderCommonlib.unsafeGet(textureIndex, ImageBase64MapAssetService$WonderEditor.getImageBase64Map(assetState)), nodeId, type_, StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                            return BasicSourceTextureEngineService$WonderEditor.unsafeGetBasicSourceTextureName(textureIndex, param);
                                          })), AssetUtils$WonderEditor.getFlag(/* () */0), _isSelected(currentNodeData, nodeId), /* array */[]));
                  
                }
              }));
}

function buildCurrentTreeNodeChildrenComponent(param, dragImg, debounceTime) {
  var assetState = StateAssetService$WonderEditor.getState(/* () */0);
  return showSpecificTreeNodeChildren(/* tuple */[
              param[0],
              param[1]
            ], /* tuple */[
              dragImg,
              debounceTime,
              CurrentNodeDataAssetService$WonderEditor.getCurrentNodeData(assetState)
            ], assetState, OptionService$WonderEditor.unsafeGet(AssetUtils$WonderEditor.getSpecificTreeNodeById(AssetUtils$WonderEditor.getTargetTreeNodeId(assetState), AssetTreeRootAssetService$WonderEditor.unsafeGetAssetTreeRoot(assetState)))[/* children */1]);
}

var Method = /* module */[
  /* _isSelected */_isSelected,
  /* showSpecificTreeNodeChildren */showSpecificTreeNodeChildren,
  /* buildCurrentTreeNodeChildrenComponent */buildCurrentTreeNodeChildrenComponent
];

var component = ReasonReact.statelessComponent("MainEditorAssetHeader");

function render(param, dragImg, debounceTime, _) {
  return React.createElement("article", {
              key: "assetChildrenNode",
              className: "wonder-asset-assetChildren"
            }, buildCurrentTreeNodeChildrenComponent(/* tuple */[
                  param[0],
                  param[1]
                ], dragImg, debounceTime));
}

function make(store, dispatchFunc, dragImg, debounceTime, _) {
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
