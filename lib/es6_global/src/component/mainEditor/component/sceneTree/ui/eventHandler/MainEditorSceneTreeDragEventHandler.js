'use strict';

import * as Curry                                from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_option                            from "../../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as AppStore$WonderEditor                from "../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor            from "../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor       from "../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as MainEditorStateView$WonderEditor     from "../../../../logic/view/MainEditorStateView.js";
import * as MainEditorSceneTreeView$WonderEditor from "../../logic/view/MainEditorSceneTreeView.js";

var onSelect = EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var onChange = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

function _setParentKeepOrder(targetUid, dragedUid) {
  return MainEditorStateView$WonderEditor.finishState(MainEditorSceneTreeView$WonderEditor.setParentKeepOrder(targetUid, dragedUid, MainEditorStateView$WonderEditor.prepareState(/* () */0)));
}

function _getSceneGraphDataFromStore(store) {
  return Js_option.getExn(store[/* sceneTreeState */3][/* sceneGraphData */0]);
}

function onDrag(param, _, param$1) {
  var dragedUid = param$1[1];
  var targetUid = param$1[0];
  var dispatch = param[1];
  var match = MainEditorSceneTreeView$WonderEditor.isGameObjectRelationError(targetUid, dragedUid, MainEditorStateView$WonderEditor.prepareState(/* () */0));
  if (match !== 0) {
    Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
    return /* () */0;
  } else {
    _setParentKeepOrder(targetUid, dragedUid);
    Curry._1(dispatch, [
          AppStore$WonderEditor.SceneTreeAction,
          /* SetSceneGraph */[/* Some */[MainEditorSceneTreeView$WonderEditor.getDragedSceneGraphData(targetUid, dragedUid, Js_option.getExn(param[0][/* sceneTreeState */3][/* sceneGraphData */0]))]]
        ]);
    return /* () */0;
  }
}

var DragEventHandler = /* module */[
  /* onSelect */onSelect,
  /* onChange */onChange,
  /* _setParentKeepOrder */_setParentKeepOrder,
  /* _getSceneGraphDataFromStore */_getSceneGraphDataFromStore,
  /* onDrag */onDrag
];

var MakeMainEditorSceneTreeDragEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      onSelect,
      onDrag,
      onChange
    ]);

export {
  DragEventHandler                        ,
  MakeMainEditorSceneTreeDragEventHandler ,
  
}
/* MakeMainEditorSceneTreeDragEventHandler Not a pure module */
