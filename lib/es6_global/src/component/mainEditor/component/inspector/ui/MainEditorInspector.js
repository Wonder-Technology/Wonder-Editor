'use strict';

import * as React                                 from "react";
import * as ReasonReact                           from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as MainEditorSceneView$WonderEditor      from "../../../logic/view/MainEditorSceneView.js";
import * as MainEditorStateView$WonderEditor      from "../../../logic/view/MainEditorStateView.js";
import * as MainEditorTransform$WonderEditor      from "../component/transform/ui/MainEditorTransform.js";
import * as MainEditorGameObjectView$WonderEditor from "../component/logic/view/MainEditorGameObjectView.js";

function buildCurrentGameObjectComponent(store, dispatch) {
  var match = MainEditorSceneView$WonderEditor.getCurrentGameObject(MainEditorStateView$WonderEditor.prepareState(/* () */0));
  if (match) {
    console.log(MainEditorGameObjectView$WonderEditor.hasMaterialComponent(match[0], MainEditorStateView$WonderEditor.prepareState(/* () */0)));
    return ReasonReact.element(/* None */0, /* None */0, MainEditorTransform$WonderEditor.make(store, dispatch, /* array */[]));
  } else {
    console.log("no current game object");
    return null;
  }
}

var component = ReasonReact.statelessComponent("MainEditorInspector");

function render(store, dispatch, _) {
  return React.createElement("article", {
              key: "inspector",
              className: "inspector-component"
            }, buildCurrentGameObjectComponent(store, dispatch));
}

function make(store, dispatch, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (param) {
      return render(store, dispatch, param);
    });
  return newrecord;
}

var Method = [buildCurrentGameObjectComponent];

export {
  Method ,
  render ,
  make   ,
  
}
/* component Not a pure module */
