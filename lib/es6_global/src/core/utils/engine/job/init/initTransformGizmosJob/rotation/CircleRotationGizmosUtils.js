

import * as Vector3Service$Wonderjs from "../../../../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Vector3Service.js";
import * as Matrix4Service$WonderEditor from "../../../../../../../service/primitive/Matrix4Service.js";
import * as PlaneShapeUtils$WonderEditor from "../../initPickingJob/PlaneShapeUtils.js";
import * as TransformGameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/TransformGameObjectEngineService.js";
import * as OperateRotationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/rotation/OperateRotationGizmoSceneViewEditorService.js";

function getCenterPoint(editorState, engineState) {
  return TransformGameObjectEngineService$WonderEditor.getPosition(OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationWholeGizmo(editorState), engineState);
}

function _buildPlane(axisOfPlane, centerPoint, editorState, engineState) {
  return PlaneShapeUtils$WonderEditor.setFromNormalAndCoplanarPoint(Vector3Service$Wonderjs.normalize(axisOfPlane), centerPoint);
}

function getXYPlaneLocalAxis(param) {
  return /* tuple */[
          0,
          0,
          1
        ];
}

function getXZPlaneLocalAxis(param) {
  return /* tuple */[
          0,
          1,
          0
        ];
}

function getYZPlaneLocalAxis(param) {
  return /* tuple */[
          1,
          0,
          0
        ];
}

function getXAxisOfPlane(editorState, engineState) {
  return Matrix4Service$WonderEditor.extractBasic(TransformGameObjectEngineService$WonderEditor.getLocalToWorldMatrixTypeArray(OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationWholeGizmo(editorState), engineState))[0];
}

function getYAxisOfPlane(editorState, engineState) {
  return Matrix4Service$WonderEditor.extractBasic(TransformGameObjectEngineService$WonderEditor.getLocalToWorldMatrixTypeArray(OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationWholeGizmo(editorState), engineState))[1];
}

function getZAxisOfPlane(editorState, engineState) {
  return Matrix4Service$WonderEditor.extractBasic(TransformGameObjectEngineService$WonderEditor.getLocalToWorldMatrixTypeArray(OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationWholeGizmo(editorState), engineState))[2];
}

function buildXYPlane(editorState, engineState) {
  var centerPoint = TransformGameObjectEngineService$WonderEditor.getPosition(OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationWholeGizmo(editorState), engineState);
  var axisOfPlane = getZAxisOfPlane(editorState, engineState);
  return PlaneShapeUtils$WonderEditor.setFromNormalAndCoplanarPoint(Vector3Service$Wonderjs.normalize(axisOfPlane), centerPoint);
}

function buildXZPlane(editorState, engineState) {
  var centerPoint = TransformGameObjectEngineService$WonderEditor.getPosition(OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationWholeGizmo(editorState), engineState);
  var axisOfPlane = getYAxisOfPlane(editorState, engineState);
  return PlaneShapeUtils$WonderEditor.setFromNormalAndCoplanarPoint(Vector3Service$Wonderjs.normalize(axisOfPlane), centerPoint);
}

function buildYZPlane(editorState, engineState) {
  var centerPoint = TransformGameObjectEngineService$WonderEditor.getPosition(OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationWholeGizmo(editorState), engineState);
  var axisOfPlane = getXAxisOfPlane(editorState, engineState);
  return PlaneShapeUtils$WonderEditor.setFromNormalAndCoplanarPoint(Vector3Service$Wonderjs.normalize(axisOfPlane), centerPoint);
}

export {
  getCenterPoint ,
  _buildPlane ,
  getXYPlaneLocalAxis ,
  getXZPlaneLocalAxis ,
  getYZPlaneLocalAxis ,
  getXAxisOfPlane ,
  getYAxisOfPlane ,
  getZAxisOfPlane ,
  buildXYPlane ,
  buildXZPlane ,
  buildYZPlane ,
  
}
/* PlaneShapeUtils-WonderEditor Not a pure module */
