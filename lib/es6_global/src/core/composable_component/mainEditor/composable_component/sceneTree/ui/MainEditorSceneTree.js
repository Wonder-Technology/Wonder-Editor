'use strict';

import * as $$Array                                            from "../../../../../../../../../node_modules/bs-platform/lib/es6/array.js";
import * as Curry                                              from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                                              from "react";
import * as Caml_obj                                           from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact                                        from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Css$WonderEditor                                   from "../../../../../external/Css.js";
import * as DragTree$WonderEditor                              from "../../../../../atom_component/dragTree/DragTree.js";
import * as TreeNode$WonderEditor                              from "../../../../../atom_component/dragTree/component/treeNode/TreeNode.js";
import * as DomHelper$WonderEditor                             from "../../../../../external/DomHelper.js";
import * as ArrayService$WonderEditor                          from "../../../../../../service/atom/ArrayService.js";
import * as SceneTreeUtils$WonderEditor                        from "../utils/SceneTreeUtils.js";
import * as SceneTreeUIUtils$WonderEditor                      from "../utils/SceneTreeUIUtils.js";
import * as StateLogicService$WonderEditor                     from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor                    from "../../../../../../service/state/editor/SceneEditorService.js";
import * as MainEditorSceneTreeDragEventHandler$WonderEditor   from "./eventHandler/MainEditorSceneTreeDragEventHandler.js";
import * as MainEditorSceneTreeSelectEventHandler$WonderEditor from "./eventHandler/MainEditorSceneTreeSelectEventHandler.js";

import '../../../../../../../../../src/core/composable_component/mainEditor/composable_component/sceneTree/ui/css/mainEditorSceneTree.css';

var onSelect = MainEditorSceneTreeSelectEventHandler$WonderEditor.MakeEventHandler[/* onSelect */0];

function handleSign(startSign) {
  return +(startSign === SceneTreeUIUtils$WonderEditor.getSign(/* () */0));
}

var onDrop = MainEditorSceneTreeDragEventHandler$WonderEditor.MakeEventHandler[/* onDrop */1];

function getSceneChildrenSceneGraphData(sceneGraphData) {
  return ArrayService$WonderEditor.getFirst(sceneGraphData)[/* children */2];
}

function _isCurrentGameObject(uid, currentGameObject) {
  if (currentGameObject) {
    var match = +(currentGameObject[0] === uid);
    if (match !== 0) {
      return /* true */1;
    } else {
      return /* false */0;
    }
  } else {
    return /* false */0;
  }
}

function buildSceneTreeArray(onSelect, onDrop, currentGameObject, sceneGraphData) {
  return $$Array.map((function (param) {
                var children = param[/* children */2];
                var uid = param[/* uid */1];
                var name = param[/* name */0];
                var match = ArrayService$WonderEditor.hasItem(children);
                if (match !== 0) {
                  return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, TreeNode$WonderEditor.make(/* tuple */[
                                  uid,
                                  name,
                                  _isCurrentGameObject(uid, currentGameObject)
                                ], /* tuple */[
                                  onSelect,
                                  onDrop,
                                  handleSign,
                                  SceneTreeUtils$WonderEditor.isGameObjectRelationError
                                ], SceneTreeUIUtils$WonderEditor.getSign(/* () */0), /* None */0, /* None */0, /* Some */[buildSceneTreeArray(onSelect, onDrop, currentGameObject, children)], /* array */[]));
                } else {
                  return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, TreeNode$WonderEditor.make(/* tuple */[
                                  uid,
                                  name,
                                  _isCurrentGameObject(uid, currentGameObject)
                                ], /* tuple */[
                                  onSelect,
                                  onDrop,
                                  handleSign,
                                  SceneTreeUtils$WonderEditor.isGameObjectRelationError
                                ], SceneTreeUIUtils$WonderEditor.getSign(/* () */0), /* None */0, /* None */0, /* None */0, /* array */[]));
                }
              }), sceneGraphData);
}

var Method = /* module */[
  /* onSelect */onSelect,
  /* handleSign */handleSign,
  /* onDrop */onDrop,
  /* getSceneChildrenSceneGraphData */getSceneChildrenSceneGraphData,
  /* _isCurrentGameObject */_isCurrentGameObject,
  /* buildSceneTreeArray */buildSceneTreeArray
];

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditorSceneTree");

function render(store, dispatch, self) {
  var sceneGraphData = SceneTreeUIUtils$WonderEditor.unsafeGetSceneGraphDataFromStore(store);
  return React.createElement("article", {
              key: "sceneTree",
              className: "sceneTree-component"
            }, ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, DragTree$WonderEditor.make(buildSceneTreeArray(Curry._2(onSelect, /* tuple */[
                              store,
                              dispatch
                            ], /* () */0), Curry._2(onDrop, /* tuple */[
                              store,
                              dispatch
                            ], /* () */0), self[/* retainedProps */5][/* currentGameObject */1], ArrayService$WonderEditor.getFirst(sceneGraphData)[/* children */2]), StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetScene), Curry._2(onDrop, /* tuple */[
                          store,
                          dispatch
                        ], /* () */0), handleSign, SceneTreeUtils$WonderEditor.isGameObjectRelationError, /* array */[])));
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
    /* currentGameObject */StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.getCurrentGameObject)
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

