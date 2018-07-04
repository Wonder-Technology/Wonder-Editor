open AssetNodeType;
open FileType;
open AssetTreeNodeType;
open EditorType;
open Js.Promise;

let renameNodeResult = (name, result: AssetNodeType.nodeResultType) => {
  ...result,
  name,
};

let addFolderIntoNodeMap = (index, assetState) =>
  assetState
  |> NodeMapAssetService.setResult(
       index,
       AssetNodeAssetService.buildFolderResult(index, assetState),
     );

let initRootAssetTree = assetState =>
  switch (AssetTreeRootAssetService.getAssetTreeRoot(assetState)) {
  | None =>
    let rootIndex = assetState |> IndexAssetService.getIndex;
    (
      rootIndex |> AssetNodeAssetService.buildAssetTreeNodeByIndex,
      assetState |> addFolderIntoNodeMap(rootIndex),
    );
  | Some(assetTreeRoot) => (assetTreeRoot, assetState)
  };

let convertFileJsObjectToFileInfoRecord = fileObject => {
  name: fileObject##name,
  type_: fileObject##_type,
  file: FileType.convertFileJsObjectToFile(fileObject),
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
      ),
    )
  };

let _handleSpecificFuncByType = (type_, (handleJsonFunc, handleImageFunc)) =>
  switch (type_) {
  | Json => handleJsonFunc()
  | Image => handleImageFunc()
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
    getAssetTreeAssetNodeTypeByFileType(fileInfo.type_),
    (
      () => FileReader.readAsText(reader, fileInfo.file),
      () => FileReader.readAsDataURL(reader, fileInfo.file),
    ),
  );

let createNodeAndAddToCurrentNodeParent = (newIndex, assetState) =>
  assetState
  |> AssetTreeRootAssetService.unsafeGetAssetTreeRoot
  |> AssetUtils.insertSourceTreeNodeToTargetTreeNodeChildren(
       assetState |> AssetUtils.getTargetTreeNodeId,
       newIndex |> AssetNodeAssetService.buildAssetTreeNodeByIndex,
     )
  |. AssetTreeRootAssetService.setAssetTreeRoot(assetState);

let handleFileByType = (fileResult: nodeResultType) => {
  let assetState =
    IndexAssetService.increaseIndex |> StateLogicService.getAssetState;
  let newIndex = assetState |> IndexAssetService.getIndex;

  make((~resolve, ~reject) =>
    _handleSpecificFuncByType(
      fileResult.type_,
      (
        () => {
          assetState
          |> NodeMapAssetService.setResult(newIndex, fileResult)
          |> createNodeAndAddToCurrentNodeParent(newIndex)
          |> StateAssetService.setState
          |> ignore;

          resolve(. "resolve");
        },
        () => {
          let (fileName, _postfix) =
            FileNameUtils.handleFileName(fileResult.name);

          let (texture, editEngineState, runEngineState) =
            TextureUtils.createAndInitTexture(
              fileName,
              StateLogicService.getEditEngineState(),
              StateLogicService.getRunEngineState(),
            );

          Image.onload(
            fileResult.result |> OptionService.unsafeGet,
            loadedImg => {
              editEngineState
              |> BasicSourceTextureEngineService.setSource(
                   loadedImg |> TextureUtils.convertDomToImageElement,
                   texture,
                 )
              |> StateLogicService.setEditEngineState;

              runEngineState
              |> BasicSourceTextureEngineService.setSource(
                   loadedImg |> TextureUtils.convertDomToImageElement,
                   texture,
                 )
              |> StateLogicService.setRunEngineState;

              assetState
              |> NodeMapAssetService.setResult(
                   newIndex,
                   TextureUtils.buildTextureNodeResult(fileName, texture),
                 )
              |> createNodeAndAddToCurrentNodeParent(newIndex)
              |> StateAssetService.setState
              |> ignore;

              resolve(. "resolve");
            },
          );
        },
      ),
    )
  );
};

/* let getAssetNodeTypeById = (fileId, assetState) =>
   switch (
     assetState
     |> NodeMapAssetService.unsafeGetNodeMap
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
   }; */