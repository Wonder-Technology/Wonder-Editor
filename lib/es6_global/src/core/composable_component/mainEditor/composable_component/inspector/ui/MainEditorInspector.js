

import * as React from "react";
import * as Caml_obj from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../external/DomHelper.js";
import * as StateLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetTreeInspector$WonderEditor from "../atom_component/assetTree_Inspector/ui/AssetTreeInspector.js";
import * as SceneEditorService$WonderEditor from "../../../../../../service/state/editor/SceneEditorService.js";
import * as SceneTreeInspector$WonderEditor from "../atom_component/sceneTree_Inspector/ui/SceneTreeInspector.js";
import * as StateEditorService$WonderEditor from "../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as AssetNodeMapEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetNodeMapEditorService.js";
import * as AssetCurrentNodeIdEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetCurrentNodeIdEditorService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../service/state/editor/CurrentSelectSourceEditorService.js";

function showInspectorBySourceType(store, dispatchFunc, allShowComponentConfig, param) {
  var currentNodeId = param[2];
  var currentSelectSource = param[0];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  if (currentSelectSource) {
    if (currentSelectSource[0]) {
      if (currentNodeId) {
        var nodeId = currentNodeId[0];
        return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, AssetTreeInspector$WonderEditor.make(store, dispatchFunc, nodeId, SparseMapService$WonderCommonlib.unsafeGet(nodeId, AssetNodeMapEditorService$WonderEditor.unsafeGetNodeMap(editorState)), /* array */[]));
      } else {
        return null;
      }
    } else {
      return ReasonReact.element(/* None */0, /* None */0, SceneTreeInspector$WonderEditor.make(store, dispatchFunc, allShowComponentConfig, param[1], /* array */[]));
    }
  } else {
    return null;
  }
}

var Method = /* module */[/* showInspectorBySourceType */showInspectorBySourceType];

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditorInspector");

function render(store, dispatchFunc, allShowComponentConfig, self) {
  return React.createElement("article", {
              key: "inspector",
              className: "inspector-component"
            }, showInspectorBySourceType(store, dispatchFunc, allShowComponentConfig, /* tuple */[
                  self[/* retainedProps */2][/* currentSelectSource */0],
                  self[/* retainedProps */2][/* currentSceneTreeNode */1],
                  self[/* retainedProps */2][/* currentNodeId */2]
                ]));
}

function shouldUpdate(param) {
  return Caml_obj.caml_notequal(param[/* oldSelf */0][/* retainedProps */2], param[/* newSelf */1][/* retainedProps */2]);
}

function make(store, dispatchFunc, allShowComponentConfig, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */shouldUpdate,
          /* render */(function (self) {
              return render(store, dispatchFunc, allShowComponentConfig, self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps : record */[
            /* currentSelectSource */StateLogicService$WonderEditor.getEditorState(CurrentSelectSourceEditorService$WonderEditor.getCurrentSelectSource),
            /* currentSceneTreeNode */StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.getCurrentSceneTreeNode),
            /* currentNodeId */StateLogicService$WonderEditor.getEditorState(AssetCurrentNodeIdEditorService$WonderEditor.getCurrentNodeId)
          ],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  Method ,
  component ,
  render ,
  shouldUpdate ,
  make ,
  
}
/* component Not a pure module */
