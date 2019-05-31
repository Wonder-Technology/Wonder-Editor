

import * as RecordRotationGizmoSceneViewEditorService$WonderEditor from "./RecordRotationGizmoSceneViewEditorService.js";
import * as RecordTransformGizmoSceneViewEditorService$WonderEditor from "../RecordTransformGizmoSceneViewEditorService.js";

function markNotSelectAnyRotationGizmo(editorState) {
  var init = editorState[/* sceneViewRecord */6];
  var init$1 = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState);
  var init$2 = RecordRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState);
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */editorState[/* assetRecord */5],
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
          /* gameViewRecord */editorState[/* gameViewRecord */7],
          /* eventRecord */editorState[/* eventRecord */8],
          /* imguiRecord */editorState[/* imguiRecord */9],
          /* inspectorRecord */editorState[/* inspectorRecord */10],
          /* consoleRecord */editorState[/* consoleRecord */11],
          /* transformRecord */editorState[/* transformRecord */12],
          /* pickingRecord */editorState[/* pickingRecord */13],
          /* currentDragSource */editorState[/* currentDragSource */14],
          /* currentSelectSource */editorState[/* currentSelectSource */15],
          /* loopId */editorState[/* loopId */16],
          /* languageType */editorState[/* languageType */17]
        ];
}

function onlySelectXYCircleGizmo(editorState) {
  var editorState$1 = markNotSelectAnyRotationGizmo(editorState);
  var init = editorState$1[/* sceneViewRecord */6];
  var init$1 = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
  var init$2 = RecordRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
  return /* record */[
          /* inspectorCanvasRecord */editorState$1[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState$1[/* imgCanvasRecord */1],
          /* uiRecord */editorState$1[/* uiRecord */2],
          /* settingRecord */editorState$1[/* settingRecord */3],
          /* sceneTreeRecord */editorState$1[/* sceneTreeRecord */4],
          /* assetRecord */editorState$1[/* assetRecord */5],
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
          /* gameViewRecord */editorState$1[/* gameViewRecord */7],
          /* eventRecord */editorState$1[/* eventRecord */8],
          /* imguiRecord */editorState$1[/* imguiRecord */9],
          /* inspectorRecord */editorState$1[/* inspectorRecord */10],
          /* consoleRecord */editorState$1[/* consoleRecord */11],
          /* transformRecord */editorState$1[/* transformRecord */12],
          /* pickingRecord */editorState$1[/* pickingRecord */13],
          /* currentDragSource */editorState$1[/* currentDragSource */14],
          /* currentSelectSource */editorState$1[/* currentSelectSource */15],
          /* loopId */editorState$1[/* loopId */16],
          /* languageType */editorState$1[/* languageType */17]
        ];
}

function onlySelectXZCircleGizmo(editorState) {
  var editorState$1 = markNotSelectAnyRotationGizmo(editorState);
  var init = editorState$1[/* sceneViewRecord */6];
  var init$1 = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
  var init$2 = RecordRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
  return /* record */[
          /* inspectorCanvasRecord */editorState$1[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState$1[/* imgCanvasRecord */1],
          /* uiRecord */editorState$1[/* uiRecord */2],
          /* settingRecord */editorState$1[/* settingRecord */3],
          /* sceneTreeRecord */editorState$1[/* sceneTreeRecord */4],
          /* assetRecord */editorState$1[/* assetRecord */5],
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
          /* gameViewRecord */editorState$1[/* gameViewRecord */7],
          /* eventRecord */editorState$1[/* eventRecord */8],
          /* imguiRecord */editorState$1[/* imguiRecord */9],
          /* inspectorRecord */editorState$1[/* inspectorRecord */10],
          /* consoleRecord */editorState$1[/* consoleRecord */11],
          /* transformRecord */editorState$1[/* transformRecord */12],
          /* pickingRecord */editorState$1[/* pickingRecord */13],
          /* currentDragSource */editorState$1[/* currentDragSource */14],
          /* currentSelectSource */editorState$1[/* currentSelectSource */15],
          /* loopId */editorState$1[/* loopId */16],
          /* languageType */editorState$1[/* languageType */17]
        ];
}

function onlySelectYZCircleGizmo(editorState) {
  var editorState$1 = markNotSelectAnyRotationGizmo(editorState);
  var init = editorState$1[/* sceneViewRecord */6];
  var init$1 = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
  var init$2 = RecordRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
  return /* record */[
          /* inspectorCanvasRecord */editorState$1[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState$1[/* imgCanvasRecord */1],
          /* uiRecord */editorState$1[/* uiRecord */2],
          /* settingRecord */editorState$1[/* settingRecord */3],
          /* sceneTreeRecord */editorState$1[/* sceneTreeRecord */4],
          /* assetRecord */editorState$1[/* assetRecord */5],
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
          /* gameViewRecord */editorState$1[/* gameViewRecord */7],
          /* eventRecord */editorState$1[/* eventRecord */8],
          /* imguiRecord */editorState$1[/* imguiRecord */9],
          /* inspectorRecord */editorState$1[/* inspectorRecord */10],
          /* consoleRecord */editorState$1[/* consoleRecord */11],
          /* transformRecord */editorState$1[/* transformRecord */12],
          /* pickingRecord */editorState$1[/* pickingRecord */13],
          /* currentDragSource */editorState$1[/* currentDragSource */14],
          /* currentSelectSource */editorState$1[/* currentSelectSource */15],
          /* loopId */editorState$1[/* loopId */16],
          /* languageType */editorState$1[/* languageType */17]
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
