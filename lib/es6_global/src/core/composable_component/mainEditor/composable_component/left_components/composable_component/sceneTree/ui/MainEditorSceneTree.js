

import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Js_primitive from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as AppStore$WonderEditor from "../../../../../../../ui/store/AppStore.js";
import * as AssetUtils$WonderEditor from "../../../../bottom_components/composable_component/project/composable_component/asset/utils/AssetUtils.js";
import * as StoreUtils$WonderEditor from "../../../../../../../utils/ui/StoreUtils.js";
import * as ArrayService$WonderEditor from "../../../../../../../../service/atom/ArrayService.js";
import * as SceneTreeNode$WonderEditor from "../../../../../../../atom_component/dragTree/component/treeNode/SceneTreeNode.js";
import * as StringService$WonderEditor from "../../../../../../../../service/atom/StringService.js";
import * as SceneTreeUtils$WonderEditor from "../utils/SceneTreeUtils.js";
import * as SceneGraphUtils$WonderEditor from "../utils/SceneGraphUtils.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../../service/state/editor/scene/SceneEditorService.js";
import * as SceneEngineService$WonderEditor from "../../../../../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../service/state/engine/StateEngineService.js";
import * as SceneTreeDragWDBEventHandler$WonderEditor from "../eventHandler/SceneTreeDragWDBEventHandler.js";
import * as SceneTreeDragGameObjectEventHandler$WonderEditor from "../eventHandler/SceneTreeDragGameObjectEventHandler.js";
import * as SceneTreeSelectCurrentNodeEventHandler$WonderEditor from "../eventHandler/SceneTreeSelectCurrentNodeEventHandler.js";

function onSelect(param, uid) {
  var dispatchFunc = param[1];
  var store = param[0];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = SceneEditorService$WonderEditor.getCurrentSceneTreeNode(editorState);
  if (match !== undefined) {
    var match$1 = match === uid;
    if (match$1) {
      return /* () */0;
    } else {
      return Curry._3(SceneTreeSelectCurrentNodeEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
                  store,
                  dispatchFunc
                ], /* () */0, uid);
    }
  } else {
    return Curry._3(SceneTreeSelectCurrentNodeEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
                store,
                dispatchFunc
              ], /* () */0, uid);
  }
}

function handleToggleShowTreeChildren(store, dispatchFunc, targetId, isShowChildren) {
  var newSceneGraphData = SceneGraphUtils$WonderEditor.setSpecificSceneTreeNodeIsShowChildren(targetId, isShowChildren, StoreUtils$WonderEditor.unsafeGetSceneGraphDataFromStore(store));
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.SceneTreeAction,
        /* SetSceneGraph */[newSceneGraphData]
      ]);
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* SceneTree */6]]
      ]);
  return /* () */0;
}

var dragGameObjectIntoGameObject = SceneTreeDragGameObjectEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var dragWDBIntoScene = SceneTreeDragWDBEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

function buildSceneNode(children, engineState) {
  return /* record */[
          /* name */"Scene",
          /* uid */SceneEngineService$WonderEditor.getSceneGameObject(engineState),
          /* isShowChildren */SceneGraphUtils$WonderEditor.getSceneTreeNodeIsShowChildren(/* () */0),
          /* children */children
        ];
}

function _isSelected(uid, currentSceneTreeNode) {
  if (currentSceneTreeNode !== undefined) {
    return Js_primitive.valFromOption(currentSceneTreeNode) === uid;
  } else {
    return false;
  }
}

function buildSceneTreeArray(param, currentSceneTreeNode, param$1, sceneGraphArr) {
  var dragWDBFunc = param$1[2];
  var dragGameObjectFunc = param$1[1];
  var onSelectFunc = param$1[0];
  var dragImg = param[2];
  var dispatchFunc = param[1];
  var store = param[0];
  return sceneGraphArr.map((function (param) {
                var children = param[/* children */3];
                var uid = param[/* uid */1];
                return ReasonReact.element(StringService$WonderEditor.intToString(uid), undefined, SceneTreeNode$WonderEditor.make(uid, param[/* name */0], _isSelected(uid, currentSceneTreeNode), true, dragImg, SceneTreeUtils$WonderEditor.getWidget(/* () */0), undefined, onSelectFunc, dragGameObjectFunc, dragWDBFunc, SceneTreeUtils$WonderEditor.isWidget, param[/* isShowChildren */2], children.length >= 1, SceneTreeUtils$WonderEditor.isGameObjectRelationError, (function (param, param$1) {
                                  return handleToggleShowTreeChildren(store, dispatchFunc, param, param$1);
                                }), AssetUtils$WonderEditor.isWDBAssetFile, buildSceneTreeArray(/* tuple */[
                                    store,
                                    dispatchFunc,
                                    dragImg
                                  ], currentSceneTreeNode, /* tuple */[
                                    onSelectFunc,
                                    dragGameObjectFunc,
                                    dragWDBFunc
                                  ], children), /* array */[]));
              }));
}

var Method = /* module */[
  /* onSelect */onSelect,
  /* handleToggleShowTreeChildren */handleToggleShowTreeChildren,
  /* dragGameObjectIntoGameObject */dragGameObjectIntoGameObject,
  /* dragWDBIntoScene */dragWDBIntoScene,
  /* buildSceneNode */buildSceneNode,
  /* _isSelected */_isSelected,
  /* buildSceneTreeArray */buildSceneTreeArray
];

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditorSceneTree");

function render(store, dispatchFunc, _) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var sceneGraphArr = ArrayService$WonderEditor.unsafeGetFirst(StoreUtils$WonderEditor.unsafeGetSceneGraphDataFromStore(store))[/* children */3];
  var partial_arg = /* tuple */[
    store,
    dispatchFunc
  ];
  return React.createElement("article", {
              key: "sceneTree",
              className: "wonder-sceneTree-component"
            }, React.createElement("article", {
                  className: "wonder-tree"
                }, buildSceneTreeArray(/* tuple */[
                      store,
                      dispatchFunc,
                      document.createElement("img")
                    ], SceneEditorService$WonderEditor.getCurrentSceneTreeNode(editorState), /* tuple */[
                      (function (param) {
                          return onSelect(partial_arg, param);
                        }),
                      Curry._2(dragGameObjectIntoGameObject, /* tuple */[
                            store,
                            dispatchFunc
                          ], /* () */0),
                      Curry._2(dragWDBIntoScene, /* tuple */[
                            store,
                            dispatchFunc
                          ], /* () */0)
                    ], /* array */[buildSceneNode(sceneGraphArr, StateEngineService$WonderEditor.unsafeGetState(/* () */0))])));
}

function shouldUpdate(param) {
  return StoreUtils$WonderEditor.shouldComponentUpdate(/* SceneTree */6, param[/* newSelf */1][/* retainedProps */2][/* updateTypeArr */0]);
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
          /* retainedProps : record */[/* updateTypeArr */StoreUtils$WonderEditor.getUpdateComponentTypeArr(store)],
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
/* component Not a pure module */
