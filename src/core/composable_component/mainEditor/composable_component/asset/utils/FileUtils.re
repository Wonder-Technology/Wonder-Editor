open FileType;

let convertFileJsObjectToFileInfoRecord = (fileObject) => {
  name: fileObject##name,
  type_: fileObject##_type,
  file: FileType.convertFileJsObjectToFile(fileObject)
};

let getFileTypeByFileId = (fileId, editorState) =>
  switch (
    editorState |> AssetEditorService.getFileMap |> WonderCommonlib.SparseMapService.get(fileId)
  ) {
  | Some(fileResult) => fileResult.type_
  | None =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getFileTypeByFileId",
        ~description={j|the fileId:$fileId not exist in fileMap|j},
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
    (() => File.readAsText(reader, fileInfo.file), () => File.readAsDataURL(reader, fileInfo.file))
  );

let handleFileByType = (fileResult) => {
  let editorState = StateEditorService.getState();
  let (newIndex, editorState) = editorState |> AssetUtils.increaseIndex;
  editorState
  |> AssetEditorService.setFileMap(
       editorState
       |> AssetEditorService.getFileMap
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
          AssetUtils.addFileIntoTargetTreeNode(
            editorState |> AssetUtils.getTargetTreeNodeId,
            newIndex,
            FileType.Json,
            editorState |> AssetEditorService.unsafeGetAssetTree
          )
        )
        |> StateLogicService.getAndSetEditorState
      },
      () => {
        let editorState = StateEditorService.getState();
        AssetEditorService.setAsseTree(
          AssetUtils.addFileIntoTargetTreeNode(
            editorState |> AssetUtils.getTargetTreeNodeId,
            newIndex,
            FileType.Image,
            editorState |> AssetEditorService.unsafeGetAssetTree
          )
        )
        |> StateLogicService.getAndSetEditorState
      }
    )
  )
};