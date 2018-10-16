

import * as Block from "../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DragUtils$WonderEditor from "./utils/DragUtils.js";
import * as ReactUtils$WonderEditor from "../../utils/ui/ReactUtils.js";
import * as DragEventUtils$WonderEditor from "../../utils/event/DragEventUtils.js";
import * as ReasonReactUtils$WonderEditor from "../../utils/ui/ReasonReactUtils.js";
import * as DragEventBaseUtils$WonderEditor from "../../utils/event/DragEventBaseUtils.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as AssetWDBNodeMapEditorService$WonderEditor from "../../../service/state/editor/asset/AssetWDBNodeMapEditorService.js";

function handleDragEnter(id, param, _) {
  var match = DragEventBaseUtils$WonderEditor.isTriggerDragEnter(id, param[0], param[1]) || Curry._1(param[2], /* () */0);
  if (match) {
    return /* DragEnter */1;
  } else {
    return /* Nothing */0;
  }
}

function handleDragLeave(_, _$1, _$2) {
  return /* DragLeave */2;
}

function handleDrop(rootUid, param, $$event) {
  var startId = DragUtils$WonderEditor.getDragedUid($$event);
  var match = DragEventBaseUtils$WonderEditor.isTriggerDragDrop(rootUid, startId, param[0], param[1]);
  if (match) {
    return /* DragGameObject */Block.__(0, [
              rootUid,
              startId
            ]);
  } else {
    var match$1 = Curry._1(param[2], /* () */0);
    if (match$1) {
      var param$1 = SparseMapService$WonderCommonlib.unsafeGet(startId, AssetWDBNodeMapEditorService$WonderEditor.getWDBNodeMap(StateEditorService$WonderEditor.getState(/* () */0)));
      return /* DragWDB */Block.__(1, [param$1[/* wdbGameObject */4]]);
    } else {
      return /* DragLeave */2;
    }
  }
}

var Method = /* module */[
  /* handleDragEnter */handleDragEnter,
  /* handleDragLeave */handleDragLeave,
  /* handleDrop */handleDrop
];

var component = ReasonReact.reducerComponent("DragTree");

function reducer(dragGameObject, dragWDB, action, state) {
  if (typeof action === "number") {
    switch (action) {
      case 0 : 
          return /* NoUpdate */0;
      case 1 : 
          return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("backgroundColor", "#333333", state[/* style */0])]]);
      case 2 : 
          return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("backgroundColor", "#666666", state[/* style */0])]]);
      
    }
  } else if (action.tag) {
    var wdbGameObjectUid = action[0];
    return ReasonReactUtils$WonderEditor.sideEffects((function () {
                  return Curry._1(dragWDB, wdbGameObjectUid);
                }));
  } else {
    var removedId = action[1];
    var rootUid = action[0];
    return ReasonReactUtils$WonderEditor.sideEffects((function () {
                  return Curry._1(dragGameObject, /* tuple */[
                              rootUid,
                              removedId
                            ]);
                }));
  }
}

function render(treeArray, rootUid, param, param$1) {
  var send = param$1[/* send */3];
  var isAssetWDBFile = param[2];
  var handleRelationErrorFunc = param[1];
  var handleWidgeFunc = param[0];
  return React.createElement("article", {
              className: "wonder-drag-tree"
            }, treeArray, React.createElement("div", {
                  className: "wonder-disable-drag",
                  style: param$1[/* state */1][/* style */0],
                  onDragEnter: (function (_e) {
                      return Curry._1(send, handleDragEnter(rootUid, /* tuple */[
                                      handleWidgeFunc,
                                      handleRelationErrorFunc,
                                      isAssetWDBFile
                                    ], _e));
                    }),
                  onDragLeave: (function (_e) {
                      return Curry._1(send, handleDragLeave(rootUid, /* tuple */[
                                      handleWidgeFunc,
                                      handleRelationErrorFunc,
                                      isAssetWDBFile
                                    ], _e));
                    }),
                  onDragOver: DragEventUtils$WonderEditor.handleDragOver,
                  onDrop: (function (_e) {
                      return Curry._1(send, handleDrop(rootUid, /* tuple */[
                                      handleWidgeFunc,
                                      handleRelationErrorFunc,
                                      isAssetWDBFile
                                    ], _e));
                    })
                }));
}

function make(treeArray, rootUid, dragGameObject, dragWDB, isWidge, handleRelationError, isAssetWDBFile, _) {
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
              return render(treeArray, rootUid, /* tuple */[
                          isWidge,
                          handleRelationError,
                          isAssetWDBFile
                        ], self);
            }),
          /* initialState */(function () {
              return /* record */[/* style */{
                        backgroundColor: "#666666"
                      }];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param, param$1) {
              return reducer(dragGameObject, dragWDB, param, param$1);
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
