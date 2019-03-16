

import * as OptionService$WonderEditor from "../../../../../../primitive/OptionService.js";
import * as RecordRotationGizmoSceneViewEditorService$WonderEditor from "./RecordRotationGizmoSceneViewEditorService.js";
import * as RecordTransformGizmoSceneViewEditorService$WonderEditor from "../RecordTransformGizmoSceneViewEditorService.js";

function unsafeGetDragStartPoint(editorState) {
  return OptionService$WonderEditor.unsafeGet(RecordRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* dragStartPoint */7]);
}

function setDragStartPoint(dragStartPoint, editorState) {
  var init = editorState[/* sceneViewRecord */3];
  var init$1 = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState);
  var init$2 = RecordRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState);
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord : record */[
            /* viewRect */init[/* viewRect */0],
            /* gridPlane */init[/* gridPlane */1],
            /* editCamera */init[/* editCamera */2],
            /* transformGizmoData *//* record */[
              /* currentGizmoType */init$1[/* currentGizmoType */0],
              /* coordinateSystem */init$1[/* coordinateSystem */1],
              /* translationGizmoData */init$1[/* translationGizmoData */2],
              /* rotationGizmoData : record */[
                /* rotationWholeGizmo */init$2[/* rotationWholeGizmo */0],
                /* rotationXZCircle */init$2[/* rotationXZCircle */1],
                /* rotationXYCircle */init$2[/* rotationXYCircle */2],
                /* rotationYZCircle */init$2[/* rotationYZCircle */3],
                /* isXZCircleGizmoSelected */init$2[/* isXZCircleGizmoSelected */4],
                /* isXYCircleGizmoSelected */init$2[/* isXYCircleGizmoSelected */5],
                /* isYZCircleGizmoSelected */init$2[/* isYZCircleGizmoSelected */6],
                /* dragStartPoint */dragStartPoint,
                /* lastTotalAngle */init$2[/* lastTotalAngle */8],
                /* currentSceneTreeNodeStartLocalEulerAngles */init$2[/* currentSceneTreeNodeStartLocalEulerAngles */9]
              ],
              /* scaleGizmoData */init$1[/* scaleGizmoData */4]
            ]
          ],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13],
          /* languageType */editorState[/* languageType */14]
        ];
}

function getLastTotalAngle(editorState) {
  return RecordRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* lastTotalAngle */8];
}

function setLastTotalAngle(lastTotalAngle, editorState) {
  var init = editorState[/* sceneViewRecord */3];
  var init$1 = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState);
  var init$2 = RecordRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState);
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord : record */[
            /* viewRect */init[/* viewRect */0],
            /* gridPlane */init[/* gridPlane */1],
            /* editCamera */init[/* editCamera */2],
            /* transformGizmoData *//* record */[
              /* currentGizmoType */init$1[/* currentGizmoType */0],
              /* coordinateSystem */init$1[/* coordinateSystem */1],
              /* translationGizmoData */init$1[/* translationGizmoData */2],
              /* rotationGizmoData : record */[
                /* rotationWholeGizmo */init$2[/* rotationWholeGizmo */0],
                /* rotationXZCircle */init$2[/* rotationXZCircle */1],
                /* rotationXYCircle */init$2[/* rotationXYCircle */2],
                /* rotationYZCircle */init$2[/* rotationYZCircle */3],
                /* isXZCircleGizmoSelected */init$2[/* isXZCircleGizmoSelected */4],
                /* isXYCircleGizmoSelected */init$2[/* isXYCircleGizmoSelected */5],
                /* isYZCircleGizmoSelected */init$2[/* isYZCircleGizmoSelected */6],
                /* dragStartPoint */init$2[/* dragStartPoint */7],
                /* lastTotalAngle */lastTotalAngle,
                /* currentSceneTreeNodeStartLocalEulerAngles */init$2[/* currentSceneTreeNodeStartLocalEulerAngles */9]
              ],
              /* scaleGizmoData */init$1[/* scaleGizmoData */4]
            ]
          ],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13],
          /* languageType */editorState[/* languageType */14]
        ];
}

export {
  unsafeGetDragStartPoint ,
  setDragStartPoint ,
  getLastTotalAngle ,
  setLastTotalAngle ,
  
}
/* OptionService-WonderEditor Not a pure module */
