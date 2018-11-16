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

       let defaultGeometryData =
         RelateGameObjectAndAssetUtils.getDefaultGeometryData(
           editorState,
           engineState,
         );

       let engineState =
         allGameObjects
         |> WonderCommonlib.ArrayService.reduceOneParam(
              (. engineState, gameObject) =>
                engineState
                |> RelateGameObjectAndAssetUtils.replaceWDBAssetGameObjectGeometryComponentToDefaultGeometryComponent(
                     gameObject,
                     defaultGeometryData,
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

let _handleGLBType =
    (
      (fileName, glbArrayBuffer),
      (wdbNodeId, parentFolderNodeId),
      (editorState, engineState),
    ) =>
  Console.tryCatch(
    () =>
      _handleAssetWDBType(
        (fileName, ConverterEngineService.convertGLBToWDB(glbArrayBuffer)),
        (wdbNodeId, parentFolderNodeId),
        (editorState, engineState),
      ),
    e => {
      let message = e##message;
      ConsoleUtils.error(
        LogUtils.buildErrorMessage(
          ~description={j|$message|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
        editorState,
      );

      make((~resolve, ~reject) => resolve(. (editorState, engineState)));
    },
  );

let _handleSpecificFuncByTypeAsync =
    (type_, (handleImageFunc, handleWDBFunc, handleGLBFunc)) =>
  switch (type_) {
  | LoadImage => handleImageFunc()
  | LoadWDB => handleWDBFunc()
  | LoadGLB => handleGLBFunc()
  | LoadError =>
    make((~resolve, ~reject) => reject(. LoadException("load asset error")))
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
            ImageUtils.getImageMimeType(extName, editorState),
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
      () =>
        _handleGLBType(
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

let fileLoad = ((store, dispatchFunc), event) => {
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

       dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Project|])));

       resolve();
     });
};