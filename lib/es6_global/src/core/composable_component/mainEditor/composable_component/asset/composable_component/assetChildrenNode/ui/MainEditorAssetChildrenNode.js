

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

function _isSelected(currentNodeData, id) {
  if (currentNodeData) {
    return AssetUtils$WonderEditor.isIdEqual(id, currentNodeData[0][/* currentNodeId */0]);
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
                var type_ = param[/* type_ */2];
                var id = param[/* id */0];
                switch (type_) {
                  case 0 : 
                      var match = SparseMapService$WonderCommonlib.unsafeGet(id, FolderNodeMapAssetService$WonderEditor.unsafeGetFolderNodeMap(assetState));
                      return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, FolderBox$WonderEditor.make(store, dispatchFunc, /* tuple */[
                                      dragImg,
                                      "./public/img/11.jpg",
                                      id,
                                      type_,
                                      match[/* name */0],
                                      _isSelected(currentNodeData, id),
                                      AssetTreeUtils$WonderEditor.getFlag(/* () */0),
                                      debounceTime
                                    ], /* tuple */[
                                      (function (param) {
                                          return AssetTreeUtils$WonderEditor.onDrop(dispatchFunc, param);
                                        }),
                                      AssetTreeUtils$WonderEditor.handleFlag,
                                      AssetUtils$WonderEditor.isTreeNodeRelationError
                                    ], /* array */[]));
                  case 1 : 
                      var match$1 = SparseMapService$WonderCommonlib.unsafeGet(id, JsonNodeMapAssetService$WonderEditor.unsafeGetJsonNodeMap(assetState));
                      return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, FileBox$WonderEditor.make(store, dispatchFunc, /* tuple */[
                                      dragImg,
                                      "./public/img/12.jpg",
                                      id,
                                      type_,
                                      match$1[/* name */0],
                                      AssetTreeUtils$WonderEditor.getFlag(/* () */0),
                                      _isSelected(currentNodeData, id)
                                    ], /* array */[]));
                  case 2 : 
                      var match$2 = SparseMapService$WonderCommonlib.unsafeGet(id, TextureNodeMapAssetService$WonderEditor.unsafeGetTextureNodeMap(assetState));
                      var textureId = match$2[/* textureId */0];
                      return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, FileBox$WonderEditor.make(store, dispatchFunc, /* tuple */[
                                      dragImg,
                                      SparseMapService$WonderCommonlib.unsafeGet(textureId, ImageBase64MapAssetService$WonderEditor.unsafeGetImageBase64Map(assetState)),
                                      id,
                                      type_,
                                      StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                              return BasicSourceTextureEngineService$WonderEditor.unsafeGetBasicSourceTextureName(textureId, param);
                                            })),
                                      AssetTreeUtils$WonderEditor.getFlag(/* () */0),
                                      _isSelected(currentNodeData, id)
                                    ], /* array */[]));
                  
                }
              }));
}

function buildContent(param, dragImg, debounceTime) {
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
  /* buildContent */buildContent
];

var component = ReasonReact.statelessComponent("MainEditorAssetHeader");

function render(param, dragImg, debounceTime, _) {
  return React.createElement("article", {
              key: "assetChildrenNode",
              className: "wonder-asset-assetChildren"
            }, buildContent(/* tuple */[
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
