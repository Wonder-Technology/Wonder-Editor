open AssetNodeType;

open FileType;

open Js.Promise;

let addFolderIntoNodeMap = (index, editorState) =>
  editorState
  |> AssetNodeEditorService.buildFolderResult(index)
  |> AssetFolderNodeMapEditorService.setResult(index, _, editorState);

let initRootAssetTree = editorState =>
  switch (AssetTreeRootEditorService.getAssetTreeRoot(editorState)) {
  | None =>
    let editorState = editorState |> AssetIndexEditorService.increaseIndex;
    let rootIndex = editorState |> AssetIndexEditorService.getIndex;

    (
      rootIndex |. AssetNodeEditorService.buildAssetTreeNodeByIndex(Folder),
      editorState |> addFolderIntoNodeMap(rootIndex),
    );
  | Some(assetTreeRoot) => (assetTreeRoot, editorState)
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
  | "application/vnd.ms-works" => LoadWDB
  | _ => LoadError
  };

let handleSpecificFuncByType =
    (type_, (handleJsonFunc, handleImageFunc, handleWdbFunc)) =>
  switch (type_) {
  | LoadJson => handleJsonFunc()
  | LoadImage => handleImageFunc()
  | LoadWDB => handleWdbFunc()
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

let readFileByType = (reader, fileInfo: fileInfoType) =>
  handleSpecificFuncByType(
    getUploadFileType(fileInfo.type_),
    (
      () => FileReader.readAsText(reader, fileInfo.file),
      () => FileReader.readAsDataURL(reader, fileInfo.file),
      () => FileReader.readAsArrayBuffer(reader, fileInfo.file),
    ),
  );

let createNodeAndAddToTargetNodeChildren =
    (targetTreeNode, newIndex, type_, editorState) =>
  editorState
  |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
  |> AssetUtils.insertSourceTreeNodeToTargetTreeNodeChildren(
       targetTreeNode,
       AssetNodeEditorService.buildAssetTreeNodeByIndex(newIndex, type_),
     )
  |. AssetTreeRootEditorService.setAssetTreeRoot(editorState);

let _handleJsonType =
    (fileResult: nodeResultType, newIndex, (resolve, editorState), ()) => {
  let editorState =
    editorState
    |> AssetJsonNodeMapEditorService.setResult(
         newIndex,
         AssetNodeEditorService.buildJsonNodeResult(fileResult),
       )
    |> createNodeAndAddToTargetNodeChildren(
         editorState |> AssetUtils.getTargetTreeNodeId,
         newIndex,
         Json,
       )
    |> StateEditorService.setState;

  resolve(. editorState);
};

let _handleImageType =
    (
      fileResult: AssetNodeType.nodeResultType,
      newIndex,
      (resolve, editorState),
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
    fileResult.result |> FileReader.convertResultToString,
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

      let editorState =
        editorState
        |> AssetImageBase64MapEditorService.setResult(
             texture,
             fileResult.result |> FileReader.convertResultToString,
           )
        |> AssetTextureNodeMapEditorService.setResult(
             newIndex,
             AssetNodeEditorService.buildTextureNodeResult(texture),
           )
        |> createNodeAndAddToTargetNodeChildren(
             editorState |> AssetUtils.getTargetTreeNodeId,
             newIndex,
             Texture,
           )
        |> StateEditorService.setState;

      resolve(. editorState);
    },
  );
};

let _handleAssetWDBType =
    (fileResult: nodeResultType, newIndex, (resolve, editorState), ()) => {
  let (fileName, _postfix) =
    FileNameService.getBaseNameAndExtName(fileResult.name);
  let wdbArrayBuffer =
    fileResult.result |> FileReader.convertResultToArrayBuffer;

  StateLogicService.getEditEngineState()
  |> AssembleWDBEngineService.assembleWDB(wdbArrayBuffer)
  |> WonderBsMost.Most.map(((editEngineState, _gameObject)) =>
       editEngineState
       |> DirectorEngineService.init
       |> DirectorEngineService.loopBody(0.)
       |> StateLogicService.setEditEngineState
     )
  |> WonderBsMost.Most.flatMap(_ =>
       StateLogicService.getRunEngineState()
       |> AssembleWDBEngineService.assembleWDB(wdbArrayBuffer)
       |> WonderBsMost.Most.map(((runEngineState, gameObject)) => {
            let geometryArr =
              GeometryEngineService.getAllUniqueGeometrys(
                gameObject,
                runEngineState,
              );

            WonderLog.Log.print(("model geometrys", geometryArr)) |> ignore;

            editorState
            |> AssetGeometryNodeMapEditorService.setAllGeometryIntoGeometryNodeMap(
                 geometryArr,
               )
            |> AssetWdbNodeMapEditorService.setResult(
                 newIndex,
                 AssetNodeEditorService.buildWdbNodeResult(
                   fileName,
                   gameObject,
                   wdbArrayBuffer,
                 ),
               )
            |> createNodeAndAddToTargetNodeChildren(
                 editorState |> AssetUtils.getTargetTreeNodeId,
                 newIndex,
                 WDB,
               )
            |> StateEditorService.setState
            |> ignore;

            StateEditorService.getState()
            |> AssetGeometryNodeMapEditorService.getGeometryNodeMap
            |> WonderLog.Log.print;

            runEngineState
            |> DirectorEngineService.init
            |> DirectorEngineService.loopBody(0.)
            |> StateLogicService.setRunEngineState;
          })
     )
  |> WonderBsMost.Most.drain
  |> then_(_ => resolve(. editorState) |> Js.Promise.resolve)
  |> ignore;
};

let handleFileByType = (fileResult: nodeResultType) => {
  let (editorState, newIndex) =
    AssetIdUtils.getAssetId |> StateLogicService.getEditorState;

  make((~resolve, ~reject) =>
    handleSpecificFuncByType(
      fileResult.type_,
      (
        _handleJsonType(fileResult, newIndex, (resolve, editorState)),
        _handleImageType(fileResult, newIndex, (resolve, editorState)),
        _handleAssetWDBType(fileResult, newIndex, (resolve, editorState)),
      ),
    )
  );
};