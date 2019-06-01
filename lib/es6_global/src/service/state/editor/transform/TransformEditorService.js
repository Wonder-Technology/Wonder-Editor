

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as TransformEngineService$WonderEditor from "../../engine/TransformEngineService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";

function setLocalEulerAngleX(transformComponent, value, editorState) {
  var transformRecord = editorState[/* transformRecord */12];
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */editorState[/* assetRecord */5],
          /* sceneViewRecord */editorState[/* sceneViewRecord */6],
          /* gameViewRecord */editorState[/* gameViewRecord */7],
          /* eventRecord */editorState[/* eventRecord */8],
          /* imguiRecord */editorState[/* imguiRecord */9],
          /* inspectorRecord */editorState[/* inspectorRecord */10],
          /* consoleRecord */editorState[/* consoleRecord */11],
          /* transformRecord : record */[
            /* localEulerAngleMapX */ImmutableSparseMapService$WonderCommonlib.set(transformComponent, value, transformRecord[/* localEulerAngleMapX */0]),
            /* localEulerAngleMapY */transformRecord[/* localEulerAngleMapY */1],
            /* localEulerAngleMapZ */transformRecord[/* localEulerAngleMapZ */2]
          ],
          /* pickingRecord */editorState[/* pickingRecord */13],
          /* currentDragSource */editorState[/* currentDragSource */14],
          /* currentSelectSource */editorState[/* currentSelectSource */15],
          /* loopId */editorState[/* loopId */16],
          /* languageType */editorState[/* languageType */17]
        ];
}

function setLocalEulerAngleY(transformComponent, value, editorState) {
  var transformRecord = editorState[/* transformRecord */12];
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */editorState[/* assetRecord */5],
          /* sceneViewRecord */editorState[/* sceneViewRecord */6],
          /* gameViewRecord */editorState[/* gameViewRecord */7],
          /* eventRecord */editorState[/* eventRecord */8],
          /* imguiRecord */editorState[/* imguiRecord */9],
          /* inspectorRecord */editorState[/* inspectorRecord */10],
          /* consoleRecord */editorState[/* consoleRecord */11],
          /* transformRecord : record */[
            /* localEulerAngleMapX */transformRecord[/* localEulerAngleMapX */0],
            /* localEulerAngleMapY */ImmutableSparseMapService$WonderCommonlib.set(transformComponent, value, transformRecord[/* localEulerAngleMapY */1]),
            /* localEulerAngleMapZ */transformRecord[/* localEulerAngleMapZ */2]
          ],
          /* pickingRecord */editorState[/* pickingRecord */13],
          /* currentDragSource */editorState[/* currentDragSource */14],
          /* currentSelectSource */editorState[/* currentSelectSource */15],
          /* loopId */editorState[/* loopId */16],
          /* languageType */editorState[/* languageType */17]
        ];
}

function setLocalEulerAngleZ(transformComponent, value, editorState) {
  var transformRecord = editorState[/* transformRecord */12];
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */editorState[/* assetRecord */5],
          /* sceneViewRecord */editorState[/* sceneViewRecord */6],
          /* gameViewRecord */editorState[/* gameViewRecord */7],
          /* eventRecord */editorState[/* eventRecord */8],
          /* imguiRecord */editorState[/* imguiRecord */9],
          /* inspectorRecord */editorState[/* inspectorRecord */10],
          /* consoleRecord */editorState[/* consoleRecord */11],
          /* transformRecord : record */[
            /* localEulerAngleMapX */transformRecord[/* localEulerAngleMapX */0],
            /* localEulerAngleMapY */transformRecord[/* localEulerAngleMapY */1],
            /* localEulerAngleMapZ */ImmutableSparseMapService$WonderCommonlib.set(transformComponent, value, transformRecord[/* localEulerAngleMapZ */2])
          ],
          /* pickingRecord */editorState[/* pickingRecord */13],
          /* currentDragSource */editorState[/* currentDragSource */14],
          /* currentSelectSource */editorState[/* currentSelectSource */15],
          /* loopId */editorState[/* loopId */16],
          /* languageType */editorState[/* languageType */17]
        ];
}

function _setLocalEulerAngleFieldWhenNotExistInMap(transformComponent, param, setFunc, editorState) {
  if (param[1] !== undefined) {
    return editorState;
  } else {
    return Curry._3(setFunc, transformComponent, param[0], editorState);
  }
}

function _getLocalEulerAngle(param, param$1) {
  var valueZInEngineState = param[2];
  var valueYInEngineState = param[1];
  var valueXInEngineState = param[0];
  return /* tuple */[
          valueXInEngineState !== undefined ? Caml_option.valFromOption(valueXInEngineState) : param$1[0],
          valueYInEngineState !== undefined ? Caml_option.valFromOption(valueYInEngineState) : param$1[1],
          valueZInEngineState !== undefined ? Caml_option.valFromOption(valueZInEngineState) : param$1[2]
        ];
}

function getLocalEulerAngleOrInit(transformComponent, param) {
  var editorState = param[0];
  var transformRecord = editorState[/* transformRecord */12];
  var match = ImmutableSparseMapService$WonderCommonlib.get(transformComponent, transformRecord[/* localEulerAngleMapX */0]);
  var match$1 = ImmutableSparseMapService$WonderCommonlib.get(transformComponent, transformRecord[/* localEulerAngleMapY */1]);
  var match$2 = ImmutableSparseMapService$WonderCommonlib.get(transformComponent, transformRecord[/* localEulerAngleMapZ */2]);
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
    var editorState$1 = _setLocalEulerAngleFieldWhenNotExistInMap(transformComponent, /* tuple */[
          ez,
          match$2
        ], setLocalEulerAngleZ, _setLocalEulerAngleFieldWhenNotExistInMap(transformComponent, /* tuple */[
              ey,
              match$1
            ], setLocalEulerAngleY, _setLocalEulerAngleFieldWhenNotExistInMap(transformComponent, /* tuple */[
                  ex,
                  match
                ], setLocalEulerAngleX, editorState)));
    return /* tuple */[
            _getLocalEulerAngle(/* tuple */[
                  match,
                  match$1,
                  match$2
                ], /* tuple */[
                  ex,
                  ey,
                  ez
                ]),
            editorState$1
          ];
  }
  
}

function removeLocalEulerAngleData(transformComponent, editorState) {
  var transformRecord = editorState[/* transformRecord */12];
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */editorState[/* assetRecord */5],
          /* sceneViewRecord */editorState[/* sceneViewRecord */6],
          /* gameViewRecord */editorState[/* gameViewRecord */7],
          /* eventRecord */editorState[/* eventRecord */8],
          /* imguiRecord */editorState[/* imguiRecord */9],
          /* inspectorRecord */editorState[/* inspectorRecord */10],
          /* consoleRecord */editorState[/* consoleRecord */11],
          /* transformRecord : record */[
            /* localEulerAngleMapX */ImmutableSparseMapService$WonderCommonlib.deleteVal(transformComponent, transformRecord[/* localEulerAngleMapX */0]),
            /* localEulerAngleMapY */ImmutableSparseMapService$WonderCommonlib.deleteVal(transformComponent, transformRecord[/* localEulerAngleMapY */1]),
            /* localEulerAngleMapZ */ImmutableSparseMapService$WonderCommonlib.deleteVal(transformComponent, transformRecord[/* localEulerAngleMapZ */2])
          ],
          /* pickingRecord */editorState[/* pickingRecord */13],
          /* currentDragSource */editorState[/* currentDragSource */14],
          /* currentSelectSource */editorState[/* currentSelectSource */15],
          /* loopId */editorState[/* loopId */16],
          /* languageType */editorState[/* languageType */17]
        ];
}

export {
  setLocalEulerAngleX ,
  setLocalEulerAngleY ,
  setLocalEulerAngleZ ,
  _setLocalEulerAngleFieldWhenNotExistInMap ,
  _getLocalEulerAngle ,
  getLocalEulerAngleOrInit ,
  removeLocalEulerAngleData ,
  
}
/* TransformEngineService-WonderEditor Not a pure module */
