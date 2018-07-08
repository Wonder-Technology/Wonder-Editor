

import * as Block from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as AssetUtils$WonderEditor from "../../../../asset/utils/AssetUtils.js";
import * as FileNameUtils$WonderEditor from "../../../../../../../utils/file/FileNameUtils.js";
import * as AssetNodeUtils$WonderEditor from "../../../../asset/utils/AssetNodeUtils.js";
import * as ReasonReactUtils$WonderEditor from "../../../../../../../utils/ui/ReasonReactUtils.js";
import * as TextureInspector$WonderEditor from "../atom_component/texture_Inspector/ui/TextureInspector.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as AssetTreeInspectorUtils$WonderEditor from "../utils/AssetTreeInspectorUtils.js";
import * as AssetTreeRootAssetService$WonderEditor from "../../../../../../../../service/state/asset/AssetTreeRootAssetService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../service/state/engine/BasicSourceTextureEngineService.js";

function change($$event) {
  var inputVal = $$event.target.value;
  return /* Change */[inputVal];
}

function buildFolderComponent(state, send, currentNodeId) {
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

function buildJsonComponent(state, send, jsonResult) {
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
                }), React.createElement("p", undefined, DomHelper$WonderEditor.textEl(jsonResult)));
}

function showFolderInfo(param, currentNodeId, nodeType, param$1) {
  var send = param$1[/* send */3];
  var state = param$1[/* state */1];
  var dispatchFunc = param[1];
  var store = param[0];
  return AssetNodeUtils$WonderEditor.handleSpeficFuncByAssetNodeType(nodeType, /* tuple */[
              (function () {
                  return buildFolderComponent(state, send, currentNodeId);
                }),
              (function (jsonNodeMap) {
                  var match = SparseMapService$WonderCommonlib.unsafeGet(currentNodeId, jsonNodeMap);
                  return buildJsonComponent(state, send, match[/* jsonResult */1]);
                }),
              (function (textureNodeMap) {
                  var match = SparseMapService$WonderCommonlib.unsafeGet(currentNodeId, textureNodeMap);
                  var textureId = match[/* textureId */0];
                  return ReasonReact.element(/* None */0, /* None */0, TextureInspector$WonderEditor.make(store, dispatchFunc, state[/* inputValue */0], textureId, (function (param) {
                                    return AssetTreeInspectorUtils$WonderEditor.renameAssetTreeNode(dispatchFunc, textureId, nodeType, param);
                                  }), /* array */[]));
                })
            ]);
}

var Method = /* module */[
  /* change */change,
  /* buildFolderComponent */buildFolderComponent,
  /* buildJsonComponent */buildJsonComponent,
  /* showFolderInfo */showFolderInfo
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
            }, showFolderInfo(/* tuple */[
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
                          (function (folderNodeMap) {
                              var match = FileNameUtils$WonderEditor.getBaseNameAndExtName(SparseMapService$WonderCommonlib.unsafeGet(currentNodeId, folderNodeMap)[/* name */0]);
                              var fileName = match[0];
                              return /* record */[
                                      /* inputValue */fileName,
                                      /* originalName */fileName,
                                      /* postfix */match[1]
                                    ];
                            }),
                          (function (jsonNodeMap) {
                              var match = FileNameUtils$WonderEditor.getBaseNameAndExtName(SparseMapService$WonderCommonlib.unsafeGet(currentNodeId, jsonNodeMap)[/* name */0]);
                              var fileName = match[0];
                              return /* record */[
                                      /* inputValue */fileName,
                                      /* originalName */fileName,
                                      /* postfix */match[1]
                                    ];
                            }),
                          (function (textureNodeMap) {
                              var match = SparseMapService$WonderCommonlib.unsafeGet(currentNodeId, textureNodeMap);
                              var textureId = match[/* textureId */0];
                              var match$1 = FileNameUtils$WonderEditor.getBaseNameAndExtName(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                          return BasicSourceTextureEngineService$WonderEditor.unsafeGetBasicSourceTextureName(textureId, param);
                                        })));
                              var fileName = match$1[0];
                              return /* record */[
                                      /* inputValue */fileName,
                                      /* originalName */fileName,
                                      /* postfix */match$1[1]
                                    ];
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
