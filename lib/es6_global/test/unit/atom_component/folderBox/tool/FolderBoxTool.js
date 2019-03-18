

import * as TestTool$WonderEditor from "../../../../tool/TestTool.js";
import * as FolderBox$WonderEditor from "../../../../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/atom_component/folderBox/ui/FolderBox.js";

function onDoubleClick(nodeId, $staropt$star, _) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  return FolderBox$WonderEditor.Method[/* onDoubleClick */0](dispatchFunc, nodeId);
}

export {
  onDoubleClick ,
  
}
/* TestTool-WonderEditor Not a pure module */
