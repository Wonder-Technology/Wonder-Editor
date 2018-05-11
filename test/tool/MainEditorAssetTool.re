open FileType;

open AssetTreeNodeType;

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

let _buildFakeJsonFileResult = () => {name: "2.json", type_: FileType.Json, result: "2.json"};

let _buildFakeImgFileResult = () => {name: "1.jpg", type_: FileType.Image, result: "1.jpg"};

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
  |> WonderCommonlib.SparseMapService.set(imgFileId, _buildFakeImgFileResult())
  |> WonderCommonlib.SparseMapService.set(jsonFileId, _buildFakeJsonFileResult());

let initAssetTree = (buildAssetTreeFunc, ()) =>
  (
    (editorState) =>
      editorState
      |> AssetEditorService.setAsseTree(buildAssetTreeFunc())
      |> AssetEditorService.setFileMap(
           editorState |> AssetEditorService.unsafeGetFileMap |> buildFakeFileMap
         )
  )
  |> StateLogicService.getAndSetEditorState;

let setJsonFileToBeCurrentFile = () =>
  AssetEditorService.setCurrentFile(jsonFileId) |> StateLogicService.getAndSetEditorState;

let setImgFileToBeCurrentFile = () =>
  AssetEditorService.setCurrentFile(imgFileId) |> StateLogicService.getAndSetEditorState;

let setFolderToBeCurrentTreeNode = () =>
  AssetEditorService.setCurrentTreeNode(folderId1) |> StateLogicService.getAndSetEditorState;