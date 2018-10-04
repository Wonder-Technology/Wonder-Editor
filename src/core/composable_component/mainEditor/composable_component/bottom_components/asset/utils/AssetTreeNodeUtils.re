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

let _getImageIdIfImageBase64MapHasIt = (imgBase64, editorState) => {
  let sameLengthBase64Arr =
    editorState
    |> AssetImageBase64MapEditorService.getImageBase64Map
    |> SparseMapService.getValidDataArr
    |> Js.Array.filter(((imageId, {base64, name})) =>
         base64 |> Js.String.length === (imgBase64 |> Js.String.length)
       );

  sameLengthBase64Arr |> Js.Array.length === 0 ?
    None :
    {
      let sameBase64NodeArr =
        sameLengthBase64Arr
        |> Js.Array.filter(((imageId, {base64, name})) =>
             base64 === imgBase64
           );

      sameBase64NodeArr |> Js.Array.length === 0 ?
        None :
        sameBase64NodeArr
        |> ArrayService.unsafeGetFirst
        |> (((imageId, _)) => imageId |. Some);
    };
};

let handleImageType =
    (
      (baseName, fileName, imgBase64),
      (newIndex, parentId, textureIndex),
      (editorState, engineState),
    ) =>
  make((~resolve, ~reject) =>
    Image.onload(
      imgBase64,
      loadedImg => {
        engineState
        |> BasicSourceTextureEngineService.setSource(
             loadedImg |> ImageType.convertDomToImageElement,
             textureIndex,
           )
        |> StateEngineService.setState
        |> ignore;

        let (imageId, editorState) =
          switch (_getImageIdIfImageBase64MapHasIt(imgBase64, editorState)) {
          | None =>
            let editorState =
              editorState |> AssetImageIndexEditorService.increaseImageIndex;
            let imageId =
              editorState |> AssetImageIndexEditorService.getImageIndex;

            (
              imageId,
              editorState
              |> AssetImageBase64MapEditorService.setResult(
                   imageId,
                   AssetImageBase64MapEditorService.buildImageResult(
                     imgBase64,
                     fileName,
                     ArrayService.create() |> ArrayService.push(textureIndex),
                   ),
                 ),
            );

          | Some(imageId) => (
              imageId,
              editorState
              |> AssetImageBase64MapEditorService.getImageBase64Map
              |> WonderCommonlib.SparseMapService.unsafeGet(imageId)
              |> (
                ({textureArray} as imageResult) => {
                  ...imageResult,
                  textureArray:
                    textureArray
                    |> Js.Array.copy
                    |> ArrayService.push(textureIndex),
                }
              )
              |. AssetImageBase64MapEditorService.setResult(
                   imageId,
                   _,
                   editorState,
                 ),
            )
          };

        let editorState =
          editorState
          |> AssetTextureNodeMapEditorService.setResult(
               newIndex,
               AssetTextureNodeMapEditorService.buildTextureNodeResult(
                 textureIndex,
                 parentId |. Some,
                 imageId,
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

let handleAssetWDBType =
    ((fileName, wdbArrayBuffer), (newIndex, parentId), editorState, ()) => {
  let (baseName, extName) = FileNameService.getBaseNameAndExtName(fileName);
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
              baseName,
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

       let engineState =
         engineState
         |> GameObjectUtils.setGameObjectIsRenderIfHasMeshRenderer(
              false,
              gameObject,
            )
         |> GameObjectUtils.setGameObjectIsRenderIfHasDirectionLight(
              false,
              gameObject,
            )
         |> GameObjectUtils.setGameObjectIsRenderIfHasPointLight(
              false,
              gameObject,
            )
         |> GameObjectEngineService.setGameObjectName(baseName, gameObject);

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
      () => {
        let (baseName, _extName) =
          FileNameService.getBaseNameAndExtName(fileResult.name);
        let (textureIndex, engineState) =
          TextureUtils.createAndInitTexture(
            baseName
            |. AssetTreeEditorService.getUniqueTreeNodeName(
                 Texture,
                 targetTreeNodeId |. Some,
                 editorState,
               ),
            StateEngineService.unsafeGetState(),
          );

        handleImageType(
          (
            baseName,
            fileResult.name,
            fileResult.result |> FileReader.convertResultToString,
          ),
          (newIndex, targetTreeNodeId, textureIndex),
          (editorState, engineState),
        );
      },
      handleAssetWDBType(
        (
          fileResult.name,
          fileResult.result |> FileReader.convertResultToArrayBuffer,
        ),
        (newIndex, targetTreeNodeId),
        editorState,
      ),
    ),
  );
};