

import * as Block from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as ValueService$WonderEditor from "../../../../../../../../service/atom/ValueService.js";
import * as NodeAssetService$WonderEditor from "../../../../../../../../service/record/editor/asset/NodeAssetService.js";
import * as ReasonReactUtils$WonderEditor from "../../../../../../../utils/ui/ReasonReactUtils.js";
import * as TextureInspector$WonderEditor from "../atom_component/texture_Inspector/ui/TextureInspector.js";
import * as MaterialInspector$WonderEditor from "../atom_component/material_Inspector/ui/MaterialInspector.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../service/state/engine/StateEngineService.js";
import * as WDBNodeAssetService$WonderEditor from "../../../../../../../../service/record/editor/asset/WDBNodeAssetService.js";
import * as FolderNodeAssetService$WonderEditor from "../../../../../../../../service/record/editor/asset/FolderNodeAssetService.js";
import * as NodeNameAssetLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/asset/NodeNameAssetLogicService.js";
import * as RootTreeAssetEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/RootTreeAssetEditorService.js";
import * as AssetRenameNodeEventHandler$WonderEditor from "./eventHandler/AssetRenameNodeEventHandler.js";

function change($$event) {
  var inputVal = $$event.target.value;
  return /* Change */[inputVal];
}

var renameAssetTreeNode = AssetRenameNodeEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

function buildFolderComponent(state, send, currentNodeId, _, _$1) {
  return React.createElement("div", {
              className: "inspector-asset-folder"
            }, React.createElement("h1", undefined, DomHelper$WonderEditor.textEl("Folder")), React.createElement("hr", undefined), React.createElement("div", {
                  className: "inspector-item"
                }, React.createElement("div", {
                      className: "item-header"
                    }, React.createElement("span", undefined, DomHelper$WonderEditor.textEl("Name"))), React.createElement("div", {
                      className: "item-content"
                    }, React.createElement("input", {
                          className: "input-component float-input",
                          disabled: NodeAssetService$WonderEditor.isIdEqual(NodeAssetService$WonderEditor.getNodeId(StateLogicService$WonderEditor.getEditorState(RootTreeAssetEditorService$WonderEditor.getRootNode)), currentNodeId),
                          type: "text",
                          value: state[/* inputValue */0],
                          onBlur: (function () {
                              return Curry._1(send, /* Blur */0);
                            }),
                          onChange: (function (_e) {
                              return Curry._1(send, change(_e));
                            })
                        }))));
}

function buildTextureComponent(param, state, currentNodeId, param$1) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  return ReasonReact.element(undefined, undefined, TextureInspector$WonderEditor.make(uiState, dispatchFunc, state[/* inputValue */0], param$1[/* textureComponent */0], Curry._2(renameAssetTreeNode, /* tuple */[
                      uiState,
                      dispatchFunc
                    ], currentNodeId), /* array */[]));
}

function buildMaterialComponent(param, state, currentNodeId, param$1) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  return ReasonReact.element(undefined, undefined, MaterialInspector$WonderEditor.make(uiState, dispatchFunc, currentNodeId, state[/* inputValue */0], param$1[/* type_ */0], param$1[/* materialComponent */1], Curry._2(renameAssetTreeNode, /* tuple */[
                      uiState,
                      dispatchFunc
                    ], currentNodeId), /* array */[]));
}

function buildWDBComponent(state, send, _, _$1) {
  return React.createElement("div", {
              className: "inspector-asset-wdb"
            }, React.createElement("h1", undefined, DomHelper$WonderEditor.textEl("Model")), React.createElement("hr", undefined), React.createElement("div", {
                  className: "inspector-item"
                }, React.createElement("div", {
                      className: "item-header"
                    }, React.createElement("span", {
                          className: ""
                        }, DomHelper$WonderEditor.textEl("Name:"))), React.createElement("div", {
                      className: "item-content"
                    }, React.createElement("input", {
                          className: "input-component float-input",
                          type: "text",
                          value: state[/* inputValue */0],
                          onBlur: (function () {
                              return Curry._1(send, /* Blur */0);
                            }),
                          onChange: (function (_e) {
                              return Curry._1(send, change(_e));
                            })
                        }))));
}

function showAssetNodeComponent(reduxTuple, currentNode, param) {
  var send = param[/* send */3];
  var state = param[/* state */1];
  return NodeAssetService$WonderEditor.handleNode(currentNode, (function (param, param$1) {
                return buildTextureComponent(reduxTuple, state, param, param$1);
              }), (function (param, param$1) {
                return buildMaterialComponent(reduxTuple, state, param, param$1);
              }), (function (param, param$1) {
                return buildWDBComponent(state, send, param, param$1);
              }), (function (param, param$1, param$2) {
                return buildFolderComponent(state, send, param, param$1, param$2);
              }));
}

function initFolderName(_, currentNodeData, _$1) {
  var folderName = FolderNodeAssetService$WonderEditor.getNodeName(currentNodeData);
  return /* record */[
          /* inputValue */folderName,
          /* originalName */folderName
        ];
}

function initTextureName(engineState, _, param) {
  var baseName = NodeNameAssetLogicService$WonderEditor.getTextureNodeName(param[/* textureComponent */0], engineState);
  return /* record */[
          /* inputValue */baseName,
          /* originalName */baseName
        ];
}

function initMaterialName(engineState, _, param) {
  var baseName = NodeNameAssetLogicService$WonderEditor.getMaterialNodeName(param[/* materialComponent */1], param[/* type_ */0], engineState);
  return /* record */[
          /* inputValue */baseName,
          /* originalName */baseName
        ];
}

function initWDBName(currentNodeId, currentNodeData) {
  var baseName = NodeNameAssetLogicService$WonderEditor.getWDBNodeName(WDBNodeAssetService$WonderEditor.buildNodeByNodeData(currentNodeId, currentNodeData));
  return /* record */[
          /* inputValue */baseName,
          /* originalName */baseName
        ];
}

var Method = /* module */[
  /* change */change,
  /* renameAssetTreeNode */renameAssetTreeNode,
  /* buildFolderComponent */buildFolderComponent,
  /* buildTextureComponent */buildTextureComponent,
  /* buildMaterialComponent */buildMaterialComponent,
  /* buildWDBComponent */buildWDBComponent,
  /* showAssetNodeComponent */showAssetNodeComponent,
  /* initFolderName */initFolderName,
  /* initTextureName */initTextureName,
  /* initMaterialName */initMaterialName,
  /* initWDBName */initWDBName
];

var component = ReasonReact.reducerComponent("AssetTreeInspector");

function reducer(param, currentNode, action) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  if (action) {
    var value = action[0];
    return (function (state) {
        return /* Update */Block.__(0, [/* record */[
                    /* inputValue */value,
                    /* originalName */state[/* originalName */1]
                  ]]);
      });
  } else {
    return (function (state) {
        var value = state[/* inputValue */0];
        if (value === "") {
          return /* Update */Block.__(0, [/* record */[
                      /* inputValue */state[/* originalName */1],
                      /* originalName */state[/* originalName */1]
                    ]]);
        } else {
          var match = ValueService$WonderEditor.isValueEqual(/* String */0, state[/* originalName */1], state[/* inputValue */0]);
          if (match) {
            return /* NoUpdate */0;
          } else {
            return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                        /* inputValue */state[/* inputValue */0],
                        /* originalName */value
                      ], (function () {
                          return Curry._3(renameAssetTreeNode, /* tuple */[
                                      uiState,
                                      dispatchFunc
                                    ], NodeAssetService$WonderEditor.getNodeId(currentNode), value);
                        }));
          }
        }
      });
  }
}

function render(param, currentNode, self) {
  return React.createElement("article", {
              key: "AssetTreeInspector",
              className: "wonder-inspector-assetTree"
            }, showAssetNodeComponent(/* tuple */[
                  param[0],
                  param[1]
                ], currentNode, self));
}

function make(uiState, dispatchFunc, currentNode, _) {
  var partial_arg = /* tuple */[
    uiState,
    dispatchFunc
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
              return render(/* tuple */[
                          uiState,
                          dispatchFunc
                        ], currentNode, self);
            }),
          /* initialState */(function () {
              StateEditorService$WonderEditor.getState(/* () */0);
              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
              return NodeAssetService$WonderEditor.handleNode(currentNode, (function (param, param$1) {
                            return initTextureName(engineState, param, param$1);
                          }), (function (param, param$1) {
                            return initMaterialName(engineState, param, param$1);
                          }), initWDBName, initFolderName);
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param) {
              return reducer(partial_arg, currentNode, param);
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
