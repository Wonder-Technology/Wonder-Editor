

import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as StateEditorService$WonderEditor from "../../../src/service/state/editor/StateEditorService.js";
import * as SetSettingEditorService$WonderEditor from "../../../src/service/state/editor/setting/SetSettingEditorService.js";

function setSetting($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  var debug = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : /* record */[
      /* isDebug */true,
      /* showMessage */true
    ];
  var redoUndo = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : /* record */[/* maxStackSize */50];
  var hotKeys = $staropt$star$3 !== undefined ? $staropt$star$3 : /* array */[
      /* record */[
        /* name */"translation",
        /* values : array */["1"]
      ],
      /* record */[
        /* name */"rotation",
        /* values : array */["2"]
      ],
      /* record */[
        /* name */"scale",
        /* values : array */["3"]
      ],
      /* record */[
        /* name */"focus",
        /* values : array */["f"]
      ],
      /* record */[
        /* name */"redo",
        /* values : array */["ctrl+y"]
      ],
      /* record */[
        /* name */"undo",
        /* values : array */["ctrl+z"]
      ],
      /* record */[
        /* name */"duplicate",
        /* values : array */["ctrl+d"]
      ],
      /* record */[
        /* name */"delete",
        /* values : array */["delete"]
      ]
    ];
  return SetSettingEditorService$WonderEditor.setSetting(/* record */[
              /* debug */debug,
              /* redoUndo */redoUndo,
              /* hotKeys */hotKeys
            ], editorState);
}

function initSetting(editorState) {
  return setSetting(editorState, undefined, undefined, undefined, /* () */0);
}

function setMaxStackSize(maxStackSize, editorState) {
  var settingRecord = editorState[/* settingRecord */0];
  return SetSettingEditorService$WonderEditor.setSetting(/* record */[
              /* debug */settingRecord[/* debug */0],
              /* redoUndo *//* record */[/* maxStackSize */maxStackSize],
              /* hotKeys */settingRecord[/* hotKeys */2]
            ], editorState);
}

export {
  setSetting ,
  initSetting ,
  setMaxStackSize ,
  
}
/* StateEditorService-WonderEditor Not a pure module */
