

import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as IdAssetService$WonderEditor from "./IdAssetService.js";
import * as StateEditorService$WonderEditor from "../../../state/editor/StateEditorService.js";
import * as UIStateAssetService$WonderEditor from "./UIStateAssetService.js";
import * as FolderNodeAssetService$WonderEditor from "./FolderNodeAssetService.js";

function getAssetTreeRootName(param) {
  return "Assets";
}

function hasRootNode(tree) {
  if (FolderNodeAssetService$WonderEditor.isFolderNode(tree)) {
    return FolderNodeAssetService$WonderEditor.getNodeName(FolderNodeAssetService$WonderEditor.getNodeData(tree)) === "Assets";
  } else {
    return false;
  }
}

function getRootNode(tree) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("tree has root node", "not"), (function (param) {
                        return Contract$WonderLog.assertTrue(hasRootNode(tree));
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return tree;
}

function buildRootNode(name, index) {
  var match = IdAssetService$WonderEditor.generateNodeId(index);
  var id = match[1];
  return /* tuple */[
          id,
          FolderNodeAssetService$WonderEditor.buildNode(id, name, UIStateAssetService$WonderEditor.build(undefined, true, /* () */0), /* () */0),
          match[0]
        ];
}

export {
  getAssetTreeRootName ,
  hasRootNode ,
  getRootNode ,
  buildRootNode ,
  
}
/* Log-WonderLog Not a pure module */
