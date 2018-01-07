'use strict';

import * as $$Array                          from "../../../../../../../../../node_modules/bs-platform/lib/es6/array.js";
import * as Block                            from "../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry                            from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                            from "react";
import * as ReasonReact                      from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Css$WonderEditor                 from "../../../../../../external/Css.js";
import * as TreeNode$WonderEditor            from "./component/treeNode/TreeNode.js";
import * as DomHelper$WonderEditor           from "../../../../../../external/DomHelper.js";
import * as DragUtils$WonderEditor           from "./component/utils/DragUtils.js";
import * as ReactUtils$WonderEditor          from "../../../../../../ui/component/utils/reactUtils.js";
import * as MainEditorSceneView$WonderEditor from "../../../../logic/view/MainEditorSceneView.js";
import * as MainEditorStateView$WonderEditor from "../../../../logic/view/MainEditorStateView.js";

Css$WonderEditor.importCss("./css/dragTree.css");

function handleDragEnter() {
  return /* DragEnter */0;
}

function handleDragLeave($$event) {
  $$event.stopPropagation();
  return /* DragLeave */1;
}

function handleDragOver($$event) {
  return $$event.preventDefault();
}

function handleDrop(uid, onDropFinish, $$event) {
  return Curry._2(onDropFinish, uid, DragUtils$WonderEditor.getDragedId($$event));
}

function renderSceneGraph(onSelect, onDropFinish, sceneGraphData) {
  return $$Array.map((function (param) {
                var children = param[/* children */2];
                var uid = param[/* uid */1];
                var name = param[/* name */0];
                var match = +(children.length > 0);
                if (match !== 0) {
                  return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, TreeNode$WonderEditor.make(uid, name, onSelect, onDropFinish, /* Some */[renderSceneGraph(onSelect, onDropFinish, children)], /* array */[]));
                } else {
                  return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, TreeNode$WonderEditor.make(uid, name, onSelect, onDropFinish, /* None */0, /* array */[]));
                }
              }), sceneGraphData);
}

var component = ReasonReact.reducerComponent("DragTree");

function make(onSelect, onDropFinish, sceneGraphData, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (param) {
      var reduce = param[/* reduce */3];
      var partial_arg = MainEditorSceneView$WonderEditor.getScene(MainEditorStateView$WonderEditor.prepareState(/* () */0));
      return React.createElement("article", {
                  className: "wonder-drag-tree"
                }, renderSceneGraph(onSelect, onDropFinish, sceneGraphData), React.createElement("div", {
                      className: "wonder-disable-drag",
                      style: param[/* state */4][/* currentStyle */0],
                      onDragEnter: Curry._1(reduce, handleDragEnter),
                      onDragLeave: Curry._1(reduce, handleDragLeave),
                      onDragOver: handleDragOver,
                      onDrop: (function (param) {
                          return handleDrop(partial_arg, onDropFinish, param);
                        })
                    }));
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[/* currentStyle */{
                backgroundColor: "#c0c0c0"
              }];
    });
  newrecord[/* reducer */12] = (function (action, state) {
      if (action !== 0) {
        var style = ReactUtils$WonderEditor.addStyleProp("backgroundColor", "#c0c0c0", state[/* currentStyle */0]);
        return /* Update */Block.__(0, [/* record */[/* currentStyle */style]]);
      } else {
        var style$1 = ReactUtils$WonderEditor.addStyleProp("backgroundColor", "rgba(1,1,1,0.7)", state[/* currentStyle */0]);
        return /* Update */Block.__(0, [/* record */[/* currentStyle */style$1]]);
      }
    });
  return newrecord;
}

var Method = [
  handleDragOver,
  handleDrop,
  renderSceneGraph
];

export {
  Method ,
  make   ,
  
}
/*  Not a pure module */
