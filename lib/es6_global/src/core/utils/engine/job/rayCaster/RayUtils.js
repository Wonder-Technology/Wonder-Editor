

import * as Matrix4Service$Wonderjs from "../../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Matrix4Service.js";
import * as Vector3Service$Wonderjs from "../../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Vector3Service.js";
import * as OptionService$WonderEditor from "../../../../../service/primitive/OptionService.js";
import * as Vector3Service$WonderEditor from "../../../../../service/primitive/Vector3Service.js";
import * as CoordinateUtils$WonderEditor from "../coordinate/CoordinateUtils.js";
import * as PlaneShapeUtils$WonderEditor from "../init/initPickingJob/PlaneShapeUtils.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../../../service/state/engine/camera/BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as PerspectiveCameraProjectionEngineService$WonderEditor from "../../../../../service/state/engine/camera/PerspectiveCameraProjectionEngineService.js";

function _createPerspectiveCameraRay(param, param$1) {
  var cameraToWorldMatrix = param$1[/* cameraToWorldMatrix */0];
  var origin = Matrix4Service$Wonderjs.getTranslationTuple(cameraToWorldMatrix);
  var __x = Vector3Service$WonderEditor.unproject(/* tuple */[
        param[/* x */0],
        param[/* y */1],
        -1.0
      ], cameraToWorldMatrix, param$1[/* projectionMatrix */1]);
  return /* record */[
          /* origin */origin,
          /* direction */Vector3Service$Wonderjs.normalize(Vector3Service$Wonderjs.sub(/* Float */0, __x, origin))
        ];
}

function _getPerspectiveCameraData(cameraGameObject, param) {
  var engineState = param[1];
  var __x = BasicCameraViewEngineService$WonderEditor.getBasicCameraViewWorldToCameraMatrix(GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(cameraGameObject, engineState), engineState);
  return /* record */[
          /* cameraToWorldMatrix */Matrix4Service$Wonderjs.invert(__x, Matrix4Service$Wonderjs.createIdentityMatrix4(/* () */0)),
          /* projectionMatrix */PerspectiveCameraProjectionEngineService$WonderEditor.unsafeGetPerspectiveCameraProjectionPMatrix(GameObjectComponentEngineService$WonderEditor.unsafeGetPerspectiveCameraProjectionComponent(cameraGameObject, engineState), engineState)
        ];
}

function createPerspectiveCameraRayFromEvent(param, cameraGameObject, param$1) {
  var editorState = param$1[0];
  var match = OptionService$WonderEditor.unsafeGet(param[/* userData */4]);
  return _createPerspectiveCameraRay(CoordinateUtils$WonderEditor.convertMouselocationInViewToNDC(match[/* locationInView */2], CoordinateUtils$WonderEditor.getSceneViewSize(editorState)), _getPerspectiveCameraData(cameraGameObject, /* tuple */[
                  editorState,
                  param$1[1]
                ]));
}

function applyMatrix4(param, mat4) {
  var origin = param[/* origin */0];
  var __x = Vector3Service$Wonderjs.add(/* Float */0, param[/* direction */1], origin);
  var direction = Vector3Service$Wonderjs.transformMat4Tuple(__x, mat4);
  var origin$1 = Vector3Service$Wonderjs.transformMat4Tuple(origin, mat4);
  return /* record */[
          /* origin */origin$1,
          /* direction */Vector3Service$Wonderjs.normalize(Vector3Service$Wonderjs.sub(/* Float */0, direction, origin$1))
        ];
}

function distanceToPlane(plane, ray) {
  var origin = ray[/* origin */0];
  var normal = plane[/* normal */0];
  var denominator = Vector3Service$WonderEditor.dot(normal, ray[/* direction */1]);
  var match = denominator === 0;
  if (match) {
    var match$1 = PlaneShapeUtils$WonderEditor.distanceToPoint(origin, plane) === 0;
    if (match$1) {
      return 0;
    } else {
      return undefined;
    }
  } else {
    return -(Vector3Service$WonderEditor.dot(origin, normal) + plane[/* constant */1]) / denominator;
  }
}

export {
  _createPerspectiveCameraRay ,
  _getPerspectiveCameraData ,
  createPerspectiveCameraRayFromEvent ,
  applyMatrix4 ,
  distanceToPlane ,
  
}
/* Matrix4Service-Wonderjs Not a pure module */
