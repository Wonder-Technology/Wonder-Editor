open AssetNodeType;

open FileType;

open Js.Promise;

let _getFolderDefaultName = (index, editorState) =>
  index === (editorState |> AssetTreeRootEditorService.getRootTreeNodeId) ?
    "Assets" : "newFolder";

let addFolderIntoNodeMap = (index, parentId, editorState) => {
  let editorState =
    editorState
    |> _getFolderDefaultName(index)
    |. AssetTreeEditorService.getUniqueTreeNodeName(parentId, editorState)
    |> AssetFolderNodeMapEditorService.buildFolderResult(parentId)
    |> AssetFolderNodeMapEditorService.setResult(index, _, editorState);

  editorState;
};

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

let _handleJsonType = (fileResult: nodeResultType, newIndex, editorState, ()) => {
  let targetTreeNodeId = editorState |> AssetUtils.getTargetTreeNodeId;

  let editorState =
    editorState
    |> AssetJsonNodeMapEditorService.setResult(
         newIndex,
         AssetJsonNodeMapEditorService.buildJsonNodeResult(
           fileResult,
           targetTreeNodeId |. Some,
         ),
       )
    |> createNodeAndAddToTargetNodeChildren(targetTreeNodeId, newIndex, Json)
    |> StateEditorService.setState;

  make((~resolve, ~reject) => resolve(. editorState));
};

let _handleImageType =
    (fileResult: AssetNodeType.nodeResultType, newIndex, editorState, ()) => {
  let (fileName, _postfix) =
    FileNameService.getBaseNameAndExtName(fileResult.name);
  let targetTreeNodeId = editorState |> AssetUtils.getTargetTreeNodeId;

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
               AssetTextureNodeMapEditorService.buildTextureNodeResult(
                 texture,
                 targetTreeNodeId |. Some,
               ),
             )
          |> createNodeAndAddToTargetNodeChildren(
               targetTreeNodeId,
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
         |> GameObjectEngineService.setGameObjectName(fileName, gameObject);

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
                 AssetWDBNodeMapEditorService.buildWDBNodeResult(
                   fileName,
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