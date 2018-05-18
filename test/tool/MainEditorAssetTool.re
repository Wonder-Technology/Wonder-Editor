open FileType;

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

let folderId1 = _increaseIndex();

let folderId2 = _increaseIndex();

let imgFileId = _increaseIndex();

let jsonFileId = _increaseIndex();

let buildFakeJsonFileResult = () => {name: "2.json", type_: FileType.Json, result: "2.json"};

let buildFakeImgFileResult = () => {name: "1.jpg", type_: FileType.Image, result: "1.jpg"};

let buildFakeFolderArray = () => [|assetTreeRootId, folderId1, folderId2|];

let buildSimpleAssetTree = () => [|
  {id: assetTreeRootId, name: "asset", imgArray: [||], jsonArray: [||], children: [||]}
|];

let buildTwoLayerAssetTree = () => [|
  {
    id: assetTreeRootId,
    name: "asset",
    imgArray: [||],
    jsonArray: [||],
    children: [|
      {id: folderId1, name: "folder1", imgArray: [||], jsonArray: [||], children: [||]},
      {
        id: folderId2,
        name: "folder2",
        imgArray: [|imgFileId|],
        jsonArray: [|jsonFileId|],
        children: [||]
      }
    |]
  }
|];

let buildThreeLayerAssetTree = () => [|
  {
    id: assetTreeRootId,
    name: "asset",
    imgArray: [||],
    jsonArray: [||],
    children: [|
      {
        id: folderId1,
        name: "folder1",
        imgArray: [||],
        jsonArray: [||],
        children: [|
          {
            id: folderId2,
            name: "folder2",
            imgArray: [|imgFileId|],
            jsonArray: [|jsonFileId|],
            children: [||]
          }
        |]
      }
    |]
  }
|];

let buildFakeFileMap = (fileMap) =>
  fileMap
  |> WonderCommonlib.SparseMapService.set(imgFileId, buildFakeImgFileResult())
  |> WonderCommonlib.SparseMapService.set(jsonFileId, buildFakeJsonFileResult());

let initAssetTree = (buildAssetTreeFunc, ()) =>
  (
    (editorState) =>
      editorState
      |> AssetEditorService.setAsseTree(buildAssetTreeFunc())
      |> AssetEditorService.setFileMap(
           editorState |> AssetEditorService.unsafeGetFileMap |> buildFakeFileMap
         )
      |> AssetEditorService.setFolderArray(buildFakeFolderArray())
  )
  |> StateLogicService.getAndSetEditorState;

let setJsonFileToBeCurrentFile = () =>
  AssetEditorService.setCurrentFile(jsonFileId) |> StateLogicService.getAndSetEditorState;

let setImgFileToBeCurrentFile = () =>
  AssetEditorService.setCurrentFile(imgFileId) |> StateLogicService.getAndSetEditorState;

let setRootToBeCurrentTreeNode = () =>
  AssetEditorService.setCurrentTreeNode(assetTreeRootId) |> StateLogicService.getAndSetEditorState;

let setFolder1ToBeCurrentTreeNode = () =>
  AssetEditorService.setCurrentTreeNode(folderId1) |> StateLogicService.getAndSetEditorState;

let setFolder2ToBeCurrentTreeNode = () =>
  AssetEditorService.setCurrentTreeNode(folderId2) |> StateLogicService.getAndSetEditorState;