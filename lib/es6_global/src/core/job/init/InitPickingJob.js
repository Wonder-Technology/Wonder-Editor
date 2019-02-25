

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_obj from "../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Js_option from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as RayUtils$WonderEditor from "../../utils/engine/job/rayCaster/RayUtils.js";
import * as MeshUtils$WonderEditor from "../../utils/engine/job/init/initPickingJob/MeshUtils.js";
import * as Vector3Service$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Vector3Service.js";
import * as ArrayService$WonderEditor from "../../../service/atom/ArrayService.js";
import * as OptionService$WonderEditor from "../../../service/primitive/OptionService.js";
import * as PickIMGUIUtils$WonderEditor from "../../utils/engine/job/init/initPickingJob/PickIMGUIUtils.js";
import * as UIStateService$WonderEditor from "../../../service/state/ui/UIStateService.js";
import * as Vector3Service$WonderEditor from "../../../service/primitive/Vector3Service.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SphereShapeUtils$WonderEditor from "../../utils/engine/job/init/initPickingJob/SphereShapeUtils.js";
import * as MouseEventService$WonderEditor from "../../../service/record/editor/event/MouseEventService.js";
import * as RayIntersectUtils$WonderEditor from "../../utils/engine/job/rayCaster/RayIntersectUtils.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../service/state/engine/state/StateEngineService.js";
import * as PickingEditorService$WonderEditor from "../../../service/state/editor/picking/PickingEditorService.js";
import * as GeometryEngineService$WonderEditor from "../../../service/state/engine/GeometryEngineService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as SceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as TransformEngineService$WonderEditor from "../../../service/state/engine/TransformEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as ManageEventEngineService$WonderEditor from "../../../service/state/engine/event/ManageEventEngineService.js";
import * as InspectorRenderGroupUtils$WonderEditor from "../../composable_component/mainEditor/composable_component/inspector/utils/InspectorRenderGroupUtils.js";
import * as SceneViewEventEditorService$WonderEditor from "../../../service/state/editor/event/SceneViewEventEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";
import * as SceneTreeSelectCurrentNodeEventHandler$WonderEditor from "../../composable_component/mainEditor/composable_component/left_components/composable_component/sceneTree/eventHandler/SceneTreeSelectCurrentNodeEventHandler.js";
import * as SelectTransformGizmoSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/SelectTransformGizmoSceneViewEditorService.js";

function _checkIntersectMesh(ray, param, engineState) {
  var localToWorldMatrixTypeArray = param[3];
  return Js_option.andThen((function (intersectedPoint) {
                return Vector3Service$Wonderjs.transformMat4Tuple(intersectedPoint, localToWorldMatrixTypeArray);
              }), MeshUtils$WonderEditor.checkIntersectMesh(ray, /* tuple */[
                  param[2],
                  localToWorldMatrixTypeArray,
                  /* Back */0
                ], engineState));
}

function _isIntersectSphere(ray, param, param$1) {
  return RayIntersectUtils$WonderEditor.isIntersectSphere(SphereShapeUtils$WonderEditor.applyMatrix4(PickingEditorService$WonderEditor.unsafeGetSphereShape(param[2], param$1[0]), param[3]), ray);
}

function _getDistanceToCamera(intersectedPoint, cameraPos, _) {
  return Vector3Service$WonderEditor.length(Vector3Service$Wonderjs.sub(/* Float */0, intersectedPoint, cameraPos));
}

function _getTopOne(cameraGameObject, engineState, intersectedDatas) {
  var cameraPos = TransformEngineService$WonderEditor.getPosition(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(cameraGameObject, engineState), engineState);
  return Js_option.map((function (param) {
                return param[0];
              }), ArrayService$WonderEditor.getFirst(intersectedDatas.sort((function (param, param$1) {
                        return _getDistanceToCamera(param[1], cameraPos, engineState) - _getDistanceToCamera(param$1[1], cameraPos, engineState);
                      }))));
}

function _isCurrentSceneTreeNode(gameObject, currentSceneTreeNodeOpt) {
  if (currentSceneTreeNodeOpt !== undefined) {
    return Caml_obj.caml_equal(gameObject, Js_primitive.valFromOption(currentSceneTreeNodeOpt));
  } else {
    return false;
  }
}

function _findTopRootGameObject(param, gameObjectOpt) {
  var engineState = param[1];
  var currentSceneTreeNodeOpt = SceneTreeEditorService$WonderEditor.getCurrentSceneTreeNode(param[0]);
  return Js_option.map((function (gameObject) {
                var _gameObject = gameObject;
                var _rootGameObject = gameObject;
                var currentSceneTreeNodeOpt$1 = currentSceneTreeNodeOpt;
                var engineState$1 = engineState;
                while(true) {
                  var rootGameObject = _rootGameObject;
                  var gameObject$1 = _gameObject;
                  var match = HierarchyGameObjectEngineService$WonderEditor.getParentGameObject(gameObject$1, engineState$1);
                  if (match !== undefined) {
                    var parentGameObject = match;
                    var match$1 = _isCurrentSceneTreeNode(parentGameObject, currentSceneTreeNodeOpt$1);
                    if (match$1) {
                      return rootGameObject;
                    } else {
                      var match$2 = GameObjectEngineService$WonderEditor.unsafeGetGameObjectIsRoot(parentGameObject, engineState$1);
                      _rootGameObject = match$2 ? parentGameObject : rootGameObject;
                      _gameObject = parentGameObject;
                      continue ;
                    }
                  } else {
                    return rootGameObject;
                  }
                };
              }), gameObjectOpt);
}

function _getAllGameObjectData(engineState) {
  return HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState).filter((function (gameObject) {
                  if (GameObjectComponentEngineService$WonderEditor.hasGeometryComponent(gameObject, engineState)) {
                    return InspectorRenderGroupUtils$WonderEditor.hasRenderGroupComponents(gameObject, engineState);
                  } else {
                    return false;
                  }
                })).map((function (gameObject) {
                var transform = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState);
                return /* tuple */[
                        gameObject,
                        transform,
                        GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(gameObject, engineState),
                        TransformEngineService$WonderEditor.getLocalToWorldMatrixTypeArray(transform, engineState)
                      ];
              }));
}

function _computeSphereShapeData(allGameObjectData, param) {
  var engineState = param[1];
  return ArrayService$WonderCommonlib.reduceOneParam((function (editorState, param) {
                var geometry = param[2];
                var match = PickingEditorService$WonderEditor.getSphereShape(geometry, editorState);
                if (match !== undefined) {
                  return editorState;
                } else {
                  return PickingEditorService$WonderEditor.setSphereShape(geometry, SphereShapeUtils$WonderEditor.setFromPoints(GeometryEngineService$WonderEditor.getGeometryVertices(geometry, engineState)), editorState);
                }
              }), param[0], allGameObjectData);
}

function _findPickedOne($$event, allGameObjectData, param) {
  var engineState = param[1];
  var editorState = param[0];
  var cameraGameObject = SceneViewEditorService$WonderEditor.unsafeGetEditCamera(editorState);
  var ray = RayUtils$WonderEditor.createPerspectiveCameraRayFromEvent($$event, cameraGameObject, /* tuple */[
        editorState,
        engineState
      ]);
  return _findTopRootGameObject(/* tuple */[
              editorState,
              engineState
            ], _getTopOne(cameraGameObject, engineState, allGameObjectData.filter((function (data) {
                              return _isIntersectSphere(ray, data, /* tuple */[
                                          editorState,
                                          engineState
                                        ]);
                            })).map((function (data) {
                            return /* tuple */[
                                    data[0],
                                    _checkIntersectMesh(ray, data, engineState)
                                  ];
                          })).filter((function (param) {
                          return Js_option.isSome(param[1]);
                        })).map((function (param) {
                        return /* tuple */[
                                param[0],
                                OptionService$WonderEditor.unsafeGet(param[1])
                              ];
                      }))));
}

function _isNotNeedPushToHistoryStack(pickedGameObjectOpt) {
  if (pickedGameObjectOpt !== undefined) {
    var match = StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.getCurrentSceneTreeNode);
    if (match !== undefined) {
      return match === pickedGameObjectOpt;
    } else {
      return false;
    }
  } else {
    return !StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.hasCurrentSceneTreeNode);
  }
}

function _handleSceneTreeCurrentNodeAndRedoUndo(pickedGameObjectOpt, engineState) {
  StateEngineService$WonderEditor.setState(engineState);
  var uiState = UIStateService$WonderEditor.getState(/* () */0);
  var dispatchFunc = UIStateService$WonderEditor.getDispatch(/* () */0);
  var match = _isNotNeedPushToHistoryStack(pickedGameObjectOpt);
  if (match) {
    SceneTreeSelectCurrentNodeEventHandler$WonderEditor.CustomEventHandler[/* handleSelfLogic */3](/* tuple */[
          uiState,
          dispatchFunc
        ], /* () */0, pickedGameObjectOpt);
  } else {
    Curry._3(SceneTreeSelectCurrentNodeEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
          uiState,
          dispatchFunc
        ], /* () */0, pickedGameObjectOpt);
  }
  return StateEngineService$WonderEditor.unsafeGetState(/* () */0);
}

function _handlePickSuccess(gameObject, engineState) {
  return _handleSceneTreeCurrentNodeAndRedoUndo(gameObject, engineState);
}

function _handlePickFail(engineState) {
  return _handleSceneTreeCurrentNodeAndRedoUndo(undefined, engineState);
}

function _handlePicking($$event, engineState) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = PickIMGUIUtils$WonderEditor.findPickedIMGUIGameObject($$event, editorState, engineState);
  var match$1;
  if (match !== undefined) {
    match$1 = /* tuple */[
      editorState,
      Js_primitive.valFromOption(match)
    ];
  } else {
    var allGameObjectData = _getAllGameObjectData(engineState);
    var editorState$1 = _computeSphereShapeData(allGameObjectData, /* tuple */[
          editorState,
          engineState
        ]);
    match$1 = /* tuple */[
      editorState$1,
      _findPickedOne($$event, allGameObjectData, /* tuple */[
            editorState$1,
            engineState
          ])
    ];
  }
  var pickedGameObject = match$1[1];
  StateEditorService$WonderEditor.setState(match$1[0]);
  var engineState$1 = pickedGameObject !== undefined ? _handleSceneTreeCurrentNodeAndRedoUndo(pickedGameObject, engineState) : _handleSceneTreeCurrentNodeAndRedoUndo(undefined, engineState);
  var engineState$2 = StateLogicService$WonderEditor.renderWhenStop(engineState$1);
  return /* tuple */[
          engineState$2,
          $$event
        ];
}

function _isHandlePicking($$event, editorState) {
  if (MouseEventService$WonderEditor.isLeftMouseButton($$event)) {
    return !SelectTransformGizmoSceneViewEditorService$WonderEditor.isSelectAnyTransformGizmo(editorState);
  } else {
    return false;
  }
}

function initJob(_, engineState) {
  return ManageEventEngineService$WonderEditor.onCustomGlobalEvent(SceneViewEventEditorService$WonderEditor.getPointTapEventName(/* () */0), (function ($$event, engineState) {
                var match = _isHandlePicking($$event, StateEditorService$WonderEditor.getState(/* () */0));
                if (match) {
                  return _handlePicking($$event, engineState);
                } else {
                  return /* tuple */[
                          engineState,
                          $$event
                        ];
                }
              }), engineState, undefined, /* () */0);
}

export {
  _checkIntersectMesh ,
  _isIntersectSphere ,
  _getDistanceToCamera ,
  _getTopOne ,
  _isCurrentSceneTreeNode ,
  _findTopRootGameObject ,
  _getAllGameObjectData ,
  _computeSphereShapeData ,
  _findPickedOne ,
  _isNotNeedPushToHistoryStack ,
  _handleSceneTreeCurrentNodeAndRedoUndo ,
  _handlePickSuccess ,
  _handlePickFail ,
  _handlePicking ,
  _isHandlePicking ,
  initJob ,
  
}
/* RayUtils-WonderEditor Not a pure module */
