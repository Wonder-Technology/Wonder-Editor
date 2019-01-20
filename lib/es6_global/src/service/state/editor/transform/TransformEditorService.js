

import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as TransformEngineService$WonderEditor from "../../engine/TransformEngineService.js";

function setLocalEulerAngleX(transformComponent, value, editorState) {
  var transformRecord = editorState[/* transformRecord */9];
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord : record */[
            /* localEulerAngleMapX */SparseMapService$WonderCommonlib.set(transformComponent, value, transformRecord[/* localEulerAngleMapX */0]),
            /* localEulerAngleMapY */transformRecord[/* localEulerAngleMapY */1],
            /* localEulerAngleMapZ */transformRecord[/* localEulerAngleMapZ */2]
          ],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13]
        ];
}

function setLocalEulerAngleY(transformComponent, value, editorState) {
  var transformRecord = editorState[/* transformRecord */9];
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord : record */[
            /* localEulerAngleMapX */transformRecord[/* localEulerAngleMapX */0],
            /* localEulerAngleMapY */SparseMapService$WonderCommonlib.set(transformComponent, value, transformRecord[/* localEulerAngleMapY */1]),
            /* localEulerAngleMapZ */transformRecord[/* localEulerAngleMapZ */2]
          ],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13]
        ];
}

function setLocalEulerAngleZ(transformComponent, value, editorState) {
  var transformRecord = editorState[/* transformRecord */9];
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord : record */[
            /* localEulerAngleMapX */transformRecord[/* localEulerAngleMapX */0],
            /* localEulerAngleMapY */transformRecord[/* localEulerAngleMapY */1],
            /* localEulerAngleMapZ */SparseMapService$WonderCommonlib.set(transformComponent, value, transformRecord[/* localEulerAngleMapZ */2])
          ],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13]
        ];
}

function getLocalEulerAngleAndInit(transformComponent, param) {
  var editorState = param[0];
  var transformRecord = editorState[/* transformRecord */9];
  var match = SparseMapService$WonderCommonlib.get(transformComponent, transformRecord[/* localEulerAngleMapX */0]);
  var match$1 = SparseMapService$WonderCommonlib.get(transformComponent, transformRecord[/* localEulerAngleMapY */1]);
  var match$2 = SparseMapService$WonderCommonlib.get(transformComponent, transformRecord[/* localEulerAngleMapZ */2]);
  var exit = 0;
  if (match !== undefined && match$1 !== undefined && match$2 !== undefined) {
    return /* tuple */[
            /* tuple */[
              match,
              match$1,
              match$2
            ],
            editorState
          ];
  } else {
    exit = 1;
  }
  if (exit === 1) {
    var match$3 = TransformEngineService$WonderEditor.getLocalEulerAngles(transformComponent, param[1]);
    var ez = match$3[2];
    var ey = match$3[1];
    var ex = match$3[0];
    var editorState$1 = setLocalEulerAngleZ(transformComponent, ez, setLocalEulerAngleY(transformComponent, ey, setLocalEulerAngleX(transformComponent, ex, editorState)));
    return /* tuple */[
            /* tuple */[
              ex,
              ey,
              ez
            ],
            editorState$1
          ];
  }
  
}

export {
  setLocalEulerAngleX ,
  setLocalEulerAngleY ,
  setLocalEulerAngleZ ,
  getLocalEulerAngleAndInit ,
  
}
/* TransformEngineService-WonderEditor Not a pure module */
