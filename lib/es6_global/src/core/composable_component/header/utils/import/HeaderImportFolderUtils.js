

import * as AssetTreeUtils$WonderEditor from "../../../mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/composable_component/utils/AssetTreeUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as FileNameService$WonderEditor from "../../../../../service/atom/FileNameService.js";
import * as FolderNodeUtils$WonderEditor from "../../../mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/utils/FolderNodeUtils.js";

function buildFolder(path, param) {
  var engineState = param[1];
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, pathName) {
          var editorState = param[1];
          var parentFolderNodeId = param[0];
          var match = pathName === FolderNodeUtils$WonderEditor.getAssetTreeRootName(/* () */0);
          if (match) {
            var match$1 = AssetTreeUtils$WonderEditor.rebuildRootAssetTree(parentFolderNodeId, pathName, /* tuple */[
                  editorState,
                  engineState
                ]);
            return /* tuple */[
                    match$1[0],
                    match$1[1]
                  ];
          } else {
            var match$2 = AssetTreeUtils$WonderEditor.rebuildFolder(parentFolderNodeId, pathName, /* tuple */[
                  editorState,
                  engineState
                ]);
            return /* tuple */[
                    match$2[0],
                    match$2[1]
                  ];
          }
        }), /* tuple */[
        undefined,
        param[0]
      ], FileNameService$WonderEditor.removePathPostfix(path).split("/"));
  return /* tuple */[
          match[0],
          match[1]
        ];
}

export {
  buildFolder ,
  
}
/* AssetTreeUtils-WonderEditor Not a pure module */
