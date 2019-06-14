

import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateEditorService$WonderEditor from "../../../state/editor/StateEditorService.js";
import * as FolderNodeSelectTreeService$WonderEditor from "./FolderNodeSelectTreeService.js";

var hasRootNode = FolderNodeSelectTreeService$WonderEditor.isFolderNode;

function getRootNode(tree) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("tree has root node", "not"), (function (param) {
                        return Contract$WonderLog.assertTrue(FolderNodeSelectTreeService$WonderEditor.isFolderNode(tree));
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return tree;
}

export {
  hasRootNode ,
  getRootNode ,
  
}
/* Log-WonderLog Not a pure module */
