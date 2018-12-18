

import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as StringInput$WonderEditor from "../../../../../../../atom_component/stringInput/StringInput.js";
import * as ArrayService$WonderEditor from "../../../../../../../../service/atom/ArrayService.js";
import * as ValueService$WonderEditor from "../../../../../../../../service/atom/ValueService.js";
import * as AddableComponent$WonderEditor from "../../../atom_component/addableComponent/ui/AddableComponent.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../../../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../service/state/engine/StateEngineService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as InspectorEditorService$WonderEditor from "../../../../../../../../service/state/editor/inspector/InspectorEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../../service/state/engine/GameObjectEngineService.js";
import * as InspectorGameObjectUtils$WonderEditor from "../../../utils/InspectorGameObjectUtils.js";
import * as SceneTreeNodeRenameEventHandlder$WonderEditor from "../eventHandler/SceneTreeNodeRenameEventHandlder.js";

function reNameGameObjectBlurEvent(param, gameObject, newName) {
  var match = ValueService$WonderEditor.isValueEqual(/* String */0, newName, StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
              return GameObjectEngineService$WonderEditor.unsafeGetGameObjectName(gameObject, param);
            })));
  if (match) {
    return /* () */0;
  } else {
    return Curry._3(SceneTreeNodeRenameEventHandlder$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
                param[0],
                param[1]
              ], gameObject, newName);
  }
}

function _buildNameFunc(param, gameObject) {
  var partial_arg_000 = param[0];
  var partial_arg_001 = param[1];
  var partial_arg = /* tuple */[
    partial_arg_000,
    partial_arg_001
  ];
  return React.createElement("div", {
              key: DomHelper$WonderEditor.getRandomKey(/* () */0),
              className: "sceneTree-name"
            }, ReasonReact.element(undefined, undefined, StringInput$WonderEditor.make(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                            return GameObjectEngineService$WonderEditor.unsafeGetGameObjectName(gameObject, param);
                          })), "Name", undefined, (function (param) {
                        return reNameGameObjectBlurEvent(partial_arg, gameObject, param);
                      }), false, /* array */[])));
}

function _buildGameObjectAllShowComponent(param, gameObject, componentTypeArr) {
  var dispatchFunc = param[1];
  var store = param[0];
  return componentTypeArr.map((function (componentType) {
                return InspectorGameObjectUtils$WonderEditor.buildComponentUIComponent(/* tuple */[
                            store,
                            dispatchFunc
                          ], componentType, gameObject);
              }));
}

function buildCurrentSceneTreeNodeComponent(param, addableComponentConfig, currentSceneTreeNode) {
  if (currentSceneTreeNode !== undefined) {
    var gameObject = currentSceneTreeNode;
    var dispatchFunc = param[1];
    var store = param[0];
    if (gameObject === SceneEngineService$WonderEditor.getSceneGameObject(StateEngineService$WonderEditor.unsafeGetState(/* () */0))) {
      return /* array */[];
    } else {
      return ArrayService$WonderEditor.push(ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, AddableComponent$WonderEditor.make(/* tuple */[
                          store,
                          dispatchFunc
                        ], gameObject, addableComponentConfig, /* array */[])), /* array */[_buildNameFunc(/* tuple */[
                          store,
                          dispatchFunc
                        ], gameObject)].concat(_buildGameObjectAllShowComponent(/* tuple */[
                          store,
                          dispatchFunc
                        ], gameObject, SparseMapService$WonderCommonlib.unsafeGet(gameObject, InspectorEditorService$WonderEditor.getComponentTypeMap(StateEditorService$WonderEditor.getState(/* () */0))))));
    }
  } else {
    return /* array */[];
  }
}

var Method = /* module */[
  /* reNameGameObjectBlurEvent */reNameGameObjectBlurEvent,
  /* _buildNameFunc */_buildNameFunc,
  /* _buildGameObjectAllShowComponent */_buildGameObjectAllShowComponent,
  /* buildCurrentSceneTreeNodeComponent */buildCurrentSceneTreeNodeComponent
];

var component = ReasonReact.statelessComponent("SceneTreeInspector");

function render(param, addableComponentConfig, currentSceneTreeNode, _self) {
  return React.createElement("article", {
              key: "SceneTreeInspector",
              className: "wonder-inspector-sceneTree"
            }, buildCurrentSceneTreeNodeComponent(/* tuple */[
                  param[0],
                  param[1]
                ], addableComponentConfig, currentSceneTreeNode));
}

function make(store, dispatchFunc, addableComponentConfig, currentSceneTreeNode, _children) {
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
                        ], addableComponentConfig, currentSceneTreeNode, self);
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
