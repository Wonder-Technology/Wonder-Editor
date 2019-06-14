

import * as Js_option from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as IterateTreeAssetService$WonderEditor from "./IterateTreeAssetService.js";
import * as ScriptAttributeNodeAssetService$WonderEditor from "./ScriptAttributeNodeAssetService.js";

function getNewAttributeName(param) {
  return "New Script Attribute";
}

function getNewFieldName(param) {
  return "New Script Attribute Field";
}

function isTreeScriptAttributeNodesHasTargetName(name, tree) {
  return Js_option.isSome(IterateTreeAssetService$WonderEditor.find(tree, undefined, undefined, undefined, (function (node) {
                    return ScriptAttributeNodeAssetService$WonderEditor.getNodeName(node) === name;
                  }), undefined, undefined, undefined, /* () */0));
}

function rename(name, nodeData) {
  return /* record */[
          /* name */name,
          /* attribute */nodeData[/* attribute */1]
        ];
}

export {
  getNewAttributeName ,
  getNewFieldName ,
  isTreeScriptAttributeNodesHasTargetName ,
  rename ,
  
}
/* IterateTreeAssetService-WonderEditor Not a pure module */
