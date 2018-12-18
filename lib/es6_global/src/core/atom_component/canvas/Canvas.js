

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";
import * as DragUtils$WonderEditor from "../dragTree/utils/DragUtils.js";
import * as DragEventUtils$WonderEditor from "../../utils/event/DragEventUtils.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as WDBNodeMapAssetEditorService$WonderEditor from "../../../service/state/editor/asset/WDBNodeMapAssetEditorService.js";

function handleDragEnter(isWDBAssetFileFunc, _event) {
  return /* () */0;
}

function handleDragLeave($$event) {
  return /* () */0;
}

function handleDrop(param, $$event) {
  var startId = DragUtils$WonderEditor.getDragedId($$event);
  DomHelper$WonderEditor.preventDefault($$event);
  var match = Curry._1(param[0], /* () */0);
  if (match) {
    return Curry._1(param[1], SparseMapService$WonderCommonlib.unsafeGet(startId, WDBNodeMapAssetEditorService$WonderEditor.getWDBNodeMap(StateEditorService$WonderEditor.getState(/* () */0)))[/* wdbGameObject */2]);
  } else {
    return /* () */0;
  }
}

var Method = /* module */[
  /* handleDragEnter */handleDragEnter,
  /* handleDragLeave */handleDragLeave,
  /* handleDrop */handleDrop
];

var component = ReasonReact.statelessComponent("Canvas");

function render(domId, param, param$1) {
  var send = param$1[/* send */3];
  var dragWDBFunc = param[1];
  var isWDBAssetFileFunc = param[0];
  return React.createElement("canvas", {
              id: domId,
              onDragEnter: (function (_e) {
                  return Curry._1(send, /* () */0);
                }),
              onDragLeave: (function (_e) {
                  return Curry._1(send, /* () */0);
                }),
              onDragOver: (function (e) {
                  return DragEventUtils$WonderEditor.handleDragOver("copy", e);
                }),
              onDrop: (function (_e) {
                  return Curry._1(send, handleDrop(/* tuple */[
                                  isWDBAssetFileFunc,
                                  dragWDBFunc
                                ], _e));
                })
            });
}

function make(domId, dragWDB, isWDBAssetFile, _children) {
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
              return render(domId, /* tuple */[
                          isWDBAssetFile,
                          dragWDB
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
