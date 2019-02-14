

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../ui/store/AppStore.js";
import * as Matrix4Service$Wonderjs from "../../../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Matrix4Service.js";
import * as UIStateService$WonderEditor from "../../../../../../service/state/ui/UIStateService.js";
import * as MouseEventService$WonderEditor from "../../../../../../service/record/editor/event/MouseEventService.js";
import * as StateLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../service/state/engine/StateEngineService.js";
import * as ScaleBlurEventHandler$WonderEditor from "../../../../../composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/eventHandler/ScaleBlurEventHandler.js";
import * as SelectScaleGizmoUtils$WonderEditor from "./scale/SelectScaleGizmoUtils.js";
import * as AffectScaleGizmosUtils$WonderEditor from "./scale/AffectScaleGizmosUtils.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as TransformEditorService$WonderEditor from "../../../../../../service/state/editor/transform/TransformEditorService.js";
import * as CurrentScaleGizmosUtils$WonderEditor from "./scale/CurrentScaleGizmosUtils.js";
import * as CustomEventEditorService$WonderEditor from "../../../../../../service/state/editor/event/CustomEventEditorService.js";
import * as InitTransformGizmosUtils$WonderEditor from "./InitTransformGizmosUtils.js";
import * as ManageEventEngineService$WonderEditor from "../../../../../../service/state/engine/event/ManageEventEngineService.js";
import * as PositionBlurEventHandler$WonderEditor from "../../../../../composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/eventHandler/PositionBlurEventHandler.js";
import * as RotationBlurEventHandler$WonderEditor from "../../../../../composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/eventHandler/RotationBlurEventHandler.js";
import * as SelectRotationGizmoUtils$WonderEditor from "./rotation/SelectRotationGizmoUtils.js";
import * as AffectRotationGizmosUtils$WonderEditor from "./rotation/AffectRotationGizmosUtils.js";
import * as CurrentRotationGizmosUtils$WonderEditor from "./rotation/CurrentRotationGizmosUtils.js";
import * as SceneViewEventEditorService$WonderEditor from "../../../../../../service/state/editor/event/SceneViewEventEditorService.js";
import * as SelectTranslationGizmoUtils$WonderEditor from "./translation/SelectTranslationGizmoUtils.js";
import * as AffectTranslationGizmosUtils$WonderEditor from "./translation/AffectTranslationGizmosUtils.js";
import * as CurrentTranslationGizmosUtils$WonderEditor from "./translation/CurrentTranslationGizmosUtils.js";
import * as MoveTranslationPlaneGizmosUtils$WonderEditor from "./translation/MoveTranslationPlaneGizmosUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as TransformGameObjectEngineService$WonderEditor from "../../../../../../service/state/engine/gameObject/TransformGameObjectEngineService.js";
import * as AxisScaleGizmoSceneViewEditorService$WonderEditor from "../../../../../../service/state/editor/view/sceneView/transform/scale/AxisScaleGizmoSceneViewEditorService.js";
import * as SelectScaleGizmoSceneViewEditorService$WonderEditor from "../../../../../../service/state/editor/view/sceneView/transform/scale/SelectScaleGizmoSceneViewEditorService.js";
import * as OperateScaleGizmoSceneViewEditorService$WonderEditor from "../../../../../../service/state/editor/view/sceneView/transform/scale/OperateScaleGizmoSceneViewEditorService.js";
import * as AngleRotationGizmoSceneViewEditorService$WonderEditor from "../../../../../../service/state/editor/view/sceneView/transform/rotation/AngleRotationGizmoSceneViewEditorService.js";
import * as SelectRotationGizmoSceneViewEditorService$WonderEditor from "../../../../../../service/state/editor/view/sceneView/transform/rotation/SelectRotationGizmoSceneViewEditorService.js";
import * as OperateRotationGizmoSceneViewEditorService$WonderEditor from "../../../../../../service/state/editor/view/sceneView/transform/rotation/OperateRotationGizmoSceneViewEditorService.js";
import * as SelectTransformGizmoSceneViewEditorService$WonderEditor from "../../../../../../service/state/editor/view/sceneView/transform/SelectTransformGizmoSceneViewEditorService.js";
import * as CurrentTransformGizmoSceneViewEditorService$WonderEditor from "../../../../../../service/state/editor/view/sceneView/transform/CurrentTransformGizmoSceneViewEditorService.js";
import * as IsTransformGizmoRenderSceneViewEditorService$WonderEditor from "../../../../../../service/state/editor/view/sceneView/transform/IsTransformGizmoRenderSceneViewEditorService.js";
import * as SelectTranslationGizmoSceneViewEditorService$WonderEditor from "../../../../../../service/state/editor/view/sceneView/transform/translation/SelectTranslationGizmoSceneViewEditorService.js";
import * as OperateTranslationGizmoSceneViewEditorService$WonderEditor from "../../../../../../service/state/editor/view/sceneView/transform/translation/OperateTranslationGizmoSceneViewEditorService.js";

function _refreshInspector(editorState, engineState) {
  StateEditorService$WonderEditor.setState(editorState);
  StateEngineService$WonderEditor.setState(engineState);
  var dispatchFunc = UIStateService$WonderEditor.getDispatch(/* () */0);
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* Inspector */2]]
      ]);
  return /* tuple */[
          StateEditorService$WonderEditor.getState(/* () */0),
          StateEngineService$WonderEditor.unsafeGetState(/* () */0)
        ];
}

function _refreshInspectorForRotation(editorState, engineState) {
  var editorState$1 = TransformEditorService$WonderEditor.removeLocalEulerAngleData(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState), engineState), editorState);
  return _refreshInspector(editorState$1, engineState);
}

function _pushUndoStack(startData, pushUndoStackWithCopiedEngineStateFunc, editorState, engineState) {
  var currentSceneTreeNode = SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState);
  var transform = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(currentSceneTreeNode, engineState);
  StateEditorService$WonderEditor.setState(editorState);
  StateEngineService$WonderEditor.setState(engineState);
  Curry._3(pushUndoStackWithCopiedEngineStateFunc, /* tuple */[
        UIStateService$WonderEditor.getState(/* () */0),
        UIStateService$WonderEditor.getDispatch(/* () */0)
      ], transform, startData);
  return StateEngineService$WonderEditor.unsafeGetState(/* () */0);
}

function _bindSelectSceneTreeNodeEventName(engineState) {
  return ManageEventEngineService$WonderEditor.onCustomGlobalEvent(CustomEventEditorService$WonderEditor.getSelectSceneTreeNodeEventName(/* () */0), (function ($$event, engineState) {
                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                var engineState$1 = MoveTranslationPlaneGizmosUtils$WonderEditor.moveTranslationPlaneGizmo(editorState, engineState);
                return /* tuple */[
                        engineState$1,
                        $$event
                      ];
              }), engineState, undefined, /* () */0);
}

function _handleTranslationGizmoDragStartEvent($$event, param) {
  var engineState = param[1];
  var editorState = param[0];
  var editorState$1 = OperateTranslationGizmoSceneViewEditorService$WonderEditor.setCurrentSceneTreeNodeStartPoint(InitTransformGizmosUtils$WonderEditor.getCurrentSceneTreeNodePosition(editorState, engineState), editorState);
  var editorState$2 = SelectTranslationGizmoUtils$WonderEditor.selectTranslationGizmo($$event, engineState, OperateTranslationGizmoSceneViewEditorService$WonderEditor.setCurrentSceneTreeNodeStartLocalPosition(InitTransformGizmosUtils$WonderEditor.getCurrentSceneTreeNodeLocalPosition(editorState$1, engineState), editorState$1));
  return /* tuple */[
          editorState$2,
          engineState
        ];
}

function _handleRotationGizmoDragStartEvent($$event, param) {
  var engineState = param[1];
  var editorState = param[0];
  var editorState$1 = OperateRotationGizmoSceneViewEditorService$WonderEditor.setCurrentSceneTreeNodeStartLocalEulerAngles(InitTransformGizmosUtils$WonderEditor.getCurrentSceneTreeNodeLocalEulerAngles(editorState, engineState), editorState);
  return SelectRotationGizmoUtils$WonderEditor.selectRotationGizmo($$event, editorState$1, engineState);
}

function _handleScaleGizmoDragStartEvent($$event, param) {
  var engineState = param[1];
  var editorState = param[0];
  var __x = TransformGameObjectEngineService$WonderEditor.getLocalToWorldMatrixTypeArray(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleWholeGizmo(editorState), engineState);
  var editorState$1 = OperateScaleGizmoSceneViewEditorService$WonderEditor.setDragStartZAxisNormalizedVec(AxisScaleGizmoSceneViewEditorService$WonderEditor.getZAxisNormalizedVec(editorState, engineState), OperateScaleGizmoSceneViewEditorService$WonderEditor.setDragStartYAxisNormalizedVec(AxisScaleGizmoSceneViewEditorService$WonderEditor.getYAxisNormalizedVec(editorState, engineState), OperateScaleGizmoSceneViewEditorService$WonderEditor.setDragStartXAxisNormalizedVec(AxisScaleGizmoSceneViewEditorService$WonderEditor.getXAxisNormalizedVec(editorState, engineState), OperateScaleGizmoSceneViewEditorService$WonderEditor.setDragStartScaleWholeGizmoInvertLocalToWorldMatrixTypeArray(Matrix4Service$Wonderjs.invert(__x, Matrix4Service$Wonderjs.createIdentityMatrix4(/* () */0)), OperateScaleGizmoSceneViewEditorService$WonderEditor.setCurrentSceneTreeNodeStartLocalScale(InitTransformGizmosUtils$WonderEditor.getCurrentSceneTreeNodeLocalScale(editorState, engineState), editorState)))));
  var editorState$2 = SelectScaleGizmoUtils$WonderEditor.selectScaleGizmo($$event, engineState, editorState$1);
  return /* tuple */[
          editorState$2,
          engineState
        ];
}

function _bindDragStartEvent(engineState) {
  return ManageEventEngineService$WonderEditor.onCustomGlobalEvent(SceneViewEventEditorService$WonderEditor.getPointDragStartEventName(/* () */0), (function ($$event, engineState) {
                var match = MouseEventService$WonderEditor.isLeftMouseButton($$event);
                if (match) {
                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                  var match$1 = IsTransformGizmoRenderSceneViewEditorService$WonderEditor.isTransformGizmoRender(editorState);
                  var match$2;
                  if (match$1) {
                    SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState);
                    var match$3 = CurrentTransformGizmoSceneViewEditorService$WonderEditor.getCurrentGizmoType(editorState);
                    switch (match$3) {
                      case 0 : 
                          match$2 = _handleTranslationGizmoDragStartEvent($$event, /* tuple */[
                                editorState,
                                engineState
                              ]);
                          break;
                      case 1 : 
                          match$2 = _handleRotationGizmoDragStartEvent($$event, /* tuple */[
                                editorState,
                                engineState
                              ]);
                          break;
                      case 2 : 
                          match$2 = _handleScaleGizmoDragStartEvent($$event, /* tuple */[
                                editorState,
                                engineState
                              ]);
                          break;
                      
                    }
                  } else {
                    match$2 = /* tuple */[
                      SelectTransformGizmoSceneViewEditorService$WonderEditor.markNotSelectAnyTransformGizmo(editorState),
                      engineState
                    ];
                  }
                  var engineState$1 = StateLogicService$WonderEditor.renderWhenStop(match$2[1]);
                  StateEditorService$WonderEditor.setState(match$2[0]);
                  return /* tuple */[
                          engineState$1,
                          $$event
                        ];
                } else {
                  return /* tuple */[
                          engineState,
                          $$event
                        ];
                }
              }), engineState, undefined, /* () */0);
}

function _bindDragOverEvent(engineState) {
  return ManageEventEngineService$WonderEditor.onCustomGlobalEvent(SceneViewEventEditorService$WonderEditor.getPointDragOverEventName(/* () */0), (function ($$event, engineState) {
                var match = MouseEventService$WonderEditor.isLeftMouseButton($$event);
                if (match) {
                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                  var match$1 = SelectTranslationGizmoSceneViewEditorService$WonderEditor.isSelectAnyTranslationGizmo(editorState);
                  var match$2;
                  if (match$1) {
                    var match$3 = AffectTranslationGizmosUtils$WonderEditor.affectTranslationGizmo($$event, /* tuple */[
                          editorState,
                          engineState
                        ]);
                    var match$4 = _refreshInspector(match$3[0], match$3[1]);
                    var engineState$1 = StateLogicService$WonderEditor.renderWhenStop(match$4[1]);
                    match$2 = /* tuple */[
                      match$4[0],
                      engineState$1
                    ];
                  } else {
                    var match$5 = SelectRotationGizmoSceneViewEditorService$WonderEditor.isSelectAnyRotationGizmo(editorState);
                    if (match$5) {
                      var match$6 = AffectRotationGizmosUtils$WonderEditor.affectRotationGizmo($$event, /* tuple */[
                            editorState,
                            engineState
                          ]);
                      var match$7 = _refreshInspectorForRotation(match$6[0], match$6[1]);
                      var engineState$2 = StateLogicService$WonderEditor.renderWhenStop(match$7[1]);
                      match$2 = /* tuple */[
                        match$7[0],
                        engineState$2
                      ];
                    } else {
                      var match$8 = SelectScaleGizmoSceneViewEditorService$WonderEditor.isSelectAnyScaleGizmo(editorState);
                      if (match$8) {
                        var match$9 = AffectScaleGizmosUtils$WonderEditor.affectScaleGizmo($$event, /* tuple */[
                              editorState,
                              engineState
                            ]);
                        var match$10 = _refreshInspector(match$9[0], match$9[1]);
                        var engineState$3 = StateLogicService$WonderEditor.renderWhenStop(match$10[1]);
                        match$2 = /* tuple */[
                          match$10[0],
                          engineState$3
                        ];
                      } else {
                        match$2 = /* tuple */[
                          editorState,
                          engineState
                        ];
                      }
                    }
                  }
                  StateEditorService$WonderEditor.setState(match$2[0]);
                  return /* tuple */[
                          match$2[1],
                          $$event
                        ];
                } else {
                  return /* tuple */[
                          engineState,
                          $$event
                        ];
                }
              }), engineState, undefined, /* () */0);
}

function _bindDragGizmoDropEvent(engineState) {
  return ManageEventEngineService$WonderEditor.onCustomGlobalEvent(SceneViewEventEditorService$WonderEditor.getPointDragDropEventName(/* () */0), (function ($$event, engineState) {
                var match = MouseEventService$WonderEditor.isLeftMouseButton($$event);
                if (match) {
                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                  var match$1 = SelectTranslationGizmoSceneViewEditorService$WonderEditor.isSelectAnyTranslationGizmo(editorState);
                  if (match$1) {
                    var currentSceneTreeNode = SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState);
                    GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(currentSceneTreeNode, engineState);
                    var engineState$1 = CurrentTranslationGizmosUtils$WonderEditor.restoreTranslationGizmoColor(editorState, MoveTranslationPlaneGizmosUtils$WonderEditor.moveTranslationPlaneGizmo(editorState, engineState));
                    var engineState$2 = StateLogicService$WonderEditor.renderWhenStop(_pushUndoStack(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetCurrentSceneTreeNodeStartLocalPosition(editorState), PositionBlurEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1], editorState, engineState$1));
                    return /* tuple */[
                            engineState$2,
                            $$event
                          ];
                  } else {
                    var match$2 = SelectRotationGizmoSceneViewEditorService$WonderEditor.isSelectAnyRotationGizmo(editorState);
                    if (match$2) {
                      var editorState$1 = AngleRotationGizmoSceneViewEditorService$WonderEditor.setLastTotalAngle(undefined, editorState);
                      var engineState$3 = CurrentRotationGizmosUtils$WonderEditor.restoreRotationGizmoColor(editorState$1, engineState);
                      var engineState$4 = StateLogicService$WonderEditor.renderWhenStop(_pushUndoStack(OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetCurrentSceneTreeNodeStartLocalEulerAngles(editorState$1), RotationBlurEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1], editorState$1, engineState$3));
                      return /* tuple */[
                              engineState$4,
                              $$event
                            ];
                    } else {
                      var match$3 = SelectScaleGizmoSceneViewEditorService$WonderEditor.isSelectAnyScaleGizmo(editorState);
                      if (match$3) {
                        var currentSceneTreeNode$1 = SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState);
                        GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(currentSceneTreeNode$1, engineState);
                        var engineState$5 = CurrentScaleGizmosUtils$WonderEditor.restoreScaleGizmoColor(editorState, engineState);
                        var engineState$6 = StateLogicService$WonderEditor.renderWhenStop(_pushUndoStack(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetCurrentSceneTreeNodeStartLocalScale(editorState), ScaleBlurEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1], editorState, engineState$5));
                        return /* tuple */[
                                engineState$6,
                                $$event
                              ];
                      } else {
                        return /* tuple */[
                                engineState,
                                $$event
                              ];
                      }
                    }
                  }
                } else {
                  return /* tuple */[
                          engineState,
                          $$event
                        ];
                }
              }), engineState, undefined, /* () */0);
}

function _bindDragEditCameraDropEvent(engineState) {
  return ManageEventEngineService$WonderEditor.onCustomGlobalEvent(SceneViewEventEditorService$WonderEditor.getPointDragDropEventName(/* () */0), (function ($$event, engineState) {
                var match = MouseEventService$WonderEditor.isRightMouseButton($$event) && StateLogicService$WonderEditor.getEditorState(IsTransformGizmoRenderSceneViewEditorService$WonderEditor.isTranslationWholeGizmoRender);
                if (match) {
                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                  var engineState$1 = MoveTranslationPlaneGizmosUtils$WonderEditor.moveTranslationPlaneGizmo(editorState, engineState);
                  var engineState$2 = StateLogicService$WonderEditor.renderWhenStop(engineState$1);
                  return /* tuple */[
                          engineState$2,
                          $$event
                        ];
                } else {
                  return /* tuple */[
                          engineState,
                          $$event
                        ];
                }
              }), engineState, undefined, /* () */0);
}

function _bindDragDropEvent(engineState) {
  return _bindDragEditCameraDropEvent(_bindDragGizmoDropEvent(engineState));
}

function bindEvent(engineState) {
  var engineState$1 = _bindDragOverEvent(_bindDragStartEvent(_bindSelectSceneTreeNodeEventName(engineState)));
  return _bindDragEditCameraDropEvent(_bindDragGizmoDropEvent(engineState$1));
}

export {
  _refreshInspector ,
  _refreshInspectorForRotation ,
  _pushUndoStack ,
  _bindSelectSceneTreeNodeEventName ,
  _handleTranslationGizmoDragStartEvent ,
  _handleRotationGizmoDragStartEvent ,
  _handleScaleGizmoDragStartEvent ,
  _bindDragStartEvent ,
  _bindDragOverEvent ,
  _bindDragGizmoDropEvent ,
  _bindDragEditCameraDropEvent ,
  _bindDragDropEvent ,
  bindEvent ,
  
}
/* AppStore-WonderEditor Not a pure module */
