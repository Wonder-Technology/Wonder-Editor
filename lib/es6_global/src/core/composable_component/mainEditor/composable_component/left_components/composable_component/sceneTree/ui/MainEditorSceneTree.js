

import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_option from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as AppStore$WonderEditor from "../../../../../../../ui/store/AppStore.js";
import * as StoreUtils$WonderEditor from "../../../../../../../utils/ui/StoreUtils.js";
import * as ArrayService$WonderEditor from "../../../../../../../../service/atom/ArrayService.js";
import * as SceneTreeNode$WonderEditor from "../../../../../../../atom_component/dragTree/component/treeNode/SceneTreeNode.js";
import * as StringService$WonderEditor from "../../../../../../../../service/atom/StringService.js";
import * as SceneGraphUtils$WonderEditor from "../utils/SceneGraphUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../../../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as SceneTreeWidgetService$WonderEditor from "../../../../../../../../service/record/editor/widget/SceneTreeWidgetService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as WDBNodeAssetEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/WDBNodeAssetEditorService.js";
import * as CheckSceneTreeLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/sceneTree/CheckSceneTreeLogicService.js";
import * as SceneTreeDragWDBEventHandler$WonderEditor from "../eventHandler/SceneTreeDragWDBEventHandler.js";
import * as SceneTreeDragGameObjectEventHandler$WonderEditor from "../eventHandler/SceneTreeDragGameObjectEventHandler.js";
import * as SceneTreeSelectCurrentNodeEventHandler$WonderEditor from "../eventHandler/SceneTreeSelectCurrentNodeEventHandler.js";

function onSelect(param, uid) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = SceneTreeEditorService$WonderEditor.getCurrentSceneTreeNode(editorState);
  if (match !== undefined) {
    var match$1 = match === uid;
    if (match$1) {
      return /* () */0;
    } else {
      return Curry._3(SceneTreeSelectCurrentNodeEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
                  uiState,
                  dispatchFunc
                ], /* () */0, uid);
    }
  } else {
    return Curry._3(SceneTreeSelectCurrentNodeEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
                uiState,
                dispatchFunc
              ], /* () */0, uid);
  }
}

function handleToggleShowTreeChildren(dispatchFunc, targetId, isShowChildren) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
          return SceneTreeEditorService$WonderEditor.setIsShowChildren(targetId, isShowChildren, param);
        }));
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* SceneTree */6]]
      ]);
  return /* () */0;
}

var dragGameObjectToBeTargetSib = SceneTreeDragGameObjectEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var dragWDBToBeTargetSib = SceneTreeDragWDBEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

function buildSceneNode(children, engineState) {
  var scene = SceneEngineService$WonderEditor.getSceneGameObject(engineState);
  return /* record */[
          /* name */GameObjectEngineService$WonderEditor.unsafeGetGameObjectName(scene, engineState),
          /* uid */scene,
          /* children */children
        ];
}

function _isSelected(uid, currentSceneTreeNode) {
  if (currentSceneTreeNode !== undefined) {
    return Caml_option.valFromOption(currentSceneTreeNode) === uid;
  } else {
    return false;
  }
}

function buildSceneTreeArray(param, currentSceneTreeNode, param$1, param$2, sceneGraphArr) {
  var editorState = param$2[1];
  var sceneGameObject = param$2[0];
  var dragWDBFunc = param$1[2];
  var dragGameObjectFunc = param$1[1];
  var onSelectFunc = param$1[0];
  var dragImg = param[2];
  var dispatchFunc = param[1];
  var uiState = param[0];
  return sceneGraphArr.map((function (param) {
                var children = param[/* children */2];
                var uid = param[/* uid */1];
                return ReasonReact.element(StringService$WonderEditor.intToString(uid), undefined, SceneTreeNode$WonderEditor.make(uid, param[/* name */0], _isSelected(uid, currentSceneTreeNode), true, dragImg, SceneTreeWidgetService$WonderEditor.getWidget(/* () */0), undefined, onSelectFunc, dragGameObjectFunc, dragWDBFunc, SceneTreeWidgetService$WonderEditor.isWidget, SceneTreeEditorService$WonderEditor.getIsShowChildern(uid, sceneGameObject, editorState), children.length >= 1, CheckSceneTreeLogicService$WonderEditor.checkGameObjectRelation, (function (param, param$1) {
                                  return handleToggleShowTreeChildren(dispatchFunc, param, param$1);
                                }), WDBNodeAssetEditorService$WonderEditor.isWDBAssetFile, buildSceneTreeArray(/* tuple */[
                                    uiState,
                                    dispatchFunc,
                                    dragImg
                                  ], currentSceneTreeNode, /* tuple */[
                                    onSelectFunc,
                                    dragGameObjectFunc,
                                    dragWDBFunc
                                  ], /* tuple */[
                                    sceneGameObject,
                                    editorState
                                  ], children), /* array */[]));
              }));
}

var Method = /* module */[
  /* onSelect */onSelect,
  /* handleToggleShowTreeChildren */handleToggleShowTreeChildren,
  /* dragGameObjectToBeTargetSib */dragGameObjectToBeTargetSib,
  /* dragWDBToBeTargetSib */dragWDBToBeTargetSib,
  /* buildSceneNode */buildSceneNode,
  /* _isSelected */_isSelected,
  /* buildSceneTreeArray */buildSceneTreeArray
];

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditorSceneTree");

function render(uiState, dispatchFunc, _self) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var sceneGraphArr = ArrayService$WonderEditor.unsafeGetFirst(SceneGraphUtils$WonderEditor.getSceneGraphDataFromEngine(/* tuple */[
              editorState,
              engineState
            ]))[/* children */2];
  var partial_arg = /* tuple */[
    uiState,
    dispatchFunc
  ];
  return React.createElement("article", {
              key: "sceneTree",
              className: "wonder-sceneTree-component",
              id: "wonder-sceneTree-component"
            }, React.createElement("article", {
                  className: "wonder-tree"
                }, buildSceneTreeArray(/* tuple */[
                      uiState,
                      dispatchFunc,
                      document.createElement("img")
                    ], SceneTreeEditorService$WonderEditor.getCurrentSceneTreeNode(editorState), /* tuple */[
                      (function (param) {
                          return onSelect(partial_arg, param);
                        }),
                      Curry._2(dragGameObjectToBeTargetSib, /* tuple */[
                            uiState,
                            dispatchFunc
                          ], /* () */0),
                      Curry._2(dragWDBToBeTargetSib, /* tuple */[
                            uiState,
                            dispatchFunc
                          ], /* () */0)
                    ], /* tuple */[
                      SceneEngineService$WonderEditor.getSceneGameObject(engineState),
                      editorState
                    ], /* array */[buildSceneNode(sceneGraphArr, StateEngineService$WonderEditor.unsafeGetState(/* () */0))])));
}

function shouldUpdate(param) {
  return StoreUtils$WonderEditor.shouldComponentUpdate(/* SceneTree */6, param[/* newSelf */1][/* retainedProps */2][/* updateTypeArr */0]);
}

function make(uiState, dispatchFunc, _children) {
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
              return render(uiState, dispatchFunc, self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps : record */[/* updateTypeArr */StoreUtils$WonderEditor.getUpdateComponentTypeArr(uiState)],
          /* reducer */component[/* reducer */12],
          /* jsElementWrapped */component[/* jsElementWrapped */13]
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
