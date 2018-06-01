open AssetNodeType;

open FileType;

open AssetTreeNodeType;

open EditorType;

let renameNodeResult = (name, result: AssetNodeType.nodeResultType) => {...result, name};

let addFolderIntoNodeMap = (index, editorState) =>
  editorState
  |> AssetNodeMapEditorService.setResult(
       index,
       AssetNodeEditorService.buildFolderResult(index, editorState)
     );

let initRootAssetTree = (editorState) =>
  switch (AssetTreeRootEditorService.getAssetTreeRoot(editorState)) {
  | None =>
    let rootIndex = editorState |> AssetIndexEditorService.getIndex;
    (
      rootIndex |> AssetNodeEditorService.buildAssetTreeNodeByIndex,
      editorState |> addFolderIntoNodeMap(rootIndex)
    )
  | Some(assetTreeRoot) => (assetTreeRoot, editorState)
  };

let convertFileJsObjectToFileInfoRecord = (fileObject) => {
  name: fileObject##name,
  type_: fileObject##_type,
  file: FileType.convertFileJsObjectToFile(fileObject)
};

let getAssetNodeTypeById = (fileId, editorState) =>
  switch (
    editorState
    |> AssetNodeMapEditorService.unsafeGetNodeMap
    |> WonderCommonlib.SparseMapService.get(fileId)
  ) {
  | Some(fileResult) => fileResult.type_
  | None =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getAssetNodeTypeByFileId",
        ~description={j|the fileId:$fileId not exist in nodeMap|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let getAssetTreeAssetNodeTypeByAssetNodeType = (type_) =>
  switch type_ {
  | "application/json" => AssetNodeType.Json
  | "image/jpeg"
  | "image/png" => AssetNodeType.Image
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage
        /* TODO rename to be the function name */
        (
          ~title="getAssetNodeTypeByFileId",
          /* TODO change to ~description={j|the type:$type_ not exist|j}, */
          ~description={j|the type:$type_ type not exist|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j}
        )
    )
  };

let _handleSpecificFuncByType = (type_, (handleJsonFunc, handleImageFunc)) =>
  switch type_ {
  | AssetNodeType.Json => handleJsonFunc()
  | AssetNodeType.Image => handleImageFunc()
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
    getAssetTreeAssetNodeTypeByAssetNodeType(fileInfo.type_),
    (
      () => FileReader.readAsText(reader, fileInfo.file),
      () => FileReader.readAsDataURL(reader, fileInfo.file)
    )
  );

let handleFileByType = (currentNodeParentId, fileResult) => {
  /*
   TODO setResult |> buildAssetTreeNode |> addToCurrentNodeParent(not judge file type_) */
  let editorState = AssetIndexEditorService.increaseIndex |> StateLogicService.getEditorState;
  let newIndex = editorState |> AssetIndexEditorService.getIndex;
  editorState
  |> AssetNodeMapEditorService.setResult(newIndex, fileResult)
  |> StateEditorService.setState
  |> ignore;
  _handleSpecificFuncByType(
    fileResult.type_,
    (
      () => {
        let editorState = StateEditorService.getState();
        AssetTreeRootEditorService.setAssetTreeRoot(
          AssetUtils.insertNewTreeNodeToTargetTreeNode(
            editorState |> AssetUtils.getTargetTreeNodeId(currentNodeParentId),
            newIndex |> AssetNodeEditorService.buildAssetTreeNodeByIndex,
            editorState |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
          )
        )
        |> StateLogicService.getAndSetEditorState
      },
      () => {
        let editorState = StateEditorService.getState();
        AssetTreeRootEditorService.setAssetTreeRoot(
          AssetUtils.insertNewTreeNodeToTargetTreeNode(
            editorState |> AssetUtils.getTargetTreeNodeId(currentNodeParentId),
            newIndex |> AssetNodeEditorService.buildAssetTreeNodeByIndex,
            editorState |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
          )
        )
        |> StateLogicService.getAndSetEditorState
      }
    )
  )
};