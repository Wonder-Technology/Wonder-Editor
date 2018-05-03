'use strict';

import * as React                                   from "react";
import * as Caml_obj                                from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact                             from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Css$WonderEditor                        from "../../../../../../../external/Css.js";
import * as StateLogicService$WonderEditor          from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetEditorService$WonderEditor         from "../../../../../../../../service/state/editor/AssetEditorService.js";
import * as MainEditorAssetTree$WonderEditor        from "../../assetTree/ui/MainEditorAssetTree.js";
import * as MainEditorAssetHeader$WonderEditor      from "../../../atom_component/header/ui/MainEditorAssetHeader.js";
import * as MainEditorAssetFileContent$WonderEditor from "../../../atom_component/fileContent/ui/MainEditorAssetFileContent.js";

Css$WonderEditor.importCss("./css/mainEditorAsset.css");

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditorAsset");

function render(store, dispatch, _) {
  return React.createElement("article", {
              key: "asset",
              className: "asset-component"
            }, React.createElement("div", {
                  className: "asset-tree"
                }, ReasonReact.element(/* None */0, /* None */0, MainEditorAssetHeader$WonderEditor.make(store, dispatch, /* array */[])), ReasonReact.element(/* None */0, /* None */0, MainEditorAssetTree$WonderEditor.make(store, dispatch, /* array */[]))), ReasonReact.element(/* None */0, /* None */0, MainEditorAssetFileContent$WonderEditor.make(store, dispatch, /* array */[])));
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
  newrecord[/* retainedProps */11] = /* record */[
    /* assetTree */StateLogicService$WonderEditor.getEditorState(AssetEditorService$WonderEditor.getAssetTree),
    /* currentTreeNode */StateLogicService$WonderEditor.getEditorState(AssetEditorService$WonderEditor.getCurrentTreeNode)
  ];
  return newrecord;
}

export {
  component    ,
  render       ,
  shouldUpdate ,
  make         ,
  
}
/*  Not a pure module */
