'use strict';

import * as React                                 from "react";
import * as Js_list                               from "../../../../../../../../node_modules/bs-platform/lib/es6/js_list.js";
import * as ReasonReact                           from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Log$WonderLog                         from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as DomHelper$WonderEditor                from "../../../../../external/DomHelper.js";
import * as ComponentBox$WonderEditor             from "../../../ui/component/componentBox/componentBox.js";
import * as AddableComponent$WonderEditor         from "../component/addableComponent/addableComponent.js";
import * as OperateArrayUtils$WonderEditor        from "../../../../../utils/OperateArrayUtils.js";
import * as OperateStateUtils$WonderEditor        from "../../../../../utils/OperateStateUtils.js";
import * as MainEditorMaterial$WonderEditor       from "../component/material/ui/MainEditorMaterial.js";
import * as MainEditorSceneView$WonderEditor      from "../../../logic/view/MainEditorSceneView.js";
import * as MainEditorTransform$WonderEditor      from "../component/transform/ui/MainEditorTransform.js";
import * as MainEditorGameObjectView$WonderEditor from "../logic/view/MainEditorGameObjectView.js";

function _buildComponentUIComponent(param, param$1) {
  var dispatch = param$1[1];
  var store = param$1[0];
  var component = param[1];
  var type_ = param[0];
  switch (type_) {
    case "cameraController" : 
        return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, ComponentBox$WonderEditor.make(type_, /* true */1, React.createElement("div", {
                            key: DomHelper$WonderEditor.getRandomKey(/* () */0)
                          }, DomHelper$WonderEditor.textEl("simulate camera controller")), /* array */[]));
    case "material" : 
        return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, ComponentBox$WonderEditor.make(type_, /* false */0, ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, MainEditorMaterial$WonderEditor.make(store, dispatch, component, /* array */[])), /* array */[]));
    case "sourceInstance" : 
        return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, ComponentBox$WonderEditor.make(type_, /* true */1, React.createElement("div", {
                            key: DomHelper$WonderEditor.getRandomKey(/* () */0)
                          }, DomHelper$WonderEditor.textEl("simulate source instance")), /* array */[]));
    case "transform" : 
        return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, ComponentBox$WonderEditor.make(type_, /* false */0, ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, MainEditorTransform$WonderEditor.make(store, dispatch, component, /* array */[])), /* array */[]));
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_buildComponentUIComponent", "the component: " + (String(type_) + " not exist"), "", "", "type:" + (String(type_) + (", component:" + (String(component) + "")))));
  }
}

function _buildGameObjectAllShowComponent(componentList, store, dispatch) {
  return Js_list.foldLeft((function (componentArray, param) {
                return OperateArrayUtils$WonderEditor.push(_buildComponentUIComponent(/* tuple */[
                                param[0],
                                param[1]
                              ], /* tuple */[
                                store,
                                dispatch
                              ]), componentArray);
              }), /* array */[], componentList);
}

function buildCurrentGameObjectComponent(store, dispatch, allShowComponentConfig) {
  var match = OperateStateUtils$WonderEditor.getState(MainEditorSceneView$WonderEditor.getCurrentGameObject);
  if (match) {
    var gameObject = match[0];
    var match$1 = OperateStateUtils$WonderEditor.getState((function (param) {
            return MainEditorGameObjectView$WonderEditor.buildCurrentGameObjectShowComponentList(gameObject, allShowComponentConfig, param);
          }));
    return OperateArrayUtils$WonderEditor.push(ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, AddableComponent$WonderEditor.make(store, dispatch, gameObject, match$1[1], /* array */[])), _buildGameObjectAllShowComponent(match$1[0], store, dispatch));
  } else {
    return /* array */[];
  }
}

var Method = /* module */[
  /* _buildComponentUIComponent */_buildComponentUIComponent,
  /* _buildGameObjectAllShowComponent */_buildGameObjectAllShowComponent,
  /* buildCurrentGameObjectComponent */buildCurrentGameObjectComponent
];

var component = ReasonReact.statelessComponent("MainEditorInspector");

function render(store, dispatch, allShowComponentConfig, _) {
  return React.createElement("article", {
              key: "inspector",
              className: "inspector-component"
            }, buildCurrentGameObjectComponent(store, dispatch, allShowComponentConfig));
}

function make(store, dispatch, allShowComponentConfig, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, allShowComponentConfig, self);
    });
  return newrecord;
}

export {
  Method    ,
  component ,
  render    ,
  make      ,
  
}
/* component Not a pure module */
