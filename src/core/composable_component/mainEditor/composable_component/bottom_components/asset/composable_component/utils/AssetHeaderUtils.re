open FileType;

open AssetNodeType;

open Js.Promise;

let _handleImageType =
    (
      (mimeType, fileName, imgBase64),
      (textureNodeId, parentFolderNodeId, textureComponent),
      (editorState, engineState),
    ) =>
  make((~resolve, ~reject) =>
    Image.onload(
      imgBase64,
      loadedImg => {
        ImageUtils.setImageName(loadedImg, fileName);

        let engineState =
          engineState
          |> BasicSourceTextureEngineService.setSource(
               loadedImg |> ImageType.convertDomToImageElement,
               textureComponent,
             );

        let (imageNodeId, editorState) =
          AddTextureNodeUtils.addImageNodeByBase64(
            imgBase64,
            fileName,
            mimeType,
            editorState,
          );

        let editorState =
          AddTextureNodeUtils.addTextureNodeToAssetTree(
            textureComponent,
            (parentFolderNodeId, textureNodeId, imageNodeId),
            editorState,
          );

        resolve(. (editorState, engineState));
      },
    )
  );

let _handleAssetWDBType =
    (
      (fileName, wdbArrayBuffer),
      (wdbNodeId, parentFolderNodeId),
      (editorState, engineState),
    ) => {
  let (baseName, _) = FileNameService.getBaseNameAndExtName(fileName);

  AssetWDBUtils.importAssetWDB(
    (
      baseName
      |. IterateAssetTreeAssetEditorService.getUniqueTreeNodeName(
           WDB,
           parentFolderNodeId |. Some,
           (editorState, engineState),
         ),
      wdbArrayBuffer,
    ),
    (wdbNodeId, parentFolderNodeId),
    (editorState, engineState),
  )
  |> then_(
       (
         (
           (allGameObjects, imageUint8ArrayDataMap),
           (editorState, engineState),
         ),
       ) => {
       let (
         (extractedMaterialAssetDataArr, extractedTextureAssetDataArr),
         (editorState, engineState),
       ) =
         ExtractAndRelateAssetsUtils.extractAndRelateAssets(
           allGameObjects,
           imageUint8ArrayDataMap,
           (editorState, engineState),
         );

       let defaultCubeGeometryData = (
         AssetGeometryDataEditorService.unsafeGetDefaultCubeGeometryComponent(
           editorState,
         ),
         PrepareDefaultComponentUtils.getDefaultCubeGeometryName(),
       );
       let defaultSphereGeometryData = (
         AssetGeometryDataEditorService.unsafeGetDefaultSphereGeometryComponent(
           editorState,
         ),
         PrepareDefaultComponentUtils.getDefaultSphereGeometryName(),
       );

       let engineState =
         allGameObjects
         |> WonderCommonlib.ArrayService.reduceOneParam(
              (. engineState, gameObject) =>
                engineState
                |> RelateGameObjectAndAssetUtils.replaceWDBAssetGameObjectGeometryComponentToDefaultGeometryComponent(
                     gameObject,
                     (defaultCubeGeometryData, defaultSphereGeometryData),
                   )
                |> GameObjectEngineService.initGameObject(gameObject),
              engineState,
            )
         |> DirectorEngineService.loopBody(0.);

       let (editorState, engineState) =
         ExtractAndRelateAssetsUtils.addNodeToAssetTree(
           extractedMaterialAssetDataArr,
           extractedTextureAssetDataArr,
           (editorState, engineState),
         );

       (editorState, engineState) |> resolve;
     });
};

let _handleSpecificFuncByTypeAsync =
    (type_, (handleImageFunc, handleWDBFunc)) =>
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

let handleFileByTypeAsync = (fileResult: nodeResultType) => {
  let (editorState, assetNodeId) =
    AssetIdUtils.generateAssetId |> StateLogicService.getEditorState;
  let engineState = StateEngineService.unsafeGetState();

  let targetTreeNodeId = editorState |> AssetTreeUtils.getTargetTreeNodeId;

  _handleSpecificFuncByTypeAsync(
    fileResult.type_,
    (
      () => {
        let (baseName, extName) =
          FileNameService.getBaseNameAndExtName(fileResult.name);
        let (textureComponent, engineState) =
          TextureUtils.createAndInitTexture(
            baseName
            |. IterateAssetTreeAssetEditorService.getUniqueTreeNodeName(
                 Texture,
                 targetTreeNodeId |. Some,
                 (editorState, engineState),
               ),
            StateEngineService.unsafeGetState(),
          );

        _handleImageType(
          (
            ImageUtils.getImageMimeType(extName),
            fileResult.name,
            fileResult.result |> FileReader.convertResultToString,
          ),
          (assetNodeId, targetTreeNodeId, textureComponent),
          (editorState, engineState),
        );
      },
      () =>
        _handleAssetWDBType(
          (
            fileResult.name,
            fileResult.result |> FileReader.convertResultToArrayBuffer,
          ),
          (assetNodeId, targetTreeNodeId),
          (editorState, engineState),
        ),
    ),
  )
  |> then_(((editorState, engineState)) => {
       editorState |> StateEditorService.setState |> ignore;
       engineState |> StateEngineService.setState |> ignore;

       () |> resolve;
     });
};

let fileLoad = (dispatchFunc, event) => {
  let e = ReactEventType.convertReactFormEventToJsEvent(event);
  DomHelper.preventDefault(e);

  let target = e##target;

  let fileInfoArr =
    target##files
    |> Js.Dict.values
    |> Js.Array.map(FileReader.convertFileJsObjectToFileInfoRecord);

  WonderBsMost.Most.from(fileInfoArr)
  |> WonderBsMost.Most.flatMap((fileInfo: fileInfoType) =>
       WonderBsMost.Most.fromPromise(
         Js.Promise.make((~resolve, ~reject) => {
           let reader = FileReader.createFileReader();

           FileReader.onload(reader, result =>
             resolve(. {
               name: fileInfo.name,
               type_: LoadAssetUtils.getUploadFileType(fileInfo.name),
               result,
             })
           );

           LoadAssetUtils.readFileByTypeSync(reader, fileInfo);
         }),
       )
     )
  |> WonderBsMost.Most.flatMap((fileResult: nodeResultType) =>
       WonderBsMost.Most.fromPromise(fileResult |> handleFileByTypeAsync)
     )
  |> WonderBsMost.Most.drain
  |> then_(_ => {
       FileReader.makeSureCanLoadSameNameFileAgain(target);

       dispatchFunc(
         AppStore.UpdateAction(Update([|UpdateStore.BottomComponent|])),
       )
       |> resolve;
     });
};