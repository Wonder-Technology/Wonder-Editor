

import * as React from "react";
import * as Caml_obj from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Css$WonderEditor from "../../../../../external/Css.js";
import * as StateLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as MainEditorAssetTree$WonderEditor from "../composable_component/assetTree/ui/MainEditorAssetTree.js";
import * as MainEditorAssetHeader$WonderEditor from "../composable_component/header/ui/MainEditorAssetHeader.js";
import * as JsonNodeMapAssetService$WonderEditor from "../../../../../../service/state/asset/JsonNodeMapAssetService.js";
import * as AssetTreeRootAssetService$WonderEditor from "../../../../../../service/state/asset/AssetTreeRootAssetService.js";
import * as FolderNodeMapAssetService$WonderEditor from "../../../../../../service/state/asset/FolderNodeMapAssetService.js";
import * as TextureNodeMapAssetService$WonderEditor from "../../../../../../service/state/asset/TextureNodeMapAssetService.js";
import * as CurrentNodeDataAssetService$WonderEditor from "../../../../../../service/state/asset/CurrentNodeDataAssetService.js";
import * as MainEditorAssetChildrenNode$WonderEditor from "../composable_component/assetChildrenNode/ui/MainEditorAssetChildrenNode.js";
import * as CurrentNodeParentIdAssetService$WonderEditor from "../../../../../../service/state/asset/CurrentNodeParentIdAssetService.js";

import '../../../../../../../../../src/core/composable_component/mainEditor/composable_component/asset/ui/css/mainEditorAsset.css';

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditorAsset");

function render(param, _) {
  var dispatchFunc = param[1];
  var store = param[0];
  var dragImg = document.createElement("img");
  return React.createElement("article", {
              key: "asset",
              className: "wonder-asset-component"
            }, React.createElement("div", {
                  className: "asset-tree"
                }, ReasonReact.element(/* None */0, /* None */0, MainEditorAssetHeader$WonderEditor.make(store, dispatchFunc, /* array */[])), ReasonReact.element(/* None */0, /* None */0, MainEditorAssetTree$WonderEditor.make(store, dispatchFunc, dragImg, /* array */[]))), ReasonReact.element(/* None */0, /* None */0, MainEditorAssetChildrenNode$WonderEditor.make(store, dispatchFunc, dragImg, 200, /* array */[])));
}

function shouldUpdate(param) {
  return Caml_obj.caml_notequal(param[/* oldSelf */0][/* retainedProps */2], param[/* newSelf */1][/* retainedProps */2]);
}

function make(store, dispatchFunc, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */shouldUpdate,
          /* render */(function (self) {
              return render(/* tuple */[
                          store,
                          dispatchFunc
                        ], self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps : record */[
            /* assetTreeRoot */StateLogicService$WonderEditor.getAssetState(AssetTreeRootAssetService$WonderEditor.getAssetTreeRoot),
            /* currentNodeData */StateLogicService$WonderEditor.getAssetState(CurrentNodeDataAssetService$WonderEditor.getCurrentNodeData),
            /* currentNodeParentId */StateLogicService$WonderEditor.getAssetState(CurrentNodeParentIdAssetService$WonderEditor.getCurrentNodeParentId),
            /* folderNodeMap */StateLogicService$WonderEditor.getAssetState(FolderNodeMapAssetService$WonderEditor.unsafeGetFolderNodeMap),
            /* textureNodeMap */StateLogicService$WonderEditor.getAssetState(TextureNodeMapAssetService$WonderEditor.unsafeGetTextureNodeMap),
            /* jsonNodeMap */StateLogicService$WonderEditor.getAssetState(JsonNodeMapAssetService$WonderEditor.unsafeGetJsonNodeMap)
          ],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  component ,
  render ,
  shouldUpdate ,
  make ,
  
}
/*  Not a pure module */

