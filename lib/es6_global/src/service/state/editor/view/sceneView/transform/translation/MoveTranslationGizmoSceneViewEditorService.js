

import * as OptionService$WonderEditor from "../../../../../../primitive/OptionService.js";
import * as RecordTransformGizmoSceneViewEditorService$WonderEditor from "../RecordTransformGizmoSceneViewEditorService.js";
import * as RecordTranslationGizmoSceneViewEditorService$WonderEditor from "./RecordTranslationGizmoSceneViewEditorService.js";

function unsafeAxisGizmoStartPoint(editorState) {
  return OptionService$WonderEditor.unsafeGet(RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* axisGameObjectStartPoint */14]);
}

function setAxisGizmoStartPoint(axisGameObjectStartPoint, editorState) {
  var init = editorState[/* sceneViewRecord */3];
  var init$1 = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState);
  var init$2 = RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState);
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
                /* axisGameObjectStartPoint */axisGameObjectStartPoint,
                /* dragStartPoint */init$2[/* dragStartPoint */15],
                /* currentSceneTreeNodeStartLocalPosition */init$2[/* currentSceneTreeNodeStartLocalPosition */16]
              ],
              /* rotationGizmoData */init$1[/* rotationGizmoData */3],
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

function unsafeGetDragStartPoint(editorState) {
  return OptionService$WonderEditor.unsafeGet(RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* dragStartPoint */15]);
}

function setDragStartPoint(dragStartPoint, editorState) {
  var init = editorState[/* sceneViewRecord */3];
  var init$1 = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState);
  var init$2 = RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState);
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
                /* dragStartPoint */dragStartPoint,
                /* currentSceneTreeNodeStartLocalPosition */init$2[/* currentSceneTreeNodeStartLocalPosition */16]
              ],
              /* rotationGizmoData */init$1[/* rotationGizmoData */3],
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
  unsafeAxisGizmoStartPoint ,
  setAxisGizmoStartPoint ,
  unsafeGetDragStartPoint ,
  setDragStartPoint ,
  
}
/* OptionService-WonderEditor Not a pure module */
