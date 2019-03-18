

import * as List from "../../../../../../node_modules/bs-platform/lib/es6/list.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as SettingTool$WonderEditor from "../SettingTool.js";
import * as OptionService$WonderEditor from "../../../../src/service/primitive/OptionService.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as DebugSettingEditorService$WonderEditor from "../../../../src/service/state/editor/setting/DebugSettingEditorService.js";

function getMessage(output) {
  return List.hd(Sinon.getArgs(Sinon.getCall(0, output)));
}

function notShowMessage() {
  StateEditorService$WonderEditor.setState(DebugSettingEditorService$WonderEditor.setIsShowMessage(false, StateLogicService$WonderEditor.getEditorState(SettingTool$WonderEditor.initSetting)));
  return /* () */0;
}

function showMessage() {
  StateEditorService$WonderEditor.setState(DebugSettingEditorService$WonderEditor.setIsShowMessage(true, StateLogicService$WonderEditor.getEditorState(SettingTool$WonderEditor.initSetting)));
  return /* () */0;
}

var buildFakeError = function (sandbox){
    sandbox.spy(Error, "captureStackTrace");

    return Error;
  };

function judgeError(message, errorStub) {
  return Wonder_jest.Expect[/* toContainString */11](message)(Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(Js_primitive.undefined_to_opt(JSON.stringify(Sinon.getArgs(errorStub))))));
}

export {
  getMessage ,
  notShowMessage ,
  showMessage ,
  buildFakeError ,
  judgeError ,
  
}
/* Sinon Not a pure module */
