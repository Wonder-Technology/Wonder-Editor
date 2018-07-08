

import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as AppStore$WonderEditor from "../../../../../../../ui/store/AppStore.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as StateAssetService$WonderEditor from "../../../../../../../../service/state/asset/StateAssetService.js";
import * as DragEventBaseUtils$WonderEditor from "../../../../../../../utils/event/DragEventBaseUtils.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../../service/state/editor/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as CurrentNodeDataAssetService$WonderEditor from "../../../../../../../../service/state/asset/CurrentNodeDataAssetService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../../../service/state/editor/CurrentSelectSourceEditorService.js";

function onSelect(fileId, fileType, dispatchFunc, _) {
  StateAssetService$WonderEditor.setState(CurrentNodeDataAssetService$WonderEditor.setCurrentNodeData(/* record */[
            /* currentNodeId */fileId,
            /* nodeType */fileType
          ], CurrentNodeDataAssetService$WonderEditor.clearCurrentNodeData(StateAssetService$WonderEditor.getState(/* () */0))));
  StateEditorService$WonderEditor.setState(CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* AssetTree */1, SceneEditorService$WonderEditor.clearCurrentSceneTreeNode(StateEditorService$WonderEditor.getState(/* () */0))));
  Curry._1(dispatchFunc, AppStore$WonderEditor.ReLoad);
  return /* () */0;
}

var Method = /* module */[/* onSelect */onSelect];

var component = ReasonReact.statelessComponent("FileBox");

function render(param, attributeTuple, _) {
  var flag = attributeTuple[5];
  var fileType = attributeTuple[3];
  var fileId = attributeTuple[2];
  var dragImg = attributeTuple[0];
  var dispatchFunc = param[1];
  var className = "wonder-asset-fileBox " + (
    attributeTuple[6] ? "item-active" : ""
  );
  return React.createElement("article", {
              className: className,
              onClick: (function (_event) {
                  return onSelect(fileId, fileType, dispatchFunc, _event);
                })
            }, React.createElement("img", {
                  src: attributeTuple[1],
                  onDragStart: (function (param) {
                      return DragEventBaseUtils$WonderEditor.dragStart(fileId, flag, dragImg, param);
                    })
                }), React.createElement("span", {
                  className: "item-text"
                }, DomHelper$WonderEditor.textEl(attributeTuple[4])));
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
