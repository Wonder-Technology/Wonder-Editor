

import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as TreeAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/TreeAssetEditorService.js";

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
                return StateEditorService$WonderEditor.setState(TreeAssetEditorService$WonderEditor.createTree(editorState));
              }));
}

export {
  buildFakeFileReader ,
  buildFakeImage ,
  _buildImageObj ,
  initAssetTree ,
  
}
/* buildFakeFileReader Not a pure module */
