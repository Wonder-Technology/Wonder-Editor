'use strict';

import * as React                                                         from "react";
import * as Caml_obj                                                      from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact                                                   from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Css$WonderEditor                                              from "../../../../../external/Css.js";
import * as StateLogicService$WonderEditor                                from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as MainEditorAssetTree$WonderEditor                              from "../composable_component/assetTree/ui/MainEditorAssetTree.js";
import * as MainEditorAssetHeader$WonderEditor                            from "../composable_component/header/ui/MainEditorAssetHeader.js";
import * as AssetNodeMapEditorService$WonderEditor                        from "../../../../../../service/state/editor/asset/AssetNodeMapEditorService.js";
import * as AssetTreeRootEditorService$WonderEditor                       from "../../../../../../service/state/editor/asset/AssetTreeRootEditorService.js";
import * as MainEditorAssetChildrenNode$WonderEditor                      from "../composable_component/assetChildrenNode/ui/MainEditorAssetChildrenNode.js";
import * as AssetCurrentAssetTreeNodeEditorService$WonderEditor           from "../../../../../../service/state/editor/asset/AssetCurrentAssetTreeNodeEditorService.js";
import * as AssetCurrentAssetChildrenNodeParentEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetCurrentAssetChildrenNodeParentEditorService.js";

Css$WonderEditor.importCss("./css/mainEditorAsset.css");

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditorAsset");

function render(store, dispatch, _) {
  return React.createElement("article", {
              key: "asset",
              className: "asset-component"
            }, React.createElement("div", {
                  className: "asset-tree"
                }, ReasonReact.element(/* None */0, /* None */0, MainEditorAssetHeader$WonderEditor.make(store, dispatch, /* array */[])), ReasonReact.element(/* None */0, /* None */0, MainEditorAssetTree$WonderEditor.make(store, dispatch, /* array */[]))), ReasonReact.element(/* None */0, /* None */0, MainEditorAssetChildrenNode$WonderEditor.make(store, dispatch, /* array */[])));
}

function shouldUpdate(param) {
  return Caml_obj.caml_notequal(param[/* oldSelf */0][/* retainedProps */5], param[/* newSelf */1][/* retainedProps */5]);
}

function make(store, dispatch, _) {
  var newrecord = component.slice();
  newrecord[/* shouldUpdate */8] = shouldUpdate;
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, self);
    });
  newrecord[/* retainedProps */11] = /* record */[
    /* assetTreeRoot */StateLogicService$WonderEditor.getEditorState(AssetTreeRootEditorService$WonderEditor.getAssetTreeRoot),
    /* currentAssetTreeNode */StateLogicService$WonderEditor.getEditorState(AssetCurrentAssetTreeNodeEditorService$WonderEditor.getCurrentAssetTreeNode),
    /* currentAssetChildrenNodeParent */StateLogicService$WonderEditor.getEditorState(AssetCurrentAssetChildrenNodeParentEditorService$WonderEditor.getCurrentAssetChildrenNodeParent),
    /* nodeMap */StateLogicService$WonderEditor.getEditorState(AssetNodeMapEditorService$WonderEditor.unsafeGetNodeMap)
  ];
  return newrecord;
}

export {
  component    ,
  render       ,
  shouldUpdate ,
  make         ,
  
}
/*  Not a pure module */
