open AssetNodeType;
open FileType;
open AssetTreeNodeType;
open EditorType;
open Js.Promise;

/* let renameNodeResult = (name, result: nodeResultType) => {...result, name}; */

let addFolderIntoNodeMap = (index, assetState) =>
  assetState
  |> FolderNodeMapAssetService.setResult(
       index,
       AssetNodeAssetService.buildFolderResult(index, assetState),
     );

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

let createNodeAndAddToCurrentNodeParent = (newIndex, type_, assetState) =>
  assetState
  |> AssetTreeRootAssetService.unsafeGetAssetTreeRoot
  |> AssetUtils.insertSourceTreeNodeToTargetTreeNodeChildren(
       assetState |> AssetUtils.getTargetTreeNodeId,
       AssetNodeAssetService.buildAssetTreeNodeByIndex(newIndex, type_),
     )
  |. AssetTreeRootAssetService.setAssetTreeRoot(assetState);

let _handleJsonType =
    (assetState, newIndex, fileResult: nodeResultType, resolve, ()) => {
  assetState
  |> JsonNodeMapAssetService.setResult(
       newIndex,
       AssetNodeAssetService.buildJsonNodeResult(fileResult),
     )
  |> createNodeAndAddToCurrentNodeParent(newIndex, Json)
  |> StateAssetService.setState
  |> ignore;

  resolve(. "resolve");
};

let _handleTextureType =
    (
      fileResult: AssetNodeType.nodeResultType,
      newIndex,
      resolve,
      assetState,
      (),
    ) => {
  let (fileName, _postfix) =
    FileNameUtils.getBaseNameAndExtName(fileResult.name);

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
      |> ImageBase64MapAssetService.setResult(texture, fileResult.result)
      |> TextureNodeMapAssetService.setResult(
           newIndex,
           AssetNodeAssetService.buildTextureNodeResult(texture),
         )
      |> createNodeAndAddToCurrentNodeParent(newIndex, Texture)
      |> StateAssetService.setState
      |> ignore;

      resolve(. "resolve");
    },
  );
};

/* TODO refactor: split to handle each type */

/*
 contract test:
 diff test

 editor state test:
 set texture node map
 */

/* TODO integration test
   1.load texture + set texture name/wrap,filter
   2.load texture + apply texture to gameObject->material */

/* TODO optimize show image

   (add image node map)

   store image base64 to image node map;
   when show image:
       get image node id by texture node id;
       get image base64 from image node map;
           if none, get texture source and convert to base64;
               if none , fatal
   */

let handleFileByType = (fileResult: nodeResultType) => {
  let assetState =
    IndexAssetService.increaseIndex |> StateLogicService.getAssetState;
  let newIndex = assetState |> IndexAssetService.getIndex;

  make((~resolve, ~reject) =>
    _handleSpecificFuncByType(
      fileResult.type_,
      (
        _handleJsonType(assetState, newIndex, fileResult, resolve),
        _handleTextureType(fileResult, newIndex, resolve, assetState),
      ),
    )
  );
};