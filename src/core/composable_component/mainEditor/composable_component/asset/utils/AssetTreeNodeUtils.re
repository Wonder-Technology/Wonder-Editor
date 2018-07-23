open AssetNodeType;
open FileType;
open Js.Promise;

let addFolderIntoNodeMap = (index, assetState) =>
  assetState
  |> AssetNodeAssetService.buildFolderResult(index)
  |> FolderNodeMapAssetService.setResult(index, _, assetState);

let initRootAssetTree = assetState =>
  switch (AssetTreeRootAssetService.getAssetTreeRoot(assetState)) {
  | None =>
    let rootIndex = assetState |> IndexAssetService.getIndex;
    (
      rootIndex |. AssetNodeAssetService.buildAssetTreeNodeByIndex(Folder),
      assetState |> addFolderIntoNodeMap(rootIndex),
    );
  | Some(assetTreeRoot) => (assetTreeRoot, assetState)
  };

let convertFileJsObjectToFileInfoRecord = fileObject => {
  name: fileObject##name,
  type_: fileObject##_type,
  file: FileType.convertFileJsObjectToFile(fileObject),
};

let getUploadFileType = type_ =>
  switch (type_) {
  | "application/json" => LoadJson
  | "image/jpeg"
  | "image/png" => LoadImage
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getUploadFileType",
        ~description={j|the type:$type_ not exist|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let _handleSpecificFuncByType = (type_, (handleJsonFunc, handleImageFunc)) =>
  switch (type_) {
  | LoadJson => handleJsonFunc()
  | LoadImage => handleImageFunc()
  | _ =>
    WonderLog.Log.error(
      WonderLog.Log.buildErrorMessage(
        ~title="_handleSpecificFuncByType",
        ~description={j|the type:$type_ is not exist|j},
      ),
    )
  };

let readFileByType = (reader, fileInfo: fileInfoType) =>
  _handleSpecificFuncByType(
    getUploadFileType(fileInfo.type_),
    (
      () => FileReader.readAsText(reader, fileInfo.file),
      () => FileReader.readAsDataURL(reader, fileInfo.file),
    ),
  );

let createNodeAndAddToTargetNodeChildren =
    (targetTreeNode, newIndex, type_, assetState) =>
  assetState
  |> AssetTreeRootAssetService.unsafeGetAssetTreeRoot
  |> AssetUtils.insertSourceTreeNodeToTargetTreeNodeChildren(
       targetTreeNode,
       AssetNodeAssetService.buildAssetTreeNodeByIndex(newIndex, type_),
     )
  |. AssetTreeRootAssetService.setAssetTreeRoot(assetState);

let _handleJsonType =
    (fileResult: nodeResultType, newIndex, (resolve, assetState), ()) => {
  let assetState =
    assetState
    |> JsonNodeMapAssetService.setResult(
         newIndex,
         AssetNodeAssetService.buildJsonNodeResult(fileResult),
       )
    |> createNodeAndAddToTargetNodeChildren(
         assetState |> AssetUtils.getTargetTreeNodeId,
         newIndex,
         Json,
       )
    |> StateAssetService.setState;

  resolve(. assetState);
};

let _handleImageType =
    (
      fileResult: AssetNodeType.nodeResultType,
      newIndex,
      (resolve, assetState),
      (),
    ) => {
  let (fileName, _postfix) =
    FileNameService.getBaseNameAndExtName(fileResult.name);

  let (texture, editEngineState, runEngineState) =
    TextureUtils.createAndInitTexture(
      fileName,
      StateLogicService.getEditEngineState(),
      StateLogicService.getRunEngineState(),
    );

  Image.onload(
    fileResult.result,
    loadedImg => {
      editEngineState
      |> BasicSourceTextureEngineService.setSource(
           loadedImg |> ImageType.convertDomToImageElement,
           texture,
         )
      |> StateLogicService.setEditEngineState;

      runEngineState
      |> BasicSourceTextureEngineService.setSource(
           loadedImg |> ImageType.convertDomToImageElement,
           texture,
         )
      |> StateLogicService.setRunEngineState;

      let assetState =
        assetState
        |> ImageBase64MapAssetService.setResult(texture, fileResult.result)
        |> TextureNodeMapAssetService.setResult(
             newIndex,
             AssetNodeAssetService.buildTextureNodeResult(texture),
           )
        |> createNodeAndAddToTargetNodeChildren(
             assetState |> AssetUtils.getTargetTreeNodeId,
             newIndex,
             Texture,
           )
        |> StateAssetService.setState;

      resolve(. assetState);
    },
  );
};

let handleFileByType = (fileResult: nodeResultType) => {
  let assetState =
    IndexAssetService.increaseIndex |> StateLogicService.getEditorState;
  let newIndex = assetState |> IndexAssetService.getIndex;

  make((~resolve, ~reject) =>
    _handleSpecificFuncByType(
      fileResult.type_,
      (
        _handleJsonType(fileResult, newIndex, (resolve, assetState)),
        _handleImageType(fileResult, newIndex, (resolve, assetState)),
      ),
    )
  );
};