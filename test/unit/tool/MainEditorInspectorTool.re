open FileType;

open AssetTreeNodeType;

let _getAssetTreeRootId = () => 0;

let _getFolderId = () => 1;

let _getImgFileId = () => 2;

let _getJsonFileId = () => 3;

let _buildFakeJsonFileResult = () => {name: "2.json", type_: FileType.Json, result: "2.json"};

let _buildFakeImgFileResult = () => {name: "1.jpg", type_: FileType.Image, result: "1.jpg"};

let _buildFakeAssetTree = () => [|
  {
    id: _getAssetTreeRootId(),
    name: "asset",
    imgArray: [||],
    jsonArray: [||],
    children: [|
      {
        id: _getFolderId(),
        name: "folder",
        imgArray: [|_getImgFileId()|],
        jsonArray: [|_getJsonFileId()|],
        children: [||]
      }
    |]
  }
|];

let _buildFakeFileMap = (fileMap) =>
  fileMap
  |> WonderCommonlib.SparseMapService.set(_getImgFileId(), _buildFakeImgFileResult())
  |> WonderCommonlib.SparseMapService.set(_getJsonFileId(), _buildFakeJsonFileResult());

let initInspector = () =>
  (
    (editorState) =>
      editorState
      |> AssetEditorService.setAsseTree(_buildFakeAssetTree())
      |> AssetEditorService.setFileMap(
           editorState |> AssetEditorService.unsafeGetFileMap |> _buildFakeFileMap
         )
  )
  |> StateLogicService.getAndSetEditorState;

let setJsonFileToBeCurrentFile = () =>
  AssetEditorService.setCurrentFile(_getJsonFileId()) |> StateLogicService.getAndSetEditorState;

let setImgFileToBeCurrentFile = () =>
  AssetEditorService.setCurrentFile(_getImgFileId()) |> StateLogicService.getAndSetEditorState;

let setFolderToBeCurrentTreeNode = () =>
  AssetEditorService.setCurrentTreeNode(_getFolderId()) |> StateLogicService.getAndSetEditorState;