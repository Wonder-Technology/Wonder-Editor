'use strict';

import * as React                                 from "react";
import * as Js_list                               from "../../../../../../../../node_modules/bs-platform/lib/es6/js_list.js";
import * as ReasonReact                           from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Log$WonderLog                         from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as DomHelper$WonderEditor                from "../../../../../external/DomHelper.js";
import * as ComponentBox$WonderEditor             from "../../../ui/component/componentBox/componentBox.js";
import * as OperateArrayUtils$WonderEditor        from "../../../../../utils/OperateArrayUtils.js";
import * as MainEditorMaterial$WonderEditor       from "../component/material/ui/MainEditorMaterial.js";
import * as MainEditorSceneView$WonderEditor      from "../../../logic/view/MainEditorSceneView.js";
import * as MainEditorStateView$WonderEditor      from "../../../logic/view/MainEditorStateView.js";
import * as MainEditorTransform$WonderEditor      from "../component/transform/ui/MainEditorTransform.js";
import * as MainEditorGameObjectView$WonderEditor from "../component/logic/view/MainEditorGameObjectView.js";

function _buildComponentUIComponent(param, param$1) {
  var dispatch = param$1[1];
  var store = param$1[0];
  var component = param[1];
  var type_ = param[0];
  switch (type_) {
    case "cameraController" : 
        return React.createElement("div", {
                    key: DomHelper$WonderEditor.getRandomKey(/* () */0)
                  }, DomHelper$WonderEditor.textEl("camera controller"));
    case "material" : 
        return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, ComponentBox$WonderEditor.make(type_, /* false */0, ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, MainEditorMaterial$WonderEditor.make(store, dispatch, component, /* array */[])), /* array */[]));
    case "transform" : 
        return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, ComponentBox$WonderEditor.make(type_, /* false */0, ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, MainEditorTransform$WonderEditor.make(store, dispatch, component, /* array */[])), /* array */[]));
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_buildComponentUIComponent", "the component: " + (String(type_) + " not exist"), "", "", "type:" + (String(type_) + (", component:" + (String(component) + "")))));
  }
}

function buildCurrentGameObjectComponent(store, dispatch) {
  var match = MainEditorSceneView$WonderEditor.getCurrentGameObject(MainEditorStateView$WonderEditor.prepareState(/* () */0));
  if (match) {
    var match$1 = MainEditorGameObjectView$WonderEditor.buildCurrentGameObjectShowComponentList(match[0], MainEditorStateView$WonderEditor.prepareState(/* () */0));
    Log$WonderLog.print(match$1[1]);
    var list = match$1[0];
    var store$1 = store;
    var dispatch$1 = dispatch;
    return Js_list.foldLeft((function (componentArray, param) {
                  return OperateArrayUtils$WonderEditor.push(_buildComponentUIComponent(/* tuple */[
                                  param[0],
                                  param[1]
                                ], /* tuple */[
                                  store$1,
                                  dispatch$1
                                ]), componentArray);
                }), /* array */[], list);
  } else {
    return /* array */[];
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
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, self);
    });
  return newrecord;
}

var Method = [
  buildCurrentGameObjectComponent,
  _buildComponentUIComponent
];

export {
  Method ,
  render ,
  make   ,
  
}
/* component Not a pure module */
