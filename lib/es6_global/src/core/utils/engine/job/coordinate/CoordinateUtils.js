

import * as Matrix4Service$Wonderjs from "../../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Matrix4Service.js";
import * as Vector3Service$Wonderjs from "../../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Vector3Service.js";
import * as SceneViewEditorService$WonderEditor from "../../../../../service/state/editor/view/sceneView/SceneViewEditorService.js";

function getSceneViewSize(editorState) {
  var match = SceneViewEditorService$WonderEditor.unsafeGetViewRect(editorState);
  return /* tuple */[
          match[2],
          match[3]
        ];
}

function convertMouselocationInViewToNDC(param, param$1) {
  return /* record */[
          /* x */param[0] / param$1[0] * 2 - 1,
          /* y */1 - param[1] / param$1[1] * 2
        ];
}

function convertPosFromWorldToLocalCoordSystem(pos, mMatrix, engineState) {
  return Vector3Service$Wonderjs.transformMat4Tuple(pos, Matrix4Service$Wonderjs.invert(mMatrix, Matrix4Service$Wonderjs.createIdentityMatrix4(/* () */0)));
}

export {
  getSceneViewSize ,
  convertMouselocationInViewToNDC ,
  convertPosFromWorldToLocalCoordSystem ,
  
}
/* Matrix4Service-Wonderjs Not a pure module */
