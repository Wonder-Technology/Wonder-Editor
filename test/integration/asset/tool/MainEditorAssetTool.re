open AssetTreeNodeType;

open AssetTreeTwoLayerTypeTool;

open AssetTreeThreeLayerTypeTool;

open AssetNodeType;

let buildFakeFileReader = [%bs.raw
  {|
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
|}
];

let buildFakeImage = [%bs.raw
  {|
     function (){
       window.Image = function(){
         this.src = null;
         this.onload = null;
         this.complete = true;
       }
     }
|}
];

let _buildImageObj = src =>
  {"src": src, "getAttribute": prop => src} |> Obj.magic;

/* TODO not need init assettree */
let initAssetTree = () =>
  (
    editorState => {
      let (asseTreeRoot, editorState) =
        AssetTreeUtils.initRootAssetTree(
          editorState,
          StateEngineService.unsafeGetState(),
        );

      editorState |> AssetTreeRootEditorService.setAssetTreeRoot(asseTreeRoot);
    }
  )
  |> StateLogicService.getAndSetEditorState;