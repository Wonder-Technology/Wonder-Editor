'use strict';

import * as Curry                   from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                   from "react";
import * as Pervasives              from "../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as ReasonReact             from "../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as AppStore$WonderEditor   from "../store/appStore.js";
import * as Reductive$WonderEditor  from "../utils/reductive.js";
import * as ReduxThunk$WonderEditor from "../utils/reduxThunk.js";

var component = ReasonReact.statelessComponent("App");

function make(state, dispatch, _) {
  var incrementIfOdd = function (store) {
    var match = Reductive$WonderEditor.Store[/* getState */5](store);
    if (match[/* counter */0] % 2 === 1) {
      return Reductive$WonderEditor.Store[/* dispatch */4](store, [
                  AppStore$WonderEditor.CounterAction,
                  /* Increment */0
                ]);
    } else {
      return /* () */0;
    }
  };
  var incrementAsync = function (store) {
    setTimeout((function () {
            return Reductive$WonderEditor.Store[/* dispatch */4](store, [
                        AppStore$WonderEditor.CounterAction,
                        /* Increment */0
                      ]);
          }), 1000);
    return /* () */0;
  };
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("div", undefined, React.createElement("div", undefined, "string: " + state[/* notACounter */1]), React.createElement("div", undefined, "counter: " + Pervasives.string_of_int(state[/* counter */0])), React.createElement("button", {
                      onClick: (function () {
                          return Curry._1(dispatch, [
                                      AppStore$WonderEditor.CounterAction,
                                      /* Increment */0
                                    ]);
                        })
                    }, "Increment"), React.createElement("button", {
                      onClick: (function () {
                          return Curry._1(dispatch, [
                                      AppStore$WonderEditor.CounterAction,
                                      /* Decrement */1
                                    ]);
                        })
                    }, "Decrement"), React.createElement("button", {
                      onClick: (function () {
                          return Curry._1(dispatch, [
                                      AppStore$WonderEditor.StringAction,
                                      /* A */0
                                    ]);
                        })
                    }, "add a"), React.createElement("button", {
                      onClick: (function () {
                          return Curry._1(dispatch, [
                                      ReduxThunk$WonderEditor.Thunk,
                                      incrementAsync
                                    ]);
                        })
                    }, "Increment Async"), React.createElement("button", {
                      onClick: (function () {
                          return Curry._1(dispatch, [
                                      ReduxThunk$WonderEditor.Thunk,
                                      incrementIfOdd
                                    ]);
                        })
                    }, "Increment if Odd"));
    });
  return newrecord;
}

export {
  component ,
  make      ,
  
}
/* component Not a pure module */
