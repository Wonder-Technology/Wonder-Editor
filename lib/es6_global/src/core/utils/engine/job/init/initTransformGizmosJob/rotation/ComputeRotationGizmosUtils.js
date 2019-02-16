

import * as Vector3Service$Wonderjs from "../../../../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Vector3Service.js";
import * as CameraPosUtils$WonderEditor from "./CameraPosUtils.js";
import * as Vector3Service$WonderEditor from "../../../../../../../service/primitive/Vector3Service.js";
import * as CircleRotationGizmosUtils$WonderEditor from "./CircleRotationGizmosUtils.js";

function _isCenterToCameraAndNormalOfCirclePlaneNearlyPerpendicular(cameraPos, centerPoint, normalOfCirclePlane) {
  var cosVal = Vector3Service$WonderEditor.dot(Vector3Service$Wonderjs.normalize(Vector3Service$Wonderjs.sub(/* Float */0, cameraPos, centerPoint)), Vector3Service$Wonderjs.normalize(normalOfCirclePlane));
  if (cosVal <= 0.2) {
    return cosVal >= -0.2;
  } else {
    return false;
  }
}

function isGizmoUnUsed(gizmoType, editorState, engineState) {
  var cameraPos = CameraPosUtils$WonderEditor.getCameraPos(editorState, engineState);
  var centerPoint = CircleRotationGizmosUtils$WonderEditor.getCenterPoint(editorState, engineState);
  switch (gizmoType) {
    case 0 : 
        return _isCenterToCameraAndNormalOfCirclePlaneNearlyPerpendicular(cameraPos, centerPoint, CircleRotationGizmosUtils$WonderEditor.getZAxisOfPlane(editorState, engineState));
    case 1 : 
        return _isCenterToCameraAndNormalOfCirclePlaneNearlyPerpendicular(cameraPos, centerPoint, CircleRotationGizmosUtils$WonderEditor.getYAxisOfPlane(editorState, engineState));
    case 2 : 
        return _isCenterToCameraAndNormalOfCirclePlaneNearlyPerpendicular(cameraPos, centerPoint, CircleRotationGizmosUtils$WonderEditor.getXAxisOfPlane(editorState, engineState));
    
  }
}

export {
  _isCenterToCameraAndNormalOfCirclePlaneNearlyPerpendicular ,
  isGizmoUnUsed ,
  
}
/* CameraPosUtils-WonderEditor Not a pure module */
