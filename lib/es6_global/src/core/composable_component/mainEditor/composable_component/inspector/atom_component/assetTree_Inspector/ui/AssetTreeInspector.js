

import * as Block from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as AppStore$WonderEditor from "../../../../../../../ui/store/AppStore.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as AssetUtils$WonderEditor from "../../../../asset/utils/AssetUtils.js";
import * as OptionService$WonderEditor from "../../../../../../../../service/primitive/OptionService.js";
import * as ReasonReactUtils$WonderEditor from "../../../../../../../utils/ui/ReasonReactUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetTreeNodeUtils$WonderEditor from "../../../../asset/utils/AssetTreeNodeUtils.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as AssetFileInspectorUtils$WonderEditor from "../../../utils/AssetFileInspectorUtils.js";
import * as AssetNodeMapEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetNodeMapEditorService.js";
import * as AssetTreeRootEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetTreeRootEditorService.js";

function change($$event) {
  var inputVal = $$event.target.value;
  return /* Change */[inputVal];
}

function blur() {
  return /* Blur */0;
}

function triggerBlur(dispatchFunc, value, nodeId) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var __x = AssetTreeNodeUtils$WonderEditor.renameNodeResult(value, SparseMapService$WonderCommonlib.unsafeGet(nodeId, AssetNodeMapEditorService$WonderEditor.unsafeGetNodeMap(editorState)));
  StateEditorService$WonderEditor.setState(AssetNodeMapEditorService$WonderEditor.setResult(nodeId, __x, editorState));
  return Curry._1(dispatchFunc, AppStore$WonderEditor.ReLoad);
}

function showFolderInfo(nodeResult, nodeId, param) {
  var send = param[/* send */3];
  var state = param[/* state */1];
  var match = nodeResult[/* type_ */1];
  switch (match) {
    case 0 : 
        var match$1 = AssetUtils$WonderEditor.isIdEqual(StateLogicService$WonderEditor.getEditorState(AssetTreeRootEditorService$WonderEditor.getRootTreeNodeId), nodeId);
        return React.createElement("div", {
                    className: ""
                  }, React.createElement("h1", undefined, DomHelper$WonderEditor.textEl("Folder")), React.createElement("hr", undefined), React.createElement("span", {
                        className: ""
                      }, DomHelper$WonderEditor.textEl("name:")), React.createElement("input", {
                        className: "input-component float-input",
                        disabled: match$1 ? true : false,
                        type: "text",
                        value: state[/* inputValue */0],
                        onBlur: (function () {
                            return Curry._1(send, /* Blur */0);
                          }),
                        onChange: (function (_e) {
                            return Curry._1(send, change(_e));
                          })
                      }));
    case 1 : 
        return React.createElement("div", {
                    className: ""
                  }, React.createElement("h1", undefined, DomHelper$WonderEditor.textEl("Image")), React.createElement("hr", undefined), React.createElement("span", {
                        className: ""
                      }, DomHelper$WonderEditor.textEl("name:")), React.createElement("input", {
                        className: "input-component float-input",
                        type: "text",
                        value: state[/* inputValue */0],
                        onBlur: (function () {
                            return Curry._1(send, /* Blur */0);
                          }),
                        onChange: (function (_e) {
                            return Curry._1(send, change(_e));
                          })
                      }));
    case 2 : 
        return React.createElement("div", undefined, React.createElement("h1", undefined, DomHelper$WonderEditor.textEl("Json")), React.createElement("hr", undefined), React.createElement("span", {
                        className: ""
                      }, DomHelper$WonderEditor.textEl("name:")), React.createElement("input", {
                        className: "input-component float-input",
                        type: "text",
                        value: state[/* inputValue */0],
                        onBlur: (function () {
                            return Curry._1(send, /* Blur */0);
                          }),
                        onChange: (function (_e) {
                            return Curry._1(send, change(_e));
                          })
                      }), React.createElement("p", undefined, DomHelper$WonderEditor.textEl(OptionService$WonderEditor.unsafeGet(nodeResult[/* result */2]))));
    
  }
}

var Method = /* module */[
  /* change */change,
  /* blur */blur,
  /* triggerBlur */triggerBlur,
  /* showFolderInfo */showFolderInfo
];

var component = ReasonReact.reducerComponent("AssetTreeInspector");

function reducer(dispatchFunc, nodeId, action) {
  if (action) {
    var value = action[0];
    return (function (state) {
        return /* Update */Block.__(0, [/* record */[
                    /* inputValue */value,
                    /* originalName */state[/* originalName */1],
                    /* postfix */state[/* postfix */2]
                  ]]);
      });
  } else {
    return (function (state) {
        var value = state[/* inputValue */0];
        if (value === "") {
          return /* Update */Block.__(0, [/* record */[
                      /* inputValue */state[/* originalName */1],
                      /* originalName */state[/* originalName */1],
                      /* postfix */state[/* postfix */2]
                    ]]);
        } else {
          return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                      /* inputValue */state[/* inputValue */0],
                      /* originalName */value,
                      /* postfix */state[/* postfix */2]
                    ], (function () {
                        return triggerBlur(dispatchFunc, value + state[/* postfix */2], nodeId);
                      }));
        }
      });
  }
}

function render(nodeResult, nodeId, self) {
  return React.createElement("article", {
              key: "AssetTreeInspector",
              className: "wonder-inspector-assetTree"
            }, showFolderInfo(nodeResult, nodeId, self));
}

function make(_, dispatchFunc, nodeId, nodeResult, _$1) {
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
              return render(nodeResult, nodeId, self);
            }),
          /* initialState */(function () {
              var match = AssetFileInspectorUtils$WonderEditor.handleFileName(nodeResult[/* name */0]);
              var fileName = match[0];
              return /* record */[
                      /* inputValue */fileName,
                      /* originalName */fileName,
                      /* postfix */match[1]
                    ];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param) {
              return reducer(dispatchFunc, nodeId, param);
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
