

import * as AssetTreeUtils$WonderEditor from "../../../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/composable_component/utils/AssetTreeUtils.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/StateEngineService.js";
import * as TreeRootAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/TreeRootAssetEditorService.js";

var buildFakeFileReader = (
     function (){
       window.FileReader = function(){
         this.result = null;
         this.onload = null;
         this.readAsDataURL = function(file) {
            this.result = file.file;
            this.onload();
         };
         this.readAsText = function(file) {
            this.result = file.file;
            this.onload();
         };
         this.readAsArrayBuffer = function(file) {
            this.result = file.file;
            this.onload();
         };
       }
     }
);

var buildFakeImage = (
     function (){
       window.Image = function(){
         this.src = null;
         this.onload = null;
         this.complete = true;
       }
     }
);

function _buildImageObj(src) {
  return {
          src: src,
          getAttribute: (function () {
              return src;
            })
        };
}

function initAssetTree() {
  return StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
                var match = AssetTreeUtils$WonderEditor.initRootAssetTree(editorState, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                return TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(match[0], match[1]);
              }));
}

export {
  buildFakeFileReader ,
  buildFakeImage ,
  _buildImageObj ,
  initAssetTree ,
  
}
/* buildFakeFileReader Not a pure module */
