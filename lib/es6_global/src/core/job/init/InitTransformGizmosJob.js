

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../ui/store/AppStore.js";
import * as Matrix4Service$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Matrix4Service.js";
import * as UIStateService$WonderEditor from "../../../service/state/ui/UIStateService.js";
import * as MouseEventService$WonderEditor from "../../../service/record/editor/event/MouseEventService.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../service/state/engine/StateEngineService.js";
import * as ScaleBlurEventHandler$WonderEditor from "../../composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/eventHandler/ScaleBlurEventHandler.js";
import * as SelectScaleGizmoUtils$WonderEditor from "../../utils/engine/job/init/initTransformGizmosJob/scale/SelectScaleGizmoUtils.js";
import * as AffectScaleGizmosUtils$WonderEditor from "../../utils/engine/job/init/initTransformGizmosJob/scale/AffectScaleGizmosUtils.js";
import * as CreateScaleGizmosUtils$WonderEditor from "../../utils/engine/job/init/initTransformGizmosJob/scale/CreateScaleGizmosUtils.js";
import * as SceneTreeEditorService$WonderEditor from "../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as TransformEditorService$WonderEditor from "../../../service/state/editor/transform/TransformEditorService.js";
import * as CurrentScaleGizmosUtils$WonderEditor from "../../utils/engine/job/init/initTransformGizmosJob/scale/CurrentScaleGizmosUtils.js";
import * as CustomEventEditorService$WonderEditor from "../../../service/state/editor/event/CustomEventEditorService.js";
import * as InitTransformGizmosUtils$WonderEditor from "../../utils/engine/job/init/initTransformGizmosJob/InitTransformGizmosUtils.js";
import * as ManageEventEngineService$WonderEditor from "../../../service/state/engine/event/ManageEventEngineService.js";
import * as PositionBlurEventHandler$WonderEditor from "../../composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/eventHandler/PositionBlurEventHandler.js";
import * as RotationBlurEventHandler$WonderEditor from "../../composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/eventHandler/RotationBlurEventHandler.js";
import * as SelectRotationGizmoUtils$WonderEditor from "../../utils/engine/job/init/initTransformGizmosJob/rotation/SelectRotationGizmoUtils.js";
import * as AffectRotationGizmosUtils$WonderEditor from "../../utils/engine/job/init/initTransformGizmosJob/rotation/AffectRotationGizmosUtils.js";
import * as CreateRotationGizmosUtils$WonderEditor from "../../utils/engine/job/init/initTransformGizmosJob/rotation/CreateRotationGizmosUtils.js";
import * as CreateTransformGizmosUtils$WonderEditor from "../../utils/engine/job/init/initTransformGizmosJob/CreateTransformGizmosUtils.js";
import * as CurrentRotationGizmosUtils$WonderEditor from "../../utils/engine/job/init/initTransformGizmosJob/rotation/CurrentRotationGizmosUtils.js";
import * as SceneViewEventEditorService$WonderEditor from "../../../service/state/editor/event/SceneViewEventEditorService.js";
import * as SelectTranslationGizmoUtils$WonderEditor from "../../utils/engine/job/init/initTransformGizmosJob/translation/SelectTranslationGizmoUtils.js";
import * as AffectTranslationGizmosUtils$WonderEditor from "../../utils/engine/job/init/initTransformGizmosJob/translation/AffectTranslationGizmosUtils.js";
import * as CreateTranslationGizmosUtils$WonderEditor from "../../utils/engine/job/init/initTransformGizmosJob/translation/CreateTranslationGizmosUtils.js";
import * as CurrentTranslationGizmosUtils$WonderEditor from "../../utils/engine/job/init/initTransformGizmosJob/translation/CurrentTranslationGizmosUtils.js";
import * as MoveTranslationPlaneGizmosUtils$WonderEditor from "../../utils/engine/job/init/initTransformGizmosJob/translation/MoveTranslationPlaneGizmosUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as TransformGameObjectEngineService$WonderEditor from "../../../service/state/engine/gameObject/TransformGameObjectEngineService.js";
import * as AxisScaleGizmoSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/scale/AxisScaleGizmoSceneViewEditorService.js";
import * as SelectScaleGizmoSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/scale/SelectScaleGizmoSceneViewEditorService.js";
import * as OperateScaleGizmoSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/scale/OperateScaleGizmoSceneViewEditorService.js";
import * as AngleRotationGizmoSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/rotation/AngleRotationGizmoSceneViewEditorService.js";
import * as SelectRotationGizmoSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/rotation/SelectRotationGizmoSceneViewEditorService.js";
import * as OperateRotationGizmoSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/rotation/OperateRotationGizmoSceneViewEditorService.js";
import * as SelectTransformGizmoSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/SelectTransformGizmoSceneViewEditorService.js";
import * as CurrentTransformGizmoSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/CurrentTransformGizmoSceneViewEditorService.js";
import * as IsTransformGizmoRenderSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/IsTransformGizmoRenderSceneViewEditorService.js";
import * as SelectTranslationGizmoSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/translation/SelectTranslationGizmoSceneViewEditorService.js";
import * as OperateTranslationGizmoSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/translation/OperateTranslationGizmoSceneViewEditorService.js";

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

function _bindEvent(_, engineState) {
  var engineState$1 = ManageEventEngineService$WonderEditor.onCustomGlobalEvent(CustomEventEditorService$WonderEditor.getSelectSceneTreeNodeEventName(/* () */0), (function ($$event, engineState) {
          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
          var engineState$1 = MoveTranslationPlaneGizmosUtils$WonderEditor.moveTranslationPlaneGizmo(editorState, engineState);
          return /* tuple */[
                  engineState$1,
                  $$event
                ];
        }), engineState, undefined, /* () */0);
  var engineState$2 = ManageEventEngineService$WonderEditor.onCustomGlobalEvent(SceneViewEventEditorService$WonderEditor.getPointDragStartEventName(/* () */0), (function ($$event, engineState) {
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
                    var editorState$1 = OperateTranslationGizmoSceneViewEditorService$WonderEditor.setCurrentSceneTreeNodeStartPoint(InitTransformGizmosUtils$WonderEditor.getCurrentSceneTreeNodePosition(editorState, engineState), editorState);
                    var editorState$2 = SelectTranslationGizmoUtils$WonderEditor.selectTranslationGizmo($$event, engineState, OperateTranslationGizmoSceneViewEditorService$WonderEditor.setCurrentSceneTreeNodeStartLocalPosition(InitTransformGizmosUtils$WonderEditor.getCurrentSceneTreeNodeLocalPosition(editorState$1, engineState), editorState$1));
                    match$2 = /* tuple */[
                      editorState$2,
                      engineState
                    ];
                    break;
                case 1 : 
                    var editorState$3 = OperateRotationGizmoSceneViewEditorService$WonderEditor.setCurrentSceneTreeNodeStartLocalEulerAngles(InitTransformGizmosUtils$WonderEditor.getCurrentSceneTreeNodeLocalEulerAngles(editorState, engineState), editorState);
                    match$2 = SelectRotationGizmoUtils$WonderEditor.selectRotationGizmo($$event, editorState$3, engineState);
                    break;
                case 2 : 
                    var __x = TransformGameObjectEngineService$WonderEditor.getLocalToWorldMatrixTypeArray(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleWholeGizmo(editorState), engineState);
                    var editorState$4 = OperateScaleGizmoSceneViewEditorService$WonderEditor.setDragStartZAxisNormalizedVec(AxisScaleGizmoSceneViewEditorService$WonderEditor.getZAxisNormalizedVec(editorState, engineState), OperateScaleGizmoSceneViewEditorService$WonderEditor.setDragStartYAxisNormalizedVec(AxisScaleGizmoSceneViewEditorService$WonderEditor.getYAxisNormalizedVec(editorState, engineState), OperateScaleGizmoSceneViewEditorService$WonderEditor.setDragStartXAxisNormalizedVec(AxisScaleGizmoSceneViewEditorService$WonderEditor.getXAxisNormalizedVec(editorState, engineState), OperateScaleGizmoSceneViewEditorService$WonderEditor.setDragStartScaleWholeGizmoInvertLocalToWorldMatrixTypeArray(Matrix4Service$Wonderjs.invert(__x, Matrix4Service$Wonderjs.createIdentityMatrix4(/* () */0)), OperateScaleGizmoSceneViewEditorService$WonderEditor.setCurrentSceneTreeNodeStartLocalScale(InitTransformGizmosUtils$WonderEditor.getCurrentSceneTreeNodeLocalScale(editorState, engineState), editorState)))));
                    var editorState$5 = SelectScaleGizmoUtils$WonderEditor.selectScaleGizmo($$event, engineState, editorState$4);
                    match$2 = /* tuple */[
                      editorState$5,
                      engineState
                    ];
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
        }), engineState$1, undefined, /* () */0);
  var engineState$3 = ManageEventEngineService$WonderEditor.onCustomGlobalEvent(SceneViewEventEditorService$WonderEditor.getPointDragOverEventName(/* () */0), (function ($$event, engineState) {
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
        }), engineState$2, undefined, /* () */0);
  var engineState$4 = ManageEventEngineService$WonderEditor.onCustomGlobalEvent(SceneViewEventEditorService$WonderEditor.getPointDragDropEventName(/* () */0), (function ($$event, engineState) {
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
        }), engineState$3, undefined, /* () */0);
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
              }), engineState$4, undefined, /* () */0);
}

function _createTransformGizmos(param) {
  var match = CreateTranslationGizmosUtils$WonderEditor.createTranslationGizmos(param[1]);
  var match$1 = match[3];
  var match$2 = match[2];
  var match$3 = CreateRotationGizmosUtils$WonderEditor.createRotationGizmos(match[0]);
  var match$4 = match$3[2];
  var match$5 = CreateScaleGizmosUtils$WonderEditor.createScaleGizmos(match$3[0]);
  var match$6 = match$5[2];
  var editorState = CreateTransformGizmosUtils$WonderEditor.setToEditorState(/* tuple */[
        match[1],
        /* tuple */[
          match$2[0],
          match$2[1],
          match$2[2]
        ],
        /* tuple */[
          match$1[0],
          match$1[1],
          match$1[2]
        ]
      ], /* tuple */[
        match$3[1],
        /* tuple */[
          match$4[0],
          match$4[1],
          match$4[2]
        ]
      ], /* tuple */[
        match$5[1],
        /* tuple */[
          match$6[0],
          match$6[1],
          match$6[2]
        ],
        match$5[3]
      ], param[0]);
  return /* tuple */[
          editorState,
          match$5[0]
        ];
}

function initJob(_, engineState) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = _createTransformGizmos(/* tuple */[
        editorState,
        engineState
      ]);
  var editorState$1 = match[0];
  var engineState$1 = _bindEvent(editorState$1, match[1]);
  StateEditorService$WonderEditor.setState(editorState$1);
  return engineState$1;
}

export {
  _refreshInspector ,
  _refreshInspectorForRotation ,
  _pushUndoStack ,
  _bindEvent ,
  _createTransformGizmos ,
  initJob ,
  
}
/* AppStore-WonderEditor Not a pure module */
