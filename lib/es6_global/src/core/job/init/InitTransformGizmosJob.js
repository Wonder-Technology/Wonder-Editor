

import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as CreateScaleGizmosUtils$WonderEditor from "../../utils/engine/job/init/initTransformGizmosJob/scale/CreateScaleGizmosUtils.js";
import * as CreateRotationGizmosUtils$WonderEditor from "../../utils/engine/job/init/initTransformGizmosJob/rotation/CreateRotationGizmosUtils.js";
import * as CreateTransformGizmosUtils$WonderEditor from "../../utils/engine/job/init/initTransformGizmosJob/CreateTransformGizmosUtils.js";
import * as BindTransformGizmoEventUtils$WonderEditor from "../../utils/engine/job/init/initTransformGizmosJob/BindTransformGizmoEventUtils.js";
import * as CreateTranslationGizmosUtils$WonderEditor from "../../utils/engine/job/init/initTransformGizmosJob/translation/CreateTranslationGizmosUtils.js";

function _createTransformGizmos(param) {
  var match = CreateTranslationGizmosUtils$WonderEditor.createTranslationGizmos(param[1]);
  var match$1 = match[3];
  var match$2 = match[2];
  var match$3 = CreateRotationGizmosUtils$WonderEditor.createRotationGizmos(match[0]);
  var match$4 = match$3[2];
  var match$5 = CreateScaleGizmosUtils$WonderEditor.createScaleGizmos(match$3[0]);
  var match$6 = match$5[2];
  var editorState = CreateTransformGizmosUtils$WonderEditor.setToEditorState(/* tuple */[
        match[1],
        /* tuple */[
          match$2[0],
          match$2[1],
          match$2[2]
        ],
        /* tuple */[
          match$1[0],
          match$1[1],
          match$1[2]
        ]
      ], /* tuple */[
        match$3[1],
        /* tuple */[
          match$4[0],
          match$4[1],
          match$4[2]
        ]
      ], /* tuple */[
        match$5[1],
        /* tuple */[
          match$6[0],
          match$6[1],
          match$6[2]
        ],
        match$5[3]
      ], param[0]);
  return /* tuple */[
          editorState,
          match$5[0]
        ];
}

function initJob(param, engineState) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = _createTransformGizmos(/* tuple */[
        editorState,
        engineState
      ]);
  var engineState$1 = BindTransformGizmoEventUtils$WonderEditor.bindEvent(match[1]);
  StateEditorService$WonderEditor.setState(match[0]);
  return engineState$1;
}

export {
  _createTransformGizmos ,
  initJob ,
  
}
/* StateEditorService-WonderEditor Not a pure module */
