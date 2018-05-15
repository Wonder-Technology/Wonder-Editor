'use strict';

import * as DomHelper$WonderEditor                from "../external/DomHelper.js";
import * as DragUtils$WonderEditor                from "../atom_component/dragTree/utils/DragUtils.js";
import * as StateLogicService$WonderEditor        from "../../service/stateTuple/logic/StateLogicService.js";
import * as CurrentSignEditorService$WonderEditor from "../../service/state/editor/CurrentSignEditorService.js";

function dragStart(uid, sign, $$event) {
  $$event.dataTransfer.setDragImage(document.createElement("img"), -10, -10);
  DomHelper$WonderEditor.stopPropagation($$event);
  DragUtils$WonderEditor.setDataTransferEffectIsMove($$event);
  DragUtils$WonderEditor.setdragedUid(uid, $$event);
  return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                return CurrentSignEditorService$WonderEditor.setCurrentSign(sign, param);
              }));
}

export {
  dragStart ,
  
}
/* DomHelper-WonderEditor Not a pure module */
