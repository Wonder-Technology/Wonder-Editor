

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as LanguageUtils$WonderEditor from "../../../../../utils/language/LanguageUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as PickColorComponent$WonderEditor from "../atom_component/PickColorComponent/ui/PickColorComponent.js";
import * as LanguageEditorService$WonderEditor from "../../../../../../service/state/editor/LanguageEditorService.js";
import * as MainEditorMaterialMap$WonderEditor from "../composable_component/sceneTree_Inspector/composable_component/renderGroup/material/atom_component/MainEditorMaterialMap.js";
import * as InspectorMaterialUtils$WonderEditor from "./InspectorMaterialUtils.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../../service/state/engine/LightMaterialEngineService.js";
import * as MainEditorFloatInputBaseComponent$WonderEditor from "../composable_component/sceneTree_Inspector/atom_component/FloatInputBaseComponent/MainEditorFloatInputBaseComponent.js";

function buildBasicMaterialComponent(materialComponent, param) {
  return React.createElement("article", {
              className: "wonder-basic-material"
            }, ReasonReact.element(undefined, undefined, PickColorComponent$WonderEditor.make("Color", "color", (function (param) {
                        return InspectorMaterialUtils$WonderEditor.getBasicMaterialColor(materialComponent, param);
                      }), Curry._1(param[0], materialComponent), param[1], /* array */[])));
}

function buildLightMaterialComponent(param, materialComponent, param$1) {
  var blurShininessFunc = param$1[3];
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  return React.createElement("article", {
              className: "wonder-light-material"
            }, ReasonReact.element(undefined, undefined, PickColorComponent$WonderEditor.make("Diffuse Color", LanguageUtils$WonderEditor.getInspectorLanguageDataByType("material-diffuseColor-describe", languageType), (function (param) {
                        return InspectorMaterialUtils$WonderEditor.getLightMaterialColor(materialComponent, param);
                      }), Curry._1(param$1[0], materialComponent), param$1[2], /* array */[])), ReasonReact.element(undefined, undefined, MainEditorMaterialMap$WonderEditor.make(param[0], param[1], materialComponent, "Diffuse Map", LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseMap, param$1[4], param$1[5], false, LanguageUtils$WonderEditor.getInspectorLanguageDataByType("material-diffuseMap-describe", languageType), /* array */[])), ReasonReact.element(undefined, undefined, MainEditorFloatInputBaseComponent$WonderEditor.make(blurShininessFunc, "Shininess", StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                            return LightMaterialEngineService$WonderEditor.getLightMaterialShininess(materialComponent, param);
                          })), Curry._1(param$1[1], materialComponent), blurShininessFunc, LanguageUtils$WonderEditor.getInspectorLanguageDataByType("material-shininess-describe", languageType), /* array */[])));
}

export {
  buildBasicMaterialComponent ,
  buildLightMaterialComponent ,
  
}
/* react Not a pure module */
