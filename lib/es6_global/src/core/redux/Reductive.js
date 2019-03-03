

import * as List from "../../../../../node_modules/bs-platform/lib/es6/list.js";
import * as Block from "../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ReasonReact from "../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";

function create(reducer, preloadedState, enhancer, param) {
  if (enhancer !== undefined) {
    return /* record */[
            /* state */preloadedState,
            /* reducer */reducer,
            /* listeners : [] */0,
            /* customDispatcher */enhancer
          ];
  } else {
    return /* record */[
            /* state */preloadedState,
            /* reducer */reducer,
            /* listeners : [] */0,
            /* customDispatcher */undefined
          ];
  }
}

function unsubscribe(store, listener, param) {
  store[/* listeners */2] = List.filter((function (l) {
            return listener !== l;
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
  if (match !== undefined) {
    return Curry._3(match, store, (function (param) {
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
  var name = $staropt$star !== undefined ? $staropt$star : "Provider";
  var innerComponent = ReasonReact.reducerComponent(name);
  return (function (component, _children) {
      return /* record */[
              /* debugName */innerComponent[/* debugName */0],
              /* reactClassInternal */innerComponent[/* reactClassInternal */1],
              /* handedOffState */innerComponent[/* handedOffState */2],
              /* willReceiveProps */innerComponent[/* willReceiveProps */3],
              /* didMount */(function (param) {
                  var send = param[/* send */3];
                  return Curry._1(send, /* AddListener */[send]);
                }),
              /* didUpdate */innerComponent[/* didUpdate */5],
              /* willUnmount */(function (param) {
                  var match = param[/* state */1][/* unsubscribe */1];
                  if (match !== undefined) {
                    return Curry._1(match, /* () */0);
                  } else {
                    return /* () */0;
                  }
                }),
              /* willUpdate */innerComponent[/* willUpdate */7],
              /* shouldUpdate */innerComponent[/* shouldUpdate */8],
              /* render */(function (param) {
                  var match = param[/* state */1][/* reductiveState */0];
                  if (match !== undefined) {
                    return ReasonReact.element(undefined, undefined, Curry._3(component, Caml_option.valFromOption(match), (function (param) {
                                      return dispatch(store, param);
                                    }), /* array */[]));
                  } else {
                    return null;
                  }
                }),
              /* initialState */(function (param) {
                  return /* record */[
                          /* reductiveState */Caml_option.some(store[/* state */0]),
                          /* unsubscribe */undefined
                        ];
                }),
              /* retainedProps */innerComponent[/* retainedProps */11],
              /* reducer */(function (action, state) {
                  if (action) {
                    var send = action[0];
                    return /* Update */Block.__(0, [/* record */[
                                /* reductiveState */Caml_option.some(store[/* state */0]),
                                /* unsubscribe */subscribe(store, (function (param) {
                                        return Curry._1(send, /* UpdateState */0);
                                      }))
                              ]]);
                  } else {
                    return /* Update */Block.__(0, [/* record */[
                                /* reductiveState */Caml_option.some(store[/* state */0]),
                                /* unsubscribe */state[/* unsubscribe */1]
                              ]]);
                  }
                }),
              /* jsElementWrapped */innerComponent[/* jsElementWrapped */13]
            ];
    });
}

var Provider = /* module */[/* createMake */createMake];

function compose(param) {
  return /* () */0;
}

function combineReducers(param) {
  return /* () */0;
}

function applyMiddleware(param) {
  return /* () */0;
}

function bindActionCreators(actions, dispatch) {
  return List.map((function (action, param) {
                return Curry._1(dispatch, action);
              }), actions);
}

export {
  Store ,
  Provider ,
  compose ,
  combineReducers ,
  applyMiddleware ,
  bindActionCreators ,
  
}
/* ReasonReact Not a pure module */
