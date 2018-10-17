open AssetNodeType;

open FileType;

open Js.Promise;

let getAssetTreeRootName = () => "Assets";

let getDefaultFolderName = () => "newFolder";

let _getFolderDefaultName = (index, editorState) =>
  index === (editorState |> AssetTreeRootEditorService.getRootTreeNodeId) ?
    getAssetTreeRootName() : getDefaultFolderName();

let addFolderIntoNodeMap =
    (index, parentFolderNodeId, (editorState, engineState)) =>
  editorState
  |> _getFolderDefaultName(index)
  |. AssetUtils.getUniqueTreeNodeName(
       Folder,
       parentFolderNodeId,
       (editorState, engineState),
     )
  |> AssetFolderNodeMapEditorService.buildFolderNodeResult(
       parentFolderNodeId,
     )
  |> AssetFolderNodeMapEditorService.setResult(index, _, editorState);

let addMaterialIntoNodeMap =
    (index, parentFolderNodeId, material, editorState) =>
  editorState
  |> AssetMaterialNodeMapEditorService.setResult(
       index,
       AssetMaterialNodeMapEditorService.buildMaterialNodeResult(
         parentFolderNodeId,
         AssetMaterialDataType.LightMaterial,
         material,
       ),
     );

let initRootAssetTree = (editorState, engineState) =>
  switch (AssetTreeRootEditorService.getAssetTreeRoot(editorState)) {
  | None =>
    let editorState = editorState |> AssetIndexEditorService.increaseIndex;
    let rootIndex = editorState |> AssetIndexEditorService.getIndex;

    (
      rootIndex |. AssetTreeEditorService.buildAssetTreeNodeByIndex(Folder),
      (editorState, engineState) |> addFolderIntoNodeMap(rootIndex, None),
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
  | _ => LoadError
  };
};

let handleSpecificFuncByTypeSync = (type_, (handleImageFunc, handleWDBFunc)) =>
  switch (type_) {
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

let handleSpecificFuncByTypeAsync = (type_, (handleImageFunc, handleWDBFunc)) =>
  switch (type_) {
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

let _setImageName = (image, name) => {
  Obj.magic(image)##name#=name;

  ();
};

let handleImageType =
    (
      (baseName, fileName, imgBase64),
      (newIndex, parentFolderNodeId, textureComponent),
      (editorState, engineState),
    ) =>
  make((~resolve, ~reject) =>
    Image.onload(
      imgBase64,
      loadedImg => {
        _setImageName(loadedImg, fileName);

        engineState
        |> BasicSourceTextureEngineService.setSource(
             loadedImg |> ImageType.convertDomToImageElement,
             textureComponent,
           )
        |> StateEngineService.setState
        |> ignore;

        /* TODO refactor? */
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
                     ArrayService.create()
                     |> ArrayService.push(textureComponent),
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
                    |> ArrayService.push(textureComponent),
                }
              )
              |. AssetImageBase64MapEditorService.setResult(
                   imageId,
                   _,
                   editorState,
                 ),
            )
          };

        WonderLog.Log.print(("parentFolderNodeId: ", parentFolderNodeId))
        |> ignore;

        let editorState =
          editorState
          |> AssetTextureNodeMapEditorService.setResult(
               newIndex,
               AssetTextureNodeMapEditorService.buildTextureNodeResult(
                 textureComponent,
                 parentFolderNodeId |. Some,
                 imageId,
               ),
             )
          |> createNodeAndAddToTargetNodeChildren(
               parentFolderNodeId,
               newIndex,
               Texture,
             )
          |> StateEditorService.setState;

        resolve(. editorState);
      },
    )
  );

let handleAssetWDBType =
    (
      (fileName, wdbArrayBuffer),
      (newIndex, parentFolderNodeId),
      editorState,
      (),
    ) => {
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
    AssetIdUtils.generateAssetId |> StateLogicService.getEditorState;
  let engineState = StateEngineService.unsafeGetState();
  let targetTreeNodeId = editorState |> AssetUtils.getTargetTreeNodeId;

  handleSpecificFuncByTypeAsync(
    fileResult.type_,
    (
      () => {
        let (baseName, _extName) =
          FileNameService.getBaseNameAndExtName(fileResult.name);
        let (textureComponent, engineState) =
          TextureUtils.createAndInitTexture(
            baseName
            |. AssetUtils.getUniqueTreeNodeName(
                 Texture,
                 targetTreeNodeId |. Some,
                 (editorState, engineState),
               ),
            StateEngineService.unsafeGetState(),
          );

        handleImageType(
          (
            baseName,
            fileResult.name,
            fileResult.result |> FileReader.convertResultToString,
          ),
          (newIndex, targetTreeNodeId, textureComponent),
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