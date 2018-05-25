/* open FileType;

open AssetTreeNodeType;

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
       }
     }
|}
];

let _increaseIndex = () => {
  let (index, editorState) = StateEditorService.getState() |> AssetUtils.increaseIndex;
  editorState |> StateEditorService.setState |> ignore;
  index
};

let assetTreeRootId = AssetEditorService.getIndex |> StateLogicService.getEditorState;

/* TODO change to function */
let generateFolde1Id = () => _increaseIndex();

let folderId1 = _increaseIndex();

let folderId2 = _increaseIndex();

let imgFileId = _increaseIndex();

let jsonFileId = _increaseIndex();

let buildFakeJsonFileResult = () => {name: "2.json", type_: FileType.Json, result: Some("2.json")};

let buildFakeImgFileResult = () => {name: "1.jpg", type_: FileType.Image, result: Some("1.jpg")};

/* TODO fix
   let buildFakeFolderArray = (rootAssetChildrenNodeParent, assetTreeNode1, assetTreeNode2) => [|
   rootAssetChildrenNodeParent, assetTreeNode1, assetTreeNode2
   |]; */
let buildFakeFolderArray = () => [|assetTreeRootId, folderId1, folderId2|];

let buildSimpleAssetTree = () => [|{id: assetTreeRootId, children: [||]}|];

/* let currentAssetFileNode = crAssetChildrenNodeParentNode();

   setCurrentAssetFileNode(currentAssetFileNode, editorState);

   buildTwoLayerAssetTree(
     createAssetChildrenNodeParent(),

     currentAssetFileNode,
   ) */
/* let buildTwoLayerAssetTree = (assetTreeRootNode, currentAssetTreeNode, ) => [| */
let buildTwoLayerAssetTree = () => [|
  {
    id: assetTreeRootId,
    children: [|
      {id: folderId1children: [||]},
      {
        id: folderId2,
        children: [||]
      }
    |]
  }
|];

let buildThreeLayerAssetTree = () => [|
  {
    id: assetTreeRootId,
    children: [|
      {
        id: folderId1,
        children: [|
          {id: folderId2, children: [||]}
        |]
      }
    |]
  }
|];

let buildFakeFileMap = (nodeMap) =>
  nodeMap
  |> WonderCommonlib.SparseMapService.set(imgFileId, buildFakeImgFileResult())
  |> WonderCommonlib.SparseMapService.set(jsonFileId, buildFakeJsonFileResult());

let initAssetTree = (buildAssetTreeFunc, ()) =>
  (
    (editorState) =>
      editorState
      |> AssetTreeRootEditorService.setAssetTreeRoot(buildAssetTreeFunc())
      |> AssetEditorService.setFileMap(
           editorState |> AssetEditorService.unsafeGetFileMap |> buildFakeNodeMap
         )
      /* |> AssetEditorService.setFolderArray(buildFakeFolderArray()) */
      |> AssetEditorService.setFolderArray(
           buildFakeFolderArray
             (
               createAssetChildrenNodeParent(),
               createAssetChildrenNodeParent(),
               createAssetChildrenNodeParent()
             )
             /* TODO create when test */
             /* (
                  createAssetChildrenNodeParent(),
                  createAssetChildrenNodeParent(),
                  createAssetChildrenNodeParent()
                ) */
         )
  )
  |> StateLogicService.getAndSetEditorState;

let setJsonFileToBeCurrentAssetFileNode = () =>
  AssetEditorService.setCurrentAssetFileNode(jsonFileId) |> StateLogicService.getAndSetEditorState;

let setImgFileToBeCurrentAssetFileNode = () =>
  AssetCurrentAssetTreeNodeEditorService.setCurrentAssetTreeNode(imgFileId) |> StateLogicService.getAndSetEditorState;

let setRootToBeCurrentAssetChildrenNodeParent = () =>
  AssetCurrentAssetChildrenNodeParentEditorService.setCurrentAssetChildrenNodeParent(assetTreeRootId)
  |> StateLogicService.getAndSetEditorState;

let setFolder1ToBeCurrentAssetChildrenNodeParent = () =>
  AssetCurrentAssetChildrenNodeParentEditorService.setCurrentAssetChildrenNodeParent(folderId1)
  |> StateLogicService.getAndSetEditorState;

let setFolder2ToBeCurrentAssetChildrenNodeParent = () =>
  AssetCurrentAssetChildrenNodeParentEditorService.setCurrentAssetChildrenNodeParent(folderId2)
  |> StateLogicService.getAndSetEditorState; */