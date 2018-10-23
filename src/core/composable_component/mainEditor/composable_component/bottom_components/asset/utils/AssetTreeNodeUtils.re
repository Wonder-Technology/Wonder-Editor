open AssetNodeType;

open FileType;

open Js.Promise;

let getAssetTreeRootName = () => "Assets";

let getDefaultFolderName = () => "newFolder";

let _getFolderDefaultName = (index, editorState) =>
  index === (editorState |> AssetTreeRootEditorService.getRootTreeNodeId) ?
    getAssetTreeRootName() : getDefaultFolderName();

let addFolderIntoNodeMap =
    (index, parentFolderNodeId, (editorState, engineState)) =>
  editorState
  |> _getFolderDefaultName(index)
  |. AssetUtils.getUniqueTreeNodeName(
       Folder,
       parentFolderNodeId,
       (editorState, engineState),
     )
  |> AssetFolderNodeMapEditorService.buildFolderNodeResult(
       parentFolderNodeId,
     )
  |> AssetFolderNodeMapEditorService.setResult(index, _, editorState);

let addMaterialIntoNodeMap =
    (index, parentFolderNodeId, material, editorState) =>
  editorState
  |> AssetMaterialNodeMapEditorService.setResult(
       index,
       AssetMaterialNodeMapEditorService.buildMaterialNodeResult(
         parentFolderNodeId,
         AssetMaterialDataType.LightMaterial,
         material,
       ),
     );

let initRootAssetTree = (editorState, engineState) =>
  switch (AssetTreeRootEditorService.getAssetTreeRoot(editorState)) {
  | None =>
    let editorState = editorState |> AssetIndexEditorService.increaseIndex;
    let rootIndex = editorState |> AssetIndexEditorService.getIndex;

    (
      rootIndex |. AssetTreeEditorService.buildAssetTreeNodeByIndex(Folder),
      (editorState, engineState) |> addFolderIntoNodeMap(rootIndex, None),
    );
  | Some(assetTreeRoot) => (assetTreeRoot, editorState)
  };

let convertFileJsObjectToFileInfoRecord = fileObject => {
  name: fileObject##name,
  type_: fileObject##_type,
  file: FileType.convertFileJsObjectToFile(fileObject),
};

let getUploadFileType = name => {
  let (_, extname) = FileNameService.getBaseNameAndExtName(name);

  switch (extname) {
  | ".wdb" => LoadWDB
  | ".jpg"
  | ".png" => LoadImage
  | ".wpk" => LoadWPK
  | _ => LoadError
  };
};

let handleSpecificFuncByTypeSync =
    (type_, (handleImageFunc, handleWDBFunc, handleWPKFunc)) =>
  switch (type_) {
  | LoadImage => handleImageFunc()
  | LoadWDB => handleWDBFunc()
  | LoadWPK => handleWPKFunc()
  | LoadError =>
    WonderLog.Log.error(
      WonderLog.Log.buildErrorMessage(
        ~title="handleSpecificFuncByType",
        ~description={j|the load file type is error|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let readFileByTypeSync = (reader, fileInfo: fileInfoType) =>
  handleSpecificFuncByTypeSync(
    getUploadFileType(fileInfo.name),
    (
      () => FileReader.readAsDataURL(reader, fileInfo.file),
      () => FileReader.readAsArrayBuffer(reader, fileInfo.file),
      () => FileReader.readAsArrayBuffer(reader, fileInfo.file),
    ),
  );

let createNodeAndAddToTargetNodeChildren =
    (targetTreeNode, newIndex, type_, editorState) =>
  editorState
  |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
  |> AssetUtils.insertSourceTreeNodeToTargetTreeNodeChildren(
       targetTreeNode,
       AssetTreeEditorService.buildAssetTreeNodeByIndex(newIndex, type_),
     )
  |. AssetTreeRootEditorService.setAssetTreeRoot(editorState);
