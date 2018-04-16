'use strict';

import * as Block                                                 from "../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry                                                 from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                                                 from "react";
import * as Js_list                                               from "../../../../../../../../../../node_modules/bs-platform/lib/es6/js_list.js";
import * as ReasonReact                                           from "../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as DomHelper$WonderEditor                                from "../../../../../../external/DomHelper.js";
import * as ArrayService$WonderEditor                             from "../../../../../../../service/atom/ArrayService.js";
import * as AddableComponentAddComponentEventHandler$WonderEditor from "./eventHandler/AddableComponentAddComponentEventHandler.js";

var addSpecificComponent = AddableComponentAddComponentEventHandler$WonderEditor.MakeEventHandler[/* onClick */2];

function buildGameObjectAddableComponent(store, dispatch, currentGameObject, componentList) {
  var match = Js_list.length(componentList);
  if (match !== 0) {
    return Js_list.foldLeft((function (componentArray, type_) {
                  return ArrayService$WonderEditor.push(React.createElement("div", {
                                  key: DomHelper$WonderEditor.getRandomKey(/* () */0),
                                  onClick: (function () {
                                      return Curry._3(addSpecificComponent, /* tuple */[
                                                  store,
                                                  dispatch
                                                ], type_, currentGameObject);
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

function render(reduxTuple, currentGameObject, addableComponentList, param) {
  var state = param[/* state */4];
  var match = state[/* isShowAddableComponent */0];
  return React.createElement("article", {
              className: "addable-component"
            }, React.createElement("button", {
                  disabled: state[/* isListEmpty */1],
                  onClick: Curry._1(param[/* reduce */3], toggleAddableComponent)
                }, DomHelper$WonderEditor.textEl("add component")), match !== 0 ? buildGameObjectAddableComponent(reduxTuple[0], reduxTuple[1], currentGameObject, addableComponentList) : null);
}

function make(reduxTuple, currentGameObject, addableComponentList, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      return render(reduxTuple, currentGameObject, addableComponentList, self);
    });
  newrecord[/* initialState */10] = (function () {
      var match = Js_list.length(addableComponentList);
      if (match !== 0) {
        return /* record */[
                /* isShowAddableComponent : false */0,
                /* isListEmpty */false
              ];
      } else {
        return /* record */[
                /* isShowAddableComponent : false */0,
                /* isListEmpty */true
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
