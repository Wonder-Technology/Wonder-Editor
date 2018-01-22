'use strict';

import * as $$Array                                            from "../../../../../../../../node_modules/bs-platform/lib/es6/array.js";
import * as Curry                                              from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                                              from "react";
import * as Js_option                                          from "../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as ReasonReact                                        from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Css$WonderEditor                                   from "../../../../../external/Css.js";
import * as DragTree$WonderEditor                              from "../../../../../ui/component/dragTree/DragTree.js";
import * as TreeNode$WonderEditor                              from "../../../../../ui/component/dragTree/component/treeNode/TreeNode.js";
import * as DomHelper$WonderEditor                             from "../../../../../external/DomHelper.js";
import * as OperateArrayUtils$WonderEditor                     from "../../../../utils/OperateArrayUtils.js";
import * as MainEditorSceneView$WonderEditor                   from "../../../logic/view/MainEditorSceneView.js";
import * as MainEditorStateView$WonderEditor                   from "../../../logic/view/MainEditorStateView.js";
import * as MainEditorSceneTreeDragEventHandler$WonderEditor   from "./eventHandler/MainEditorSceneTreeDragEventHandler.js";
import * as MainEditorSceneTreeSelectEventHandler$WonderEditor from "./eventHandler/MainEditorSceneTreeSelectEventHandler.js";

Css$WonderEditor.importCss("./css/mainEditorSceneTree.css");

var onSelect = MainEditorSceneTreeSelectEventHandler$WonderEditor.MakeEventHandler[/* onSelect */1];

var onDropFinish = MainEditorSceneTreeDragEventHandler$WonderEditor.MakeEventHandler[/* onDrag */2];

function buildTreeArrayData(onSelect, onDropFinish, sceneGraphData) {
  return $$Array.map((function (param) {
                var children = param[/* children */2];
                var uid = param[/* uid */1];
                var name = param[/* name */0];
                var match = OperateArrayUtils$WonderEditor.hasItem(children);
                if (match !== 0) {
                  return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, TreeNode$WonderEditor.make(/* tuple */[
                                  uid,
                                  name
                                ], /* tuple */[
                                  onSelect,
                                  onDropFinish
                                ], /* Some */[buildTreeArrayData(onSelect, onDropFinish, children)], /* array */[]));
                } else {
                  return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, TreeNode$WonderEditor.make(/* tuple */[
                                  uid,
                                  name
                                ], /* tuple */[
                                  onSelect,
                                  onDropFinish
                                ], /* None */0, /* array */[]));
                }
              }), sceneGraphData);
}

var component = ReasonReact.statelessComponent("MainEditorSceneTree");

function render(store, dispatch, _) {
  var sceneGraphData = Js_option.getExn(store[/* sceneTreeState */3][/* sceneGraphData */0]);
  return React.createElement("article", {
              key: "sceneTree",
              className: "sceneTree-component"
            }, ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, DragTree$WonderEditor.make(buildTreeArrayData(Curry._2(onSelect, /* tuple */[
                              store,
                              dispatch
                            ], /* () */0), Curry._2(onDropFinish, /* tuple */[
                              store,
                              dispatch
                            ], /* () */0), OperateArrayUtils$WonderEditor.getFirst(sceneGraphData)[/* children */2]), MainEditorSceneView$WonderEditor.unsafeGetScene(MainEditorStateView$WonderEditor.prepareState(/* () */0)), Curry._2(onDropFinish, /* tuple */[
                          store,
                          dispatch
                        ], /* () */0), /* array */[])));
}

function make(store, dispatch, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, self);
    });
  return newrecord;
}

var Method = [
  onDropFinish,
  buildTreeArrayData
];

export {
  Method ,
  render ,
  make   ,
  
}
/*  Not a pure module */
