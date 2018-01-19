'use strict';

import * as Log$WonderLog                        from "../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as EventHandler$WonderEditor            from "../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor       from "../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as MainEditorStateView$WonderEditor     from "../../../../../../logic/view/MainEditorStateView.js";
import * as MainEditorTransformView$WonderEditor from "../../logic/view/MainEditorTransformView.js";

var onSelect = EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var onDrag = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function _getCurrentGameObjectLocalPosition(transformComponent) {
  return MainEditorTransformView$WonderEditor.getCurrentGameObjectLocalPosition(transformComponent, MainEditorStateView$WonderEditor.prepareState(/* () */0));
}

function _setCurrentGameObjectLocalPosition(transformComponent, param) {
  return MainEditorStateView$WonderEditor.finishState(MainEditorTransformView$WonderEditor.setCurrentGameObjectLocalPosition(transformComponent, /* tuple */[
                  param[0],
                  param[1],
                  param[2]
                ], MainEditorStateView$WonderEditor.prepareState(/* () */0)));
}

function onChange(_, param, value) {
  var type_ = param[1];
  var transformComponent = param[0];
  var match = MainEditorTransformView$WonderEditor.getCurrentGameObjectLocalPosition(transformComponent, MainEditorStateView$WonderEditor.prepareState(/* () */0));
  var z = match[2];
  var y = match[1];
  var x = match[0];
  switch (type_) {
    case "x" : 
        return _setCurrentGameObjectLocalPosition(transformComponent, /* tuple */[
                    value,
                    y,
                    z
                  ]);
    case "y" : 
        return _setCurrentGameObjectLocalPosition(transformComponent, /* tuple */[
                    x,
                    value,
                    z
                  ]);
    case "z" : 
        return _setCurrentGameObjectLocalPosition(transformComponent, /* tuple */[
                    x,
                    y,
                    value
                  ]);
    default:
      return Log$WonderLog.error(Log$WonderLog.buildErrorMessage("onChange", "TransformEventHandler type:" + (String(type_) + " is error"), "", "set type:" + (String(type_) + " in (x,y,z)"), "type:" + (String(type_) + "")));
  }
}

var ChangeEventHandler = /* module */[
  /* onSelect */onSelect,
  /* onDrag */onDrag,
  /* _getCurrentGameObjectLocalPosition */_getCurrentGameObjectLocalPosition,
  /* _setCurrentGameObjectLocalPosition */_setCurrentGameObjectLocalPosition,
  /* onChange */onChange
];

var MakeMainEditorTransformChangeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      onSelect,
      onDrag,
      onChange
    ]);

export {
  ChangeEventHandler                        ,
  MakeMainEditorTransformChangeEventHandler ,
  
}
/* MakeMainEditorTransformChangeEventHandler Not a pure module */
