

import * as Block from "../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_format from "../../../../../../node_modules/bs-platform/lib/es6/caml_format.js";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";
import * as ConsoleUtils$WonderEditor from "../../utils/ui/ConsoleUtils.js";
import * as ReasonReactUtils$WonderEditor from "../../utils/ui/ReasonReactUtils.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";

function change($$event) {
  var inputVal = $$event.target.value;
  switch (inputVal) {
    case "" : 
        return /* Change */[""];
    case "-" : 
        return /* Change */["-"];
    default:
      var match = (/^-?(0|[1-9][0-9]*)(\.[0-9]{0,6})?$/).test(inputVal);
      if (match) {
        return /* Change */[inputVal];
      } else {
        return /* Change */[undefined];
      }
  }
}

function triggerOnChange(value, onChangeFunc) {
  if (onChangeFunc !== undefined) {
    return Curry._1(onChangeFunc, Caml_format.caml_float_of_string(value));
  } else {
    return /* () */0;
  }
}

function triggerOnBlur(value, onBlurFunc) {
  if (onBlurFunc !== undefined) {
    return Curry._1(onBlurFunc, Caml_format.caml_float_of_string(value));
  } else {
    return /* () */0;
  }
}

function handleSpecificFuncByCanBeZero(_, value, canBeZero, param) {
  var canBeZeroFunc = param[0];
  if (canBeZero !== undefined && !canBeZero) {
    return Curry._1(param[1], value);
  } else {
    return Curry._1(canBeZeroFunc, value);
  }
}

function handleChangeAction(state, onChangeFunc, canBeZero, value) {
  if (value !== undefined) {
    var value$1 = value;
    switch (value$1) {
      case "" : 
          return /* Update */Block.__(0, [/* record */[
                      /* inputValue */undefined,
                      /* originValue */state[/* originValue */1]
                    ]]);
      case "-" : 
          return /* Update */Block.__(0, [/* record */[
                      /* inputValue */"-",
                      /* originValue */state[/* originValue */1]
                    ]]);
      case "0" : 
          return handleSpecificFuncByCanBeZero(state, "0", canBeZero, /* tuple */[
                      (function (value) {
                          return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                                      /* inputValue */value,
                                      /* originValue */state[/* originValue */1]
                                    ], (function () {
                                        return triggerOnChange(value, onChangeFunc);
                                      }));
                        }),
                      (function (value) {
                          return /* Update */Block.__(0, [/* record */[
                                      /* inputValue */value,
                                      /* originValue */state[/* originValue */1]
                                    ]]);
                        })
                    ]);
      case "0." : 
          return handleSpecificFuncByCanBeZero(state, "0.", canBeZero, /* tuple */[
                      (function (value) {
                          return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                                      /* inputValue */value,
                                      /* originValue */state[/* originValue */1]
                                    ], (function () {
                                        return triggerOnChange(value, onChangeFunc);
                                      }));
                        }),
                      (function (value) {
                          return /* Update */Block.__(0, [/* record */[
                                      /* inputValue */value,
                                      /* originValue */state[/* originValue */1]
                                    ]]);
                        })
                    ]);
      default:
        return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                    /* inputValue */value$1,
                    /* originValue */state[/* originValue */1]
                  ], (function () {
                      return triggerOnChange(value$1, onChangeFunc);
                    }));
    }
  } else {
    return /* NoUpdate */0;
  }
}

function handleBlurAction(state, param, canBeZero) {
  var onBlurFunc = param[1];
  var onChangeFunc = param[0];
  var match = state[/* inputValue */0];
  var exit = 0;
  if (match !== undefined) {
    var value = match;
    switch (value) {
      case "" : 
      case "-" : 
          exit = 1;
          break;
      case "0" : 
      case "0." : 
          exit = 2;
          break;
      default:
        return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                    /* inputValue */state[/* inputValue */0],
                    /* originValue */value
                  ], (function () {
                      return triggerOnBlur(value, onBlurFunc);
                    }));
    }
  } else {
    exit = 1;
  }
  switch (exit) {
    case 1 : 
        return handleSpecificFuncByCanBeZero(state, "0", canBeZero, /* tuple */[
                    (function (value) {
                        return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                                    /* inputValue */value,
                                    /* originValue */state[/* originValue */1]
                                  ], (function () {
                                      triggerOnChange(value, onChangeFunc);
                                      return triggerOnBlur(value, onBlurFunc);
                                    }));
                      }),
                    (function () {
                        return /* Update */Block.__(0, [/* record */[
                                    /* inputValue */state[/* originValue */1],
                                    /* originValue */state[/* originValue */1]
                                  ]]);
                      })
                  ]);
    case 2 : 
        return handleSpecificFuncByCanBeZero(state, "0", canBeZero, /* tuple */[
                    (function (value) {
                        return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                                    /* inputValue */value,
                                    /* originValue */state[/* originValue */1]
                                  ], (function () {
                                      return triggerOnBlur(value, onBlurFunc);
                                    }));
                      }),
                    (function () {
                        StateLogicService$WonderEditor.getEditorState((function (param) {
                                return ConsoleUtils$WonderEditor.warn("the value can't be 0 !", param);
                              }));
                        return /* Update */Block.__(0, [/* record */[
                                    /* inputValue */state[/* originValue */1],
                                    /* originValue */state[/* originValue */1]
                                  ]]);
                      })
                  ]);
    
  }
}

var Method = /* module */[
  /* change */change,
  /* triggerOnChange */triggerOnChange,
  /* triggerOnBlur */triggerOnBlur,
  /* handleSpecificFuncByCanBeZero */handleSpecificFuncByCanBeZero,
  /* handleChangeAction */handleChangeAction,
  /* handleBlurAction */handleBlurAction
];

var component = ReasonReact.reducerComponent("FloatInput");

function reducer(param, canBeZero, action, state) {
  var onChangeFunc = param[0];
  if (action) {
    return handleChangeAction(state, onChangeFunc, canBeZero, action[0]);
  } else {
    return handleBlurAction(state, /* tuple */[
                onChangeFunc,
                param[1]
              ], canBeZero);
  }
}

function render(label, _, param) {
  var send = param[/* send */3];
  var match = param[/* state */1][/* inputValue */0];
  return React.createElement("article", {
              className: "inspector-item"
            }, label !== undefined ? React.createElement("div", {
                    className: "item-header"
                  }, DomHelper$WonderEditor.textEl(label)) : null, React.createElement("div", {
                  className: "item-content"
                }, React.createElement("input", {
                      className: "input-component float-input",
                      type: "text",
                      value: match !== undefined ? match : "",
                      onBlur: (function () {
                          return Curry._1(send, /* Blur */0);
                        }),
                      onChange: (function (_e) {
                          return Curry._1(send, change(_e));
                        })
                    })));
}

function make(defaultValue, label, onChange, onBlur, canBeZero, _) {
  var partial_arg = /* tuple */[
    onChange,
    onBlur
  ];
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(label, onBlur, self);
            }),
          /* initialState */(function () {
              if (defaultValue !== undefined) {
                var value = defaultValue;
                return /* record */[
                        /* inputValue */value,
                        /* originValue */value
                      ];
              } else {
                return /* record */[
                        /* inputValue */"0",
                        /* originValue */"0"
                      ];
              }
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param, param$1) {
              return reducer(partial_arg, canBeZero, param, param$1);
            }),
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  Method ,
  component ,
  reducer ,
  render ,
  make ,
  
}
/* component Not a pure module */
