

import * as RecordRotationGizmoSceneViewEditorService$WonderEditor from "./RecordRotationGizmoSceneViewEditorService.js";
import * as RecordTransformGizmoSceneViewEditorService$WonderEditor from "../RecordTransformGizmoSceneViewEditorService.js";

function markNotSelectAnyRotationGizmo(editorState) {
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
                /* isXZCircleGizmoSelected */false,
                /* isXYCircleGizmoSelected */false,
                /* isYZCircleGizmoSelected */false,
                /* dragStartPoint */init$2[/* dragStartPoint */7],
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

function onlySelectXYCircleGizmo(editorState) {
  var editorState$1 = markNotSelectAnyRotationGizmo(editorState);
  var init = editorState$1[/* sceneViewRecord */3];
  var init$1 = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
  var init$2 = RecordRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
  return /* record */[
          /* settingRecord */editorState$1[/* settingRecord */0],
          /* sceneTreeRecord */editorState$1[/* sceneTreeRecord */1],
          /* assetRecord */editorState$1[/* assetRecord */2],
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
                /* isXYCircleGizmoSelected */true,
                /* isYZCircleGizmoSelected */init$2[/* isYZCircleGizmoSelected */6],
                /* dragStartPoint */init$2[/* dragStartPoint */7],
                /* lastTotalAngle */init$2[/* lastTotalAngle */8],
                /* currentSceneTreeNodeStartLocalEulerAngles */init$2[/* currentSceneTreeNodeStartLocalEulerAngles */9]
              ],
              /* scaleGizmoData */init$1[/* scaleGizmoData */4]
            ]
          ],
          /* gameViewRecord */editorState$1[/* gameViewRecord */4],
          /* eventRecord */editorState$1[/* eventRecord */5],
          /* imguiRecord */editorState$1[/* imguiRecord */6],
          /* inspectorRecord */editorState$1[/* inspectorRecord */7],
          /* consoleRecord */editorState$1[/* consoleRecord */8],
          /* transformRecord */editorState$1[/* transformRecord */9],
          /* pickingRecord */editorState$1[/* pickingRecord */10],
          /* currentDragSource */editorState$1[/* currentDragSource */11],
          /* currentSelectSource */editorState$1[/* currentSelectSource */12],
          /* loopId */editorState$1[/* loopId */13],
          /* languageType */editorState$1[/* languageType */14]
        ];
}

function onlySelectXZCircleGizmo(editorState) {
  var editorState$1 = markNotSelectAnyRotationGizmo(editorState);
  var init = editorState$1[/* sceneViewRecord */3];
  var init$1 = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
  var init$2 = RecordRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
  return /* record */[
          /* settingRecord */editorState$1[/* settingRecord */0],
          /* sceneTreeRecord */editorState$1[/* sceneTreeRecord */1],
          /* assetRecord */editorState$1[/* assetRecord */2],
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
                /* isXZCircleGizmoSelected */true,
                /* isXYCircleGizmoSelected */init$2[/* isXYCircleGizmoSelected */5],
                /* isYZCircleGizmoSelected */init$2[/* isYZCircleGizmoSelected */6],
                /* dragStartPoint */init$2[/* dragStartPoint */7],
                /* lastTotalAngle */init$2[/* lastTotalAngle */8],
                /* currentSceneTreeNodeStartLocalEulerAngles */init$2[/* currentSceneTreeNodeStartLocalEulerAngles */9]
              ],
              /* scaleGizmoData */init$1[/* scaleGizmoData */4]
            ]
          ],
          /* gameViewRecord */editorState$1[/* gameViewRecord */4],
          /* eventRecord */editorState$1[/* eventRecord */5],
          /* imguiRecord */editorState$1[/* imguiRecord */6],
          /* inspectorRecord */editorState$1[/* inspectorRecord */7],
          /* consoleRecord */editorState$1[/* consoleRecord */8],
          /* transformRecord */editorState$1[/* transformRecord */9],
          /* pickingRecord */editorState$1[/* pickingRecord */10],
          /* currentDragSource */editorState$1[/* currentDragSource */11],
          /* currentSelectSource */editorState$1[/* currentSelectSource */12],
          /* loopId */editorState$1[/* loopId */13],
          /* languageType */editorState$1[/* languageType */14]
        ];
}

function onlySelectYZCircleGizmo(editorState) {
  var editorState$1 = markNotSelectAnyRotationGizmo(editorState);
  var init = editorState$1[/* sceneViewRecord */3];
  var init$1 = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
  var init$2 = RecordRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
  return /* record */[
          /* settingRecord */editorState$1[/* settingRecord */0],
          /* sceneTreeRecord */editorState$1[/* sceneTreeRecord */1],
          /* assetRecord */editorState$1[/* assetRecord */2],
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
                /* isYZCircleGizmoSelected */true,
                /* dragStartPoint */init$2[/* dragStartPoint */7],
                /* lastTotalAngle */init$2[/* lastTotalAngle */8],
                /* currentSceneTreeNodeStartLocalEulerAngles */init$2[/* currentSceneTreeNodeStartLocalEulerAngles */9]
              ],
              /* scaleGizmoData */init$1[/* scaleGizmoData */4]
            ]
          ],
          /* gameViewRecord */editorState$1[/* gameViewRecord */4],
          /* eventRecord */editorState$1[/* eventRecord */5],
          /* imguiRecord */editorState$1[/* imguiRecord */6],
          /* inspectorRecord */editorState$1[/* inspectorRecord */7],
          /* consoleRecord */editorState$1[/* consoleRecord */8],
          /* transformRecord */editorState$1[/* transformRecord */9],
          /* pickingRecord */editorState$1[/* pickingRecord */10],
          /* currentDragSource */editorState$1[/* currentDragSource */11],
          /* currentSelectSource */editorState$1[/* currentSelectSource */12],
          /* loopId */editorState$1[/* loopId */13],
          /* languageType */editorState$1[/* languageType */14]
        ];
}

function isXYCircleGizmoSelected(editorState) {
  return RecordRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* isXYCircleGizmoSelected */5];
}

function isXZCircleGizmoSelected(editorState) {
  return RecordRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* isXZCircleGizmoSelected */4];
}

function isYZCircleGizmoSelected(editorState) {
  return RecordRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* isYZCircleGizmoSelected */6];
}

function isSelectAnyRotationGizmo(editorState) {
  var match = RecordRotationGizmoSceneViewEditorService$WonderEditor.getData(editorState);
  if (match !== undefined) {
    if (RecordRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* isXYCircleGizmoSelected */5] || RecordRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* isXZCircleGizmoSelected */4]) {
      return true;
    } else {
      return RecordRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* isYZCircleGizmoSelected */6];
    }
  } else {
    return false;
  }
}

export {
  markNotSelectAnyRotationGizmo ,
  onlySelectXYCircleGizmo ,
  onlySelectXZCircleGizmo ,
  onlySelectYZCircleGizmo ,
  isXYCircleGizmoSelected ,
  isXZCircleGizmoSelected ,
  isYZCircleGizmoSelected ,
  isSelectAnyRotationGizmo ,
  
}
/* RecordRotationGizmoSceneViewEditorService-WonderEditor Not a pure module */
