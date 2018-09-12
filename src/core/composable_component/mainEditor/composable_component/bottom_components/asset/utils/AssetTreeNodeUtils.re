open AssetNodeType;

open FileType;

open Js.Promise;

let getAssetTreeRootName = () => "Assets";

let getDefaultFolderName = () => "newFolder";

let _getFolderDefaultName = (index, editorState) =>
  index === (editorState |> AssetTreeRootEditorService.getRootTreeNodeId) ?
    getAssetTreeRootName() : getDefaultFolderName();

let addFolderIntoNodeMap = (index, parentId, editorState) =>
  editorState
  |> _getFolderDefaultName(index)
  |. AssetTreeEditorService.getUniqueTreeNodeName(
       Folder,
       parentId,
       editorState,
     )
  |> AssetFolderNodeMapEditorService.buildFolderResult(parentId)
  |> AssetFolderNodeMapEditorService.setResult(index, _, editorState);

let initRootAssetTree = editorState =>
  switch (AssetTreeRootEditorService.getAssetTreeRoot(editorState)) {
  | None =>
    let editorState = editorState |> AssetIndexEditorService.increaseIndex;
    let rootIndex = editorState |> AssetIndexEditorService.getIndex;

    (
      rootIndex |. AssetTreeEditorService.buildAssetTreeNodeByIndex(Folder),
      editorState |> addFolderIntoNodeMap(rootIndex, None),
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
       AssetTreeEditorService.buildAssetTreeNodeByIndex(newIndex, type_),
     )
  |. AssetTreeRootEditorService.setAssetTreeRoot(editorState);

let handleJsonType =
    ((fileName, fileResult), (newIndex, parentId), editorState, ()) => {
  let (baseName, extName) = FileNameService.getBaseNameAndExtName(fileName);

  let editorState =
    editorState
    |> AssetJsonNodeMapEditorService.setResult(
         newIndex,
         baseName
         |. AssetTreeEditorService.getUniqueTreeNodeName(
              Json,
              parentId |. Some,
              editorState,
            )
         |> AssetJsonNodeMapEditorService.buildJsonNodeResult(
              extName,
              fileResult,
              parentId |. Some,
            ),
       )
    |> createNodeAndAddToTargetNodeChildren(parentId, newIndex, Json)
    |> StateEditorService.setState;

  make((~resolve, ~reject) => resolve(. editorState));
};

let handleImageType =
    ((fileName, fileResult), (newIndex, parentId), editorState, ()) => {
  let (baseName, _extName) = FileNameService.getBaseNameAndExtName(fileName);
  let texturePostfix = ".tex";

  let (texture, editEngineState, runEngineState) =
    TextureUtils.createAndInitTexture(
      baseName,
      StateLogicService.getEditEngineState(),
      StateLogicService.getRunEngineState(),
    );

  make((~resolve, ~reject) =>
    Image.onload(
      fileResult |> FileReader.convertResultToString,
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
               fileResult |> FileReader.convertResultToString,
             )
          |> AssetTextureNodeMapEditorService.setResult(
               newIndex,
               AssetTextureNodeMapEditorService.buildTextureNodeResult(
                 texturePostfix,
                 texture,
                 parentId |. Some,
               ),
             )
          |> createNodeAndAddToTargetNodeChildren(
               parentId,
               newIndex,
               Texture,
             )
          |> StateEditorService.setState;

        resolve(. editorState);
      },
    )
  );
};

let handleAssetWDBType =
    ((fileName, fileResult), (newIndex, parentId), editorState, ()) => {
  let (baseName, extName) = FileNameService.getBaseNameAndExtName(fileName);
  let wdbArrayBuffer = fileResult |> FileReader.convertResultToArrayBuffer;
  let targetTreeNodeId = editorState |> AssetUtils.getTargetTreeNodeId;

  /* TODO use imageUint8ArrayDataMap */
  StateLogicService.getEditEngineState()
  |> AssembleWDBEngineService.assembleWDB(
       wdbArrayBuffer,
       false,
       false,
       false,
     )
  |> WonderBsMost.Most.map(((editEngineState, _, gameObject)) => {
       let editEngineState =
         editEngineState
         |> GameObjectUtils.setGameObjectIsRenderIfHasMeshRenderer(
              false,
              gameObject,
            )
         |> GameObjectEngineService.setGameObjectName(baseName, gameObject);

       GameObjectEngineService.initAllGameObjects(gameObject, editEngineState)
       |> DirectorEngineService.loopBody(0.)
       |> StateLogicService.setEditEngineState;
     })
  |> WonderBsMost.Most.flatMap(_ =>
       StateLogicService.getRunEngineState()
       |> AssembleWDBEngineService.assembleWDB(
            wdbArrayBuffer,
            false,
            false,
            false,
          )
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
                 baseName
                 |. AssetTreeEditorService.getUniqueTreeNodeName(
                      WDB,
                      targetTreeNodeId |. Some,
                      editorState,
                    )
                 |. AssetWDBNodeMapEditorService.buildWDBNodeResult(
                      extName,
                      targetTreeNodeId |. Some,
                      gameObject,
                      wdbArrayBuffer,
                    ),
               )
            |> createNodeAndAddToTargetNodeChildren(
                 targetTreeNodeId,
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
                   baseName,
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
  let targetTreeNodeId = editorState |> AssetUtils.getTargetTreeNodeId;

  handleSpecificFuncByTypeAsync(
    fileResult.type_,
    (
      handleJsonType(
        (
          fileResult.name,
          fileResult.result |> FileReader.convertResultToString,
        ),
        (newIndex, targetTreeNodeId),
        editorState,
      ),
      handleImageType(
        (fileResult.name, fileResult.result),
        (newIndex, targetTreeNodeId),
        editorState,
      ),
      handleAssetWDBType(
        (fileResult.name, fileResult.result),
        (newIndex, targetTreeNodeId),
        editorState,
      ),
    ),
  );
};