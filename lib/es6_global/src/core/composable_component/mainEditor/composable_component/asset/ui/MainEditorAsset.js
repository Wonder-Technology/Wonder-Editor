'use strict';

import * as React                           from "react";
import * as Caml_obj                        from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact                     from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Css$WonderEditor                from "../../../../../external/Css.js";
import * as StateLogicService$WonderEditor  from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../service/state/editor/SceneEditorService.js";

Css$WonderEditor.importCss("./css/mainEditorAsset.css");

var Method = /* module */[];

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditorAsset");

function render(_, _$1, _$2) {
  return React.createElement("article", {
              key: "asset",
              className: "asset-component"
            }, React.createElement("div", {
                  className: "asset-tree"
                }), React.createElement("div", {
                  className: "asset-content"
                }));
}

function shouldUpdate(param) {
  return Caml_obj.caml_notequal(param[/* oldSelf */0][/* retainedProps */5], param[/* newSelf */1][/* retainedProps */5]);
}

function make(store, dispatch, _) {
  var newrecord = component.slice();
  newrecord[/* shouldUpdate */8] = shouldUpdate;
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, self);
    });
  newrecord[/* retainedProps */11] = /* record */[/* currentGameObject */StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.getCurrentGameObject)];
  return newrecord;
}

export {
  Method       ,
  component    ,
  render       ,
  shouldUpdate ,
  make         ,
  
}
/*  Not a pure module */
