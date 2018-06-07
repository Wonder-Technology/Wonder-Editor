open AssetNodeType;

open FileType;

open AssetTreeNodeType;

open EditorType;

let renameNodeResult = (name, result: AssetNodeType.nodeResultType) => {
  ...result,
  name,
};

let addFolderIntoNodeMap = (index, editorState) =>
  editorState
  |> AssetNodeMapEditorService.setResult(
       index,
       AssetNodeEditorService.buildFolderResult(index, editorState),
     );

let initRootAssetTree = editorState =>
  switch (AssetTreeRootEditorService.getAssetTreeRoot(editorState)) {
  | None =>
    let rootIndex = editorState |> AssetIndexEditorService.getIndex;
    (
      rootIndex |> AssetNodeEditorService.buildAssetTreeNodeByIndex,
      editorState |> addFolderIntoNodeMap(rootIndex),
    );
  | Some(assetTreeRoot) => (assetTreeRoot, editorState)
  };

let convertFileJsObjectToFileInfoRecord = fileObject => {
  name: fileObject##name,
  type_: fileObject##_type,
  file: FileType.convertFileJsObjectToFile(fileObject),
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
        ~params={j||j},
      ),
    )
  };

let getAssetTreeAssetNodeTypeByFileType = type_ =>
  switch (type_) {
  | "application/json" => AssetNodeType.Json
  | "image/jpeg"
  | "image/png" => AssetNodeType.Image
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getAssetTreeAssetNodeTypeByFileType",
        ~description={j|the type:$type_ not exist|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let _handleSpecificFuncByType = (type_, (handleJsonFunc, handleImageFunc)) =>
  switch (type_) {
  | AssetNodeType.Json => handleJsonFunc()
  | AssetNodeType.Image => handleImageFunc()
  | _ =>
    WonderLog.Log.error(
      WonderLog.Log.buildErrorMessage(
        ~title="_handleSpecificFuncByType",
        ~description={j|the specific type:$type_ is not find|j},
        ~reason="",
        ~solution={j||j},
        ~params={j|type:$type_|j},
      ),
    )
  };

let readFileByType = (reader, fileInfo: fileInfoType) =>
  _handleSpecificFuncByType(
    getAssetTreeAssetNodeTypeByFileType(fileInfo.type_),
    (
      () => FileReader.readAsText(reader, fileInfo.file),
      () => FileReader.readAsDataURL(reader, fileInfo.file),
    ),
  );

let addToCurrentNodeParent = (newIndex, editorState) =>
  editorState
  |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
  |> AssetUtils.insertNewTreeNodeToTargetTreeNode(
       editorState |> AssetUtils.getTargetTreeNodeId,
       newIndex |> AssetNodeEditorService.buildAssetTreeNodeByIndex,
     )
  |. AssetTreeRootEditorService.setAssetTreeRoot(editorState);

let handleFileByType = fileResult => {
  let editorState =
    AssetIndexEditorService.increaseIndex |> StateLogicService.getEditorState;
  let newIndex = editorState |> AssetIndexEditorService.getIndex;

  /* TODO test nodeMap:
     load jpg
     load json
     */
  editorState
  |> AssetNodeMapEditorService.setResult(newIndex, fileResult)
  |> addToCurrentNodeParent(newIndex)
  |> StateEditorService.setState
  |> ignore;
};