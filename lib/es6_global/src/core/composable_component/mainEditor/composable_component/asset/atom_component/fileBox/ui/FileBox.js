

import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as AppStore$WonderEditor from "../../../../../../../ui/store/AppStore.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as DragEventBaseUtils$WonderEditor from "../../../../../../../utils/DragEventBaseUtils.js";
import * as CurrentNodeEditorService$WonderEditor from "../../../../../../../../service/state/editor/CurrentNodeEditorService.js";
import * as AssetCurrentNodeIdEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetCurrentNodeIdEditorService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../../../service/state/editor/CurrentSelectSourceEditorService.js";

function onSelect(fileId, dispatchFunc, _) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
          return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* AssetTree */1, AssetCurrentNodeIdEditorService$WonderEditor.setCurrentNodeId(fileId, CurrentNodeEditorService$WonderEditor.clearCurrentNode(editorState)));
        }));
  Curry._1(dispatchFunc, AppStore$WonderEditor.ReLoad);
  return /* () */0;
}

var Method = /* module */[/* onSelect */onSelect];

var component = ReasonReact.statelessComponent("FileBox");

function render(param, attributeTuple, _) {
  var flag = attributeTuple[4];
  var fileId = attributeTuple[2];
  var dragImg = attributeTuple[0];
  var dispatchFunc = param[1];
  var className = "wonder-asset-fileBox" + (
    attributeTuple[5] ? "item-active" : ""
  );
  return React.createElement("article", {
              className: className,
              onClick: (function (_event) {
                  return onSelect(fileId, dispatchFunc, _event);
                })
            }, React.createElement("img", {
                  src: attributeTuple[1],
                  onDragStart: (function (param) {
                      return DragEventBaseUtils$WonderEditor.dragStart(fileId, flag, dragImg, param);
                    })
                }), React.createElement("span", {
                  className: "item-text"
                }, DomHelper$WonderEditor.textEl(attributeTuple[3])));
}

function make(store, dispatchFunc, attributeTuple, _) {
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
                        ], attributeTuple, self);
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
