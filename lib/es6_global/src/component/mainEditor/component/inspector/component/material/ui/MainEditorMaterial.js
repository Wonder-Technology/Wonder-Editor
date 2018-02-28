'use strict';

import * as Curry                                                   from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                                                   from "react";
import * as Caml_obj                                                from "../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact                                             from "../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Log$WonderLog                                           from "../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as StringInput$WonderEditor                                from "../../../../../../../ui/component/stringInput/StringInput.js";
import * as OperateStateUtils$WonderEditor                          from "../../../../../../../utils/OperateStateUtils.js";
import * as MainEditorMaterialView$WonderEditor                     from "../logic/view/MainEditorMaterialView.js";
import * as MainEditorMaterialMarkRedoUndoEventHandler$WonderEditor from "./eventHandler/MainEditorMaterialMarkRedoUndoEventHandler.js";

var onMarkRedoUndo = MainEditorMaterialMarkRedoUndoEventHandler$WonderEditor.MakeEventHandler[/* onMarkRedoUndo */2];

var Method = /* module */[/* onMarkRedoUndo */onMarkRedoUndo];

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditorMaterial");

function render(store, dispatch, materialComponent, self) {
  return React.createElement("article", {
              className: "transform-component"
            }, ReasonReact.element(/* None */0, /* None */0, StringInput$WonderEditor.make(/* Some */[self[/* retainedProps */5][/* color */0]], /* Some */["color"], /* None */0, /* Some */[Curry._2(onMarkRedoUndo, /* tuple */[
                            store,
                            dispatch
                          ], materialComponent)], /* array */[])));
}

function shouldUpdate(param) {
  return Caml_obj.caml_notequal(param[/* oldSelf */0][/* retainedProps */5], param[/* newSelf */1][/* retainedProps */5]);
}

function make(store, dispatch, materialComponent, _) {
  var newrecord = component.slice();
  newrecord[/* shouldUpdate */8] = shouldUpdate;
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, materialComponent, self);
    });
  var color = OperateStateUtils$WonderEditor.getState((function (param) {
          return MainEditorMaterialView$WonderEditor.getBasicMaterialColor(materialComponent, param);
        }));
  Log$WonderLog.print(color);
  newrecord[/* retainedProps */11] = /* record */[/* color */"#ffffff"];
  return newrecord;
}

export {
  Method       ,
  component    ,
  render       ,
  shouldUpdate ,
  make         ,
  
}
/* component Not a pure module */
