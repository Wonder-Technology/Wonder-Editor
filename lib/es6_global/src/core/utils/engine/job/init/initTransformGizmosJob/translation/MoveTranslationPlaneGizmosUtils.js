

import * as Log$WonderLog from "../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Matrix4Service$Wonderjs from "../../../../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Matrix4Service.js";
import * as Vector3Service$Wonderjs from "../../../../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Vector3Service.js";
import * as SceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as TransformEngineService$WonderEditor from "../../../../../../../service/state/engine/TransformEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as TransformGameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/TransformGameObjectEngineService.js";
import * as OperateTranslationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/translation/OperateTranslationGizmoSceneViewEditorService.js";

function _isInPXPYPZ(param) {
  if (param[0] > 0 && param[1] > 0) {
    return param[2] > 0;
  } else {
    return false;
  }
}

function _isInPXPYNZ(param) {
  if (param[0] > 0 && param[1] > 0) {
    return param[2] <= 0;
  } else {
    return false;
  }
}

function _isInPXNYPZ(param) {
  if (param[0] > 0 && param[1] <= 0) {
    return param[2] > 0;
  } else {
    return false;
  }
}

function _isInNXPYPZ(param) {
  if (param[0] <= 0 && param[1] > 0) {
    return param[2] > 0;
  } else {
    return false;
  }
}

function _isInPXNYNZ(param) {
  if (param[0] > 0 && param[1] <= 0) {
    return param[2] <= 0;
  } else {
    return false;
  }
}

function _isInNXPYNZ(param) {
  if (param[0] <= 0 && param[1] > 0) {
    return param[2] <= 0;
  } else {
    return false;
  }
}

function _isInNXNYPZ(param) {
  if (param[0] <= 0 && param[1] <= 0) {
    return param[2] > 0;
  } else {
    return false;
  }
}

function _isInNXNYNZ(param) {
  if (param[0] <= 0 && param[1] <= 0) {
    return param[2] <= 0;
  } else {
    return false;
  }
}

function _updatePlaneGizmoLocalPosition(param, editorState, engineState) {
  return TransformGameObjectEngineService$WonderEditor.setLocalPosition(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationYZPlaneGizmo(editorState), param[2], TransformGameObjectEngineService$WonderEditor.setLocalPosition(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXZPlaneGizmo(editorState), param[1], TransformGameObjectEngineService$WonderEditor.setLocalPosition(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXYPlaneGizmo(editorState), param[0], engineState)));
}

function _computePlaneLocalPosition(editorState, engineState) {
  var cameraGameObject = SceneViewEditorService$WonderEditor.unsafeGetEditCamera(editorState);
  var __x = TransformEngineService$WonderEditor.getLocalToWorldMatrixTypeArray(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationWholeGizmo(editorState), engineState), engineState);
  var cameraPosInWholeGizmoLocalCoordSystem = Vector3Service$Wonderjs.transformMat4Tuple(TransformGameObjectEngineService$WonderEditor.getPosition(cameraGameObject, engineState), Matrix4Service$Wonderjs.invert(__x, Matrix4Service$Wonderjs.createIdentityMatrix4(/* () */0)));
  if (_isInPXPYPZ(cameraPosInWholeGizmoLocalCoordSystem)) {
    return /* tuple */[
            /* tuple */[
              1,
              1,
              0
            ],
            /* tuple */[
              1,
              0,
              1
            ],
            /* tuple */[
              0,
              1,
              1
            ]
          ];
  } else if (_isInNXPYPZ(cameraPosInWholeGizmoLocalCoordSystem)) {
    return /* tuple */[
            /* tuple */[
              -1,
              1,
              0
            ],
            /* tuple */[
              -1,
              0,
              1
            ],
            /* tuple */[
              0,
              1,
              1
            ]
          ];
  } else if (_isInPXNYPZ(cameraPosInWholeGizmoLocalCoordSystem)) {
    return /* tuple */[
            /* tuple */[
              1,
              -1,
              0
            ],
            /* tuple */[
              1,
              0,
              1
            ],
            /* tuple */[
              0,
              -1,
              1
            ]
          ];
  } else if (_isInPXPYNZ(cameraPosInWholeGizmoLocalCoordSystem)) {
    return /* tuple */[
            /* tuple */[
              1,
              1,
              0
            ],
            /* tuple */[
              1,
              0,
              -1
            ],
            /* tuple */[
              0,
              1,
              -1
            ]
          ];
  } else if (_isInNXNYPZ(cameraPosInWholeGizmoLocalCoordSystem)) {
    return /* tuple */[
            /* tuple */[
              -1,
              -1,
              0
            ],
            /* tuple */[
              -1,
              0,
              1
            ],
            /* tuple */[
              0,
              -1,
              1
            ]
          ];
  } else if (_isInNXPYNZ(cameraPosInWholeGizmoLocalCoordSystem)) {
    return /* tuple */[
            /* tuple */[
              -1,
              1,
              0
            ],
            /* tuple */[
              -1,
              0,
              -1
            ],
            /* tuple */[
              0,
              1,
              -1
            ]
          ];
  } else if (_isInPXNYNZ(cameraPosInWholeGizmoLocalCoordSystem)) {
    return /* tuple */[
            /* tuple */[
              1,
              -1,
              0
            ],
            /* tuple */[
              1,
              0,
              -1
            ],
            /* tuple */[
              0,
              -1,
              -1
            ]
          ];
  } else if (_isInNXNYNZ(cameraPosInWholeGizmoLocalCoordSystem)) {
    return /* tuple */[
            /* tuple */[
              -1,
              -1,
              0
            ],
            /* tuple */[
              -1,
              0,
              -1
            ],
            /* tuple */[
              0,
              -1,
              -1
            ]
          ];
  } else {
    Log$WonderLog.error(Log$WonderLog.buildErrorMessage("moveTranslationPlaneGizmo", "cameraPosInWholeGizmoLocalCoordSystem: " + (String(cameraPosInWholeGizmoLocalCoordSystem) + " is error"), "", "", ""));
    return /* tuple */[
            /* tuple */[
              0,
              0,
              0
            ],
            /* tuple */[
              0,
              0,
              0
            ],
            /* tuple */[
              0,
              0,
              0
            ]
          ];
  }
}

function moveTranslationPlaneGizmo(editorState, engineState) {
  return _updatePlaneGizmoLocalPosition(_computePlaneLocalPosition(editorState, engineState), editorState, engineState);
}

export {
  _isInPXPYPZ ,
  _isInPXPYNZ ,
  _isInPXNYPZ ,
  _isInNXPYPZ ,
  _isInPXNYNZ ,
  _isInNXPYNZ ,
  _isInNXNYPZ ,
  _isInNXNYNZ ,
  _updatePlaneGizmoLocalPosition ,
  _computePlaneLocalPosition ,
  moveTranslationPlaneGizmo ,
  
}
/* Log-WonderLog Not a pure module */
