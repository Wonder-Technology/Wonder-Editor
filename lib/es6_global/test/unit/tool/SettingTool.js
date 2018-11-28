

import * as SetSettingEditorService$WonderEditor from "../../../src/service/state/editor/setting/SetSettingEditorService.js";

function initSetting(editorState) {
  return SetSettingEditorService$WonderEditor.setSetting(/* record */[
              /* debug *//* record */[
                /* isDebug */true,
                /* showMessage */true
              ],
              /* redoUndo *//* record */[/* maxStackSize */50]
            ], editorState);
}

function setMaxStackSize(maxStackSize, editorState) {
  return SetSettingEditorService$WonderEditor.setSetting(/* record */[
              /* debug */editorState[/* settingRecord */0][/* debug */0],
              /* redoUndo *//* record */[/* maxStackSize */maxStackSize]
            ], editorState);
}

export {
  initSetting ,
  setMaxStackSize ,
  
}
/* SetSettingEditorService-WonderEditor Not a pure module */
