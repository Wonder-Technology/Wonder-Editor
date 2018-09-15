open AssetNodeType;

open FileType;

open Js.Promise;

let _getFolderDefaultName = (index, editorState) =>
  index === (editorState |> AssetTreeRootEditorService.getRootTreeNodeId) ?
    "Assets" : "newFolder";

let addFolderIntoNodeMap = (index, parentId, editorState) => {
  /* WonderLog.Log.print((
       "start add folder into map ",
       index,
       editorState |> AssetFolderNodeMapEditorService.getFolderNodeMap,
     ))
     |> ignore; */

  let editorState =
    editorState
    |> _getFolderDefaultName(index)
    |. AssetTreeEditorService.getUniqueTreeNodeName(parentId, editorState)
    |> AssetFolderNodeMapEditorService.buildFolderResult(parentId)
    |> AssetFolderNodeMapEditorService.setResult(index, _, editorState);

  /* WonderLog.Log.print((
       "end folder map",
       editorState |> AssetFolderNodeMapEditorService.getFolderNodeMap,
     ))
     |> ignore; */

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

  let (texture, engineState) =
    TextureUtils.createAndInitTexture(
      fileName,
      StateEngineService.unsafeGetState(),
    );

  make((~resolve, ~reject) =>
    Image.onload(
      fileResult.result |> FileReader.convertResultToString,
      loadedImg => {
        engineState
        |> BasicSourceTextureEngineService.setSource(
             loadedImg |> ImageType.convertDomToImageElement,
             texture,
           )
        |> StateEngineService.setState
        |> ignore;

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
  StateEngineService.unsafeGetState()
  |> AssembleWDBEngineService.assembleWDB(
       wdbArrayBuffer,
       false,
       false,
       false,
     )
  |> WonderBsMost.Most.map(((engineState, _, gameObject)) => {
       let allGameObjects =
         GameObjectEngineService.getAllGameObjects(gameObject, engineState);

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

       let engineState =
         engineState
         |> GameObjectUtils.setGameObjectIsRenderIfHasMeshRenderer(
              false,
              gameObject,
            )
         |> GameObjectEngineService.setGameObjectName(fileName, gameObject);

       allGameObjects
       |> WonderCommonlib.ArrayService.reduceOneParam(
            (. engineState, gameObject) =>
              GameObjectEngineService.initGameObject(gameObject, engineState),
            engineState,
          )
       |> DirectorEngineService.loopBody(0.)
       |> StateEngineService.setState
       |> ignore;
     })
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