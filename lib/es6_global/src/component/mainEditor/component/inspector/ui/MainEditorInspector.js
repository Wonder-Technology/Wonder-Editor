'use strict';

import * as React                                 from "react";
import * as Js_list                               from "../../../../../../../../node_modules/bs-platform/lib/es6/js_list.js";
import * as ReasonReact                           from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Log$WonderLog                         from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as DomHelper$WonderEditor                from "../../../../../external/DomHelper.js";
import * as OperateArrayUtils$WonderEditor        from "../../../../utils/OperateArrayUtils.js";
import * as MainEditorSceneView$WonderEditor      from "../../../logic/view/MainEditorSceneView.js";
import * as MainEditorStateView$WonderEditor      from "../../../logic/view/MainEditorStateView.js";
import * as MainEditorTransform$WonderEditor      from "../component/transform/ui/MainEditorTransform.js";
import * as MainEditorGameObjectView$WonderEditor from "../component/logic/view/MainEditorGameObjectView.js";

function _getAllShowComponentList(allShowComponentsConfig, allComponentList) {
  return Js_list.filter((function (param) {
                var type_ = param[0];
                return OperateArrayUtils$WonderEditor.hasItemByFunc((function (param) {
                              return +(param[/* componentName */0] === type_);
                            }), allShowComponentsConfig);
              }), allComponentList);
}

function _buildComponentUIComponent(param, param$1, componentArray) {
  var component = param[1];
  var type_ = param[0];
  if (type_ === "transform") {
    return OperateArrayUtils$WonderEditor.push(ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, MainEditorTransform$WonderEditor.make(param$1[0], param$1[1], component, /* array */[])), componentArray);
  } else {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_buildComponentUIComponent", "the component: " + (String(type_) + " not exist"), "", "", "type:" + (String(type_) + (", component:" + (String(component) + "")))));
  }
}

function buildCurrentGameObjectComponent(store, dispatch, allShowComponentsConfig) {
  var match = MainEditorSceneView$WonderEditor.getCurrentGameObject(MainEditorStateView$WonderEditor.prepareState(/* () */0));
  if (match) {
    var currentGameObject = match[0];
    var store$1 = store;
    var dispatch$1 = dispatch;
    var allShowComponentsConfig$1 = allShowComponentsConfig;
    return Js_list.foldLeft((function (componentArray, param) {
                  return _buildComponentUIComponent(/* tuple */[
                              param[0],
                              param[1]
                            ], /* tuple */[
                              store$1,
                              dispatch$1
                            ], componentArray);
                }), /* array */[], _getAllShowComponentList(allShowComponentsConfig$1, MainEditorGameObjectView$WonderEditor.getCurrentGameObjectAllComponentList(currentGameObject, MainEditorStateView$WonderEditor.prepareState(/* () */0))));
  } else {
    return /* array */[];
  }
}

var component = ReasonReact.statelessComponent("MainEditorInspector");

function render(store, dispatch, allShowComponentsConfig, _) {
  return React.createElement("article", {
              key: "inspector",
              className: "inspector-component"
            }, buildCurrentGameObjectComponent(store, dispatch, allShowComponentsConfig));
}

function make(store, dispatch, allShowComponentsConfig, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, allShowComponentsConfig, self);
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
