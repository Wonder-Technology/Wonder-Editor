

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../../ui/store/AppStore.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../../../external/DomHelper.js";
import * as DragEventBaseUtils$WonderEditor from "../../../../../../../../../../../utils/event/DragEventBaseUtils.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/scene/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/CurrentSelectSourceEditorService.js";
import * as CurrentNodeDataAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/CurrentNodeDataAssetEditorService.js";

function onSelect(fileId, fileType, dispatchFunc, _) {
  StateEditorService$WonderEditor.setState(CurrentNodeDataAssetEditorService$WonderEditor.setCurrentNodeData(/* record */[
            /* currentNodeId */fileId,
            /* nodeType */fileType
          ], StateEditorService$WonderEditor.getState(/* () */0)));
  StateEditorService$WonderEditor.setState(CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* Asset */1, SceneEditorService$WonderEditor.clearCurrentSceneTreeNode(StateEditorService$WonderEditor.getState(/* () */0))));
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* All */1]]
      ]);
  return /* () */0;
}

var Method = /* module */[/* onSelect */onSelect];

var component = ReasonReact.statelessComponent("FileBox");

function render(param, param$1, _) {
  var widget = param$1[6];
  var fileType = param$1[4];
  var fileId = param$1[3];
  var effectAllowd = param$1[1];
  var dragImg = param$1[0];
  var dispatchFunc = param[1];
  var className = "item-text " + (
    param$1[7] ? "item-active" : ""
  );
  return React.createElement("article", {
              className: "wonder-asset-fileBox ",
              onClick: (function (_event) {
                  return onSelect(fileId, fileType, dispatchFunc, _event);
                })
            }, React.createElement("div", {
                  className: "box-image"
                }, React.createElement("img", {
                      src: param$1[2],
                      onDragStart: (function (e) {
                          return DragEventBaseUtils$WonderEditor.dragStart(fileId, widget, dragImg, effectAllowd, e);
                        })
                    })), React.createElement("div", {
                  className: className
                }, React.createElement("span", undefined, DomHelper$WonderEditor.textEl(param$1[5]))));
}

function make(store, dispatchFunc, effectAllowd, dragImg, imgSrc, fileId, fileType, fileName, widget, isSelected, _) {
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
                        ], /* tuple */[
                          dragImg,
                          effectAllowd,
                          imgSrc,
                          fileId,
                          fileType,
                          fileName,
                          widget,
                          isSelected
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
