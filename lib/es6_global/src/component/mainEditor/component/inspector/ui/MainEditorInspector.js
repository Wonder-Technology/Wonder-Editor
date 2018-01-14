'use strict';

import * as React                                 from "react";
import * as Js_list                               from "../../../../../../../../node_modules/bs-platform/lib/es6/js_list.js";
import * as ReasonReact                           from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as DomHelper$WonderEditor                from "../../../../../external/DomHelper.js";
import * as DebugUtils$WonderCommonlib            from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/DebugUtils.js";
import * as OperateArrayUtils$WonderEditor        from "../../../../utils/OperateArrayUtils.js";
import * as MainEditorSceneView$WonderEditor      from "../../../logic/view/MainEditorSceneView.js";
import * as MainEditorStateView$WonderEditor      from "../../../logic/view/MainEditorStateView.js";
import * as MainEditorTransform$WonderEditor      from "../component/transform/ui/MainEditorTransform.js";
import * as MainEditorGameObjectView$WonderEditor from "../component/logic/view/MainEditorGameObjectView.js";

function _isSpecificComponentExistShowInspector(allComponents, name) {
  return OperateArrayUtils$WonderEditor.hasItem(allComponents.filter((function (item) {
                    return +(item[/* componentName */0] === name);
                  })));
}

function buildCurrentGameObjectComponent(store, dispatch, allComponents) {
  var match = MainEditorSceneView$WonderEditor.getCurrentGameObject(MainEditorStateView$WonderEditor.prepareState(/* () */0));
  if (match) {
    var currentGameObject = match[0];
    var store$1 = store;
    var dispatch$1 = dispatch;
    var allComponents$1 = allComponents;
    return Js_list.foldLeft((function (componentArray, param) {
                  var name = param[0];
                  var match = _isSpecificComponentExistShowInspector(allComponents$1, name);
                  if (match !== 0) {
                    switch (name) {
                      case "material" : 
                          console.log("material");
                          return componentArray;
                      case "transform" : 
                          return OperateArrayUtils$WonderEditor.push(ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, MainEditorTransform$WonderEditor.make(store$1, dispatch$1, /* array */[])), componentArray);
                      default:
                        console.log("other");
                        return componentArray;
                    }
                  } else {
                    return componentArray;
                  }
                }), /* array */[], DebugUtils$WonderCommonlib.log(MainEditorGameObjectView$WonderEditor.getCurrentGameObjectAllComponentsList(currentGameObject, MainEditorStateView$WonderEditor.prepareState(/* () */0))));
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
