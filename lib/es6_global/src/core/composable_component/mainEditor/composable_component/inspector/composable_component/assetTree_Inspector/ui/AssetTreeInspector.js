

import * as Block from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_format from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_format.js";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Log$WonderLog from "../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as AssetUtils$WonderEditor from "../../../../asset/utils/AssetUtils.js";
import * as FileNameUtils$WonderEditor from "../../../../../../../utils/file/FileNameUtils.js";
import * as OptionService$WonderEditor from "../../../../../../../../service/primitive/OptionService.js";
import * as ReasonReactUtils$WonderEditor from "../../../../../../../utils/ui/ReasonReactUtils.js";
import * as TextureInspector$WonderEditor from "../atom_component/texture_Inspector/ui/TextureInspector.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetTreeInspectorUtils$WonderEditor from "../utils/AssetTreeInspectorUtils.js";
import * as AssetTreeRootEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetTreeRootEditorService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../service/state/engine/BasicSourceTextureEngineService.js";

function change($$event) {
  var inputVal = $$event.target.value;
  return /* Change */[inputVal];
}

function buildFolderComponent(state, send, nodeId) {
  return React.createElement("div", {
              className: ""
            }, React.createElement("h1", undefined, DomHelper$WonderEditor.textEl("Folder")), React.createElement("hr", undefined), React.createElement("span", {
                  className: ""
                }, DomHelper$WonderEditor.textEl("name:")), React.createElement("input", {
                  className: "input-component float-input",
                  disabled: AssetUtils$WonderEditor.isIdEqual(StateLogicService$WonderEditor.getEditorState(AssetTreeRootEditorService$WonderEditor.getRootTreeNodeId), nodeId),
                  type: "text",
                  value: state[/* inputValue */0],
                  onBlur: (function () {
                      return Curry._1(send, /* Blur */0);
                    }),
                  onChange: (function (_e) {
                      return Curry._1(send, change(_e));
                    })
                }));
}

function buildJsonComponent(state, send, nodeResult) {
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

function showFolderInfo(param, nodeResult, nodeId, param$1) {
  var send = param$1[/* send */3];
  var state = param$1[/* state */1];
  var match = nodeResult[/* type_ */1];
  switch (match) {
    case 0 : 
        return buildFolderComponent(state, send, nodeId);
    case 1 : 
        var partial_arg = "the type:" + (String(nodeResult) + " not exist");
        return Log$WonderLog.fatal((function (param, param$1, param$2) {
                      return Log$WonderLog.buildFatalMessage("showFolderInfo", partial_arg, param, param$1, param$2);
                    }));
    case 2 : 
        return buildJsonComponent(state, send, nodeResult);
    case 3 : 
        var textureId = Caml_format.caml_int_of_string(OptionService$WonderEditor.unsafeGet(nodeResult[/* result */2]));
        return ReasonReact.element(/* None */0, /* None */0, TextureInspector$WonderEditor.make(param[0], param[1], StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                              return BasicSourceTextureEngineService$WonderEditor.unsafeGetBasicSourceTextureName(textureId, param);
                            })), nodeId, textureId, /* array */[]));
    
  }
}

var Method = /* module */[
  /* change */change,
  /* buildFolderComponent */buildFolderComponent,
  /* buildJsonComponent */buildJsonComponent,
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
                        var partial_arg = value + state[/* postfix */2];
                        return StateLogicService$WonderEditor.getEditorState((function (param) {
                                      return AssetTreeInspectorUtils$WonderEditor.renameAssetTreeNode(dispatchFunc, partial_arg, nodeId, param);
                                    }));
                      }));
        }
      });
  }
}

function render(param, nodeResult, nodeId, self) {
  return React.createElement("article", {
              key: "AssetTreeInspector",
              className: "wonder-inspector-assetTree"
            }, showFolderInfo(/* tuple */[
                  param[0],
                  param[1]
                ], nodeResult, nodeId, self));
}

function make(store, dispatchFunc, nodeId, nodeResult, _) {
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
              return render(/* tuple */[
                          store,
                          dispatchFunc
                        ], nodeResult, nodeId, self);
            }),
          /* initialState */(function () {
              var match = FileNameUtils$WonderEditor.handleFileName(nodeResult[/* name */0]);
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
