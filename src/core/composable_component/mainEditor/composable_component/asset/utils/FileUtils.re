open FileType;

let convertFileJsObjectToFileInfoRecord = (fileObject) => {
  name: fileObject##name,
  type_: fileObject##_type,
  file: FileType.convertFileJsObjectToFile(fileObject)
};

let _handleSpecificFuncByType = (type_, (handleJsonFunc, handleImageFunc)) =>
  switch type_ {
  | "application/json" => handleJsonFunc()
  | "image/jpeg"
  | "image/png" => handleImageFunc()
  | _ =>
    WonderLog.Log.error(
      WonderLog.Log.buildErrorMessage(
        ~title="readFileByType",
        ~description={j|the specific type:$type_ is not find|j},
        ~reason="",
        ~solution={j||j},
        ~params={j|fileInfo:$type_|j}
      )
    )
  };

let readFileByType = (reader, fileInfo: fileInfoType) =>
  _handleSpecificFuncByType(
    fileInfo.type_,
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
  |> StateEditorService.setState;
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
  );
  StateEditorService.getState()
  |> AssetEditorService.unsafeGetAssetTree
  |> WonderLog.Log.print
  |> ignore
};