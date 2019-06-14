open NodeAssetType;

open AssetTreeTwoLayerTypeTool;

open AssetTreeThreeLayerTypeTool;

open NodeAssetType;

let buildFakeFileReader = [%bs.raw
  {|
     function (param){
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
     function (param){
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

let initAssetTree = () =>
  (
    editorState =>
      /* let (asseTreeRoot, editorState) = */
      editorState
      |> TreeAssetEditorService.createTree
      |> StateEditorService.setState
      /* AssetTreeUtils.initRootAssetTree(
           editorState,
           StateEngineService.unsafeGetState(),
         ); */
      /* editorState |> TreeRootAssetEditorService.setAssetTreeRoot(asseTreeRoot); */
  )
  |> StateLogicService.getAndSetEditorState;