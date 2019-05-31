

import * as OptionService$WonderEditor from "../../../../../../primitive/OptionService.js";
import * as RecordTransformGizmoSceneViewEditorService$WonderEditor from "../RecordTransformGizmoSceneViewEditorService.js";
import * as RecordTranslationGizmoSceneViewEditorService$WonderEditor from "./RecordTranslationGizmoSceneViewEditorService.js";

function unsafeGetTranslationWholeGizmo(editorState) {
  return RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* translationWholeGizmo */0];
}

function unsafeGetTranslationXAxisGizmo(editorState) {
  return RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* translationXAxisGizmo */1];
}

function unsafeGetTranslationYAxisGizmo(editorState) {
  return RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* translationYAxisGizmo */2];
}

function unsafeGetTranslationZAxisGizmo(editorState) {
  return RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* translationZAxisGizmo */3];
}

function unsafeGetTranslationXYPlaneGizmo(editorState) {
  return RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* translationXYPlaneGizmo */4];
}

function unsafeGetTranslationXZPlaneGizmo(editorState) {
  return RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* translationXZPlaneGizmo */5];
}

function unsafeGetTranslationYZPlaneGizmo(editorState) {
  return RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* translationYZPlaneGizmo */6];
}

function unsafeGetCurrentSceneTreeNodeStartPoint(editorState) {
  return OptionService$WonderEditor.unsafeGet(RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* currentSceneTreeNodeStartPoint */13]);
}

function setCurrentSceneTreeNodeStartPoint(currentSceneTreeNodeStartPoint, editorState) {
  var init = editorState[/* sceneViewRecord */6];
  var init$1 = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState);
  var init$2 = RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState);
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
              /* translationGizmoData : record */[
                /* translationWholeGizmo */init$2[/* translationWholeGizmo */0],
                /* translationXAxisGizmo */init$2[/* translationXAxisGizmo */1],
                /* translationYAxisGizmo */init$2[/* translationYAxisGizmo */2],
                /* translationZAxisGizmo */init$2[/* translationZAxisGizmo */3],
                /* translationXYPlaneGizmo */init$2[/* translationXYPlaneGizmo */4],
                /* translationXZPlaneGizmo */init$2[/* translationXZPlaneGizmo */5],
                /* translationYZPlaneGizmo */init$2[/* translationYZPlaneGizmo */6],
                /* isTranslationXAxisGizmoSelected */init$2[/* isTranslationXAxisGizmoSelected */7],
                /* isTranslationYAxisGizmoSelected */init$2[/* isTranslationYAxisGizmoSelected */8],
                /* isTranslationZAxisGizmoSelected */init$2[/* isTranslationZAxisGizmoSelected */9],
                /* isTranslationXYPlaneGizmoSelected */init$2[/* isTranslationXYPlaneGizmoSelected */10],
                /* isTranslationXZPlaneGizmoSelected */init$2[/* isTranslationXZPlaneGizmoSelected */11],
                /* isTranslationYZPlaneGizmoSelected */init$2[/* isTranslationYZPlaneGizmoSelected */12],
                /* currentSceneTreeNodeStartPoint */currentSceneTreeNodeStartPoint,
                /* axisGameObjectStartPoint */init$2[/* axisGameObjectStartPoint */14],
                /* dragStartPoint */init$2[/* dragStartPoint */15],
                /* currentSceneTreeNodeStartLocalPosition */init$2[/* currentSceneTreeNodeStartLocalPosition */16]
              ],
              /* rotationGizmoData */init$1[/* rotationGizmoData */3],
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

function unsafeGetCurrentSceneTreeNodeStartLocalPosition(editorState) {
  return OptionService$WonderEditor.unsafeGet(RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* currentSceneTreeNodeStartLocalPosition */16]);
}

function setCurrentSceneTreeNodeStartLocalPosition(currentSceneTreeNodeStartLocalPosition, editorState) {
  var init = editorState[/* sceneViewRecord */6];
  var init$1 = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState);
  var init$2 = RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState);
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
              /* translationGizmoData : record */[
                /* translationWholeGizmo */init$2[/* translationWholeGizmo */0],
                /* translationXAxisGizmo */init$2[/* translationXAxisGizmo */1],
                /* translationYAxisGizmo */init$2[/* translationYAxisGizmo */2],
                /* translationZAxisGizmo */init$2[/* translationZAxisGizmo */3],
                /* translationXYPlaneGizmo */init$2[/* translationXYPlaneGizmo */4],
                /* translationXZPlaneGizmo */init$2[/* translationXZPlaneGizmo */5],
                /* translationYZPlaneGizmo */init$2[/* translationYZPlaneGizmo */6],
                /* isTranslationXAxisGizmoSelected */init$2[/* isTranslationXAxisGizmoSelected */7],
                /* isTranslationYAxisGizmoSelected */init$2[/* isTranslationYAxisGizmoSelected */8],
                /* isTranslationZAxisGizmoSelected */init$2[/* isTranslationZAxisGizmoSelected */9],
                /* isTranslationXYPlaneGizmoSelected */init$2[/* isTranslationXYPlaneGizmoSelected */10],
                /* isTranslationXZPlaneGizmoSelected */init$2[/* isTranslationXZPlaneGizmoSelected */11],
                /* isTranslationYZPlaneGizmoSelected */init$2[/* isTranslationYZPlaneGizmoSelected */12],
                /* currentSceneTreeNodeStartPoint */init$2[/* currentSceneTreeNodeStartPoint */13],
                /* axisGameObjectStartPoint */init$2[/* axisGameObjectStartPoint */14],
                /* dragStartPoint */init$2[/* dragStartPoint */15],
                /* currentSceneTreeNodeStartLocalPosition */currentSceneTreeNodeStartLocalPosition
              ],
              /* rotationGizmoData */init$1[/* rotationGizmoData */3],
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

export {
  unsafeGetTranslationWholeGizmo ,
  unsafeGetTranslationXAxisGizmo ,
  unsafeGetTranslationYAxisGizmo ,
  unsafeGetTranslationZAxisGizmo ,
  unsafeGetTranslationXYPlaneGizmo ,
  unsafeGetTranslationXZPlaneGizmo ,
  unsafeGetTranslationYZPlaneGizmo ,
  unsafeGetCurrentSceneTreeNodeStartPoint ,
  setCurrentSceneTreeNodeStartPoint ,
  unsafeGetCurrentSceneTreeNodeStartLocalPosition ,
  setCurrentSceneTreeNodeStartLocalPosition ,
  
}
/* OptionService-WonderEditor Not a pure module */
