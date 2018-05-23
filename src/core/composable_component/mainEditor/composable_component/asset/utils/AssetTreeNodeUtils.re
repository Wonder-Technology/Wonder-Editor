open FileType;

open AssetTreeNodeType;

let _getTreeNodeName = (index) =>
  index === (AssetUtils.getRootTreeNodeId |> StateLogicService.getEditorState) ?
    "Asset" : "newFolder";

let buildFolderResult = (index) => {
  name: _getTreeNodeName(index),
  type_: FileType.Folder,
  result: None
};

let renameNodeResult = (name, result) => {...result, name};

let addFolderIntoNodeMap = (index, editorState) =>
  editorState
  |> AssetEditorService.setNodeMap(
       editorState
       |> AssetEditorService.unsafeGetNodeMap
       |> WonderCommonlib.SparseMapService.set(index, buildFolderResult(index))
     );

let buildAssetTreeNodeByIndex = (index) => {id: index, children: [||]};

let initRootAssetTree = (editorState) =>
  switch (AssetEditorService.getAssetTree(editorState)) {
  | None =>
    let rootIndex = editorState |> AssetEditorService.getIndex;
    (
      [|rootIndex |> buildAssetTreeNodeByIndex|],
      editorState
      |> addFolderIntoNodeMap(rootIndex)
      |> AssetEditorService.setCurrentAssetChildrenNodeParent(rootIndex)
    )
  | Some(assetTree) => (assetTree, editorState)
  };

let convertFileJsObjectToFileInfoRecord = (fileObject) => {
  name: fileObject##name,
  type_: fileObject##_type,
  file: FileType.convertFileJsObjectToFile(fileObject)
};

let getFileTypeById = (fileId, editorState) =>
  switch (
    editorState
    |> AssetEditorService.unsafeGetNodeMap
    |> WonderCommonlib.SparseMapService.get(fileId)
  ) {
  | Some(fileResult) => fileResult.type_
  | None =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getFileTypeByFileId",
        ~description={j|the fileId:$fileId not exist in nodeMap|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let getAssetTreeFileTypeByFileType = (type_) =>
  switch type_ {
  | "application/json" => FileType.Json
  | "image/jpeg"
  | "image/png" => FileType.Image
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getFileTypeByFileId",
        ~description={j|the type:$type_ type not exist|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let _handleSpecificFuncByType = (type_, (handleJsonFunc, handleImageFunc)) =>
  switch type_ {
  | FileType.Json => handleJsonFunc()
  | FileType.Image => handleImageFunc()
  | _ =>
    WonderLog.Log.error(
      WonderLog.Log.buildErrorMessage(
        ~title="_handleSpecificFuncByType",
        ~description={j|the specific type:$type_ is not find|j},
        ~reason="",
        ~solution={j||j},
        ~params={j|type:$type_|j}
      )
    )
  };

let readFileByType = (reader, fileInfo: fileInfoType) =>
  _handleSpecificFuncByType(
    getAssetTreeFileTypeByFileType(fileInfo.type_),
    (
      () => FileReader.readAsText(reader, fileInfo.file),
      () => FileReader.readAsDataURL(reader, fileInfo.file)
    )
  );

let handleFileByType = (fileResult) => {
  let editorState = StateEditorService.getState();
  let (newIndex, editorState) = editorState |> AssetUtils.increaseIndex;
  editorState
  |> AssetEditorService.setNodeMap(
       editorState
       |> AssetEditorService.unsafeGetNodeMap
       |> WonderCommonlib.SparseMapService.set(newIndex, fileResult)
     )
  |> StateEditorService.setState
  |> ignore;
  _handleSpecificFuncByType(
    fileResult.type_,
    (
      () => {
        let editorState = StateEditorService.getState();
        AssetEditorService.setAsseTree(
          AssetUtils.insertNewTreeNodeToTargetTreeNode(
            editorState |> AssetUtils.getTargetTreeNodeId,
            newIndex |> buildAssetTreeNodeByIndex,
            editorState |> AssetEditorService.unsafeGetAssetTree
          )
        )
        |> StateLogicService.getAndSetEditorState
      },
      () => {
        let editorState = StateEditorService.getState();
        AssetEditorService.setAsseTree(
          AssetUtils.insertNewTreeNodeToTargetTreeNode(
            editorState |> AssetUtils.getTargetTreeNodeId,
            newIndex |> buildAssetTreeNodeByIndex,
            editorState |> AssetEditorService.unsafeGetAssetTree
          )
        )
        |> StateLogicService.getAndSetEditorState
      }
    )
  )
};