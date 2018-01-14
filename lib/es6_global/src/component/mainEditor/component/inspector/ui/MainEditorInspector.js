'use strict';

import * as React                                 from "react";
import * as ReasonReact                           from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as DomHelper$WonderEditor                from "../../../../../external/DomHelper.js";
import * as OperateArrayUtils$WonderEditor        from "../../../../utils/OperateArrayUtils.js";
import * as MainEditorSceneView$WonderEditor      from "../../../logic/view/MainEditorSceneView.js";
import * as MainEditorStateView$WonderEditor      from "../../../logic/view/MainEditorStateView.js";
import * as MainEditorTransform$WonderEditor      from "../component/transform/ui/MainEditorTransform.js";
import * as MainEditorGameObjectView$WonderEditor from "../component/logic/view/MainEditorGameObjectView.js";

function buildCurrentGameObjectComponent(store, dispatch, allComponents) {
  var match = MainEditorSceneView$WonderEditor.getCurrentGameObject(MainEditorStateView$WonderEditor.prepareState(/* () */0));
  if (match) {
    var currentGameObject = match[0];
    var store$1 = store;
    var dispatch$1 = dispatch;
    var allComponents$1 = allComponents;
    return allComponents$1.reduce((function (componentArray, param) {
                  switch (param[/* componentName */0]) {
                    case "material" : 
                        console.log(MainEditorGameObjectView$WonderEditor.hasMaterialComponent(currentGameObject, MainEditorStateView$WonderEditor.prepareState(/* () */0)));
                        return componentArray;
                    case "transform" : 
                        return OperateArrayUtils$WonderEditor.push(ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, MainEditorTransform$WonderEditor.make(store$1, dispatch$1, /* array */[])), componentArray);
                    default:
                      return componentArray;
                  }
                }), /* array */[]);
  } else {
    console.log("no current game object");
    return /* array */[];
  }
}

var component = ReasonReact.statelessComponent("MainEditorInspector");

function render(store, dispatch, allComponents, _) {
  return React.createElement("article", {
              key: "inspector",
              className: "inspector-component"
            }, buildCurrentGameObjectComponent(store, dispatch, allComponents));
}

function make(store, dispatch, allComponents, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, allComponents, self);
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
