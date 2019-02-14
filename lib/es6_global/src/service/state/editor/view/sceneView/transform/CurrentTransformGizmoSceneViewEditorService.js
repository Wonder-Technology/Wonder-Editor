

import * as RecordTransformGizmoSceneViewEditorService$WonderEditor from "./RecordTransformGizmoSceneViewEditorService.js";

function mark(currentGizmoType, editorState) {
  var init = editorState[/* sceneViewRecord */3];
  var init$1 = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState);
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
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
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13]
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
