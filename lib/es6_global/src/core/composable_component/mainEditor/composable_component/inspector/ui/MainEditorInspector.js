'use strict';

import * as React                                         from "react";
import * as Caml_obj                                      from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact                                   from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as DomHelper$WonderEditor                        from "../../../../../external/DomHelper.js";
import * as StateLogicService$WonderEditor                from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetTreeInspector$WonderEditor               from "../atom_component/assetTree_Inspector/ui/AssetTreeInspector.js";
import * as SceneEditorService$WonderEditor               from "../../../../../../service/state/editor/SceneEditorService.js";
import * as SceneTreeInspector$WonderEditor               from "../atom_component/sceneTree_Inspector/ui/SceneTreeInspector.js";
import * as StateEditorService$WonderEditor               from "../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib              from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as AssetNodeMapEditorService$WonderEditor        from "../../../../../../service/state/editor/asset/AssetNodeMapEditorService.js";
import * as AssetCurrentNodeIdEditorService$WonderEditor  from "../../../../../../service/state/editor/asset/AssetCurrentNodeIdEditorService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../service/state/editor/CurrentSelectSourceEditorService.js";

function showInspectorBySourceType(store, dispatch, allShowComponentConfig, param) {
  var currentNodeId = param[2];
  var currentSelectSource = param[0];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  if (currentSelectSource) {
    if (currentSelectSource[0] !== 0) {
      if (currentNodeId) {
        var nodeId = currentNodeId[0];
        return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, AssetTreeInspector$WonderEditor.make(store, dispatch, nodeId, SparseMapService$WonderCommonlib.unsafeGet(nodeId, AssetNodeMapEditorService$WonderEditor.unsafeGetNodeMap(editorState)), /* array */[]));
      } else {
        return null;
      }
    } else {
      return ReasonReact.element(/* None */0, /* None */0, SceneTreeInspector$WonderEditor.make(store, dispatch, allShowComponentConfig, param[1], /* array */[]));
    }
  } else {
    return null;
  }
}

var Method = /* module */[/* showInspectorBySourceType */showInspectorBySourceType];

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditorInspector");

function render(store, dispatch, allShowComponentConfig, self) {
  return React.createElement("article", {
              key: "inspector",
              className: "inspector-component"
            }, showInspectorBySourceType(store, dispatch, allShowComponentConfig, /* tuple */[
                  self[/* retainedProps */5][/* currentSelectSource */0],
                  self[/* retainedProps */5][/* currentSceneTreeNode */1],
                  self[/* retainedProps */5][/* currentNodeId */2]
                ]));
}

function shouldUpdate(param) {
  return Caml_obj.caml_notequal(param[/* oldSelf */0][/* retainedProps */5], param[/* newSelf */1][/* retainedProps */5]);
}

function make(store, dispatch, allShowComponentConfig, _) {
  var newrecord = component.slice();
  newrecord[/* shouldUpdate */8] = shouldUpdate;
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, allShowComponentConfig, self);
    });
  newrecord[/* retainedProps */11] = /* record */[
    /* currentSelectSource */StateLogicService$WonderEditor.getEditorState(CurrentSelectSourceEditorService$WonderEditor.getCurrentSelectSource),
    /* currentSceneTreeNode */StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.getCurrentSceneTreeNode),
    /* currentNodeId */StateLogicService$WonderEditor.getEditorState(AssetCurrentNodeIdEditorService$WonderEditor.getCurrentNodeId)
  ];
  return newrecord;
}

export {
  Method       ,
  component    ,
  render       ,
  shouldUpdate ,
  make         ,
  
}
/* component Not a pure module */
