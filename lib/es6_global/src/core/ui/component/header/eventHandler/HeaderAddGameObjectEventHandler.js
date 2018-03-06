'use strict';

import * as Curry                                   from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog                           from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AppStore$WonderEditor                   from "../../../store/AppStore.js";
import * as SceneFacade$WonderEditor                from "../../../../../facade/SceneFacade.js";
import * as StateFacade$WonderEditor                from "../../../../../facade/StateFacade.js";
import * as EventHandler$WonderEditor               from "../../../eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor          from "../../../eventHandler/EmptyEventHandler.js";
import * as SceneGraphDataUtils$WonderEditor        from "../../../../utils/SceneGraphDataUtils.js";
import * as MainEditorSceneTreeView$WonderEditor    from "../../../../component/mainEditor/component/sceneTree/logic/view/MainEditorSceneTreeView.js";
import * as GameObjectCompositeService$WonderEditor from "../../../../../service/logic_service/composite/GameObjectCompositeService.js";

var onSelect = EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var onDrop = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

var onMarkRedoUndo = EmptyEventHandler$WonderEditor.EmptyEventHandler[3];

function onClick(param, type_, _) {
  var match;
  if (type_ === "box") {
    var partial_arg = StateFacade$WonderEditor.getState(SceneFacade$WonderEditor.unsafeGetScene);
    match = StateFacade$WonderEditor.getState((function (param) {
            return GameObjectCompositeService$WonderEditor.addBox(partial_arg, param);
          }));
  } else {
    match = Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("addGameObject", "specific type:" + (String(type_) + " should exist"), "", "", "type:" + (String(type_) + "")));
  }
  var newGameObject = match[0];
  StateFacade$WonderEditor.setState(match[1]);
  var partial_arg$1 = SceneGraphDataUtils$WonderEditor.unsafeGetSceneGraphDataFromStore(param[0]);
  Curry._1(param[1], [
        AppStore$WonderEditor.SceneTreeAction,
        /* SetSceneGraph */[/* Some */[StateFacade$WonderEditor.getState((function (param) {
                    return MainEditorSceneTreeView$WonderEditor.buildSceneGraphDataWithNewGameObject(newGameObject, partial_arg$1, param);
                  }))]]
      ]);
  return /* () */0;
}

var AddGameObjectEventHandler = /* module */[
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
  AddGameObjectEventHandler ,
  MakeEventHandler          ,
  
}
/* MakeEventHandler Not a pure module */
