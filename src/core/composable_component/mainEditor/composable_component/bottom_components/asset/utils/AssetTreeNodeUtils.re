open AssetNodeType;

open FileType;

open Js.Promise;

let getAssetTreeRootName = () => "Assets";

let getNewFolderName = () => "New Folder";

let getNoNameFolderName = () => "NoName Folder";

let getNoNameFolderNameByNodeId = (nodeId, editorState) =>
  nodeId === (editorState |> AssetTreeRootEditorService.getRootTreeNodeId) ?
    getAssetTreeRootName() : getNoNameFolderName();

let addFolderIntoNodeMap =
    (nodeId, parentFolderNodeId, name, (editorState, engineState)) =>
  name
  |. AssetUtils.getUniqueTreeNodeName(
       Folder,
       parentFolderNodeId,
       (editorState, engineState),
     )
  |> AssetFolderNodeMapEditorService.buildFolderNodeResult(
       parentFolderNodeId,
     )
  |> AssetFolderNodeMapEditorService.setResult(nodeId, _, editorState);

let addMaterialIntoNodeMap =
    (nodeId, parentFolderNodeId, material, editorState) =>
  editorState
  |> AssetMaterialNodeMapEditorService.setResult(
       nodeId,
       AssetMaterialNodeMapEditorService.buildMaterialNodeResult(
         parentFolderNodeId,
         AssetMaterialDataType.LightMaterial,
         material,
       ),
     );

let addTextureIntoNodeMap =
    (nodeId, parentFolderNodeId, texture, imageNodeId, editorState) =>
  editorState
  |> AssetTextureNodeMapEditorService.setResult(
       nodeId,
       AssetTextureNodeMapEditorService.buildTextureNodeResult(
         texture,
         parentFolderNodeId,
         imageNodeId,
       ),
     );

let initRootAssetTree = (editorState, engineState) =>
  switch (AssetTreeRootEditorService.getAssetTreeRoot(editorState)) {
  | None =>
    let editorState = editorState |> AssetIndexEditorService.increaseIndex;
    let rootIndex = editorState |> AssetIndexEditorService.getIndex;

    (
      rootIndex |. AssetTreeEditorService.buildAssetTreeNodeByIndex(Folder),
      (editorState, engineState)
      |> addFolderIntoNodeMap(rootIndex, None, getAssetTreeRootName()),
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
    (targetTreeNode, nodeId, type_, editorState) =>
  editorState
  |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
  |> AssetUtils.insertSourceTreeNodeToTargetTreeNodeChildren(
       targetTreeNode,
       AssetTreeEditorService.buildAssetTreeNodeByIndex(nodeId, type_),
     )
  |. AssetTreeRootEditorService.setAssetTreeRoot(editorState);