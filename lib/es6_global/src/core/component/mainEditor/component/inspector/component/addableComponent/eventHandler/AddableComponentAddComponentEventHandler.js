'use strict';

import * as Curry                                from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor                from "../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor            from "../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor       from "../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor       from "../../../../../../../../service/stateTuple/StateLogicService.js";
import * as MainEditorComponentView$WonderEditor from "../../../logic/view/MainEditorComponentView.js";

var onSelect = EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var onDrop = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

var onMarkRedoUndo = EmptyEventHandler$WonderEditor.EmptyEventHandler[3];

function onClick(param, type_, currentGameObject) {
  StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
          return MainEditorComponentView$WonderEditor.addComponentByType(type_, currentGameObject, param);
        }));
  Curry._1(param[1], AppStore$WonderEditor.ReLoad);
  return /* () */0;
}

var AddComponentEventHandler = /* module */[
  /* onSelect */onSelect,
  /* onDrop */onDrop,
  /* onMarkRedoUndo */onMarkRedoUndo,
  /* onClick */onClick
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      onSelect,
      onDrop,
      onClick,
      onMarkRedoUndo
    ]);

export {
  AddComponentEventHandler ,
  MakeEventHandler         ,
  
}
/* MakeEventHandler Not a pure module */
