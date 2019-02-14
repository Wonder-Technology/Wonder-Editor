

import * as Block from "../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Pervasives from "../../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as Caml_format from "../../../../../../node_modules/bs-platform/lib/es6/caml_format.js";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomExtend$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/external/DomExtend.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";
import * as ConsoleUtils$WonderEditor from "../../utils/ui/ConsoleUtils.js";
import * as OptionService$WonderEditor from "../../../service/primitive/OptionService.js";
import * as ReasonReactUtils$WonderEditor from "../../utils/ui/ReasonReactUtils.js";
import * as MouseEventService$WonderEditor from "../../../service/record/editor/event/MouseEventService.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";

function _change($$event) {
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
  if (canBeZero) {
    return Curry._1(param[0], value);
  } else {
    return Curry._1(param[1], value);
  }
}

function handleChangeAction(state, onChangeFunc, canBeZero, value) {
  if (value !== undefined) {
    var value$1 = value;
    switch (value$1) {
      case "" : 
          return /* Update */Block.__(0, [/* record */[
                      /* inputValue */undefined,
                      /* originValue */state[/* originValue */1],
                      /* isDragStart */state[/* isDragStart */2],
                      /* canBeZero */state[/* canBeZero */3]
                    ]]);
      case "-" : 
          return /* Update */Block.__(0, [/* record */[
                      /* inputValue */"-",
                      /* originValue */state[/* originValue */1],
                      /* isDragStart */state[/* isDragStart */2],
                      /* canBeZero */state[/* canBeZero */3]
                    ]]);
      case "0" : 
          return handleSpecificFuncByCanBeZero(state, "0", canBeZero, /* tuple */[
                      (function (value) {
                          return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                                      /* inputValue */value,
                                      /* originValue */state[/* originValue */1],
                                      /* isDragStart */state[/* isDragStart */2],
                                      /* canBeZero */state[/* canBeZero */3]
                                    ], (function () {
                                        return triggerOnChange(value, onChangeFunc);
                                      }));
                        }),
                      (function (value) {
                          return /* Update */Block.__(0, [/* record */[
                                      /* inputValue */value,
                                      /* originValue */state[/* originValue */1],
                                      /* isDragStart */state[/* isDragStart */2],
                                      /* canBeZero */state[/* canBeZero */3]
                                    ]]);
                        })
                    ]);
      case "0." : 
          return handleSpecificFuncByCanBeZero(state, "0.", canBeZero, /* tuple */[
                      (function (value) {
                          return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                                      /* inputValue */value,
                                      /* originValue */state[/* originValue */1],
                                      /* isDragStart */state[/* isDragStart */2],
                                      /* canBeZero */state[/* canBeZero */3]
                                    ], (function () {
                                        return triggerOnChange(value, onChangeFunc);
                                      }));
                        }),
                      (function (value) {
                          return /* Update */Block.__(0, [/* record */[
                                      /* inputValue */value,
                                      /* originValue */state[/* originValue */1],
                                      /* isDragStart */state[/* isDragStart */2],
                                      /* canBeZero */state[/* canBeZero */3]
                                    ]]);
                        })
                    ]);
      default:
        return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                    /* inputValue */value$1,
                    /* originValue */state[/* originValue */1],
                    /* isDragStart */state[/* isDragStart */2],
                    /* canBeZero */state[/* canBeZero */3]
                  ], (function () {
                      return triggerOnChange(value$1, onChangeFunc);
                    }));
    }
  } else {
    return /* NoUpdate */0;
  }
}

function _markDragDrop(state) {
  return /* record */[
          /* inputValue */state[/* inputValue */0],
          /* originValue */state[/* originValue */1],
          /* isDragStart */false,
          /* canBeZero */state[/* canBeZero */3]
        ];
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
        return ReasonReactUtils$WonderEditor.updateWithSideEffects(_markDragDrop(/* record */[
                        /* inputValue */state[/* inputValue */0],
                        /* originValue */value,
                        /* isDragStart */state[/* isDragStart */2],
                        /* canBeZero */state[/* canBeZero */3]
                      ]), (function () {
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
                        return ReasonReactUtils$WonderEditor.updateWithSideEffects(_markDragDrop(/* record */[
                                        /* inputValue */value,
                                        /* originValue */state[/* originValue */1],
                                        /* isDragStart */state[/* isDragStart */2],
                                        /* canBeZero */state[/* canBeZero */3]
                                      ]), (function () {
                                      triggerOnChange(value, onChangeFunc);
                                      return triggerOnBlur(value, onBlurFunc);
                                    }));
                      }),
                    (function () {
                        return /* Update */Block.__(0, [_markDragDrop(/* record */[
                                        /* inputValue */state[/* originValue */1],
                                        /* originValue */state[/* originValue */1],
                                        /* isDragStart */state[/* isDragStart */2],
                                        /* canBeZero */state[/* canBeZero */3]
                                      ])]);
                      })
                  ]);
    case 2 : 
        return handleSpecificFuncByCanBeZero(state, "0", canBeZero, /* tuple */[
                    (function (value) {
                        return ReasonReactUtils$WonderEditor.updateWithSideEffects(_markDragDrop(/* record */[
                                        /* inputValue */value,
                                        /* originValue */state[/* originValue */1],
                                        /* isDragStart */state[/* isDragStart */2],
                                        /* canBeZero */state[/* canBeZero */3]
                                      ]), (function () {
                                      return triggerOnBlur(value, onBlurFunc);
                                    }));
                      }),
                    (function () {
                        StateLogicService$WonderEditor.getEditorState((function (param) {
                                return ConsoleUtils$WonderEditor.warn("the value can't be 0 !", param);
                              }));
                        return /* Update */Block.__(0, [/* record */[
                                    /* inputValue */state[/* originValue */1],
                                    /* originValue */state[/* originValue */1],
                                    /* isDragStart */state[/* isDragStart */2],
                                    /* canBeZero */state[/* canBeZero */3]
                                  ]]);
                      })
                  ]);
    
  }
}

function _getReplacedZero() {
  return 0.001;
}

function _isNearlyZero(value) {
  return Math.abs(value) <= 0.001;
}

function computeNewValue(currentValue, canBeZero, param) {
  var newValue = currentValue + param[0] / 100.0 - param[1] / 100.0;
  if (canBeZero) {
    return newValue;
  } else {
    var match = Math.abs(newValue) <= 0.001;
    if (match) {
      return 0.001;
    } else {
      return newValue;
    }
  }
}

function isDragStart(param) {
  return param[/* isDragStart */2];
}

function handleDragStart($$event, send) {
  DomExtend$Wonderjs.requestPointerLock($$event.target);
  Curry._1(send, /* DragStart */0);
  return /* () */0;
}

function handleDragDrop(param) {
  var match = isDragStart(param[1]);
  if (match) {
    Curry._1(DomExtend$Wonderjs.exitPointerLock, /* () */0);
    Curry._1(param[0], /* Blur */1);
    return /* () */0;
  } else {
    return /* () */0;
  }
}

function handleDragOver($$event, param) {
  var state = param[1];
  var match = isDragStart(state);
  if (match) {
    Curry._1(param[0], /* Change */[Pervasives.string_of_float(computeNewValue(Caml_format.caml_float_of_string(OptionService$WonderEditor.unsafeGet(state[/* inputValue */0])), state[/* canBeZero */3], MouseEventService$WonderEditor.getMovementDeltaWhenPointerLocked($$event)))]);
    return /* () */0;
  } else {
    return /* () */0;
  }
}

function renderLabel(param, label) {
  if (label !== undefined) {
    var state = param[1];
    var send = param[0];
    return React.createElement("div", {
                className: "item-header component-label",
                onMouseDown: (function ($$event) {
                    return handleDragStart($$event, send);
                  }),
                onMouseMove: (function ($$event) {
                    return handleDragOver($$event, /* tuple */[
                                send,
                                state
                              ]);
                  }),
                onMouseUp: (function () {
                    return handleDragDrop(/* tuple */[
                                send,
                                state
                              ]);
                  })
              }, DomHelper$WonderEditor.textEl(label));
  } else {
    return null;
  }
}

function renderContent(param) {
  var send = param[0];
  var match = param[1][/* inputValue */0];
  return React.createElement("div", {
              className: "item-content"
            }, React.createElement("input", {
                  className: "input-component float-input",
                  type: "text",
                  value: match !== undefined ? match : "",
                  onBlur: (function () {
                      return Curry._1(send, /* Blur */1);
                    }),
                  onChange: (function (_e) {
                      return Curry._1(send, _change(_e));
                    })
                }));
}

var Method = /* module */[
  /* _change */_change,
  /* triggerOnChange */triggerOnChange,
  /* triggerOnBlur */triggerOnBlur,
  /* handleSpecificFuncByCanBeZero */handleSpecificFuncByCanBeZero,
  /* handleChangeAction */handleChangeAction,
  /* _markDragDrop */_markDragDrop,
  /* handleBlurAction */handleBlurAction,
  /* _getReplacedZero */_getReplacedZero,
  /* _isNearlyZero */_isNearlyZero,
  /* computeNewValue */computeNewValue,
  /* isDragStart */isDragStart,
  /* handleDragStart */handleDragStart,
  /* handleDragDrop */handleDragDrop,
  /* handleDragOver */handleDragOver,
  /* renderLabel */renderLabel,
  /* renderContent */renderContent
];

var component = ReasonReact.reducerComponent("FloatInput");

function reducer(param, canBeZero, action, state) {
  var onChangeFunc = param[0];
  if (typeof action === "number") {
    if (action !== 0) {
      return handleBlurAction(state, /* tuple */[
                  onChangeFunc,
                  param[1]
                ], canBeZero);
    } else {
      return /* Update */Block.__(0, [/* record */[
                  /* inputValue */state[/* inputValue */0],
                  /* originValue */state[/* originValue */1],
                  /* isDragStart */true,
                  /* canBeZero */state[/* canBeZero */3]
                ]]);
    }
  } else {
    return handleChangeAction(state, onChangeFunc, canBeZero, action[0]);
  }
}

function render(label, _, param) {
  var send = param[/* send */3];
  var state = param[/* state */1];
  return React.createElement("article", {
              className: "inspector-item wonder-float-input"
            }, renderLabel(/* tuple */[
                  send,
                  state
                ], label), renderContent(/* tuple */[
                  send,
                  state
                ]));
}

function make($staropt$star, defaultValue, label, onChange, onBlur, _) {
  var canBeZero = $staropt$star !== undefined ? $staropt$star : true;
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
                        /* originValue */value,
                        /* isDragStart */false,
                        /* canBeZero */canBeZero
                      ];
              } else {
                return /* record */[
                        /* inputValue */"0",
                        /* originValue */"0",
                        /* isDragStart */false,
                        /* canBeZero */canBeZero
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
