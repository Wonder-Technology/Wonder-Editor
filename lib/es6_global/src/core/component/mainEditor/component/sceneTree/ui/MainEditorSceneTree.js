'use strict';

import * as $$Array                                            from "../../../../../../../../../node_modules/bs-platform/lib/es6/array.js";
import * as Curry                                              from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                                              from "react";
import * as Caml_obj                                           from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact                                        from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Css$WonderEditor                                   from "../../../../../external/Css.js";
import * as DragTree$WonderEditor                              from "../../../../../ui/component/dragTree/DragTree.js";
import * as TreeNode$WonderEditor                              from "../../../../../ui/component/dragTree/component/treeNode/TreeNode.js";
import * as DomHelper$WonderEditor                             from "../../../../../external/DomHelper.js";
import * as ArrayService$WonderEditor                          from "../../../../../../service/atom/ArrayService.js";
import * as SceneService$WonderEditor                          from "../../../../../../service/primitive/SceneService.js";
import * as StateLogicService$WonderEditor                     from "../../../../../../service/stateTuple/StateLogicService.js";
import * as SceneGraphDataUtils$WonderEditor                   from "../../../../../utils/SceneGraphDataUtils.js";
import * as CurrentGameObjectService$WonderEditor              from "../../../../../../service/primitive/CurrentGameObjectService.js";
import * as MainEditorSceneTreeDragEventHandler$WonderEditor   from "./eventHandler/MainEditorSceneTreeDragEventHandler.js";
import * as MainEditorSceneTreeSelectEventHandler$WonderEditor from "./eventHandler/MainEditorSceneTreeSelectEventHandler.js";

Css$WonderEditor.importCss("./css/mainEditorSceneTree.css");

var onSelect = MainEditorSceneTreeSelectEventHandler$WonderEditor.MakeEventHandler[/* onSelect */0];

var onDrop = MainEditorSceneTreeDragEventHandler$WonderEditor.MakeEventHandler[/* onDrop */1];

function _isCurrentGameObject(uid) {
  var match = StateLogicService$WonderEditor.getEditorState(CurrentGameObjectService$WonderEditor.getCurrentGameObject);
  if (match) {
    var match$1 = +(match[0] === uid);
    if (match$1 !== 0) {
      return /* true */1;
    } else {
      return /* false */0;
    }
  } else {
    return /* false */0;
  }
}

function buildTreeArrayData(onSelect, onDrop, sceneGraphData) {
  return $$Array.map((function (param) {
                var children = param[/* children */2];
                var uid = param[/* uid */1];
                var name = param[/* name */0];
                var match = ArrayService$WonderEditor.hasItem(children);
                if (match !== 0) {
                  return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, TreeNode$WonderEditor.make(/* tuple */[
                                  uid,
                                  name,
                                  _isCurrentGameObject(uid)
                                ], /* tuple */[
                                  onSelect,
                                  onDrop
                                ], /* Some */[buildTreeArrayData(onSelect, onDrop, children)], /* array */[]));
                } else {
                  return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, TreeNode$WonderEditor.make(/* tuple */[
                                  uid,
                                  name,
                                  _isCurrentGameObject(uid)
                                ], /* tuple */[
                                  onSelect,
                                  onDrop
                                ], /* None */0, /* array */[]));
                }
              }), sceneGraphData);
}

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditorSceneTree");

function render(store, dispatch, _) {
  var sceneGraphData = SceneGraphDataUtils$WonderEditor.unsafeGetSceneGraphDataFromStore(store);
  return React.createElement("article", {
              key: "sceneTree",
              className: "sceneTree-component"
            }, ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, DragTree$WonderEditor.make(buildTreeArrayData(Curry._2(onSelect, /* tuple */[
                              store,
                              dispatch
                            ], /* () */0), Curry._2(onDrop, /* tuple */[
                              store,
                              dispatch
                            ], /* () */0), ArrayService$WonderEditor.getFirst(sceneGraphData)[/* children */2]), StateLogicService$WonderEditor.getEditorState(SceneService$WonderEditor.unsafeGetScene), Curry._2(onDrop, /* tuple */[
                          store,
                          dispatch
                        ], /* () */0), /* array */[])));
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
    /* sceneGraph */store[/* sceneTreeState */3][/* sceneGraphData */0],
    /* currentGameObject */StateLogicService$WonderEditor.getEditorState(CurrentGameObjectService$WonderEditor.getCurrentGameObject)
  ];
  return newrecord;
}

var Method = [
  onDrop,
  buildTreeArrayData
];

export {
  Method ,
  render ,
  make   ,
  
}
/*  Not a pure module */
