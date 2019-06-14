

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ReasonReact from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as LanguageUtils$WonderEditor from "../../../../utils/language/LanguageUtils.js";
import * as SingleInputModal$WonderEditor from "../../../../atom_component/singleInputModal/SingleInputModal.js";
import * as StateLogicService$WonderEditor from "../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../../../service/state/engine/SceneEngineService.js";
import * as LanguageEditorService$WonderEditor from "../../../../../service/state/editor/LanguageEditorService.js";
import * as HeaderAssetBundleUtils$WonderEditor from "./utils/HeaderAssetBundleUtils.js";
import * as Uint8ArrayAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/Uint8ArrayAssetEditorService.js";
import * as GenerateAssetBundleEngineService$WonderEditor from "../../../../../service/state/engine/asset_bundle/GenerateAssetBundleEngineService.js";

function generateSingleSAB(param) {
  var engineState = param[1];
  return GenerateAssetBundleEngineService$WonderEditor.generateSingleSAB(SceneEngineService$WonderEditor.getSceneGameObject(engineState), Uint8ArrayAssetEditorService$WonderEditor.buildImageUint8ArrayMap(param[0]), engineState);
}

var Method = /* module */[/* generateSingleSAB */generateSingleSAB];

var component = ReasonReact.statelessComponent("HeaderAssetBundleGenerateSingleSAB");

function render(param, param$1) {
  var submitFunc = param$1[1];
  var closeFunc = param$1[0];
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  return ReasonReact.element(undefined, undefined, SingleInputModal$WonderEditor.make((function (param) {
                    return Curry._1(closeFunc, /* () */0);
                  }), LanguageUtils$WonderEditor.getHeaderLanguageDataByType("generate-single-sab", languageType), "name", undefined, (function (baseName) {
                    HeaderAssetBundleUtils$WonderEditor.downloadAB("" + (String(baseName) + ".sab"), StateLogicService$WonderEditor.getStateToGetData(generateSingleSAB));
                    return Curry._1(submitFunc, /* () */0);
                  }), "WonderSingleSAB", /* array */[]));
}

function make(closeFunc, submitFunc, _children) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(self, /* tuple */[
                          closeFunc,
                          submitFunc
                        ]);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

export {
  Method ,
  component ,
  render ,
  make ,
  
}
/* component Not a pure module */
