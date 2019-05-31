

import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ManageEventEngineService$WonderEditor from "../../../../service/state/engine/event/ManageEventEngineService.js";
import * as CreateCustomEventEngineService$WonderEditor from "../../../../service/state/engine/event/CreateCustomEventEngineService.js";

function getProgressChangePercentCustomGlobalEventName(param) {
  return "wd_editor_progress_change_percent";
}

function getProgressShowCustomGlobalEventName(param) {
  return "wd_editor_progress_show";
}

function getProgressHideCustomGlobalEventName(param) {
  return "wd_editor_progress_hide";
}

function show(engineState) {
  return ManageEventEngineService$WonderEditor.triggerCustomGlobalEvent(CreateCustomEventEngineService$WonderEditor.create("wd_editor_progress_show", undefined), engineState)[0];
}

function hide(engineState) {
  return ManageEventEngineService$WonderEditor.triggerCustomGlobalEvent(CreateCustomEventEngineService$WonderEditor.create("wd_editor_progress_hide", undefined), engineState)[0];
}

function changePercent(percent, engineState) {
  return ManageEventEngineService$WonderEditor.triggerCustomGlobalEvent(CreateCustomEventEngineService$WonderEditor.create("wd_editor_progress_change_percent", Caml_option.some(percent)), engineState)[0];
}

function finish(engineState) {
  return hide(changePercent(100, engineState));
}

export {
  getProgressChangePercentCustomGlobalEventName ,
  getProgressShowCustomGlobalEventName ,
  getProgressHideCustomGlobalEventName ,
  show ,
  hide ,
  changePercent ,
  finish ,
  
}
/* ManageEventEngineService-WonderEditor Not a pure module */
