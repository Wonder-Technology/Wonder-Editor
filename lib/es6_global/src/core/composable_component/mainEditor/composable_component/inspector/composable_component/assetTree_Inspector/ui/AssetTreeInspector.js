

import * as Block from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as AssetUtils$WonderEditor from "../../../../asset/utils/AssetUtils.js";
import * as AssetNodeUtils$WonderEditor from "../../../../asset/utils/AssetNodeUtils.js";
import * as ReasonReactUtils$WonderEditor from "../../../../../../../utils/ui/ReasonReactUtils.js";
import * as TextureInspector$WonderEditor from "../atom_component/texture_Inspector/ui/TextureInspector.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as AssetTreeInspectorUtils$WonderEditor from "../utils/AssetTreeInspectorUtils.js";
import * as JsonNodeMapAssetService$WonderEditor from "../../../../../../../../service/state/asset/JsonNodeMapAssetService.js";
import * as AssetTreeRootAssetService$WonderEditor from "../../../../../../../../service/state/asset/AssetTreeRootAssetService.js";
import * as FolderNodeMapAssetService$WonderEditor from "../../../../../../../../service/state/asset/FolderNodeMapAssetService.js";
import * as OperateTextureLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/OperateTextureLogicService.js";

function change($$event) {
  var inputVal = $$event.target.value;
  return /* Change */[inputVal];
}

function buildFolderComponent(state, send, currentNodeId, _) {
  return React.createElement("div", {
              className: ""
            }, React.createElement("h1", undefined, DomHelper$WonderEditor.textEl("Folder")), React.createElement("hr", undefined), React.createElement("span", {
                  className: ""
                }, DomHelper$WonderEditor.textEl("name:")), React.createElement("input", {
                  className: "input-component float-input",
                  disabled: AssetUtils$WonderEditor.isIdEqual(StateLogicService$WonderEditor.getAssetState(AssetTreeRootAssetService$WonderEditor.getRootTreeNodeId), currentNodeId),
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

function buildJsonComponent(state, send, currentNodeId, jsonNodeMap) {
  var match = SparseMapService$WonderCommonlib.unsafeGet(currentNodeId, jsonNodeMap);
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
                }), React.createElement("p", undefined, DomHelper$WonderEditor.textEl(match[/* jsonResult */1])));
}

function buildTextureComponent(param, param$1, state, textureNodeMap) {
  var nodeType = param$1[1];
  var dispatchFunc = param[1];
  var match = SparseMapService$WonderCommonlib.unsafeGet(param$1[0], textureNodeMap);
  var textureIndex = match[/* textureIndex */0];
  return ReasonReact.element(/* None */0, /* None */0, TextureInspector$WonderEditor.make(param[0], dispatchFunc, state[/* inputValue */0], textureIndex, (function (param) {
                    return AssetTreeInspectorUtils$WonderEditor.renameAssetTreeNode(dispatchFunc, textureIndex, nodeType, param);
                  }), /* array */[]));
}

function showAssetNodeComponent(reduxTuple, currentNodeId, nodeType, param) {
  var send = param[/* send */3];
  var state = param[/* state */1];
  var partial_arg = /* tuple */[
    currentNodeId,
    nodeType
  ];
  return AssetNodeUtils$WonderEditor.handleSpeficFuncByAssetNodeType(nodeType, /* tuple */[
              (function (param) {
                  return buildFolderComponent(state, send, currentNodeId, param);
                }),
              (function (param) {
                  return buildJsonComponent(state, send, currentNodeId, param);
                }),
              (function (param) {
                  return buildTextureComponent(reduxTuple, partial_arg, state, param);
                })
            ]);
}

function initFolderName(currentNodeId, folderNodeMap) {
  var match = FolderNodeMapAssetService$WonderEditor.getFolderBaseNameAndExtName(currentNodeId, folderNodeMap);
  var fileName = match[0];
  return /* record */[
          /* inputValue */fileName,
          /* originalName */fileName,
          /* postfix */match[1]
        ];
}

function initJsonName(currentNodeId, jsonNodeMap) {
  var match = JsonNodeMapAssetService$WonderEditor.getJsonBaseNameAndExtName(currentNodeId, jsonNodeMap);
  var fileName = match[0];
  return /* record */[
          /* inputValue */fileName,
          /* originalName */fileName,
          /* postfix */match[1]
        ];
}

function initTextureName(currentNodeId, textureNodeMap) {
  var match = OperateTextureLogicService$WonderEditor.getTextureBaseNameAndExtName(currentNodeId, textureNodeMap);
  var fileName = match[0];
  return /* record */[
          /* inputValue */fileName,
          /* originalName */fileName,
          /* postfix */match[1]
        ];
}

var Method = /* module */[
  /* change */change,
  /* buildFolderComponent */buildFolderComponent,
  /* buildJsonComponent */buildJsonComponent,
  /* buildTextureComponent */buildTextureComponent,
  /* showAssetNodeComponent */showAssetNodeComponent,
  /* initFolderName */initFolderName,
  /* initJsonName */initJsonName,
  /* initTextureName */initTextureName
];

var component = ReasonReact.reducerComponent("AssetTreeInspector");

function reducer(dispatchFunc, currentNodeId, nodeType, action) {
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
                        return AssetTreeInspectorUtils$WonderEditor.renameAssetTreeNode(dispatchFunc, currentNodeId, nodeType, value + state[/* postfix */2]);
                      }));
        }
      });
  }
}

function render(param, currentNodeId, nodeType, self) {
  return React.createElement("article", {
              key: "AssetTreeInspector",
              className: "wonder-inspector-assetTree"
            }, showAssetNodeComponent(/* tuple */[
                  param[0],
                  param[1]
                ], currentNodeId, nodeType, self));
}

function make(store, dispatchFunc, currentNodeId, nodeType, _) {
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
                        ], currentNodeId, nodeType, self);
            }),
          /* initialState */(function () {
              return AssetNodeUtils$WonderEditor.handleSpeficFuncByAssetNodeType(nodeType, /* tuple */[
                          (function (param) {
                              return initFolderName(currentNodeId, param);
                            }),
                          (function (param) {
                              return initJsonName(currentNodeId, param);
                            }),
                          (function (param) {
                              return initTextureName(currentNodeId, param);
                            })
                        ]);
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param) {
              return reducer(dispatchFunc, currentNodeId, nodeType, param);
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
