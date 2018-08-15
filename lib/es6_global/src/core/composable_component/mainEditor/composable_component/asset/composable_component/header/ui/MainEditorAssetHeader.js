

import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as AssetUtils$WonderEditor from "../../../utils/AssetUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetTreeRootEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetTreeRootEditorService.js";
import * as AssetHeaderFileLoadEventHandler$WonderEditor from "../eventHandler/AssetHeaderFileLoadEventHandler.js";
import * as AssetHeaderAddFolderEventHandler$WonderEditor from "../eventHandler/AssetHeaderAddFolderEventHandler.js";
import * as AssetCurrentNodeDataEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetCurrentNodeDataEditorService.js";
import * as AssetHeaderRemoveNodeEventHandler$WonderEditor from "../eventHandler/AssetHeaderRemoveNodeEventHandler.js";

function isCurrentNodeIdEqualRootId(editorState) {
  var match = AssetCurrentNodeDataEditorService$WonderEditor.getCurrentNodeData(editorState);
  if (match !== undefined) {
    return AssetUtils$WonderEditor.isIdEqual(match[/* currentNodeId */0], AssetTreeRootEditorService$WonderEditor.getRootTreeNodeId(editorState));
  } else {
    return true;
  }
}

var addFolder = AssetHeaderAddFolderEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var removeAssetNode = AssetHeaderRemoveNodeEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var fileLoad = AssetHeaderFileLoadEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var Method = /* module */[
  /* isCurrentNodeIdEqualRootId */isCurrentNodeIdEqualRootId,
  /* addFolder */addFolder,
  /* removeAssetNode */removeAssetNode,
  /* fileLoad */fileLoad
];

var component = ReasonReact.statelessComponent("MainEditorAssetHeader");

function render(param, _) {
  var dispatchFunc = param[1];
  var store = param[0];
  return React.createElement("article", {
              key: "assetHeader",
              className: "wonder-asset-header"
            }, React.createElement("div", {
                  className: "header-item"
                }, React.createElement("button", {
                      onClick: (function () {
                          return Curry._3(addFolder, /* tuple */[
                                      store,
                                      dispatchFunc
                                    ], /* () */0, /* () */0);
                        })
                    }, DomHelper$WonderEditor.textEl("addFolder"))), React.createElement("div", {
                  className: "header-item"
                }, React.createElement("button", {
                      disabled: StateLogicService$WonderEditor.getEditorState(isCurrentNodeIdEqualRootId),
                      onClick: (function () {
                          return Curry._3(removeAssetNode, /* tuple */[
                                      store,
                                      dispatchFunc
                                    ], /* () */0, /* () */0);
                        })
                    }, DomHelper$WonderEditor.textEl("remove"))), React.createElement("div", {
                  className: "header-item"
                }, React.createElement("input", {
                      className: "file-upload",
                      multiple: true,
                      type: "file",
                      onChange: (function (e) {
                          return Curry._3(fileLoad, /* tuple */[
                                      store,
                                      dispatchFunc
                                    ], /* () */0, e);
                        })
                    })));
}

function make(store, dispatchFunc, _) {
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
                        ], self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  Method ,
  component ,
  render ,
  make ,
  
}
/* component Not a pure module */
