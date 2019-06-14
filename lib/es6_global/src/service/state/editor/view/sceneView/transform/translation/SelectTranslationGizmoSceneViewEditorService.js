

import * as RecordTransformGizmoSceneViewEditorService$WonderEditor from "../RecordTransformGizmoSceneViewEditorService.js";
import * as RecordTranslationGizmoSceneViewEditorService$WonderEditor from "./RecordTranslationGizmoSceneViewEditorService.js";

function isTranslationXAxisGizmoSelected(editorState) {
  return RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* isTranslationXAxisGizmoSelected */7];
}

function isTranslationYAxisGizmoSelected(editorState) {
  return RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* isTranslationYAxisGizmoSelected */8];
}

function isTranslationZAxisGizmoSelected(editorState) {
  return RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* isTranslationZAxisGizmoSelected */9];
}

function isTranslationXYPlaneGizmoSelected(editorState) {
  return RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* isTranslationXYPlaneGizmoSelected */10];
}

function isTranslationXZPlaneGizmoSelected(editorState) {
  return RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* isTranslationXZPlaneGizmoSelected */11];
}

function isTranslationYZPlaneGizmoSelected(editorState) {
  return RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* isTranslationYZPlaneGizmoSelected */12];
}

function isSelectAnyTranslationGizmo(editorState) {
  var match = RecordTranslationGizmoSceneViewEditorService$WonderEditor.getData(editorState);
  if (match !== undefined) {
    if (RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* isTranslationXAxisGizmoSelected */7] || RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* isTranslationYAxisGizmoSelected */8] || RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* isTranslationZAxisGizmoSelected */9] || RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* isTranslationXYPlaneGizmoSelected */10] || RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* isTranslationXZPlaneGizmoSelected */11]) {
      return true;
    } else {
      return RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* isTranslationYZPlaneGizmoSelected */12];
    }
  } else {
    return false;
  }
}

function markNotSelectAnyTranslationGizmo(editorState) {
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
                /* isTranslationXAxisGizmoSelected */false,
                /* isTranslationYAxisGizmoSelected */false,
                /* isTranslationZAxisGizmoSelected */false,
                /* isTranslationXYPlaneGizmoSelected */false,
                /* isTranslationXZPlaneGizmoSelected */false,
                /* isTranslationYZPlaneGizmoSelected */false,
                /* currentSceneTreeNodeStartPoint */init$2[/* currentSceneTreeNodeStartPoint */13],
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

function onlySelectTranslationXYPlaneGizmo(editorState) {
  var editorState$1 = markNotSelectAnyTranslationGizmo(editorState);
  var init = editorState$1[/* sceneViewRecord */6];
  var init$1 = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
  var init$2 = RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
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
                /* isTranslationXYPlaneGizmoSelected */true,
                /* isTranslationXZPlaneGizmoSelected */init$2[/* isTranslationXZPlaneGizmoSelected */11],
                /* isTranslationYZPlaneGizmoSelected */init$2[/* isTranslationYZPlaneGizmoSelected */12],
                /* currentSceneTreeNodeStartPoint */init$2[/* currentSceneTreeNodeStartPoint */13],
                /* axisGameObjectStartPoint */init$2[/* axisGameObjectStartPoint */14],
                /* dragStartPoint */init$2[/* dragStartPoint */15],
                /* currentSceneTreeNodeStartLocalPosition */init$2[/* currentSceneTreeNodeStartLocalPosition */16]
              ],
              /* rotationGizmoData */init$1[/* rotationGizmoData */3],
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

function onlySelectTranslationXZPlaneGizmo(editorState) {
  var editorState$1 = markNotSelectAnyTranslationGizmo(editorState);
  var init = editorState$1[/* sceneViewRecord */6];
  var init$1 = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
  var init$2 = RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
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
                /* isTranslationXZPlaneGizmoSelected */true,
                /* isTranslationYZPlaneGizmoSelected */init$2[/* isTranslationYZPlaneGizmoSelected */12],
                /* currentSceneTreeNodeStartPoint */init$2[/* currentSceneTreeNodeStartPoint */13],
                /* axisGameObjectStartPoint */init$2[/* axisGameObjectStartPoint */14],
                /* dragStartPoint */init$2[/* dragStartPoint */15],
                /* currentSceneTreeNodeStartLocalPosition */init$2[/* currentSceneTreeNodeStartLocalPosition */16]
              ],
              /* rotationGizmoData */init$1[/* rotationGizmoData */3],
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

function onlySelectTranslationYZPlaneGizmo(editorState) {
  var editorState$1 = markNotSelectAnyTranslationGizmo(editorState);
  var init = editorState$1[/* sceneViewRecord */6];
  var init$1 = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
  var init$2 = RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
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
                /* isTranslationYZPlaneGizmoSelected */true,
                /* currentSceneTreeNodeStartPoint */init$2[/* currentSceneTreeNodeStartPoint */13],
                /* axisGameObjectStartPoint */init$2[/* axisGameObjectStartPoint */14],
                /* dragStartPoint */init$2[/* dragStartPoint */15],
                /* currentSceneTreeNodeStartLocalPosition */init$2[/* currentSceneTreeNodeStartLocalPosition */16]
              ],
              /* rotationGizmoData */init$1[/* rotationGizmoData */3],
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

function onlySelectTranslationXAxisGizmo(editorState) {
  var editorState$1 = markNotSelectAnyTranslationGizmo(editorState);
  var init = editorState$1[/* sceneViewRecord */6];
  var init$1 = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
  var init$2 = RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
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
              /* translationGizmoData : record */[
                /* translationWholeGizmo */init$2[/* translationWholeGizmo */0],
                /* translationXAxisGizmo */init$2[/* translationXAxisGizmo */1],
                /* translationYAxisGizmo */init$2[/* translationYAxisGizmo */2],
                /* translationZAxisGizmo */init$2[/* translationZAxisGizmo */3],
                /* translationXYPlaneGizmo */init$2[/* translationXYPlaneGizmo */4],
                /* translationXZPlaneGizmo */init$2[/* translationXZPlaneGizmo */5],
                /* translationYZPlaneGizmo */init$2[/* translationYZPlaneGizmo */6],
                /* isTranslationXAxisGizmoSelected */true,
                /* isTranslationYAxisGizmoSelected */init$2[/* isTranslationYAxisGizmoSelected */8],
                /* isTranslationZAxisGizmoSelected */init$2[/* isTranslationZAxisGizmoSelected */9],
                /* isTranslationXYPlaneGizmoSelected */init$2[/* isTranslationXYPlaneGizmoSelected */10],
                /* isTranslationXZPlaneGizmoSelected */init$2[/* isTranslationXZPlaneGizmoSelected */11],
                /* isTranslationYZPlaneGizmoSelected */init$2[/* isTranslationYZPlaneGizmoSelected */12],
                /* currentSceneTreeNodeStartPoint */init$2[/* currentSceneTreeNodeStartPoint */13],
                /* axisGameObjectStartPoint */init$2[/* axisGameObjectStartPoint */14],
                /* dragStartPoint */init$2[/* dragStartPoint */15],
                /* currentSceneTreeNodeStartLocalPosition */init$2[/* currentSceneTreeNodeStartLocalPosition */16]
              ],
              /* rotationGizmoData */init$1[/* rotationGizmoData */3],
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

function onlySelectTranslationYAxisGizmo(editorState) {
  var editorState$1 = markNotSelectAnyTranslationGizmo(editorState);
  var init = editorState$1[/* sceneViewRecord */6];
  var init$1 = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
  var init$2 = RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
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
              /* translationGizmoData : record */[
                /* translationWholeGizmo */init$2[/* translationWholeGizmo */0],
                /* translationXAxisGizmo */init$2[/* translationXAxisGizmo */1],
                /* translationYAxisGizmo */init$2[/* translationYAxisGizmo */2],
                /* translationZAxisGizmo */init$2[/* translationZAxisGizmo */3],
                /* translationXYPlaneGizmo */init$2[/* translationXYPlaneGizmo */4],
                /* translationXZPlaneGizmo */init$2[/* translationXZPlaneGizmo */5],
                /* translationYZPlaneGizmo */init$2[/* translationYZPlaneGizmo */6],
                /* isTranslationXAxisGizmoSelected */init$2[/* isTranslationXAxisGizmoSelected */7],
                /* isTranslationYAxisGizmoSelected */true,
                /* isTranslationZAxisGizmoSelected */init$2[/* isTranslationZAxisGizmoSelected */9],
                /* isTranslationXYPlaneGizmoSelected */init$2[/* isTranslationXYPlaneGizmoSelected */10],
                /* isTranslationXZPlaneGizmoSelected */init$2[/* isTranslationXZPlaneGizmoSelected */11],
                /* isTranslationYZPlaneGizmoSelected */init$2[/* isTranslationYZPlaneGizmoSelected */12],
                /* currentSceneTreeNodeStartPoint */init$2[/* currentSceneTreeNodeStartPoint */13],
                /* axisGameObjectStartPoint */init$2[/* axisGameObjectStartPoint */14],
                /* dragStartPoint */init$2[/* dragStartPoint */15],
                /* currentSceneTreeNodeStartLocalPosition */init$2[/* currentSceneTreeNodeStartLocalPosition */16]
              ],
              /* rotationGizmoData */init$1[/* rotationGizmoData */3],
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

function onlySelectTranslationZAxisGizmo(editorState) {
  var editorState$1 = markNotSelectAnyTranslationGizmo(editorState);
  var init = editorState$1[/* sceneViewRecord */6];
  var init$1 = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
  var init$2 = RecordTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState$1);
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
                /* isTranslationZAxisGizmoSelected */true,
                /* isTranslationXYPlaneGizmoSelected */init$2[/* isTranslationXYPlaneGizmoSelected */10],
                /* isTranslationXZPlaneGizmoSelected */init$2[/* isTranslationXZPlaneGizmoSelected */11],
                /* isTranslationYZPlaneGizmoSelected */init$2[/* isTranslationYZPlaneGizmoSelected */12],
                /* currentSceneTreeNodeStartPoint */init$2[/* currentSceneTreeNodeStartPoint */13],
                /* axisGameObjectStartPoint */init$2[/* axisGameObjectStartPoint */14],
                /* dragStartPoint */init$2[/* dragStartPoint */15],
                /* currentSceneTreeNodeStartLocalPosition */init$2[/* currentSceneTreeNodeStartLocalPosition */16]
              ],
              /* rotationGizmoData */init$1[/* rotationGizmoData */3],
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

export {
  isTranslationXAxisGizmoSelected ,
  isTranslationYAxisGizmoSelected ,
  isTranslationZAxisGizmoSelected ,
  isTranslationXYPlaneGizmoSelected ,
  isTranslationXZPlaneGizmoSelected ,
  isTranslationYZPlaneGizmoSelected ,
  isSelectAnyTranslationGizmo ,
  markNotSelectAnyTranslationGizmo ,
  onlySelectTranslationXYPlaneGizmo ,
  onlySelectTranslationXZPlaneGizmo ,
  onlySelectTranslationYZPlaneGizmo ,
  onlySelectTranslationXAxisGizmo ,
  onlySelectTranslationYAxisGizmo ,
  onlySelectTranslationZAxisGizmo ,
  
}
/* RecordTransformGizmoSceneViewEditorService-WonderEditor Not a pure module */
