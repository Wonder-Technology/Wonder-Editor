'use strict';

import * as Block                                from "../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry                                from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                                from "react";
import * as Js_list                              from "../../../../../../../../../node_modules/bs-platform/lib/es6/js_list.js";
import * as Js_boolean                           from "../../../../../../../../../node_modules/bs-platform/lib/es6/js_boolean.js";
import * as ReasonReact                          from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as AppStore$WonderEditor                from "../../../../../../ui/store/AppStore.js";
import * as DomHelper$WonderEditor               from "../../../../../../external/DomHelper.js";
import * as OperateArrayUtils$WonderEditor       from "../../../../../../utils/OperateArrayUtils.js";
import * as OperateStateUtils$WonderEditor       from "../../../../../../state/utils/OperateStateUtils.js";
import * as MainEditorComponentView$WonderEditor from "../../logic/view/MainEditorComponentView.js";

function addSpecificComponent(type_, currentGameObject, dispatch, _) {
  OperateStateUtils$WonderEditor.getAndSetState((function (param) {
          return MainEditorComponentView$WonderEditor.addComponentByType(type_, currentGameObject, param);
        }));
  Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
  return /* () */0;
}

function buildGameObjectAddableComponent(currentGameObject, dispatch, componentList) {
  var match = Js_list.length(componentList);
  if (match !== 0) {
    return Js_list.foldLeft((function (componentArray, type_) {
                  return OperateArrayUtils$WonderEditor.push(React.createElement("div", {
                                  key: DomHelper$WonderEditor.getRandomKey(/* () */0),
                                  onClick: (function ($$event) {
                                      return addSpecificComponent(type_, currentGameObject, dispatch, $$event);
                                    })
                                }, DomHelper$WonderEditor.textEl(type_)), componentArray);
                }), /* array */[], componentList);
  } else {
    return /* array */[];
  }
}

function toggleAddableComponent() {
  return /* ToggleAddableComponent */0;
}

var Method = /* module */[
  /* addSpecificComponent */addSpecificComponent,
  /* buildGameObjectAddableComponent */buildGameObjectAddableComponent,
  /* toggleAddableComponent */toggleAddableComponent
];

var component = ReasonReact.reducerComponent("addableComponent");

function reducer(_, state) {
  return /* Update */Block.__(0, [/* record */[
              /* isShowAddableComponent */1 - state[/* isShowAddableComponent */0],
              /* isListEmpty */state[/* isListEmpty */1]
            ]]);
}

function render(_, dispatch, currentGameObject, addableComponentList, param) {
  var state = param[/* state */4];
  var match = state[/* isShowAddableComponent */0];
  return React.createElement("article", {
              className: "addable-component"
            }, React.createElement("button", {
                  disabled: Js_boolean.to_js_boolean(state[/* isListEmpty */1]),
                  onClick: Curry._1(param[/* reduce */3], toggleAddableComponent)
                }, DomHelper$WonderEditor.textEl("add component")), match !== 0 ? buildGameObjectAddableComponent(currentGameObject, dispatch, addableComponentList) : null);
}

function make(store, dispatch, currentGameObject, addableComponentList, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, currentGameObject, addableComponentList, self);
    });
  newrecord[/* initialState */10] = (function () {
      var match = Js_list.length(addableComponentList);
      if (match !== 0) {
        return /* record */[
                /* isShowAddableComponent : false */0,
                /* isListEmpty : false */0
              ];
      } else {
        return /* record */[
                /* isShowAddableComponent : false */0,
                /* isListEmpty : true */1
              ];
      }
    });
  newrecord[/* reducer */12] = reducer;
  return newrecord;
}

export {
  Method    ,
  component ,
  reducer   ,
  render    ,
  make      ,
  
}
/* component Not a pure module */
