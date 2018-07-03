

import * as React from "react";
import * as Caml_obj from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Css$WonderEditor from "../../../../../external/Css.js";
import * as DomHelper$WonderEditor from "../../../../../external/DomHelper.js";
import * as TransformUtils$WonderEditor from "../composable_component/sceneTree_Inspector/atom_Inspector/transform/utils/TransformUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetTreeInspector$WonderEditor from "../composable_component/assetTree_Inspector/ui/AssetTreeInspector.js";
import * as SceneEditorService$WonderEditor from "../../../../../../service/state/editor/SceneEditorService.js";
import * as SceneTreeInspector$WonderEditor from "../composable_component/sceneTree_Inspector/ui/SceneTreeInspector.js";
import * as StateEditorService$WonderEditor from "../../../../../../service/state/editor/StateEditorService.js";
import * as CameraEngineService$WonderEditor from "../../../../../../service/state/engine/CameraEngineService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../service/state/engine/GameObjectEngineService.js";
import * as AssetNodeMapEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetNodeMapEditorService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as AssetCurrentNodeIdEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetCurrentNodeIdEditorService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../service/state/editor/CurrentSelectSourceEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/GameObjectComponentEngineService.js";

Css$WonderEditor.importCss("./css/mainEditorInspector.css");

function showInspectorBySourceType(param, allShowComponentConfig, param$1) {
  var currentSelectSource = param$1[0];
  if (currentSelectSource) {
    var currentNodeId = param$1[2];
    var dispatchFunc = param[1];
    var store = param[0];
    if (currentSelectSource[0]) {
      if (currentNodeId) {
        var nodeId = currentNodeId[0];
        return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, AssetTreeInspector$WonderEditor.make(store, dispatchFunc, nodeId, SparseMapService$WonderCommonlib.unsafeGet(nodeId, AssetNodeMapEditorService$WonderEditor.unsafeGetNodeMap(StateEditorService$WonderEditor.getState(/* () */0))), /* array */[]));
      } else {
        return null;
      }
    } else {
      return ReasonReact.element(/* None */0, /* None */0, SceneTreeInspector$WonderEditor.make(store, dispatchFunc, allShowComponentConfig, param$1[1], /* array */[]));
    }
  } else {
    return null;
  }
}

var Method = /* module */[/* showInspectorBySourceType */showInspectorBySourceType];

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditorInspector");

function render(param, allShowComponentConfig, self) {
  return React.createElement("article", {
              key: "inspector",
              className: "wonder-inspector-component"
            }, showInspectorBySourceType(/* tuple */[
                  param[0],
                  param[1]
                ], allShowComponentConfig, /* tuple */[
                  self[/* retainedProps */2][/* currentSelectSource */2],
                  self[/* retainedProps */2][/* currentSceneTreeNode */3],
                  self[/* retainedProps */2][/* currentNodeId */5]
                ]));
}

function shouldUpdate(param) {
  return Caml_obj.caml_notequal(param[/* oldSelf */0][/* retainedProps */2], param[/* newSelf */1][/* retainedProps */2]);
}

function make(store, dispatchFunc, allShowComponentConfig, _) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineStateToGetData = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
  var currentSceneTreeNode = SceneEditorService$WonderEditor.getCurrentSceneTreeNode(editorState);
  var tmp;
  if (currentSceneTreeNode) {
    var gameObject = currentSceneTreeNode[0];
    var match = CameraEngineService$WonderEditor.isCamera(gameObject, engineStateToGetData);
    tmp = match ? /* None */0 : /* Some */[TransformUtils$WonderEditor.getCurrentTransformData(GameObjectComponentEngineService$WonderEditor.getTransformComponent(gameObject, engineStateToGetData))];
  } else {
    tmp = /* None */0;
  }
  var tmp$1;
  if (currentSceneTreeNode) {
    var gameObject$1 = currentSceneTreeNode[0];
    var match$1 = CameraEngineService$WonderEditor.isCamera(gameObject$1, engineStateToGetData);
    tmp$1 = match$1 ? /* None */0 : BasicMaterialEngineService$WonderEditor.getMap(GameObjectComponentEngineService$WonderEditor.getBasicMaterialComponent(gameObject$1, engineStateToGetData), engineStateToGetData);
  } else {
    tmp$1 = /* None */0;
  }
  var tmp$2;
  if (currentSceneTreeNode) {
    var gameObject$2 = currentSceneTreeNode[0];
    tmp$2 = /* Some */[StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
              return GameObjectEngineService$WonderEditor.unsafeGetGameObjectName(gameObject$2, param);
            }))];
  } else {
    tmp$2 = /* None */0;
  }
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
              return render(/* tuple */[
                          store,
                          dispatchFunc
                        ], allShowComponentConfig, self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps : record */[
            /* currentTransformData */tmp,
            /* currentTextureMapData */tmp$1,
            /* currentSelectSource */CurrentSelectSourceEditorService$WonderEditor.getCurrentSelectSource(editorState),
            /* currentSceneTreeNode */currentSceneTreeNode,
            /* currentSceneTreeNodeName */tmp$2,
            /* currentNodeId */AssetCurrentNodeIdEditorService$WonderEditor.getCurrentNodeId(editorState)
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
/*  Not a pure module */
