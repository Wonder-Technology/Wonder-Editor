

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_obj from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Css$WonderEditor from "../../../../../external/Css.js";
import * as DragTree$WonderEditor from "../../../../../atom_component/dragTree/DragTree.js";
import * as TreeNode$WonderEditor from "../../../../../atom_component/dragTree/component/treeNode/TreeNode.js";
import * as DomHelper$WonderEditor from "../../../../../external/DomHelper.js";
import * as ArrayService$WonderEditor from "../../../../../../service/atom/ArrayService.js";
import * as SceneTreeUtils$WonderEditor from "../utils/SceneTreeUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../service/state/editor/SceneEditorService.js";
import * as MainEditorSceneTreeDragEventHandler$WonderEditor from "./eventHandler/MainEditorSceneTreeDragEventHandler.js";
import * as MainEditorSceneTreeSelectEventHandler$WonderEditor from "./eventHandler/MainEditorSceneTreeSelectEventHandler.js";

Css$WonderEditor.importCss("./css/mainEditorSceneTree.css");

var onSelect = MainEditorSceneTreeSelectEventHandler$WonderEditor.MakeEventHandler[/* onSelect */0];

var onDrop = MainEditorSceneTreeDragEventHandler$WonderEditor.MakeEventHandler[/* onDrop */1];

function getSceneGraphChildrenArray(sceneGraphData) {
  return ArrayService$WonderEditor.getFirst(sceneGraphData)[/* children */2];
}

function _isSelected(uid, currentSceneTreeNode) {
  if (currentSceneTreeNode) {
    return currentSceneTreeNode[0] === uid;
  } else {
    return false;
  }
}

function buildSceneTreeArray(dragImg, onSelect, onDrop, currentSceneTreeNode, sceneGraphData) {
  return sceneGraphData.map((function (param) {
                var uid = param[/* uid */1];
                return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, TreeNode$WonderEditor.make(/* tuple */[
                                uid,
                                param[/* name */0],
                                _isSelected(uid, currentSceneTreeNode),
                                true,
                                dragImg,
                                SceneTreeUtils$WonderEditor.getFlag(/* () */0),
                                /* None */0,
                                /* None */0
                              ], /* tuple */[
                                onSelect,
                                onDrop,
                                SceneTreeUtils$WonderEditor.handleFlag,
                                SceneTreeUtils$WonderEditor.isGameObjectRelationError
                              ], buildSceneTreeArray(dragImg, onSelect, onDrop, currentSceneTreeNode, param[/* children */2]), /* array */[]));
              }));
}

var Method = /* module */[
  /* onSelect */onSelect,
  /* onDrop */onDrop,
  /* getSceneGraphChildrenArray */getSceneGraphChildrenArray,
  /* _isSelected */_isSelected,
  /* buildSceneTreeArray */buildSceneTreeArray
];

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditorSceneTree");

function render(store, dispatchFunc, self) {
  var sceneGraphData = SceneTreeUtils$WonderEditor.unsafeGetSceneGraphDataFromStore(store);
  return React.createElement("article", {
              key: "sceneTree",
              className: "wonder-sceneTree-component"
            }, ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, DragTree$WonderEditor.make(buildSceneTreeArray(document.createElement("img"), Curry._2(onSelect, /* tuple */[
                              store,
                              dispatchFunc
                            ], /* () */0), Curry._2(onDrop, /* tuple */[
                              store,
                              dispatchFunc
                            ], /* () */0), self[/* retainedProps */2][/* currentSceneTreeNode */1], ArrayService$WonderEditor.getFirst(sceneGraphData)[/* children */2]), StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetScene), Curry._2(onDrop, /* tuple */[
                          store,
                          dispatchFunc
                        ], /* () */0), SceneTreeUtils$WonderEditor.handleFlag, SceneTreeUtils$WonderEditor.isGameObjectRelationError, /* array */[])));
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
              return render(store, dispatchFunc, self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps : record */[
            /* sceneGraph */store[/* sceneTreeState */3][/* sceneGraphData */0],
            /* currentSceneTreeNode */StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.getCurrentSceneTreeNode)
          ],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  Method ,
  component ,
  render ,
  shouldUpdate ,
  make ,
  
}
/*  Not a pure module */
