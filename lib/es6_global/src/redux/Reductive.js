'use strict';

import * as List        from "../../../../node_modules/bs-platform/lib/es6/list.js";
import * as Block       from "../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry       from "../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ReasonReact from "../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";

function create(reducer, preloadedState, enhancer, _) {
  if (enhancer) {
    return /* record */[
            /* state */preloadedState,
            /* reducer */reducer,
            /* listeners : [] */0,
            /* customDispatcher : Some */[enhancer[0]]
          ];
  } else {
    return /* record */[
            /* state */preloadedState,
            /* reducer */reducer,
            /* listeners : [] */0,
            /* customDispatcher : None */0
          ];
  }
}

function unsubscribe(store, listener, _) {
  store[/* listeners */2] = List.filter((function (l) {
            return +(listener !== l);
          }))(store[/* listeners */2]);
  return /* () */0;
}

function subscribe(store, listener) {
  store[/* listeners */2] = /* :: */[
    listener,
    store[/* listeners */2]
  ];
  return (function (param) {
      return unsubscribe(store, listener, param);
    });
}

function nativeDispatch(store, action) {
  store[/* state */0] = Curry._2(store[/* reducer */1], store[/* state */0], action);
  return List.iter((function (listener) {
                return Curry._1(listener, /* () */0);
              }), store[/* listeners */2]);
}

function dispatch(store, action) {
  var match = store[/* customDispatcher */3];
  if (match) {
    return Curry._3(match[0], store, (function (param) {
                  return nativeDispatch(store, param);
                }), action);
  } else {
    return nativeDispatch(store, action);
  }
}

function getState(store) {
  return store[/* state */0];
}

function replaceReducer(store, reducer) {
  store[/* reducer */1] = reducer;
  return /* () */0;
}

var Store = /* module */[
  /* create */create,
  /* unsubscribe */unsubscribe,
  /* subscribe */subscribe,
  /* nativeDispatch */nativeDispatch,
  /* dispatch */dispatch,
  /* getState */getState,
  /* replaceReducer */replaceReducer
];

function createMake($staropt$star, store) {
  var name = $staropt$star ? $staropt$star[0] : "Provider";
  var innerComponent = ReasonReact.reducerComponent(name);
  return (function (component, _) {
      var updater = function (_, param) {
        return /* Update */Block.__(0, [/* record */[
                    /* reductiveState : Some */[store[/* state */0]],
                    /* unsubscribe */param[/* state */4][/* unsubscribe */1]
                  ]]);
      };
      var newrecord = innerComponent.slice();
      newrecord[/* didMount */4] = (function (param) {
          return /* Update */Block.__(0, [/* record */[
                      /* reductiveState : Some */[store[/* state */0]],
                      /* unsubscribe : Some */[subscribe(store, Curry._1(param[/* update */1], updater))]
                    ]]);
        });
      newrecord[/* willUnmount */6] = (function (param) {
          var match = param[/* state */4][/* unsubscribe */1];
          if (match) {
            return Curry._1(match[0], /* () */0);
          } else {
            return /* () */0;
          }
        });
      newrecord[/* render */9] = (function (param) {
          var match = param[/* state */4][/* reductiveState */0];
          if (match) {
            return ReasonReact.element(/* None */0, /* None */0, Curry._3(component, match[0], (function (param) {
                              return dispatch(store, param);
                            }), /* array */[]));
          } else {
            return null;
          }
        });
      newrecord[/* initialState */10] = (function () {
          return /* record */[
                  /* reductiveState : None */0,
                  /* unsubscribe : None */0
                ];
        });
      return newrecord;
    });
}

var Provider = /* module */[/* createMake */createMake];

function compose() {
  return /* () */0;
}

function combineReducers() {
  return /* () */0;
}

function applyMiddleware() {
  return /* () */0;
}

function bindActionCreators(actions, dispatch) {
  return List.map((function (action, _) {
                return Curry._1(dispatch, action);
              }), actions);
}

export {
  Store              ,
  Provider           ,
  compose            ,
  combineReducers    ,
  applyMiddleware    ,
  bindActionCreators ,
  
}
/* ReasonReact Not a pure module */
