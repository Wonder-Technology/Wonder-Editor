

import * as Block from "../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";
import * as SelectTree$WonderEditor from "../selectTree/SelectTree.js";
import * as SelectTreeUtils$WonderEditor from "../selectTree/utils/SelectTreeUtils.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetBundleNodeAssetService$WonderEditor from "../../../service/record/editor/asset/AssetBundleNodeAssetService.js";

function changeName($$event) {
  var inputVal = $$event.target.value;
  return /* ChangeName */Block.__(0, [inputVal]);
}

function changeUseWorker($$event) {
  var checked = $$event.target.checked;
  return /* ChangeUseWorker */Block.__(1, [checked]);
}

function changeUseAssetBundle($$event) {
  var checked = $$event.target.checked;
  return /* ChangeUseAssetBundle */Block.__(2, [checked]);
}

function _convertAssetPathToAssetBundlePath(assetNodeData, assetPath) {
  return (assetPath + ("/" + (AssetBundleNodeAssetService$WonderEditor.getNodeName(assetNodeData) + ("." + AssetBundleNodeAssetService$WonderEditor.getTypeStr(assetNodeData).toLowerCase())))).replace("Assets/", "AssetBundles/");
}

function buildSelectTreeForAssetBundle(param) {
  return SelectTreeUtils$WonderEditor.buildSelectTreeForAssetBundle(_convertAssetPathToAssetBundlePath, /* tuple */[
              param[0],
              param[1]
            ]);
}

function _toggleSelect(tree, send, isSelect, node) {
  var tree$1 = SelectTreeUtils$WonderEditor.setSelectForSelectTree(tree, isSelect, node);
  return Curry._1(send, /* UpdateSelectTreeForAssetBundle */Block.__(3, [tree$1]));
}

function _renderConfig(state, send) {
  return React.createElement(React.Fragment, undefined, React.createElement("div", {
                  className: "content-field"
                }, React.createElement("div", {
                      className: "field-title"
                    }, DomHelper$WonderEditor.textEl("useWorker")), React.createElement("div", {
                      className: "field-content"
                    }, React.createElement("input", {
                          defaultChecked: state[/* useWorker */1],
                          type: "checkbox",
                          onClick: (function (e) {
                              return Curry._1(send, changeUseWorker(e));
                            })
                        }))), React.createElement("div", {
                  className: "content-field"
                }, React.createElement("div", {
                      className: "field-title"
                    }, DomHelper$WonderEditor.textEl("useAssetBundle")), React.createElement("div", {
                      className: "field-content"
                    }, React.createElement("input", {
                          defaultChecked: state[/* useAssetBundle */2],
                          type: "checkbox",
                          onClick: (function (e) {
                              return Curry._1(send, changeUseAssetBundle(e));
                            })
                        }))));
}

function renderContent(state, send) {
  var match = state[/* useAssetBundle */2];
  var tmp;
  if (match) {
    var partial_arg = state[/* selectTreeForAssetBundle */3];
    tmp = ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, SelectTree$WonderEditor.make(state[/* selectTreeForAssetBundle */3], (function (type_, value, editorState) {
                if (type_ === "assetBundle") {
                  return "./public/img/assetBundle.png";
                }
                
              }), (function (param, param$1) {
                return _toggleSelect(partial_arg, send, param, param$1);
              }), /* array */[]));
  } else {
    tmp = null;
  }
  return React.createElement("div", {
              className: "modal-item-content"
            }, React.createElement("div", {
                  className: "content-field"
                }, React.createElement("div", {
                      className: "field-title"
                    }, DomHelper$WonderEditor.textEl("name")), React.createElement("div", {
                      className: "field-content"
                    }, React.createElement("input", {
                          className: "input-component",
                          type: "text",
                          value: state[/* name */0],
                          onChange: (function (_e) {
                              return Curry._1(send, changeName(_e));
                            })
                        }))), _renderConfig(state, send), tmp);
}

var Method = /* module */[
  /* changeName */changeName,
  /* changeUseWorker */changeUseWorker,
  /* changeUseAssetBundle */changeUseAssetBundle,
  /* _convertAssetPathToAssetBundlePath */_convertAssetPathToAssetBundlePath,
  /* buildSelectTreeForAssetBundle */buildSelectTreeForAssetBundle,
  /* _toggleSelect */_toggleSelect,
  /* _renderConfig */_renderConfig,
  /* renderContent */renderContent
];

var component = ReasonReact.reducerComponent("PublishLocalModal");

function reducer(action, state) {
  switch (action.tag | 0) {
    case 0 : 
        return /* Update */Block.__(0, [/* record */[
                    /* name */action[0],
                    /* useWorker */state[/* useWorker */1],
                    /* useAssetBundle */state[/* useAssetBundle */2],
                    /* selectTreeForAssetBundle */state[/* selectTreeForAssetBundle */3]
                  ]]);
    case 1 : 
        return /* Update */Block.__(0, [/* record */[
                    /* name */state[/* name */0],
                    /* useWorker */action[0],
                    /* useAssetBundle */state[/* useAssetBundle */2],
                    /* selectTreeForAssetBundle */state[/* selectTreeForAssetBundle */3]
                  ]]);
    case 2 : 
        return /* Update */Block.__(0, [/* record */[
                    /* name */state[/* name */0],
                    /* useWorker */state[/* useWorker */1],
                    /* useAssetBundle */action[0],
                    /* selectTreeForAssetBundle */state[/* selectTreeForAssetBundle */3]
                  ]]);
    case 3 : 
        return /* Update */Block.__(0, [/* record */[
                    /* name */state[/* name */0],
                    /* useWorker */state[/* useWorker */1],
                    /* useAssetBundle */state[/* useAssetBundle */2],
                    /* selectTreeForAssetBundle */action[0]
                  ]]);
    
  }
}

function render(title, param, param$1) {
  var state = param$1[/* state */1];
  var submitFunc = param[1];
  var closeFunc = param[0];
  return React.createElement("article", {
              className: "wonder-singleInput-modal"
            }, React.createElement("div", {
                  className: "modal-item"
                }, React.createElement("div", {
                      className: "modal-item-header"
                    }, DomHelper$WonderEditor.textEl(title), React.createElement("img", {
                          src: "./public/img/close.png",
                          onClick: (function (_e) {
                              return Curry._1(closeFunc, /* () */0);
                            })
                        })), renderContent(state, param$1[/* send */3]), React.createElement("div", {
                      className: "modal-item-footer"
                    }, React.createElement("button", {
                          className: "footer-submit",
                          onClick: (function (_e) {
                              return Curry._3(submitFunc, state[/* name */0], state[/* useWorker */1], /* tuple */[
                                          state[/* useAssetBundle */2],
                                          state[/* selectTreeForAssetBundle */3]
                                        ]);
                            })
                        }, DomHelper$WonderEditor.textEl("Submit")))));
}

function make(closeFunc, title, submitFunc, $staropt$star, $staropt$star$1, $staropt$star$2, _children) {
  var defaultName = $staropt$star !== undefined ? $staropt$star : "";
  var defaultUseWorker = $staropt$star$1 !== undefined ? $staropt$star$1 : false;
  var defaultUseAssetBundle = $staropt$star$2 !== undefined ? $staropt$star$2 : false;
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
          /* render */(function (_self) {
              return render(title, /* tuple */[
                          closeFunc,
                          submitFunc
                        ], _self);
            }),
          /* initialState */(function (param) {
              return /* record */[
                      /* name */defaultName,
                      /* useWorker */defaultUseWorker,
                      /* useAssetBundle */defaultUseAssetBundle,
                      /* selectTreeForAssetBundle */StateLogicService$WonderEditor.getStateToGetData(buildSelectTreeForAssetBundle)
                    ];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */reducer,
          /* jsElementWrapped */component[/* jsElementWrapped */13]
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
