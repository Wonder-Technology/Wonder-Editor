'use strict';

import * as Block                                from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry                                from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                                from "react";
import * as ReasonReact                          from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as AppStore$WonderEditor                from "../../../../../../../ui/store/AppStore.js";
import * as DomHelper$WonderEditor               from "../../../../../../../external/DomHelper.js";
import * as SparseMapService$WonderEditor        from "../../../../../../../../service/atom/SparseMapService.js";
import * as StateLogicService$WonderEditor       from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetEditorService$WonderEditor      from "../../../../../../../../service/state/editor/AssetEditorService.js";
import * as StateEditorService$WonderEditor      from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as AssetFileInspectorUtils$WonderEditor from "../../../utils/AssetFileInspectorUtils.js";

function setInputFiledRef(value, param) {
  param[/* state */4][/* inputField */0][0] = value === null ? /* None */0 : [value];
  return /* () */0;
}

function change($$event) {
  var inputVal = $$event.target.value;
  return /* Change */[inputVal];
}

function blur() {
  return /* Blur */0;
}

function triggerBlur(dispatch, value, fileId, fileResult) {
  var partial_arg = SparseMapService$WonderEditor.immutableSet(fileId, /* record */[
        /* name */value,
        /* type_ */fileResult[/* type_ */1],
        /* result */fileResult[/* result */2]
      ], AssetEditorService$WonderEditor.unsafeGetFileMap(StateEditorService$WonderEditor.getState(/* () */0)));
  StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
          return AssetEditorService$WonderEditor.setFileMap(partial_arg, param);
        }));
  return Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
}

function showFileInfo(fileResult, param) {
  var state = param[/* state */4];
  var reduce = param[/* reduce */3];
  var handle = param[/* handle */0];
  var match = fileResult[/* type_ */1];
  if (match !== 0) {
    return React.createElement("div", undefined, React.createElement("h1", undefined, DomHelper$WonderEditor.textEl("Json")), React.createElement("hr", undefined), React.createElement("span", {
                    className: ""
                  }, DomHelper$WonderEditor.textEl("name:")), React.createElement("input", {
                    ref: Curry._1(handle, setInputFiledRef),
                    className: "input-component float-input",
                    type: "text",
                    value: state[/* inputValue */1],
                    onBlur: Curry._1(reduce, blur),
                    onChange: Curry._1(reduce, change)
                  }), React.createElement("p", undefined, DomHelper$WonderEditor.textEl(fileResult[/* result */2])));
  } else {
    return React.createElement("div", {
                className: ""
              }, React.createElement("h1", undefined, DomHelper$WonderEditor.textEl("Image")), React.createElement("hr", undefined), React.createElement("span", {
                    className: ""
                  }, DomHelper$WonderEditor.textEl("name:")), React.createElement("input", {
                    ref: Curry._1(handle, setInputFiledRef),
                    className: "input-component float-input",
                    type: "text",
                    value: state[/* inputValue */1],
                    onBlur: Curry._1(reduce, blur),
                    onChange: Curry._1(reduce, change)
                  }));
  }
}

var Method = /* module */[
  /* change */change,
  /* blur */blur,
  /* triggerBlur */triggerBlur,
  /* showFileInfo */showFileInfo
];

var component = ReasonReact.reducerComponent("AssetFileInspector");

function reducer(dispatch, fileId, fileResult, action, state) {
  if (action) {
    return /* Update */Block.__(0, [/* record */[
                /* inputField */state[/* inputField */0],
                /* inputValue */action[0],
                /* primitiveName */state[/* primitiveName */2],
                /* postfix */state[/* postfix */3]
              ]]);
  } else {
    var value = state[/* inputValue */1];
    if (value === "") {
      return /* Update */Block.__(0, [/* record */[
                  /* inputField */state[/* inputField */0],
                  /* inputValue */state[/* primitiveName */2],
                  /* primitiveName */state[/* primitiveName */2],
                  /* postfix */state[/* postfix */3]
                ]]);
    } else {
      return /* UpdateWithSideEffects */Block.__(3, [
                /* record */[
                  /* inputField */state[/* inputField */0],
                  /* inputValue */state[/* inputValue */1],
                  /* primitiveName */value,
                  /* postfix */state[/* postfix */3]
                ],
                (function () {
                    return triggerBlur(dispatch, value + state[/* postfix */3], fileId, fileResult);
                  })
              ]);
    }
  }
}

function render(fileResult, self) {
  return React.createElement("article", {
              key: "AssetFileInspector",
              className: "inspector-component"
            }, showFileInfo(fileResult, self));
}

function make(_, dispatch, fileId, fileResult, _$1) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      return render(fileResult, self);
    });
  newrecord[/* initialState */10] = (function () {
      var match = AssetFileInspectorUtils$WonderEditor.handleFileName(fileResult[/* name */0]);
      var fileName = match[0];
      return /* record */[
              /* inputField */[/* None */0],
              /* inputValue */fileName,
              /* primitiveName */fileName,
              /* postfix */match[1]
            ];
    });
  newrecord[/* reducer */12] = (function (param, param$1) {
      return reducer(dispatch, fileId, fileResult, param, param$1);
    });
  return newrecord;
}

export {
  setInputFiledRef ,
  Method           ,
  component        ,
  reducer          ,
  render           ,
  make             ,
  
}
/* component Not a pure module */
