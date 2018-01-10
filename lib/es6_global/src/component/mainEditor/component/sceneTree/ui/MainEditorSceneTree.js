'use strict';

import * as Curry                                from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                                from "react";
import * as Js_option                            from "../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as ReasonReact                          from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Css$WonderEditor                     from "../../../../../external/Css.js";
import * as AppStore$WonderEditor                from "../../../../../ui/store/AppStore.js";
import * as DragTree$WonderEditor                from "../component/dragTree/DragTree.js";
import * as DomHelper$WonderEditor               from "../../../../../external/DomHelper.js";
import * as OperateArrayUtils$WonderEditor       from "../../../../utils/OperateArrayUtils.js";
import * as MainEditorSceneView$WonderEditor     from "../../../logic/view/MainEditorSceneView.js";
import * as MainEditorStateView$WonderEditor     from "../../../logic/view/MainEditorStateView.js";
import * as MainEditorSceneTreeView$WonderEditor from "../logic/view/MainEditorSceneTreeView.js";

Css$WonderEditor.importCss("./css/mainEditorSceneTree.css");

function setCurrentGameObject(gameObject) {
  return MainEditorStateView$WonderEditor.finishState(MainEditorSceneView$WonderEditor.setCurrentGameObject(gameObject, MainEditorStateView$WonderEditor.prepareState(/* () */0)));
}

function onSelect(dispatch, uid) {
  setCurrentGameObject(uid);
  return Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
}

function getSceneGraphDataFromStore(store) {
  return Js_option.getExn(store[/* sceneTreeState */3][/* sceneGraphData */0]);
}

function getSceneChildrenSceneGraphData(sceneGraphData) {
  return OperateArrayUtils$WonderEditor.getFirst(sceneGraphData)[/* children */2];
}

function _setObjectParent(targetId, dragedId) {
  return MainEditorStateView$WonderEditor.finishState(MainEditorSceneTreeView$WonderEditor.setParent(targetId, dragedId, MainEditorStateView$WonderEditor.prepareState(/* () */0)));
}

function onDropFinish(store, dispatch, targetId, dragedId) {
  var match = MainEditorSceneTreeView$WonderEditor.isObjectAssociateError(targetId, dragedId, MainEditorStateView$WonderEditor.prepareState(/* () */0));
  if (match !== 0) {
    return Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
  } else {
    _setObjectParent(targetId, dragedId);
    return Curry._1(dispatch, [
                AppStore$WonderEditor.SceneTreeAction,
                /* SetSceneGraph */[/* Some */[MainEditorSceneTreeView$WonderEditor.getDragedSceneGraphData(targetId, dragedId, Js_option.getExn(store[/* sceneTreeState */3][/* sceneGraphData */0]))]]
              ]);
  }
}

var Method = /* module */[
  /* setCurrentGameObject */setCurrentGameObject,
  /* onSelect */onSelect,
  /* getSceneGraphDataFromStore */getSceneGraphDataFromStore,
  /* getSceneChildrenSceneGraphData */getSceneChildrenSceneGraphData,
  /* _setObjectParent */_setObjectParent,
  /* onDropFinish */onDropFinish
];

var component = ReasonReact.statelessComponent("MainEditorSceneTree");

function render(store, dispatch, _) {
  var sceneGraphData = Js_option.getExn(store[/* sceneTreeState */3][/* sceneGraphData */0]);
  return React.createElement("article", {
              key: "sceneTree",
              className: "sceneTree-component"
            }, ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, DragTree$WonderEditor.make(/* tuple */[
                      (function (param) {
                          setCurrentGameObject(param);
                          return Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
                        }),
                      (function (param, param$1) {
                          return onDropFinish(store, dispatch, param, param$1);
                        })
                    ], OperateArrayUtils$WonderEditor.getFirst(sceneGraphData)[/* children */2], /* array */[])));
}

function make(store, dispatch, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (param) {
      return render(store, dispatch, param);
    });
  return newrecord;
}

export {
  Method    ,
  component ,
  render    ,
  make      ,
  
}
/*  Not a pure module */
