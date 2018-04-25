'use strict';

import * as $$Array                         from "../../../../../../../../../node_modules/bs-platform/lib/es6/array.js";
import * as React                           from "react";
import * as Caml_obj                        from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact                     from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Log$WonderLog                   from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Css$WonderEditor                from "../../../../../external/Css.js";
import * as TreeNode$WonderEditor           from "../../../../../atom_component/dragTree/component/treeNode/TreeNode.js";
import * as DomHelper$WonderEditor          from "../../../../../external/DomHelper.js";
import * as ArrayService$WonderEditor       from "../../../../../../service/atom/ArrayService.js";
import * as StateLogicService$WonderEditor  from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetEditorService$WonderEditor from "../../../../../../service/state/editor/AssetEditorService.js";

Css$WonderEditor.importCss("./css/mainEditorAsset.css");

function onSelect(id) {
  Log$WonderLog.print(/* tuple */[
        "select",
        id
      ]);
  return /* () */0;
}

function onDrop(param) {
  Log$WonderLog.print(/* tuple */[
        "drop",
        param[0],
        param[1]
      ]);
  return /* () */0;
}

function _isCurrentTreeNode() {
  return /* true */1;
}

function _isNotRoot(id) {
  return +(id !== 0);
}

function buildAssetTreeArray(onSelect, onDrop, assetTree) {
  return $$Array.map((function (param) {
                var children = param[/* children */3];
                var name = param[/* name */1];
                var id = param[/* id */0];
                var match = ArrayService$WonderEditor.hasItem(children);
                if (match !== 0) {
                  return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, TreeNode$WonderEditor.make(/* tuple */[
                                  id,
                                  name,
                                  /* true */1
                                ], /* tuple */[
                                  onSelect,
                                  onDrop
                                ], "asset", /* Some */["./public/img/12.jpg"], /* Some */[+(id !== 0)], /* Some */[buildAssetTreeArray(onSelect, onDrop, children)], /* array */[]));
                } else {
                  return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, TreeNode$WonderEditor.make(/* tuple */[
                                  id,
                                  name,
                                  /* true */1
                                ], /* tuple */[
                                  onSelect,
                                  onDrop
                                ], "asset", /* Some */["./public/img/12.jpg"], /* Some */[+(id !== 0)], /* None */0, /* array */[]));
                }
              }), assetTree);
}

var Method = /* module */[
  /* onSelect */onSelect,
  /* onDrop */onDrop,
  /* _isCurrentTreeNode */_isCurrentTreeNode,
  /* _isNotRoot */_isNotRoot,
  /* buildAssetTreeArray */buildAssetTreeArray
];

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditorAsset");

function render(_, _$1, _$2) {
  return React.createElement("article", {
              key: "asset",
              className: "asset-component"
            }, React.createElement("div", {
                  className: "asset-tree"
                }, StateLogicService$WonderEditor.getEditorState((function (editorState) {
                        return buildAssetTreeArray(onSelect, onDrop, AssetEditorService$WonderEditor.unsafeGetAssetTree(editorState));
                      }))), React.createElement("div", {
                  className: "asset-content"
                }));
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
    /* assetTree */StateLogicService$WonderEditor.getEditorState(AssetEditorService$WonderEditor.getAssetTree),
    /* currentTreeNode */StateLogicService$WonderEditor.getEditorState(AssetEditorService$WonderEditor.getCurrentTreeNode)
  ];
  return newrecord;
}

export {
  Method       ,
  component    ,
  render       ,
  shouldUpdate ,
  make         ,
  
}
/*  Not a pure module */
