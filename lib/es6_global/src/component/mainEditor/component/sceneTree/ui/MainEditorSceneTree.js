'use strict';

import * as Curry                                from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                                from "react";
import * as Js_option                            from "../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_array                           from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ReasonReact                          from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Css$WonderEditor                     from "../../../../../external/Css.js";
import * as AppStore$WonderEditor                from "../../../../../ui/store/AppStore.js";
import * as DragTree$WonderEditor                from "../component/dragTree/DragTree.js";
import * as DomHelper$WonderEditor               from "../../../../../external/DomHelper.js";
import * as MainEditorSceneView$WonderEditor     from "../../../logic/view/MainEditorSceneView.js";
import * as MainEditorStateView$WonderEditor     from "../../../logic/view/MainEditorStateView.js";
import * as MainEditorSceneTreeView$WonderEditor from "../logic/view/MainEditorSceneTreeView.js";

Css$WonderEditor.importCss("./css/mainEditorSceneTree.css");

function setCurrentGameObject(gameObject) {
  return MainEditorStateView$WonderEditor.finishState(MainEditorSceneView$WonderEditor.setCurrentGameObject(gameObject, MainEditorStateView$WonderEditor.prepareState(/* () */0)));
}

function onSelect(dispatch, uid) {
  console.log(uid);
  setCurrentGameObject(uid);
  return Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
}

function getSceneGraphDataFromStore(store) {
  return Js_option.getExn(store[/* sceneTreeState */3][/* sceneGraphData */0]);
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
  /* _setObjectParent */_setObjectParent,
  /* onDropFinish */onDropFinish
];

var component = ReasonReact.statelessComponent("MainEditorSceneTree");

function render(store, dispatch, _) {
  return React.createElement("article", {
              key: "sceneTree",
              className: "sceneTree-component"
            }, ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, DragTree$WonderEditor.make(/* tuple */[
                      (function (param) {
                          return onSelect(dispatch, param);
                        }),
                      (function (param, param$1) {
                          return onDropFinish(store, dispatch, param, param$1);
                        })
                    ], Caml_array.caml_array_get(Js_option.getExn(store[/* sceneTreeState */3][/* sceneGraphData */0]), 0)[/* children */2], /* array */[])));
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
