'use strict';

import * as React                                 from "react";
import * as ReasonReact                           from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as MainEditorSceneView$WonderEditor      from "../../../logic/view/MainEditorSceneView.js";
import * as MainEditorStateView$WonderEditor      from "../../../logic/view/MainEditorStateView.js";
import * as MainEditorTransform$WonderEditor      from "../component/transform/ui/MainEditorTransform.js";
import * as MainEditorGameObjectView$WonderEditor from "../component/logic/view/MainEditorGameObjectView.js";

function _buildComponentByType() {
  var currentGameObject = MainEditorSceneView$WonderEditor.getCurrentGameObject(MainEditorStateView$WonderEditor.prepareState(/* () */0));
  console.log(MainEditorGameObjectView$WonderEditor.hasMaterialComponent(currentGameObject, MainEditorStateView$WonderEditor.prepareState(/* () */0)));
  return /* () */0;
}

function buildCurrentGameObjectComponent(store, dispatch) {
  var match = MainEditorSceneView$WonderEditor.hasCurrentGameObject(MainEditorStateView$WonderEditor.prepareState(/* () */0));
  if (match !== 0) {
    _buildComponentByType(/* () */0);
    console.log(MainEditorSceneView$WonderEditor.getCurrentGameObject(MainEditorStateView$WonderEditor.prepareState(/* () */0)));
    return ReasonReact.element(/* None */0, /* None */0, MainEditorTransform$WonderEditor.make(store, dispatch, /* array */[]));
  } else {
    console.log("no current game object");
    return null;
  }
}

var component = ReasonReact.statelessComponent("MainEditorInspector");

function make(store, dispatch, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (param) {
      var store$1 = store;
      var dispatch$1 = dispatch;
      return React.createElement("article", {
                  key: "inspector",
                  className: "inspector-component"
                }, buildCurrentGameObjectComponent(store$1, dispatch$1));
    });
  return newrecord;
}

var Method = [buildCurrentGameObjectComponent];

export {
  Method ,
  make   ,
  
}
/* component Not a pure module */
