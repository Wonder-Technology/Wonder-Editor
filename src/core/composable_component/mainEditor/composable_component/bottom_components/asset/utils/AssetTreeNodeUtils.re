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

let getUploadFileType = name => {
  let (_, extname) = FileNameService.getBaseNameAndExtName(name);

  switch (extname) {
  | ".wdb" => LoadWDB
  | ".jpg"
  | ".png" => LoadImage
  | ".json" => LoadJson
  | _ => LoadError
  };
};

let handleSpecificFuncByTypeSync =
    (type_, (handleJsonFunc, handleImageFunc, handleWDBFunc)) =>
  switch (type_) {
  | LoadJson => handleJsonFunc()
  | LoadImage => handleImageFunc()
  | LoadWDB => handleWDBFunc()
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

let handleSpecificFuncByTypeAsync =
    (type_, (handleJsonFunc, handleImageFunc, handleWDBFunc)) =>
  switch (type_) {
  | LoadJson => handleJsonFunc()
  | LoadImage => handleImageFunc()
  | LoadWDB => handleWDBFunc()
  | LoadError =>
    make((~resolve, ~reject) => {
      WonderLog.Log.error(
        WonderLog.Log.buildErrorMessage(
          ~title="handleSpecificFuncByType",
          ~description={j|the load file type is error|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      );

      reject(. LoadException);
    })
  };

let readFileByTypeSync = (reader, fileInfo: fileInfoType) =>
  handleSpecificFuncByTypeSync(
    getUploadFileType(fileInfo.name),
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

let _handleJsonType = (fileResult: nodeResultType, newIndex, editorState, ()) => {
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

  make((~resolve, ~reject) => resolve(. editorState));
};

let _handleImageType =
    (fileResult: AssetNodeType.nodeResultType, newIndex, editorState, ()) => {
  let (fileName, _postfix) =
    FileNameService.getBaseNameAndExtName(fileResult.name);

  let (texture, editEngineState, runEngineState) =
    TextureUtils.createAndInitTexture(
      fileName,
      StateLogicService.getEditEngineState(),
      StateLogicService.getRunEngineState(),
    );

  make((~resolve, ~reject) =>
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
    )
  );
};

let _handleAssetWDBType =
    (fileResult: nodeResultType, newIndex, editorState, ()) => {
  let (fileName, _postfix) =
    FileNameService.getBaseNameAndExtName(fileResult.name);
  let wdbArrayBuffer =
    fileResult.result |> FileReader.convertResultToArrayBuffer;

  /* TODO use imageUint8ArrayDataMap */
  StateLogicService.getEditEngineState()
  |> AssembleWDBEngineService.assembleWDB(wdbArrayBuffer, false, false, false)
  |> WonderBsMost.Most.map(((editEngineState, _, gameObject)) => {
       let editEngineState =
         editEngineState
         |> GameObjectUtils.setGameObjectIsRenderIfHasMeshRenderer(
              false,
              gameObject,
            )
         |> GameObjectEngineService.setGameObjectName(fileName, gameObject);

       /* TODO refactor: duplicate */
       GameObjectEngineService.getAllGameObjects(gameObject, editEngineState)
       |> WonderCommonlib.ArrayService.reduceOneParam(
            (. editEngineState, gameObject) =>
              GameObjectEngineService.initGameObject(
                gameObject,
                editEngineState,
              ),
            editEngineState,
          )
       |> DirectorEngineService.loopBody(0.)
       |> StateLogicService.setEditEngineState;
     })
  |> WonderBsMost.Most.flatMap(_ =>
       StateLogicService.getRunEngineState()
       |> AssembleWDBEngineService.assembleWDB(wdbArrayBuffer, false, false, false)
       |> WonderBsMost.Most.map(((runEngineState, _, gameObject)) => {
            let allGameObjects =
              GameObjectEngineService.getAllGameObjects(
                gameObject,
                runEngineState,
              );

            editorState
            |> AssetClonedGameObjectMapEditorService.setResult(
                 gameObject,
                 allGameObjects,
               )
            |> AssetWDBNodeMapEditorService.setResult(
                 newIndex,
                 AssetNodeEditorService.buildWDBNodeResult(
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

            let runEngineState =
              runEngineState
              |> GameObjectUtils.setGameObjectIsRenderIfHasMeshRenderer(
                   false,
                   gameObject,
                 )
              |> GameObjectEngineService.setGameObjectName(
                   fileName,
                   gameObject,
                 );

            allGameObjects
            |> WonderCommonlib.ArrayService.reduceOneParam(
                 (. runEngineState, gameObject) =>
                   GameObjectEngineService.initGameObject(
                     gameObject,
                     runEngineState,
                   ),
                 runEngineState,
               )
            |> DirectorEngineService.loopBody(0.)
            |> StateLogicService.setRunEngineState;
          })
     )
  |> WonderBsMost.Most.drain
  |> then_(_ => resolve(editorState));
};

let handleFileByTypeAsync = (fileResult: nodeResultType) => {
  let (editorState, newIndex) =
    AssetIdUtils.getAssetId |> StateLogicService.getEditorState;

  handleSpecificFuncByTypeAsync(
    fileResult.type_,
    (
      _handleJsonType(fileResult, newIndex, editorState),
      _handleImageType(fileResult, newIndex, editorState),
      _handleAssetWDBType(fileResult, newIndex, editorState),
    ),
  );
};