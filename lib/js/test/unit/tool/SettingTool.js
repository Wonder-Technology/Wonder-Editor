'use strict';

var Caml_option = require("bs-platform/lib/js/caml_option.js");
var StateEditorService$WonderEditor = require("../../../src/service/state/editor/StateEditorService.js");
var SetSettingEditorService$WonderEditor = require("../../../src/service/state/editor/setting/SetSettingEditorService.js");

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
  var settingRecord = editorState[/* settingRecord */3];
  return SetSettingEditorService$WonderEditor.setSetting(/* record */[
              /* debug */settingRecord[/* debug */0],
              /* redoUndo *//* record */[/* maxStackSize */maxStackSize],
              /* hotKeys */settingRecord[/* hotKeys */2]
            ], editorState);
}

exports.setSetting = setSetting;
exports.initSetting = initSetting;
exports.setMaxStackSize = setMaxStackSize;
/* StateEditorService-WonderEditor Not a pure module */
