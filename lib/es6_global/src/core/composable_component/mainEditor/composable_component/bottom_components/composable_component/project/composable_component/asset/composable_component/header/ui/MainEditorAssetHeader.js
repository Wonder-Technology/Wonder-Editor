

import * as Block from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_option from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ReasonReact from "../../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Zip$WonderBsJszip from "../../../../../../../../../../../../../../../node_modules/wonder-bs-jszip/lib/es6_global/src/zip.js";
import * as DomUtils$WonderEditor from "../../../../../../../../../../../utils/ui/DomUtils.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../../../external/DomHelper.js";
import * as EventUtils$WonderEditor from "../../../../../../../../../../../utils/event/EventUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as TreeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/TreeAssetEditorService.js";
import * as TreeRootAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/TreeRootAssetEditorService.js";
import * as AssetHeaderFileLoadEventHandler$WonderEditor from "../eventHandler/AssetHeaderFileLoadEventHandler.js";
import * as AssetHeaderAddFolderEventHandler$WonderEditor from "../eventHandler/AssetHeaderAddFolderEventHandler.js";
import * as AssetHeaderRemoveNodeEventHandler$WonderEditor from "../eventHandler/AssetHeaderRemoveNodeEventHandler.js";
import * as CurrentNodeDataAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/CurrentNodeDataAssetEditorService.js";
import * as AssetHeaderAddMaterialEventHandler$WonderEditor from "../eventHandler/AssetHeaderAddMaterialEventHandler.js";

function isCurrentNodeIdEqualRootId(editorState) {
  var match = CurrentNodeDataAssetEditorService$WonderEditor.getCurrentNodeData(editorState);
  if (match !== undefined) {
    return TreeAssetEditorService$WonderEditor.isIdEqual(match[/* currentNodeId */0], TreeRootAssetEditorService$WonderEditor.getRootTreeNodeId(editorState));
  } else {
    return true;
  }
}

var addFolder = AssetHeaderAddFolderEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var removeAssetNode = AssetHeaderRemoveNodeEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var fileLoad = AssetHeaderFileLoadEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var addMaterial = AssetHeaderAddMaterialEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var Method = /* module */[
  /* isCurrentNodeIdEqualRootId */isCurrentNodeIdEqualRootId,
  /* addFolder */addFolder,
  /* removeAssetNode */removeAssetNode,
  /* fileLoad */fileLoad,
  /* addMaterial */addMaterial
];

var component = ReasonReact.reducerComponent("MainEditorAssetHeader");

function _renderSelectNav(store, dispatchFunc, param) {
  return React.createElement("div", {
              className: "item-content"
            }, React.createElement("div", {
                  className: "content-section",
                  onClick: (function (_e) {
                      return Curry._3(addFolder, /* tuple */[
                                  store,
                                  dispatchFunc
                                ], /* () */0, /* () */0);
                    })
                }, React.createElement("span", {
                      className: "section-header"
                    }, DomHelper$WonderEditor.textEl("Folder"))), React.createElement("div", {
                  className: "content-section",
                  onClick: (function (_e) {
                      return Curry._3(addMaterial, /* tuple */[
                                  store,
                                  dispatchFunc
                                ], /* () */0, /* () */0);
                    })
                }, React.createElement("div", {
                      className: "section-header"
                    }, DomHelper$WonderEditor.textEl("Material"))));
}

function _renderRemoveItem(store, dispatchFunc, param) {
  var match = StateLogicService$WonderEditor.getEditorState(isCurrentNodeIdEqualRootId);
  return React.createElement("div", {
              className: "asset-header-item",
              onClick: (function (_e) {
                  var match = StateLogicService$WonderEditor.getEditorState(isCurrentNodeIdEqualRootId);
                  if (match) {
                    return /* () */0;
                  } else {
                    return Curry._3(removeAssetNode, /* tuple */[
                                store,
                                dispatchFunc
                              ], /* () */0, /* () */0);
                  }
                })
            }, match ? React.createElement("div", {
                    className: "item-notBeClick"
                  }, React.createElement("img", {
                        src: "./public/img/notRemove.png"
                      })) : React.createElement("div", {
                    className: "item-canBeClick"
                  }, React.createElement("img", {
                        src: "./public/img/remove.png"
                      })));
}

function render(param, self) {
  var send = self[/* send */3];
  var dispatchFunc = param[1];
  var store = param[0];
  var match = self[/* state */1][/* isSelectNav */0];
  return React.createElement("article", {
              key: "assetHeader",
              className: "wonder-asset-header"
            }, React.createElement("div", {
                  className: "asset-header-item",
                  onClick: (function (_e) {
                      return Curry._1(send, /* ToggleShowNav */0);
                    })
                }, React.createElement("div", {
                      className: "item-canBeClick"
                    }, React.createElement("img", {
                          src: "./public/img/add.png"
                        })), match ? _renderSelectNav(store, dispatchFunc, self) : null), _renderRemoveItem(store, dispatchFunc, self), React.createElement("div", {
                  className: "asset-header-item"
                }, React.createElement("div", {
                      className: "item-canBeClick"
                    }, React.createElement("img", {
                          src: "./public/img/load.png"
                        }), React.createElement("input", {
                          className: "asset-fileLoad",
                          multiple: false,
                          type: "file",
                          onChange: (function (e) {
                              Curry._3(fileLoad, /* tuple */[
                                    store,
                                    dispatchFunc
                                  ], Zip$WonderBsJszip.create, e);
                              return /* () */0;
                            })
                        }))));
}

function reducer(action, state) {
  if (typeof action === "number") {
    if (action !== 0) {
      return /* Update */Block.__(0, [/* record */[
                  /* isSelectNav */false,
                  /* streamSubscription */state[/* streamSubscription */1]
                ]]);
    } else {
      var match = state[/* isSelectNav */0];
      if (match) {
        return /* Update */Block.__(0, [/* record */[
                    /* isSelectNav */false,
                    /* streamSubscription */state[/* streamSubscription */1]
                  ]]);
      } else {
        return /* Update */Block.__(0, [/* record */[
                    /* isSelectNav */true,
                    /* streamSubscription */state[/* streamSubscription */1]
                  ]]);
      }
    }
  } else {
    return /* Update */Block.__(0, [/* record */[
                /* isSelectNav */state[/* isSelectNav */0],
                /* streamSubscription */Caml_option.some(action[0])
              ]]);
  }
}

function make(store, dispatchFunc, _children) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */(function (param) {
              var send = param[/* send */3];
              return EventUtils$WonderEditor.bindEventInDidMount((function (e) {
                            var target = e.target;
                            var targetArray = document.getElementsByClassName("asset-header-item");
                            var match = DomUtils$WonderEditor.isSpecificDomChildrenHasTargetDom(target, targetArray);
                            if (match) {
                              return /* () */0;
                            } else {
                              return Curry._1(send, /* BlurNav */1);
                            }
                          }), (function (subscription) {
                            return Curry._1(send, /* SetSubscription */[subscription]);
                          }));
            }),
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */(function (param) {
              return EventUtils$WonderEditor.unmountStreamSubscription(param[/* state */1][/* streamSubscription */1]);
            }),
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(/* tuple */[
                          store,
                          dispatchFunc
                        ], self);
            }),
          /* initialState */(function (param) {
              return /* record */[
                      /* isSelectNav */false,
                      /* streamSubscription */undefined
                    ];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */reducer,
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  Method ,
  component ,
  _renderSelectNav ,
  _renderRemoveItem ,
  render ,
  reducer ,
  make ,
  
}
/* component Not a pure module */
