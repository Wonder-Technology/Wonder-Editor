'use strict';

import * as Curry                                 from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                                 from "react";
import * as Js_list                               from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_list.js";
import * as ReasonReact                           from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Log$WonderLog                         from "../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as DomHelper$WonderEditor                from "../../../../../../../external/DomHelper.js";
import * as ArrayService$WonderEditor             from "../../../../../../../../service/atom/ArrayService.js";
import * as ComponentBox$WonderEditor             from "../../../../../atom_component/componentBox/ui/ComponentBox.js";
import * as AddableComponent$WonderEditor         from "../../addableComponent/ui/AddableComponent.js";
import * as StateLogicService$WonderEditor        from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as MainEditorTransform$WonderEditor      from "../../../composable_component/transform/ui/MainEditorTransform.js";
import * as MainEditorBasicMaterial$WonderEditor  from "../../../composable_component/material/ui/MainEditorBasicMaterial.js";
import * as InspectorGameObjectUtils$WonderEditor from "../../../utils/InspectorGameObjectUtils.js";

function _buildComponentBox(param, param$1, isClose, buildComponentFunc) {
  return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, ComponentBox$WonderEditor.make(param[0], isClose, Curry._3(buildComponentFunc, param$1[0], param$1[1], param[1]), /* array */[]));
}

function _buildTransform(store, dispatch, component) {
  return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, MainEditorTransform$WonderEditor.make(store, dispatch, component, /* array */[]));
}

function _buildBasicMaterial(store, dispatch, component) {
  return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, MainEditorBasicMaterial$WonderEditor.make(store, dispatch, component, /* array */[]));
}

function _buildSouceInstance(_, _$1, _$2) {
  return React.createElement("div", {
              key: DomHelper$WonderEditor.getRandomKey(/* () */0)
            }, DomHelper$WonderEditor.textEl("simulate source instance"));
}

function _buildBasicCameraView(_, _$1, _$2) {
  return React.createElement("div", {
              key: DomHelper$WonderEditor.getRandomKey(/* () */0)
            }, DomHelper$WonderEditor.textEl("simulate basic camera view"));
}

function _buildPerspectiveCameraProjection(_, _$1, _$2) {
  return React.createElement("div", {
              key: DomHelper$WonderEditor.getRandomKey(/* () */0)
            }, DomHelper$WonderEditor.textEl("simulate perspective camera view"));
}

function _buildComponentUIComponent(param, param$1) {
  var dispatch = param$1[1];
  var store = param$1[0];
  var component = param[1];
  var type_ = param[0];
  switch (type_) {
    case "basicCameraView" : 
        return _buildComponentBox(/* tuple */[
                    type_,
                    component
                  ], /* tuple */[
                    store,
                    dispatch
                  ], /* true */1, _buildBasicCameraView);
    case "basicMaterial" : 
        return _buildComponentBox(/* tuple */[
                    type_,
                    component
                  ], /* tuple */[
                    store,
                    dispatch
                  ], /* false */0, _buildBasicMaterial);
    case "perspectiveCameraProjection" : 
        return _buildComponentBox(/* tuple */[
                    type_,
                    component
                  ], /* tuple */[
                    store,
                    dispatch
                  ], /* true */1, _buildPerspectiveCameraProjection);
    case "sourceInstance" : 
        return _buildComponentBox(/* tuple */[
                    type_,
                    component
                  ], /* tuple */[
                    store,
                    dispatch
                  ], /* true */1, _buildSouceInstance);
    case "transform" : 
        return _buildComponentBox(/* tuple */[
                    type_,
                    component
                  ], /* tuple */[
                    store,
                    dispatch
                  ], /* false */0, _buildTransform);
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_buildComponentUIComponent", "the component: " + (String(type_) + " not exist"), "", "", "type:" + (String(type_) + (", component:" + (String(component) + "")))));
  }
}

function _buildGameObjectAllShowComponent(componentList, store, dispatch) {
  return Js_list.foldLeft((function (componentArray, param) {
                return ArrayService$WonderEditor.push(_buildComponentUIComponent(/* tuple */[
                                param[0],
                                param[1]
                              ], /* tuple */[
                                store,
                                dispatch
                              ]), componentArray);
              }), /* array */[], componentList);
}

function buildCurrentGameObjectComponent(store, dispatch, allShowComponentConfig, currentGameObject) {
  if (currentGameObject) {
    var gameObject = currentGameObject[0];
    var match = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
            return InspectorGameObjectUtils$WonderEditor.buildCurrentGameObjectShowComponentList(gameObject, allShowComponentConfig, param);
          }));
    return ArrayService$WonderEditor.push(ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, AddableComponent$WonderEditor.make(/* tuple */[
                        store,
                        dispatch
                      ], gameObject, match[1], /* array */[])), _buildGameObjectAllShowComponent(match[0], store, dispatch));
  } else {
    return /* array */[];
  }
}

var Method = /* module */[
  /* _buildComponentBox */_buildComponentBox,
  /* _buildTransform */_buildTransform,
  /* _buildBasicMaterial */_buildBasicMaterial,
  /* _buildSouceInstance */_buildSouceInstance,
  /* _buildBasicCameraView */_buildBasicCameraView,
  /* _buildPerspectiveCameraProjection */_buildPerspectiveCameraProjection,
  /* _buildComponentUIComponent */_buildComponentUIComponent,
  /* _buildGameObjectAllShowComponent */_buildGameObjectAllShowComponent,
  /* buildCurrentGameObjectComponent */buildCurrentGameObjectComponent
];

var component = ReasonReact.statelessComponent("SceneTreeInspector");

function render(store, dispatch, allShowComponentConfig, currentGameObject, _) {
  return React.createElement("article", {
              key: "SceneTreeInspector",
              className: "inspector-component"
            }, buildCurrentGameObjectComponent(store, dispatch, allShowComponentConfig, currentGameObject));
}

function make(store, dispatch, allShowComponentConfig, currentGameObject, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, allShowComponentConfig, currentGameObject, self);
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
