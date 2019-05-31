

import * as Js_option from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as IterateTreeAssetService$WonderEditor from "./IterateTreeAssetService.js";
import * as ScriptEventFunctionNodeAssetService$WonderEditor from "./ScriptEventFunctionNodeAssetService.js";

function getNewName(param) {
  return "New Script EventFunction";
}

function isTreeScriptEventFunctionNodesHasTargetName(name, tree) {
  return Js_option.isSome(IterateTreeAssetService$WonderEditor.find(tree, undefined, undefined, (function (node) {
                    return ScriptEventFunctionNodeAssetService$WonderEditor.getNodeName(node) === name;
                  }), undefined, undefined, undefined, undefined, /* () */0));
}

function rename(name, nodeData) {
  return /* record */[
          /* name */name,
          /* eventFunctionData */nodeData[/* eventFunctionData */1]
        ];
}

export {
  getNewName ,
  isTreeScriptEventFunctionNodesHasTargetName ,
  rename ,
  
}
/* IterateTreeAssetService-WonderEditor Not a pure module */
