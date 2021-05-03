

import * as RecordTransformGizmoSceneViewEditorService$WonderEditor from "./RecordTransformGizmoSceneViewEditorService.js";

function mark(currentGizmoType, editorState) {
  var init = editorState[/* sceneViewRecord */6];
  var init$1 = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState);
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
              /* currentGizmoType */currentGizmoType,
              /* coordinateSystem */init$1[/* coordinateSystem */1],
              /* translationGizmoData */init$1[/* translationGizmoData */2],
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

function markTranslation(editorState) {
  return mark(/* Translation */0, editorState);
}

function markRotation(editorState) {
  return mark(/* Rotation */1, editorState);
}

function markScale(editorState) {
  return mark(/* Scale */2, editorState);
}

function getCurrentGizmoType(editorState) {
  return RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* currentGizmoType */0];
}

export {
  mark ,
  markTranslation ,
  markRotation ,
  markScale ,
  getCurrentGizmoType ,
  
}
/* RecordTransformGizmoSceneViewEditorService-WonderEditor Not a pure module */
