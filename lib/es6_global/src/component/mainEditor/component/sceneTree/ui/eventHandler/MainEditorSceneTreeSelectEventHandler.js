'use strict';

import * as Curry                            from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor            from "../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor        from "../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor   from "../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as MainEditorSceneView$WonderEditor from "../../../../logic/view/MainEditorSceneView.js";
import * as MainEditorStateView$WonderEditor from "../../../../logic/view/MainEditorStateView.js";

var onDrop = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var onFinish = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

function _setCurrentGameObject(gameObject) {
  return MainEditorStateView$WonderEditor.finishState(MainEditorSceneView$WonderEditor.setCurrentGameObject(gameObject, MainEditorStateView$WonderEditor.prepareState(/* () */0)));
}

function onSelect(param, _, uid) {
  _setCurrentGameObject(uid);
  Curry._1(param[1], AppStore$WonderEditor.ReLoad);
  return /* () */0;
}

var SelectEventHandler = /* module */[
  /* onDrop */onDrop,
  /* onFinish */onFinish,
  /* _setCurrentGameObject */_setCurrentGameObject,
  /* onSelect */onSelect
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      onSelect,
      onDrop,
      onFinish
    ]);

export {
  SelectEventHandler ,
  MakeEventHandler   ,
  
}
/* MakeEventHandler Not a pure module */
